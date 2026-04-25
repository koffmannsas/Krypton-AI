import React from "react";
import { Zap, ArrowRight, X, Sparkles, TrendingUp, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Opportunity } from "../../types";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onAction: (opp: Opportunity) => void;
  onDismiss: (opp: Opportunity) => void;
}

export default function OpportunityCard({ opportunity, onAction, onDismiss }: OpportunityCardProps) {
  
  const getOppDetails = (type: string) => {
    switch (type) {
      case 'upgrade':
        return {
          title: "🚀 Croissance Explosive Détectée",
          desc: "Votre flux de leads dépasse les capacités de votre offre actuelle. Passez à l'étape supérieure pour tout automatiser.",
          cta: "Voir l'offre ELITE",
          icon: TrendingUp,
          color: "text-green-500",
          bg: "bg-green-500/10",
          border: "border-green-500/20"
        };
      case 'activation_agents':
        return {
          title: "🤖 Force de Vente Inactive",
          desc: "Vos agents IA sont configurés mais en veille. Les activer augmenterait votre réactivité de 400%.",
          cta: "Activer les Agents",
          icon: Bot,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20"
        };
      case 'conversion_optimization':
        return {
          title: "⚡ Fuite de Conversion",
          desc: "Beaucoup de leads entrants mais taux de qualification faible. Laissez l'IA optimiser le processus.",
          cta: "Optimiser les tunnels",
          icon: Sparkles,
          color: "text-fuchsia-500",
          bg: "bg-fuchsia-500/10",
          border: "border-fuchsia-500/20"
        };
      default:
        return {
          title: "🚀 Nouvelle Opportunité",
          desc: "Fiko a détecté une faille de croissance dans votre système.",
          cta: "Découvrir la stratégie",
          icon: Zap,
          color: "text-[#FF2718]",
          bg: "bg-[#FF2718]/10",
          border: "border-[#FF2718]/20"
        };
    }
  };

  const details = getOppDetails(opportunity.type);
  const Icon = details.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`relative overflow-hidden rounded-[32px] p-6 border ${details.border} bg-[#111116] group shadow-2xl`}
    >
      {/* Background glow */}
      <div className={`absolute top-0 right-0 p-10 ${details.bg} blur-3xl rounded-full opacity-50`}></div>

      <button 
        onClick={() => onDismiss(opportunity)}
        className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white bg-black/20 rounded-full transition-colors z-10"
      >
        <X size={14} />
      </button>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`size-10 rounded-xl ${details.bg} flex items-center justify-center ${details.color}`}>
            <Icon size={20} />
          </div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white">
            {details.title}
          </h4>
        </div>

        <p className="text-xs text-slate-400 font-medium italic mb-6 leading-relaxed">
          "{details.desc}"
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Impact Potentiel</p>
            <p className="text-lg font-black text-white italic">+{opportunity.impact} <span className="text-[10px] text-slate-500">leads/mois</span></p>
          </div>
          <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Revenu Estimé</p>
            <p className={`text-lg font-black italic ${details.color}`}>+{(opportunity.value / 1000000).toFixed(1)}M <span className="text-[10px]">CFA</span></p>
          </div>
        </div>

        <button 
          onClick={() => onAction(opportunity)}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all bg-white/5 border border-white/10 hover:${details.bg} text-white group-hover:bg-white group-hover:text-black`}
        >
          {details.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
