import React, { useState } from "react";
import { Page, UserRole, UserProfile } from "../../types";
import { motion } from "framer-motion";
import { Loader2, Crown, AlertTriangle, Copy, Check, ExternalLink } from "lucide-react";

// 🔥 FIREBASE
import { auth, db } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface AdminAuthPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (p: Page) => void;
}

const AdminAuthPage: React.FC<AdminAuthPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<{ message: string; domain: string | null; isDomainError: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  const BOOTSTRAP_ADMIN = "koffmannsas@gmail.com";

  const handleCopyDomain = (domain: string) => {
    navigator.clipboard.writeText(domain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    const provider = new GoogleAuthProvider();

    try {
      // 🔐 LOGIN
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Fetch from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let userProfile: UserProfile;

      if (userDoc.exists()) {
        userProfile = userDoc.data() as UserProfile;

        // Security Check: Only allow ADMIN or SUPER_ADMIN
        if (
          userProfile.role !== UserRole.ADMIN &&
          userProfile.role !== UserRole.SUPER_ADMIN &&
          user.email !== BOOTSTRAP_ADMIN
        ) {
          await auth.signOut();
          throw new Error(
            "Accès refusé. Vous n'avez pas les droits d'administration.",
          );
        }
      } else {
        // Bootstrap Logic: If specific email, create admin profile
        if (user.email === BOOTSTRAP_ADMIN) {
          userProfile = {
            id: user.uid,
            uid: user.uid,
            firstName: user.displayName?.split(" ")[0] || "Super",
            lastName: user.displayName?.split(" ").slice(1).join(" ") || "Admin",
            email: user.email,
            role: UserRole.SUPER_ADMIN,
            status: "active",
            createdAt: serverTimestamp(),
          };
          await setDoc(userDocRef, userProfile);
        } else {
          await auth.signOut();
          throw new Error("Profil administrateur introuvable.");
        }
      }

      setIsLoading(false);
      onLoginSuccess(userProfile);
    } catch (error: any) {
      console.error("Erreur Auth Admin:", error?.message || error);
      setIsLoading(false);

      const errorMsg = error?.message || "";
      const errorCode = error?.code || "";

      if (errorCode === 'auth/popup-closed-by-user') {
        setAuthError({ message: "La connexion a été annulée.", domain: null, isDomainError: false });
      } else if (errorCode === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        setAuthError({ message: `Domaine non autorisé. Vous devez ajouter ce domaine aux domaines autorisés dans la console Firebase.`, domain: domain, isDomainError: true });
      } else {
        setAuthError({ message: errorMsg || "Erreur inconnue", domain: null, isDomainError: false });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#FF2718]/10 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 hex-bg opacity-[0.03]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[460px] bg-[#0D0D12]/60 border border-[#FF2718]/20 p-8 md:p-12 rounded-[40px] backdrop-blur-2xl relative shadow-[0_0_80px_rgba(255,39,24,0.1)]"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2718]/40 to-transparent" />

        <div className="mb-12 text-center flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#FF2718]/15 blur-2xl rounded-full opacity-50 transition-opacity" />
            <div className="w-20 h-20 bg-[#FF2718]/10 border border-[#FF2718]/30 rounded-3xl flex items-center justify-center mb-8 relative transition-transform hover:scale-105">
              <Crown size={36} className="text-[#FF2718]" />
            </div>
          </div>
          
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
            FIKO <span className="text-[#FF2718]">SYSTEM</span>.
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-4 leading-relaxed">
            Authentification Administrateur
          </p>
        </div>

        {authError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-red-500/5 border border-red-500/20 rounded-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="size-8 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                <AlertTriangle className="text-[#FF2718]" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#FF2718] mb-1">Violation d'accès</p>
                <p className="text-xs text-red-300/80 font-medium leading-relaxed mb-4">{authError.message}</p>
                
                {authError.isDomainError && authError.domain && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-xl">
                      <code className="text-[10px] text-red-400 break-all font-mono font-bold">{authError.domain}</code>
                      <button 
                        onClick={() => handleCopyDomain(authError.domain!)}
                        className="ml-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-500 hover:text-white shrink-0"
                      >
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="group relative w-full bg-white text-black py-6 rounded-2xl flex justify-center items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-slate-100 active:scale-95 disabled:opacity-50 overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : <div className="size-4 bg-black rounded-full scale-75" />}
          Accéder via Google
        </button>

        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center opacity-30">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
            Protocole de sécurité AES-512 actif
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuthPage;
