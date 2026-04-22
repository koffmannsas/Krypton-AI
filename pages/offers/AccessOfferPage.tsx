import React from "react";
import { Page } from "../../types";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Users,
  Briefcase,
  Building,
  Sparkles,
} from "lucide-react";

interface AccessOfferPageProps {
  onNavigate: (p: Page) => void;
  onOpenFiko: (gate: string) => void;
  onOpenVocal: () => void;
}

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-4">
    <CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
    <span className="text-lg text-slate-300 font-medium">{children}</span>
  </div>
);

const AccessOfferPage: React.FC<AccessOfferPageProps> = ({
  onNavigate,
  onOpenFiko,
  onOpenVocal,
}) => {
  return (
    <div className="bg-[#0B0B0F] text-white selection:bg-[#a855f7]">
      <div className="absolute inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-900/10 blur-[200px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-40 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase text-white">
            Votre entreprise mérite une <br />
            présence digitale{" "}
            <span className="text-purple-400 italic">
              digne de son ambition.
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mt-8 text-xl lg:text-2xl text-slate-400 font-light italic leading-relaxed">
            🎯 PORTE ACCESS est la solution stratégique pour lancer un site web
            professionnel, performant et évolutif — sans complexité
            technologique.
          </p>
          <div className="mt-16 flex flex-col items-center gap-8">
            <p className="text-5xl font-black tracking-tighter text-white">
              200 000 FCFA{" "}
              <span className="text-2xl text-slate-500 font-medium tracking-normal">
                – Licence 12 mois
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenFiko("ACCESS")}
                className="group bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 rounded-sm font-black text-xs transition-all uppercase tracking-[0.4em] shadow-2xl shadow-purple-500/20 flex items-center justify-center gap-4 active:scale-95"
              >
                Démarrer avec ACCESS <ArrowRight size={16} />
              </button>
              <button
                onClick={onOpenVocal}
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
            Vous êtes dirigeant.
          </h2>
          <p className="text-lg text-slate-400 italic">
            Vous savez que votre entreprise doit exister en ligne. Mais vous ne
            voulez pas :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white/5 border border-white/10 flex items-center gap-4">
              <XCircle size={20} className="text-red-500/70 flex-shrink-0" />{" "}
              <span className="text-sm font-medium uppercase tracking-wider">
                Perdre du temps
              </span>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 flex items-center gap-4">
              <XCircle size={20} className="text-red-500/70 flex-shrink-0" />{" "}
              <span className="text-sm font-medium uppercase tracking-wider">
                Dépenser des millions
              </span>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 flex items-center gap-4">
              <XCircle size={20} className="text-red-500/70 flex-shrink-0" />{" "}
              <span className="text-sm font-medium uppercase tracking-wider">
                Confier votre image
              </span>
            </div>
          </div>
          <p className="text-lg text-slate-400 italic">
            Vous voulez : une base solide. Professionnelle. Évolutive.
          </p>
          <h3 className="text-3xl font-black uppercase tracking-tight text-purple-400 pt-6">
            ACCESS est cette base.
          </h3>
        </div>
      </section>

      {/* What you get & Strategic Positioning */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Ce que vous obtenez
            </h2>
            <div className="space-y-6">
              <Feature>Site web professionnel (5 pages stratégiques)</Feature>
              <Feature>Design premium responsive & mobile</Feature>
              <Feature>Formulaire de contact intégré</Feature>
              <Feature>SEO de base</Feature>
              <Feature>Hébergement configuré</Feature>
              <Feature>Infrastructure prête pour l’IA</Feature>
            </div>
          </div>
          <div className="bg-[#1A1A1F] border border-white/10 p-12 rounded-sm space-y-12 shadow-2xl">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-purple-400">
              Positionnement Stratégique
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed italic">
              ACCESS n’est pas une offre “basique”. C’est une{" "}
              <strong>fondation digitale prête à évoluer.</strong> Demain, vous
              pourrez activer :
            </p>
            <div className="space-y-6 pt-8 border-t border-white/10">
              <div className="space-y-3">
                <div className="p-4 bg-black/40 border border-white/5 flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span>FIKO – Agent commercial IA</span>{" "}
                  <span className="text-slate-500">500K FCFA</span>
                </div>
                <div className="p-4 bg-black/40 border border-white/5 flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span>Agent IA Sectoriel</span>{" "}
                  <span className="text-slate-500">500K FCFA</span>
                </div>
                <div className="p-4 bg-black/40 border border-white/5 flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span>FIKO Voice</span>{" "}
                  <span className="text-slate-500">dès 700K FCFA</span>
                </div>
              </div>
              <p className="text-center text-xs text-slate-600 italic pt-4">
                ...sans reconstruire votre site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-32 px-6 bg-black/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-16">
            Comparaison intelligente
          </h2>
          <div className="border border-white/10 rounded-sm overflow-hidden">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-white/5 text-sm font-black uppercase tracking-widest">
                  <th className="p-6"></th>
                  <th className="p-6 border-l border-white/10 text-purple-400">
                    ACCESS
                  </th>
                  <th className="p-6 border-l border-white/10 text-[#E10600]">
                    Offres IA
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Présence professionnelle",
                    access: true,
                    ia: true,
                  },
                  { feature: "Agent IA", access: false, ia: true },
                  {
                    feature: "Performance automatisée",
                    access: false,
                    ia: true,
                  },
                  { feature: "Voice IA", access: false, ia: true },
                ].map((item, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="p-6 text-left text-sm font-black uppercase tracking-widest">
                      {item.feature}
                    </td>
                    <td className="p-6 border-l border-white/10">
                      {item.access ? (
                        <CheckCircle2 className="mx-auto text-emerald-500" />
                      ) : (
                        <XCircle className="mx-auto text-red-500/50" />
                      )}
                    </td>
                    <td className="p-6 border-l border-white/10">
                      {item.ia ? (
                        <CheckCircle2 className="mx-auto text-emerald-500" />
                      ) : (
                        <XCircle className="mx-auto text-red-500/50" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-12 text-center text-lg text-slate-500 italic">
            Vous commencez simple. Vous évoluez quand vous êtes prêt.
          </p>
        </div>
      </section>

      {/* Guarantee & Final CTA */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16">
            Garantie & Sécurité
          </h2>
          <div className="grid grid-cols-2 gap-8 mb-24">
            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
              <ShieldCheck className="text-purple-400" size={24} /> Livraison
              encadrée
            </div>
            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
              <ShieldCheck className="text-purple-400" size={24} /> Support
              technique
            </div>
            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
              <ShieldCheck className="text-purple-400" size={24} /> Évolution IA
              possible
            </div>
            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
              <ShieldCheck className="text-purple-400" size={24} />{" "}
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
              onClick={() => onOpenFiko("ACCESS")}
              className="group bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 rounded-sm font-black text-xs transition-all uppercase tracking-[0.4em] shadow-2xl shadow-purple-500/20 flex items-center justify-center gap-4 active:scale-95"
            >
              Activer ACCESS – 200 000 FCFA
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
            className="font-black text-[#E10600] hover:underline"
          >
            KCG
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AccessOfferPage;
