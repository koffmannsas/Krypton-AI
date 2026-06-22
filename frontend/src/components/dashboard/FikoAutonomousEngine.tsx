import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  Zap, 
  CheckCircle2, 
  Clock,
  PlayCircle
} from "lucide-react";
import { UserProfile, FikoAutonomousOperation, FikoStrategicModeType } from "../../types";

interface AutonomousEngineProps {
  user: UserProfile;
  gate: string;
  activeMode: FikoStrategicModeType;
}

export default function FikoAutonomousEngine({ user, gate, activeMode }: AutonomousEngineProps) {
  const [operations, setOperations] = useState<FikoAutonomousOperation[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Use gate or activeMode if needed in the logic
  console.log(`Autonomous Engine running for gate: ${gate}, activeMode: ${activeMode}`);

  const triggerOperation = () => {
    setLoading(true);
    setTimeout(() => {
        const newOp: FikoAutonomousOperation = {
            id: `op-${Date.now()}`,
            userId: user.uid,
            operationType: 'acquisition',
            operationStatus: 'prepared',
            confidenceScore: 92,
            businessImpact: 'high',
            executionMode: 'semi_autonomous',
            systemsAffected: ['whatsapp', 'crm'],
            triggeredBy: 'Economic Forecast Core',
            createdAt: new Date(),
        };
        setOperations([newOp, ...operations]);
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#111116] border border-white/5 p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white">
          <Settings size={16} className="text-purple-500" /> Auto-Operations
        </h3>
        <button 
          onClick={triggerOperation}
          disabled={loading}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {loading ? <Zap size={16} className="animate-spin text-purple-400" /> : <PlayCircle size={16} />}
        </button>
      </div>

       <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {operations.map((op) => (
              <motion.div 
                 key={op.id} 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-xl space-y-2"
              >
                  <div className="flex justify-between items-center">
                      <p className="text-xs text-purple-300 font-bold uppercase tracking-widest">{op.operationType} opération</p>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                          {op.executionMode}
                      </span>
                  </div>
                  <p className="text-xs text-white leading-relaxed">Déclenchée par : {op.triggeredBy}</p>
                  <div className="flex gap-2 items-center text-[10px] text-purple-400 font-medium">
                      <Clock size={12} />
                      <span>{op.createdAt.toLocaleTimeString()}</span>
                      {op.operationStatus === 'prepared' && <span className="text-emerald-400 ml-auto">En attente...</span>}
                  </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {operations.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center opacity-40">
                <Settings size={48} className="text-purple-500 mb-4" />
                <p className="text-xs text-slate-400 italic">En attente d'ordres opérationnels...</p>
             </div>
          )}
      </div>
    </div>
  );
}
