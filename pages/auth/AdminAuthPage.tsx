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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] bg-[#0D0D12]/80 border border-[#E10600]/30 p-10 rounded-sm shadow-2xl shadow-[#E10600]/10"
      >
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-[#E10600]/10 border border-[#E10600]/30 rounded-full flex items-center justify-center mb-6">
            <Crown size={32} className="text-[#E10600]" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-white">
            Krypton <span className="text-[#E10600]">Admin</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-2">
            Accès Sécurisé
          </p>
        </div>

        {authError && (
          <div className="mb-8 p-4 bg-red-950/30 border border-[#E10600]/50 rounded-sm text-sm text-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-[#E10600] shrink-0 mt-0.5" size={18} />
              <div className="flex-1">
                <p className="font-semibold mb-1">Erreur de sécurité</p>
                <p className="text-red-300/80 mb-3">{authError.message}</p>
                
                {authError.isDomainError && authError.domain && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black/60 border border-[#E10600]/30 rounded-sm">
                      <code className="text-xs text-red-400 break-all">{authError.domain}</code>
                      <button 
                        onClick={() => handleCopyDomain(authError.domain!)}
                        className="ml-3 p-1.5 hover:bg-white/10 rounded-sm transition-colors text-slate-400 hover:text-white shrink-0"
                        title="Copier le domaine"
                      >
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    
                    <a 
                      href={`https://console.firebase.google.com/project/${auth.app.options.projectId}/authentication/settings`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#E10600] hover:text-red-400 transition-colors uppercase tracking-wider"
                    >
                      Ouvrir la console Firebase <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-[#E10600] hover:bg-red-700 text-white py-4 flex justify-center items-center gap-3 font-black uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-[#E10600]/20"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
          Connexion Google
        </button>
      </motion.div>
    </div>
  );
};

export default AdminAuthPage;
