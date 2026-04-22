import React, { useState, useEffect } from "react";
import {
  Page,
  UserProfile,
  InfrastructureHealth,
  UserRole,
} from "../../types";
import { MOCK_INFRA_HEALTH } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hexagon,
  Activity,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Crown,
  Target,
  Zap,
  Bot,
  DollarSign,
  TrendingUp,
  CreditCard,
  Radar,
  Users,
  Search,
  CheckCircle,
  Clock,
  ArrowRight,
  Cpu,
  AlertTriangle,
  Database
} from "lucide-react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";

interface AdminDashboardPageProps {
  onNavigate: (p: Page) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  user,
  onLogout,
}) => {
  const [activeModule, setActiveModule] = useState<
    "command" | "leads" | "payments" | "monitoring"
  >("command");
  const [infra] = useState<InfrastructureHealth>(MOCK_INFRA_HEALTH);
  const [loading, setLoading] = useState(true);

  // 🔥 REAL-TIME DATA
  const [globalLeads, setGlobalLeads] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    hotLeads: 0,
    totalRevenue: 0,
    pendingPayments: 0
  });

  useEffect(() => {
    if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN)) {
      onNavigate(Page.AUTH);
      return;
    }
    
    // Listen to Leads
    const leadsQuery = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(50));
    const unsubscribeLeads = onSnapshot(leadsQuery, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setGlobalLeads(docs);
      const hotCount = docs.filter((l: any) => l.qualification === 'hot').length;
      setStats(prev => ({ ...prev, hotLeads: hotCount }));
    }, (err) => console.error("Leads Snap Error", err));

    // Listen to Payments
    const paymentsQuery = query(collection(db, "payments"), orderBy("createdAt", "desc"));
    const unsubscribePayments = onSnapshot(paymentsQuery, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPayments(docs);
      const total = docs.reduce((acc, curr: any) => acc + (curr.status === 'succeeded' ? curr.amount : 0), 0);
      setStats(prev => ({
        ...prev,
        totalRevenue: total,
        pendingPayments: docs.filter((p: any) => p.status === 'pending').length
      }));
    }, (err) => console.error("Payments Snap Error", err));

    const timer = setTimeout(() => setLoading(false), 1200);
    return () => {
      clearTimeout(timer);
      unsubscribeLeads();
      unsubscribePayments();
    };
  }, [user, onNavigate]);

  if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN)) return null;

  if (loading)
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center gap-10">
        <Hexagon size={100} className="text-[#E10600] animate-spin" strokeWidth={1} />
        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#E10600]">KRYPTON HQ SYNC...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex overflow-hidden font-sans italic-none">
      
      {/* Sidebar Admin 360 */}
      <aside className="w-80 bg-[#0A0A0E] border-r border-white/5 flex flex-col z-50">
        <div className="p-10 border-b border-white/5 flex items-center gap-5">
          <div className="size-12 bg-white text-black rounded-sm flex items-center justify-center shadow-2xl">
            <Crown size={24} />
          </div>
          <div>
            <p className="font-black uppercase tracking-tighter text-2xl leading-none">KRYPTON <span className="text-[#E10600]">HQ</span></p>
            <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mt-1">SUPER ADMIN v11.0</p>
          </div>
        </div>

        <nav className="flex-grow py-10 px-4 space-y-2">
          {[
            { id: "command", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
            { id: "leads", label: "Leads de Fiko", icon: <Bot size={20} /> },
            { id: "payments", label: "Revenus & Paiements", icon: <DollarSign size={20} /> },
            { id: "monitoring", label: "Infrastructure", icon: <Activity size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as any)}
              className={`w-full flex items-center gap-6 px-6 py-5 rounded-sm transition-all ${activeModule === item.id ? "bg-[#E10600] text-white" : "text-slate-500 hover:bg-white/5"}`}
            >
              {item.icon}
              <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-4 text-slate-600 hover:text-red-500 transition-all text-[9px] font-black uppercase tracking-widest">
            <LogOut size={16} /> Terminer Session
          </button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-hidden relative border-l border-white/5">
        
        <header className="h-24 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-12 flex items-center justify-between z-40">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className={`size-2.5 rounded-full animate-pulse ${infra.proxies.status === "healthy" ? "bg-emerald-500" : "bg-red-500"}`} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Node Status: <span className="text-white">ACTIVE</span></span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded flex items-center gap-3">
              <TrendingUp size={14} className="text-red-500" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Conversion Rate: 12.4%</span>
            </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-12 custom-scrollbar bg-[#0B0B0F]">
          
          <AnimatePresence mode="wait">
            {activeModule === "command" && (
              <motion.div key="command" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                <h2 className="text-7xl font-black uppercase tracking-tighter italic">COMMAND <span className="text-[#E10600] not-italic underline">CENTER.</span></h2>
                
                <div className="grid lg:grid-cols-4 gap-8">
                  {[
                    { label: "Leads Chauds", val: stats.hotLeads, icon: <Zap />, color: "text-red-500" },
                    { label: "Paiements Attente", val: stats.pendingPayments, icon: <Clock />, color: "text-orange-500" },
                    { label: "Revenu Total", val: `${(stats.totalRevenue/1000000).toFixed(2)}M FCFA`, icon: <DollarSign />, color: "text-emerald-500" },
                    { label: "Activité Node", val: "99.8%", icon: <Activity />, color: "text-blue-500" },
                  ].map((s, i) => (
                    <div key={i} className="bg-[#14141A] p-10 border border-white/5 rounded-sm shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">{s.icon}</div>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-8">{s.label}</p>
                      <h3 className={`text-4xl font-black tracking-tighter ${s.color}`}>{s.val}</h3>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-[#0A0A0E] border border-white/5 rounded-sm p-8">
                    <div className="flex justify-between items-center mb-10">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#E10600]">Derniers Leads Qualifiés</h4>
                      <button onClick={() => setActiveModule("leads")} className="text-[10px] text-white/40 uppercase font-black hover:text-white">Tout voir</button>
                    </div>
                    <div className="space-y-4">
                      {globalLeads.slice(0, 5).map((l: any) => (
                        <div key={l.id} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-sm">
                          <div>
                            <p className="text-xs font-bold text-white">{l.email}</p>
                            <p className="text-[9px] text-white/30 uppercase mt-1">{l.source}</p>
                          </div>
                          <div className={`px-3 py-1 rounded text-[10px] font-black uppercase ${l.score >= 80 ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'}`}>
                            {l.score}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0A0A0E] border border-white/5 rounded-sm p-8 flex flex-col items-center justify-center text-center">
                    <TrendingUp className="text-emerald-500 mb-6" size={48} />
                    <h3 className="text-2xl font-black uppercase italic">Performance Revenue</h3>
                    <p className="text-xs text-white/40 mt-2 max-w-xs">Croissance de 34% par rapport au mois dernier. Automatisation FIKO efficace.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeModule === "leads" && (
              <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="flex justify-between items-end">
                  <h2 className="text-5xl font-black uppercase tracking-tighter italic">FIKO <span className="text-[#E10600]">LEADS HUB.</span></h2>
                </div>

                <div className="bg-[#141419] border border-white/5 rounded-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-[9px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5 bg-black/20">
                        <th className="px-8 py-6">UTILISATEUR</th>
                        <th className="px-8 py-6">SCORE</th>
                        <th className="px-8 py-6">QUALIFICATION</th>
                        <th className="px-8 py-6">OFFRE RECO</th>
                        <th className="px-8 py-6 text-right">DATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {globalLeads.map((l: any) => (
                        <tr key={l.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-8">
                            <p className="text-white font-bold">{l.email}</p>
                            <p className="text-[10px] text-white/30 uppercase mt-0.5">{l.source}</p>
                          </td>
                          <td className="px-8 py-8 font-black text-white">{l.score}%</td>
                          <td className="px-8 py-8">
                            <span className={`px-3 py-1 rounded text-[10px] font-black uppercase ${
                              l.qualification === 'hot' ? 'bg-red-500 text-white' : 
                              l.qualification === 'warm' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-500/20 text-slate-400'
                            }`}>
                              {l.qualification}
                            </span>
                          </td>
                          <td className="px-8 py-8 font-bold italic">{l.recommendedOffer || '--'}</td>
                          <td className="px-8 py-8 text-right font-mono text-slate-500">
                            {l.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeModule === "payments" && (
              <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="flex justify-between items-end">
                  <h2 className="text-5xl font-black uppercase tracking-tighter italic">REVENUE <span className="text-emerald-500">TRACKER.</span></h2>
                </div>

                <div className="bg-[#141419] border border-white/5 rounded-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-[9px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5 bg-black/20">
                        <th className="px-8 py-6">CLIENT</th>
                        <th className="px-8 py-6">OFFRE</th>
                        <th className="px-8 py-6">MONTANT</th>
                        <th className="px-8 py-6">MÉTHODE</th>
                        <th className="px-8 py-6 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {payments.map((p: any) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-8 font-bold text-white">{p.userEmail || p.userId}</td>
                          <td className="px-8 py-8 text-white/60">{p.offer}</td>
                          <td className="px-8 py-8 font-black text-white">{p.amount.toLocaleString()} FCFA</td>
                          <td className="px-8 py-8">
                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold uppercase">{p.method}</span>
                          </td>
                          <td className="px-8 py-8 text-right">
                            <span className={`px-3 py-1 rounded text-[10px] font-black uppercase ${
                              p.status === 'succeeded' ? 'bg-emerald-500 text-white' : 
                              p.status === 'pending' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            
            {activeModule === "monitoring" && (
              <div className="space-y-12">
                 <h2 className="text-5xl font-black uppercase tracking-tighter italic">INFRA <span className="text-[#E10600]">MONITOR.</span></h2>
                 <div className="bg-[#141419] p-10 border border-white/5 rounded-sm">
                   <p className="text-slate-500 uppercase text-[10px] font-black mb-8">Node Inférence Global</p>
                   <div className="h-64 flex items-end gap-2 px-4 py-8 bg-black/20 rounded border border-white/5">
                     {[40, 60, 45, 80, 70, 90, 50, 40, 100, 80, 60, 45].map((h, i) => (
                       <motion.div 
                        key={i} 
                        initial={{ height: 0 }} 
                        animate={{ height: `${h}%` }} 
                        className="flex-1 bg-red-500/20 border-t border-red-500" 
                      />
                     ))}
                   </div>
                 </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
