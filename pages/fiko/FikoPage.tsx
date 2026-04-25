import React, { useState, useEffect, useRef, useCallback } from "react";
import { Page, ProspectInfo, FollowUpRecord } from "../../types";
import {
  ArrowLeft,
  Activity,
  Hexagon,
  Volume2,
  VolumeX,
  Loader2,
  Mail,
  Check,
} from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";
import { FIKO_EMAIL_TEMPLATES } from "../../constants";

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

enum FikoStep {
  INITIALIZING,
  TRIGGER, // Déclencheur Ads
  SIZE_QUAL, // Q1 Taille business
  PROBLEM_QUAL, // Q2 Problème principal
  GOAL_QUAL, // Q3 Objectif business
  CLOSING, // Closing Adaptatif
  FINAL_CTA, // Prise de RDV / Closing
}

interface SmartAction {
  label: string;
  value: string;
  boost: number;
}

interface FikoPageProps {
  onNavigate: (p: Page) => void;
  onOpenGate?: (gate: string) => void;
  prospect?: ProspectInfo;
}

const FikoPage: React.FC<FikoPageProps> = ({
  onNavigate,
  onOpenGate,
  prospect,
}) => {
  const [step, setStep] = useState<FikoStep>(FikoStep.INITIALIZING);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [maturityScore, setMaturityScore] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recommendedGate, setRecommendedGate] = useState<string>("MARS");
  const [businessSize, setBusinessSize] = useState<string>("");
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const gateColors: Record<string, string> = {
    TERRA: "#10b981",
    MARS: "#FF2718",
    KRYPTON: "#3b82f6",
    GALAXY: "#a855f7",
  };
  const activeColor = gateColors[recommendedGate] || "#FF2718";

  const scripts: Record<FikoStep, { text: string; actions: SmartAction[] }> = {
    [FikoStep.INITIALIZING]: {
      text: "Liaison FIKO CORE v1.001 établie. Protocoles Google Ads synchronisés.",
      actions: [],
    },
    [FikoStep.TRIGGER]: {
      text: `Bonjour ${prospect?.firstName || ""} 👋 Je suis FIKO, le directeur commercial virtuel de Krypton AI. Vous êtes ici parce que vous voulez que votre site génère plus de clients, pas vrai ?`,
      actions: [
        { label: "Oui, exactement", value: "yes", boost: 10 },
        { label: "Je découvre seulement", value: "discovery", boost: 5 },
      ],
    },
    [FikoStep.SIZE_QUAL]: {
      text: "Pour vous orienter vers la bonne solution, j’ai besoin de comprendre votre situation. Cela prendra 30 secondes. Votre entreprise est plutôt :",
      actions: [
        { label: "Indépendant", value: "indie", boost: 5 },
        { label: "PME (2-20 pers)", value: "pme", boost: 15 },
        { label: "Entreprise (+20)", value: "corp", boost: 25 },
      ],
    },
    [FikoStep.PROBLEM_QUAL]: {
      text: "C'est noté. Aujourd’hui, votre site internet :",
      actions: [
        { label: "Zéro client", value: "none", boost: 10 },
        { label: "Peu de contacts", value: "low", boost: 15 },
        { label: "Leads mal qualifiés", value: "bad_qual", boost: 20 },
        { label: "En refonte / Pas de site", value: "refonte", boost: 10 },
      ],
    },
    [FikoStep.GOAL_QUAL]: {
      text: "Compris. Votre priorité actuelle est :",
      actions: [
        { label: "Ventes rapides", value: "sales", boost: 20 },
        { label: "Automatisation", value: "auto", boost: 20 },
        { label: "Mieux qualifier", value: "qual", boost: 15 },
        { label: "Gagner du temps", value: "time", boost: 15 },
      ],
    },
    [FikoStep.CLOSING]: {
      text: "", // Sera généré dynamiquement
      actions: [
        { label: "Voir une démo", value: "demo", boost: 5 },
        { label: "Appel stratégique", value: "call", boost: 10 },
        { label: "Parler à un conseiller", value: "support", boost: 5 },
      ],
    },
    [FikoStep.FINAL_CTA]: {
      text: "Afin que l’échange soit utile et concret, préparons la suite. En 2026, les entreprises performantes n’attendent plus : elles intègrent l’IA.",
      actions: [{ label: "FRANCHIR LA PORTE", value: "enter", boost: 0 }],
    },
  };

  const handleSendConfirmation = async () => {
    if (!prospect || isEmailSending || emailSent) return;
    setIsEmailSending(true);

    try {
      // Simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const confirmationAction: FollowUpRecord = {
        id: `CONF-${Date.now()}`,
        targetId: "prospect-direct",
        targetName: prospect.firstName,
        channel: "email",
        scenario: "CONFIRMATION_AUDIT_FIKO",
        tone: "strategique",
        message: FIKO_EMAIL_TEMPLATES.CONFIRMATION.body
          .replace("{{Prénom}}", prospect.firstName)
          .replace(
            "{{Objectif}}",
            "la transformation de votre site en actif commercial",
          ),
        sentAt: new Date().toISOString(),
        status: "sent",
        type: "manual",
      };

      const actionsLog = JSON.parse(
        localStorage.getItem("krypton_fiko_actions_log") || "[]",
      );
      localStorage.setItem(
        "krypton_fiko_actions_log",
        JSON.stringify([confirmationAction, ...actionsLog]),
      );

      setEmailSent(true);
    } catch (error) {
      console.error("Email send failed", error);
    } finally {
      setIsEmailSending(false);
    }
  };

  const speakWithGemini = useCallback(
    async (text: string) => {
      if (!voiceEnabled || !text) return;
      if (currentSourceRef.current)
        try {
          currentSourceRef.current.stop();
        } catch (e) {}

      setIsSpeaking(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '' });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: text }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
            },
          },
        });

        const base64Audio =
          response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          if (!audioContextRef.current)
            audioContextRef.current = new AudioContext({ sampleRate: 24000 });
          if (audioContextRef.current.state === "suspended")
            await audioContextRef.current.resume();
          const buffer = await decodeAudioData(
            decode(base64Audio),
            audioContextRef.current,
            24000,
            1,
          );
          const source = audioContextRef.current.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContextRef.current.destination);
          source.onended = () => setIsSpeaking(false);
          currentSourceRef.current = source;
          source.start();
        } else {
          setIsSpeaking(false);
        }
      } catch (e) {
        console.error(e);
        setIsSpeaking(false);
      }
    },
    [voiceEnabled],
  );

  useEffect(() => {
    if (step === FikoStep.INITIALIZING) {
      setTimeout(() => setStep(FikoStep.TRIGGER), 2000);
      return;
    }

    let textToDisplay = scripts[step]?.text || "";

    // Logique de Closing Adaptatif (Module 3 & 4)
    if (step === FikoStep.CLOSING) {
      if (maturityScore < 40) {
        setRecommendedGate("TERRA");
        textToDisplay = `Parfait ${prospect?.firstName || ""}. Dans votre cas, un site passif vous fait perdre de l’argent tous les jours. Je vous recommande la Porte TERRA : un agent IA commercial opérationnel immédiatement pour ne plus rater aucun client.`;
      } else if (maturityScore < 75) {
        setRecommendedGate("MARS");
        textToDisplay = `Votre entreprise a besoin d'un agent IA adapté à votre activité, pas d'un simple chatbot. Je vous recommande MARS, notre solution d'accélération pour PME qui savent que la croissance ne dépend plus de l'effort humain seul.`;
      } else {
        setRecommendedGate("KRYPTON");
        textToDisplay =
          "Votre structure nécessite une IA commerciale sur mesure, intégrée à votre process métier. La Porte KRYPTON est conçue pour les leaders qui veulent dominer leur marché sans aucune friction.";
      }
    }

    setDisplayedText("");
    setIsTyping(true);
    speakWithGemini(textToDisplay);

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + textToDisplay.charAt(i));
      i++;
      if (i >= textToDisplay.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [step, maturityScore, prospect]);

  const handleAction = (action: SmartAction) => {
    setMaturityScore((prev) => prev + action.boost);
    if (step === FikoStep.TRIGGER) setStep(FikoStep.SIZE_QUAL);
    else if (step === FikoStep.SIZE_QUAL) {
      setBusinessSize(action.value);
      setStep(FikoStep.PROBLEM_QUAL);
    } else if (step === FikoStep.PROBLEM_QUAL) setStep(FikoStep.GOAL_QUAL);
    else if (step === FikoStep.GOAL_QUAL) setStep(FikoStep.CLOSING);
    else if (step === FikoStep.CLOSING) setStep(FikoStep.FINAL_CTA);
    else if (step === FikoStep.FINAL_CTA) {
      if (onOpenGate) onOpenGate(recommendedGate);
      else onNavigate(Page.PRICING);
    }
  };

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white flex flex-col relative overflow-hidden font-sans">
      <div className="fixed inset-0 hex-bg opacity-[0.05] pointer-events-none"></div>

      <header className="relative z-50 px-10 h-24 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <button
          onClick={() => onNavigate(Page.HOME)}
          className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 hover:text-white transition-all"
        >
          <ArrowLeft size={16} /> Interrompre Audit
        </button>
        <div className="flex items-center gap-8">
          {prospect && (
            <button
              onClick={handleSendConfirmation}
              disabled={isEmailSending || emailSent}
              className={`flex items-center gap-3 px-6 py-2.5 border transition-all text-[9px] font-black uppercase tracking-widest ${
                emailSent
                  ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
                  : "border-[#FF2718]/30 text-white hover:bg-[#FF2718] hover:text-white"
              } disabled:opacity-70`}
            >
              {isEmailSending ? (
                <Loader2 size={12} className="animate-spin" />
              ) : emailSent ? (
                <Check size={12} />
              ) : (
                <Mail size={12} />
              )}
              {isEmailSending
                ? "Synchronisation..."
                : emailSent
                  ? "Email Envoyé"
                  : "Recevoir Récapitulatif"}
            </button>
          )}
          <div
            className={`px-4 py-1.5 border transition-all duration-500 ${isSpeaking ? "shadow-[0_0_15px_rgba(255,39,24,0.2)]" : "border-white/10 text-slate-500"}`}
            style={{
              borderColor: isSpeaking ? activeColor : "rgba(255,255,255,0.1)",
              backgroundColor: isSpeaking ? `${activeColor}10` : "transparent",
              color: isSpeaking ? activeColor : undefined,
            }}
          >
            <span className="text-[8px] font-black uppercase tracking-widest">
              FIKO_LIVE_V1.001
            </span>
          </div>
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`size-12 rounded-full flex items-center justify-center border transition-all ${voiceEnabled ? "border-[#FF2718] text-[#FF2718]" : "border-white/10 text-slate-500"}`}
          >
            {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 lg:p-20 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-20 items-center">
          {/* VISUAL CORE */}
          <div className="flex flex-col items-center gap-12">
            <div className="relative">
              <div
                className={`size-80 lg:size-[450px] rounded-full border-2 flex items-center justify-center transition-all duration-700 ${isSpeaking ? "animate-[pulse_4s_infinite]" : "border-white/5"}`}
                style={{
                  borderColor: isSpeaking
                    ? `${activeColor}44`
                    : "rgba(255,255,255,0.05)",
                  boxShadow: isSpeaking ? `0 0 100px ${activeColor}22` : "none",
                  backgroundColor: isSpeaking
                    ? `${activeColor}05`
                    : "transparent",
                }}
              >
                <div className="flex flex-col items-center relative">
                  <Hexagon
                    size={120}
                    className={`transition-all duration-700 ${isSpeaking ? "animate-fiko-active" : "text-slate-800"}`}
                    style={{ color: isSpeaking ? activeColor : undefined }}
                    strokeWidth={1}
                  />

                  {isSpeaking && (
                    <div
                      className="absolute inset-0 border border-white/10 rounded-full scale-150 animate-ping opacity-20"
                      style={{ borderColor: activeColor }}
                    ></div>
                  )}

                  <h2 className="text-4xl font-black text-white uppercase mt-10 tracking-[0.2em] neon-fiko">
                    FIKO™
                  </h2>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-4 bg-[#1A1A1F] border border-white/10 shadow-2xl">
                <Activity
                  size={16}
                  className={isSpeaking ? "animate-pulse" : "text-slate-700"}
                  style={{ color: isSpeaking ? activeColor : undefined }}
                />
                <span
                  className="text-[10px] font-black uppercase tracking-[0.3em]"
                  style={{ color: isSpeaking ? activeColor : undefined }}
                >
                  {isSpeaking ? "ANALYSE STRATÉGIQUE..." : "VEILLE ACTIVE"}
                </span>
              </div>
            </div>
          </div>

          {/* SCRIPT INTERFACE */}
          <div className="flex flex-col gap-12">
            <div
              className="bg-[#1A1A1F]/80 p-12 lg:p-16 border-l-4 shadow-2xl min-h-[350px] flex flex-col justify-center transition-colors duration-700"
              style={{ borderLeftColor: isSpeaking ? activeColor : "#FF2718" }}
            >
              <p className="text-2xl lg:text-4xl text-white font-light italic leading-tight">
                {displayedText || "..."}
                {isTyping && (
                  <span
                    className="inline-block w-1.5 h-10 ml-2 animate-pulse"
                    style={{ backgroundColor: activeColor }}
                  ></span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {!isTyping &&
                scripts[step]?.actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleAction(action)}
                    className="p-6 bg-white/5 border border-white/10 hover:bg-[#FF2718]/10 text-center transition-all group active:scale-95"
                    style={{ "--hover-border": activeColor } as any}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                      {action.label}
                    </span>
                  </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5">
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">
                  MATURITÉ DÉCISIONNELLE
                </p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-black text-white">
                    {maturityScore}
                  </span>
                  <span className="text-[10px] text-slate-700 font-bold mb-1.5">
                    %
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">
                  PORTE ESTIMÉE
                </p>
                <span
                  className="text-xl font-black uppercase tracking-tighter"
                  style={{ color: activeColor }}
                >
                  {recommendedGate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full h-16 px-10 flex items-center justify-center border-t border-white/5 bg-black/40 backdrop-blur-xl z-20">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          Krypton AI une marque{" "}
          <a
            href="https://www.koffmann.group"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-[#FF2718] hover:underline"
          >
            KCG
          </a>
        </p>
      </footer>

      <style>{`
        @keyframes fiko-active {
          0% { transform: scale(1) rotate(0deg); filter: brightness(1); }
          50% { transform: scale(1.1) rotate(180deg); filter: brightness(1.4) drop-shadow(0 0 15px currentColor); }
          100% { transform: scale(1) rotate(360deg); filter: brightness(1); }
        }
        .animate-fiko-active {
          animation: fiko-active 6s ease-in-out infinite;
        }
        button:hover {
          border-color: var(--hover-border, #FF2718);
        }
      `}</style>
    </div>
  );
};

export default FikoPage;
