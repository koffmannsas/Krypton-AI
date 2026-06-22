import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { UserProfile, FikoBehaviorPrediction } from "../../types";

interface BehavioralEngineProps {
  user: UserProfile;
}

export default function FikoBehavioralPredictionEngine({ user }: BehavioralEngineProps) {
  const [predictions, setPredictions] = useState<FikoBehaviorPrediction[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);

  const runPrediction = () => {
    setIsPredicting(true);
    // Simulate AI Prediction Processing
    setTimeout(() => {
        const newPrediction: FikoBehaviorPrediction = {
            id: `pred-${Date.now()}`,
            userId: user.uid,
            predictionType: 'engagement',
            confidenceScore: 85 + Math.floor(Math.random() * 10),
            impactLevel: 'strong',
            urgencyLevel: 'medium',
            predictionMessage: "Votre activité montre un potentiel d'acquisition accélérée.",
            recommendedAction: "Passer en Expansion Mode",
            status: 'active',
            createdAt: new Date(),
        };
        setPredictions([newPrediction, ...predictions]);
        setIsPredicting(false);
    }, 1500);
  };

  return (
    <div className="bg-[#111116] border border-white/5 p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white">
          <Brain size={16} className="text-purple-500" /> Fiko Behavior Prediction
        </h3>
        <button 
          onClick={runPrediction}
          disabled={isPredicting}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {isPredicting ? <Zap size={16} className="animate-spin text-purple-400" /> : <Target size={16} />}
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
          {predictions.map(pred => (
            <motion.div 
               key={pred.id} 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-xl space-y-2"
            >
                <div className="flex justify-between items-center">
                    <p className="text-xs text-purple-300 font-bold uppercase tracking-widest">{pred.predictionType}</p>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full font-bold">
                        {pred.confidenceScore}% IA
                    </span>
                </div>
                <p className="text-sm text-white">{pred.predictionMessage}</p>
                <button className="text-[10px] text-purple-400 uppercase font-bold hover:underline">
                    {pred.recommendedAction} →
                </button>
            </motion.div>
          ))}
          {predictions.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center opacity-40">
                <Brain size={48} className="text-purple-500 mb-4" />
                <p className="text-xs text-slate-400 italic">En attente de signaux comportementaux...</p>
             </div>
          )}
      </div>
    </div>
  );
}
