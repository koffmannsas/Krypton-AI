import React, { useEffect, useState } from "react";
import { UserProfile, Opportunity } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ArrowRight, X } from "lucide-react";
import { opportunityEngine } from "../../services/opportunityEngine";

interface FikoTriggerEngineProps {
  user: UserProfile;
  opportunities: Opportunity[];
  onAccept: (opp: Opportunity) => void;
}

export default function FikoTriggerEngine({ user, opportunities, onAccept }: FikoTriggerEngineProps) {
  const [activeTrigger, setActiveTrigger] = useState<Opportunity | null>(null);

  // Auto-trigger the highest value opportunity if not dismissed recently
  useEffect(() => {
    if (opportunities.length > 0 && !activeTrigger) {
      // Find the highest value open opportunity
      const topOpp = [...opportunities]
        .filter(o => o.status === 'open')
        .sort((a, b) => b.value - a.value)[0];
        
      if (topOpp) {
        // Delay to make it feel natural
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
    <AnimatePresence>
      {activeTrigger && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 w-[400px] z-[100] shadow-2xl"
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
  );
}
