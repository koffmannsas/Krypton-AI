import React, { useState, useEffect } from "react";
import { Page, UserRole, UserProfile } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Loader2, Mail, AlertTriangle, ExternalLink, Copy, Check, ArrowRight, Eye, EyeOff, Fingerprint, Globe, Activity, ShieldCheck } from "lucide-react";
import { trackEvent } from "../../utils/navigation";

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

  const [selectedPlan, setSelectedPlan] = useState<string>(() => {
    const queryPlan = new URLSearchParams(window.location.search).get("plan");
    const validPlans = ["starter", "business", "scale", "elite"];
    if (queryPlan && validPlans.includes(queryPlan.toLowerCase())) {
      return queryPlan.toLowerCase();
    }
    return "starter";
  });

  useEffect(() => {
    if (mode === "signup") {
      trackEvent("register_started", { preselected_plan: selectedPlan });
    }
  }, [mode]);

  const handleRoleCheck = async (uid: string, fallbackProfile: Partial<UserProfile & { phone?: string; selectedPlan?: string }>): Promise<UserProfile> => {
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
      const selectedPlanValue = fallbackProfile.selectedPlan || selectedPlan || "starter";
      const newProfile: any = {
        uid: uid,
        firstName: fallbackProfile.firstName || "User",
        lastName: fallbackProfile.lastName || "Krypton",
        email: fallbackProfile.email || "",
        phone: fallbackProfile.phone || "",
        role: UserRole.CLIENT,
        selectedPlan: selectedPlanValue,
        status: "active",
        createdAt: serverTimestamp(),
      };
      await setDoc(userDocRef, newProfile);
      
      // Auto analytics logs for new subscribers
      trackEvent("register_completed", { plan: selectedPlanValue });
      trackEvent("trial_started", { plan: selectedPlanValue });
      
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
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] z-10" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FF2718]/10 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 hex-bg opacity-[0.05]" />
      </div>

      <button
        onClick={() => onNavigate(Page.HOME)}
        className="absolute top-6 left-6 z-50 flex items-center gap-3 text-slate-500 hover:text-white transition-all group px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl"
      >
        <ChevronLeft size={16} />
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">
          DÉCONEXION_TERMINAL
        </span>
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[440px] relative group"
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-2 -right-2 size-8 border-t-2 border-r-2 border-[#FF2718]/40 rounded-tr-xl z-20" />
        <div className="absolute -bottom-2 -left-2 size-8 border-b-2 border-l-2 border-[#FF2718]/40 rounded-bl-xl z-20" />

        <div className="bg-[#0D0D12]/80 border border-white/10 p-6 sm:p-10 rounded-[2rem] backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF2718] to-transparent shadow-[0_0_10px_#FF2718]" />
          
          <div className="mb-8 flex flex-col items-center text-center relative z-10">
            <div className="relative mb-6 group/icon">
              <div className="absolute -inset-4 bg-[#FF2718]/20 blur-3xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-all duration-700" />
              <div className="size-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center relative transition-all group-hover/icon:scale-110">
                <Fingerprint size={28} className="text-[#FF2718]" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-none">
              TERMINAL <span className="text-[#FF2718] italic">AUTH</span>
            </h1>
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-[#FF2718] mt-3 flex items-center gap-2">
              <span className="size-1 bg-[#FF2718] rounded-full animate-ping" />
              ACCÈS SÉCURISÉ NEURAL
            </p>
          </div>

          <div className="relative z-10">
            {authError && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3"
              >
                <AlertTriangle className="text-red-500 shrink-0 mt-1" size={14} />
                <div className="flex-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-0.5">ERR_AUTH</p>
                  <p className="text-[11px] text-red-300/70 font-bold leading-tight">{authError.message}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-3">
              <AnimatePresence mode="popLayout">
                {mode === "signup" && (
                  <motion.div
                    key="signupFields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden mb-3"
                  >
                    {/* Plan Selector */}
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl mb-2">
                      <span className="text-[7px] font-black tracking-widest text-[#FF2718] uppercase block mb-2">PROGRAMME_PLAN_SÉLECTIONNÉ :</span>
                      <div className="grid grid-cols-4 gap-1">
                        {["starter", "business", "scale", "elite"].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => {
                              setSelectedPlan(p);
                              trackEvent("plan_selected", { plan: p });
                            }}
                            className={`py-1.5 px-1 rounded-lg border text-[8px] font-black uppercase text-center transition-all ${
                              selectedPlan === p
                                ? "bg-[#FF2718]/10 border-[#FF2718] text-[#FF2718] shadow-[0_0_8px_rgba(255,39,24,0.15)]"
                                : "bg-black/40 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="PRÉNOM"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-1/2 p-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest focus:border-[#FF2718]/40 outline-none transition-all rounded-xl"
                        required={mode === "signup"}
                      />
                      <input
                        type="text"
                        placeholder="NOM"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-1/2 p-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest focus:border-[#FF2718]/40 outline-none transition-all rounded-xl"
                        required={mode === "signup"}
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="CONTACT_NUM"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest focus:border-[#FF2718]/40 outline-none transition-all rounded-xl"
                      required={mode === "signup"}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="ID_IDENTIFICATION_EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#FF2718]/40 outline-none transition-all rounded-xl focus:bg-white/[0.08]"
                  required
                />

                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="CLÉ_SEC_NEST"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#FF2718]/40 outline-none transition-all rounded-xl pr-12 focus:bg-white/[0.08]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {mode === "login" && (
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[8px] text-[#FF2718]/70 hover:text-[#FF2718] transition-colors uppercase tracking-[0.3em] font-black"
                  >
                    RÉCUPÉRER_CLÉ
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-[#FF2718] text-white py-5 rounded-xl font-black uppercase tracking-[0.4em] text-[10px] transition-all flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-red-500/20 disabled:opacity-30 mt-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                {isLoading ? <Loader2 className="animate-spin" size={14} /> : <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />}
                {mode === "login" ? "DÉVERROUILLER_UNIT" : "CRÉER_NOEUD"}
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[7px] font-black text-slate-600 uppercase tracking-[0.5em]">Passerelle_Link</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] flex justify-center items-center gap-3 text-white py-4 font-black uppercase tracking-[0.3em] text-[9px] transition-all rounded-xl"
              >
                <Globe size={14} className="text-[#FF2718]" />
                VIA GOOGLE_NODE
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setAuthError(null);
                  }}
                  className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all underline underline-offset-4 decoration-white/10"
                >
                  {mode === "login" ? "PAS_DE_COMPTE ? CRÉER" : "EXISTANT ? LOGIN"}
                </button>


              </div>
            </div>
          </div>
        </div>

        {/* Floating status tags */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30">
           <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-widest text-[#FF2718]">
             <ShieldCheck size={10} /> ENCRYPTED
           </div>
           <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-widest text-slate-600">
             <Activity size={10} /> CORE: OK
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
