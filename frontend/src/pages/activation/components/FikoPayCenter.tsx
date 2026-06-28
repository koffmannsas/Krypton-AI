import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FikoPayCenterProps {
    gate: string;
    selectedOption: "fractionne" | "unique" | "split";
    onComplete: () => void;
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
    originalPrice: "200 000 FCFA",
    uniquePrice: "170 000 FCFA",
    economy: "30 000 FCFA",
    fractionne: "45 000 FCFA",
    splitFirst: "100 000 FCFA",
    splitSecond: "100 000 FCFA"
  },
  TERRA: {
    name: "PORTE TERRA",
    subtitle: "L'Artisan Digital",
    originalPrice: "700 000 FCFA",
    uniquePrice: "595 000 FCFA",
    economy: "105 000 FCFA",
    fractionne: "145 800 FCFA",
    splitFirst: "350 000 FCFA",
    splitSecond: "350 000 FCFA"
  },
  MARS: {
    name: "PORTE MARS",
    subtitle: "Le Conquérant",
    originalPrice: "1 900 000 FCFA",
    uniquePrice: "1 615 000 FCFA",
    economy: "285 000 FCFA",
    fractionne: "395 000 FCFA",
    splitFirst: "950 000 FCFA",
    splitSecond: "950 000 FCFA"
  },
  KRYPTON: {
    name: "PORTE KRYPTON",
    subtitle: "Le Souverain",
    originalPrice: "3 900 000 FCFA",
    uniquePrice: "3 315 000 FCFA",
    economy: "585 000 FCFA",
    fractionne: "815 000 FCFA",
    splitFirst: "1 950 000 FCFA",
    splitSecond: "1 950 000 FCFA"
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

const FikoPayCenter: React.FC<FikoPayCenterProps> = ({ gate, selectedOption, onComplete }) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const details = getPricingDetails(gate);
    const isDeivs = details.uniquePrice === "SUR DEVIS";

    const handleMockPayment = () => {
        // Simulate a brief delay then proceed
        setTimeout(() => {
            onComplete();
        }, 800);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 min-h-screen bg-[#050505] z-40 overflow-y-auto px-6 py-20 flex flex-col items-center"
        >
            <div className="w-full max-w-4xl">
                <div className="text-center mb-10">
                    <p className="font-mono text-[0.7rem] tracking-[4px] text-[#8B8B8B] uppercase mb-4">Centre de Paiement Krypton</p>
                    <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight text-white uppercase">Finalisation de l’accès</h2>
                </div>

                {/* RECAP BLOCK */}
                <div className="border border-white/10 bg-white/[0.02] p-6 mb-10 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E10600]/50 to-[#E10600] w-full" />
                    <div>
                        <div className="font-mono text-[10px] uppercase text-[#E10600] tracking-[2px] mb-1 font-bold">Porte sélectionnée</div>
                        <h4 className="text-2xl font-black text-white tracking-tight uppercase">{details.name}</h4>
                        <p className="text-xs text-slate-400 font-light italic mt-1">{details.subtitle}</p>
                    </div>
                    <div className="h-px md:h-12 w-full md:w-px bg-white/10 my-1 md:my-0" />
                    <div>
                        <div className="font-mono text-[10px] uppercase text-slate-500 tracking-[2px] mb-1 font-bold">Modèle d'Engagement</div>
                        <span className="text-sm font-bold text-slate-300 uppercase tracking-wider block">
                            {selectedOption === 'unique' ? 'Paiement Unique (Optimisé)' : selectedOption === 'fractionne' ? 'Engagement Fractionné' : 'Split 50/50 Standard'}
                        </span>
                        {selectedOption === 'unique' && !isDeivs && details.economy !== "N/A" && (
                            <span className="text-[10px] text-emerald-500 font-mono mt-1 block">✓ Remise de {details.economy} appliquée</span>
                        )}
                    </div>
                    <div className="h-px md:h-12 w-full md:w-px bg-white/10 my-1 md:my-0" />
                    <div className="md:text-right text-left">
                        <div className="font-mono text-[10px] uppercase text-slate-500 tracking-[2px] mb-1 font-bold">Solde à régler</div>
                        <div className="text-3xl font-black text-white tracking-tighter">
                            {selectedOption === 'unique' ? details.uniquePrice : selectedOption === 'fractionne' ? `${details.fractionne} / mois` : `${details.splitFirst}`}
                        </div>
                        {selectedOption === 'split' && !isDeivs && (
                            <div className="text-[10px] text-slate-500 font-mono mt-1 font-medium">puis {details.splitSecond} après livraison</div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* FIKO PAY (DOMINANT) */}
                    <div className="border-2 border-[#E10600] bg-[#111111] p-6 relative group overflow-hidden cursor-pointer" onClick={handleMockPayment}>
                        <div className="absolute top-0 right-0 bg-[#E10600] text-white font-mono text-[0.6rem] tracking-[2px] uppercase px-4 py-1">
                            🔥 Recommandé
                        </div>
                        <div className="absolute inset-0 bg-[#E10600]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div>
                                <h3 className="font-sans font-bold text-xl mb-2 flex items-center gap-2">
                                    <span className="text-[#E10600]">⚡</span> Paiement instantané sécurisé
                                </h3>
                                <p className="font-mono text-[0.75rem] text-[#8B8B8B] tracking-[1px] uppercase mb-4">
                                    Activation automatique immédiate
                                </p>
                                <div className="flex gap-3 text-2xl">
                                    {/* Logos placeholders */}
                                    <span className="bg-white/10 px-3 py-1 text-xs font-mono font-bold pt-2">CARTE</span>
                                    <span className="bg-[#FFCC00]/20 text-[#FFCC00] px-3 py-1 text-xs font-mono font-bold pt-2">MTN MoMo</span>
                                    <span className="bg-[#FF6600]/20 text-[#FF6600] px-3 py-1 text-xs font-mono font-bold pt-2">Orange Money</span>
                                    <span className="bg-[#0055A5]/20 text-[#0055A5] px-3 py-1 text-xs font-mono font-bold pt-2">Moov Money</span>
                                </div>
                            </div>
                            <button className="bg-[#E10600] text-white font-mono font-bold text-[0.7rem] tracking-[2px] uppercase py-3 px-8 hover:bg-[#FF1A1A] transition-colors whitespace-nowrap">
                                Traitement Paystack
                            </button>
                        </div>
                    </div>

                    {/* WAVE */}
                    <div className="border border-white/10 bg-[#111111] p-6 relative group transition-colors hover:border-[#1ADBD8]/40">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div>
                                <h3 className="font-sans font-bold text-xl mb-2 flex items-center gap-2 text-[#1ADBD8]">
                                    🌊 Paiement sécurisé Wave Côte d'Ivoire
                                </h3>
                                <p className="font-mono text-[0.75rem] text-[#8B8B8B] tracking-[1px]">
                                    Envoyez ensuite votre reçu sur WhatsApp pour validation rapide.
                                </p>
                            </div>
                            <a 
                                href="https://pay.wave.com/m/M_ci_QhupFjrz9V5q/c/ci/" 
                                target="_blank" 
                                rel="noreferrer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleMockPayment();
                                }}
                                className="bg-[#1ADBD8] text-[#0A0A0A] font-mono font-bold text-[0.7rem] tracking-[2px] uppercase py-3 px-8 text-center"
                            >
                                ⚡ Payer avec Wave
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* VIREMENT */}
                        <div 
                            className="border border-white/10 bg-[#111111] p-6 cursor-pointer hover:border-white/30 transition-colors"
                            onClick={() => setSelectedMethod(selectedMethod === 'virement' ? null : 'virement')}
                        >
                            <h3 className="font-sans font-bold text-lg mb-2">🟦 Virement Bancaire</h3>
                            <p className="font-mono text-[0.65rem] text-[#8B8B8B] tracking-[1px] uppercase">Afficher les coordonnées</p>
                            
                            <AnimatePresence>
                                {selectedMethod === 'virement' && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-black/50 p-4 border border-white/5 font-mono text-[0.7rem] leading-relaxed relative">
                                            <div className="mb-2"><span className="text-[#4A4A4A]">IBAN:</span><br/>CI93 CI201 01001 101921718491 12</div>
                                            <div className="mb-2"><span className="text-[#4A4A4A]">BIC:</span><br/>BDAJCIAB</div>
                                            <div className="mb-2"><span className="text-[#4A4A4A]">Titulaire:</span><br/>KOFFMANN GROUP</div>
                                            <div><span className="text-[#4A4A4A]">Agence:</span><br/>Cocody</div>
                                            <button 
                                                className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-xs tracking-[1px] uppercase"
                                                onClick={(e) => { e.stopPropagation(); handleMockPayment(); }}
                                            >
                                                📋 Simulation Copie & Validation
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ESPECES */}
                        <div 
                            className="border border-white/10 bg-[#111111] p-6 cursor-pointer hover:border-white/30 transition-colors"
                            onClick={() => setSelectedMethod(selectedMethod === 'especes' ? null : 'especes')}
                        >
                            <h3 className="font-sans font-bold text-lg mb-2 text-[#FF9900]">🟠 Versement Espèces</h3>
                            <p className="font-mono text-[0.65rem] text-[#8B8B8B] tracking-[1px] uppercase">Versement Crédit Access</p>
                            
                            <AnimatePresence>
                                {selectedMethod === 'especes' && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-black/50 p-4 border border-white/5 font-mono text-[0.7rem] leading-relaxed">
                                            Effectuez un versement au nom de :<br/>
                                            <strong className="text-white mt-2 block">KOFFMANN GROUP</strong>
                                            <button 
                                                className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-xs tracking-[1px] uppercase"
                                                onClick={(e) => { e.stopPropagation(); handleMockPayment(); }}
                                            >
                                                Simuler Envoi Prép.
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* CHEQUE */}
                        <div 
                            className="border border-white/10 bg-[#111111] p-6 cursor-pointer hover:border-white/30 transition-colors"
                            onClick={() => setSelectedMethod(selectedMethod === 'cheque' ? null : 'cheque')}
                        >
                            <h3 className="font-sans font-bold text-lg mb-2">⚫ Chèque de Banque</h3>
                            <p className="font-mono text-[0.65rem] text-[#8B8B8B] tracking-[1px] uppercase">Remise en agence</p>
                            
                            <AnimatePresence>
                                {selectedMethod === 'cheque' && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-black/50 p-4 border border-white/5 font-mono text-[0.7rem] leading-relaxed">
                                            À l'ordre de :<br/>
                                            <strong className="text-white mt-2 block">KOFFMANN GROUP</strong>
                                            <button 
                                                className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-xs tracking-[1px] uppercase"
                                                onClick={(e) => { e.stopPropagation(); handleMockPayment(); }}
                                            >
                                                Simuler Remise
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FikoPayCenter;
