import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Target, Zap, Bot, ArrowRight, Hexagon } from 'lucide-react';
import { getProgrammaticPage } from '../../utils/programmaticEngine';
import { Page } from '../../types';

interface ProgrammaticPageProps {
  onNavigate: (p: Page) => void;
}

const ProgrammaticPage: React.FC<ProgrammaticPageProps> = ({ onNavigate }) => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? getProgrammaticPage(slug) : undefined;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-black uppercase italic">Page introuvable</h1>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <div className="flex items-center gap-4 text-[#FF2718] font-black uppercase tracking-[0.3em] text-[10px] mb-8">
            <div className="w-12 h-[1px] bg-[#FF2718]"></div>
            Programmatic SEO Engine / {data.type.toUpperCase()}
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic mb-12">
            {data.h1.split(' ').map((word, i) => (
              <span key={i} className={word === data.context ? "text-[#FF2718]" : "text-white"}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-2xl text-slate-400 max-w-3xl font-light italic leading-relaxed">
            Krypton AI déploie pour vous les dernières innovations en intelligence artificielle 
            spécifiquement adaptées {data.type === 'city' ? `pour le marché de ${data.context}` : `pour le secteur : ${data.context}`}.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-40">
          {[
            { icon: <Bot />, title: "Automatisation", desc: "Qualification de prospects 24/7 sans intervention humaine." },
            { icon: <Target />, title: "Conversion", desc: "Interface adaptative basée sur le comportement du visiteur." },
            { icon: <Zap />, title: "Performance", desc: "Architecture neurale pour un temps de réponse instantané." }
          ].map((feature, i) => (
            <div key={i} className="p-10 bg-white/5 border border-white/5 hover:border-[#FF2718]/30 transition-all">
              <div className="text-[#FF2718] mb-6">{feature.icon}</div>
              <h3 className="text-xl font-black uppercase tracking-tight italic mb-4">{feature.title}</h3>
              <p className="text-slate-500 font-light italic leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-12 md:p-20 bg-[#0A0A0C] border border-[#FF2718]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Hexagon size={200} />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-8">
                Prêt à dominer <span className="text-[#FF2718]">{data.context}</span> ?
              </h2>
              <p className="text-slate-400 italic font-light mb-12 text-lg">
                Ne restez pas sur un site web statique des années 2010. 
                Passez à l'écosystème intelligent et multipliez vos conversions par 3 dès le premier mois.
              </p>
              <button 
                onClick={() => onNavigate(Page.FIKO_AUDIT)}
                className="bg-[#FF2718] text-white px-10 py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors flex items-center gap-4"
              >
                LANCER MON AUDIT IA AUTOMATISÉ <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[1, 2, 3, 4].map(n => (
                 <div key={n} className="aspect-square bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all">
                    <img src={`https://picsum.photos/seed/krypton-${n}/400/400`} alt="Preview" className="w-full h-full object-cover opacity-50" />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammaticPage;
