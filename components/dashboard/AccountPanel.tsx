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
  AlertCircle
} from "lucide-react";
import { UserProfile } from "../../types";

interface AccountPanelProps {
  user: UserProfile;
}

export default function AccountPanel({ user }: AccountPanelProps) {
  const [isEditing, setIsEditing] = useState(false);

  const profileItems = [
    { label: "Nom Complet", value: `${user.firstName} ${user.lastName}`, icon: UserCircle },
    { label: "Adresse Email", value: user.email, icon: Mail, verified: true },
    { label: "Phone", value: user.phone || "+225 -- -- -- --", icon: Phone },
    { label: "Business", value: user.company || "Non renseigné", icon: Briefcase },
    { label: "Objectif Business", value: user.objective || user.objective || "Expansion Regionale", icon: Target },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Mon <span className="text-[#E10600]">Compte</span>.</h2>
          <p className="text-slate-500 italic mt-1 uppercase text-[10px] tracking-widest font-bold">Informations personnelles et professionnelles</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-3"
          >
            {isEditing ? "Enregistrer les modifications" : "Modifier mon profil"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Avatar & Security */}
        <div className="space-y-6">
          <div className="bg-[#111116] border border-white/5 rounded-[40px] p-10 text-center relative overflow-hidden group">
            <div className="size-32 rounded-full bg-gradient-to-tr from-[#E10600] to-orange-500 mx-auto mb-6 p-1 relative">
              <div className="size-full bg-[#111116] rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-black italic">{user.firstName[0]}{user.lastName[0]}</span>
              </div>
              <button className="absolute bottom-0 right-0 p-3 bg-white text-black rounded-full shadow-xl hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold uppercase tracking-tight">{user.firstName} {user.lastName}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#E10600] mt-1 italic">Krypton Member since 2026</p>
            
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
                  {isEditing ? (
                    <input 
                      type="text" 
                      defaultValue={item.value}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white outline-none focus:border-[#E10600]/30"
                    />
                  ) : (
                    <p className="text-sm font-black text-white italic tracking-wide">{item.value}</p>
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
            <div className="absolute top-0 right-0 h-full w-40 bg-[#E10600]/5 blur-3xl -skew-x-12 translate-x-20 transition-transform group-hover:translate-x-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
