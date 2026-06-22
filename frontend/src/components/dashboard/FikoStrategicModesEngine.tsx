import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Target, 
  Shield, 
  Cpu, 
  Globe,
  Settings2,
  CheckCircle2,
  TrendingUp,
  Activity,
  Zap
} from "lucide-react";
import { FikoStrategicModeType } from "../../types";

interface StrategicModesEngineProps {
  activeMode: FikoStrategicModeType;
  onModeChange: (mode: FikoStrategicModeType) => void;
  gate: string;
}

const STRATEGIC_MODES = [
  {
    id: 'expansion',
    name: 'Expansion Mode',
    icon: Rocket,
    color: 'text-[#FF2718]',
    bgFocus: 'bg-[#FF2718]',
    bgSubtle: 'bg-[#FF2718]/10',
    border: 'border-[#FF2718]/30',
    glow: 'shadow-[0_0_30px_rgba(255,39,24,0.3)]',
    bgGradient: 'from-[#FF2718]/5',
    description: 'Croissance agressive & multi-canal (Acquisition ciblée)',
    level: 4,
    effectiveness: 82,
    requirements: ['MARS', 'KRYPTON', 'GALAXY']
  },
  {
    id: 'conversion',
    name: 'Conversion Mode',
    icon: Target,
    color: 'text-amber-500',
    bgFocus: 'bg-amber-500',
    bgSubtle: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
    bgGradient: 'from-amber-500/5',
    description: 'Transformation du trafic & optimisation des tunnels existants',
    level: 5,
    effectiveness: 94,
    requirements: ['ACCESS', 'MARS', 'KRYPTON', 'GALAXY']
  },
  {
    id: 'authority',
    name: 'Authority Mode',
    icon: Shield,
    color: 'text-blue-500',
    bgFocus: 'bg-blue-500',
    bgSubtle: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    bgGradient: 'from-blue-500/5',
    description: 'Domination SEO, Branding & présence digitale premium',
    level: 3,
    effectiveness: 76,
    requirements: ['ACCESS', 'TERRA', 'GALAXY']
  },
  {
    id: 'automation',
    name: 'Automation Mode',
    icon: Cpu,
    color: 'text-fuchsia-500',
    bgFocus: 'bg-fuchsia-500',
    bgSubtle: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/30',
    glow: 'shadow-[0_0_30px_rgba(217,70,239,0.3)]',
    bgGradient: 'from-fuchsia-500/5',
    description: 'Orchestration IA & automatisation des processus',
    level: 2,
    effectiveness: 65,
    requirements: ['KRYPTON', 'GALAXY']
  },
  {
    id: 'domination',
    name: 'Domination Mode',
    icon: Globe,
    color: 'text-white',
    bgFocus: 'bg-white',
    bgSubtle: 'bg-white/10',
    border: 'border-white/30',
    glow: 'shadow-[0_0_30px_rgba(255,255,255,0.3)]',
    bgGradient: 'from-white/5',
    description: 'Stratégie Enterprise Globale (Multi-équipes, Multi-marchés)',
    level: 1,
    effectiveness: 0,
    requirements: ['GALAXY']
  }
];

export default function FikoStrategicModesEngine({ activeMode, onModeChange, gate }: StrategicModesEngineProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [pendingMode, setPendingMode] = useState<FikoStrategicModeType | null>(null);

  const availableModes = STRATEGIC_MODES.filter(m => m.requirements.includes(gate));
  const currentModeDetails = STRATEGIC_MODES.find(m => m.id === activeMode) || STRATEGIC_MODES[0];

  const handleModeSelect = (modeId: string) => {
    if (modeId === activeMode || isSwitching) return;
    
    setPendingMode(modeId as FikoStrategicModeType);
    setIsSwitching(true);
    
    // Simulate orchestration sequence
    setTimeout(() => {
      onModeChange(modeId as FikoStrategicModeType);
      setIsSwitching(false);
      setPendingMode(null);
      setIsOpen(false);
    }, 2500);
  };

  return (
    <div className="relative z-50">
      {/* TRIGGER WIDGET */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${currentModeDetails.bgSubtle} ${currentModeDetails.border} ${isOpen ? currentModeDetails.glow : ''}`}
      >
        <div className="flex items-center gap-4">
           <div className={`p-3 rounded-xl bg-black/40 border border-white/5`}>
              <currentModeDetails.icon size={20} className={currentModeDetails.color} />
           </div>
           <div className="flex flex-col items-start text-left">
             <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-black text-slate-500">Mode Stratégique Actif</span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-widest ${currentModeDetails.bgSubtle} ${currentModeDetails.color}`}>Nv. {currentModeDetails.level}</span>
             </div>
             <h3 className="text-white font-black uppercase tracking-widest text-sm mt-0.5 flex items-center gap-2">
                {currentModeDetails.name}
                <div className={`size-1.5 rounded-full ${currentModeDetails.bgFocus} animate-pulse`} />
             </h3>
           </div>
        </div>
        <Settings2 size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* FLYOUT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-full mt-4 inset-x-0 bg-[#111116] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
          >
             {/* Fiko Orchestration Cover */}
             <AnimatePresence>
                {isSwitching && pendingMode && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 z-20 backdrop-blur-md bg-black/80 flex flex-col items-center justify-center"
                   >
                     <div className="relative mb-6">
                        <div className="absolute inset-0 bg-[#FF2718] blur-xl opacity-20 animate-pulse rounded-full" />
                        <Cpu size={48} className="text-[#FF2718] relative z-10 animate-spin-slow" />
                     </div>
                     <h4 className="text-white font-black uppercase tracking-[0.2em] mb-2 text-sm">Synchronisation Stratégique</h4>
                     <p className="text-slate-400 text-xs font-medium max-w-[200px] text-center mb-6">
                       Reconfiguration de l'infrastructure Krypton AI...
                     </p>
                     
                     <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.2, ease: "linear" }}
                          className="h-full bg-[#FF2718]"
                       />
                     </div>
                   </motion.div>
                )}
             </AnimatePresence>

             <div className="flex items-center justify-between mb-6">
                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                   <Target size={14} /> Sélection du mode
                </h4>
                <div className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-500 font-bold">
                   <Zap size={10} className="inline mr-1 text-[#FF2718]" /> Recommandation Engine Active
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableModes.map((mode) => {
                  const isActive = mode.id === activeMode;
                  const isRecommended = mode.id === 'expansion' && activeMode === 'conversion'; // mock logic
                  
                  return (
                    <button
                      key={mode.id}
                      onClick={() => handleModeSelect(mode.id)}
                      className={`relative text-left p-4 rounded-2xl border transition-all overflow-hidden group ${isActive ? `${mode.bgSubtle} ${mode.border}` : 'bg-[#1A1A24] border-white/5 hover:border-white/10'}`}
                    >
                       <div className={`absolute inset-0 bg-gradient-to-br ${mode.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                       
                       <div className="flex justify-between items-start mb-3 relative z-10">
                          <div className={`p-2 rounded-xl bg-black/40 border border-white/5 ${isActive ? mode.color : 'text-slate-400 group-hover:' + mode.color}`}>
                             <mode.icon size={16} />
                          </div>
                          {isActive && (
                             <span className={`text-[9px] uppercase tracking-widest font-black ${mode.color} flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full border border-white/5`}>
                                <div className="size-1.5 rounded-full bg-current animate-pulse" /> Actif
                             </span>
                          )}
                          {isRecommended && !isActive && (
                            <span className="text-[9px] uppercase tracking-widest font-black text-amber-500 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                               Recommandé
                            </span>
                          )}
                       </div>

                       <div className="space-y-1 relative z-10">
                         <h5 className={`font-black uppercase tracking-widest text-sm transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{mode.name}</h5>
                         <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{mode.description}</p>
                       </div>

                       <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                          <div className="flex flex-col">
                             <span className="text-[9px] text-slate-600 uppercase tracking-widest font-bold mb-1">Efficacité</span>
                             <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className={`h-full ${mode.bgFocus}`} style={{ width: `${mode.effectiveness}%` }} />
                                </div>
                                <span className={`text-[10px] font-black ${mode.color}`}>{mode.effectiveness}%</span>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                             <Activity size={10} className="text-slate-500" />
                             <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Nv.{mode.level}</span>
                          </div>
                       </div>
                    </button>
                  )
                })}
             </div>
             
             <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-4 items-start">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mt-1">
                   <TrendingUp size={14} />
                </div>
                <div>
                   <h5 className="text-[10px] uppercase font-black text-blue-400 tracking-widest mb-1">Intelligence Fiko</h5>
                   <p className="text-xs text-blue-200/70 font-medium leading-relaxed">
                     Votre trafic organique est élevé. Passer en <strong>Expansion Mode</strong> permettra de maximiser la collecte de leads via vos nouveaux tunnels.
                   </p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
