import React, { useState, useEffect } from "react";
import { Page, Message, UserProfile } from "./types";
import { GoogleGenAI } from "@google/genai";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Hexagon,
  Activity,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  TrendingUp,
  Crown,
  Server,
  Settings,
  Network,
  Sliders,
  Power,
  Brain,
  Clock,
  Eye,
  Info,
  CheckCircle,
  FileText,
  History,
  VenetianMask,
} from "lucide-react";

// 🔥 FIREBASE
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "looker" | "fleet" | "security" | "settings"
  >("overview");
  const [messages, setMessages] = useState<Message[]>([]);
  const [investorMode, setInvestorMode] = useState(false);

  // 🔥 LEADS FIRESTORE
  const [leads, setLeads] = useState<any[]>([]);

  const featureImportance = [
    { name: "Pouvoir Décisionnel", val: 31, fill: "#E10600" },
    { name: "Latence Réponse", val: 22, fill: "#E10600BB" },
    { name: "Budget Confirmé", val: 18, fill: "#E1060099" },
    { name: "Répétition Pricing", val: 14, fill: "#E1060077" },
    { name: "Mention Comité", val: -9, fill: "#333" },
  ];

  const modelAccuracyData = [
    { name: "Lun", accuracy: 84, stability: 92 },
    { name: "Mar", accuracy: 86, stability: 90 },
    { name: "Mer", accuracy: 85, stability: 94 },
    { name: "Jeu", accuracy: 87, stability: 95 },
    { name: "Ven", accuracy: 88, stability: 93 },
    { name: "Sam", accuracy: 87, stability: 94 },
    { name: "Dim", accuracy: 87, stability: 96 },
  ];

  // 🔥 INIT UI
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setMessages([
        {
          role: "model",
          text: "Noyau CEO v10.0 opérationnel. Données Firestore connectées.",
        },
      ]);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 FIRESTORE REALTIME
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      collection(db, "leads"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeads(data);
      },
      (error) => {
        console.error("Firestore onSnapshot error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center gap-8">
        <Hexagon size={80} className="text-[#E10600] animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#E10600]">
          INITIALISATION DU COCKPIT CEO...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-80 bg-[#121217] border-r border-white/5 flex flex-col">
        <div className="p-10 border-b border-white/5 flex items-center gap-4">
          <Crown />
          <span>KRYPTON CEO</span>
        </div>

        <nav className="flex-grow p-6 space-y-4">
          <button onClick={() => setActiveTab("overview")}>Overview</button>
          <button onClick={() => setActiveTab("looker")}>Looker</button>
          <button onClick={() => setActiveTab("settings")}>Settings</button>
        </nav>

        <button onClick={onLogout} className="p-4 text-red-500">
          <LogOut /> Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-grow p-10 overflow-auto">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            <h1 className="text-3xl font-bold">Dashboard Global</h1>

            <div className="grid grid-cols-4 gap-6">
              <div className="bg-[#1A1A1F] p-6">Leads: {leads.length}</div>
              <div className="bg-[#1A1A1F] p-6">Revenue: --</div>
              <div className="bg-[#1A1A1F] p-6">Conversion: --</div>
              <div className="bg-[#1A1A1F] p-6">Status: Live</div>
            </div>

            {/* TABLE LEADS */}
            <div className="bg-[#1A1A1F] p-6 rounded-xl border border-white/5">
              <h2 className="mb-6 font-bold uppercase tracking-widest text-sm text-white/50">Flux de Conversion Temps Réel</h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 uppercase tracking-wider text-[10px] border-b border-white/5 mb-4 block pb-2">
                    <th className="w-1/4 inline-block">Utilisateur</th>
                    <th className="w-1/4 inline-block">Score</th>
                    <th className="w-1/4 inline-block">Qualif</th>
                    <th className="w-1/4 inline-block">Status/Source</th>
                  </tr>
                </thead>

                <tbody className="block">
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="border-b border-white/5 block py-4 hover:bg-white/5 transition-colors rounded-lg px-2">
                      <td className="w-1/4 inline-block align-top">
                        <div className="font-bold">{lead.email}</div>
                        <div className="text-[10px] text-gray-500">{lead.userId}</div>
                      </td>
                      <td className="w-1/4 inline-block align-top">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${lead.score >= 80 ? 'bg-green-500' : lead.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                          <span className="font-black text-lg">{lead.score || 0}</span>
                        </div>
                      </td>
                      <td className="w-1/4 inline-block align-top">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          lead.qualification === 'hot' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          lead.qualification === 'warm' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {lead.qualification || 'cold'}
                        </span>
                      </td>
                      <td className="w-1/4 inline-block align-top">
                        <div className="text-sm font-semibold">{lead.status || 'new'}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">{lead.source || 'Direct'}</div>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                     <tr><td className="py-8 text-center text-gray-500 w-full block">Aucun lead détecté.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LOOKER */}
        {activeTab === "looker" && (
          <div>
            <h1>AI Intelligence</h1>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={modelAccuracyData}>
                <Line dataKey="accuracy" stroke="#E10600" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div>
            <h1>System Settings</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;
