import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Page } from '../../types';
import { BLOG_POSTS } from '../../data/blogPosts';

interface BlogGridPageProps {
  onNavigate: (p: Page, state?: any) => void;
}

const BlogGridPage: React.FC<BlogGridPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8">
          Neural <span className="text-[#FF2718]">Insights.</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light italic">
          Analyses de marché, stratégies d'IA et futurologie commerciale.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {BLOG_POSTS.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
            onClick={() => window.location.href = `/blog/${post.slug}`}
          >
            <div className="relative aspect-video overflow-hidden border border-white/10 mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 flex gap-4 text-[10px] font-black uppercase tracking-widest text-[#FF2718]">
                <span className="flex items-center gap-2 bg-black/60 px-3 py-1 backdrop-blur-md border border-[#FF2718]/30">
                  <Calendar size={12} /> {post.date}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-[#FF2718] transition-colors leading-tight">
              {post.title}
            </h2>
            <p className="text-slate-400 line-clamp-3 mb-8 italic font-light">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-6 text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em]">
                <span className="flex items-center gap-2"><User size={12} /> {post.author}</span>
                <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
              </div>
              <ArrowRight className="text-[#FF2718] group-hover:translate-x-2 transition-transform" size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogGridPage;
