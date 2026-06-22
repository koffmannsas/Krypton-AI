import React from "react";
import { Page } from "../../types";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";

interface GateOfferPageProps {
  gate: "TERRA" | "MARS" | "KRYPTON" | "GALAXY";
  onNavigate: (p: Page) => void;
  onOpenFiko: (gate: string) => void;
  onOpenVocal: (gate?: string) => void;
}

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-4">
    <CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
    <span className="text-lg text-slate-300 font-medium">{children}</span>
  </div>
);

const gateData = {
  TERRA: {
    title: "L'Artisan Digital qui Pose les Fondations de Votre Empire",
    description:
      "PORTE TERRA est la première étape vers l'automatisation. Un agent IA commercial opérationnel immédiatement pour ne plus rater aucun client.",
    price: "700 000 FCFA",
    color: "emerald",
    hex: "#10b981",
    features: [
      "Site Internet Statique Pro",
      "Hébergement Web Haute Perf.",
      "1-5 Pages Conquérantes",
      "Nom de Domaine .com/.ai",
      "Fiko Commercial IA Basique",
      "Mini CRM Intégré",
      "Compte-Rendu Automatique",
      "Référencement SEO Basique",
      "Assistance 24h/24 Gardienne",
    ],
    story:
      "Votre empire s'étend. La base stable qui prépare votre ascension vers l'intelligence artificielle.",
  },
  MARS: {
    title: "Le Conquérant qui Domine Son Marché",
    description:
      "PORTE MARS est notre solution d'accélération pour PME qui savent que la croissance ne dépend plus de l'effort humain seul.",
    price: "1 900 000 FCFA",
    color: "red",
    hex: "#FF2718",
    features: [
      "Tout inclus Terra",
      "5-10 Pages Stratégiques",
      "Fiko Commercial IA Premium",
      "Tableau de Bord Dynamique",
      "Référencement Premium",
      "Assistance Prioritaire 24h/24",
      "Système Mailing Automatique",
      "Agent IA Métier Basique",
      "320% ROI (Performance)",
      "+45% Parts marché GAIN",
    ],
    story:
      "Chaque matin, vous découvrez que votre armée IA a conquis de nouveaux territoires pendant la nuit. Votre tableau de bord devient votre centre de commandement interstellaire.",
  },
  KRYPTON: {
    title: "Le Souverain dont la Légende Traverse les Systèmes",
    description:
      "PORTE KRYPTON est conçue pour les leaders qui veulent dominer leur marché sans aucune friction. Une IA commerciale sur mesure, intégrée à votre process métier.",
    price: "3 900 000 FCFA",
    color: "blue",
    hex: "#3b82f6",
    features: [
      "Tout inclus Mars",
      "5-30 Pages Souveraines",
      "Fiko Super Commercial IA",
      "Fiko Super Closer IA Premium",
      "Tableau de Bord Avancé",
      "Seoly Cocon Semantic SEO",
      "Trillion AI ADS Basique",
      "Assistance Prioritaire 24h/24",
      "Agent IA Métier Premium",
      "375% ROI",
      "Leader Secteur GAIN",
    ],
    story:
      "Vous n'êtes plus un simple mortel. Krypton fait de vous une légende vivante. Vos closers IA négocient comme des diplomates intergalactiques.",
  },
  GALAXY: {
    title: "L'Architecte de Civilisations Digitales",
    description:
      "PORTE GALAXY est l'ultime frontière. Un écosystème IA complet, développé sur mesure pour répondre aux défis les plus complexes de votre industrie.",
    price: "SUR DEVIS",
    color: "amber",
    hex: "#f59e0b",
    features: [
      "Développement Sur Mesure",
      "Application Web Avancée",
      "Application Mobile Native",
      "Architecture Évolutive",
      "Solutions Personnalisées",
      "Équipe Dédiée Krypton",
      "Support Illimité 24h/24",
      "Votre Vision, Notre Expertise",
      "∞ ROI",
      "Héritage GAIN",
    ],
    story:
      "Vous ne construisez plus un business, vous édifiez une civilisation. Galaxy est votre atelier d'ingénierie sociale. Votre héritage digital commence ici.",
  },
};

const GateOfferPage: React.FC<GateOfferPageProps> = ({
  gate,
  onNavigate,
  onOpenFiko,
  onOpenVocal,
}) => {
  const data = gateData[gate];
  const displayName = gate;

  return (
    <div className="bg-[#0B0B0F] text-white selection:bg-[#FF2718] selection:text-white">
      <div className="absolute inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>
      <div
        className="absolute top-0 left-0 w-[800px] h-[800px] blur-[200px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{ backgroundColor: `${data.hex}15` }}
      ></div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-40 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-2 border mb-8 text-[10px] font-black uppercase tracking-[0.5em]"
            style={{
              borderColor: data.hex,
              backgroundColor: `${data.hex}10`,
              color: data.hex,
            }}
          >
            PORTE {displayName}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white leading-[0.9]">
            {data.title.split(" ").slice(0, 3).join(" ")} <br />
            <span className="italic" style={{ color: data.hex }}>
              {data.title.split(" ").slice(3).join(" ")}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mt-8 text-xl lg:text-2xl text-slate-400 font-light italic leading-relaxed">
            {data.description}
          </p>
          <div className="mt-16 flex flex-col items-center gap-8">
            <p className="text-5xl font-black tracking-tighter text-white">
              {data.price}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenFiko(gate)}
                className="group text-white px-12 py-6 rounded-sm font-black text-xs transition-all uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-4 active:scale-95"
                style={{
                  backgroundColor: data.hex,
                  boxShadow: `0 25px 50px -12px ${data.hex}40`,
                }}
              >
                Activer {displayName} <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onOpenVocal(gate)}
                className="bg-white/5 border border-white/10 text-white px-10 py-6 rounded-sm font-black text-xs transition-all uppercase tracking-[0.4em] hover:bg-white/10 flex items-center justify-center gap-3"
              >
                Parler à un conseiller
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Storytelling Section */}
      <section className="py-32 px-6 bg-black/40 border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            Votre Vision.
          </h2>
          <p className="text-lg text-slate-400 italic">{data.story}</p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 text-center">
            Ce que vous obtenez
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.features.map((feature, i) => (
              <Feature key={i}>{feature}</Feature>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee & Final CTA */}
      <section className="py-40 px-6 text-center bg-black/40 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16">
            Garantie & Sécurité
          </h2>
          <div className="grid grid-cols-2 gap-8 mb-24">
            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
              <ShieldCheck style={{ color: data.hex }} size={24} /> Livraison
              encadrée
            </div>
            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
              <ShieldCheck style={{ color: data.hex }} size={24} /> Support
              technique
            </div>
            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
              <ShieldCheck style={{ color: data.hex }} size={24} /> Évolution IA
              possible
            </div>
            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
              <ShieldCheck style={{ color: data.hex }} size={24} />{" "}
              Infrastructure sécurisée
            </div>
          </div>

          <h2 className="text-6xl font-black uppercase tracking-tighter mb-6">
            Commencez aujourd’hui.
          </h2>
          <p className="text-xl text-slate-500 italic mb-12">
            Posez les bases de votre croissance digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onOpenFiko(gate)}
              className="group text-white px-12 py-6 rounded-sm font-black text-xs transition-all uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-4 active:scale-95"
              style={{
                backgroundColor: data.hex,
                boxShadow: `0 25px 50px -12px ${data.hex}40`,
              }}
            >
              Activer {displayName}
            </button>
            <button
              onClick={() => onNavigate(Page.PRICING)}
              className="bg-white/5 border border-white/10 text-white px-10 py-6 rounded-sm font-black text-xs transition-all uppercase tracking-[0.4em] hover:bg-white/10"
            >
              Voir les offres IA
            </button>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-white/5 text-center">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          Krypton AI une marque{" "}
          <a
            href="https://www.koffmann.group"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-[#FF2718] hover:underline"
          >
            KCG
          </a>
        </p>
      </footer>
    </div>
  );
};

export default GateOfferPage;
