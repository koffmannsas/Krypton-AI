import React from "react";
import { Page } from "../../types";
import {
  Shield,
  Lock,
  Server,
  CheckCircle2,
  Cloud,
  Code,
  Zap,
  Cpu,
  Globe,
  Database,
  Layers,
  ArrowRight,
  Hexagon,
  Activity,
} from "lucide-react";

interface TrustPageProps {
  onNavigate: (p: Page) => void;
}

const TrustPage: React.FC<TrustPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
      {/* Infrastructure Hero */}
      <section className="relative py-32 mb-20 overflow-hidden">
        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-4 px-5 py-2 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] text-[11px] font-black uppercase tracking-[0.4em] mb-12 rounded-full shadow-[0_0_30px_rgba(224,7,0,0.1)]">
            <Shield className="w-4 h-4" /> PROTOCOLE DE CONFIANCE VÉRIFIÉ
          </div>
          <h1 className="text-6xl md:text-9xl font-black leading-[0.8] tracking-tighter mb-12 uppercase">
            CONFIANCE <br />
            <span className="text-[#E10600] italic">ABSOLUE.</span>
          </h1>
          <p className="text-2xl text-slate-400 font-light leading-relaxed max-w-3xl border-l-2 border-[#E10600] pl-12 italic">
            "Nous ne bâtissons pas seulement sur le Cloud. Nous créons une
            forteresse neurale où chaque bit de donnée est un atout stratégique
            protégé par l'intelligence la plus avancée du marché."
          </p>
        </div>
        <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none animate-[pulse_10s_infinite]">
          <Hexagon size={1200} />
        </div>
      </section>

      {/* Security Metrics Grid */}
      <section className="mb-32 grid lg:grid-cols-4 gap-8">
        {[
          {
            label: "Uptime Réseau",
            val: "99.998%",
            desc: "Haute disponibilité mondiale.",
            icon: <Server className="text-[#E10600]" />,
          },
          {
            label: "Standard Chiffrement",
            val: "AES-512-N",
            desc: "Chiffrement neural asymétrique.",
            icon: <Lock className="text-[#E10600]" />,
          },
          {
            label: "Latence Inférence",
            val: "<14ms",
            desc: "Traitement en temps réel.",
            icon: <Zap className="text-[#E10600]" />,
          },
          {
            label: "Certifications",
            val: "SOC3 / ISO",
            desc: "Conformité bancaire & médicale.",
            icon: <CheckCircle2 className="text-[#E10600]" />,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#1A1A1F] p-10 border border-white/5 relative group hover:border-[#E10600]/40 transition-all duration-500 shadow-xl"
          >
            <div className="mb-8 size-14 bg-black border border-white/5 flex items-center justify-center rounded-sm group-hover:bg-[#E10600] group-hover:text-white transition-all">
              {item.icon}
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              {item.label}
            </span>
            <p className="text-4xl font-black mt-3 tracking-tighter">
              {item.val}
            </p>
            <p className="text-[11px] text-slate-500 mt-4 uppercase tracking-widest font-bold">
              {item.desc}
            </p>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
              <Hexagon size={40} />
            </div>
          </div>
        ))}
      </section>

      {/* Deep Architecture Breakdown */}
      <section className="py-32 border-y border-white/5 relative">
        <div className="absolute inset-0 hex-bg opacity-5 pointer-events-none"></div>
        <div className="grid lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="space-y-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-tight">
              Architecture Neurale <br />
              Haute-Disponibilité
            </h2>
            <p className="text-slate-400 leading-relaxed text-xl font-light">
              Chaque instance de Krypton AI opère dans un environnement{" "}
              <span className="text-white font-medium">
                multi-cloud hybride
              </span>
              . Nos agents sont déployés sur un maillage de serveurs optimisés
              pour l'inférence à faible latence, garantissant que vos clients en
              Afrique reçoivent une réponse instantanée, peu importe la charge
              système.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Isolation Totale",
                  desc: "Chaque client dispose de son propre segment neural sécurisé.",
                  icon: <Shield size={18} />,
                },
                {
                  title: "Auto-Scaling Prédictif",
                  desc: "Nos serveurs anticipent les pics de trafic grâce à l'IA.",
                  icon: <Activity size={18} />,
                },
                {
                  title: "Backups Redondants",
                  desc: "Triple réplication temps réel sur 3 zones géographiques.",
                  icon: <Database size={18} />,
                },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="size-10 bg-[#E10600]/10 border border-[#E10600]/30 rounded-full flex items-center justify-center text-[#E10600] flex-shrink-0 group-hover:bg-[#E10600] group-hover:text-white transition-all">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-1">
                      {f.title}
                    </h4>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group p-1 bg-gradient-to-br from-[#E10600]/20 to-transparent rounded-sm overflow-hidden">
            <div className="relative bg-[#0B0B0F] p-16 flex flex-col items-center justify-center min-h-[600px] border border-white/5">
              <div className="absolute inset-0 hex-bg opacity-10"></div>

              {/* Central Core Visual */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="size-32 bg-gradient-to-br from-[#E10600] to-red-950 rounded-sm flex items-center justify-center shadow-[0_0_80px_rgba(225,6,0,0.4)] animate-pulse relative">
                  <Cloud className="text-white w-14 h-14" />
                  <div className="absolute -inset-4 border border-[#E10600]/30 rounded-sm animate-[ping_3s_infinite]"></div>
                </div>

                <div className="w-px h-16 bg-gradient-to-b from-[#E10600] to-transparent my-4"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {[
                    { label: "GEMINI NEURAL CORE", icon: <Cpu size={14} /> },
                    { label: "VECTARA INDEX", icon: <Database size={14} /> },
                    { label: "KRYPTON PROXY GATE", icon: <Globe size={14} /> },
                  ].map((node, i) => (
                    <div
                      key={i}
                      className="p-6 border border-white/10 bg-white/[0.02] flex flex-col items-center gap-4 text-center group hover:bg-white/5 transition-all"
                    >
                      <div className="text-[#E10600]">{node.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white">
                        {node.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-5 border border-dashed border-white/20 rounded-sm w-full text-center">
                  <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
                    SYSTEM_VERSION: 9.4.0_SECURE
                  </p>
                </div>
              </div>

              <div className="absolute top-6 left-6 text-[9px] font-mono text-[#E10600] opacity-40">
                PROTO_ID: KRYPTON-TRUST-99
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-40 text-center">
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-16 leading-[0.8] italic">
          BÂTIR SUR UN <br />
          <span className="text-[#E10600]">ROC NUMÉRIQUE.</span>
        </h2>
        <p className="text-slate-500 text-lg uppercase tracking-[0.3em] font-black max-w-2xl mx-auto mb-20 leading-loose">
          Krypton AI est audité annuellement par des tiers indépendants pour
          garantir le respect des plus hauts standards de sécurité mondiaux.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <button className="group bg-[#E10600] hover:bg-red-700 px-16 py-8 text-white font-black uppercase text-sm tracking-[0.3em] transition-all shadow-2xl shadow-red-500/20 flex items-center gap-6">
            LANCER UN AUDIT IA{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-3 transition-transform"
            />
          </button>
          <button
            onClick={() => onNavigate(Page.WHITEPAPER)}
            className="border-2 border-white/10 hover:border-white/30 hover:bg-white/5 px-16 py-8 text-white font-black uppercase text-sm tracking-[0.3em] transition-all backdrop-blur-md"
          >
            WHITEPAPER SÉCURITÉ
          </button>
        </div>
      </section>
    </div>
  );
};

export default TrustPage;
