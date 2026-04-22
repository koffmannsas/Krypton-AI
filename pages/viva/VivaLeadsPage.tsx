import React, { useState } from "react";
import { Page, VivaCampaign, VivaLead, UserProfile } from "../../types";
import { MOCK_VIVA_CAMPAIGNS, MOCK_VIVA_LEADS } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  Database,
  Search,
  Play,
  Plus,
  ArrowRight,
  Filter,
  Download,
  Globe,
  Zap,
  ShieldCheck,
  Mail,
  Phone,
  Loader2,
  Target,
  Network,
} from "lucide-react";

interface VivaLeadsPageProps {
  onNavigate: (p: Page) => void;
  user: UserProfile | null;
}

const VivaLeadsPage: React.FC<VivaLeadsPageProps> = ({ onNavigate, user }) => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "wizard" | "vault" | "mailing"
  >("dashboard");
  const [campaigns] = useState<VivaCampaign[]>(MOCK_VIVA_CAMPAIGNS);
  const [leads] = useState<VivaLead[]>(MOCK_VIVA_LEADS);
  const [isScraping, setIsScraping] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0F] pt-32 pb-40 px-6 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>

      {/* HUD Header */}
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 relative z-10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="size-3 bg-[#E10600] rounded-full animate-pulse shadow-[0_0_10px_#E10600]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#E10600]">
              Intelligence Tactical Module // VivaLeads v1.0
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">
            VIVA<span className="text-[#E10600]">LEADS.</span>
          </h1>
        </div>

        <div className="flex bg-[#141419] border border-white/5 p-1 rounded-sm shadow-2xl">
          {[
            { id: "dashboard", label: "Monitor", icon: <Radar size={16} /> },
            { id: "wizard", label: "Nouveau Job", icon: <Plus size={16} /> },
            { id: "vault", label: "Lead Vault", icon: <Database size={16} /> },
            { id: "mailing", label: "Email Blast", icon: <Mail size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-4 flex items-center gap-3 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? "bg-[#E10600] text-white shadow-xl" : "text-slate-500 hover:text-white hover:bg-white/5"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto relative z-10">
        <AnimatePresence mode="sync">
          {activeTab === "dashboard" && (
            <motion.div
              key="dash"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid lg:grid-cols-4 gap-8">
                {[
                  {
                    label: "Crédits Restants",
                    val: "14,250",
                    icon: <Zap />,
                    color: "text-emerald-500",
                  },
                  {
                    label: "Campagnes Actives",
                    val: "04",
                    icon: <Play />,
                    color: "text-[#E10600]",
                  },
                  {
                    label: "Total Leads Indexés",
                    val: "84,102",
                    icon: <Database />,
                    color: "text-white",
                  },
                  {
                    label: "Indice de Qualité",
                    val: "98.4%",
                    icon: <ShieldCheck />,
                    color: "text-blue-500",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#141419] p-10 border border-white/5 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-10">
                      {stat.label}
                    </p>
                    <h3
                      className={`text-4xl font-black tracking-tighter ${stat.color}`}
                    >
                      {stat.val}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#1A1A1F] border border-white/5 p-12 space-y-10 rounded-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Flux de Scraping Live
                    </h4>
                    <div className="flex items-center gap-4 text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
                      <Network size={12} /> PROXY_MESH: STABLE
                    </div>
                  </div>
                  <div className="bg-black p-8 font-mono text-[11px] text-[#E10600]/80 h-80 overflow-y-auto border border-white/5 rounded-sm custom-scrollbar">
                    <p className="mb-2 opacity-50">
                      [SYSTEM] INITIALISATION VIVALEADS ENGINE...
                    </p>
                    <p className="mb-2">[SCAN] CIBLE: Dakar - Secteur BTP</p>
                    <p className="mb-2">
                      [DATA] EXTRACTION NODE #842 - SUCCESS
                    </p>
                    <p className="mb-2 text-emerald-500">
                      [ENRICH] EMAIL VALIDATED: contact@build-corp.sn
                    </p>
                    <p className="mb-2 opacity-50">
                      [SYSTEM] ROTATION PROXY... NEW IP: 142.12.8.42
                    </p>
                    <p className="mb-2 animate-pulse text-white">_</p>
                  </div>
                </div>

                <div className="bg-black border border-[#E10600]/20 p-12 rounded-sm space-y-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="size-16 bg-[#E10600] rounded-sm flex items-center justify-center text-white shadow-2xl">
                      <Target size={32} />
                    </div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">
                      ANALYSE <br />
                      PRÉDICTIVE.
                    </h4>
                    <p className="text-[10px] text-slate-500 font-light italic leading-relaxed uppercase tracking-widest">
                      "Le moteur VivaLeads détecte les opportunités de closing
                      avant même que le prospect ne soit contacté."
                    </p>
                  </div>
                  <button className="w-full py-5 bg-white text-black text-[9px] font-black uppercase tracking-[0.4em] hover:bg-[#E10600] hover:text-white transition-all">
                    GÉNÉRER RAPPORT ROI
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "wizard" && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-[#141419] border border-white/10 p-16 space-y-16 rounded-sm shadow-2xl relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E10600]"></div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black uppercase tracking-tighter">
                    INITIALISER <br />
                    <span className="text-[#E10600]">JOBS SCRAPING.</span>
                  </h3>
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">
                    Configuration du ciblage neural v1.3
                  </p>
                </div>

                <div className="space-y-12">
                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                      <Globe size={14} /> MARCHÉS CIBLES
                    </label>
                    <input
                      placeholder="EX: BTP, FINANCE, LUXE..."
                      className="w-full bg-black border border-white/10 p-8 text-xl font-light italic text-white outline-none focus:border-[#E10600] transition-all"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Plus size={14} /> SOURCES DE DONNÉES
                      </label>
                      <div className="space-y-3">
                        {["Google Maps", "LinkedIn", "Annuaires Web"].map(
                          (s) => (
                            <div
                              key={s}
                              className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-sm group hover:border-[#E10600]/30 transition-all cursor-pointer"
                            >
                              <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-white">
                                {s}
                              </span>
                              <div className="size-4 rounded-sm border border-white/20 flex items-center justify-center group-hover:bg-[#E10600] transition-all">
                                <Check size={10} className="text-white" />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Zap size={14} /> EXTRACTION SMART
                      </label>
                      <div className="space-y-3">
                        {[
                          "Emails Vérifiés",
                          "Numéros Mobiles",
                          "Tech Stack",
                        ].map((s) => (
                          <div
                            key={s}
                            className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-sm group hover:border-[#E10600]/30 transition-all cursor-pointer"
                          >
                            <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-white">
                              {s}
                            </span>
                            <div className="size-4 rounded-sm border border-white/20 flex items-center justify-center group-hover:bg-[#E10600] transition-all">
                              <Check size={10} className="text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-600 uppercase mb-2">
                      COÛT ESTIMÉ DU JOB
                    </p>
                    <p className="text-3xl font-black text-white">
                      420{" "}
                      <span className="text-[10px] text-slate-500">
                        CRÉDITS
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsScraping(true);
                      setTimeout(() => setActiveTab("dashboard"), 2000);
                    }}
                    className="bg-[#E10600] px-16 py-8 text-white font-black text-xs uppercase tracking-[0.5em] flex items-center gap-6 hover:bg-red-700 transition-all shadow-2xl active:scale-95"
                  >
                    {isScraping ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        DÉPLOYER L'UNITÉ <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "vault" && (
            <motion.div
              key="vault"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div className="space-y-4">
                  <h2 className="text-6xl font-black uppercase tracking-tighter">
                    LEAD <span className="text-blue-500">VAULT.</span>
                  </h2>
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">
                    Base de données d'Intelligence Commerciale Chiffrée
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[#141419] border border-white/5 p-4 flex items-center gap-4">
                    <Search size={16} className="text-slate-600" />
                    <input
                      placeholder="FILTRER L'INTELLIGENCE..."
                      className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-white w-64"
                    />
                  </div>
                  <button className="bg-white/5 border border-white/10 p-4 text-slate-500 hover:text-white transition-all">
                    <Filter size={18} />
                  </button>
                  <button className="bg-white/5 border border-white/10 p-4 text-slate-500 hover:text-[#E10600] transition-all">
                    <Download size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-[#141419] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5 bg-black/20">
                      <th className="px-10 py-6">IDENTITÉ B2B</th>
                      <th className="px-10 py-6 text-center">SOURCE</th>
                      <th className="px-10 py-6 text-center">COORDONNÉES</th>
                      <th className="px-10 py-6 text-center">PRIORITY_ML</th>
                      <th className="px-10 py-6 text-right">GESTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((l) => (
                      <tr
                        key={l.id}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-10 py-10">
                          <div className="flex items-center gap-6">
                            <div className="size-12 bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white group-hover:border-[#E10600]/40 transition-all">
                              {l.companyName[0]}
                            </div>
                            <div>
                              <p className="text-sm font-black text-white uppercase tracking-tighter">
                                {l.companyName}
                              </p>
                              <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">
                                {l.industry} UNIT
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-10 text-center">
                          <span className="text-[8px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 text-slate-500 group-hover:text-white transition-colors">
                            {l.source.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-10 py-10 text-center">
                          <div className="flex justify-center gap-4">
                            <div className="size-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-600 group-hover:text-[#E10600]">
                              <Mail size={12} />
                            </div>
                            <div className="size-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-600 group-hover:text-emerald-500">
                              <Phone size={12} />
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-10 text-center">
                          <span
                            className={`text-xl font-black ${l.score >= 80 ? "text-[#E10600]" : "text-white"}`}
                          >
                            {l.score}%
                          </span>
                        </td>
                        <td className="px-10 py-10 text-right">
                          <button className="px-6 py-3 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                            Audit Détail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "mailing" && (
            <motion.div
              key="mailing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl mx-auto space-y-12"
            >
              <div className="bg-[#1A1A1F] border border-white/10 p-12 lg:p-20 rounded-sm relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                  <Zap size={200} />
                </div>
                <div className="relative z-10 space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black uppercase tracking-tighter">
                      EMAIL <br />
                      <span className="text-[#E10600]">BLAST IA.</span>
                    </h3>
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">
                      Génération et Envoi de Séquences de Closing
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8 p-10 bg-black/40 border border-white/5">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#E10600]">
                        Config. Séquence
                      </h4>
                      <div className="space-y-6">
                        <select className="w-full bg-black border border-white/10 p-5 text-[10px] font-black uppercase text-white outline-none">
                          <option>Séquence : Introduction Stratégique</option>
                          <option>Séquence : Relance Post-Audit</option>
                        </select>
                        <div className="p-6 bg-white/5 border border-white/5 space-y-3">
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                            Cibles Sélectionnées
                          </p>
                          <p className="text-2xl font-black text-white">
                            142 LEADS
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8 p-10 bg-black/40 border border-white/5">
                      <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">
                        Génération IA
                      </h4>
                      <div className="space-y-4">
                        <p className="text-[10px] text-slate-400 font-light italic leading-relaxed">
                          « FIKO peut générer 142 emails personnalisés basés sur
                          le secteur d'activité et la tech stack détectée. »
                        </p>
                        <button className="w-full py-5 border border-[#E10600]/30 text-[#E10600] text-[9px] font-black uppercase tracking-[0.4em] hover:bg-[#E10600] hover:text-white transition-all">
                          PROMPT BUILDER (AUTOPILOT)
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-8 bg-[#E10600] text-white font-black text-xs uppercase tracking-[0.5em] shadow-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-6">
                    DÉCLENCHER L'ENVOI MASSIF <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background Decor */}
      <div className="fixed bottom-20 right-[-10%] size-[800px] bg-[#E10600]/5 blur-[150px] rounded-full pointer-events-none"></div>
    </div>
  );
};

// Internal Helper
const Check = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default VivaLeadsPage;
