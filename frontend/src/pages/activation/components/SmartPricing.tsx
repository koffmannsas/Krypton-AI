import React from 'react';
import { motion } from 'motion/react';

interface SmartPricingProps {
    gate: string;
    onNext: (option: "fractionne" | "unique" | "split") => void;
}

interface GatePricingDetails {
  name: string;
  subtitle: string;
  originalPrice: string;
  uniquePrice: string;
  economy: string;
  fractionne: string;
  splitFirst: string;
  splitSecond: string;
}

const PRICING_DATA: Record<string, GatePricingDetails> = {
  ACCESS: {
    name: "PORTE ACCESS",
    subtitle: "Démarrage standard",
    originalPrice: "200000",
    uniquePrice: "170000",
    economy: "30000",
    fractionne: "45000",
    splitFirst: "100000",
    splitSecond: "100000"
  },
  TERRA: {
    name: "PORTE TERRA",
    subtitle: "L'Artisan Digital",
    originalPrice: "700000",
    uniquePrice: "595000",
    economy: "105000",
    fractionne: "145800",
    splitFirst: "350000",
    splitSecond: "350000"
  },
  MARS: {
    name: "PORTE MARS",
    subtitle: "Le Conquérant",
    originalPrice: "1900000",
    uniquePrice: "1615000",
    economy: "285000",
    fractionne: "395000",
    splitFirst: "950000",
    splitSecond: "950000"
  },
  KRYPTON: {
    name: "PORTE KRYPTON",
    subtitle: "Le Souverain",
    originalPrice: "3900000",
    uniquePrice: "3315000",
    economy: "585000",
    fractionne: "815000",
    splitFirst: "1 950000",
    splitSecond: "1 950000"
  },
  GALAXY: {
    name: "PORTE GALAXY",
    subtitle: "L'Architecte",
    originalPrice: "SUR DEVIS",
    uniquePrice: "SUR DEVIS",
    economy: "N/A",
    fractionne: "SUR DEVIS",
    splitFirst: "SUR DEVIS",
    splitSecond: "SUR DEVIS"
  }
};

const getPricingDetails = (gate: string): GatePricingDetails => {
  const normalized = gate.toUpperCase().trim();
  if (PRICING_DATA[normalized]) {
    return PRICING_DATA[normalized];
  }
  return {
    name: `PORTE ${normalized}`,
    subtitle: "Configuration Sur Mesure",
    originalPrice: "SUR DEVIS",
    uniquePrice: "SUR DEVIS",
    economy: "N/A",
    fractionne: "SUR DEVIS",
    splitFirst: "SUR DEVIS",
    splitSecond: "SUR DEVIS"
  };
};

const SmartPricing: React.FC<SmartPricingProps> = ({ gate, onNext }) => {
    const details = getPricingDetails(gate);
    const isDeivs = details.uniquePrice === "SUR DEVIS";

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 min-h-screen bg-[#0A0A0A] z-40 overflow-y-auto px-6 py-20 flex flex-col items-center"
        >
            <div className="w-full max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#E10600]/20 bg-[#111111] text-[#E10600] mb-8">
                        <div className="w-2 h-2 rounded-full bg-[#E10600]" />
                        <span className="font-mono text-[0.7rem] tracking-[2px] uppercase">
                            Je recommande l'activation optimisée de votre {details.name} pour accélérer immédiatement votre déploiement.
                        </span>
                    </div>
                    <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight text-white uppercase">Sélectionnez votre modèle d’activation — {details.name}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {/* FRACTIONNÉ */}
                    <div className="border border-white/[0.05] bg-[#111111] p-8 flex flex-col opacity-80 hover:opacity-100 transition-opacity">
                        <div className="font-mono text-[0.7rem] tracking-[3px] text-[#8B8B8B] uppercase mb-4">Engagement souple</div>
                        <h3 className="font-sans font-bold text-xl mb-6">Paiement Fractionné</h3>
                        <div className="font-sans font-light text-2xl mb-2">
                            {isDeivs ? "Sur Devis" : `À partir de ${details.fractionne}`}
                            {!isDeivs && <span className="text-sm text-[#8B8B8B]"> / mois</span>}
                        </div>
                        <div className="font-mono text-[0.65rem] tracking-[1px] text-[#8B8B8B] mb-8">
                            {isDeivs ? "Étude personnalisée" : "❌ Coût total plus élevé"}
                        </div>
                        <div className="mt-auto">
                            <button onClick={() => onNext("fractionne")} className="w-full py-4 border border-white/10 text-white font-mono text-[0.7rem] tracking-[3px] uppercase hover:bg-white/5 transition-colors">
                                Choisir cette option
                            </button>
                        </div>
                    </div>

                    {/* RECOMMANDE */}
                    <div className="border border-[#E10600] bg-[#1A0A0A] p-8 flex flex-col relative transform lg:-translate-y-4 shadow-[0_20px_50px_rgba(225,6,0,0.1)]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E10600] text-white font-mono text-[0.6rem] tracking-[3px] uppercase px-4 py-1 flex items-center gap-2">
                            ⭐ Recommandé
                        </div>
                        <div className="font-mono text-[0.7rem] tracking-[3px] text-[#E10600] uppercase mb-4 flex items-center gap-2">
                            🔥 Activation Optimisée
                        </div>
                        <h3 className="font-sans font-bold text-2xl mb-6">Paiement Unique</h3>
                        <div className="font-sans font-black text-4xl mb-2 border-b border-[#E10600]/20 pb-4 relative">
                            {details.uniquePrice}
                            {!isDeivs && (
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm line-through text-[#8B8B8B] font-light">{details.originalPrice}</span>
                            )}
                        </div>
                        
                        <div className="my-6 space-y-4 flex-1">
                            {!isDeivs && details.economy !== "N/A" && (
                                <div className="bg-[#E10600]/10 border border-[#E10600]/20 text-[#E10600] px-4 py-3 font-mono text-[0.75rem] tracking-[1px]">
                                    Économie immédiate : {details.economy}
                                </div>
                            )}
                            <div className="font-mono text-[0.65rem] tracking-[2px] text-[#8B8B8B] flex items-center gap-2">
                                ⏳ Optimisation disponible pendant cette session
                            </div>
                            <ul className="space-y-3 mt-6 font-mono text-[0.75rem] text-[#D0D0D0]">
                                <li className="flex items-start gap-2"><span className="text-[#E10600]">✓</span> Activation prioritaire de l'infrastructure</li>
                                <li className="flex items-start gap-2"><span className="text-[#E10600]">✓</span> Onboarding VIP</li>
                                <li className="flex items-start gap-2"><span className="text-[#E10600]">✓</span> Accès immédiat au dashboard {details.name}</li>
                            </ul>
                        </div>
                        
                        <div className="mt-auto">
                            <button onClick={() => onNext("unique")} className="w-full py-5 bg-[#E10600] text-white font-mono font-bold text-[0.8rem] tracking-[3px] uppercase hover:bg-[#FF1A1A] transition-colors">
                                Activer maintenant
                            </button>
                        </div>
                    </div>

                    {/* 50/50 */}
                    <div className="border border-white/[0.05] bg-[#111111] p-8 flex flex-col opacity-80 hover:opacity-100 transition-opacity">
                        <div className="font-mono text-[0.7rem] tracking-[3px] text-[#8B8B8B] uppercase mb-4">Paiement standard</div>
                        <h3 className="font-sans font-bold text-xl mb-6">Split 50/50</h3>
                        <div className="font-sans font-light text-2xl mb-2 space-y-2">
                            {isDeivs ? (
                                <div>Sous Évaluation</div>
                            ) : (
                                <>
                                    <div>{details.splitFirst} <span className="text-sm text-[#8B8B8B]">maintenant</span></div>
                                    <div className="text-xl text-[#8B8B8B]">{details.splitSecond} <span className="text-sm">à livraison</span></div>
                                </>
                            )}
                        </div>
                        <div className="my-8 flex-1">
                            <p className="font-mono text-[0.7rem] text-[#8B8B8B] leading-relaxed">
                                Démarrage classique. Le déploiement s'effectue selon le prévisionnel standard.
                              </p>
                        </div>
                        <div className="mt-auto">
                            <button onClick={() => onNext("split")} className="w-full py-4 border border-white/10 text-white font-mono text-[0.7rem] tracking-[3px] uppercase hover:bg-white/5 transition-colors">
                                Choisir cette option
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SmartPricing;
