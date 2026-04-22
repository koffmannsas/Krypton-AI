import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Database,
  Shield,
  Zap,
  Search,
  Globe,
  Activity,
  LayoutGrid,
  Radar,
  Filter,
  Download,
  Play,
  Cpu,
} from "lucide-react";
import { Page } from "../../types";

interface ScraperPageProps {
  onNavigate: (p: Page) => void;
}

const ScraperPage: React.FC<ScraperPageProps> = ({ onNavigate }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Added startScan function to fix "Cannot find name 'startScan'" error
  const startScan = () => {
    setLogs([]);
    setIsScanning(true);
  };

  useEffect(() => {
    if (isScanning) {
      const messages = [
        "[SYSTEM] INITIALISATION DU NOYAU DATASCRAPER v9.0...",
        "[AUTH] ÉTABLISSEMENT DU CANAL DE CONFIANCE : KRYPTON-SEC",
        "[NETWORK] MAILLAGE PROXY MONDIAL ACTIVÉ (14,209 NOEUDS)",
        "[SCAN] CIBLE IDENTIFIÉE : MARCHÉ OUEST-AFRICAIN (ECOWAS)",
        "[BTP] ANALYSE DES APPELS D'OFFRE EN COURS...",
        "[IA] DÉCODAGE DES STRUCTURES DE DÉCISION CORPORATE...",
        "[DATA] EXTRACTION DE 142 NOEUDS D'INTELLIGENCE...",
        "[WAF] CONTOURNEMENT RÉUSSI : PERIMETER SHIELD BYPASSED",
        "[SUCCESS] DONNÉES ENVOYÉES AU COEUR NEURAL CRM",
        "[SYSTEM] SÉQUENCE TERMINÉE. ANALYSE DES OPPORTUNITÉS...",
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < messages.length) {
          setLogs((prev) => [...prev, messages[i]]);
          i++;
        } else {
          setIsScanning(false);
          clearInterval(interval);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
      {/* Tactical Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
        <div className="flex items-center gap-6">
          <div className="size-20 bg-[#E10600]/10 border border-[#E10600]/30 rounded-sm flex items-center justify-center shadow-[0_0_30px_rgba(224,7,0,0.1)]">
            <Radar size={40} className="text-[#E10600] animate-pulse" />
          </div>
          <div>
            <p className="text-[#E10600] text-[10px] font-black tracking-[0.5em] uppercase mb-2">
              Business Intelligence Weaponized
            </p>
            <h1 className="text-5xl font-black uppercase tracking-tighter">
              DATA<span className="text-[#E10600]">SCRAPER</span>_01
            </h1>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 border border-white/5 bg-white/[0.02] rounded-sm text-center">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Bots en Essaim
            </p>
            <p className="text-xl font-mono font-bold text-white">42</p>
          </div>
          <div className="px-6 py-3 border border-white/5 bg-white/[0.02] rounded-sm text-center">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Couverture
            </p>
            <p className="text-xl font-mono font-bold text-emerald-500">
              GLOBAL
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-[#1A1A1F] border border-white/5 p-8 space-y-8 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E10600]"></div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                <Filter size={12} /> Secteur Cible
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "FINANCE & FINTECH",
                  "IMMOBILIER & BTP",
                  "SANTÉ PRIVÉE",
                  "E-COMMERCE PREMIUM",
                ].map((s) => (
                  <button
                    key={s}
                    className="w-full px-4 py-4 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:border-[#E10600] hover:text-[#E10600] transition-all bg-black/40 text-left flex justify-between items-center group"
                  >
                    {s}
                    <div className="size-1 bg-[#E10600] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                <Cpu size={12} /> Profondeur Neurale
              </label>
              <select className="w-full bg-black border border-white/10 p-4 text-[11px] font-black uppercase tracking-widest text-white outline-none focus:border-[#E10600] appearance-none">
                <option>EXTRACTION PROFONDE (L3)</option>
                <option>BALAYAGE RAPIDE (L1)</option>
                <option>ANALYSE MÉTIER (L2)</option>
              </select>
            </div>

            <button
              onClick={startScan}
              disabled={isScanning}
              className={`w-full py-6 font-black text-xs uppercase tracking-[0.3em] transition-all rounded-sm flex items-center justify-center gap-4 ${
                isScanning
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-[#E10600] text-white hover:bg-red-700 shadow-xl shadow-red-500/20"
              }`}
            >
              {isScanning ? (
                <>
                  SCANNING IN PROGRESS{" "}
                  <Activity size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  LANCER L'INFILTRATION <Play size={16} fill="white" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Intelligence Grid */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Maillage Proxy",
                val: "14,209",
                icon: <Globe size={18} className="text-[#E10600]" />,
              },
              {
                label: "Taux de Pénétration",
                val: "99.8%",
                icon: <Zap size={18} className="text-[#E10600]" />,
              },
              {
                label: "Items Indexés",
                val: "1.42M",
                icon: <Database size={18} className="text-[#E10600]" />,
              },
              {
                label: "Threat Level",
                val: "MINIMAL",
                icon: <Shield size={18} className="text-emerald-500" />,
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-[#1A1A1F] p-6 border border-white/5 flex flex-col gap-4 group hover:border-[#E10600]/30 transition-all shadow-xl"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    {s.label}
                  </span>
                  {s.icon}
                </div>
                <p className="text-3xl font-mono font-bold tracking-tighter">
                  {s.val}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#1A1A1F] border border-white/5 rounded-sm overflow-hidden flex flex-col shadow-2xl min-h-[500px]">
            <div className="p-6 border-b border-white/10 bg-black/40 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="size-2 bg-[#E10600] rounded-full animate-pulse shadow-[0_0_10px_#E10600]"></div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">
                  Flux d'Intelligence Brut
                </h3>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-5 py-2 border border-white/10 text-[9px] font-black uppercase hover:bg-white/5 transition-all text-slate-400 hover:text-white">
                  <Download size={14} /> EXPORT CSV
                </button>
                <button className="flex items-center gap-2 px-5 py-2 border border-[#E10600]/30 text-[9px] font-black uppercase text-[#E10600] hover:bg-[#E10600]/5 transition-all">
                  JSON FEED
                </button>
              </div>
            </div>

            <div className="overflow-x-auto flex-grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5 bg-black/20">
                    <th className="px-10 py-6">Statut Neurale</th>
                    <th className="px-10 py-6">Entité Ciblée</th>
                    <th className="px-10 py-6">Localisation</th>
                    <th className="px-10 py-6">Score Opportunité</th>
                    <th className="px-10 py-6">Vecteur d'Attaque</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 font-medium">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-10 py-8">
                      <span className="text-[#E10600] font-black flex items-center gap-3">
                        <div className="size-1.5 bg-[#E10600] rounded-full animate-pulse"></div>{" "}
                        INFILTRÉ
                      </span>
                    </td>
                    <td className="px-10 py-8 font-black text-white uppercase tracking-tighter text-base">
                      Koffmann Invest Africa
                    </td>
                    <td className="px-10 py-8 text-[11px] uppercase tracking-widest">
                      Dakar, SN
                    </td>
                    <td className="px-10 py-8">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black border border-emerald-500/20">
                        98/100
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex gap-2">
                        <span className="bg-white/5 border border-white/10 px-3 py-1 text-[9px] font-black">
                          AI_CRM_UPGRADE
                        </span>
                        <span className="bg-white/5 border border-white/10 px-3 py-1 text-[9px] font-black">
                          AUTONOMOUS_VOICE
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-10 py-8">
                      <span className="text-slate-600 font-black flex items-center gap-3">
                        <div className="size-1.5 bg-slate-600 rounded-full"></div>{" "}
                        ANALYSÉ
                      </span>
                    </td>
                    <td className="px-10 py-8 font-black text-white uppercase tracking-tighter text-base">
                      Sahel Logistique S.A.
                    </td>
                    <td className="px-10 py-8 text-[11px] uppercase tracking-widest">
                      Abidjan, CI
                    </td>
                    <td className="px-10 py-8">
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-black border border-yellow-500/20">
                        84/100
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex gap-2">
                        <span className="bg-white/5 border border-white/10 px-3 py-1 text-[9px] font-black">
                          LOGISTIC_ENGINE
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Terminal View */}
            <div className="bg-black p-8 font-mono text-[11px] text-[#E10600]/80 h-72 overflow-y-auto border-t border-white/10 hex-bg shadow-inner">
              <div className="flex items-center gap-3 mb-4 opacity-50">
                <Terminal size={14} />
                <span className="uppercase tracking-[0.2em]">
                  Krypton Terminal v4.2 // Active Session
                </span>
              </div>
              {logs.length === 0 && (
                <p className="opacity-30 animate-pulse tracking-[0.4em] uppercase py-4">
                  SYSTÈME EN ATTENTE DE SÉQUENCE D'INFILTRATION..._
                </p>
              )}
              {logs.map((log, i) => (
                <p
                  key={i}
                  className="mb-2 leading-relaxed opacity-100 flex gap-4"
                >
                  <span className="text-slate-700">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span className="text-white/80">{log}</span>
                </p>
              ))}
              {isScanning && (
                <div className="w-2 h-4 bg-[#E10600] animate-pulse inline-block ml-4"></div>
              )}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScraperPage;
