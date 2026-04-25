import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Zap, Bot, BarChart3, ShieldCheck, Hexagon } from 'lucide-react';
import { Topic, Page } from '../../types';
import { BLOG_POSTS } from '../../data/blogPosts';
import { TOPICS } from '../../data/topics';

interface TopicalPillarPageProps {
  topicId: string;
  onNavigate: (p: Page) => void;
}

const TopicalPillarPage: React.FC<TopicalPillarPageProps> = ({ topicId, onNavigate }) => {
  const navigate = useNavigate();
  const topic = TOPICS.find(t => t.id === topicId);
  
  if (!topic) return null;

  // Filter blog posts related to this topic
  const relatedPosts = BLOG_POSTS.filter(p => p.cluster === topic.id || topic.clusters.includes(p.title));

  return (
    <div className="pt-32 pb-40">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="size-20 rounded-full bg-[#FF2718]/10 flex items-center justify-center border border-[#FF2718]/20 text-[#FF2718] animate-pulse">
              <Hexagon size={40} />
            </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic mb-8">
            {topic.topic.split(' ').map((word, i) => (
              <span key={i} className={i === topic.topic.split(' ').length - 1 ? "text-[#FF2718]" : "text-white"}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light italic leading-relaxed">
            Dominez votre marché avec notre expertise en {topic.topic}. 
            Une architecture conçue pour la performance absolue et la conversion chirurgicale.
          </p>
        </motion.div>
      </div>

      {/* Grid of Clusters / Features */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-40">
        {topic.clusters.slice(0, 6).map((cluster, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-10 bg-white/5 border border-white/5 hover:border-[#FF2718]/30 transition-all relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 text-[#FF2718]/5 group-hover:text-[#FF2718]/10 transition-colors">
               <Globe size={120} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-6 italic relative z-10 group-hover:text-[#FF2718] transition-colors">{cluster}</h3>
            <p className="text-slate-500 text-sm italic font-light relative z-10 mb-8">
              Exploitez la puissance de l'IA pour transformer chaque interaction en opportunité de croissance.
            </p>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF2718] hover:gap-4 transition-all relative z-10">
              Découvrir la solution <ArrowRight size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Authority Content Section */}
      <div className="bg-[#0A0A0C] py-32 border-y border-white/5 mb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-10 leading-none">
                POURQUOI NOUS SOMMES LES <span className="text-[#FF2718]">EXPERTS</span> DU SUJET.
              </h2>
              <div className="space-y-8">
                {[
                  { icon: <Zap size={20} />, title: "PERFORMANCE NEURALE", desc: "Algorithmes de pointe pour une rapidité de traitement inégalée." },
                  { icon: <Bot size={20} />, title: "IA PROPRIÉTAIRE", desc: "Nous ne recyclons pas, nous créons des modèles sur-mesure pour votre business." },
                  { icon: <BarChart3 size={20} />, title: "ROI MESURABLE", desc: "Chaque action est tracée, analysée et optimisée pour votre chiffre d'affaires." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-[#FF2718] mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest text-[#FF2718] text-xs mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-sm italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-[#FF2718]/10 animate-pulse rounded-full filter blur-3xl"></div>
              <div className="relative z-10 border border-[#FF2718]/20 bg-black/40 backdrop-blur-3xl p-12 h-full flex flex-col justify-center">
                <ShieldCheck className="text-[#FF2718] mb-8" size={60} />
                <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-6">CERTIFIÉ KRYPTON LABS</h3>
                <p className="text-slate-400 italic font-light mb-10 leading-relaxed">
                  Toutes nos solutions de {topic.topic} subissent des tests de charge et d'efficacité réguliers pour garantir une supériorité technologique constante face à vos concurrents.
                </p>
                <button 
                  onClick={() => onNavigate(Page.FIKO_AUDIT)}
                  className="bg-[#FF2718] text-white py-4 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-colors"
                >
                  LANCER L'AUDIT STRATÉGIQUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blog Posts (Semantic Mesh) */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-black uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
            <div className="w-8 h-[1px] bg-[#FF2718]"></div>
            Articles & Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {relatedPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden border border-white/10 mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-black uppercase tracking-widest text-xs border border-white px-6 py-2 italic">Lire l'article</span>
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-[#FF2718] transition-colors">{post.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicalPillarPage;
