import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Zap, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react";
import { UserProfile, FikoEconomicForecast } from "../../types";

interface ForecastEngineProps {
  user: UserProfile;
}

export default function FikoEconomicForecastEngine({ user }: ForecastEngineProps) {
  const [forecasts, setForecasts] = useState<FikoEconomicForecast[]>([]);
  const [loading, setLoading] = useState(false);

  const runForecast = () => {
    setLoading(true);
    setTimeout(() => {
        const newForecast: FikoEconomicForecast = {
            id: `fc-${Date.now()}`,
            userId: user.uid,
            forecastType: 'market_growth',
            confidenceScore: 88,
            projectedGrowth: 28,
            economicRisk: 'low',
            opportunityLevel: 'strong',
            strategicRecommendation: "Accélération acquisition recommandée",
            marketSignals: { trend: 'upward' },
            generatedAt: new Date(),
            forecastWindow: '90d',
            status: 'active'
        };
        setForecasts([newForecast, ...forecasts]);
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#111116] border border-white/5 p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white">
          <BarChart size={16} className="text-emerald-500" /> Economic Forecast
        </h3>
        <button 
          onClick={runForecast}
          disabled={loading}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {loading ? <Zap size={16} className="animate-spin text-emerald-400" /> : <TrendingUp size={16} />}
        </button>
      </div>

       <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
          {forecasts.map((fc) => (
            <motion.div 
               key={fc.id} 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl space-y-2"
            >
                <div className="flex justify-between items-center">
                    <p className="text-xs text-emerald-300 font-bold uppercase tracking-widest">{fc.forecastType.replace('_', ' ')}</p>
                    <span className="text-2xl font-black text-emerald-400">+{fc.projectedGrowth}%</span>
                </div>
                <p className="text-xs text-white leading-relaxed">{fc.strategicRecommendation}</p>
                 <div className="flex gap-2">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        {fc.confidenceScore}% Confiance
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        {fc.forecastWindow}
                    </span>
                 </div>
            </motion.div>
          ))}
          {forecasts.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center opacity-40">
                <TrendingUp size={48} className="text-emerald-500 mb-4" />
                <p className="text-xs text-slate-400 italic">En attente de simulations macro-éco...</p>
             </div>
          )}
      </div>
    </div>
  );
}
