import React from "react";
import { 
  Monitor, 
  Settings, 
  Code2, 
  Palette, 
  Rocket, 
  Search, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectTracking() {
  const steps = [
    { title: "Design Concept", status: "completed", percent: 100, icon: Palette },
    { title: "Développement Front", status: "completed", percent: 100, icon: Code2 },
    { title: "Intégration IA (Fiko)", status: "active", percent: 65, icon: Settings },
    { title: "Optimisation SEO", status: "pending", percent: 0, icon: Search },
    { title: "Déploiement Live", status: "pending", percent: 0, icon: Rocket },
  ];

  const overallProgress = 55;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Mon <span className="text-blue-500">Site Web</span>.</h2>
          <p className="text-slate-500 font-medium italic mt-1 uppercase text-[10px] tracking-widest font-bold">Suivi de production en temps réel</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Livraison Estimée</p>
            <p className="text-sm font-black text-white italic">24 AVRIL 2026</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <Clock size={20} />
          </div>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="bg-[#111116] border border-white/5 p-10 rounded-[40px]">
        <div className="flex justify-between items-end mb-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Avancement Global</p>
            <h3 className="text-5xl font-black italic tracking-tighter">{overallProgress}%</h3>
          </div>
          <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-full text-[10px] font-black tracking-widest uppercase">
            En Production
          </div>
        </div>
        
        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          />
        </div>
      </div>

      {/* Detail Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, i) => (
          <div key={i} className={`p-6 rounded-3xl border transition-all ${
            step.status === "completed" 
            ? "bg-green-500/5 border-green-500/10" 
            : step.status === "active"
              ? "bg-blue-500/5 border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.1)]"
              : "bg-white/5 border-white/5 opacity-50"
          }`}>
            <div className={`p-3 rounded-2xl mb-6 inline-flex ${
              step.status === "completed" 
              ? "bg-green-500/20 text-green-500" 
              : step.status === "active"
                ? "bg-blue-500/20 text-blue-500 animate-pulse"
                : "bg-white/10 text-slate-600"
            }`}>
              <step.icon size={20} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 h-8 leading-tight">{step.title}</h4>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <span className="text-[10px] font-bold opacity-50">{step.percent}%</span>
              {step.status === "completed" && <CheckCircle2 size={14} className="text-green-500" />}
            </div>
          </div>
        ))}
      </div>

      <div className="flex bg-[#111116] border border-white/5 rounded-3xl overflow-hidden p-8 gap-8 items-center">
        <div className="size-24 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
          <Monitor size={48} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-black uppercase tracking-widest mb-2">Pre-visualisation disponible</h3>
          <p className="text-sm text-slate-500 italic max-w-lg">
            "Le squelette de votre plateforme est prêt. Vous pouvez explorer les premières maquettes interactives pour validation."
          </p>
        </div>
        <button className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all shrink-0">
          Accéder à la Preview
        </button>
      </div>
    </div>
  );
}
