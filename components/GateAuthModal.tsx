import React, { useState } from "react";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Bot,
  X,
  ArrowLeft,
  Hash,
} from "lucide-react";
import { GATE_THEMES } from "../constants";
import { sendToFiko } from "../services/fikoAPI";

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
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black flex items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="absolute inset-0 hex-bg opacity-10 pointer-events-none"></div>

      <div className="max-w-xl w-full bg-[#1A1A1F] border border-white/10 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
        <div
          className="h-2 w-full"
          style={{ backgroundColor: theme.color }}
        ></div>

        {/* BOUTON FERMER HAUT DROITE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 size-10 flex items-center justify-center text-slate-500 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="p-12 lg:p-16 space-y-12 relative z-10">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-white text-[10px] font-black uppercase tracking-[0.5em]">
                BIENVENUE DANS L'UNIVERS KRYPTON
              </h2>
              <h3 className="text-4xl font-black uppercase tracking-tighter">
                PORTE {displayName}.
              </h3>
              <p className="text-slate-500 font-light italic text-lg tracking-wide">
                {theme.desc}
              </p>
            </div>
            <div
              className="size-16 rounded-sm flex items-center justify-center border border-white/10"
              style={{ color: theme.color }}
            >
              <Bot size={32} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 text-left">
              <div className="relative group">
                <Mail
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-white transition-colors"
                  size={18}
                />
                <input
                  required
                  type="email"
                  placeholder="VOTRE EMAIL PROFESSIONNEL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/5 p-6 pl-16 text-white text-xs font-black uppercase tracking-widest outline-none focus:border-white/20 transition-all"
                />
              </div>
              <div className="relative group">
                <Hash
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-white transition-colors"
                  size={18}
                />
                <input
                  required
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="CODE DE SÉCURITÉ (CHIFFRES)"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="w-full bg-black border border-white/5 p-6 pl-16 text-white text-xs font-black uppercase tracking-widest outline-none focus:border-white/20 transition-all"
                />
              </div>
              <p className="text-[8px] text-slate-600 uppercase tracking-[0.3em] font-black ml-2">
                Le mot de passe doit être numérique (0-9).
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || password.length < 4}
              className="w-full py-8 text-white font-black text-xs uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-6 relative group overflow-hidden disabled:opacity-30"
              style={{ backgroundColor: theme.color }}
            >
              <span className="relative z-10">
                {isLoading ? "SÉCURISATION..." : "SÉCURISER MON ACCÈS"}
              </span>
              {!isLoading && (
                <ArrowRight
                  size={20}
                  className="relative z-10 group-hover:translate-x-3 transition-transform"
                />
              )}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          </form>

          <div className="flex flex-col gap-6 pt-4">
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Retour aux tarifs
            </button>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" /> AES-512
                KRYPTON-NET
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest">
                SESSION SÉCURISÉE
              </p>
            </div>
          </div>
        </div>

        {/* Narrator FIKO Tooltip */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-sm text-center">
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">
            "Je sécurise votre accès pour protéger vos futurs actifs IA." — FIKO
          </p>
        </div>
      </div>
    </div>
  );
};

export default GateAuthModal;
