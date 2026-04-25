import React, { useState } from "react";
import { Page, UserRole, UserProfile } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Loader2, Mail, AlertTriangle, ExternalLink, Copy, Check, ArrowRight, Eye, EyeOff } from "lucide-react";

// 🔥 FIREBASE
import { auth, db } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

interface AuthPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (p: Page) => void;
  initialMode?: "login" | "signup";
}

const AuthPage: React.FC<AuthPageProps> = ({
  onLoginSuccess,
  onNavigate,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<{ message: string; domain: string | null; isDomainError: boolean } | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleCheck = async (uid: string, fallbackProfile: Partial<UserProfile & { phone?: string }>): Promise<UserProfile> => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userProfile = userDoc.data() as UserProfile;
      // Strict isolation: block admins from logging in via client portal
      if (
        userProfile.role === UserRole.ADMIN ||
        userProfile.role === UserRole.SUPER_ADMIN
      ) {
        throw new Error("Accès refusé. Les administrateurs doivent se connecter via le portail admin.");
      }
      return userProfile;
    } else {
      // Create user profile in Firestore directly on signup / first login
      const newProfile: any = {
        uid: uid,
        firstName: fallbackProfile.firstName || "User",
        lastName: fallbackProfile.lastName || "Krypton",
        email: fallbackProfile.email || "",
        phone: fallbackProfile.phone || "",
        role: UserRole.CLIENT,
        status: "active",
        createdAt: serverTimestamp(),
      };
      await setDoc(userDocRef, newProfile);
      return newProfile as UserProfile;
    }
  };

  const handleError = (error: any) => {
    console.error("Erreur Auth:", error?.message || error);
    setIsLoading(false);

    const errorMsg = error?.message || "";
    const errorCode = error?.code || "";

    if (errorMsg.includes("Missing or insufficient permissions")) {
      setAuthError({ message: "Erreur de permissions Firestore. (Veuillez vérifier les règles de sécurité)", domain: null, isDomainError: false });
    } else if (errorCode === 'auth/popup-closed-by-user') {
      setAuthError({ message: "La connexion a été annulée.", domain: null, isDomainError: false });
    } else if (errorCode === 'auth/unauthorized-domain') {
      const domain = window.location.hostname;
      setAuthError({ message: `Domaine non autorisé. Vous devez l'ajouter dans la console Firebase.`, domain: domain, isDomainError: true });
    } else if (errorCode === 'auth/email-already-in-use') {
      setAuthError({ message: "Cet email est déjà utilisé.", domain: null, isDomainError: false });
    } else if (errorCode === 'auth/weak-password') {
      setAuthError({ message: "Le mot de passe doit faire au moins 6 caractères.", domain: null, isDomainError: false });
    } else if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
      setAuthError({ message: "Identifiants incorrects.", domain: null, isDomainError: false });
    } else {
      setAuthError({ message: errorMsg || "Une erreur inconnue est survenue.", domain: null, isDomainError: false });
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    setResetMessage(null);

    try {
      if (mode === "signup") {
        if (!firstName || !lastName || !phone) {
          throw new Error("Veuillez remplir tous les champs du profil.");
        }
        if (password !== confirmPassword) {
          throw new Error("Les mots de passe ne correspondent pas.");
        }
        
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const profile = await handleRoleCheck(credential.user.uid, {
          email,
          firstName,
          lastName,
          phone
        });
        setIsLoading(false);
        onLoginSuccess(profile);

      } else {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const profile = await handleRoleCheck(credential.user.uid, { email });
        setIsLoading(false);
        onLoginSuccess(profile);
      }
    } catch (err: any) {
      if (err.message === "Accès refusé. Les administrateurs doivent se connecter via le portail admin.") {
        await auth.signOut();
      }
      handleError(err);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    setResetMessage(null);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const profile = await handleRoleCheck(user.uid, {
        email: user.email || "",
        firstName: user.displayName?.split(' ')[0] || "User",
        lastName: user.displayName?.split(' ').slice(1).join(' ') || "",
      });

      setIsLoading(false);
      onLoginSuccess(profile);
    } catch (error: any) {
      if (error.message === "Accès refusé. Les administrateurs doivent se connecter via le portail admin.") {
        await auth.signOut();
      }
      handleError(error);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setAuthError({ message: "Veuillez entrer votre adresse email pour réinitialiser le mot de passe.", domain: null, isDomainError: false });
      return;
    }
    setIsLoading(true);
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Un lien de réinitialisation a été envoyé à votre adresse email.");
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      <button
        onClick={() => onNavigate(Page.HOME)}
        className="absolute top-8 left-8 z-50 flex items-center gap-3 text-slate-500 hover:text-white transition-all group px-4 py-2 bg-white/5 border border-white/5 rounded-full backdrop-blur-md"
      >
        <ChevronLeft size={16} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">
          Retour
        </span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] bg-[#0D0D12]/80 border border-white/10 p-10 rounded-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#FF2718]/10 border border-[#FF2718]/30 rounded-full flex items-center justify-center mb-6">
            <Mail size={32} className="text-[#FF2718]" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">
            {mode === "login" ? "Connexion Client" : "Créer un compte"}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-2">
            Accès sécurisé
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-4 bg-red-950/30 border border-red-500/30 rounded-sm text-sm text-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div className="flex-1">
                <p className="font-semibold mb-1">Erreur</p>
                <p className="text-red-300/80">{authError.message}</p>
              </div>
            </div>
          </div>
        )}

        {resetMessage && (
          <div className="mb-6 p-4 bg-green-950/30 border border-green-500/30 rounded-sm text-sm text-green-200">
            <div className="flex items-start gap-3">
              <Check className="text-green-500 shrink-0 mt-0.5" size={18} />
              <div className="flex-1">
                <p className="font-semibold mb-1">Email envoyé</p>
                <p className="text-green-300/80">{resetMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          <AnimatePresence mode="popLayout">
            {mode === "signup" && (
              <motion.div
                key="signupFields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-1/2 p-4 bg-black/50 border border-white/10 text-white text-sm focus:border-[#FF2718] outline-none transition-colors rounded-sm"
                    required={mode === "signup"}
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-1/2 p-4 bg-black/50 border border-white/10 text-white text-sm focus:border-[#FF2718] outline-none transition-colors rounded-sm"
                    required={mode === "signup"}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 bg-black/50 border border-white/10 text-white text-sm focus:border-[#FF2718] outline-none transition-colors rounded-sm"
                  required={mode === "signup"}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-black/50 border border-white/10 text-white text-sm focus:border-[#FF2718] outline-none transition-colors rounded-sm"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-black/50 border border-white/10 text-white text-sm focus:border-[#FF2718] outline-none transition-colors rounded-sm pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <AnimatePresence mode="popLayout">
            {mode === "signup" && (
              <motion.div
                key="confirmPassword"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative overflow-hidden"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 bg-black/50 border border-white/10 text-white text-sm focus:border-[#FF2718] outline-none transition-colors rounded-sm pr-12"
                  required={mode === "signup"}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {mode === "login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[10px] text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF2718] flex justify-center items-center gap-3 text-white py-4 font-black uppercase tracking-widest text-[11px] hover:bg-red-700 transition-colors rounded-sm shadow-lg shadow-[#FF2718]/20 mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
            {mode === "login" ? "Se connecter" : "Créer mon compte"}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-white/10"></div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">OU</span>
          <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 flex justify-center items-center gap-3 text-white py-4 font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-colors rounded-sm"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
          Continuer avec Google
        </button>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setAuthError(null);
            }}
            className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            {mode === "login" 
              ? "Vous n'avez pas de compte ? Créer un compte" 
              : "Vous avez déjà un compte ? Se connecter"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
