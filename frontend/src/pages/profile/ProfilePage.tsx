import React, { useState, useEffect } from "react";
import { Page, UserProfile, UserRole } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Target, 
  ShieldCheck, 
  KeyRound, 
  Loader2, 
  Save, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  Trophy,
  Activity,
  LogOut,
  Sparkles
} from "lucide-react";
import { db, auth } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

interface ProfilePageProps {
  user: UserProfile | null;
  onUpdateUser: (profile: UserProfile) => void;
  onNavigate: (p: Page) => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  onNavigate,
  onLogout,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [objective, setObjective] = useState("");
  const [businessType, setBusinessType] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Sync initial state if user changes or loads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
      setCompany(user.company || "");
      setObjective(user.objective || "");
      setBusinessType(user.businessType || "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex flex-col justify-center items-center p-6">
        <div className="animate-spin text-[#FF2718] mb-4">
          <Loader2 size={32} />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-[#8B8B8B]">Identification en cours...</p>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorStatus(null);
    setSuccessStatus(null);

    try {
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("Le prénom et le nom sont requis.");
      }

      const userDocRef = doc(db, "users", user.id || user.uid || "");
      
      const updatedData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        company: company.trim(),
        objective: objective.trim(),
        businessType: businessType.trim()
      };

      await updateDoc(userDocRef, updatedData);

      // Fetch the updated doc to guarantee absolute alignment
      const freshSnap = await getDoc(userDocRef);
      if (freshSnap.exists()) {
        const freshProfile = freshSnap.data() as UserProfile;
        onUpdateUser(freshProfile);
      } else {
        // Fallback update
        onUpdateUser({
          ...user,
          ...updatedData
        });
      }

      setSuccessStatus("Votre profil de commandement a été mis à jour avec succès.");
      
      // Auto fadeout success status
      setTimeout(() => {
        setSuccessStatus(null);
      }, 5000);
    } catch (err: any) {
      console.error("Profile Edit Error:", err);
      setErrorStatus(err.message || "Une erreur est survenue lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendResetEmail = async () => {
    if (!user.email) return;
    setIsSendingReset(true);
    setErrorStatus(null);
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    } catch (err: any) {
      console.error("Reset Email Error:", err);
      setErrorStatus(err.message || "Impossible de déclencher la procédure de réinitialisation.");
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Neural Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-[#FF2718]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-[350px] h-[350px] bg-red-800/[0.03] rounded-full blur-[100px]" />
        <div className="absolute inset-0 hex-bg opacity-[0.03]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Header Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => onNavigate(Page.CLIENT_DASHBOARD)}
            className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group w-fit px-4 py-2 bg-white/5 border border-white/5 rounded-xl backdrop-blur-md"
            id="back-to-dashboard-btn"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">
              RETOUR_DASHBOARD
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500">
              TERMINAL SECURE NODE: CONNECTÉ
            </span>
          </div>
        </div>

        {/* PROFILE TITLE BLOCK */}
        <div className="border border-white/5 bg-[#0B0B10]/80 rounded-[2.5rem] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF2718]/40 to-[#FF2718] w-full" />
          
          <div className="flex items-center gap-6">
            <div className="size-20 rounded-2xl bg-gradient-to-br from-[#FF2718] to-orange-600 p-[1px] relative shrink-0">
              <div className="size-full bg-[#0D0D12] rounded-2xl flex items-center justify-center overflow-hidden font-mono text-3xl font-black italic text-white">
                {firstName[0] || user.firstName[0] || "K"}
                {lastName[0] || user.lastName[0] || "A"}
              </div>
              <div className="absolute -bottom-1 -right-1 size-5 bg-[#FF2718] rounded-md flex items-center justify-center text-[8px] font-black italic shadow">
                U
              </div>
            </div>
            
            <div>
              <div className="font-mono text-[9px] uppercase text-[#FF2718] tracking-[3px] mb-1 font-bold">Identité de l'Infrastructure</div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white m-0">
                {firstName || user.firstName} {lastName || user.lastName}
              </h2>
              <p className="text-xs text-slate-400 font-medium tracking-wide mt-1 italic uppercase">
                {user.company || "Membre Sans Organisation"}
              </p>
            </div>
          </div>

          <div className="h-px md:h-12 w-full md:w-px bg-white/10 my-1 md:my-0" />

          <div className="flex flex-col gap-1 md:text-right">
            <span className="font-mono text-[9px] uppercase text-slate-500 tracking-[2px] font-bold">Statut & Licence</span>
            <span className="text-lg font-black text-white uppercase tracking-wider block">
              PORTE {user.role === UserRole.CLIENT ? "MEMBRE CLI" : user.role === UserRole.ADMIN ? "HQ ADMIN" : "ROOT ACCESS"}
            </span>
            <span className="text-[10px] text-[#FF2718] font-mono mt-0.5 block uppercase">
              Actif depuis {new Date(user.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>

        {/* MESSAGES / NOTIFICATIONS OF UPDATE STATUS */}
        <AnimatePresence mode="popLayout">
          {successStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4 shadow-xl"
            >
              <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Mise à jour Réussie</h5>
                <p className="text-xs text-emerald-100/80 font-bold leading-relaxed">{successStatus}</p>
              </div>
            </motion.div>
          )}

          {errorStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4 shadow-xl"
            >
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">Erreur Terminal</h5>
                <p className="text-xs text-red-100/80 font-bold leading-relaxed">{errorStatus}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DETAILED FORM MODULE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT PANELS: CLOUD QUOTAS & SECURITY OPTIONS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* SUBSCRIPTION SUMMARY PANEL */}
            <div className="bg-[#0B0B0F]/80 border border-white/5 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl">
              <div className="absoulute inset-0 bg-[#FF2718]/[0.01] pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="text-[#FF2718]" size={18} />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Quotas & Moteur IA</h4>
              </div>

              {user.subscription ? (
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-slate-500 uppercase">Leads Qualifiés</span>
                      <span className="text-white font-black italic">{user.subscription.leadsUsed} / {user.subscription.leadsLimit}</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-600 to-[#FF2718] h-full" 
                        style={{ width: `${Math.min(100, (user.subscription.leadsUsed / user.subscription.leadsLimit) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-[18px] font-black italic text-white antialiased">{user.subscription.campaignsCount}</div>
                      <div className="text-[8px] font-black tracking-wider text-slate-500 uppercase mt-0.5">Campagnes</div>
                    </div>
                    <div>
                      <div className="text-[18px] font-black italic text-white antialiased">{user.subscription.emailCredits}</div>
                      <div className="text-[8px] font-black tracking-wider text-slate-500 uppercase mt-0.5">Crédits Email</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-400 font-bold tracking-tight text-xs leading-relaxed">
                    Vous êtes actuellement sur le forfait standard. Augmentez la capacité réseau pour activer plus de SDRs.
                  </p>
                  <button
                    onClick={() => onNavigate(Page.PRICING)}
                    className="w-full py-3 bg-[#FF2718]/10 hover:bg-[#FF2718]/20 border border-[#FF2718]/30 transition-all text-white text-[9px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"
                  >
                    <Sparkles size={12} className="text-[#FF2718]" />
                    Changer de forfait
                  </button>
                </div>
              )}
            </div>

            {/* PASSWORD CONTROL PASS */}
            <div className="bg-[#0B0B0F]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3">
                <KeyRound className="text-[#FF2718]" size={18} />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Sécurité de l'Authentification</h4>
              </div>
              <p className="text-xs text-slate-400 font-bold tracking-tight leading-relaxed">
                Le mot de passe de votre terminal s'administre via une clé d'activation envoyée par email.
              </p>

              <button
                type="button"
                onClick={handleSendResetEmail}
                disabled={isSendingReset || resetSent}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
              >
                {isSendingReset ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : resetSent ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : (
                  <Mail size={14} />
                )}
                {resetSent ? "LIEN PAR EMAIL ENVOYÉ !" : "RÉINITIALISER LE MOT DE PASSE"}
              </button>
            </div>

            {/* DANGER DESTRUCTION ACTION */}
            <div className="border border-red-500/10 bg-red-500/[0.02] rounded-3xl p-6 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-red-500">
                <Activity size={14} />
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em]">DANGER_ZONE</span>
              </div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                Mettre fin à votre session et verrouiller le terminal
              </p>
              <button
                type="button"
                onClick={onLogout}
                className="w-full py-3.5 bg-red-500 text-white rounded-xl font-black uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-red-500/10 hover:bg-red-600 transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={12} />
                Se déconnecter (LOGOUT)
              </button>
            </div>

          </div>

          {/* RIGHT COL: EDITABLE DATA BLOCKS */}
          <div className="lg:col-span-2">
            <form onSubmit={handleUpdateProfile} className="bg-[#0B0B0F]/80 border border-white/5 rounded-[2rem] p-6 sm:p-10 space-y-8 backdrop-blur-xl">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Paramètres Généraux</h3>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Configurez les variables d'identité synchronisables.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* FIRST NAME */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-[#FF2718] transition-colors flex items-center gap-2">
                    <User size={12} /> Prénom <span className="text-[#FF2718]">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white outline-none focus:border-[#FF2718]/40 transition-all focus:bg-white/[0.08]"
                    required
                  />
                </div>

                {/* LAST NAME */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-[#FF2718] transition-colors flex items-center gap-2">
                    <User size={12} /> Nom de famille <span className="text-[#FF2718]">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white outline-none focus:border-[#FF2718]/40 transition-all focus:bg-white/[0.08]"
                    required
                  />
                </div>

                {/* TELEPHONE */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-[#FF2718] transition-colors flex items-center gap-2">
                    <Phone size={12} /> Numéro de Contact
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white outline-none focus:border-[#FF2718]/40 transition-all focus:bg-white/[0.08]"
                    placeholder="+225 000 000 0000"
                  />
                </div>

                {/* COMPANY / BUSINESS */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-[#FF2718] transition-colors flex items-center gap-2">
                    <Briefcase size={12} /> Organisation / Entreprise
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white outline-none focus:border-[#FF2718]/40 transition-all focus:bg-white/[0.08]"
                    placeholder="Nom de l'entreprise"
                  />
                </div>

                {/* BUSINESS TYPE */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-[#FF2718] transition-colors flex items-center gap-2">
                    <Sparkles size={12} /> Type de Business
                  </label>
                  <input
                    type="text"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white outline-none focus:border-[#FF2718]/40 transition-all focus:bg-white/[0.08]"
                    placeholder="E-commerce, B2B, Agence, SaaS..."
                  />
                </div>

                {/* GOAL / OBJECTIVE */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-[#FF2718] transition-colors flex items-center gap-2">
                    <Target size={12} /> Objectif Commercial
                  </label>
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white outline-none focus:border-[#FF2718]/40 transition-all focus:bg-white/[0.08]"
                    placeholder="Fermer des leads automatisés, qualifier..."
                  />
                </div>

              </div>

              {/* READ-ONLY ACCOUNT CONSTANT SPEC */}
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-3">
                <Mail className="text-slate-500 shrink-0" size={14} />
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase block">Adresse Email Bloquée</span>
                  <span className="text-xs font-mono text-slate-400 block truncate">{user.email}</span>
                </div>
                <div className="px-2 py-0.5 border border-green-500/20 bg-green-500/5 text-xs text-green-500 font-mono scale-[0.8] tracking-widest uppercase rounded">
                  Vérifié
                </div>
              </div>

              {/* SAVE ACTION */}
              <div className="flex justify-end pt-4 border-t border-white/5">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-4.5 bg-[#FF2718] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl flex items-center gap-3 transition-all hover:bg-red-700 shadow-xl shadow-red-500/10 disabled:opacity-40"
                  id="save-profile-btn"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <Save size={14} />
                  )}
                  {isSaving ? "SAUVEGARDE..." : "ENREGISTRER LES MODIFICATIONS"}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
