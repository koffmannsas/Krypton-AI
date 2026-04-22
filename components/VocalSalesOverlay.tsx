import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  Mic2,
  Hexagon,
  Activity,
  Cpu,
  Wifi,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { sendToFiko } from "../services/fikoAPI";

// 🎤 WAKE WORD SETUP
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "fr-FR";
  recognition.continuous = true;
  recognition.interimResults = true;
}

const VocalSalesOverlay = ({
  agent,
  prospectName,
  onClose,
  onOpenCheckout,
  initialPorte,
}: {
  agent: any;
  prospectName: any;
  onClose: any;
  onOpenCheckout: (porte: any) => void;
  initialPorte?: string;
}) => {
  const [permissionError, setPermissionError] = useState(false);
  const [step, setStepState] = useState("pre_start");
  const stepRef = useRef("pre_start");

  const setStep = (newStep: string) => {
    stepRef.current = newStep;
    setStepState(newStep);
  };

  const [transcription, setTranscription] = useState("");
  const [isListeningWake, setIsListeningWake] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const sourceNodesRef = useRef<AudioBufferSourceNode[]>([]);

  const isMountedRef = useRef(true);
  const lastTranscriptionRef = useRef("");

  useEffect(() => {
    isMountedRef.current = true;
    startWakeWord();

    return () => {
      isMountedRef.current = false;

      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {}
      }

      sourceNodesRef.current.forEach((source) => {
        try {
          source.stop();
        } catch (e) {}
      });

      sourceNodesRef.current = [];

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // 🔥 WAKE WORD
  const startWakeWord = () => {
    if (!recognition) return;
    
    // Check if already started or listening
    if (isListeningWake) return;

    setIsListeningWake(true);

    try {
      console.log("Starting wake word recognition...");
      recognition.start();
    } catch (e) {
      console.error("Error starting wake word:", e);
    }

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((res: any) => res[0].transcript)
        .join(" ")
        .toLowerCase();

      console.log("🎤 entendu:", transcript);

      const wakeWords = [
        "ok",
        "fiko",
        "fico",
        "figo",
        "pico",
        "chic",
        "chico",
        "fille",
        "cool",
      ];
      const isWake = wakeWords.some((word) => transcript.includes(word));

      if (isWake && transcript.length > 2) {
        recognition.stop();
        setIsListeningWake(false);
        startVocalSession();
      }
    };

    recognition.onend = () => {
      if (isMountedRef.current && stepRef.current === "pre_start") {
        try {
          recognition.start();
        } catch (e) {}
      }
    };
  };

  // 🚀 SESSION VOCALE
  const startVocalSession = async () => {
    console.log("Starting vocal session...");
    setStep("active");
    setIsConnected(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext({ sampleRate: 16000 });
      await audioContext.resume();
      audioContextRef.current = audioContext;

      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
      });

      let session: any;
      session = await ai.live.connect({
        model: "gemini-2.0-flash",
        callbacks: {
          onopen: () => {
             console.log("Live session connected.");
             setIsConnected(true);
             
             // Use the captured 'session' variable
             const source = audioContext.createMediaStreamSource(stream);
             const processor = audioContext.createScriptProcessor(4096, 1, 1);
             processor.onaudioprocess = (e) => {
               const input = e.inputBuffer.getChannelData(0);
               const int16 = new Int16Array(input.length);
               let sum = 0;
               for (let i = 0; i < input.length; i++) {
                 int16[i] = input[i] * 32768;
                 sum += Math.abs(input[i]);
               }
               setVolume(sum / input.length);
               const base64 = btoa(
                 String.fromCharCode.apply(null, Array.from(new Uint8Array(int16.buffer))),
               );
               if (session) {
                 session.sendRealtimeInput({
                   audio: {
                     data: base64,
                     mimeType: "audio/pcm;rate=16000",
                   },
                 });
               }
             };
             source.connect(processor);
             processor.connect(audioContext.destination);
             if (session) {
               session.sendRealtimeInput({
                 text: "Bonjour 👋, dis-moi… aujourd’hui tu veux améliorer quoi dans ton activité ?",
               });
             }
          },

          onmessage: async (m: any) => {
            // 🔥 transcription + intelligence commerciale
            if (m.serverContent?.inputTranscription) {
              const text = m.serverContent.inputTranscription.text || "";
              setTranscription(text);

              // Avoid duplicate calls for the same stable transcription
              if (lastTranscriptionRef.current === text) return;
              lastTranscriptionRef.current = text;

              let userId = localStorage.getItem("fiko_user");
              if (!userId) {
                userId = "visitor_" + Date.now();
                localStorage.setItem("fiko_user", userId);
              }

              try {
                const res = await fetch(
                  "https://fikochatv2-gx7rkah46a-uc.a.run.app/",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      message: text,
                      userId,
                    }),
                  },
                );

                const data = await res.json();
                console.log("🔥 SCORE:", data.score);

                const lower = text.toLowerCase();
                if (
                  lower.includes("prix") ||
                  lower.includes("offre") ||
                  lower.includes("acheter") ||
                  lower.includes("payer")
                ) {
                  console.log("🔥 CLIENT ULTRA CHAUD");
                  window.open("https://wa.me/+2250544427676", "_blank");
                }
              } catch (e) {
                console.error("Fiko API Error:", e);
              }
            }

            // 🔥 interruption
            if (m.serverContent?.interrupted) {
              sourceNodesRef.current.forEach((s: AudioBufferSourceNode) => {
                try {
                  s.stop();
                } catch (e) {}
              });

              sourceNodesRef.current = [];

              if (audioContextRef.current) {
                nextPlayTimeRef.current = audioContextRef.current.currentTime;
              }
            }

            // 🔊 AUDIO
            const base64 =
              m.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

            if (base64) {
              try {
                const binary = atob(base64);
                const bytes = new Uint8Array(binary.length);

                for (let i = 0; i < binary.length; i++) {
                  bytes[i] = binary.charCodeAt(i);
                }

                const int16 = new Int16Array(bytes.buffer);
                const float32 = new Float32Array(int16.length);

                for (let i = 0; i < int16.length; i++) {
                  float32[i] = int16[i] / 32768;
                }

                const buffer = audioContext.createBuffer(
                  1,
                  float32.length,
                  24000,
                );
                buffer.getChannelData(0).set(float32);

                const source = audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(audioContext.destination);

                const now = audioContext.currentTime;

                if (nextPlayTimeRef.current < now) {
                  nextPlayTimeRef.current = now;
                }

                source.start(nextPlayTimeRef.current);
                nextPlayTimeRef.current += buffer.duration;

                sourceNodesRef.current.push(source);
              } catch (err) {
                console.error(err);
              }
            }
          },
        },

        config: {
          responseModalities: [Modality.AUDIO],

          systemInstruction: `
Tu es FIKO, un closer professionnel en Côte d’Ivoire.

🎯 OBJECTIF :
Transformer chaque conversation en vente.

🧠 COMPORTEMENT :
- parle naturellement comme un humain ivoirien
- sois direct, simple et stratégique
- pose toujours une question

📊 ANALYSE :
- curiosité → explique
- besoin → propose solution
- hésitation → rassure
- intérêt → pousse à l’action

💸 STRATÉGIE :
- identifie le problème
- montre ce que le client perd
- propose FiKO comme solution
- pousse vers décision

📲 CLOSING :
Si intérêt :

"On peut avancer directement ensemble et mettre ça en place pour toi."

Puis :

"Le plus simple, c’est qu’on échange sur WhatsApp pour aller vite."

👤 CONTEXTE :
Prospect : ${prospectName || "visiteur"}

🚀 DÉMARRAGE :
"Bonjour 👋, dis-moi… aujourd’hui tu veux améliorer quoi exactement dans ton activité ?"
`,
        },
      });

      sessionRef.current = session;
    } catch (e: any) {
      console.error(e);
      if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
        setPermissionError(true);
      }
      setStep("pre_start");
      setIsConnected(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0B0B0F] flex items-center justify-center z-[200] overflow-hidden selection:bg-[#E10600]"
    >
      {permissionError && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[300] p-6">
          <div className="bg-[#1a1a1a] border border-[#E10600] p-8 max-w-md w-full text-center space-y-6">
            <h2 className="text-2xl font-black text-white uppercase">
              Microphone requis
            </h2>
            <p className="text-white/70">
              Krypton AI a besoin d'accéder à votre microphone pour activer
              FIKO. Veuillez autoriser l'accès dans les paramètres de votre
              navigateur.
            </p>
            <button
              onClick={() => setPermissionError(false)}
              className="bg-[#E10600] text-white px-8 py-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Background cinématique */}
      <div className="absolute inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#E10600]/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Floating Elements */}
      <div className="absolute top-[20%] left-[-10%] size-[800px] bg-[#E10600]/10 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
      <div
        className="absolute bottom-[10%] right-[-10%] size-[800px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse pointer-events-none"
        style={{ animationDelay: "3s" }}
      ></div>

      <button
        onClick={onClose}
        className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-50"
      >
        <X size={32} />
      </button>

      {/* HUD Elements (Top Left) */}
      <div className="absolute top-10 left-10 flex flex-col gap-2 z-50 pointer-events-none hidden md:flex">
        <div className="flex items-center gap-3 text-[#E10600]">
          <Activity size={16} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Krypton Neural Link
          </span>
        </div>
        <div className="flex items-center gap-3 text-white/50">
          <ShieldCheck size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">
            Secure Connection
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "pre_start" && (
          <motion.div
            key="pre_start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-12 relative z-10"
          >
            <div className="relative inline-block">
              <Hexagon
                size={160}
                className="text-[#E10600] animate-[spin_20s_linear_infinite]"
                strokeWidth={0.5}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu size={48} className="text-white/80" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl text-white font-black uppercase tracking-tighter leading-none">
              DITES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E10600] to-red-500">
                OK FIKO
              </span>
            </h1>

            <div className="flex flex-col items-center gap-6">
              <button
                onClick={() => { console.log("CTA Button clicked!"); startVocalSession(); }}
                className="group relative bg-[#E10600] text-white px-12 py-6 font-black text-xs uppercase tracking-[0.4em] hover:bg-red-700 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-4">
                  <Mic2 size={18} /> ACTIVER FIKO
                </span>
              </button>

              {isListeningWake ? (
                <div className="flex items-center gap-3 text-[#E10600]">
                  <span className="size-2 bg-[#E10600] rounded-full animate-ping"></span>
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    Listening for "OK FIKO"...
                  </p>
                </div>
              ) : (
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                  Or say "OK FIKO" to begin
                </p>
              )}
            </div>
          </motion.div>
        )}

        {step === "active" && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-5xl flex flex-col items-center justify-center min-h-[60vh] relative z-10"
          >
            {/* AI Core Visualizer */}
            <div className="relative flex items-center justify-center mb-20">
              {/* Outer rotating rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Hexagon
                  size={400}
                  className={`text-[#E10600]/10 ${isConnected ? "animate-[spin_40s_linear_infinite]" : "animate-pulse"}`}
                  strokeWidth={0.5}
                />
                <Hexagon
                  size={300}
                  className={`absolute text-[#E10600]/20 ${isConnected ? "animate-[spin_30s_linear_infinite_reverse]" : "animate-pulse"}`}
                  strokeWidth={1}
                />
              </div>

              {/* Dynamic pulsing core based on volume */}
              <div
                className={`relative flex items-center justify-center rounded-full bg-gradient-to-b from-[#E10600] to-red-900 shadow-[0_0_50px_rgba(225,6,0,0.5)] transition-all duration-75 ease-out ${!isConnected ? "animate-pulse" : ""}`}
                style={{
                  width: `${isConnected ? 120 + volume * 400 : 120}px`,
                  height: `${isConnected ? 120 + volume * 400 : 120}px`,
                  opacity: isConnected ? 0.8 + volume * 0.5 : 0.5,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full border border-white/20 animate-ping"
                  style={{ animationDuration: "2s" }}
                ></div>
                <Radio size={40} className="text-white" />
              </div>
            </div>

            {/* Transcription */}
            <div className="text-center max-w-3xl px-6">
              <p className="text-2xl md:text-4xl font-light italic text-white leading-relaxed tracking-wide">
                {!isConnected
                  ? "Synchronisation avec Krypton AI..."
                  : transcription
                    ? `« ${transcription} »`
                    : "FIKO est à l'écoute..."}
              </p>
              <div className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[#E10600] to-transparent mx-auto opacity-50"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanline Animation */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-transparent via-[#E10600]/20 to-transparent opacity-50 animate-[scanline_4s_linear_infinite] pointer-events-none"></div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </motion.div>
  );
};

export default VocalSalesOverlay;
