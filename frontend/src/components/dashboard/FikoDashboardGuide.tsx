import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: TutorialStep[] = [
  {
    title: "Operations Center",
    description: "Pilotez vos agents IA et orchestrez vos stratégies de vente en temps réel.",
    icon: <Zap size={24} className="text-[#FF2718]" />
  },
  {
    title: "Market & Growth",
    description: "Analysez les tendances du marché, les relations et la santé de votre business d'un coup d'oeil.",
    icon: <Activity size={24} className="text-blue-500" />
  },
  {
    title: "Intelligence & Context",
    description: "Accédez à la mémoire de vos agents et configurez leurs modes stratégiques.",
    icon: <Sparkles size={24} className="text-purple-500" />
  }
];

interface FikoDashboardGuideProps {
  onComplete: () => void;
}

export default function FikoDashboardGuide({ onComplete }: FikoDashboardGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-10 left-10 z-[500] w-full max-w-sm"
    >
      <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#FF2718]" />
        
        <button 
          onClick={onComplete}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 bg-white/5 rounded-xl flex items-center justify-center">
                {STEPS[currentStep].icon}
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF2718]">Tutoriel Dynamique</h4>
                <h3 className="text-sm font-bold text-white">{STEPS[currentStep].title}</h3>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              {STEPS[currentStep].description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-1">
                {STEPS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all ${i === currentStep ? 'w-4 bg-[#FF2718]' : 'w-2 bg-white/10'}`} 
                  />
                ))}
              </div>
              
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-[#FF2718] transition-colors"
              >
                {currentStep === STEPS.length - 1 ? 'Terminer' : 'Suivant'} <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
