import React, { useState, useEffect } from "react";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Bot,
  X,
  ArrowLeft,
  Hash,
  Cpu,
  Lock,
  Activity,
  Zap,
  Globe,
  Fingerprint,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GATE_THEMES } from "../constants";

interface GateAuthModalProps {
  gate: string;
  onSuccess: () => void;
  onClose: () => void;
}

const OFFER_NAMES: Record<string, string> = {
  TERRA: "TERRA",
  MARS: "MARS",
  KRYPTON: "KRYPTON",
  GALAXY: "GALAXY",
};

const GateAuthModal: React.FC<GateAuthModalProps> = ({
  gate,
  onSuccess,
  onClose,
}) => {
  const theme = GATE_THEMES[gate] || GATE_THEMES.MARS;
  const displayName = OFFER_NAMES[gate] || gate;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [scanPos, setScanPos] = useState(0);

  // Simulated scan animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(prev => (prev > 100 ? 0 : prev + 0.5));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handlePasswordChange = (val: string) => {
    const numericValue = val.replace(/[^0-9]/g, "");
    setPassword(numericValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-3 sm:p-6"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 hex-bg opacity-[0.05]" />
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              y: [null, "-10%", "110%"],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute size-px bg-[#FF2718] shadow-[0_0_10px_#FF2718]"
          />
        ))}

        {/* Ambient Glows */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF2718]/10 blur-[150px] rounded-full"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full relative group"
      >
        {/* Futuristic Corner Brackets */}
        <div className="absolute -top-3 -left-3 size-12 border-t-2 border-l-2 border-[#FF2718]/40 rounded-tl-2xl z-20 pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 size-12 border-b-2 border-r-2 border-[#FF2718]/40 rounded-br-2xl z-20 pointer-events-none" />

        <div className="relative bg-[#0D0D12]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
          {/* Internal Scan Beam */}
          <div 
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF2718]/50 to-transparent z-30 pointer-events-none shadow-[0_0_10px_#FF2718]"
            style={{ top: `${scanPos}%` }}
          />

          {/* Close Button UI */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 size-10 flex items-center justify-center text-slate-500 hover:text-white transition-all bg-white/5 hover:bg-[#FF2718]/20 border border-white/5 rounded-xl group"
          >
            <X size={16} className="group-hover:rotate-90 transition-transform relative z-10" />
          </button>

          <div className="p-6 sm:p-8 space-y-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className="relative group shrink-0">
                <div className="absolute -inset-4 bg-[#FF2718]/20 blur-2xl rounded-full opacity-50 transition-all duration-700" />
                <div
                  className="size-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-xl relative"
                  style={{ color: theme.color }}
                >
                  <Bot size={28} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 bg-[#FF2718] rounded-full animate-pulse shadow-[0_0_8px_#FF2718]" />
                  <h2 className="text-white text-[8px] font-black uppercase tracking-[0.4em] opacity-80">
                    PROTECTION SÉCURISÉE
                  </h2>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter leading-none">
                  PORTE <span className="text-[#FF2718] italic">{displayName}</span>
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className={`relative group transition-all duration-300 ${isFocused === 'email' ? 'translate-x-1' : ''}`}>
                  <Mail
                    className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused === 'email' ? 'text-[#FF2718]' : 'text-slate-600'}`}
                    size={16}
                  />
                  <input
                    required
                    type="email"
                    placeholder="EMAIL_PROFESSIONNEL"
                    value={email}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused(null)}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 p-4 pl-12 rounded-xl text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#FF2718]/40 transition-all backdrop-blur-xl"
                  />
                </div>

                <div className={`relative group transition-all duration-300 ${isFocused === 'password' ? 'translate-x-1' : ''}`}>
                  <Lock
                    className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused === 'password' ? 'text-[#FF2718]' : 'text-slate-600'}`}
                    size={16}
                  />
                  <input
                    required
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="CODE_PIN_SÉCURITÉ"
                    value={password}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused(null)}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 p-4 pl-12 rounded-xl text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#FF2718]/40 transition-all backdrop-blur-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || password.length < 4}
                className="group relative w-full py-5 rounded-2xl overflow-hidden shadow-2xl transition-all active:scale-[0.98] disabled:opacity-20 mt-2"
              >
                <div 
                  className="absolute inset-0 transition-opacity duration-300 opacity-90 group-hover:opacity-100"
                  style={{ backgroundColor: theme.color }}
                />
                
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-white font-black text-[10px] uppercase tracking-[0.4em]">
                    {isLoading ? "SYSTÈME_BUSY..." : "SÉCURISER_L_ACCÈS"}
                  </span>
                  {!isLoading && (
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  )}
                  {isLoading && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                      <Cpu size={16} />
                    </motion.div>
                  )}
                </div>
              </button>
            </form>

            <div className="space-y-4">
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-all group mx-auto"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                ANNULER_CONNEXION
              </button>

              <div className="flex items-center justify-between opacity-30 text-[8px] font-black uppercase tracking-widest border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-[#FF2718]" /> AES-512_LINK
                </div>
                <div className="flex items-center gap-2 text-[#FF2718]">
                  <Activity size={12} /> CORE:ONLINE
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GateAuthModal;
