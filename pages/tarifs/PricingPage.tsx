import React, { useState, useRef, useEffect } from "react";
import { Page } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Mic,
  Zap,
  Brain,
  Crown,
  Layers,
} from "lucide-react";
import GalacticCard from "../../components/GalacticCard";
import { useCosmic } from "../../contexts/CosmicContext";
import { usePricing } from "../../hooks/usePricing";

interface PricingPageProps {
  onNavigate: (p: Page) => void;
  onOpenFiko: (gate?: string) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  onOpenFiko,
}) => {
  const { plans, features: comparisonFeatures, loading } = usePricing();
  const { activeCardId } = useCosmic();
  const [cardRects, setCardRects] = useState<
    Record<string, DOMRect | undefined>
  >({});
  const gridRef = useRef<HTMLDivElement>(null);

  const interpretations = [
    { name: "ACCESS", desc: "Fondation digitale professionnelle." },
    { name: "TERRA", desc: "Première activation IA." },
    { name: "MARS", desc: "Automatisation structurée." },
    { name: "KRYPTON", desc: "Infrastructure intelligente d’entreprise." },
    { name: "GALAXY", desc: "Système IA stratégique avancé." },
  ];

  useEffect(() => {
    const updateRects = () => {
      if (!gridRef.current || loading) return;
      const newRects: Record<string, DOMRect> = {};
      const gridRect = gridRef.current.getBoundingClientRect();

      for (const plan of plans) {
        const el = gridRef.current.querySelector(`[data-card-id="${plan.id}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          newRects[plan.id] = new DOMRect(
            rect.left - gridRect.left,
            rect.top - gridRect.top,
            rect.width,
            rect.height,
          );
        }
      }
      setCardRects((prev) => {
        const isDifferent =
          Object.keys(newRects).some((key) => {
            const p = prev[key];
            const n = newRects[key];
            if (!p || !n) return true;
            return (
              Math.abs(p.x - n.x) > 1 ||
              Math.abs(p.y - n.y) > 1 ||
              Math.abs(p.width - n.width) > 1 ||
              Math.abs(p.height - n.height) > 1
            );
          }) || Object.keys(prev).length !== Object.keys(newRects).length;

        return isDifferent ? newRects : prev;
      });
    };

    updateRects();
    window.addEventListener("resize", updateRects);

    const resizeObserver = new ResizeObserver(updateRects);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateRects);
      resizeObserver.disconnect();
    };
  }, [plans, loading]);

  const activeRect = activeCardId ? cardRects[activeCardId] : null;

  const handleCtaClick = (planId: string) => {
    if (planId === "ACCESS") onNavigate(Page.ACCESS_OFFER);
    else if (planId === "TERRA") onNavigate(Page.TERRA_OFFER);
    else if (planId === "MARS") onNavigate(Page.MARS_OFFER);
    else if (planId === "KRYPTON") onNavigate(Page.KRYPTON_OFFER);
    else if (planId === "GALAXY") onNavigate(Page.GALAXY_OFFER);
  };

  const renderCellValue = (value: string) => {
    if (value === "✅")
      return <CheckCircle2 className="mx-auto text-emerald-500" size={18} />;
    if (value === "❌")
      return <XCircle className="mx-auto text-red-500/40" size={18} />;
    return <span className="text-xs font-bold text-slate-300">{value}</span>;
  };

  return (
    <div className="relative bg-[#0B0B0F] overflow-hidden min-h-screen pb-40">
      <div className="absolute top-0 left-0 w-[1200px] h-[1200px] bg-[#E10600]/5 blur-[250px] rounded-full -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1800px] mx-auto px-6 pt-40 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24 space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 border border-[#E10600] bg-[#E10600]/5 text-[#E10600] text-[10px] font-black uppercase tracking-[0.5em]">
            SYSTÈME PLANÉTAIRE KRYPTON
          </div>
          <h1 className="text-6xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.85] text-white">
            CHOISISSEZ VOTRE <br />
            <span className="text-[#E10600] italic">PORTE D'ACCÈS.</span>
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto font-medium text-xl uppercase tracking-[0.3em] leading-relaxed italic">
            ✨ CHAQUE PORTE CACHE UN TRÉSOR. Survolez pour activer le vortex.
          </p>
        </motion.div>

        {/* Pricing Grid with reduced height h-[520px] */}
        <div className="relative">
          <AnimatePresence>
            {activeRect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="absolute pointer-events-none rounded-sm z-0"
                style={{
                  left: activeRect.x,
                  top: activeRect.y,
                  width: activeRect.width,
                  height: activeRect.height,
                  boxShadow: `0 0 80px 20px ${plans.find((p) => p.id === activeCardId)?.color || "#a855f7"}`,
                  backgroundColor: `${plans.find((p) => p.id === activeCardId)?.color || "#a855f7"}20`,
                }}
              />
            )}
          </AnimatePresence>

          <div
            ref={gridRef}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10"
          >
            {plans.map((plan: any, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="h-[520px]"
                data-card-id={plan.id}
              >
                <GalacticCard
                  id={plan.id}
                  title={plan.name}
                  story={plan.story}
                  price={plan.price}
                  subtitle={plan.subtitle}
                  features={plan.included}
                  cta={plan.cta}
                  color={plan.color}
                  onClick={() => handleCtaClick(plan.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* COMPARISON SECTION */}
        <div className="mt-40 pt-32 border-t border-white/5">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white">
              Comparez les{" "}
              <span className="text-[#E10600] italic">solutions</span>
            </h2>
            <p className="mt-6 text-xl text-slate-500 font-medium uppercase tracking-[0.3em]">
              Choisissez le niveau de performance adapté à votre ambition.
            </p>
          </div>

          <div className="overflow-x-auto custom-scrollbar border border-white/10 rounded-sm">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="p-6 w-1/4 text-left text-sm font-black uppercase tracking-widest">
                    Fonctionnalités
                  </th>
                  <th className="p-6 text-center text-sm font-black uppercase tracking-widest text-purple-400">
                    ACCESS
                  </th>
                  <th className="p-6 text-center text-sm font-black uppercase tracking-widest text-emerald-400">
                    TERRA
                  </th>
                  <th className="p-6 text-center text-sm font-black uppercase tracking-widest text-red-500">
                    MARS
                  </th>
                  <th className="p-6 text-center text-sm font-black uppercase tracking-widest text-blue-400">
                    KRYPTON
                  </th>
                  <th className="p-6 text-center text-sm font-black uppercase tracking-widest text-amber-400 relative">
                    GALAXY
                    <span className="absolute top-2 right-2 text-[7px] font-black bg-amber-400 text-black px-2 py-0.5 rounded-full">
                      ENTREPRISE
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={i}
                    className={`border-t border-white/5 ${feature.name.includes("Agent IA") ? "bg-[#E10600]/5" : ""}`}
                  >
                    <td className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {feature.name}
                    </td>
                    <td className="p-5 text-center">
                      {renderCellValue(feature.access)}
                    </td>
                    <td className="p-5 text-center">
                      {renderCellValue(feature.terra)}
                    </td>
                    <td className="p-5 text-center">
                      {renderCellValue(feature.mars)}
                    </td>
                    <td className="p-5 text-center bg-white/[0.02]">
                      {renderCellValue(feature.krypton)}
                    </td>
                    <td className="p-5 text-center">
                      {renderCellValue(feature.galaxy)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px mt-12 bg-white/10 overflow-hidden rounded-sm">
            {interpretations.map((item) => (
              <div key={item.name} className="p-8 bg-[#141419] text-center">
                <p className="text-xs font-black uppercase tracking-widest mb-2">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500 italic">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-32 p-16 bg-[#1A1A1F] border border-white/10 rounded-sm flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="space-y-4">
              <h3 className="text-3xl font-black uppercase tracking-tighter">
                Vous hésitez ?
              </h3>
              <p className="text-slate-400 font-light italic text-lg max-w-2xl">
                Commencez avec ACCESS et évoluez à tout moment vers
                l’intelligence artificielle.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenFiko("ACCESS")}
                className="px-8 py-5 bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-purple-700 transition-colors"
              >
                Démarrer avec ACCESS
              </button>
              <button
                onClick={() => onOpenFiko()}
                className="px-8 py-5 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-colors"
              >
                Parler à un conseiller
              </button>
              <button
                onClick={() => onNavigate(Page.AGENTS)}
                className="px-8 py-5 text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
              >
                Voir les solutions IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
