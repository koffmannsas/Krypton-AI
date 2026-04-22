import { PaymentOption, PaymentRecord } from "../types";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const calculatePaymentPlan = (basePrice: number): PaymentOption[] => {
  const plans: { installments: 1 | 2 | 3 | 4; multiplier: number }[] = [
    { installments: 1, multiplier: 1.0 },
    { installments: 2, multiplier: 1.1 },
    { installments: 3, multiplier: 1.18 },
    { installments: 4, multiplier: 1.25 },
  ];

  return plans.map((p) => {
    const total = basePrice * p.multiplier;
    const monthlyAmount = total / p.installments;
    
    return {
      installments: p.installments,
      total,
      monthlyAmount,
      extraCost: total - basePrice,
      label: p.installments === 1 ? "Paiement unique" : `${p.installments} fois sans stress`,
      isRecommended: p.installments === 1,
    };
  });
};

export const createPaymentRecord = async (record: Omit<PaymentRecord, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, "payments"), {
    ...record,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};
