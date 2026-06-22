import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  ShieldAlert, 
  Target,
  ArrowRight,
  Shuffle
} from "lucide-react";
import { UserProfile, FikoStrategicModeType, FikoImpactSimulation } from "../../types";

interface ImpactSimulatorProps {
  user: UserProfile;
  activeMode: FikoStrategicModeType;
}

export default function FikoImpactSimulator({ user, activeMode }: ImpactSimulatorProps) {
  const [simulation, setSimulation] = useState<FikoImpactSimulation | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    // Simulate IA processing
    setTimeout(() => {
        setSimulation({
            id: `sim-${Date.now()}`,
            userId: user.uid,
            simulationType: 'strategic',
            projectedImpact: Math.floor(Math.random() * 40) + 10,
            confidence: 85 + Math.floor(Math.random() * 10),
            riskLevel: 'low',
            strategicMode: activeMode,
            generatedAt: new Date(),
            marketFactors: { saturation: 'low', growth: 'high' }
        });
        setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="bg-[#111116] border border-white/5 p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white">
          <Calculator size={16} className="text-violet-500" /> Simulateur Impact Fiko
        </h3>
        <button 
          onClick={runSimulation}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <Shuffle size={16} />
        </button>
      </div>

      {simulation ? (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-6"
        >
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-xs uppercase tracking-widest text-slate-400">Croissance Projetée</span>
                <span className="text-2xl font-black text-violet-400">+{simulation.projectedImpact}%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase text-slate-500">Confiance IA</p>
                    <p className="text-lg font-bold text-white">{simulation.confidence}%</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase text-slate-500">Risque</p>
                    <p className="text-lg font-bold text-green-400 uppercase">{simulation.riskLevel}</p>
                </div>
            </div>

            <button className="w-full bg-violet-500 text-white text-xs font-bold py-3 rounded-xl uppercase tracking-widest hover:bg-violet-600 transition-colors">
                Appliquer Stratégie
            </button>
        </motion.div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Target size={48} className="text-violet-500" />
            <p className="text-xs text-slate-400 uppercase tracking-widest">Initialiser la simulation<br/>pour projeter l'impact du mode {activeMode}.</p>
            <button onClick={runSimulation} className="bg-neutral-800 text-white text-xs font-bold px-6 py-2 rounded-lg">
                {isSimulating ? "Analyse en cours..." : "Simuler impact"}
            </button>
        </div>
      )}
    </div>
  );
}
