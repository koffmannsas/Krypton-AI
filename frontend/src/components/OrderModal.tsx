import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  Upload,
  Send,
  MessageSquare,
  Clock,
  FileText,
  Bot,
  HelpCircle,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { sendToFiko } from "../services/fikoAPI";

interface OrderModalProps {
  porte: string;
  onClose: () => void;
  onComplete: (porte: string) => void;
}

const OFFER_NAMES: Record<string, string> = {
  TERRA: "TERRA",
  MARS: "MARS",
  KRYPTON: "KRYPTON",
  GALAXY: "GALAXY",
};

const OrderModal: React.FC<OrderModalProps> = ({
  porte,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const displayName = OFFER_NAMES[porte] || porte;
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryOption, setRecoveryOption] = useState<
    "none" | "clarify" | "later" | "recap"
  >("none");
  const [clarificationInput, setClarificationInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const inactivityTimerRef = useRef<number | null>(null);

  const prices: Record<string, string> = {
    TERRA: "700 000 FCFA",
    MARS: "1 790 000 FCFA",
    KRYPTON: "DÈS 3 900 000 FCFA",
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current)
      window.clearTimeout(inactivityTimerRef.current);
    if (!showRecovery && step < 3) {
      inactivityTimerRef.current = window.setTimeout(() => {
        setShowRecovery(true);
      }, 30000);
    }
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current)
        window.clearTimeout(inactivityTimerRef.current);
    };
  }, [step, showRecovery]);

  useEffect(() => {
    if (step === 3) {
      const redirectTimer = setTimeout(() => {
        onComplete(porte);
      }, 2500);
      return () => clearTimeout(redirectTimer);
    }
  }, [step, porte, onComplete]);

  const handleContinueLater = () => {
    setRecoveryOption("later");
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const handleRecapRequest = () => {
    setRecoveryOption("recap");
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRecovery(false);
    }, 2500);
  };

  const handleBack = () => {
    if (step > 1 && step < 3) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  if (showRecovery) {
    return (
      <div className="fixed inset-0 z-[130] bg-[#0B0B0F]/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="max-w-2xl w-full bg-[#1A1A1F] border border-[#FF2718]/30 p-12 lg:p-20 rounded-sm shadow-[0_0_150px_rgba(255,39,24,0.4)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
            <Bot size={200} />
          </div>

          <div className="flex items-center gap-6 mb-12">
            <div className="size-16 bg-[#FF2718] rounded-sm flex items-center justify-center shadow-2xl">
              <Bot className="text-white" size={32} />
            </div>
            <div>
              <p className="text-[#FF2718] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                ASSISTANT DE CLOSING FIKO™
              </p>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white">
                INTERVENTION DISCRÈTE.
              </h4>
            </div>
          </div>

          <div className="space-y-12 relative z-10">
            {recoveryOption === "none" && (
              <>
                <p className="text-xl text-slate-300 font-light italic leading-relaxed">
                  « Je vois que vous avez mis la finalisation en pause. C’est
                  tout à fait normal. Souhaitez-vous que je clarifie un point ou
                  que je sauvegarde votre projet pour plus tard ? »
                </p>
                <div className="grid gap-4">
                  <button
                    onClick={() => setRecoveryOption("clarify")}
                    className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-[#FF2718] hover:bg-[#FF2718]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle size={20} className="text-[#FF2718]" />
                      <span className="text-xs font-black uppercase tracking-widest">
                        Clarifier un point rapidement
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
                    />
                  </button>
                  <button
                    onClick={handleContinueLater}
                    className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-[#FF2718] hover:bg-[#FF2718]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <Clock size={20} className="text-[#FF2718]" />
                      <span className="text-xs font-black uppercase tracking-widest">
                        Continuer plus tard
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
                    />
                  </button>
                  <button
                    onClick={handleRecapRequest}
                    className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-[#FF2718] hover:bg-[#FF2718]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <FileText size={20} className="text-[#FF2718]" />
                      <span className="text-xs font-black uppercase tracking-widest">
                        Recevoir le récapitulatif
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
                    />
                  </button>
                </div>
                <button
                  onClick={() => setShowRecovery(false)}
                  className="w-full text-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-colors py-4"
                >
                  Non, je finalise maintenant
                </button>
              </>
            )}
            {/* Rest of recovery logic stays the same */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500"
      onMouseMove={resetInactivityTimer}
      onClick={resetInactivityTimer}
      onKeyDown={resetInactivityTimer}
    >
      <div className="bg-[#0B0B0F] border border-white/10 w-full max-w-5xl rounded-sm shadow-[0_0_150px_rgba(255,39,24,0.3)] overflow-hidden relative flex flex-col lg:flex-row">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 size-12 flex items-center justify-center text-slate-500 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="lg:w-1/3 bg-[#1A1A1F] p-12 border-r border-white/5 space-y-12">
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF2718]">
              ESPACE FINALISATION
            </h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter text-white">
              RÉSUMÉ <br />
              DE COMMANDE.
            </h3>
          </div>

          <div className="space-y-8">
            <div className="p-8 border border-[#FF2718]/30 bg-[#FF2718]/5 space-y-4">
              <p className="text-[9px] font-black text-[#FF2718] uppercase tracking-widest">
                OFFRE SÉLECTIONNÉE
              </p>
              <p className="text-2xl font-black text-white">
                PORTE {displayName}
              </p>
              <p className="text-3xl font-black text-white mt-4">
                {prices[porte]}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                SERVICES ACTIVÉS :
              </p>
              {[
                "Fiko™ Closer Premium",
                "Architecture IA v1.0",
                "Espace Client Dédié",
                "Support Prioritaire",
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400"
                >
                  <Check size={14} className="text-emerald-500" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex items-center gap-4 opacity-50">
            <ShieldCheck size={20} className="text-emerald-500" />
            <p className="text-[9px] font-black uppercase tracking-[0.3em]">
              TRANSACTION SÉCURISÉE KRYPTON-NET
            </p>
          </div>
        </div>

        <div className="lg:w-2/3 p-12 lg:p-24 space-y-16 overflow-y-auto max-h-[90vh] relative">
          {step < 3 && (
            <button
              onClick={handleBack}
              className="absolute top-8 left-12 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              {step === 1 ? "Quitter" : "Retour"}
            </button>
          )}

          {step === 1 && (
            <div className="space-y-12 animate-in slide-in-from-right-8 pt-10">
              <div className="space-y-6">
                <h4 className="text-2xl font-black uppercase tracking-tight">
                  MÉTHODE DE RÈGLEMENT
                </h4>
                <p className="text-slate-500 font-light italic text-lg tracking-widest leading-relaxed">
                  "Privilégiez le virement bancaire pour une activation
                  immédiate de vos serveurs."
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => setStep(2)}
                  className="p-8 border border-[#FF2718] bg-[#FF2718]/5 text-left group hover:bg-[#FF2718] hover:text-white transition-all"
                >
                  <Building2 size={32} className="mb-6" />
                  <p className="text-xs font-black uppercase tracking-widest">
                    Virement Bancaire
                  </p>
                  <p className="text-[9px] mt-2 opacity-60 uppercase tracking-widest">
                    Priorité Élevée
                  </p>
                </button>
                <button className="p-8 border border-white/10 text-left opacity-30 cursor-not-allowed">
                  <CreditCard size={32} className="mb-6" />
                  <p className="text-xs font-black uppercase tracking-widest">
                    Paiement Mobile
                  </p>
                  <p className="text-[9px] mt-2 uppercase tracking-widest">
                    Bientôt disponible
                  </p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12 animate-in slide-in-from-right-8 pt-10">
              <div className="space-y-6">
                <h4 className="text-2xl font-black uppercase tracking-tight">
                  COORDONNÉES DE DÉPÔT
                </h4>
                <div className="bg-black border border-white/5 p-10 space-y-6 font-mono text-xs uppercase tracking-[0.2em]">
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span>BANQUE</span> <span>BOA - KRYPTON GROUP</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span>COMPTE (IBAN)</span>{" "}
                    <span>SN90 0000 0000 0000 0000 00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DESTINATAIRE</span>{" "}
                    <span>KRYPTON AI SYSTEMS S.A.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black text-[#FF2718] uppercase tracking-[0.4em]">
                  ENVOYER LA PREUVE DE VIREMENT
                </p>
                <div className="flex gap-4">
                  <button className="flex-grow bg-white/5 border border-dashed border-white/20 py-10 flex flex-col items-center justify-center gap-4 hover:border-[#FF2718] transition-all text-slate-500">
                    <Upload size={24} />{" "}
                    <span className="text-[9px] font-black tracking-widest uppercase">
                      Téléverser Reçu
                    </span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-[#FF2718] px-12 text-white font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-red-700 transition-all"
                  >
                    VALIDER <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-12 animate-in zoom-in-95">
              <div className="size-32 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <Check size={64} />
              </div>
              <div className="space-y-4">
                <h4 className="text-5xl font-black uppercase tracking-tighter">
                  FÉLICITATIONS.
                </h4>
                <p className="text-slate-500 text-lg uppercase tracking-widest font-bold">
                  VOTRE PROJET EST MAINTENANT LANCÉ.
                </p>
              </div>
              <p className="text-slate-400 italic max-w-md mx-auto">
                "L'équipe Krypton AI a été notifiée. Votre accès dashboard sera
                activé dès validation du transfert."
              </p>
              <button
                onClick={() => onComplete(porte)}
                className="bg-white text-black px-16 py-8 font-black text-[10px] uppercase tracking-[0.5em] hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                ACCÉDER À MON DASHBOARD <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
