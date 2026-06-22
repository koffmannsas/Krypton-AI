import React, { useState } from "react";
import { PaymentOption } from "../../types";
import { calculatePaymentPlan } from "../../services/paymentService";
import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";

interface Props {
  basePrice: number;
  onSelect: (option: PaymentOption) => void;
}

export default function PaymentOptionsSelector({ basePrice, onSelect }: Props) {
  const options = calculatePaymentPlan(basePrice);
  const [selected, setSelected] = useState<PaymentOption>(options[0]);

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
        Choisissez la formule qui correspond à votre trésorerie.
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <motion.button
            key={option.installments}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelected(option);
              onSelect(option);
            }}
            className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col gap-1 ${
              selected.installments === option.installments
                ? "border-[#FF2718] bg-[#111116]"
                : "border-white/10 bg-black hover:border-white/20"
            }`}
          >
            {option.isRecommended && (
              <div className="absolute -top-3 right-4 bg-[#FF2718] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 text-white">
                <Flame size={12} /> Recommandé 🔥
              </div>
            )}
            <span className="text-[14px] font-black text-white">{option.label}</span>
            <span className="text-xl font-black text-[#FF2718] italic">
              {option.monthlyAmount.toLocaleString()} FCFA <span className="text-[10px] text-slate-500">/ mois</span>
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">
              Total: {option.total.toLocaleString()} FCFA
            </span>
            {option.extraCost > 0 && (
              <span className="text-[8px] font-medium text-green-500">
                Paiement flexible (+{option.extraCost.toLocaleString()} FCFA)
              </span>
            )}
            
            {selected.installments === option.installments && (
              <div className="absolute top-4 right-4 text-[#FF2718]">
                <Check size={16} />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
