import React, { useState } from "react";
import { 
  UserCircle, 
  Mail, 
  Phone, 
  Briefcase, 
  Target, 
  Shield, 
  Camera,
  CheckCircle,
  AlertCircle,
  Loader2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { UserProfile } from "../../types";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

interface AccountPanelProps {
  user: UserProfile;
  onLogout: () => void;
  onUpdateUser: (profile: UserProfile) => void;
}

export default function AccountPanel({ user, onLogout, onUpdateUser }: AccountPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Local Form State
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [company, setCompany] = useState(user.company || "");
  const [objective, setObjective] = useState(user.objective || "");

  const [isSaving, setIsSaving] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorStatus(null);
    setSuccessStatus(null);

    try {
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("Le prénom et le nom sont requis.");
      }

      const userId = user.id || user.uid || "";
      if (!userId) {
        throw new Error("L'ID utilisateur est manquant.");
      }

      const userDocRef = doc(db, "users", userId);
      const updatedFields = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        company: company.trim(),
        objective: objective.trim()
      };

      await updateDoc(userDocRef, updatedFields);
      
      onUpdateUser({
        ...user,
        ...updatedFields
      });

      setSuccessStatus("Profil mis à jour avec succès !");
      setIsEditing(false);
      
      setTimeout(() => {
        setSuccessStatus(null);
      }, 4000);
    } catch (err: any) {
      console.error("AccountPanel Update Error:", err);
      setErrorStatus(err.message || "Impossible de sauvegarder les modifications.");
    } finally {
      setIsSaving(false);
    }
  };

  const profileItems = [
    { label: "Prénom", value: firstName, key: "firstName", icon: UserCircle, setter: setFirstName },
    { label: "Nom de famille", value: lastName, key: "lastName", icon: UserCircle, setter: setLastName },
    { label: "Adresse Email", value: user.email, key: "email", icon: Mail, verified: true, readOnly: true },
    { label: "Phone", value: phone, key: "phone", icon: Phone, setter: setPhone, placeholder: "+225 -- -- -- --" },
    { label: "Business", value: company, key: "company", icon: Briefcase, setter: setCompany, placeholder: "Nom de l'entreprise" },
    { label: "Objectif Business", value: objective, key: "objective", icon: Target, setter: setObjective, placeholder: "Expansion / Acquisition" },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Mon <span className="text-[#FF2718]">Compte</span>.</h2>
          <p className="text-slate-500 italic mt-1 uppercase text-[10px] tracking-widest font-bold">Informations personnelles et professionnelles</p>
        </div>
        <div className="flex gap-4">
          {isEditing ? (
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setErrorStatus(null);
                  // Reset states
                  setFirstName(user.firstName || "");
                  setLastName(user.lastName || "");
                  setPhone(user.phone || "");
                  setCompany(user.company || "");
                  setObjective(user.objective || "");
                }}
                className="px-6 py-4 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-4 bg-[#FF2718] hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-500/10 disabled:opacity-40"
              >
                {isSaving ? <Loader2 className="animate-spin" size={14} /> : null}
                Enregistrer les modifications
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-3"
            >
              Modifier mon profil
            </button>
          )}
        </div>
      </div>

      {successStatus && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="text-emerald-500" size={16} />
          <span className="text-xs text-emerald-100 font-bold">{successStatus}</span>
        </div>
      )}

      {errorStatus && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
          <AlertTriangle className="text-red-500" size={16} />
          <span className="text-xs text-red-100 font-bold">{errorStatus}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Avatar & Security */}
        <div className="space-y-6">
          <div className="bg-[#111116] border border-white/5 rounded-[40px] p-10 text-center relative overflow-hidden group">
            <div className="size-32 rounded-full bg-gradient-to-tr from-[#FF2718] to-orange-500 mx-auto mb-6 p-1 relative">
              <div className="size-full bg-[#111116] rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-black italic">{firstName[0] || user.firstName[0]}{lastName[0] || user.lastName[0]}</span>
              </div>
              <button className="absolute bottom-0 right-0 p-3 bg-white text-black rounded-full shadow-xl hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold uppercase tracking-tight">{firstName} {lastName}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FF2718] mt-1 italic">Krypton Member since 2026</p>
            
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-xs font-black italic mb-0.5">85%</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Confiance</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-black italic mb-0.5">ELITE</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Niveau</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-500" size={20} />
              <h4 className="text-xs font-black uppercase tracking-widest">Sécurité du compte</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                   <div className="size-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                    <CheckCircle size={16} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/50">2FA Activée</span>
                </div>
                <button className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-white">Gérer</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                   <div className="size-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                    <AlertCircle size={16} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Mot de passe</span>
                </div>
                <button className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-white">Réinitialiser</button>
              </div>
            </div>
          </div>

          {/* DANGER ZONE / SESSION CONTROL */}
          <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Contrôle de Session</h4>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 p-4 bg-red-500 text-white rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all"
            >
              <Shield size={16} />
              Se déconnecter (Logout)
            </button>
            <p className="text-[9px] text-center text-slate-500 font-bold uppercase tracking-widest leading-loose">
              Mettre fin à la session sécurisée AES-512
            </p>
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111116] border border-white/5 rounded-[40px] p-10">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-slate-500">Détails du Profil</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {profileItems.map((item, i) => (
                <div key={i} className="space-y-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-500 group-hover:text-white transition-colors">
                      <item.icon size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    {item.verified && (
                      <div className="flex items-center gap-1 text-[8px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                        Vérifié
                      </div>
                    )}
                  </div>
                  {isEditing && !item.readOnly ? (
                    <input 
                      type="text" 
                      value={item.value}
                      placeholder={item.placeholder}
                      onChange={(e) => item.setter && item.setter(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white outline-none focus:border-[#FF2718]/30 focus:bg-white/[0.08]"
                    />
                  ) : (
                    <p className="text-sm font-black text-white italic tracking-wide">
                      {item.value || <span className="text-slate-600 font-bold uppercase text-[10px]">Non configuré</span>}
                    </p>
                  )}
                  <div className="h-[1px] w-full bg-white/[0.03]"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#111116] to-[#0B0B0F] border border-white/5 rounded-[32px] p-8 flex items-center justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Passer à la Gouvernance GALAXY</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest italic font-medium">Débloquez les options multisites et les rapports consolidés.</p>
            </div>
            <button className="relative z-10 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all">
              Explorer
            </button>
            <div className="absolute top-0 right-0 h-full w-40 bg-[#FF2718]/5 blur-3xl -skew-x-12 translate-x-20 transition-transform group-hover:translate-x-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
