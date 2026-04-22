import React from "react";
import { 
  Target, 
  TrendingUp, 
  Briefcase, 
  Clock, 
  CheckCircle,
  Star,
  Shield,
  ArrowRight
} from "lucide-react";
import { UserProfile } from "../../types";

interface BusinessPanelProps {
  user: UserProfile;
}

export default function BusinessPanel({ user }: BusinessPanelProps) {
  const stats = [
    { label: "Secteur", value: user.businessType || "Digital / Tech", icon: Briefcase, color: "text-blue-500" },
    { label: "Objectif", value: user.objective || "Expansion Régionale", icon: Target, color: "text-red-500" },
    { label: "Budget IA", value: user.budget || "50k - 150k FCFA", icon: Star, color: "text-orange-500" },
    { label: "Urgence", value: user.urgency || "Critique (48H)", icon: Clock, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Mon <span className="text-[#E10600]">Business</span>.</h2>
          <p className="text-slate-500 italic mt-1 uppercase text-[10px] tracking-widest font-bold">Analyse stratégique de votre écosystème</p>
        </div>
        <button className="px-6 py-3 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
          Modifier mon profil business
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111116] border border-white/5 p-6 rounded-3xl">
            <stat.icon className={`${stat.color} mb-4`} size={20} />
            <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-sm font-bold text-white uppercase">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strategy Roadmap */}
        <div className="bg-[#111116] border border-white/5 rounded-3xl p-8">
          <h3 className="text-lg font-black uppercase tracking-widest mb-8 flex items-center gap-3">
            <TrendingUp size={20} className="text-[#E10600]" /> Roadmap Stratégique
          </h3>
          
          <div className="space-y-6">
            {[
              { id: "01", title: "Audit & Onboarding Fiko", status: "completed", desc: "Analyse complète des tunnels de conversion." },
              { id: "02", title: "Déploiement de l'Infrastructure", status: "completed", desc: "Configuration des serveurs et du domaine Krypton." },
              { id: "03", title: "Activation des Agents IA", status: "active", desc: "Mise en place de l'automatisation commerciale." },
              { id: "04", title: "Scaling & Expansion", status: "pending", desc: "Augmentation des flux de leads entrants." },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`size-10 rounded-xl flex items-center justify-center border transition-all ${
                    step.status === "completed" 
                    ? "bg-green-500/10 border-green-500/20 text-green-500" 
                    : step.status === "active" 
                      ? "bg-[#E10600]/10 border-[#E10600]/20 text-[#E10600] animate-pulse"
                      : "bg-white/5 border-white/10 text-slate-600"
                  }`}>
                    {step.status === "completed" ? <CheckCircle size={18} /> : <span className="text-[11px] font-black">{step.id}</span>}
                  </div>
                  {i < 3 && <div className="w-[2px] flex-1 bg-white/5 my-2"></div>}
                </div>
                <div className="pb-8">
                  <h4 className={`text-sm font-black uppercase tracking-widest mb-1 ${step.status === "pending" ? "text-slate-600" : "text-white"}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500/80 italic leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Report */}
        <div className="space-y-6">
          <div className="bg-[#E10600] rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
              <Shield size={100} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Protection Krypton AI</h3>
            <p className="text-sm font-medium italic opacity-80 leading-relaxed max-w-[280px]">
              Votre business est actuellement protégé par notre protocole AES-512. Vos données et vos leads sont sécurisés.
            </p>
            <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] bg-black/20 hover:bg-black/30 py-4 px-6 rounded-2xl transition-all">
              Vérifier la sécurité <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#E10600] mb-4">Opportunité de Croissance</h3>
            <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
              "Basé sur votre flux de leads actuel, une transition vers le pack ELITE permettrait d'augmenter votre chiffre d'affaires de 28% d'ici les 30 prochains jours."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">+28% ROI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
