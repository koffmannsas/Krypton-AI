import React, { useState } from "react";
import { Page } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, XCircle } from "lucide-react";

interface FikoAddonOfferPageProps {
  addon: "SOLO" | "PILOT" | "ELITE" | "EMPIRE";
  onNavigate: (p: Page) => void;
  onOpenFiko: (gate: string) => void;
  onOpenVocal: (gate?: string) => void;
}

const Feature: React.FC<{ children: React.ReactNode; highlighted?: boolean }> = ({ children, highlighted }) => (
  <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-sm hover:border-[#FF2718]/30 transition-colors">
    <CheckCircle2 size={20} className={`${highlighted ? "text-[#FF2718]" : "text-emerald-500"} mt-1 flex-shrink-0`} />
    <span className="text-lg text-slate-300 font-medium">{children}</span>
  </div>
);

const addonData = {
  SOLO: {
    title: "Le point d'entrée de l'automatisation",
    description: "Une unité IA dédiée à la capture de leads et la réponse continue, conçue pour ne plus jamais manquer une opportunité.",
    price: "30 000 FCFA",
    features: [
      "Réponse automatique 24/7",
      "Capture et qualification basique",
      "Intégration directe au site web",
      "Hébergement cloud sécurisé",
      "Support standard par email"
    ],
    gate: "TERRA"
  },
  PILOT: {
    title: "Le copilote intelligent qui qualifie et convertit",
    description: "Votre agent prend le contrôle de l'avant-vente avec une analyse comportementale et une redirection intelligente.",
    price: "60 000 FCFA",
    features: [
      "Toutes les fonctions SOLO",
      "Qualification avancée (Machine Learning)",
      "Redirection WhatsApp Intelligente",
      "Analyse comportementale des visiteurs",
      "Support prioritaire"
    ],
    gate: "MARS"
  },
  ELITE: {
    title: "La machine de dominance commerciale",
    description: "Conclu vos ventes, amène du trafic automatique et met en place une stratégie totale.",
    price: "100 000 FCFA",
    features: [
      "Toutes les fonctions PILOT",
      "FiKO™ Closer : Négociation et Vente",
      "FiKO™ SEO : Trafic organique qualifié",
      "Stratégie de conversion sur-mesure",
      "Dashboard Analytics et Suivi de ROI"
    ],
    gate: "KRYPTON"
  },
  EMPIRE: {
    title: "L'écosystème sur-mesure absolu",
    description: "Le déploiement multi-agents personnalisé pour les leaders du marché.",
    price: "350 000 FCFA",
    features: [
      "Multi-Agents spécialisés (Support, Vente, SAV)",
      "Apprentissage continu sur vos données",
      "Acquisition de masse automatisée",
      "Déploiement en marque blanche",
      "Support VIP 24/7 par un ingénieur dédié"
    ],
    gate: "GALAXY"
  }
};

export default function FikoAddonOfferPage({ addon, onNavigate, onOpenFiko, onOpenVocal }: FikoAddonOfferPageProps) {
  const data = addonData[addon];
  const [isFikoLoading, setIsFikoLoading] = useState(false);

  const handleStartFiko = () => {
    setIsFikoLoading(true);
    setTimeout(() => {
      onOpenFiko(data.gate);
      setIsFikoLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] pt-32 pb-24 px-6 relative selection:bg-[#FF2718]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF2718]/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Col - Context */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-10">
          <div className="inline-flex items-center gap-3 bg-[#FF2718]/10 border border-[#FF2718]/30 px-4 py-2 rounded-full">
            <span className="size-2 bg-[#FF2718] rounded-full animate-pulse"></span>
            <span className="text-[#FF2718] text-xs font-black uppercase tracking-[0.2em]">Offre Module AI</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              FIKO UNITÉ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#FF2718]">
                {addon}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light italic leading-relaxed">
              {data.title}
            </p>
          </div>

          <div className="bg-[#15151A] p-8 border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2718]/10 blur-[40px] pointer-events-none"></div>
             <p className="text-white text-lg leading-relaxed">{data.description}</p>
          </div>

          <div className="space-y-4">
             <p className="font-mono text-sm text-[#FF2718] uppercase tracking-widest font-bold">Inclus dans la configuration :</p>
             <div className="grid grid-cols-1 gap-4">
               {data.features.map((feat, idx) => (
                 <Feature key={idx} highlighted={idx < 2}>{feat}</Feature>
               ))}
             </div>
          </div>
        </motion.div>

        {/* Right Col - ROI & Checkout */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:mt-12">
            
          <div className="sticky top-32 space-y-8">
            {/* Value box */}
            <div className="bg-[#1A1A24] border border-[#FF2718]/30 p-10 rounded-xl relative shadow-[0_0_50px_rgba(255,39,24,0.1)]">
               
               <div className="flex flex-col mb-8 pb-8 border-b border-white/5">
                 <span className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Mensualité Fixe</span>
                 <h2 className="text-5xl font-black text-white">{data.price} <span className="text-lg text-slate-500 font-medium tracking-normal">/ mois</span></h2>
               </div>

               <div className="space-y-6 mb-10">
                 <div className="flex items-center gap-4">
                   <ShieldCheck className="text-[#FF2718] w-8 h-8" />
                   <div>
                     <p className="text-white font-bold text-lg">Protection Anti-Perte</p>
                     <p className="text-slate-400 text-sm">Chaque prospect ignoré est pris en charge immédiatement.</p>
                   </div>
                 </div>
               </div>

               <div className="space-y-4">
                  <button 
                    onClick={handleStartFiko}
                    disabled={isFikoLoading}
                    className="w-full bg-[#FF2718] text-white py-5 rounded-full font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,39,24,0.4)] hover:bg-red-700 transition-all flex items-center justify-center gap-3"
                  >
                    {isFikoLoading ? <span className="animate-pulse">Connexion...</span> : "C'est parti → Validation"}
                  </button>
                  <p className="text-center text-xs text-slate-500 italic block">Paiement sécurisé et engagement transparent.</p>
               </div>
            </div>

            {/* Micro action vocale */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-xl flex items-center justify-between group hover:border-white/10 transition-colors cursor-pointer" onClick={() => onOpenVocal(data.gate)}>
                <div className="space-y-1">
                   <p className="text-sm font-bold text-white">Besoin d'en parler d'abord ?</p>
                   <p className="text-xs text-slate-400">Demandez conseil à Fiko en direct</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FF2718]/10 flex items-center justify-center text-[#FF2718] group-hover:bg-[#FF2718] group-hover:text-white transition-colors">
                   🎤
                </div>
            </div>
          </div>

        </motion.div>
      </div>

       <AnimatePresence>
        {isFikoLoading && (
           <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
                <div className="text-center space-y-6">
                    <div className="size-16 border-4 border-[#FF2718]/30 border-t-[#FF2718] rounded-full animate-spin mx-auto"></div>
                    <p className="text-[#FF2718] font-mono tracking-widest uppercase font-bold text-lg">Génération du contrat Fiko...</p>
                </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
