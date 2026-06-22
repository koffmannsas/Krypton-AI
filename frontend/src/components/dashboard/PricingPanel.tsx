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

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="size-12 border-2 border-white/5 border-t-[#FF2718] rounded-full"
          />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Chargement des offres sécurisées...</p>
        </div>
      </div>
    );
  }

  // Find the order of the current plan to determine upgrades/downgrades
  const currentPlan = plans.find(p => p.id === currentPlanId) || plans[0];
  const currentOrder = currentPlan?.order || 0;

  return (
    <div className="space-y-12 pb-24">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Offres & <span className="text-[#FF2718]">Évolution</span>.</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Propulsez votre écosystème au niveau supérieur</p>
        </div>
        
        <div className="flex items-center gap-6 px-8 py-5 bg-white/[0.02] border border-white/10 rounded-[30px] backdrop-blur-xl">
          <div className="text-right">
            <p className="text-[9px] text-[#FF2718] font-black uppercase tracking-[0.3em] mb-1">Protection Active</p>
            <p className="text-sm font-black text-white uppercase italic">Pack {currentPlanId}</p>
          </div>
          <div className="size-12 bg-[#FF2718]/10 text-[#FF2718] rounded-2xl flex items-center justify-center border border-[#FF2718]/20 shadow-[0_0_20px_rgba(255,39,24,0.1)]">
            <ShieldCheck size={24} />
          </div>
        </div>
      </div>

      {/* HORIZONTAL PRICING GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          const isUpgrade = plan.order > currentOrder;
          const isDowngrade = plan.order < currentOrder;
          
          return (
            <motion.div 
              key={plan.id}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col bg-[#111116] rounded-[32px] border transition-all duration-500 overflow-hidden ${
                isCurrent 
                  ? "border-[#FF2718] shadow-[0_0_40px_rgba(255,39,24,0.15)] z-10" 
                  : "border-white/5 opacity-60 hover:opacity-100 hover:border-white/20"
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF2718]" />
              )}

              {/* CARD CONTENT */}
              <div className="p-6 flex flex-col h-full space-y-6">
                {/* TITLE & PRICE (Single line requirements) */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 truncate leading-none">{plan.name.replace("PORTE ", "")}</h3>
                  <div className="flex items-baseline justify-between gap-1 overflow-hidden">
                    <span className="text-lg font-black text-white italic truncate leading-none">{plan.price}</span>
                  </div>
                  <p className="text-[8px] font-bold text-[#FF2718]/60 uppercase tracking-widest mt-1">Infrastructure Multi-GPU</p>
                </div>

                <div className="h-px w-full bg-white/5" />

                {/* FEATURES LIST */}
                <div className="flex-1 space-y-4">
                  <div className="p-3 bg-white/[0.03] border border-white/5 rounded-2xl">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF2718] mb-1">Impact Business</p>
                    <p className="text-[10px] text-slate-200 font-bold leading-tight">{plan.story.split('.')[0]}.</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.included.slice(0, 7).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 group/item">
                        <div className="size-4 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover/item:bg-[#FF2718]/10 transition-colors">
                          <Check size={10} className="text-[#FF2718]" />
                        </div>
                        <span className="text-[10px] font-medium text-slate-400 group-hover/item:text-slate-200 transition-colors leading-tight line-clamp-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ACTION BUTTON */}
                <button 
                  disabled={isCurrent}
                  className={`w-full py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    isCurrent 
                      ? "bg-white/5 text-white/40 cursor-default" 
                      : isUpgrade
                        ? "bg-[#FF2718] text-white hover:bg-[#FF3728] shadow-lg shadow-red-500/20"
                        : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {isCurrent ? "Plan Actif" : isUpgrade ? "Upgrade" : "Downgrade"}
                  {!isCurrent && <ArrowRight size={12} />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ADDITIONAL INFO FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[24px] flex items-center gap-6 group hover:border-[#FF2718]/30 transition-colors">
          <div className="size-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
            <Globe size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Expansion Galaxy</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Infrastructure dédiée & GPU clusters pour besoins massifs.</p>
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[24px] flex items-center gap-6 group hover:border-yellow-500/30 transition-colors">
          <div className="size-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500">
            <Star size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Support Architectural</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Audit stratégique offert pour tout passage au pack KRYPTON.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
