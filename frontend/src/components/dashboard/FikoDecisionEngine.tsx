import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BrainCircuit, 
  Zap, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Clock,
  ChevronRight
} from "lucide-react";
import { UserProfile, FikoDecision, FikoDecisionType, FikoDecisionPriority, FikoStrategicModeType } from "../../types";

interface DecisionEngineProps {
  user: UserProfile;
  gate: string;
  activeMode?: FikoStrategicModeType;
}

const BASE_MOCK_DECISIONS: FikoDecision[] = [
  {
    id: "dec-1",
    userId: "us-1",
    type: "strategic_alert",
    priority: "urgent",
    confidence: 94,
    recommendation: "Votre trafic WhatsApp montre actuellement un fort potentiel de conversion. Je recommande d'accélérer ce canal en activant un workflow de qualification.",
    impact: "strong",
    urgency: "high",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "dec-2",
    userId: "us-1",
    type: "autonomous_preparation",
    priority: "important",
    confidence: 88,
    recommendation: "J'ai préparé une structure SEO adaptée à votre activité pour compenser la baisse d'acquisition prévue sur les réseaux sociaux.",
    impact: "medium",
    urgency: "medium",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "dec-3",
    userId: "us-1",
    type: "proactive_decision",
    priority: "optimization",
    confidence: 91,
    recommendation: "Votre infrastructure est prête pour une automatisation avancée. Je suggère d'activer le mode Expansion.",
    impact: "strong",
    urgency: "low",
    status: "pending",
    createdAt: new Date(),
  }
];

const RECENT_HISTORY = [
  { text: "Tunnel WhatsApp préconfiguré", status: "actioned" },
  { text: "Optimisation acquisition détectée", status: "actioned" },
  { text: "Activation SEO recommandée", status: "acknowledged" }
];

const MODE_THEMES = {
  expansion: { color: 'text-[#FF2718]', bg: 'bg-[#FF2718]', bgLight: 'bg-[#FF2718]/10' },
  conversion: { color: 'text-amber-500', bg: 'bg-amber-500', bgLight: 'bg-amber-500/10' },
  authority: { color: 'text-blue-500', bg: 'bg-blue-500', bgLight: 'bg-blue-500/10' },
  automation: { color: 'text-fuchsia-500', bg: 'bg-fuchsia-500', bgLight: 'bg-fuchsia-500/10' },
  domination: { color: 'text-white', bg: 'bg-white', bgLight: 'bg-white/10' }
};

export default function FikoDecisionEngine({ user, gate, activeMode = 'conversion' }: DecisionEngineProps) {
  const activeTheme = MODE_THEMES[activeMode] || MODE_THEMES.conversion;
  const [decisions, setDecisions] = useState<FikoDecision[]>(BASE_MOCK_DECISIONS);
  const [actionedId, setActionedId] = useState<string | null>(null);

  useEffect(() => {
    // Mode specific recommendations
    if (activeMode === 'expansion') {
      setDecisions([{
        id: "dec-exp-1",
        userId: user.uid,
        type: "strategic_alert",
        priority: "urgent",
        confidence: 97,
        recommendation: "Le Mode Expansion est actif. Je recommande de doubler les budgets sur votre tunnel WhatsApp, la conversion suit la charge.",
        impact: "strong",
        urgency: "high",
        status: "pending",
        createdAt: new Date(),
      }, ...BASE_MOCK_DECISIONS]);
    } else {
      setDecisions([...BASE_MOCK_DECISIONS]);
    }
  }, [activeMode, user.uid]);

  const getPriorityInfo = (priority: FikoDecisionPriority) => {
    switch (priority) {
      case 'urgent': return { icon: AlertTriangle, color: 'text-[#FF2718]', bg: 'bg-[#FF2718]/10', border: 'border-[#FF2718]/30', label: 'Priorité Élevée' };
      case 'important': return { icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'Action Requise' };
      case 'optimization': return { icon: BrainCircuit, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30', label: 'Optimisation Recommandée' };
      case 'future': return { icon: TrendingUp, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', label: 'Opportunité Croissance' };
      default: return { icon: Lightbulb, color: 'text-slate-400', bg: 'bg-white/5', border: 'border-white/10', label: 'Suggestion' };
    }
  };

  const getTypeLabel = (type: FikoDecisionType) => {
    switch (type) {
      case 'micro_recommendation': return 'Micro-Ajustement';
      case 'strategic_alert': return 'Alerte Stratégique';
      case 'proactive_decision': return 'Décision Proactive';
      case 'autonomous_preparation': return 'Action Autonome';
    }
  };

  const handleAction = (id: string) => {
    setActionedId(id);
    setTimeout(() => {
      setDecisions(decisions.filter(d => d.id !== id));
      setActionedId(null);
    }, 2000);
  };

  return (
    <div className={`relative w-full space-y-8 transition-colors duration-500`}>
      {/* STRATEGIC GRID 1x3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10 pt-4">
        <AnimatePresence mode="popLayout">
          {decisions.map((decision) => {
            const pInfo = getPriorityInfo(decision.priority);
            const isActioned = actionedId === decision.id;

            return (
              <motion.div
                key={decision.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                className={`flex flex-col justify-between min-h-[340px] p-6 rounded-[2rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl ${
                  isActioned 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : `bg-[#0A0A0F]/60 ${pInfo.border} hover:border-white/20 group/card shadow-2xl`
                }`}
              >
                {/* Background Glow */}
                <div className={`absolute -top-24 -right-24 size-48 ${pInfo.bg} rounded-full blur-[80px] opacity-20 group-hover/card:opacity-40 transition-opacity`} />
                
                {isActioned ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="size-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                    >
                       <ShieldCheck size={32} />
                    </motion.div>
                    <h4 className="text-white font-black text-lg uppercase tracking-tighter">Décision Validée</h4>
                    <p className="text-green-500/70 text-xs mt-2 uppercase tracking-widest font-bold">Infrastructure synchronisée</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border ${pInfo.bg} ${pInfo.border} ${pInfo.color}`}>
                          <pInfo.icon size={14} />
                          {pInfo.label}
                        </div>
                        <div className="text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-[14px] text-white font-black">{decision.confidence}%</span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF2718] font-bold">Confiance IA</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                          Mission: {getTypeLabel(decision.type)}
                        </div>
                        <h4 className="text-slate-200 text-lg font-medium leading-[1.6] group-hover/card:text-white transition-colors">
                          "{decision.recommendation}"
                        </h4>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                        <button 
                           onClick={() => setDecisions(decisions.filter(d => d.id !== decision.id))}
                           className="flex-1 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-white transition-colors py-3 rounded-xl border border-white/5 hover:bg-white/5"
                        >
                          Plus tard
                        </button>
                        <button 
                          onClick={() => handleAction(decision.id)}
                          className={`flex-[2] text-[10px] uppercase tracking-[0.2em] font-black text-black py-3 rounded-xl transition-all ${pInfo.color.replace('text-', 'bg-')} hover:shadow-[0_0_20px_currentColor] flex items-center justify-center gap-2`}
                        >
                          Lancer l'action <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {decisions.length === 0 && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="col-span-full py-16 bg-[#0A0A0F]/40 border border-white/5 rounded-[2rem] flex flex-col justify-center items-center text-center backdrop-blur-sm"
           >
             <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
               <ShieldCheck size={32} className="text-[#FF2718]" />
             </div>
             <h3 className="text-white font-black uppercase tracking-widest">Opérations Optimales</h3>
             <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest font-bold">Fiko analyse actuellement vos prochaines opportunités stratégiques.</p>
          </motion.div>
        )}
      </div>

      {/* RECENT HISTORY TIMELINE - HORIZONTAL */}
      <div className="mt-12 bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-sm relative z-10 w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 shrink-0">
             <div className="p-3 bg-white/5 rounded-2xl">
               <Clock size={20} className="text-[#FF2718]" />
             </div>
             <div>
               <h4 className="text-[11px] text-white uppercase tracking-widest font-black">Décisions Récentes</h4>
               <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Timeline des exécutions</p>
             </div>
          </div>
          
          <div className="flex-1 flex items-center gap-8 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
             {RECENT_HISTORY.map((item, i) => (
                <div key={i} className="flex items-center gap-3 whitespace-nowrap group">
                   <div className="size-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-green-500" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{item.text}</span>
                      <span className="text-[9px] uppercase tracking-widest text-green-500/60 font-medium">Auto-aligné</span>
                   </div>
                   {i < RECENT_HISTORY.length - 1 && (
                     <div className="w-8 h-px bg-white/10 ml-4 hidden md:block" />
                   )}
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
