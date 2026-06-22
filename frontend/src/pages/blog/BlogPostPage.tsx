import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Hexagon } from 'lucide-react';
import { Page } from '../../types';
import { BLOG_POSTS } from '../../data/blogPosts';
import { getSmartInternalLinks, injectSeoLinks } from '../../utils/seoEngine';

interface BlogPostPageProps {
  onNavigate: (p: Page) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ onNavigate }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = useMemo(() => BLOG_POSTS.find(p => p.slug === slug), [slug]);
  
  const internalLinks = useMemo(() => {
    if (!post) return [];
    return getSmartInternalLinks(post, BLOG_POSTS);
  }, [post]);

  const contentWithLinks = useMemo(() => {
    if (!post) return '';
    return injectSeoLinks(post.content, internalLinks);
  }, [post, internalLinks]);

  if (!post) {
    return (
      <div className="pt-48 pb-24 text-center">
        <h1 className="text-4xl font-black mb-8">Article Introuvable.</h1>
        <button onClick={() => navigate('/blog')} className="text-[#FF2718] font-bold uppercase tracking-widest flex items-center gap-2 mx-auto hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Retour au blog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40">
      <div className="max-w-4xl mx-auto px-6">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/blog')} 
          className="group flex items-center gap-3 text-slate-500 hover:text-white transition-colors mb-12 uppercase text-[10px] font-black tracking-[0.3em]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Retour au blog
        </motion.button>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 text-[10px] font-black text-[#FF2718] uppercase tracking-[0.4em] mb-8">
            <span className="bg-[#FF2718]/10 px-3 py-1 border border-[#FF2718]/20">STRATÉGIE IA</span>
            <span className="text-slate-700">/</span>
            <span>DOMINATION MULTI-CANAL</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-12 italic">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-10 py-10 border-y border-white/5 mb-16 text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em]">
            <div className="flex items-center gap-3"><div className="size-8 rounded-full bg-[#FF2718]/10 flex items-center justify-center font-black text-[#FF2718] border border-[#FF2718]/20">K</div> {post.author}</div>
            <div className="flex items-center gap-2"><Calendar size={14} /> {post.date}</div>
            <div className="flex items-center gap-2"><Clock size={14} /> {post.readTime} de lecture</div>
            <button className="flex items-center gap-2 hover:text-[#FF2718] transition-colors ml-auto"><Share2 size={14} /> PARTAGER</button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-7xl mx-auto px-6 mb-24"
      >
        <div className="relative aspect-[21/9] overflow-hidden border border-white/5 shadow-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-invert prose-slate max-w-none prose-h2:text-[#FF2718] prose-p:text-slate-400 prose-p:text-xl prose-p:leading-relaxed prose-p:italic prose-p:font-light" dangerouslySetInnerHTML={{ __html: contentWithLinks }} />
        
        {internalLinks.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/5">
            <h3 className="text-xl font-black uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#FF2718]"></div>
              Neural Recommendations
            </h3>
            <div className="grid sm:grid-cols-2 gap-8">
              {internalLinks.map(l => (
                <button 
                  key={l.slug}
                  onClick={() => navigate(`/blog/${l.slug}`)}
                  className="group text-left p-8 bg-white/5 border border-white/5 hover:border-[#FF2718]/30 transition-all"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 group-hover:text-[#FF2718] transition-colors">{l.cluster}</p>
                  <h4 className="text-lg font-black uppercase tracking-tight leading-tight group-hover:translate-x-2 transition-transform">{l.title}</h4>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 p-12 bg-[#0A0A0C] border border-[#FF2718]/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Hexagon size={120} />
           </div>
           <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">VOTRE SITE EST-IL PRÊT POUR 2026 ?</h3>
           <p className="text-slate-400 mb-10 italic">Laissez FIKO™ analyser votre présence digitale actuelle et vous proposer une trajectoire de domination.</p>
           <button 
             onClick={() => onNavigate(Page.FIKO_AUDIT)}
             className="bg-[#FF2718] text-white px-8 py-4 rounded-sm font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black hover:text-[#FF2718] border border-[#FF2718] transition-all active:scale-95"
           >
             DÉMARRER L'AUDIT NEURAL
           </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
