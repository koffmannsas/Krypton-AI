import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  Target, 
  Zap, 
  ShieldCheck, 
  Network,
  Cpu,
  Layers,
  ArrowLeft
} from "lucide-react";
import { Page } from "../../types";
import { SEO_CLUSTERS, slugify } from "../../constants";

interface SEOPageProps {
  keyword: string;
  onNavigate: (p: Page) => void;
}

const SEOPage: React.FC<SEOPageProps> = ({ keyword, onNavigate }) => {
  // Find cluster for internal linking
  const cluster = SEO_CLUSTERS.find(c => 
    c.keywords.some(k => slugify(k) === slugify(keyword))
  );

  const displayKeyword = cluster?.keywords.find(k => slugify(k) === slugify(keyword)) || keyword;

  const handleLinkClick = (k: string) => {
    // We navigate to the SEO page with the new keyword
    // In App.tsx we need to ensure this works
    window.history.pushState({}, "", `/seo/${slugify(k)}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => onNavigate(Page.HOME)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 uppercase text-[10px] font-black tracking-widest"
        >
          <ArrowLeft size={14} /> Retour à l'accueil
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1px bg-[#FF2718]"></div>
            <span className="text-[#FF2718] uppercase text-[10px] font-black tracking-[0.5em]">
              Expertise IA & SEO
            </span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-tight mb-12">
            Spécialiste <br />
            <span className="text-[#FF2718] italic">"{displayKeyword}"</span>
          </h1>

          <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed mb-16 italic">
            Krypton AI redéfinit les standards du domaine <strong>{displayKeyword}</strong> en Afrique et dans le monde, en fusionnant intelligence artificielle générative et stratégies de croissance automatisées.
          </p>

          <button
            onClick={() => onNavigate(Page.AUTH)}
            className="bg-[#FF2718] text-white px-12 py-6 rounded-sm font-black text-sm uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-white hover:text-black transition-all group active:scale-95"
          >
            Démarrer mon projet IA
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 mb-32">
          {[
            {
              icon: <Zap className="text-[#FF2718]" size={24} />,
              title: "Performance Maximale",
              desc: `Nos solutions autour du ${displayKeyword} sont conçues pour une efficacité immédiate et mesurable.`
            },
            {
              icon: <ShieldCheck className="text-[#FF2718]" size={24} />,
              title: "Sécurité Native",
              desc: "Chaque déploiement intègre des protocoles de sécurité avancés pour protéger vos actifs numériques."
            },
            {
              icon: <Network className="text-[#FF2718]" size={24} />,
              title: "Connectivité Totale",
              desc: "Intégrez vos flux de travail existants dans un écosystème intelligent et réactif."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-10 border border-white/5 bg-white/[0.02] backdrop-blur-xl relative group"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed italic">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Maillage interne SEO */}
        <div className="pt-24 border-t border-white/5">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-12">
            Explorer d'autres solutions relatives à {cluster?.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cluster?.keywords
              .filter(k => slugify(k) !== slugify(keyword))
              .slice(0, 4)
              .map((k, i) => (
              <button
                key={i}
                onClick={() => handleLinkClick(k)}
                className="text-left py-4 px-6 border border-white/5 bg-white/[0.01] hover:bg-[#FF2718]/10 hover:border-[#FF2718]/30 transition-all group"
              >
                <span className="text-[10px] text-slate-500 group-hover:text-white font-bold uppercase tracking-widest block mb-1">
                  En savoir plus
                </span>
                <span className="text-xs font-black uppercase tracking-tighter truncate block">
                  {k}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-32 p-16 border border-[#FF2718]/20 bg-[#FF2718]/5 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2718]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <h2 className="text-3xl font-black uppercase mb-8 relative z-10">Krypton AI : La référence en {displayKeyword}</h2>
            <p className="text-slate-400 text-sm leading-loose max-w-3xl mx-auto mb-10 relative z-10 italic">
                Nous transformons les défis technologiques en opportunités de croissance. Que vous recherchiez une solution de <strong>{displayKeyword}</strong> ou une automatisation complète de vos processus, notre équipe d'experts IA vous accompagne de la stratégie au déploiement.
            </p>
            <button 
                onClick={() => onNavigate(Page.AUTH)}
                className="bg-white text-black px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-[0.3em] relative z-10 hover:bg-[#FF2718] hover:text-white transition-all shadow-2xl"
            >
                Obtenir une consultation gratuite
            </button>
        </div>
      </div>
    </div>
  );
};

export default SEOPage;
