import React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  ExternalLink,
  Flame,
  Coffee,
  Snowflake
} from "lucide-react";
import { FikoLead } from "../../types";

interface LeadsPanelProps {
  leads: FikoLead[];
}

export default function LeadsPanel({ leads }: LeadsPanelProps) {
  const hotLeads = leads.filter(l => l.qualification === 'hot');
  const warmLeads = leads.filter(l => l.qualification === 'warm');
  const coldLeads = leads.filter(l => l.qualification === 'cold');

  const getQualIcon = (qual: string) => {
    switch (qual) {
      case 'hot': return <Flame size={14} className="text-orange-500" />;
      case 'warm': return <Coffee size={14} className="text-yellow-500" />;
      default: return <Snowflake size={14} className="text-blue-400" />;
    }
  };

  const getQualLabel = (qual: string) => {
    switch (qual) {
      case 'hot': return 'CHAUD';
      case 'warm': return 'TIÈDE';
      default: return 'FROID';
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Leads & <span className="text-[#E10600]">Conversion</span>.</h2>
          <p className="text-slate-500 italic mt-1 uppercase text-[10px] tracking-widest font-bold">Base de données qualifiée en temps réel</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            <Download size={14} /> Exporter CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Total Leads</p>
          <div className="flex items-center gap-3">
            <Users size={20} className="text-white" />
            <h3 className="text-3xl font-black italic">{leads.length}</h3>
          </div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2 font-bold italic">Chaud (Prio)</p>
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-orange-500" />
            <h3 className="text-3xl font-black italic text-orange-500">{hotLeads.length}</h3>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2 font-bold italic">Tiède</p>
          <div className="flex items-center gap-3">
            <Coffee size={20} className="text-yellow-500" />
            <h3 className="text-3xl font-black italic text-yellow-500">{warmLeads.length}</h3>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 font-bold italic">Froid</p>
          <div className="flex items-center gap-3">
            <Snowflake size={20} className="text-blue-400" />
            <h3 className="text-3xl font-black italic text-blue-400">{coldLeads.length}</h3>
          </div>
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="bg-[#111116] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher un lead par email..." 
              className="w-full bg-black/50 border border-white/5 py-3 pl-12 pr-4 rounded-xl text-xs outline-none focus:border-[#E10600]/30 transition-all font-medium"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Qualification</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Contact / Email</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Score Fiko</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.length > 0 ? leads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-white/[0.02] transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {getQualIcon(lead.qualification)}
                      <span className={`text-[10px] font-black tracking-widest ${
                        lead.qualification === 'hot' ? 'text-orange-500' : lead.qualification === 'warm' ? 'text-yellow-500' : 'text-blue-400'
                      }`}>
                        {getQualLabel(lead.qualification)}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-white mb-0.5">{lead.email}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{lead.source}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#E10600]" style={{ width: `${lead.score}%` }}></div>
                      </div>
                      <span className="text-xs font-black italic">{lead.score}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 bg-white/5 hover:bg-[#E10600] text-slate-400 hover:text-white rounded-xl transition-all">
                      <Mail size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <Users className="mx-auto text-slate-800 mb-4" size={48} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Aucun lead détecté pour le moment.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
