import React from "react";
import { 
  Zap, 
  Check, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Star,
  Globe,
  Bot
} from "lucide-react";
import { motion } from "framer-motion";
import { usePricing } from "../../hooks/usePricing";

interface PricingPanelProps {
  currentPlanId: string;
}

export default function PricingPanel({ currentPlanId }: PricingPanelProps) {
  const { plans, loading } = usePricing();

  // Mocking Fiko's recommendation
  const recommendedPlanId = "MARS";

  if (loading) {
    return <div className="animate-pulse flex space-x-4">Chargement des offres...</div>;
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Offres & <span className="text-[#E10600]">Évolution</span>.</h2>
          <p className="text-slate-500 italic mt-1 uppercase text-[10px] tracking-widest font-bold">Augmentez la puissance de votre écosystème</p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#E10600]/10 border border-[#E10600]/20 p-4 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] text-[#E10600] font-black uppercase tracking-widest mb-1">Plan Actuel</p>
            <p className="text-sm font-black text-white italic">PORTA {currentPlanId}</p>
          </div>
          <div className="p-3 bg-[#E10600]/20 text-[#E10600] rounded-xl">
            <ShieldCheck size={20} />
          </div>
        </div>
      </div>

      <div className="bg-[#111116] border border-[#E10600]/30 rounded-3xl p-8 flex items-center gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <Bot size={120} />
        </div>
        <div className="size-20 rounded-2xl bg-[#E10600]/10 flex items-center justify-center text-[#E10600] shrink-0 border border-[#E10600]/20 shadow-[0_0_20px_rgba(225,6,0,0.1)]">
          <Sparkles size={32} className="animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-black uppercase tracking-widest text-white mb-2 flex items-center gap-2">
            Recommandation de <span className="text-[#E10600]">Fiko</span>
          </h3>
          <p className="text-sm text-slate-400 italic max-w-2xl leading-relaxed">
            "Basé sur votre croissance actuelle de 12% ce mois-ci, le passage au pack <span className="text-white font-bold">ELITE</span> est recommandé pour débloquer l'agent Marketing et saturer votre tunnel de conversion."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          const isRecommended = plan.id === recommendedPlanId;

          return (
            <div key={plan.id} className={`bg-[#111116] rounded-[40px] p-10 border transition-all relative ${
              isCurrent ? "border-green-500/30" : isRecommended ? "border-[#E10600]/50 shadow-[0_0_50px_rgba(225,6,0,0.1)]" : "border-white/5 opacity-80"
            }`}>
              {isRecommended && !isCurrent && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#E10600] text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-xl">
                  Conseillé par l'IA
                </div>
              )}
              
              {isCurrent && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-green-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-xl">
                  Plan Actif
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{plan.id}</h4>
                  <h3 className="text-3xl font-black italic tracking-tighter mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black italic">{plan.price}</span>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5"></div>

                <ul className="space-y-4">
                  {plan.included.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 size-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Check size={10} className={isRecommended ? "text-[#E10600]" : "text-slate-400"} />
                      </div>
                      <span className="text-xs font-medium text-slate-300 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  disabled={isCurrent}
                  className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                    isCurrent 
                    ? "bg-green-500/10 border border-green-500/20 text-green-500 opacity-50 cursor-default" 
                    : isRecommended 
                      ? "bg-[#E10600] text-white hover:bg-red-700 shadow-xl shadow-red-500/20" 
                      : "bg-white/5 border border-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {isCurrent ? "Utilisation en cours" : "Upgrade Maintenant"}
                  {!isCurrent && <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
          <Globe className="text-blue-500 mb-4" size={32} />
          <h4 className="text-lg font-black uppercase tracking-tight mb-2">Expansion Galaxy</h4>
          <p className="text-xs text-slate-500 italic leading-relaxed">
            "Besoin de plus que le pack ELITE ? Notre offre GALAXY offre une gestion d'infrastructure dédiée et des serveurs GPU pour vos propres modèles IA."
          </p>
          <button className="mt-6 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:underline">Consulter l'offre Entreprise</button>
        </div>
        <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
          <Star className="text-yellow-500 mb-4" size={32} />
          <h4 className="text-lg font-black uppercase tracking-tight mb-2">Audit Stratégique Offert</h4>
          <p className="text-xs text-slate-500 italic leading-relaxed">
            "Pour tout upgrade vers ELITE ce mois-ci, une session de 30 minutes avec notre Lead Architect est incluse pour optimiser votre tunnel."
          </p>
          <button className="mt-6 text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:underline">Réserver mon créneau</button>
        </div>
      </div>
    </div>
  );
}
