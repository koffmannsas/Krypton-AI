import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Zap, ArrowRight, Bot, Target, TrendingUp } from 'lucide-react';

interface FikoWelcomeModalProps {
  onAccept: () => void;
}

export default function FikoWelcomeModal({ onAccept }: FikoWelcomeModalProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF2718]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-[#0D0D12] border border-white/10 rounded-[40px] p-10 relative shadow-2xl overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF2718] to-transparent" />
        
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#FF2718]/10 rounded-3xl flex items-center justify-center mb-8 border border-[#FF2718]/20 relative">
            <Bot size={40} className="text-[#FF2718]" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 bg-[#FF2718]/20 blur-xl rounded-full -z-10"
            />
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2718]">Fiko Intelligence</h2>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">Message Prioritaire</h3>
          </div>

          <div className="space-y-6 mb-10">
            <p className="text-xl font-bold text-white/90 italic">
              "Vos agents sont en veille."
            </p>
            
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                Un agent commercial Fiko actif transforme <span className="text-[#FF2718] font-black">18%</span> des visiteurs froids en leads chauds.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed font-bold">
                Votre site doit devenir votre meilleur commercial 24h/24.
              </p>
            </div>

            <p className="text-sm text-slate-400">
              Activez-moi dès maintenant pour commencer la capture.
            </p>
          </div>

          <button 
            onClick={onAccept}
            className="group relative w-full bg-[#FF2718] hover:bg-[#FF3728] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            Passer à l'action <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
