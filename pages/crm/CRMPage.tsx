import React, { useState } from "react";
import { LEADS } from "../../constants";
import { BuyingWindow, LTVClass, Page } from "../../types";
import {
  TrendingUp,
  CheckSquare,
  Square,
  Brain,
  Clock,
  VenetianMask,
  Target,
  Zap,
  Filter,
  MoreVertical,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

interface CRMPageProps {
  onNavigate: (p: Page) => void;
}

const CRMPage: React.FC<CRMPageProps> = ({ onNavigate }) => {
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  const toggleLeadSelection = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const getPriorityAction = (score: number) => {
    if (score >= 85)
      return {
        label: "ACCÉLÉRATION_FLASH",
        color: "text-white bg-[#FF2718]",
        border: "border-[#FF2718]",
      };
    if (score >= 75)
      return {
        label: "CLOSING_ML",
        color: "text-[#FF2718]",
        border: "border-[#FF2718]/30",
      };
    if (score >= 60)
      return {
        label: "DIAGNOSTIC_EXPERT",
        color: "text-blue-500",
        border: "border-blue-500/30",
      };
    if (score >= 40)
      return {
        label: "NURTURING_AUTO",
        color: "text-slate-500",
        border: "border-slate-800",
      };
    return {
      label: "FILTRAGE_NEURAL",
      color: "text-slate-700",
      border: "border-slate-900",
    };
  };

  const getMomentStyles = (moment: BuyingWindow) => {
    switch (moment) {
      case BuyingWindow.NOW:
        return "text-red-500 bg-red-500/10 border-red-500/40 animate-pulse";
      case BuyingWindow.H24:
        return "text-orange-500 bg-orange-500/10 border-orange-500/40";
      case BuyingWindow.H72:
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/40";
      default:
        return "text-slate-500 bg-white/5 border-white/10";
    }
  };

  const getLTVStyles = (ltv: LTVClass | undefined) => {
    switch (ltv) {
      case LTVClass.PLATINUM:
        return "text-[#FF2718] border-[#FF2718]/30 bg-[#FF2718]/5";
      case LTVClass.GOLD:
        return "text-orange-400 border-orange-400/30 bg-orange-400/5";
      default:
        return "text-slate-500 border-white/10 bg-white/5";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-[#FF2718] rounded-full animate-pulse"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2718]">
              ML Prediction Active (Vertex AI)
            </p>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
            Cœur Neural <br />
            <span className="text-[#FF2718]">CRM.</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-slate-500">
            Analyse de Cohorte
          </button>
          <button className="bg-[#FF2718] hover:bg-red-700 text-white px-10 py-5 text-[10px] font-black uppercase tracking-widest rounded-sm shadow-xl shadow-red-500/20 transition-all flex items-center gap-4">
            <TrendingUp size={16} /> Export CEO Insights
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            label: "Indice Priorité ML",
            val: "84.2",
            delta: "+12%",
            icon: <Target className="text-[#FF2718]" />,
          },
          {
            label: "Confiance Closing",
            val: "94%",
            delta: "Vertex 4.2",
            icon: <Brain className="text-[#FF2718]" />,
          },
          {
            label: "Leads Platinum",
            val: "08",
            delta: "Opportunité",
            icon: <DollarSign className="text-emerald-500" />,
          },
          {
            label: "Interceptions NOW",
            val: "12",
            delta: "Aujourd'hui",
            icon: <Clock className="text-red-500" />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#1A1A1F] p-8 border border-white/5 rounded-sm relative group hover:border-[#FF2718]/30 transition-all shadow-xl"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                {stat.label}
              </span>
              {stat.icon}
            </div>
            <h3 className="text-4xl font-black tracking-tighter">{stat.val}</h3>
            <p className="text-[10px] text-emerald-500 font-black mt-3 uppercase tracking-widest">
              {stat.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#1A1A1F] border border-white/5 rounded-sm overflow-hidden shadow-2xl relative">
        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-4">
            <Clock size={20} className="text-[#FF2718]" />
            <h3 className="text-xs font-black uppercase tracking-[0.4em]">
              Flux Decisionnel ML v4.2
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-600">
              <ShieldCheck size={14} className="text-emerald-500" /> SHADOW MODE
              DISABLED
            </div>
            <Filter size={16} className="text-slate-700" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-black text-slate-500 tracking-[0.3em] border-b border-white/5 bg-white/5">
                <th className="px-6 py-6 w-10"></th>
                <th className="px-10 py-6">ENTITÉ</th>
                <th className="px-10 py-6 text-center">LTV PREDICT</th>
                <th className="px-10 py-6 text-center">BUYING WINDOW</th>
                <th className="px-10 py-6 text-center">PRIORITY</th>
                <th className="px-10 py-6 text-right">ML ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {LEADS.map((lead) => {
                const action = getPriorityAction(lead.priorityScore || 0);
                return (
                  <tr
                    key={lead.id}
                    className={`hover:bg-white/5 transition-colors cursor-pointer group ${selectedLeadIds.includes(lead.id) ? "bg-white/[0.02]" : ""}`}
                  >
                    <td
                      className="px-6 py-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLeadSelection(lead.id);
                      }}
                    >
                      {selectedLeadIds.includes(lead.id) ? (
                        <CheckSquare className="text-[#FF2718]" size={18} />
                      ) : (
                        <Square className="text-slate-700" size={18} />
                      )}
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="size-12 bg-black border border-white/10 flex items-center justify-center font-black text-sm text-[#FF2718] group-hover:border-[#FF2718]/40 transition-all">
                          {lead.entity[0]}
                        </div>
                        <div>
                          <p className="text-base font-black uppercase tracking-tight text-white">
                            {lead.entity}
                          </p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                            {lead.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span
                        className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 border rounded-sm ${getLTVStyles(lead.ltvClass)}`}
                      >
                        {lead.ltvClass || "N/A"}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span
                        className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 border rounded-full ${getMomentStyles(lead.buyingMoment!)}`}
                      >
                        {lead.buyingMoment}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={`text-lg font-black tracking-tighter ${lead.priorityScore! >= 80 ? "text-[#FF2718]" : "text-white"}`}
                        >
                          {lead.priorityScore}
                        </span>
                        <span className="text-[7px] font-black text-slate-600 uppercase">
                          Confidence: 94%
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 border rounded-sm transition-all shadow-lg ${action.color} ${action.border}`}
                      >
                        {action.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CRMPage;
