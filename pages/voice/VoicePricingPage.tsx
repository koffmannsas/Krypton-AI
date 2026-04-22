import React from "react";
import { Page } from "../../types";
import { motion } from "framer-motion";
import {
  Mic,
  Zap,
  Brain,
  BarChart3,
  Database,
  ShieldCheck,
  Crown,
  TrendingUp,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Terminal,
} from "lucide-react";

interface VoicePricingPageProps {
  onNavigate: (p: Page) => void;
  onOpenFiko: () => void;
}

const VoicePricingPage: React.FC<VoicePricingPageProps> = ({
  onNavigate,
  onOpenFiko,
}) => {
  const plans = [
    {
      id: "TERRA",
      name: "FIKO VOICE TERRA",
      price: "700 000 FCFA / an",
      minutes: "150 minutes / mois",
      features: [
        "Agent vocal IA personnalisé",
        "Intégration site web",
        "Dashboard de suivi usage",
        "Hébergement sécurisé",
        "Statistiques conversations",
      ],
      rules:
        "Blocage à 150 min. Achat de packs possible. Maintenance IA post-6 mois : 10%/mois.",
      target: "PME, cabinets, commerces, startups.",
      color: "#10b981",
      icon: <Zap />,
    },
    {
      id: "MARS",
      name: "FIKO VOICE MARS",
      price: "1 900 000 FCFA / an",
      minutes: "600 minutes / mois",
      features: [
        "Agent vocal avancé sectoriel",
        "Intégration site + landing pages",
        "Connexion CRM",
        "Analytics avancés",
        "Option redirection vers humain",
      ],
      rules:
        "Blocage à 600 min. Upgrade auto packs. Maintenance IA post-6 mois : 10%/mois.",
      target:
        "Entreprises structurées, immobilier, écoles, cliniques, e-commerce.",
      color: "#E10600",
      icon: <Brain />,
    },
    {
      id: "KRYPTON",
      name: "FIKO VOICE KRYPTON",
      price: "3 900 000 FCFA / an",
      minutes: "1 000 minutes / mois",
      features: [
        "Agent vocal multi-contextuel",
        "Intégration CRM + API",
        "Standard téléphonique IA",
        "Dashboard exécutif",
        "Logs et audit IA",
      ],
      rules:
        "1000 min incluses. Dépassement: 1200 FCFA/min. Maintenance IA post-6 mois : 10%/mois.",
      target: "Banques, grandes entreprises, institutions, groupes.",
      color: "#3b82f6",
      icon: <Crown />,
    },
  ];

  const minutePacks = [
    { name: "PACK 100", minutes: "100 min", price: "150 000 FCFA" },
    { name: "PACK 300", minutes: "300 min", price: "350 000 FCFA" },
    { name: "PACK 1 000", minutes: "1 000 min", price: "900 000 FCFA" },
  ];

  return (
    <div className="relative bg-[#0B0B0F] overflow-hidden min-h-screen pb-40">
      <div className="absolute inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[1200px] h-[1200px] bg-[#E10600]/5 blur-[250px] rounded-full -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24 space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 border border-[#E10600] bg-[#E10600]/5 text-[#E10600] text-[10px] font-black uppercase tracking-[0.5em]">
            GRILLE OFFICIELLE 2026
          </div>
          <h1 className="text-6xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.85] text-white">
            KRYPTON AI <br />
            <span className="text-[#E10600] italic">VOICE.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium text-xl uppercase tracking-[0.3em] leading-relaxed italic">
            L'infrastructure vocale intelligente qui transforme chaque appel en
            opportunité stratégique.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#141419] border-t-4 rounded-sm p-10 flex flex-col group hover:bg-[#1A1A1F] transition-all duration-300 shadow-2xl"
              style={{ borderTopColor: plan.color }}
            >
              <div className="flex-grow space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="size-12 rounded-sm flex items-center justify-center border border-white/10"
                      style={{ color: plan.color }}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-2xl font-black tracking-tighter text-white">
                    {plan.price}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {plan.minutes}
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  {plan.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 text-sm text-slate-400"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 flex-shrink-0"
                      />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 space-y-6">
                <div className="h-20">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                    Règles & Cible
                  </p>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    {plan.rules}
                  </p>
                  <p className="text-xs text-slate-400 font-bold mt-2">
                    {plan.target}
                  </p>
                </div>
                <button
                  onClick={onOpenFiko}
                  className="w-full py-6 text-white font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 group/btn"
                  style={{ backgroundColor: plan.color }}
                >
                  Déployer {plan.id}
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-2 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minute Packs & Positioning */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-[#1A1A1F] p-12 border border-white/5 rounded-sm space-y-8">
            <h4 className="text-base font-black uppercase tracking-[0.3em] text-[#E10600]">
              Packs Minutes Officiels
            </h4>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-black text-slate-600 uppercase tracking-widest border-b border-white/10">
                  <th className="py-3">Pack</th>
                  <th className="py-3">Minutes</th>
                  <th className="py-3 text-right">Prix</th>
                </tr>
              </thead>
              <tbody>
                {minutePacks.map((pack) => (
                  <tr key={pack.name} className="border-b border-white/5">
                    <td className="py-4 text-xs font-bold text-white">
                      {pack.name}
                    </td>
                    <td className="py-4 text-xs font-medium text-slate-400">
                      {pack.minutes}
                    </td>
                    <td className="py-4 text-xs font-bold text-white text-right">
                      {pack.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-3 bg-black border border-[#E10600]/30 p-12 rounded-sm space-y-8 flex flex-col justify-center text-center shadow-[0_0_80px_rgba(225,6,0,0.15)]">
            <h4 className="text-base font-black uppercase tracking-[0.3em] text-white">
              Positionnement Officiel
            </h4>
            <p className="text-3xl text-slate-400 font-light italic leading-relaxed">
              Krypton AI Voice n’est pas "un chatbot vocal". <br />
              C’est une{" "}
              <span className="text-white font-medium not-italic underline decoration-[#E10600]">
                infrastructure vocale intelligente
              </span>{" "}
              d’entreprise.
            </p>
            <p className="text-sm font-black uppercase tracking-widest text-[#E10600]">
              Le premier standard vocal IA intelligent d’Afrique francophone.
            </p>
          </div>
        </div>

        {/* Technical Structure */}
        <div className="mt-24 bg-[#141419]/50 border border-white/10 p-12 rounded-sm space-y-10 backdrop-blur-xl">
          <h4 className="text-base font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-4">
            <Terminal size={18} /> Structure Technique Recommandée
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {[
              "Gemini Live API",
              "Firebase Usage Tracking",
              "WebRTC Real-time",
              "Système de Quotas",
              "Cache Intelligent",
            ].map((tech) => (
              <div
                key={tech}
                className="p-6 bg-white/5 border border-white/5 rounded-sm flex flex-col items-center justify-center gap-3"
              >
                <Cpu size={20} className="text-slate-500" />
                <span className="text-[10px] font-black uppercase text-slate-400">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoicePricingPage;
