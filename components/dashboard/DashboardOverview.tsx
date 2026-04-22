import React from "react";
import { 
  TrendingUp, 
  Users, 
  Layers, 
  Zap, 
  ArrowUpRight, 
  Sparkles, 
  Target,
  ChevronRight,
  ShieldCheck,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { UserProfile, Opportunity } from "../../types";
import BusinessImpactCard from "./BusinessImpactCard";
import OpportunityCard from "./OpportunityCard";

const MOCK_DATA = [
  { name: 'Lun', leads: 4 },
  { name: 'Mar', leads: 10 },
  { name: 'Mer', leads: 8 },
  { name: 'Jeu', leads: 15 },
  { name: 'Ven', leads: 12 },
  { name: 'Sam', leads: 20 },
  { name: 'Dim', leads: 18 },
];

interface OverviewProps {
  user: UserProfile;
  leadsCount: number;
  projectStatus: string;
  opportunities?: Opportunity[];
  onNavigate: (tab: string) => void;
  onOpportunityAction?: (opp: Opportunity) => void;
  onOpportunityDismiss?: (opp: Opportunity) => void;
}

export default function DashboardOverview({ 
  user, 
  leadsCount, 
  projectStatus, 
  opportunities = [],
  onNavigate,
  onOpportunityAction,
  onOpportunityDismiss
}: OverviewProps) {
  
  const score = user.onboardingStep || 85; 

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Centre de <span className="text-[#E10600]">Commandement</span>.</h1>
          <p className="text-slate-500 font-medium italic">Bonjour {user.firstName}, votre écosystème IA est opérationnel.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Live Services</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {opportunities.filter(o => o.status === 'open').length > 0 && (
          <div className="mb-8">
            <OpportunityCard 
              opportunity={opportunities.filter(o => o.status === 'open')[0]} 
              onAction={onOpportunityAction || (() => {})}
              onDismiss={onOpportunityDismiss || (() => {})}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl group hover:border-[#E10600]/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#E10600]/10 rounded-2xl text-[#E10600]">
              <Target size={24} />
            </div>
            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Score Fiko</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black tracking-tight">{score}/100</h3>
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl group hover:border-[#E10600]/30 transition-all cursor-pointer" onClick={() => onNavigate('leads')}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <Users size={24} />
            </div>
            <ArrowUpRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Leads Générés</p>
          <h3 className="text-3xl font-black tracking-tight">{leadsCount}</h3>
        </div>

        <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl group hover:border-[#E10600]/30 transition-all cursor-pointer" onClick={() => onNavigate('site')}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-fuchsia-500/10 rounded-2xl text-fuchsia-500">
              <Layers size={24} />
            </div>
            <ArrowUpRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Statut Projet</p>
          <h3 className="text-3xl font-black tracking-tight uppercase truncate">{projectStatus}</h3>
        </div>

        <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl group hover:border-[#E10600]/30 transition-all cursor-pointer" onClick={() => onNavigate('upgrade')}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
              <Zap size={24} />
            </div>
            <ArrowUpRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Plan Actuel</p>
          <h3 className="text-3xl font-black tracking-tight text-white/90">PILOT</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Column */}
        <div className="lg:col-span-2 space-y-6">
          <BusinessImpactCard score={score} />
          
          <div className="bg-[#111116] border border-white/5 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest">Activité Leads</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">7 derniers jours</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-[#E10600]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Génération</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E10600" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#E10600" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B0B0F', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#E10600" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorLeads)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Side Widgets */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#111116] border border-white/5 rounded-3xl p-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6">Actions Rapides</h3>
            <div className="space-y-3">
              <button onClick={() => onNavigate('agents')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-between group transition-all">
                <div className="flex items-center gap-3">
                  <Bot size={16} className="text-blue-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Activer Agent IA</span>
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-white" />
              </button>
              <button onClick={() => onNavigate('upgrade')} className="w-full p-4 bg-[#E10600]/10 hover:bg-[#E10600]/20 border border-[#E10600]/20 rounded-2xl flex items-center justify-between group transition-all">
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-[#E10600]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Upgrade Plan</span>
                </div>
                <ChevronRight size={14} className="text-[#E10600]" />
              </button>
              <button onClick={() => onNavigate('business')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-between group transition-all">
                <div className="flex items-center gap-3">
                  <TrendingUp size={16} className="text-green-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Voir Stratégie</span>
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
