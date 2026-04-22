import React from "react";
import { Page, KryptonClient, ClientStatus, PlanType, UserProfile } from "../../types";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  Cpu,
  TrendingUp,
  AlertTriangle,
  MoreVertical,
  FileText,
  Bell,
  ShieldAlert,
} from "lucide-react";
import { MOCK_CLIENTS, PLAN_DATA } from "../../constants";

interface BillingPageProps {
  onNavigate: (p: Page) => void;
  user: UserProfile | null;
}

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}M FCFA`;
  }
  return `${amount / 1000}K FCFA`;
};

const KpiCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#141419] p-8 border border-white/5 rounded-sm shadow-2xl flex flex-col justify-between group hover:border-white/10 transition-all"
  >
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
        {title}
      </span>
      <div style={{ color }}>{icon}</div>
    </div>
    <p className="text-4xl font-black tracking-tighter text-white mt-8">
      {value}
    </p>
  </motion.div>
);

const StatusBadge: React.FC<{ status: ClientStatus }> = ({ status }) => {
  const config: Record<ClientStatus, { text: string; color: string }> = {
    active: { text: "Actif", color: "#10b981" },
    blocked: { text: "Bloqué", color: "#ef4444" },
    maintenance_required: { text: "Maintenance", color: "#f59e0b" },
    risk: { text: "À Risque", color: "#f97316" },
  };
  const { text, color } = config[status];
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full`}
      style={{ backgroundColor: `${color}1A`, border: `1px solid ${color}33` }}
    >
      <div
        className={`size-1.5 rounded-full`}
        style={{ backgroundColor: color }}
      ></div>
      <span
        className={`text-[9px] font-black uppercase tracking-widest`}
        style={{ color }}
      >
        {text}
      </span>
    </div>
  );
};

const PlanBadge: React.FC<{ plan: PlanType }> = ({ plan }) => {
  const { color } = PLAN_DATA[plan];
  return (
    <span
      className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-sm"
      style={{ backgroundColor: `${color}20`, color: `${color}` }}
    >
      {plan.replace("_", " ")}
    </span>
  );
};

const BillingPage: React.FC<BillingPageProps> = ({ onNavigate, user }) => {
  const totalRevenue = MOCK_CLIENTS.reduce((acc, client) => {
    const planCost = PLAN_DATA[client.plan_type].price / 12; // Monthly
    const maintenanceCost = client.maintenance_active
      ? PLAN_DATA[client.plan_type].maintenance
      : 0;
    return acc + planCost + maintenanceCost;
  }, 0);

  const totalApiCost = 850000; // Simulé
  const clientsAtRisk = MOCK_CLIENTS.filter(
    (c) => c.status === "risk" || c.status === "maintenance_required",
  ).length;

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="absolute inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>

      <header className="fixed top-0 w-full z-50 h-24 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-white/5 px-10 flex items-center">
        <button
          onClick={() => onNavigate(Page.ADMIN_DASHBOARD)}
          className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Retour au HQ</span>
        </button>
      </header>

      <main className="max-w-[1600px] mx-auto px-10 pt-40 pb-32 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 border border-[#E10600] bg-[#E10600]/5 text-[#E10600] text-[10px] font-black uppercase tracking-[0.5em]">
            KRYPTON BILLING ENGINE V1.0 - LIVE
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
            Monitoring <br />
            <span className="text-[#E10600] italic">Financier.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <KpiCard
            title="Revenu Mensuel Total"
            value={formatCurrency(totalRevenue)}
            icon={<DollarSign />}
            color="#10b981"
          />
          <KpiCard
            title="Coût API Gemini"
            value={formatCurrency(totalApiCost)}
            icon={<Cpu />}
            color="#f97316"
          />
          <KpiCard
            title="Marge Brute Globale"
            value={`${(((totalRevenue - totalApiCost) / totalRevenue) * 100).toFixed(1)}%`}
            icon={<TrendingUp />}
            color="#3b82f6"
          />
          <KpiCard
            title="Clients à Risque"
            value={String(clientsAtRisk)}
            icon={<AlertTriangle />}
            color="#ef4444"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#141419]/50 border border-white/10 rounded-sm overflow-hidden backdrop-blur-xl"
        >
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-base font-black uppercase tracking-[0.3em] text-white">
              Supervision des Clients
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Exporter Vue
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-black text-slate-600 uppercase tracking-widest border-b border-white/10">
                  <th className="px-8 py-6">Client</th>
                  <th className="px-8 py-6">Plan Actif</th>
                  <th className="px-8 py-6">Statut</th>
                  <th className="px-8 py-6">Usage Voix</th>
                  <th className="px-8 py-6">Marge Brute</th>
                  <th className="px-8 py-6">Prochaine Échéance</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CLIENTS.map((client) => (
                  <tr
                    key={client.client_id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-8">
                      <p className="text-sm font-bold text-white">
                        {client.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {client.email}
                      </p>
                    </td>
                    <td className="px-8 py-8">
                      <PlanBadge plan={client.plan_type} />
                    </td>
                    <td className="px-8 py-8">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="px-8 py-8">
                      {client.voice_minutes_limit > 0 ? (
                        <div className="w-32">
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#E10600]"
                              style={{
                                width: `${Math.min(100, (client.voice_minutes_used / client.voice_minutes_limit) * 100)}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-[9px] font-mono text-slate-500 mt-2">
                            {client.voice_minutes_used}/
                            {client.voice_minutes_limit} min
                          </p>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-700 font-black">
                          N/A
                        </span>
                      )}
                    </td>
                    <td
                      className={`px-8 py-8 text-sm font-bold font-mono ${client.marge_brute >= 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {client.marge_brute >= 0 ? "+" : ""}
                      {client.marge_brute.toLocaleString("fr-FR")} FCFA
                    </td>
                    <td className="px-8 py-8 text-xs font-mono text-slate-400">
                      {new Date(
                        client.maintenance_start_date,
                      ).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="inline-block relative group">
                        <button className="p-2 text-slate-600 hover:text-white">
                          <MoreVertical size={18} />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-[#1A1A1F] border border-white/10 rounded-sm shadow-2xl p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
                          <button className="w-full text-left flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase hover:bg-white/5">
                            <FileText size={12} /> Voir Factures
                          </button>
                          <button className="w-full text-left flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase hover:bg-white/5">
                            <Bell size={12} /> Envoyer Rappel
                          </button>
                          <button className="w-full text-left flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase text-red-500 hover:bg-red-500/10">
                            <ShieldAlert size={12} /> Bloquer Accès
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BillingPage;
