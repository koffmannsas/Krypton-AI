import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Fingerprint, 
  Network, 
  BrainCircuit, 
  Activity, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  Clock,
  CheckCircle2
} from "lucide-react";
import { UserProfile, FikoStrategicModeType } from "../../types";

interface MemoryEngineProps {
  user: UserProfile;
  xp: number;
  activeMode?: FikoStrategicModeType;
}

const MODE_THEMES = {
  expansion: { color: 'text-[#FF2718]', bg: 'bg-[#FF2718]', bgLight: 'bg-[#FF2718]/10' },
  conversion: { color: 'text-amber-500', bg: 'bg-amber-500', bgLight: 'bg-amber-500/10' },
  authority: { color: 'text-blue-500', bg: 'bg-blue-500', bgLight: 'bg-blue-500/10' },
  automation: { color: 'text-fuchsia-500', bg: 'bg-fuchsia-500', bgLight: 'bg-fuchsia-500/10' },
  domination: { color: 'text-white', bg: 'bg-white', bgLight: 'bg-white/10' }
};

const MEMORY_TIMELINE = [
  {
    period: "Aujourd'hui",
    events: [
      { text: "Tunnel acquisition ciblé configuré.", type: "system", icon: Activity },
      { text: "Vous utilisez principalement les outils d'acquisition.", type: "behavior", icon: TrendingUp }
    ]
  },
  {
    period: "Hier",
    events: [
      { text: "WhatsApp connecté à l'infrastructure.", type: "success", icon: CheckCircle2 },
      { text: "La dernière fois, vous souhaitiez améliorer votre SEO.", type: "conversation", icon: MessageSquare }
    ]
  },
  {
    period: "Cette semaine",
    events: [
      { text: "Initialisation globale du système Fiko.", type: "success", icon: CheckCircle2 },
      { text: "Objectif détecté : Automatisation massive des leads.", type: "business", icon: BrainCircuit }
    ]
  }
];

const PREDICTIVE_ALERTS = [
  {
    text: "Votre infrastructure sera bientôt prête pour une automatisation avancée.",
    type: "positive"
  },
  {
    text: "Votre acquisition Facebook ralentit actuellement. Fiko recommande de transférer le budget vers WhatsApp.",
    type: "warning"
  }
];

export default function FikoMemoryEngine({ user, xp, activeMode = 'conversion' }: MemoryEngineProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'context'>('context');
  const activeTheme = MODE_THEMES[activeMode] || MODE_THEMES.conversion;
  const getMemoryLevel = (xp: number) => {
    if (xp >= 5000) return { name: "Expansion", color: "text-purple-400" };
    if (xp >= 3500) return { name: "Automatisation", color: "text-blue-400" };
    if (xp >= 2000) return { name: "Optimisation", color: "text-green-400" };
    if (xp >= 1000) return { name: "Synchronisation", color: "text-amber-400" };
    return { name: "Initialisation", color: "text-slate-400" };
  };

  const currentLevel = getMemoryLevel(xp);

  return (
    <div className="bg-[#1A1A24] border border-white/5 p-8 rounded-3xl relative overflow-hidden group flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF2718]/5 to-transparent pointer-events-none opacity-50" />
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-300">
          <Fingerprint size={16} className="text-[#FF2718]" /> Mémoire Fiko
        </h3>
        <div className="flex gap-2">
           <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Niveau :</span>
           <span className={`text-[10px] uppercase tracking-widest font-black ${currentLevel.color}`}>{currentLevel.name}</span>
        </div>
      </div>

      {/* CORE CONTEXT MESSAGE */}
      <div className="flex gap-4 items-start bg-black/40 p-5 rounded-2xl border border-white/5 relative z-10 mb-6">
        <div className="size-2 bg-[#FF2718] mt-2 rounded-full shadow-[0_0_10px_#FF2718] flex-shrink-0 animate-pulse" />
        <p className="text-sm text-slate-300 italic leading-relaxed">
          "Votre activité dépend actuellement fortement de WhatsApp. J'ai préconfiguré certains modules selon vos objectifs d'acquisition pour éviter toute friction de conversion."
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b border-white/10 mb-6 relative z-10">
        <button 
          onClick={() => setActiveTab('context')}
          className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'context' ? 'text-[#FF2718] border-b-2 border-[#FF2718]' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Analyse Contextuelle
        </button>
        <button 
          onClick={() => setActiveTab('timeline')}
          className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'timeline' ? 'text-[#FF2718] border-b-2 border-[#FF2718]' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Timeline
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'context' ? (
            <motion.div 
              key="context"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className={`p-4 rounded-xl border ${activeTheme.bgLight} ${activeTheme.color.replace('text-', 'border-')}/30 flex items-start gap-3`}>
                 <BrainCircuit size={16} className={`${activeTheme.color} mt-0.5 shrink-0`} />
                 <p className="text-xs text-white font-medium leading-relaxed">
                   Vous travaillez actuellement en <strong className={`${activeTheme.color} block uppercase tracking-widest mt-1`}>{activeMode} Mode</strong>
                   <span className="text-slate-400 font-normal block mt-1">L'infrastructure et les suggestions s'adaptent à vos priorités.</span>
                 </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-xs text-slate-500 uppercase tracking-widest">Alerte Stratégique</span>
                   <Zap size={14} className="text-amber-500" />
                </div>
                {PREDICTIVE_ALERTS.map((alert, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${alert.type === 'positive' ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'}`}>
                    <p className="text-xs leading-relaxed font-medium">{alert.text}</p>
                  </div>
                ))}
              </div>

               {/* LIVE NETWORK MAP */}
              <div className="relative h-24 w-full bg-[#111116] border border-white/5 rounded-2xl overflow-hidden mt-6 flex items-center justify-center group/map pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF2718]/5 to-transparent opacity-0 group-hover/map:opacity-100 transition-opacity"></div>
                
                <div className="absolute left-[15%] top-[40%] size-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                <div className="absolute left-[45%] top-[25%] size-3 bg-[#FF2718] rounded-full shadow-[0_0_15px_#FF2718] animate-pulse"></div>
                <div className="absolute left-[75%] top-[65%] size-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                <div className="absolute right-[15%] top-[35%] size-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_#d946ef]"></div>
                
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <motion.path 
                    initial={{ strokeDashoffset: 100, pathLength: 0 }}
                    animate={{ strokeDashoffset: 0, pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    d="M 15 40 Q 30 15 45 25 T 75 65 T 85 35" 
                    fill="transparent" 
                    stroke="#FF2718" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2"
                  />
                </svg>
                <div className="absolute bottom-2 left-3 flex gap-2 items-center">
                    <Network size={10} className="text-[#FF2718]" />
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Réseau Neuronal Actif</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              {MEMORY_TIMELINE.map((periodInfo, i) => (
                <div key={i} className="space-y-3">
                   <h4 className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <Clock size={12} /> {periodInfo.period}
                   </h4>
                   <div className="space-y-2 border-l border-white/10 ml-1.5 pl-4">
                      {periodInfo.events.map((event, j) => (
                        <div key={j} className="flex gap-3 items-start relative group/event">
                          <div className={`absolute -left-[21px] top-1 size-2 rounded-full border-2 border-[#1A1A24] bg-slate-400 group-hover/event:bg-[#FF2718] transition-colors ${event.type === 'success' ? 'bg-green-500' : ''}`} />
                          <div className={`mt-0.5 ${event.type === 'success' ? 'text-green-500' : 'text-slate-400'}`}>
                             <event.icon size={14} />
                          </div>
                          <p className={`text-xs leading-relaxed ${event.type === 'success' ? 'text-slate-300' : 'text-slate-400'}`}>
                            {event.text}
                          </p>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
