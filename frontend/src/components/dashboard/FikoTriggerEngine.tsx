import React, { useEffect, useState } from "react";
import { UserProfile, Opportunity } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ArrowRight, X, Sparkles } from "lucide-react";
import { opportunityEngine } from "../../services/opportunityEngine";

interface FikoTriggerEngineProps {
  user: UserProfile;
  opportunities: Opportunity[];
  onAccept: (opp: Opportunity) => void;
}

const MESSAGES = [
  "Je peux vous aider à optimiser votre système.",
  "Une opportunité de croissance a été détectée.",
  "Votre infrastructure intelligente est en veille active.",
  "Voulez-vous que j'analyse vos derniers leads ?"
];

export default function FikoTriggerEngine({ user, opportunities, onAccept }: FikoTriggerEngineProps) {
  const [activeTrigger, setActiveTrigger] = useState<Opportunity | null>(null);
  const [ambientMessageIndex, setAmbientMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Cycle ambient messages
  useEffect(() => {
    const timer = setInterval(() => {
      setAmbientMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-trigger the highest value opportunity if not dismissed recently
  useEffect(() => {
    if (opportunities.length > 0 && !activeTrigger) {
      const topOpp = [...opportunities]
        .filter(o => o.status === 'open')
        .sort((a, b) => b.value - a.value)[0];
        
      if (topOpp) {
        const timer = setTimeout(() => {
           setActiveTrigger(topOpp);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [opportunities]);

  const handleAction = async () => {
    if (!activeTrigger) return;
    await opportunityEngine.markAsClicked(activeTrigger.id);
    onAccept(activeTrigger);
    setActiveTrigger(null);
  };

  const generateFikoMessage = (opp: Opportunity) => {
    switch (opp.type) {
      case 'upgrade':
        return {
           diag: "J'ai analysé votre activité réseau.",
           proj: `Votre trafic actuel peut générer +${opp.impact} leads par mois. C'est +${(opp.value / 1000000).toFixed(1)}M FCFA de CA.`,
           sol: "Vous n'avez pas besoin de plus de trafic. Vous avez besoin d'un système qui convertit et gère ce volume automatiquement.",
           act: "Passez sur le plan ELITE et je m'occupe d'automatiser vos relances."
        };
      case 'activation_agents':
         return {
           diag: "Vos agents sont en veille.",
           proj: "Un agent commercial Fiko actif transforme 18% des visiteurs froids en leads chauds.",
           sol: "Votre site doit devenir votre meilleur commercial 24h/24.",
           act: "Activez-moi dès maintenant pour commencer la capture."
        };
      case 'conversion_optimization':
         return {
           diag: "J'ai détecté une faille de conversion.",
           proj: "Vous générez des leads, mais le closing est lent. C'est une perte sèche de liquidité.",
           sol: "L'IA peut qualifier le besoin avant de vous passer l'appel.",
           act: "Optimisez vos tunnels maintenant et laissez-moi filtrer les touristes."
        };
      default:
        return {
           diag: "Analyse système terminée.",
           proj: "Des gisements de croissance inexploités ont été détectés.",
           sol: "La technologie Krypton est déployée mais sous-utilisée.",
           act: "Voyons votre stratégie ensemble."
        };
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {activeTrigger && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[400px] z-[100] shadow-2xl"
          >
            <div className="bg-[#111116] border border-[#FF2718]/30 rounded-[32px] overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF2718] to-orange-500"></div>
              
              <button 
                onClick={() => setActiveTrigger(null)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white bg-white/5 rounded-full z-10"
              >
                <X size={14} />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="size-12 rounded-2xl bg-[#FF2718]/10 flex items-center justify-center text-[#FF2718] border border-[#FF2718]/20">
                      <Bot size={24} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-[#111116]"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-white">Fiko Intelligence</h4>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#FF2718] opacity-80">Message Prioritaire</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {Object.values(generateFikoMessage(activeTrigger)).map((text, i) => (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      key={i} 
                      className="text-sm font-medium italic text-slate-300 leading-relaxed"
                    >
                      "{text}"
                    </motion.p>
                  ))}
                </div>

                <button 
                  onClick={handleAction}
                  className="w-full py-4 bg-[#FF2718] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-2 group"
                >
                  Passer à l'action <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Fiko Assistant Tooltip - Living UI */}
      <AnimatePresence>
        {!activeTrigger && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute bottom-[calc(100%+16px)] right-0 whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-1'}`}
          >
            <div className="bg-[#111116] border border-[#FF2718]/30 px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(255,39,24,0.1)] flex items-center gap-3 backdrop-blur-xl">
              <div className="relative">
                <Sparkles size={14} className="text-[#FF2718]" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#FF2718]/20 rounded-full blur-sm"
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={ambientMessageIndex}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className="text-[11px] font-bold text-slate-200 tracking-wide"
                >
                  {MESSAGES[ambientMessageIndex]}
                </motion.div>
              </AnimatePresence>
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#111116] border-r border-b border-[#FF2718]/30 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onAccept({ id: "manual", type: "onboarding", title: "Assistant", description: "", value: 0, impact: 0, status: "open", userId: user.uid || user.id, createdAt: 0 })}
        className="relative cursor-pointer"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="size-16 bg-[#111116] border-2 border-[#FF2718]/30 hover:border-[#FF2718] rounded-full shadow-[0_0_30px_rgba(255,39,24,0.15)] hover:shadow-[0_0_50px_rgba(255,39,24,0.3)] flex items-center justify-center transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FF2718]/10 group-hover:bg-[#FF2718]/20 transition-colors"></div>
            <Bot size={24} className="text-[#FF2718] relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-[3px] border-[#111116] animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
