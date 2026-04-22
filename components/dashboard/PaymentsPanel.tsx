import React, { useState } from "react";
import { 
  CreditCard, 
  History, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { UserProfile } from "../../types";
import { KRYPTON_PRICING } from "../../pricingData";
import { useNavigate } from 'react-router-dom';

interface PaymentsPanelProps {
  user: UserProfile;
  payments: any[];
}

export default function PaymentsPanel({ user, payments }: PaymentsPanelProps) {
  const navigate = useNavigate();
  const currentPlan = KRYPTON_PRICING.find(p => p.id === "MARS") || KRYPTON_PRICING[0];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid':
      case 'succeeded':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-white/5 text-slate-500 border-white/5';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
      case 'succeeded': return 'PAYÉ';
      case 'pending': return 'EN ATTENTE';
      case 'failed': return 'ÉCHEC';
      default: return status.toUpperCase();
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Paiement & <span className="text-[#E10600]">Facturation</span>.</h2>
          <p className="text-slate-500 italic mt-1 uppercase text-[10px] tracking-widest font-bold">Gestion des transactions et accès services</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/billing/payment', { state: { plan: currentPlan, user } })}
            className="px-6 py-4 bg-[#E10600] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center gap-3"
          >
            S'acquitter d'une facture <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111116] border border-white/5 p-8 rounded-[32px] flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform">
            <CreditCard size={180} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Plan Actif</p>
            <h3 className="text-3xl font-black italic tracking-tighter mb-1 uppercase">{currentPlan.name}</h3>
            <p className="text-xs text-slate-400 font-medium italic">Prochain prélèvement : 01 MAI 2026</p>
          </div>
          <div className="mt-8 flex items-center gap-3">
             <div className="size-8 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle2 size={16} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Statut: Actif</span>
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 p-8 rounded-[32px] flex flex-col justify-between min-h-[220px]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Dernier Paiement</p>
            <h3 className="text-3xl font-black italic tracking-tighter mb-1">{currentPlan.price.toLocaleString()} {currentPlan.currency}</h3>
            <p className="text-xs text-slate-400 font-medium italic">Payé via WAVE (Lien Direct)</p>
          </div>
          <div className="mt-8">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#E10600] hover:underline">
              <Download size={14} /> Télécharger le reçu
            </button>
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 p-8 rounded-[32px] flex flex-col justify-between min-h-[220px]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Méthode de Paiement</p>
            <div className="flex items-center gap-4">
              <div className="size-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-tight tracking-widest">WAVE Côte d'Ivoire</p>
                <p className="text-[10px] text-slate-500 uppercase font-black">Activation Automatique</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Gérer les méthodes</button>
          </div>
        </div>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <History size={20} className="text-[#E10600]" />
             <h3 className="text-lg font-black uppercase tracking-widest">Historique des Transactions</h3>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">Voir Tout</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Facture</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Date</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Montant</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Statut</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.map((payment, i) => (
                <tr key={payment.id || i} className="group hover:bg-white/[0.02] transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-slate-600" />
                      <div>
                        <span className="text-sm font-bold text-white mb-0.5 uppercase">#{payment.id?.slice(-8).toUpperCase() || 'INV-2024'}</span>
                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Pack {payment.offer || 'PILOT'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-medium text-slate-400">
                      {payment.createdAt?.toDate ? payment.createdAt.toDate().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : '20 AVRIL 2026'}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black italic">{payment.amount?.toLocaleString() || '150 000'} {payment.currency || 'FCFA'}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`px-3 py-1.5 border rounded-full text-[9px] font-black tracking-widest inline-flex items-center gap-2 ${getStatusStyle(payment.status || 'paid')}`}>
                      {payment.status === 'pending' ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                      {getStatusLabel(payment.status || 'paid')}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
              
              {payments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-slate-600 italic text-[10px] uppercase font-black tracking-widest">
                    Aucune transaction enregistrée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-yellow-500/5 border border-yellow-500/20 p-8 rounded-3xl flex items-center gap-6">
        <AlertCircle size={32} className="text-yellow-500 shrink-0" />
        <div className="flex-1">
          <h4 className="text-lg font-black uppercase tracking-tight text-white">Prêt pour l'Activation Prioritaire ?</h4>
          <p className="text-xs text-slate-400 font-medium italic leading-relaxed">
            "Pour accélérer le déploiement de vos agents, privilégiez le paiement via WAVE ou virement instantané."
          </p>
        </div>
        <button 
          onClick={() => navigate('/billing/payment', { state: { plan: currentPlan, user } })}
          className="px-6 py-3 bg-[#E10600] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all"
        >
          Régulariser Maintenant
        </button>
      </div>

    </div>
  );
}
