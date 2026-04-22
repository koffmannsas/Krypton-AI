import React from "react";
import { Page } from "../../types";
// Fixed missing and late imports by consolidating all lucide-react icons at the top
import {
  ArrowLeft,
  Download,
  ShieldCheck,
  Database,
  Cpu,
  Network,
  Zap,
  Lock,
  Activity,
  Hexagon,
  Layers,
  Code,
  Globe,
  Server,
  Bot,
  BarChart3,
  Users,
  MessageSquare,
  TrendingUp,
  Search,
  Eye,
  Settings,
  Clock,
  Target,
  Briefcase,
  Crown,
  ChevronDown,
  Mic,
} from "lucide-react";

interface WhitepaperPageProps {
  onNavigate: (p: Page) => void;
}

const WhitepaperPage: React.FC<WhitepaperPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white selection:bg-[#E10600]">
      {/* Background elements */}
      <div className="fixed inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#E10600]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative z-10">
        <button
          onClick={() => onNavigate(Page.HOME)}
          className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 hover:text-white transition-all mb-20"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Retour à l'accueil</span>
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-[#E10600] bg-[#E10600]/5 text-[#E10600] text-[10px] font-black uppercase tracking-[0.5em]">
              OFFICIAL WHITEPAPER v1.2
            </div>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
              ARCHITECTING <br />
              <span className="text-[#E10600]">DOMINATION.</span>
            </h1>
            <p className="text-2xl text-slate-400 font-light italic tracking-widest max-w-3xl border-l-2 border-[#E10600] pl-10">
              L'infrastructure GCP qui propulse FIKO™ au sommet de l'efficacité
              commerciale.
            </p>
          </div>
          <button className="px-12 py-8 bg-[#E10600] text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(225,6,0,0.3)]">
            <Download size={20} /> FULL BLUEPRINT (PDF)
          </button>
        </div>

        {/* VISUAL ARCHITECTURE SCHEMA - THE PIECE DE RESISTANCE */}
        <section className="mb-40 space-y-16">
          <div className="flex flex-col items-center text-center space-y-6 mb-20">
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              00. Schéma d'Architecture Global
            </h2>
            <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">
              LOGICAL FLOW & NEURAL MAPPING
            </p>
          </div>

          <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-sm">
            <div className="bg-[#0B0B0F] p-8 md:p-20 overflow-x-auto">
              <div className="min-w-[1000px] flex flex-col gap-24 relative">
                {/* FLOW DATA PARTICLES (CSS ANIMATION) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute h-px bg-gradient-to-r from-transparent via-[#E10600] to-transparent w-full animate-data-flow`}
                      style={{
                        top: `${20 * i}%`,
                        animationDelay: `${i * 0.8}s`,
                      }}
                    ></div>
                  ))}
                </div>

                {/* LAYER 1: USERS */}
                <div className="grid grid-cols-4 gap-8 relative z-10">
                  <div className="col-span-4 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
                      LAYER 01 : ACCÈS UTILISATEURS
                    </span>
                  </div>
                  {[
                    {
                      label: "VISITEURS",
                      desc: "Prospects Inconnus",
                      icon: <Users />,
                    },
                    {
                      label: "CLIENTS",
                      desc: "Dashboard Partners",
                      icon: <Briefcase />,
                    },
                    {
                      label: "ADMIN",
                      desc: "Gestion Opérationnelle",
                      icon: <Settings />,
                    },
                    {
                      label: "SUPER ADMIN",
                      desc: "CEO Command Center",
                      icon: <Crown />,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#1A1A1F] border border-white/5 p-8 flex flex-col items-center text-center gap-4 hover:border-white/20 transition-all group"
                    >
                      <div className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-[9px] text-slate-600 uppercase">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CONNECTORS */}
                <div className="flex justify-center">
                  <ArrowDownIcon />
                </div>

                {/* LAYER 2: FRONTEND */}
                <div className="bg-[#1A1A1F] border border-white/10 p-12 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#E10600]"></div>
                  <div className="mb-10 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E10600]">
                      LAYER 02 : FRONTEND EXPERIENCE (FIREBASE HOSTING)
                    </span>
                    <div className="flex gap-4">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        REACT 19
                      </span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        WSS/SSE
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    <div className="p-6 bg-black/40 border border-white/5 text-center space-y-3">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        CONVERSATIONAL UI
                      </p>
                      <MessageSquare
                        className="mx-auto text-[#E10600]"
                        size={24}
                      />
                    </div>
                    <div className="p-6 bg-black/40 border border-white/5 text-center space-y-3">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        VOICE INTERFACE
                      </p>
                      <Mic className="mx-auto text-[#E10600]" size={24} />
                    </div>
                    <div className="p-6 bg-black/40 border border-white/5 text-center space-y-3">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        MINI CRM / BI
                      </p>
                      <TrendingUp
                        className="mx-auto text-[#E10600]"
                        size={24}
                      />
                    </div>
                  </div>
                </div>

                {/* CONNECTORS */}
                <div className="flex justify-center">
                  <ArrowDownIcon />
                </div>

                {/* LAYER 3: API & IA CORE */}
                <div className="grid grid-cols-2 gap-12">
                  <div className="bg-black border border-[#E10600]/30 p-12 relative">
                    <div className="absolute -top-4 -left-4 size-12 bg-[#E10600] flex items-center justify-center text-white shadow-2xl">
                      <Zap size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E10600] block mb-8">
                      LAYER 03 : BACKEND SERVICES
                    </span>
                    <div className="space-y-4 font-mono text-[10px] text-slate-500">
                      <p className="flex justify-between border-b border-white/5 pb-2">
                        <span>Cloud Functions</span>{" "}
                        <span className="text-emerald-500">UP</span>
                      </p>
                      <p className="flex justify-between border-b border-white/5 pb-2">
                        <span>API Gateway (Auth)</span>{" "}
                        <span className="text-emerald-500">SECURE</span>
                      </p>
                      <p className="flex justify-between border-b border-white/5 pb-2">
                        <span>Fiko Decision Engine</span>{" "}
                        <span className="text-[#E10600]">ACTIVE</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Discount Token Engine</span>{" "}
                        <span className="text-emerald-500">STABLE</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1F] border border-blue-500/30 p-12 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 block mb-8">
                      LAYER 04 : AI & ML (VERTEX AI)
                    </span>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        {
                          label: "Scoring Décideur",
                          icon: <Search size={14} />,
                        },
                        { label: "PBM Engine", icon: <Clock size={14} /> },
                        { label: "Closing Prob", icon: <Target size={14} /> },
                        { label: "Explainability", icon: <Eye size={14} /> },
                      ].map((ai, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 text-[9px] font-black uppercase text-slate-400"
                        >
                          {ai.icon} {ai.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CONNECTORS */}
                <div className="flex justify-center">
                  <ArrowDownIcon />
                </div>

                {/* LAYER 4: DATA & BI */}
                <div className="grid grid-cols-3 gap-8">
                  <div className="bg-[#1A1A1F] p-8 border border-white/5 text-center group hover:border-[#E10600]/30 transition-all">
                    <Database className="mx-auto mb-4 text-slate-500 group-hover:text-[#E10600]" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">
                      FIRESTORE
                    </p>
                    <p className="text-[8px] text-slate-600 uppercase mt-2">
                      Real-time Persistence
                    </p>
                  </div>
                  <div className="bg-[#1A1A1F] p-8 border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                    <BarChart3 className="mx-auto mb-4 text-slate-500 group-hover:text-blue-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">
                      BIGQUERY
                    </p>
                    <p className="text-[8px] text-slate-600 uppercase mt-2">
                      Analytical Data Lake
                    </p>
                  </div>
                  <div className="bg-[#E10600] p-8 text-center shadow-2xl">
                    <Eye className="mx-auto mb-4 text-white" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">
                      LOOKER BI
                    </p>
                    <p className="text-[8px] text-white/60 uppercase mt-2">
                      CEO Insights Layer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 01. IA Philosophy */}
        <section className="space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-6">
            <div className="size-12 bg-[#E10600]/10 border border-[#E10600]/30 flex items-center justify-center text-[#E10600]">
              <Bot size={24} />
            </div>
            01. Philosophie de l'IA
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-slate-400 text-lg leading-relaxed font-light italic">
            <p>
              Krypton AI ne propose pas une IA de "chat". Nous construisons des{" "}
              <strong>moteurs de décision</strong>. Notre philosophie repose sur
              l'Explainable AI (XAI) : chaque décision prise par FIKO™ doit être
              auditable, justifiable et alignée sur les objectifs de croissance.
            </p>
            <p>
              L'architecture est conçue pour supprimer les frictions humaines là
              où elles coûtent cher (qualification, relance, diagnostic) tout en
              amplifiant l'autorité de l'entreprise.
            </p>
          </div>
        </section>

        {/* 02. Technical Details */}
        <section className="space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-6">
            <div className="size-12 bg-[#E10600]/10 border border-[#E10600]/30 flex items-center justify-center text-[#E10600]">
              <Layers size={24} />
            </div>
            02. Détails Techniques
          </h2>
          <div className="bg-[#1A1A1F] border border-white/5 p-12 lg:p-20 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 hex-bg opacity-10"></div>
            <div className="relative z-10 grid gap-12">
              {[
                {
                  title: "FRONTEND LAYER",
                  desc: "React 19 / Next.js / Tailwind. Interface à latence zéro optimisée pour le Core Web Vitals.",
                  icon: <Globe className="text-[#E10600]" />,
                },
                {
                  title: "API GATEWAY",
                  desc: "Google Cloud API Gateway. Gestion des quotas, authentification JWT et rate limiting.",
                  icon: <Lock className="text-[#E10600]" />,
                },
                {
                  title: "DATA LAYER",
                  desc: "Firestore (Temps Réel) & BigQuery (Analytique). Ségrégation stricte des environnements.",
                  icon: <Database className="text-[#E10600]" />,
                },
                {
                  title: "IA CORE",
                  desc: "Vertex AI (GCP). Inférence multimodale via Gemini 1.5 Pro & Flash avec monitoring de drift.",
                  icon: <Cpu className="text-[#E10600]" />,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-10 group">
                  <div className="flex-shrink-0 size-16 bg-black border border-white/10 flex items-center justify-center group-hover:border-[#E10600]/40 transition-all">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-base font-light italic leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-40 pt-20 border-t border-white/5 text-center">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-10">
            PRÊT POUR LA <span className="text-[#E10600]">DISRUPTION ?</span>
          </h3>
          <button
            onClick={() => onNavigate(Page.AUTH)}
            className="bg-[#E10600] hover:bg-red-700 text-white px-16 py-8 rounded-sm font-black text-sm uppercase tracking-[0.4em] transition-all shadow-2xl active:scale-95"
          >
            Lancer un déploiement Pilote
          </button>
        </div>
      </div>

      <style>{`
        @keyframes data-flow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .animate-data-flow {
          animation: data-flow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Helper Icons for Schema
const ArrowDownIcon = () => (
  <div className="flex flex-col items-center gap-1 opacity-20">
    <div className="w-px h-12 bg-gradient-to-b from-[#E10600] to-transparent"></div>
    <ChevronDown size={14} className="text-[#E10600]" />
  </div>
);

export default WhitepaperPage;
