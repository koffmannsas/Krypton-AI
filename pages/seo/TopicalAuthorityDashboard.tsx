import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Layers, AlertCircle, CheckCircle2, TrendingUp, Hexagon, Plus, Search, Share2, ExternalLink, Activity, Zap, Bot } from 'lucide-react';
import { TOPICS } from '../../data/topics';
import { BLOG_POSTS } from '../../data/blogPosts';
import { calculateTopicCoverage, detectIntent } from '../../utils/topicEngine';
import { prepareDistributionTasks, getSimulatedAuthority } from '../../utils/backlinkManager';
import { generateDiscoverTitles, getDiscoverScore } from '../../utils/discoverEngine';
import { humanizeContent, applyHumanStructure } from '../../utils/humanizer';
import { BacklinkTask } from '../../types';

const TopicalAuthorityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topics' | 'backlinks' | 'discover' | 'humanizer'>('topics');
  const authority = getSimulatedAuthority(BLOG_POSTS.length);
  const distributionTasks = BLOG_POSTS.flatMap(p => prepareDistributionTasks(p)).slice(0, 8);

  // Humanizer simulation state
  const [humanizerInput, setHumanizerInput] = useState("Un site web intelligent permet d'automatiser l'acquisition de clients et d'améliorer le ROI.");
  const [humanizedOutput, setHumanizedOutput] = useState("");

  const handleHumanize = () => {
    setHumanizedOutput(humanizeContent(humanizerInput));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic flex items-center gap-4">
            <Hexagon className="text-[#FF2718]" />
            Neural <span className="text-[#FF2718]">SEO Engine</span>
          </h2>
          <p className="text-slate-500 font-medium uppercase text-[10px] tracking-[0.3em] mt-2">
            Topical Authority & Neural Backlink Distribution
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-sm">
            <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Domain Rating</p>
            <p className="text-2xl font-black italic">{authority.score}<span className="text-sm text-[#FF2718]">/100</span></p>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-sm">
            <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Total Backlinks</p>
            <p className="text-2xl font-black italic">{authority.totalBacklinks}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-8 mb-12 border-b border-white/5">
        {[
          { id: 'topics', label: 'Topical Authority', icon: <Target size={16} /> },
          { id: 'backlinks', label: 'Backlink Distribution', icon: <Share2 size={16} /> },
          { id: 'discover', label: 'Google Discover', icon: <Zap size={16} /> },
          { id: 'humanizer', label: 'AI Humanizer', icon: <Bot size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-[#FF2718]' : 'text-slate-500 hover:text-white'}`}
          >
            {tab.icon} {tab.label}
            {activeTab === tab.id && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF2718]" />}
          </button>
        ))}
      </div>

      {activeTab === 'topics' ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {TOPICS.map(topic => {
            const stats = calculateTopicCoverage(topic, BLOG_POSTS);
          
            return (
              <motion.div 
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0A0A0C] border border-white/5 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Target size={120} />
                </div>

                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black uppercase tracking-tight italic">{topic.topic}</h3>
                      {topic.pillar && <span className="text-[8px] bg-[#FF2718]/10 text-[#FF2718] border border-[#FF2718]/20 px-2 py-0.5 font-bold uppercase tracking-widest">PILLAR</span>}
                    </div>
                    <div className="flex gap-2">
                      {topic.keywords.slice(0, 3).map(k => (
                        <span key={k} className="text-[9px] text-slate-500 uppercase font-bold border border-white/10 px-2 py-1 italic tracking-widest">#{k}</span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Authority Score</p>
                    <p className={`text-4xl font-black italic ${stats.score > 80 ? 'text-[#FF2718]' : 'text-white'}`}>
                      {Math.round(stats.score)}%
                    </p>
                  </div>
                </div>

                <div className="mb-10 relative z-10">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] text-slate-500 uppercase font-black">Couverture Thématique</p>
                    <p className="text-[10px] font-black">{Math.round(stats.coverage)}%</p>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.coverage}%` }}
                      className="h-full bg-[#FF2718]"
                    ></motion.div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF2718] mb-4 flex items-center gap-2">
                      <CheckCircle2 size={12} /> Couvert ({topic.clusters.length - stats.missing.length})
                    </h4>
                    <div className="space-y-3">
                      {topic.clusters.filter(c => !stats.missing.includes(c)).map(c => (
                        <div key={c} className="text-[11px] font-medium text-slate-400 flex items-start gap-2 italic">
                          <span className="text-[#FF2718]">•</span> {c}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                      <AlertCircle size={12} /> Manquant ({stats.missing.length})
                    </h4>
                    <div className="space-y-3">
                      {stats.missing.map(c => (
                        <div key={c} className="group flex items-center justify-between p-3 bg-white/5 border border-dashed border-white/10 hover:border-[#FF2718]/30 transition-all cursor-pointer">
                          <div className="text-[10px] font-bold uppercase tracking-tight text-slate-300 italic truncate max-w-[150px]">{c}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-sm">{detectIntent(c)}</span>
                            <Plus size={14} className="text-[#FF2718] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-10">
                  <div className="flex items-center gap-3 text-slate-500">
                    <TrendingUp size={18} className="text-[#FF2718]" />
                    <div className="text-[10px] font-bold uppercase tracking-widest">Croissance: +14% <span className="text-[8px]">vs mois dernier</span></div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Search size={18} className="text-[#FF2718]" />
                    <div className="text-[10px] font-bold uppercase tracking-widest">Reach: ~4.2k <span className="text-[8px]">impressions/m</span></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : activeTab === 'backlinks' ? (
        <div className="grid gap-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0A0A0C] border border-white/5 p-6">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Refering Domains</p>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-black italic">{authority.referringDomains}</p>
                <p className="text-[10px] text-[#FF2718] font-bold pb-1 flex items-center gap-1">
                  <TrendingUp size={12} /> +4 this week
                </p>
              </div>
            </div>
            <div className="bg-[#0A0A0C] border border-white/5 p-6">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Active Tasks</p>
              <p className="text-3xl font-black italic">{distributionTasks.filter(t => t.status === 'pending').length}</p>
            </div>
            <div className="bg-[#0A0A0C] border border-white/5 p-6">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Crawl Status</p>
              <div className="flex items-center gap-2 text-[#00FF88] font-black italic text-xl">
                <Activity size={20} /> ON TRACK
              </div>
            </div>
          </div>

          <div className="bg-[#0A0A0C] border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
                <Share2 size={16} className="text-[#FF2718]" />
                Backlink Distribution Pipeline
              </h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] uppercase font-black text-slate-500 border-b border-white/5">
                  <th className="px-6 py-4">Platform</th>
                  <th className="px-6 py-4">Draft Variant</th>
                  <th className="px-6 py-4">Target Path</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {distributionTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black uppercase text-white">{task.platform}</span>
                    </td>
                    <td className="px-6 py-4 max-w-[300px]">
                      <span className="text-[11px] text-slate-400 italic italic line-clamp-1">{task.variantTitle}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] text-[#FF2718] font-mono">{task.targetUrl}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[8px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 font-black uppercase tracking-widest">
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <button className="text-slate-500 hover:text-[#FF2718] transition-colors"><ExternalLink size={14} /></button>
                        <button className="text-slate-500 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest">PUBLISH</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'humanizer' ? (
        <div className="grid gap-8">
          <div className="bg-[#0A0A0C] border border-white/5 p-8">
            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3">
              <Bot className="text-[#FF2718]" /> 
              AI Content Humanizer & Quality Booster
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">IA Classique (Input)</label>
                  <textarea 
                    value={humanizerInput}
                    onChange={(e) => setHumanizerInput(e.target.value)}
                    className="w-full h-40 bg-black border border-white/10 p-6 text-sm text-slate-400 italic focus:border-[#FF2718]/50 transition-all outline-none"
                    placeholder="Collez votre contenu IA ici..."
                  />
                </div>
                <button 
                  onClick={handleHumanize}
                  className="w-full bg-[#FF2718] text-white py-4 font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-colors"
                >
                  🚀 HUMANIZER LE CONTENU
                </button>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase text-[#FF2718] mb-2 block">Version Humanisée (Output)</label>
                <div className="w-full h-auto min-h-[160px] bg-white/[0.02] border border-white/10 p-6 text-sm text-white italic leading-relaxed whitespace-pre-wrap">
                  {humanizedOutput || "Le résultat s'affichera ici..."}
                </div>
                
                {humanizedOutput && (
                  <div className="p-4 bg-[#FF2718]/5 border border-[#FF2718]/20 rounded-sm">
                    <p className="text-[10px] font-black uppercase text-[#FF2718] mb-2">Analyse de Qualité</p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-300">
                        <CheckCircle2 size={12} className="text-[#FF2718]" /> Rythme Optimisé
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-300">
                        <CheckCircle2 size={12} className="text-[#FF2718]" /> Ton Conversationnel
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-300">
                        <CheckCircle2 size={12} className="text-[#FF2718]" /> Projection Client
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Structure Stratégique Automatisée</h4>
              <div className="grid md:grid-cols-5 gap-4">
                {['HOOK', 'PROBLÈME', 'RÉALITÉ', 'SOLUTION', 'PROJECTION'].map((step, i) => (
                  <div key={step} className="p-4 bg-white/5 border border-white/5 text-center relative overflow-hidden group hover:border-[#FF2718]/30 transition-all">
                    <span className="absolute -left-2 -top-2 text-2xl font-black text-white/5 group-hover:text-[#FF2718]/10 transition-colors">{i+1}</span>
                    <p className="text-[9px] font-black uppercase tracking-widest relative z-10">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="bg-[#0A0A0C] border border-white/5 p-8">
            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3">
              <Zap className="text-[#FF2718]" /> 
              Magnetic Discover Titles Generator
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                {TOPICS.slice(0, 3).map(topic => (
                  <div key={topic.id} className="p-6 bg-white/[0.02] border border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">{topic.topic}</h4>
                    <div className="space-y-4">
                      {generateDiscoverTitles(topic.topic).slice(0, 3).map((title, i) => {
                        const score = getDiscoverScore(title);
                        return (
                          <div key={i} className="group p-4 bg-black border border-white/5 hover:border-[#FF2718]/30 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-sm font-bold italic leading-tight group-hover:text-[#FF2718] transition-colors">{title}</p>
                              <span className={`text-[8px] font-black px-1.5 py-0.5 ${score > 70 ? 'bg-[#FF2718] text-white' : 'bg-slate-800 text-slate-400'}`}>
                                {score}% CTR
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-white">Copy</button>
                              <button className="text-[8px] font-black uppercase tracking-widest text-[#FF2718]">Auto-Publish</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black border border-[#FF2718]/20 p-8">
                <h4 className="text-sm font-black uppercase tracking-widest text-[#FF2718] mb-6 flex items-center gap-2">
                  <Activity size={16} /> Discover Performance Insights
                </h4>
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-sm">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Image Preview Status</p>
                    <p className="text-xs font-bold text-[#00FF88]">MAX-IMAGE-PREVIEW: LARGE (ENABLED)</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-sm">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Average CTR (Discover)</p>
                    <p className="text-3xl font-black italic">8.4%</p>
                   </div>
                  <ul className="space-y-4 pt-4 border-t border-white/5">
                    <li className="text-[10px] font-medium text-slate-400 flex items-start gap-2 italic">
                       <span className="text-[#FF2718]">•</span> Les titres avec "2026" performent 40% mieux cette semaine.
                    </li>
                    <li className="text-[10px] font-medium text-slate-400 flex items-start gap-2 italic">
                       <span className="text-[#FF2718]">•</span> Pic de trafic détecté sur le topic "Agent IA" entre 18h et 21h.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicalAuthorityDashboard;
