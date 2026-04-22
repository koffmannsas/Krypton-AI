import React, { useState } from "react";
import { 
  Bot, 
  Zap, 
  Activity, 
  Search, 
  MessageSquare, 
  ShoppingBag, 
  ChevronRight,
  Target,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

const AGENTS = [
  { id: 'sales', name: 'Agent Commercial (Fiko)', category: 'Sales CLOSER', icon:ShoppingBag, color: 'text-[#E10600]', active: true, perf: '92%' },
  { id: 'support', name: 'Agent Support', category: 'Customer Care', icon:MessageSquare, color: 'text-blue-400', active: true, perf: '98%' },
  { id: 'leadgen', name: 'Agent Lead Gen', category: 'Prospecting', icon:Search, color: 'text-green-400', active: false, perf: '--' },
  { id: 'marketing', name: 'Agent Marketing', category: 'Campaigns', icon:Zap, color: 'text-orange-400', active: false, perf: '--' },
];

export default function AgentsPanel() {
  const [activeAgents, setActiveAgents] = useState(AGENTS.map(a => a.id).filter(id => AGENTS.find(a => a.id === id)?.active));

  const toggleAgent = (id: string) => {
    setActiveAgents(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Mes Agents <span className="text-fuchsia-500">IA</span>.</h2>
          <p className="text-slate-500 italic mt-1 uppercase text-[10px] tracking-widest font-bold">Gestion des unités stratégiques autonomes</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full text-fuchsia-500 text-[10px] font-black uppercase tracking-widest">
            {activeAgents.length} Agents Actifs
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AGENTS.map((agent) => {
          const isActive = activeAgents.includes(agent.id);
          return (
            <div key={agent.id} className={`bg-[#111116] border rounded-3xl p-8 transition-all relative overflow-hidden group ${
              isActive ? "border-fuchsia-500/30" : "border-white/5 opacity-60"
            }`}>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`p-4 rounded-2xl ${isActive ? "bg-fuchsia-500/10" : "bg-white/5"} transition-all`}>
                  <agent.icon size={28} className={isActive ? "text-fuchsia-500" : "text-slate-600"} />
                </div>
                
                <div 
                  onClick={() => toggleAgent(agent.id)}
                  className={`w-14 h-8 rounded-full cursor-pointer p-1 transition-all ${isActive ? "bg-fuchsia-500" : "bg-white/10"}`}
                >
                  <motion.div 
                    initial={false}
                    animate={{ x: isActive ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 h-6 bg-white rounded-full shadow-lg"
                  />
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{agent.category}</p>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-6">{agent.name}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Performance</p>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={14} className="text-fuchsia-500" />
                      <span className="text-lg font-black">{agent.perf}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Statut</p>
                    <div className="flex items-center gap-2">
                       <Activity size={14} className={isActive ? "text-green-500 animate-pulse" : "text-slate-600"} />
                       <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-green-500" : "text-slate-600"}`}>
                        {isActive ? "Actif" : "Standby"}
                       </span>
                    </div>
                  </div>
                </div>
                
                <button className="mt-8 w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group/btn">
                  <span className="text-[10px] font-black uppercase tracking-widest">Voir logs de décision</span>
                  <ChevronRight size={16} className="text-slate-600 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* Decorative Glow */}
              {isActive && (
                <div className="absolute -bottom-20 -right-20 size-40 bg-fuchsia-500/10 blur-[60px] rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 p-8 rounded-3xl flex items-center gap-6">
        <Target size={32} className="text-fuchsia-500 animate-bounce" />
        <div>
          <h4 className="text-lg font-black uppercase tracking-tight text-fuchsia-500">Besoin d'IA sur Mesure ?</h4>
          <p className="text-sm text-fuchsia-500/60 font-medium italic">
            "Krypton peut concevoir un agent spécialisé pour vos besoins métier spécifiques. Contactez notre ingénieur prompt."
          </p>
        </div>
        <button className="ml-auto px-6 py-3 bg-fuchsia-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-fuchsia-600 transition-all">
          Commander une IA
        </button>
      </div>
    </div>
  );
}
