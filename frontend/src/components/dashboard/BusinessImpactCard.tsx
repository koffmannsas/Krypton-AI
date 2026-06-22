import React from "react";
import { TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface BusinessImpactCardProps {
  score: number;
}

export default function BusinessImpactCard({ score }: BusinessImpactCardProps) {
  // Translate score to actual value estimates
  const multiplier = score / 100;
  const potentialLeads = Math.round(150 * multiplier);
  const potentialRevenue = Math.round(3000000 * multiplier);

  return (
    <div className="bg-gradient-to-br from-[#111116] to-[#0A0A0C] border border-green-500/20 p-8 rounded-[32px] relative overflow-hidden">
      <div className="absolute -top-20 -right-20 size-60 bg-green-500/5 blur-[80px] rounded-full"></div>
      
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-green-500" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-green-500">Business Value Engine</h3>
          </div>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Capacité de votre système actel</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Score Fiko</p>
          <div className="text-3xl font-black italic text-white">{score}<span className="text-lg text-slate-500">/100</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 relative z-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Volume Mensuel</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white italic">+{potentialLeads}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Leads Qualifiés</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Cashflow Projeté</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-green-500 italic">+{potentialRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">FCFA</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-green-500" size={16} />
          <p className="text-xs text-slate-400 font-medium italic">
            "Ce système est calibré pour transformer votre trafic a 14% de conversion."
          </p>
        </div>
      </div>
    </div>
  );
}
