import React from "react";
import { 
  LayoutDashboard, 
  Target, 
  Monitor, 
  Bot, 
  Users, 
  Zap, 
  CreditCard, 
  UserCircle,
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const MENU_ITEMS = [
  { id: "dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
  { id: "business", label: "Mon Business", icon: Target },
  { id: "site", label: "Mon Site", icon: Monitor },
  { id: "agents", label: "Agents IA", icon: Bot },
  { id: "leads", label: "Leads & Conversion", icon: Users },
  { id: "upgrade", label: "Offres & Upgrade", icon: Zap },
  { id: "billing", label: "Facturation", icon: CreditCard },
  { id: "account", label: "Mon Compte", icon: UserCircle },
];

export default function DashboardSidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  return (
    <aside className="w-72 bg-[#0A0A0C] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-[#E10600] rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-black uppercase tracking-[0.2em] text-sm">Krypton <span className="text-[#E10600]">HQ</span></span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 py-10">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${
              activeTab === item.id 
              ? "bg-[#E10600]/10 border border-[#E10600]/20 text-white" 
              : "text-slate-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <item.icon size={18} className={activeTab === item.id ? "text-[#E10600]" : ""} />
              <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
            </div>
            {activeTab === item.id && (
              <motion.div layoutId="active-indicator">
                <ChevronRight size={14} className="text-[#E10600]" />
              </motion.div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 p-4 text-slate-500 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all"
        >
          <LogOut size={18} />
          <span className="text-[11px] font-black uppercase tracking-widest">Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}
