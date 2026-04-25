import React, { useState, useRef, useEffect } from "react";
import { MASTER_AGENTS } from "../../constants";
import {
  Search,
  Hexagon,
  Mic,
  Bolt,
  BrainCircuit,
  Activity,
  Loader2,
  ArrowRight,
  Target,
  MessageSquare,
  Sparkles,
  Cpu,
  ShieldCheck,
  Database,
  LayoutGrid,
  Zap,
  ChevronRight,
  Fingerprint,
  Network,
  Globe,
  AlertTriangle,
  Info,
} from "lucide-react";
import { GoogleGenAI, Type } from "@google/genai";
import { Agent, StrategicBrief, Page } from "../../types";
import { motion, AnimatePresence } from "framer-motion";

interface AgentsPageProps {
  onOpenFiko: (gate?: string) => void;
  onOpenChat: (agent: Agent) => void;
  onNavigate: (p: Page) => void;
}

const AgentsPage: React.FC<AgentsPageProps> = ({ onOpenFiko, onOpenChat, onNavigate }) => {
  const [query, setQuery] = useState("");
  const [isAssembling, setIsAssembling] = useState(false);
  const [brief, setBrief] = useState<StrategicBrief | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(80, textareaRef.current.scrollHeight)}px`;
    }
  }, [query]);

  const assembleSolution = async () => {
    if (!query.trim()) return;

    setIsAssembling(true);
    setBrief(null);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "Clé API Gemini manquante. Veuillez configurer NEXT_PUBLIC_GEMINI_API_KEY.",
        );
      }

      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `Conçois une unité stratégique Krypton AI pour le métier suivant : ${query}. Version 2.0.`,
        config: {
          systemInstruction: `
Tu es FIKO STRATEGIST, expert en business, acquisition client et vente en Côte d’Ivoire.

🎯 OBJECTIF :
Créer une stratégie qui génère des clients et du chiffre d’affaires.

---

🧠 ANALYSE :
- identifie les problèmes réels du business
- détecte les pertes d'argent
- identifie les opportunités

---

💸 ORIENTATION :
Chaque solution doit :
- augmenter les ventes
- automatiser l’acquisition
- améliorer la conversion

---

🤖 AGENTS IA :
Recommande des agents qui :
- captent des leads
- relancent
- vendent automatiquement

---

📊 STRUCTURE :
solutionName → nom puissant  
sector → secteur  
description → vision business  
challenges → problèmes réels  
recommendedAgents → agents utiles  

---

⚠️ RÈGLES :
- pas de blabla
- direct
- stratégique
`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              solutionName: { type: Type.STRING },
              sector: { type: Type.STRING },
              description: { type: Type.STRING },
              challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendedAgents: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              "solutionName",
              "sector",
              "description",
              "challenges",
              "recommendedAgents",
            ],
          },
          temperature: 0.9,
        },
      });

      const result = JSON.parse(response.text || "{}");
      setBrief(result as StrategicBrief);
    } catch (error: any) {
      console.error("Assembler Error:", error);
      setError(
        error.message || "Une erreur est survenue lors de la génération.",
      );
    } finally {
      setIsAssembling(false);
    }
  };

  const renderStatus = (status: Agent["status"]) => {
    const config = {
      active: {
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        label: "ONLINE",
      },
      standby: {
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        label: "STANDBY",
      },
      deploying: {
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        label: "SYNCING",
      },
    };
    const { color, bg, label } = config[status] || config.standby;

    return (
      <div
        className={`px-3 py-1 ${bg} border border-white/5 rounded-full flex items-center gap-2`}
      >
        <span
          className={`size-1 rounded-full ${color.replace("text-", "bg-")} animate-pulse`}
        ></span>
        <span className={`text-[8px] font-black tracking-widest ${color}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-[#0B0B0F] min-h-screen pb-40">
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 lg:px-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FF2718]/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#FF2718]/30 bg-[#FF2718]/5 rounded-sm">
              <Cpu size={14} className="text-[#FF2718]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF2718]">
                Arsenal Tactique v2.0
              </span>
            </div>

            <h1 className="text-6xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-white">
              NOS <span className="text-[#FF2718] italic">AGENTS</span> <br />
              D'ÉLITE.
            </h1>

            <p className="text-slate-400 max-w-2xl font-medium text-lg lg:text-xl uppercase tracking-[0.1em] leading-relaxed italic">
              Déployez une force de frappe numérique. Nos agents IA ne se
              contentent pas de répondre, ils{" "}
              <span className="text-white">
                vendent, prospectent et closent
              </span>{" "}
              pour vous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STRATEGY ASSEMBLER */}
      <section className="px-6 lg:px-20 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 border border-white/10 p-8 lg:p-12 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <BrainCircuit size={120} className="text-[#FF2718]" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
                  Assembleur Stratégique
                </h2>
                <p className="text-slate-500 text-sm uppercase tracking-widest">
                  Décrivez votre activité pour générer une unité tactique
                  sur-mesure.
                </p>
              </div>

              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: Je vends des formations en ligne pour les entrepreneurs en Côte d'Ivoire..."
                  className="w-full bg-black/40 border border-white/10 p-6 text-white text-xl lg:text-2xl outline-none focus:border-[#FF2718]/50 transition-all min-h-[120px] resize-none"
                />

                <div className="absolute bottom-4 right-4 flex items-center gap-4">
                  <AnimatePresence>
                    {isAssembling && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-2 text-[#FF2718]"
                      >
                        <Loader2 size={16} className="animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Analyse en cours...
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={assembleSolution}
                    disabled={isAssembling || !query.trim()}
                    className="bg-[#FF2718] hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-[#FF2718] text-white px-8 py-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 group"
                  >
                    {isAssembling ? "ASSEMBLAGE..." : "GÉNÉRER L'UNITÉ"}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-sm">
                  <AlertTriangle size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {error}
                  </span>
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {brief && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 bg-white/5 border border-white/10 p-10 space-y-8">
                  <div className="space-y-4">
                    <div className="text-[#FF2718] text-[10px] font-black uppercase tracking-[0.4em]">
                      {brief.sector}
                    </div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-white">
                      {brief.solutionName}
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      {brief.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                        <Target size={14} className="text-[#FF2718]" />
                        Défis Identifiés
                      </h4>
                      <ul className="space-y-3">
                        {brief.challenges.map((challenge, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-500 flex items-start gap-3"
                          >
                            <span className="text-[#FF2718] mt-1">•</span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                        <Zap size={14} className="text-[#FF2718]" />
                        Agents Recommandés
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {brief.recommendedAgents.map((agentName, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold text-slate-300 uppercase tracking-wider"
                          >
                            {agentName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-[#FF2718] p-10 flex flex-col justify-between group cursor-pointer"
                  onClick={() => onOpenFiko("ELITE")}
                >
                  <div className="space-y-6">
                    <Sparkles size={40} className="text-white" />
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
                      Déployer cette unité maintenant
                    </h3>
                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider">
                      Activez FIKO™ pour configurer et lancer votre armée
                      d'agents IA en moins de 5 minutes.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.3em] mt-12">
                    Lancer le déploiement
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* AGENTS GRID */}
      <section className="px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white">
                L'ARSENAL <span className="text-[#FF2718]">KRYPTON</span>
              </h2>
              <p className="text-slate-500 text-sm uppercase tracking-widest max-w-xl">
                Explorez notre catalogue d'agents spécialisés. Chaque unité est
                conçue pour une mission précise dans votre tunnel de vente.
              </p>
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="size-2 bg-emerald-500 rounded-full"></span>
                ONLINE:{" "}
                {MASTER_AGENTS.filter((a) => a.status === "active").length}
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 bg-yellow-500 rounded-full"></span>
                STANDBY:{" "}
                {MASTER_AGENTS.filter((a) => a.status === "standby").length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MASTER_AGENTS.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredId(agent.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-black border border-white/5 hover:border-[#FF2718]/30 transition-all duration-500 overflow-hidden"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[400px]">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="text-[#FF2718] text-[8px] font-black uppercase tracking-[0.4em]">
                          {agent.category}
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                          {agent.name}
                        </h3>
                      </div>
                      {renderStatus(agent.status)}
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                      {agent.description}
                    </p>
                  </div>

                  <div className="space-y-6 pt-8">
                    <div className="flex items-center gap-6 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Globe size={12} className="text-[#FF2718]" />
                        {agent.sector}
                      </div>
                      <div className="flex items-center gap-2">
                        <Network size={12} className="text-[#FF2718]" />
                        Neural Sync
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => onOpenChat(agent)}
                        className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all py-3 text-[9px] font-black uppercase tracking-widest"
                      >
                        <MessageSquare size={14} />
                        Tester le Chat
                      </button>
                      <button
                        onClick={() => onOpenFiko("ELITE")}
                        className="flex items-center justify-center gap-2 bg-[#FF2718]/10 border border-[#FF2718]/20 hover:bg-[#FF2718] text-[#FF2718] hover:text-white transition-all py-3 text-[9px] font-black uppercase tracking-widest"
                      >
                        <Zap size={14} />
                        Déployer
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-[#FF2718] transition-all duration-500 w-0 group-hover:w-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="mt-40 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 rounded-full">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
              Sécurité & Intégrité Garanties
            </span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white leading-none">
            VOTRE ARMÉE IA EST <br />
            <span className="text-[#FF2718]">PRÊTE AU COMBAT.</span>
          </h2>

          <p className="text-slate-500 text-lg uppercase tracking-widest leading-relaxed">
            Ne laissez plus vos leads s'échapper. Automatisez votre croissance
            avec Krypton AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button
              onClick={() => onOpenFiko("ELITE")}
              className="w-full sm:w-auto bg-white text-black px-12 py-5 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#FF2718] hover:text-white transition-all shadow-2xl shadow-white/5"
            >
              Démarrer maintenant
            </button>
            <button
              onClick={() =>
                window.open("https://wa.me/+2250544427676", "_blank")
              }
              className="w-full sm:w-auto border border-white/10 px-12 py-5 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
            >
              Parler à un expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsPage;
