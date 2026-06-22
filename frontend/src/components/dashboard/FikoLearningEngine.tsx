import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";
import { UserProfile, FikoLearningEvent } from "../../types";

interface LearningEngineProps {
  user: UserProfile;
}

export default function FikoLearningEngine({ user }: LearningEngineProps) {
  const [events, setEvents] = useState<FikoLearningEvent[]>([]);
  const [intelligenceLevel, setIntelligenceLevel] = useState(1);

  useEffect(() => {
    // Mock fetch
    setEvents([
      {
        id: "evt-1",
        userId: user.uid,
        sourceType: "prediction",
        sourceId: "pred-1",
        predictionValue: 85,
        actualValue: 92,
        accuracyScore: 92,
        strategyAdjustment: "Optimisation du taux de conversion +3%",
        createdAt: new Date(),
      }
    ]);
    setIntelligenceLevel(4);
  }, [user.uid]);

  return (
    <div className="bg-[#111116] border border-white/5 p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white">
          <Brain size={16} className="text-cyan-500" /> Fiko Auto-Apprentissage
        </h3>
        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full uppercase tracking-widest border border-cyan-500/20">
          Niveau IA {intelligenceLevel}
        </span>
      </div>

      <div className="space-y-4">
        {events.map((evt) => (
          <div key={evt.id} className="bg-white/5 border border-white/10 p-4 rounded-xl">
             <div className="flex justify-between mb-2">
                 <p className="text-xs font-bold text-white uppercase">{evt.sourceType} corrigée</p>
                 <span className="text-[10px] font-bold text-cyan-400">{evt.accuracyScore}% précision</span>
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed italic">
                 "{evt.strategyAdjustment}"
             </p>
          </div>
        ))}
      </div>
    </div>
  );
}
