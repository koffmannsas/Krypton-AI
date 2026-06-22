import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Lock,
  Fingerprint,
  Sparkles,
  Loader2,
} from "lucide-react";
import { ProspectInfo } from "../types";
import { sendToFiko } from "../services/fikoAPI";

interface FikoCaptureModalProps {
  onClose: () => void;
  onSubmit: (info: ProspectInfo) => void;
}

const FikoCaptureModal: React.FC<FikoCaptureModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProspectInfo>({
    firstName: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.email) return;

    setIsSubmitting(true);
    // Simulation de synchronisation neurale
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Backdrop cinématique avec flou progressif */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Unité de Commande FIKO - Format Compact & Sleek */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        className="relative w-full max-w-[420px] bg-[#0D0D12]/90 border border-white/10 rounded-sm shadow-[0_0_100px_rgba(255,39,24,0.15)] overflow-hidden backdrop-blur-3xl"
      >
        {/* Ligne de Scan Laser active */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FF2718] to-transparent animate-scanline z-20"></div>
        <div className="absolute inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>

        {/* Header Minimaliste */}
        <div className="p-6 md:p-8 pb-4 flex justify-between items-start relative z-10">
          <div className="flex items-center gap-4">
            <div className="size-10 bg-[#FF2718]/10 border border-[#FF2718]/30 flex items-center justify-center text-[#FF2718] rounded-sm shadow-[0_0_20px_rgba(255,39,24,0.1)]">
              <Fingerprint size={22} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[#FF2718] text-[8px] font-black uppercase tracking-[0.4em]">
                Auth Protocol v1.3
              </p>
              <h3 className="text-xl font-black uppercase tracking-tighter text-white">
                Neural_ID.
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center text-slate-500 hover:text-white transition-all hover:bg-white/5 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulaire Tactile */}
        <div className="px-6 md:px-8 pb-10 space-y-8 relative z-10">
          <p className="text-slate-400 text-[11px] font-medium italic leading-relaxed border-l border-[#FF2718]/40 pl-4 uppercase tracking-widest">
            Synchronisation de votre profil pour activer ma mémoire
            cross-device.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Prénom */}
            <div className="relative group">
              <div
                className={`absolute left-0 bottom-0 h-[1px] bg-[#FF2718] transition-all duration-500 z-10 ${focusedField === "firstName" ? "w-full opacity-100" : "w-0 opacity-0"}`}
              ></div>
              <div
                className={`flex items-center gap-4 px-4 py-4 bg-white/[0.02] border-b border-white/5 transition-all ${focusedField === "firstName" ? "bg-white/[0.05]" : "group-hover:bg-white/[0.03]"}`}
              >
                <User
                  size={16}
                  className={
                    focusedField === "firstName"
                      ? "text-[#FF2718]"
                      : "text-slate-600"
                  }
                />
                <input
                  required
                  autoFocus
                  type="text"
                  placeholder="VOTRE PRÉNOM"
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-none outline-none w-full text-[10px] font-black uppercase tracking-[0.2em] text-white placeholder:text-slate-800"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Champ Email */}
            <div className="relative group">
              <div
                className={`absolute left-0 bottom-0 h-[1px] bg-[#FF2718] transition-all duration-500 z-10 ${focusedField === "email" ? "w-full opacity-100" : "w-0 opacity-0"}`}
              ></div>
              <div
                className={`flex items-center gap-4 px-4 py-4 bg-white/[0.02] border-b border-white/5 transition-all ${focusedField === "email" ? "bg-white/[0.05]" : "group-hover:bg-white/[0.03]"}`}
              >
                <Mail
                  size={16}
                  className={
                    focusedField === "email"
                      ? "text-[#FF2718]"
                      : "text-slate-600"
                  }
                />
                <input
                  required
                  type="email"
                  placeholder="EMAIL PROFESSIONNEL"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-none outline-none w-full text-[10px] font-black uppercase tracking-[0.2em] text-white placeholder:text-slate-800"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Champ Téléphone */}
            <div className="relative group">
              <div
                className={`absolute left-0 bottom-0 h-[1px] bg-[#FF2718] transition-all duration-500 z-10 ${focusedField === "phone" ? "w-full opacity-100" : "w-0 opacity-0"}`}
              ></div>
              <div
                className={`flex items-center gap-4 px-4 py-4 bg-white/[0.02] border-b border-white/5 transition-all ${focusedField === "phone" ? "bg-white/[0.05]" : "group-hover:bg-white/[0.03]"}`}
              >
                <Phone
                  size={16}
                  className={
                    focusedField === "phone"
                      ? "text-[#FF2718]"
                      : "text-slate-600"
                  }
                />
                <input
                  required
                  type="tel"
                  placeholder="TÉLÉPHONE"
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-none outline-none w-full text-[10px] font-black uppercase tracking-[0.2em] text-white placeholder:text-slate-800"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Badge Sécurité Chiffré */}
            <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5">
              <Lock size={12} className="text-slate-600 flex-shrink-0" />
              <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                VOS DONNÉES SONT PROTÉGÉES PAR LE NOYAU KRYPTON-SEC (AES-512).
              </p>
            </div>

            {/* Bouton CTA - PARLER À FIKO */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group overflow-hidden bg-[#FF2718] py-6 shadow-2xl shadow-red-500/20 disabled:opacity-50 transition-transform active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-5 text-[10px] font-black uppercase tracking-[0.4em] text-white">
                {isSubmitting ? (
                  <>
                    SYNC_NEURALE <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    PARLER À FIKO{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer du Modal avec statuts badges */}
          <div className="flex items-center justify-between pt-4 opacity-40">
            <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-widest text-slate-500">
              <ShieldCheck size={12} className="text-emerald-500" />{" "}
              IDENTITY_VERIFIED
            </div>
            <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-widest text-slate-500">
              <Sparkles size={12} className="text-blue-500" /> CROSS_DEVICE_MEM
            </div>
          </div>
        </div>
      </motion.div>

      {/* Style local pour l'animation de scan laser */}
      <style>{`
        @keyframes scanline-laser {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline-laser 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default FikoCaptureModal;
