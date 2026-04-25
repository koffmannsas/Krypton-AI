import React, { useEffect, useState } from "react";
import { Page } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mic,
  MessageSquare,
  Zap,
  Target,
  ShieldCheck,
  Cpu,
  Globe,
  Users,
  TrendingUp,
  Clock,
  ChevronRight,
  X,
  CreditCard,
  MessageCircle,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Activity,
  BarChart3,
  Rocket,
  Lock,
  Sparkles,
} from "lucide-react";

interface FikoLandingPageProps {
  onNavigate: (p: Page) => void;
  onOpenVocal: (gate?: string) => void;
  onOpenChat: () => void;
  onOpenFiko?: (gate: string) => void;
  onSelectOffer?: (offer: string) => void;
}

const FikoLandingPage: React.FC<FikoLandingPageProps> = ({
  onNavigate,
  onOpenVocal,
  onOpenChat,
  onOpenFiko,
  onSelectOffer,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [showChatBubble, setShowChatBubble] = useState(false);

  const OFFER_NAMES: Record<string, string> = {
    TERRA: "SOLO",
    MARS: "PILOT",
    KRYPTON: "ELITE",
    GALAXY: "EMPIRE",
  };

  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [upsellOffer, setUpsellOffer] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [finalOffer, setFinalOffer] = useState<string | null>(null);

  const handleOfferClick = (offer: string) => {
    setSelectedOffer(offer);
  };

  const handleWhatsApp = () => {
    const offer = selectedOffer || upsellOffer || "MARS";
    window.open(
      `https://wa.me/+2250544427676?text=Un%20expert%20FiKO%20prend%20le%20relais%20pour%20finaliser%20votre%20activation.%20(Offre%20${offer})`,
      "_blank",
    );
    setFinalOffer(offer);
    setSelectedOffer(null);
    setUpsellOffer(null);
    setShowSuccessScreen(true);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const currentOffer = selectedOffer;
      setSelectedOffer(null);
      if (currentOffer === "TERRA") {
        setUpsellOffer("MARS");
      } else if (currentOffer === "MARS") {
        setUpsellOffer("KRYPTON");
      } else {
        setFinalOffer(currentOffer || "MARS");
        setShowSuccessScreen(true);
      }
    }, 1500);
  };

  const handleDemo = () => {
    window.open("https://calendly.com", "_blank");
    setFinalOffer(selectedOffer || "MARS");
    setSelectedOffer(null);
    setShowSuccessScreen(true);
  };

  const handleUpsellAccept = () => {
    setFinalOffer(upsellOffer || "MARS");
    setUpsellOffer(null);
    setShowSuccessScreen(true);
  };

  const handleUpsellDecline = () => {
    const originalOffer =
      upsellOffer === "MARS"
        ? "TERRA"
        : upsellOffer === "KRYPTON"
          ? "MARS"
          : "MARS";
    setFinalOffer(originalOffer);
    setUpsellOffer(null);
    setShowSuccessScreen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 8000);

    const chatTimer = setTimeout(() => {
      setShowChatBubble(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(chatTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChatStep((prev) => (prev < 4 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const chatMessages = [
    { sender: "fiko", text: "Quel type d’activité avez-vous ?" },
    { sender: "client", text: "Une agence de consulting." },
    {
      sender: "fiko",
      text: "Combien de prospects qualifiés perdez-vous par semaine ?",
    },
    { sender: "client", text: "Au moins 10 par manque de temps." },
    {
      sender: "fiko",
      text: "Si FiKO closait seulement 20% de ces pertes, votre ROI serait de 400% dès le premier mois. On active votre unité ?",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF2718] selection:text-white relative overflow-hidden">
      {/* URGENCY BANNER */}
      <div className="bg-[#FF2718] text-white text-center py-3 px-4 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] z-[100] relative shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <AlertTriangle size={14} className="animate-pulse" />
          <span>
            ALERTE SYSTÈME : OFFRE DE LANCEMENT LIMITÉE - BONUS D'ACTIVATION
            DISPONIBLE
          </span>
          <AlertTriangle size={14} className="animate-pulse" />
        </div>
      </div>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF2718]/5 blur-[150px] rounded-full opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#FF2718]/5 blur-[200px] rounded-full opacity-20"></div>
        <div className="absolute inset-0 hex-bg opacity-[0.02]"></div>
      </div>

      {/* FLOATING CHAT BUBBLE */}
      <AnimatePresence>
        {showChatBubble && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            className="fixed bottom-24 right-8 z-[100] group"
          >
            <div
              onClick={() => {
                setShowChatBubble(false);
                onOpenChat();
              }}
              className="bg-[#0D0D12] border border-[#FF2718]/30 p-5 rounded-2xl shadow-[0_20px_50px_rgba(255,39,24,0.2)] max-w-[300px] cursor-pointer hover:border-[#FF2718] transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Sparkles size={12} className="text-[#FF2718]" />
              </div>
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-[#FF2718]/10 flex items-center justify-center flex-shrink-0 border border-[#FF2718]/20">
                  <Cpu size={24} className="text-[#FF2718]" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-[#FF2718] uppercase tracking-widest">
                    FIKO™ INTELLIGENCE
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium italic">
                    "Bonjour. Je détecte une opportunité de croissance majeure
                    sur votre site. Voulez-vous voir comment je peux la capturer
                    ?"
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowChatBubble(false);
                }}
                className="absolute -top-2 -right-2 size-6 bg-black border border-white/10 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY CTA BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] w-full max-w-md px-6">
        <button
          onClick={() => onNavigate(Page.FIKO_AUDIT)}
          className="w-full bg-[#FF2718] hover:bg-red-700 text-white py-5 rounded-full font-black text-xs uppercase tracking-[0.5em] shadow-[0_20px_60px_rgba(255,39,24,0.4)] hover:shadow-[0_20px_80px_rgba(255,39,24,0.6)] transition-all hover:scale-105 flex items-center justify-center gap-4 group"
        >
          <Zap size={18} className="group-hover:animate-pulse" />
          DÉPLOYER FIKO™ MAINTENANT
        </button>
      </div>

      {/* CONVERSION MODAL */}
      <AnimatePresence>
        {selectedOffer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-[#0D0D12] border border-[#FF2718]/30 p-10 lg:p-16 rounded-sm max-w-xl w-full relative shadow-[0_0_100px_rgba(255,39,24,0.15)]"
            >
              <button
                onClick={() => setSelectedOffer(null)}
                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>

              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4">
                    ACTIVER{" "}
                    <span className="text-[#FF2718]">
                      {OFFER_NAMES[selectedOffer]}
                    </span>
                  </h3>
                  <p className="text-lg text-slate-400 font-light italic leading-relaxed">
                    L'hésitation est le premier coût caché de votre entreprise.
                    Choisissez votre mode d'activation et commencez à dominer
                    votre marché.
                  </p>
                </div>

                <div className="space-y-4">
                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-6">
                      <div className="size-16 border-4 border-[#FF2718]/20 border-t-[#FF2718] rounded-full animate-spin"></div>
                      <p className="text-white font-black uppercase tracking-[0.4em] animate-pulse">
                        SYNCHRONISATION BANCAIRE...
                      </p>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handlePayment}
                        className="w-full bg-white text-black py-6 rounded-sm font-black uppercase tracking-[0.3em] hover:bg-[#FF2718] hover:text-white transition-all flex items-center justify-center gap-4 group"
                      >
                        <CreditCard
                          size={20}
                          className="group-hover:scale-110 transition-transform"
                        />
                        PAIEMENT SÉCURISÉ (KRYPTON PAY)
                      </button>
                      <button
                        onClick={handleWhatsApp}
                        className="w-full bg-[#25D366] text-white py-6 rounded-sm font-black uppercase tracking-[0.3em] hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-4 group"
                      >
                        <MessageCircle
                          size={20}
                          className="group-hover:scale-110 transition-transform"
                        />
                        FINALISER SUR WHATSAPP
                      </button>
                      {["KRYPTON", "GALAXY"].includes(selectedOffer) && (
                        <button
                          onClick={handleDemo}
                          className="w-full bg-white/5 border border-white/10 text-white py-6 rounded-sm font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all flex items-center justify-center gap-4 group"
                        >
                          <Calendar
                            size={20}
                            className="group-hover:scale-110 transition-transform"
                          />
                          RÉSERVER AUDIT STRATÉGIQUE
                        </button>
                      )}
                    </>
                  )}
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    <Lock size={12} /> SSL_ENCRYPTED
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    <ShieldCheck size={12} /> PCI_COMPLIANT
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UPSELL MODAL */}
      <AnimatePresence>
        {upsellOffer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-[#0D0D12] border border-[#FF2718]/50 p-12 lg:p-20 rounded-sm max-w-2xl w-full relative shadow-[0_0_150px_rgba(255,39,24,0.3)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2718] blur-[120px] opacity-10"></div>

              <div className="text-center space-y-10 relative z-10">
                <div className="size-20 bg-[#FF2718]/10 rounded-full flex items-center justify-center mx-auto border border-[#FF2718]/30">
                  <TrendingUp size={40} className="text-[#FF2718]" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-[#FF2718]">
                    NE SOYEZ PAS MOYEN.
                  </h3>
                  <p className="text-xl text-slate-300 font-light italic leading-relaxed">
                    Vous venez de faire le premier pas. Maintenant, écrasez
                    totalement votre concurrence. Passez à l'étape supérieure
                    immédiatement.
                  </p>
                </div>

                <div className="bg-white/[0.02] border border-white/10 p-8 text-left space-y-6">
                  <p className="text-[10px] font-black text-[#FF2718] uppercase tracking-[0.4em]">
                    OFFRE EXCLUSIVE POST-ACHAT :
                  </p>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                    UPGRADE VERS L'OFFRE{" "}
                    <span className="text-[#FF2718]">
                      {OFFER_NAMES[upsellOffer]}
                    </span>
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Domination totale du marché local",
                      "Élimination des frictions de conversion",
                      "ROI exponentiel garanti par contrat",
                      "Support prioritaire FIKO CORE",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-sm text-slate-400 font-medium"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-emerald-500 flex-shrink-0"
                        />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-[#FF2718] font-black uppercase tracking-[0.3em] animate-pulse">
                    CETTE OFFRE DISPARAÎTRA DANS 60 SECONDES.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleUpsellAccept}
                    className="w-full bg-[#FF2718] hover:bg-red-700 text-white py-6 rounded-sm font-black uppercase tracking-[0.3em] transition-all shadow-[0_20px_50px_rgba(255,39,24,0.3)]"
                  >
                    OUI, JE VEUX DOMINER MON MARCHÉ
                  </button>
                  <button
                    onClick={handleUpsellDecline}
                    className="w-full bg-transparent text-slate-600 py-3 rounded-sm font-black uppercase tracking-[0.3em] hover:text-white transition-colors text-[10px]"
                  >
                    NON, JE PRÉFÈRE RESTER À CE NIVEAU
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ABANDONMENT POPUP */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-[#0D0D12] border border-[#FF2718]/30 p-12 rounded-sm max-w-md w-full relative shadow-[0_0_80px_rgba(255,39,24,0.2)]"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="size-16 bg-[#FF2718]/10 rounded-full flex items-center justify-center mb-8 border border-[#FF2718]/30">
                <Cpu size={32} className="text-[#FF2718]" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-[#FF2718]">
                VOUS RÉFLÉCHISSEZ ENCORE ?
              </h3>
              <p className="text-lg text-slate-300 font-light italic leading-relaxed mb-8">
                Pendant que vous lisez ceci, vos concurrents automatisent leur
                business et capturent vos clients. Chaque seconde d'hésitation
                est une perte nette.
              </p>
              <button
                onClick={() => {
                  setShowPopup(false);
                  onNavigate(Page.FIKO_AUDIT);
                }}
                className="w-full bg-[#FF2718] text-white py-5 rounded-sm font-black uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-2xl"
              >
                TESTER FIKO™ MAINTENANT
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 pb-40 px-6 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <section className="text-center mb-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#FF2718]/10 border border-[#FF2718]/30 text-[#FF2718] text-[10px] font-black uppercase tracking-[0.5em] mb-12"
          >
            <span className="size-2 rounded-full bg-[#FF2718] animate-pulse shadow-[0_0_10px_#FF2718]"></span>
            SYSTÈME D'INTELLIGENCE COMMERCIALE AUTONOME
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-12"
          >
            VOTRE SITE EST <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2718] to-orange-600">
              UN CIMETIÈRE.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-16 font-light italic leading-relaxed"
          >
            Des centaines de visiteurs partent chaque jour sans vous parler.
            FiKO™ les intercepte, les qualifie et les close pour vous.{" "}
            <strong className="text-white">
              24h/24. Sans fatigue. Sans erreur.
            </strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <button
              onClick={() => onNavigate(Page.FIKO_AUDIT)}
              className="w-full sm:w-auto bg-[#FF2718] hover:bg-red-700 text-white px-12 py-8 rounded-sm font-black text-sm uppercase tracking-[0.5em] transition-all shadow-[0_20px_60px_rgba(255,39,24,0.3)] hover:shadow-[0_20px_80px_rgba(255,39,24,0.5)] hover:-translate-y-2 flex items-center justify-center gap-4"
            >
              <Zap size={20} />
              DÉPLOYER FIKO™
            </button>
            <button
              onClick={() => onNavigate(Page.FIKO_AUDIT)}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-12 py-8 rounded-sm font-black text-sm uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 backdrop-blur-xl"
            >
              <Mic size={20} className="text-[#FF2718]" />
              AUDIT INTERACTIF (TEST)
            </button>
          </motion.div>
        </section>

        {/* THE SHOCK (PROBLEM) */}
        <section className="mb-48">
          <div className="bg-[#0D0D12] border border-[#FF2718]/20 rounded-sm p-12 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF2718]/5 to-transparent pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
              <div className="space-y-12">
                <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                  L'HÉSITATION <br />
                  <span className="text-[#FF2718]">TUE VOTRE ROI.</span>
                </h2>
                <div className="space-y-8 text-xl lg:text-2xl text-slate-400 font-light italic leading-tight">
                  <p className="flex items-start gap-6">
                    <span className="text-[#FF2718] font-black text-4xl">
                      01.
                    </span>{" "}
                    Un prospect arrive avec un besoin urgent.
                  </p>
                  <p className="flex items-start gap-6">
                    <span className="text-[#FF2718] font-black text-4xl">
                      02.
                    </span>{" "}
                    Il cherche une réponse, un contact, une preuve.
                  </p>
                  <p className="flex items-start gap-6">
                    <span className="text-[#FF2718] font-black text-4xl">
                      03.
                    </span>{" "}
                    Vous n'êtes pas là. Votre site est passif.
                  </p>
                  <p className="flex items-start gap-6">
                    <span className="text-[#FF2718] font-black text-4xl">
                      04.
                    </span>{" "}
                    Il part chez votre concurrent en 3 clics.
                  </p>
                  <div className="pt-10 border-t border-white/5">
                    <p className="text-[#FF2718] font-black text-4xl lg:text-5xl uppercase tracking-tighter">
                      VOUS VENEZ DE PERDRE UN CLIENT.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-square bg-black border border-white/5 rounded-sm flex flex-col items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-64 border border-[#FF2718]/20 rounded-full animate-ping opacity-30"></div>
                  <div className="size-96 border border-[#FF2718]/10 rounded-full animate-[ping_5s_infinite] opacity-20"></div>
                </div>
                <div className="text-center z-10 space-y-6">
                  <Users
                    size={80}
                    className="text-slate-800 mx-auto group-hover:text-[#FF2718]/40 transition-colors duration-700"
                  />
                  <div className="font-mono text-[10px] text-slate-600 tracking-[0.4em] uppercase">
                    SYSTEM_LOG: VISITOR_EXIT_TIMEOUT
                  </div>
                  <p className="text-[#FF2718] font-black text-6xl tracking-tighter animate-pulse">
                    -1 VENTE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE REVELATION */}
        <section className="mb-48 text-center space-y-12">
          <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            ET SI CHAQUE VISITEUR ÉTAIT <br />
            <span className="text-[#FF2718] italic underline decoration-white/10">
              CLOSÉ INSTANTANÉMENT ?
            </span>
          </h2>
          <p className="text-2xl lg:text-4xl text-slate-500 max-w-5xl mx-auto font-light italic leading-relaxed">
            FiKO™ ne dort pas. Il ne prend pas de pause café. Il parle avec vos
            clients, comprend leurs besoins et les guide vers l'achat —{" "}
            <strong className="text-white">
              sans aucune intervention humaine.
            </strong>
          </p>
        </section>

        {/* POWER COMPARISON */}
        <section className="mb-48 grid lg:grid-cols-2 gap-10">
          <div className="bg-[#0D0D12] border border-white/5 p-16 rounded-sm space-y-10">
            <h3 className="text-3xl font-black uppercase tracking-widest text-slate-700">
              L'Humain (Limité)
            </h3>
            <div className="space-y-4">
              <p className="text-7xl font-black text-white">
                1{" "}
                <span className="text-2xl text-slate-600 uppercase tracking-widest">
                  Client
                </span>
              </p>
              <p className="text-lg text-slate-500 font-medium italic">
                Traite une seule conversation à la fois. A besoin de dormir.
                Fait des erreurs. Coûte cher en charges et en management.
              </p>
            </div>
            <div className="pt-10 border-t border-white/5 flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <Activity size={14} /> PERFORMANCE_CAP: 10%
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FF2718]/20 to-[#0D0D12] border border-[#FF2718]/30 p-16 rounded-sm space-y-10 relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 size-64 bg-[#FF2718] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
            <h3 className="text-3xl font-black uppercase tracking-widest text-[#FF2718]">
              FiKO™ AI (Illimité)
            </h3>
            <div className="space-y-4">
              <p className="text-7xl font-black text-white">
                1000+{" "}
                <span className="text-2xl text-white/40 uppercase tracking-widest">
                  Simultanés
                </span>
              </p>
              <p className="text-lg text-white font-bold italic">
                Une intelligence augmentée par Gemini de Google*. Des milliers
                de conversations en même temps. 24h/24. Zéro erreur.
                Encaissement direct.
              </p>
            </div>
            <div className="pt-10 border-t border-white/10 flex items-center gap-4 text-[10px] font-black text-[#FF2718] uppercase tracking-widest">
              <Zap size={14} className="animate-pulse" /> PERFORMANCE_CAP:
              UNLIMITED
            </div>
          </div>
        </section>

        {/* INTERACTIVE SIMULATION */}
        <section className="mb-48">
          <div className="max-w-4xl mx-auto bg-[#0D0D12] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
            <div className="bg-white/5 px-8 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-3 rounded-full bg-[#FF2718] animate-pulse shadow-[0_0_10px_#FF2718]"></div>
                <span className="font-black uppercase tracking-[0.4em] text-[10px] text-slate-400">
                  SIMULATION FIKO™ LIVE_v2.4
                </span>
              </div>
              <div className="flex gap-2">
                <div className="size-2 rounded-full bg-white/10"></div>
                <div className="size-2 rounded-full bg-white/10"></div>
                <div className="size-2 rounded-full bg-white/10"></div>
              </div>
            </div>
            <div className="p-10 lg:p-16 space-y-8 min-h-[500px] flex flex-col justify-end">
              <AnimatePresence mode="popLayout">
                {chatMessages.slice(0, chatStep + 1).map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      y: 20,
                      x: msg.sender === "client" ? 20 : -20,
                    }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-6 rounded-sm ${msg.sender === "client" ? "bg-white/5 text-slate-300 border border-white/5" : "bg-[#FF2718]/10 border border-[#FF2718]/30 text-white"}`}
                    >
                      {msg.sender === "fiko" && (
                         <div className="text-[9px] font-black text-[#FF2718] uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Cpu size={10} /> FIKO™ CORE
                        </div>
                      )}
                      <p className="text-lg font-medium italic leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {chatStep < 4 && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-5 rounded-sm flex gap-3 items-center border border-white/5">
                    <span className="size-1.5 bg-[#FF2718] rounded-full animate-bounce"></span>
                    <span className="size-1.5 bg-[#FF2718] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="size-1.5 bg-[#FF2718] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ECOSYSTEM MODULES */}
        <section className="mb-48">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter">
              L'ÉCOSYSTÈME <span className="text-[#FF2718]">FIKO™</span>
            </h2>
            <p className="text-xl text-slate-500 uppercase tracking-[0.3em] font-bold">
              Une architecture de domination commerciale totale
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "FiKO™ AI",
                desc: "Conversation intelligente et naturelle ultra-haute fidélité.",
                icon: MessageSquare,
              },
              {
                title: "FiKO™ Closer",
                desc: "Négociation et closing automatique basé sur l'intention.",
                icon: Target,
              },
              {
                title: "FiKO™ Pay",
                desc: "Encaissement et facturation intégrés sans friction.",
                icon: Zap,
              },
              {
                title: "FiKO™ SEO",
                desc: "Génération de trafic organique qualifié en continu.",
                icon: Globe,
              },
              {
                title: "FiKO™ Delivery",
                desc: "Exécution et suivi des commandes en temps réel.",
                icon: ShieldCheck,
              },
              {
                title: "FiKO™ Multi-Agent",
                desc: "Spécialisation par tâche complexe pour les grands comptes.",
                icon: Cpu,
              },
            ].map((mod, i) => (
              <div
                key={i}
                className="bg-[#0D0D12] border border-white/5 p-12 rounded-sm hover:border-[#FF2718]/40 transition-all group relative overflow-hidden"
              >
                <div className="absolute -right-10 -bottom-10 size-32 bg-[#FF2718] blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <mod.icon
                  size={40}
                  className="text-[#FF2718] mb-8 group-hover:scale-110 transition-transform duration-500"
                />
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-[#FF2718] transition-colors">
                  {mod.title}
                </h3>
                <p className="text-slate-500 font-medium italic leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* OFFERS (AGGRESSIVE) */}
        <section className="mb-48">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
              RECRUTEZ VOTRE <br />
              <span className="text-[#FF2718]">UNITÉ IA.</span>
            </h2>
            <p className="text-2xl text-slate-500 font-light italic max-w-4xl mx-auto">
              FiKO™ n’est pas un logiciel. C’est une équipe d’intelligences
              capables de répondre simultanément à plus de 1000 clients — sans
              fatigue, sans erreur, 24h/24.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {/* SOLO */}
            <div id="addon-solo" className="bg-[#0D0D12] border border-white/5 p-10 rounded-sm flex flex-col hover:border-[#FF2718]/30 transition-all group">
              <div className="mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
                  🌍 SOLO
                </h3>
                <p className="text-3xl font-black text-[#FF2718]">
                  30 000{" "}
                  <span className="text-xs text-slate-600 uppercase tracking-widest">
                    FCFA / MOIS
                  </span>
                </p>
              </div>

              <div className="space-y-8 flex-grow">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
                    MISSIONS :
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 text-sm text-slate-400 font-medium italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Réponse auto 24/7
                    </li>
                    <li className="flex items-start gap-4 text-sm text-slate-400 font-medium italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Capture de leads qualifiés
                    </li>
                    <li className="flex items-start gap-4 text-sm text-slate-400 font-medium italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Intégration site web
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 space-y-3">
                  <p className="text-[9px] font-black text-[#FF2718] uppercase tracking-widest">
                    ROI ESTIMÉ :
                  </p>
                  <p className="text-lg font-black text-white italic">
                    "Payé dès le 1er client sauvé."
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('fiko_solo_offer' as any)}
                className="w-full mt-10 bg-white/5 hover:bg-[#FF2718] text-white py-5 rounded-sm font-black uppercase tracking-[0.3em] transition-all text-xs"
              >
                ACTIVER SOLO
              </button>
            </div>

            {/* PILOT */}
            <div id="addon-pilot" className="bg-[#0D0D12] border-2 border-[#FF2718]/50 p-10 rounded-sm flex flex-col relative transform lg:-translate-y-6 shadow-[0_30px_100px_rgba(255,39,24,0.15)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF2718] text-white text-[9px] font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full shadow-xl">
                RECOMMANDÉ
              </div>
              <div className="mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
                  🔴 PILOT
                </h3>
                <p className="text-3xl font-black text-[#FF2718]">
                  60 000{" "}
                  <span className="text-xs text-slate-600 uppercase tracking-widest">
                    FCFA / MOIS
                  </span>
                </p>
              </div>

              <div className="space-y-8 flex-grow">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
                    MISSIONS :
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 text-sm text-white font-bold italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Qualification avancée ML
                    </li>
                    <li className="flex items-start gap-4 text-sm text-white font-bold italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Redirection WhatsApp Smart
                    </li>
                    <li className="flex items-start gap-4 text-sm text-white font-bold italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Analyse comportementale
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-[#FF2718]/5 border border-[#FF2718]/20 space-y-3">
                  <p className="text-[9px] font-black text-[#FF2718] uppercase tracking-widest">
                    ROI ESTIMÉ :
                  </p>
                  <p className="text-lg font-black text-white italic">
                    "Remplace 2 commerciaux juniors."
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('fiko_pilot_offer' as any)}
                className="w-full mt-10 bg-[#FF2718] hover:bg-red-700 text-white py-6 rounded-sm font-black uppercase tracking-[0.3em] transition-all text-xs shadow-2xl"
              >
                ACTIVER PILOT
              </button>
            </div>

            {/* ELITE */}
            <div id="addon-elite" className="bg-[#0D0D12] border border-white/5 p-10 rounded-sm flex flex-col hover:border-[#FF2718]/30 transition-all group">
              <div className="mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
                  ⚫ ELITE
                </h3>
                <p className="text-3xl font-black text-[#FF2718]">
                  100 000{" "}
                  <span className="text-xs text-slate-600 uppercase tracking-widest">
                    FCFA / MOIS
                  </span>
                </p>
              </div>

              <div className="space-y-8 flex-grow">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
                    MISSIONS :
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 text-sm text-slate-400 font-medium italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      FiKO™ Closer (Vente Auto)
                    </li>
                    <li className="flex items-start gap-4 text-sm text-slate-400 font-medium italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      FiKO™ SEO (Trafic Auto)
                    </li>
                    <li className="flex items-start gap-4 text-sm text-slate-400 font-medium italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Stratégie Conversion IA
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 space-y-3">
                  <p className="text-[9px] font-black text-[#FF2718] uppercase tracking-widest">
                    ROI ESTIMÉ :
                  </p>
                  <p className="text-lg font-black text-white italic">
                    "Domination totale du secteur."
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('fiko_elite_offer' as any)}
                className="w-full mt-10 bg-white/5 hover:bg-[#FF2718] text-white py-5 rounded-sm font-black uppercase tracking-[0.3em] transition-all text-xs"
              >
                ACTIVER ELITE
              </button>
            </div>

            {/* EMPIRE */}
            <div id="addon-empire" className="bg-gradient-to-b from-[#1A0505] to-[#0D0D12] border border-[#FF2718]/30 p-10 rounded-sm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 size-32 bg-[#FF2718] blur-[60px] opacity-10"></div>
              <div className="mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
                  🌌 EMPIRE
                </h3>
                <p className="text-3xl font-black text-[#FF2718]">
                  350 000{" "}
                  <span className="text-xs text-slate-600 uppercase tracking-widest">
                    FCFA / MOIS
                  </span>
                </p>
              </div>

              <div className="space-y-8 flex-grow">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
                    MISSIONS :
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 text-sm text-slate-300 font-bold italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Multi-Agents Spécialisés
                    </li>
                    <li className="flex items-start gap-4 text-sm text-slate-300 font-bold italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Apprentissage Continu
                    </li>
                    <li className="flex items-start gap-4 text-sm text-slate-300 font-bold italic">
                      <CheckCircle2
                        size={16}
                        className="text-[#FF2718] flex-shrink-0 mt-0.5"
                      />{" "}
                      Acquisition Massive
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-[#FF2718]/10 border border-[#FF2718]/30 space-y-3">
                  <p className="text-[9px] font-black text-[#FF2718] uppercase tracking-widest">
                    ROI ESTIMÉ :
                  </p>
                  <p className="text-lg font-black text-white italic">
                    "Structure de croissance autonome."
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('fiko_empire_offer' as any)}
                className="w-full mt-10 bg-white text-black hover:bg-gray-200 py-5 rounded-sm font-black uppercase tracking-[0.3em] transition-all text-xs"
              >
                ACTIVER EMPIRE
              </button>
            </div>
          </div>
        </section>

        {/* PROOF STATS */}
        <section className="mb-48">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4 p-12 border-r border-white/5 last:border-0">
              <TrendingUp size={48} className="text-[#FF2718] mx-auto mb-6" />
              <p className="text-7xl font-black tracking-tighter">+300%</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">
                Leads Générés
              </p>
            </div>
            <div className="text-center space-y-4 p-12 border-r border-white/5 last:border-0">
              <Target size={48} className="text-[#FF2718] mx-auto mb-6" />
              <p className="text-7xl font-black tracking-tighter">+50%</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">
                Taux de Conversion
              </p>
            </div>
            <div className="text-center space-y-4 p-12">
              <Clock size={48} className="text-[#FF2718] mx-auto mb-6" />
              <p className="text-7xl font-black tracking-tighter">24/24</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">
                Disponibilité Totale
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center bg-[#FF2718]/5 border border-[#FF2718]/20 p-16 lg:p-32 rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 hex-bg opacity-10 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[#FF2718]/10 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-12">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              UN HUMAIN TRAITE 1 CLIENT.
              <br />
              <span className="text-[#FF2718]">FiKO™ EN TRAITE 1000.</span>
            </h2>
            <div className="w-32 h-1.5 bg-[#FF2718] mx-auto"></div>
            <p className="text-2xl lg:text-3xl text-slate-300 font-light italic leading-relaxed">
              La question n’est plus “ai-je besoin de FiKO™ ?” mais{" "}
              <strong className="text-white underline decoration-[#FF2718]">
                “combien de clients suis-je en train de perdre chaque minute
                sans lui ?”
              </strong>
            </p>

            <button
              onClick={() => onNavigate(Page.FIKO_AUDIT)}
              className="inline-flex items-center justify-center gap-6 bg-[#FF2718] hover:bg-red-700 text-white px-16 py-10 rounded-sm font-black text-xl uppercase tracking-[0.5em] transition-all shadow-[0_30px_100px_rgba(255,39,24,0.4)] hover:scale-105 active:scale-95"
            >
              🚀 ACTIVER FIKO™ MAINTENANT
            </button>

            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] pt-10">
              DÉCIDEZ MAINTENANT. DOMINEZ DEMAIN.
            </p>
          </div>
        </section>

        {/* SUCCESS SCREEN */}
        {showSuccessScreen && (
          <div className="fixed inset-0 z-[300] bg-[#050505] flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-[#FF2718]/20 to-transparent pointer-events-none"></div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative z-10 max-w-2xl w-full bg-[#0D0D12] border border-[#FF2718]/50 p-12 lg:p-20 rounded-sm shadow-[0_0_150px_rgba(255,39,24,0.3)]"
            >
              <div className="size-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={48} className="text-emerald-500" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
                UNITÉ <span className="text-[#FF2718]">ACTIVÉE</span>
              </h1>
              <p className="text-xl text-slate-300 mb-12 font-light italic leading-relaxed">
                Félicitations. Vous venez de prendre la décision la plus
                rentable de l'année. L'équipe FiKO CORE configure votre
                infrastructure.
              </p>

              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-sm mb-12 text-left space-y-6">
                <h3 className="text-[#FF2718] font-black uppercase tracking-[0.3em] mb-4">
                  PROTOCOLE DE DÉPLOIEMENT :
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-6 text-slate-300 font-bold italic">
                    <span className="size-10 rounded-full bg-[#FF2718]/10 flex items-center justify-center text-[#FF2718] flex-shrink-0 font-black">
                      1
                    </span>{" "}
                    Vérifiez vos accès par email.
                  </li>
                  <li className="flex items-center gap-6 text-slate-300 font-bold italic">
                    <span className="size-10 rounded-full bg-[#FF2718]/10 flex items-center justify-center text-[#FF2718] flex-shrink-0 font-black">
                      2
                    </span>{" "}
                    Synchronisez vos canaux de vente.
                  </li>
                  <li className="flex items-center gap-6 text-slate-300 font-bold italic">
                    <span className="size-10 rounded-full bg-[#FF2718]/10 flex items-center justify-center text-[#FF2718] flex-shrink-0 font-black">
                      3
                    </span>{" "}
                    Observez FiKO™ dominer vos leads.
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setShowSuccessScreen(false);
                  if (onSelectOffer) onSelectOffer(finalOffer || "MARS");
                  onNavigate(Page.AUTH);
                }}
                className="w-full bg-[#FF2718] hover:bg-red-700 text-white py-6 rounded-sm font-black text-xl uppercase tracking-[0.4em] transition-all shadow-[0_30px_80px_rgba(255,39,24,0.4)]"
              >
                ACCÉDER AU SYSTÈME
              </button>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FikoLandingPage;
