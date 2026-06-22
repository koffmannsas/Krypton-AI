import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Network,
  Cpu, 
  RefreshCw,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { UserProfile, FikoStrategicModeType, FikoOrchestration } from "../../types";

interface OrchestrationEngineProps {
  user: UserProfile;
  activeMode: FikoStrategicModeType;
}

// Mock orchestration data for visual feedback
const MOCK_ORCHESTRATIONS: FikoOrchestration[] = [
  {
    id: "orch-1",
    userId: "us-1",
    orchestrationType: "crm_whatsapp_sync",
    systemsAffected: ["crm", "whatsapp"],
    confidence: 94,
    impact: 'strong',
    status: 'executed',
    strategicMode: 'conversion',
    results: { details: "Leads synchronisés automatiquement" },
    executedAt: new Date(),
  }
];

export default function FikoOrchestrationEngine({ user, activeMode }: OrchestrationEngineProps) {
  const [orchestrations, setOrchestrations] = useState<FikoOrchestration[]>(MOCK_ORCHESTRATIONS);
  const [isSyncing, setIsSyncing] = useState(false);

  const performOrchestration = () => {
    setIsSyncing(true);
    setTimeout(() => {
        setIsSyncing(false);
        const newOrch: FikoOrchestration = {
            id: `orch-${Date.now()}`,
            userId: user.uid,
            orchestrationType: "recalibration",
            systemsAffected: ["seo", "acquisition"],
            confidence: 98,
            impact: 'strong',
            status: 'executed',
            strategicMode: activeMode,
            results: { details: "Systemes recalibrés" },
            executedAt: new Date(),
        };
        setOrchestrations([newOrch, ...orchestrations]);
    }, 2000);
  };

  return (
    <div className="bg-[#111116] border border-white/5 p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white">
          <Network size={16} className="text-green-500" /> Fiko Orchestration Core
        </h3>
        <button 
          onClick={performOrchestration}
          disabled={isSyncing}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
          {orchestrations.map(orch => (
            <div key={orch.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-white font-bold">{orch.orchestrationType}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{orch.systemsAffected.join(' + ')}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">
                        {orch.confidence}% Confiance
                    </span>
                    <CheckCircle2 size={14} className="text-green-500" />
                </div>
            </div>
          ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
             <Cpu className="text-green-500" size={20} />
             <div>
                <p className="text-xs font-bold text-white uppercase tracking-widest">Orchestration IA active</p>
                <p className="text-[10px] text-green-200/60 mt-0.5">Votre infrastructure est synchronisée pour le mode <span className="uppercase text-green-400 font-bold">{activeMode}</span>.</p>
             </div>
        </div>
      </div>
    </div>
  );
}
