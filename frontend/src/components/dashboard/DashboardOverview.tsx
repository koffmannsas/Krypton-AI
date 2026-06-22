import React, { useState, useEffect } from "react";
import FikoMemoryEngine from "./FikoMemoryEngine";
import FikoDecisionEngine from "./FikoDecisionEngine";
import FikoAutonomousEngine from "./FikoAutonomousEngine";
import FikoStrategicModesEngine from "./FikoStrategicModesEngine";
import FikoOrchestrationEngine from "./FikoOrchestrationEngine";
import FikoMarketPulseEngine from "./FikoMarketPulseEngine";
import FikoImpactSimulator from "./FikoImpactSimulator";
import FikoRelationshipEngine from "./FikoRelationshipEngine";
import FikoBehavioralPredictionEngine from "./FikoBehavioralPredictionEngine";
import FikoLearningEngine from "./FikoLearningEngine";
import FikoEconomicForecastEngine from "./FikoEconomicForecastEngine";
import { UserProfile, Opportunity, FikoStrategicModeType } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  MessageSquare, 
  Zap, 
  Lightbulb, 
  ShieldCheck, 
  ArrowUpRight,
  Target,
  Orbit,
  BarChart4,
  BrainCircuit,
  Fingerprint,
  Trophy,
  Cpu,
  Network
} from "lucide-react";

interface OverviewProps {
  user: UserProfile;
  leadsCount: number;
  projectStatus: string;
  opportunities?: Opportunity[];
  gate?: string;
  onNavigate: (tab: string) => void;
  onOpportunityAction?: (opp: Opportunity) => void;
  onOpportunityDismiss?: (opp: Opportunity) => void;
}

const DEFAULT_MISSIONS = {
  ACCESS: [
    { text: "Connecter WhatsApp", done: false },
    { text: "Ajouter logo", done: false },
    { text: "Configurer activité", done: false },
    { text: "Initialisation système", done: true },
    { text: "Environnement Fiko", done: true }
  ],
  TERRA: [
    { text: "Connecter domaine", done: false },
    { text: "Activer SEO", done: false },
    { text: "Configurer pages", done: false },
    { text: "Espace structuré", done: true },
    { text: "Moteur IA basique", done: true }
  ],
  MARS: [
    { text: "Connecter acquisition", done: false },
    { text: "Installer tracking", done: false },
    { text: "Activer analytics", done: false },
    { text: "Fiko acquisition connecté", done: true },
    { text: "Pipeline de leads initialisé", done: true }
  ],
  KRYPTON: [
    { text: "Connecter CRM", done: false },
    { text: "Activer automatisation", done: false },
    { text: "Configurer IA", done: false },
    { text: "Moteur conversationnel prêt", done: true },
    { text: "Automatisation IA active", done: true }
  ],
  GALAXY: [
    { text: "Déployer modules enterprise", done: false },
    { text: "Synchroniser équipes", done: false },
    { text: "Activer stratégie globale", done: false },
    { text: "Infrastructure enterprise synchronisée", done: true },
    { text: "Modules stratégiques activés", done: true }
  ],
};

const MICRO_SIGNALS = [
  "+1 opportunité détectée",
  "Analyse comportementale active",
  "+1 tunnel optimisé",
  "Optimisation IA en cours",
  "+1 visiteur analysé",
  "Synchronisation Firestore",
  "Traitement du langage naturel"
];

const INSIGHTS = [
  "Le trafic WhatsApp représente actuellement votre principal potentiel de conversion.",
  "Votre temps de réponse peut être amélioré grâce à Fiko Auto-Response.",
  "La majorité de vos leads proviennent d'applications mobiles."
];

export default function DashboardOverview({
  user,
  leadsCount,
  opportunities = [],
  gate = "MARS",
  onNavigate,
  onOpportunityAction,
  onOpportunityDismiss
}: OverviewProps) {
  const [bootPhase, setBootPhase] = useState(0);
  const [activeMode, setActiveMode] = useState<FikoStrategicModeType>('conversion');
  const [signalIndex, setSignalIndex] = useState(0);
  const [missions, setMissions] = useState(DEFAULT_MISSIONS[gate as keyof typeof DEFAULT_MISSIONS] || DEFAULT_MISSIONS.MARS);
  const [configPercentage, setConfigPercentage] = useState(72);
  const [justCompletedMission, setJustCompletedMission] = useState<string | null>(null);
  const [xp, setXp] = useState(2450);
  const [fikoFeedback, setFikoFeedback] = useState<string | null>(null);
  
  const BOOT_TEXTS = [
    "Connexion à votre infrastructure...",
    "Synchronisation des modules...",
    "Fiko initialise votre environnement...",
    "Système opérationnel"
  ];

  useEffect(() => {
    if (bootPhase < 3) {
      const timer = setTimeout(() => {
        setBootPhase(b => b + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [bootPhase]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex(prev => (prev + 1) % MICRO_SIGNALS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleCompleteMission = (index: number) => {
    const targetMission = pending[index];
    if (!targetMission) return;
    
    // Fiko Live Feedback
    setFikoFeedback("Excellent choix. Ce module est stratégique pour vos conversions.");
    
    setTimeout(() => {
      setFikoFeedback(null);
      // Find the original index in `missions`
      const realIndex = missions.findIndex(m => m.text === targetMission.text);
      if (realIndex === -1) return;

      const newMissions = [...missions];
      newMissions[realIndex].done = true;
      setMissions(newMissions);
      
      const boost = Math.floor(Math.random() * 4) + 8; // 8% to 11%
      setConfigPercentage(prev => Math.min(100, prev + boost));
      setXp(prev => Math.min(5000, prev + 650));
      
      setJustCompletedMission(targetMission.text);
      setTimeout(() => {
        setJustCompletedMission(null);
      }, 4000);
    }, 2500);
  };

  const victories = missions.filter(m => m.done);
  const pending = missions.filter(m => !m.done);

  const MODE_THEMES = {
    expansion: { color: 'text-[#FF2718]', bg: 'bg-[#FF2718]', bgLight: 'bg-[#FF2718]/5', border: 'border-[#FF2718]/20', title: 'Mode Expansion Actif' },
    conversion: { color: 'text-amber-500', bg: 'bg-amber-500', bgLight: 'bg-amber-500/5', border: 'border-amber-500/20', title: 'Mode Conversion Actif' },
    authority: { color: 'text-blue-500', bg: 'bg-blue-500', bgLight: 'bg-blue-500/5', border: 'border-blue-500/20', title: 'Mode Authority Actif' },
    automation: { color: 'text-fuchsia-500', bg: 'bg-fuchsia-500', bgLight: 'bg-fuchsia-500/5', border: 'border-fuchsia-500/20', title: 'Mode Automation Actif' },
    domination: { color: 'text-white', bg: 'bg-white', bgLight: 'bg-white/5', border: 'border-white/20', title: 'Mode Domination Actif' }
  };
  const activeTheme = MODE_THEMES[activeMode] || MODE_THEMES.conversion;

  if (bootPhase < 3) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
        <div className="relative size-32">
          <motion.div 
            animate={{ rotate: 360, opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-[#FF2718]/20 border-t-[#FF2718] rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360, opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border-2 border-white/10 border-b-white/50 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Orbit size={32} className="text-[#FF2718]" />
          </div>
        </div>
        <motion.p 
          key={bootPhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-lg font-bold tracking-widest text-slate-300 uppercase"
        >
          {BOOT_TEXTS[bootPhase]}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-32 text-white p-6 relative">
      {/* GLOBAL HUD SIGNALS */}
      <div className="flex items-center gap-6 mb-8 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl w-fit backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="size-2 bg-[#FF2718] rounded-full animate-pulse shadow-[0_0_10px_#FF2718]" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF2718]">Live Engine Status</span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <AnimatePresence mode="wait">
          <motion.div
            key={signalIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2"
          >
            <Cpu size={12} className="text-slate-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{MICRO_SIGNALS[signalIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 1. BUSINESS OVERVIEW CENTER */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black uppercase tracking-[0.3em] flex items-center gap-4">
            <Orbit className="text-[#FF2718]" size={24} /> Business Overview
          </h2>
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <span>Last Sync: {new Date().toLocaleTimeString()}</span>
            <div className="size-1.5 bg-green-500 rounded-full" />
          </div>
        </div>
        {/* KPI PREMIUM */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Target, value: leadsCount + 24, label: "Leads détectés", color: "text-blue-500", bg: "bg-blue-500/10" },
            { icon: Lightbulb, value: opportunities.length + 3, label: "Opportunités IA", color: "text-amber-500", bg: "bg-amber-500/10" },
            { icon: MessageSquare, value: 12, label: "Conversations actives", color: "text-fuchsia-500", bg: "bg-fuchsia-500/10" },
            { icon: TrendingUp, value: "+35%", label: "Potentiel de croissance", color: "text-green-500", bg: "bg-green-500/10" },
            { icon: Activity, value: "98/100", label: "Score infrastructure", color: "text-[#FF2718]", bg: "bg-[#FF2718]/10" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111116] border border-white/5 p-6 rounded-3xl group hover:border-[#FF2718]/30 transition-all"
            >
              <div className={`p-3 w-fit rounded-2xl mb-4 ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black mb-1">{stat.value}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. OPERATIONS CENTER */}
      <section>
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6">⚙️ Operations Center</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FikoAutonomousEngine user={user} gate={gate} activeMode={activeMode} />
          <FikoOrchestrationEngine user={user} activeMode={activeMode} />
        </div>
      </section>

      {/* 4. STRATEGIC MODES & SIMULATION */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FikoStrategicModesEngine activeMode={activeMode} onModeChange={setActiveMode} />
          <FikoImpactSimulator activeMode={activeMode} />
        </div>
      </section>

      {/* 5. AI LEARNING & INTELLIGENCE CENTER */}
      <section>
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6">🧠 AI Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FikoLearningEngine user={user} activeMode={activeMode} />
           <FikoBehavioralPredictionEngine user={user} activeMode={activeMode} />
        </div>
      </section>

      {/* GRID FOR MEMORY & GROWTH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 6. MEMORY & CONTEXT CENTER */}
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6">💾 Memory & Context</h2>
          <FikoMemoryEngine user={user} xp={xp} activeMode={activeMode} />
        </section>

        {/* 4. MARKET & GROWTH CENTER */}
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6">📈 Market & Growth</h2>
          <div className="bg-[#111116] border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
            <FikoMarketPulseEngine user={user} activeMode={activeMode} embedded />
            <FikoRelationshipEngine user={user} embedded />
          </div>
        </section>
      </div>
    </div>
  );
}
