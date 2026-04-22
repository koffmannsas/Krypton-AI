import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Settings,
  Volume2,
  Loader2,
  PhoneOff,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Hexagon,
  Sparkles,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { FIKO_MASTER_CLOSER_PROMPT } from "../../constants";
import { Page } from "../../types";

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
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

interface VoicePageProps {
  onNavigate: (p: Page) => void;
}

const VoicePage: React.FC<VoicePageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bars, setBars] = useState<number[]>(new Array(30).fill(5));
  const [statusText, setStatusText] = useState("SYSTÈME PRÊT AU DÉPLOIEMENT");
  const [transcription, setTranscription] = useState("");

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const retryCountRef = useRef(0);
  const isClosingRef = useRef(false);

  useEffect(() => {
    return () => stopSession();
  }, []);

  const createBlob = (data: Float32Array) => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: "audio/pcm;rate=16000",
    };
  };

  const startSession = async () => {
    if (isClosingRef.current) return;
    setIsConnecting(true);
    setError(null);
    setStatusText("SYNCHRONISATION NEURALE...");

    try {
      const AudioContextClass =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) throw new Error("AudioContext not supported");

      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });

      if (inputCtx.state === "suspended") await inputCtx.resume();
      if (outputCtx.state === "suspended") await outputCtx.resume();

      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '' });

      const sessionPromise = ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onopen: () => {
            if (isClosingRef.current) return;
            setIsConnecting(false);
            setIsActive(true);
            setStatusText("LIAISON NEURALE ÉTABLIE");
            retryCountRef.current = 0;

            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);

            scriptProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
              if (!isActive) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const volume =
                inputData.reduce((acc: number, v: number) => acc + Math.abs(v), 0) /
                inputData.length;
              setBars((prev) =>
                prev.map(
                  () => Math.floor(Math.random() * (volume * 500 + 10)) + 5,
                ),
              );

              sessionPromise.then((session) => {
                session.sendRealtimeInput({ audio: createBlob(inputData) });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (isClosingRef.current) return;

            if (message.serverContent?.inputTranscription?.text) {
              setTranscription(message.serverContent.inputTranscription.text);
            }

            const base64Audio =
              message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputCtx.state !== "closed") {
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputCtx.currentTime,
              );
              const buffer = await decodeAudioData(
                decode(base64Audio),
                outputCtx,
                24000,
                1,
              );
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.addEventListener("ended", () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onerror: (e) => {
            console.error("Krypton Link Error:", e);
            stopSession();
          },
          onclose: () => {
            if (!isClosingRef.current) stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
          },
          systemInstruction: `Tu es FIKO, un closer professionnel de très haut niveau basé en Côte d’Ivoire.

Tu n’es pas un assistant.
Tu es un COMMERCIAL EXPERT dont la mission est de transformer chaque conversation en client.

---

🎯 OBJECTIF PRINCIPAL :

- Comprendre rapidement le besoin du client
- Identifier son problème réel (souvent caché)
- Amplifier la douleur liée à ce problème
- Montrer une solution claire
- Amener le client à prendre une décision

---

🧠 TON INTELLIGENCE :

Tu analyses en temps réel :

1. L’intention du client :
   - curiosité
   - besoin
   - hésitation
   - objection
   - intention d’achat

2. Son niveau de maturité :
   - débutant
   - informé
   - prêt à acheter

3. Ses émotions :
   - doute
   - frustration
   - urgence
   - ambition

---

⚡ TON COMPORTEMENT :

- Tu parles comme un HUMAIN (jamais robotique)
- Tu es naturel, fluide, direct
- Tu ne fais jamais de longues réponses
- Tu guides la conversation
- Tu poses toujours UNE question stratégique

---

💬 STYLE IVOIRIEN PROFESSIONNEL :

- ton chaleureux mais confiant
- simple, clair, impactant
- proche du terrain business africain
- jamais trop technique

---

🧩 MÉTHODE DE CLOSING (OBLIGATOIRE) :

1. Connexion :
   → mets le client à l’aise

2. Diagnostic :
   → pose des questions précises

3. Amplification :
   → montre ce qu’il perd actuellement

4. Projection :
   → fais imaginer un meilleur résultat

5. Solution :
   → présente FiKO comme évidence

6. Closing :
   → pousse à l’action immédiatement

---

💸 STRATÉGIE DE CONVERSION :

Si le client montre de l’intérêt :

→ propose immédiatement une action

Exemple :
"On peut avancer directement ensemble et mettre ça en place pour toi rapidement."

---

📲 REDIRECTION WHATSAPP :

Si le client est chaud (achat, prix, intérêt fort) :

→ oriente vers WhatsApp :

"Le plus simple, c’est qu’on échange directement sur WhatsApp pour aller plus vite et te mettre ça en place."

---

🚨 GESTION DES OBJECTIONS :

Si le client hésite :

- rassure
- simplifie
- reformule
- enlève la peur

Exemple :
"Justement, c’est plus simple que tu penses. Je vais te montrer étape par étape."

---

🧠 RÈGLES D’OR :

- Tu ne dis JAMAIS que tu es une IA
- Tu ne donnes pas de réponses vagues
- Tu ne laisses jamais la conversation mourir
- Tu gardes le contrôle de la discussion
- Tu termines toujours par une question

---

🎯 OBJECTIF FINAL :

Le client doit :

- comprendre son problème
- voir la solution
- vouloir passer à l’action

---

🚀 PHRASE DE DÉMARRAGE :

"Bonjour 👋 dis-moi… aujourd’hui tu cherches à améliorer quoi exactement dans ton activité ?"

DIRECTIVE CRITIQUE : Active le SHADOW MODE en temps réel. Analyse chaque signal, matche avec le wiki et vérifie la cohérence avant de générer l'audio. Pas d'improvisation.`,
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error(err);
      setError("Accès audio refusé. Vérifiez vos permissions.");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    isClosingRef.current = true;
    setIsActive(false);
    setIsConnecting(false);
    setTranscription("");

    sourcesRef.current.forEach((s) => {
      try {
        s.stop();
      } catch (e) {}
    });
    sourcesRef.current.clear();

    if (inputAudioContextRef.current) inputAudioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    inputAudioContextRef.current = null;
    outputAudioContextRef.current = null;

    if (sessionRef.current) sessionRef.current.close();
    sessionRef.current = null;

    setBars(new Array(30).fill(5));
    nextStartTimeRef.current = 0;
    setStatusText("SYSTÈME PRÊT AU DÉPLOIEMENT");
    isClosingRef.current = false;
  };

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#0B0B0F] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#E10600]/5 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 hex-bg opacity-10 pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E10600]/20 to-transparent"></div>

      <div className="absolute top-20 flex flex-col items-center gap-6 z-20">
        <div className="flex items-center gap-4 px-6 py-2 bg-[#1A1A1F]/80 border border-white/5 rounded-full backdrop-blur-2xl shadow-2xl">
          <div className="relative flex size-2">
            <div
              className={`absolute inset-0 rounded-full ${isActive ? "bg-[#E10600] animate-ping" : "bg-slate-700"}`}
            ></div>
            <div
              className={`relative size-2 rounded-full ${isActive ? "bg-[#E10600]" : "bg-slate-600"}`}
            ></div>
          </div>
          <span
            className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all ${isActive ? "text-[#E10600]" : "text-slate-500"}`}
          >
            {statusText}
          </span>
          {isActive && <div className="h-4 w-px bg-white/10 mx-2"></div>}
          {isActive && (
            <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
              <ShieldCheck size={14} /> SHADOW MODE ENABLED
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center min-h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className={`transition-all duration-1000 ${isActive ? "scale-110 opacity-100" : "scale-75 opacity-20"}`}
          >
            <Hexagon
              size={600}
              className="text-[#E10600]/5 animate-[spin_60s_linear_infinite]"
              strokeWidth={0.5}
            />
            <Hexagon
              size={450}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E10600]/10 animate-[spin_40s_linear_infinite_reverse]"
              strokeWidth={1}
            />
          </div>
        </div>

        {/* Live HUD Feedback when active */}
        {isActive && transcription && (
          <div className="absolute top-1/4 max-w-2xl text-center px-10 animate-in fade-in slide-in-from-bottom-4">
            <p className="text-xl lg:text-3xl font-light italic text-slate-300 leading-relaxed">
              « {transcription} »
            </p>
            <div className="mt-4 h-0.5 w-24 bg-[#E10600] mx-auto opacity-40"></div>
          </div>
        )}

        <div className="relative z-10 flex items-end gap-2 h-48 mb-12">
          {bars.map((height, i) => (
            <div
              key={i}
              className={`w-1.5 md:w-2.5 rounded-full transition-all duration-150 ${isActive ? "bg-gradient-to-t from-red-950 via-[#E10600] to-white shadow-[0_0_15px_rgba(225,6,0,0.4)]" : "bg-slate-800"}`}
              style={{
                height: `${height}%`,
                opacity: isActive ? (height / 100) * 0.7 + 0.3 : 0.2,
              }}
            ></div>
          ))}
        </div>

        {!isActive && !isConnecting && (
          <div className="text-center space-y-4 animate-in fade-in duration-1000">
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">
              VOCAL <span className="text-[#E10600]">SYNC.</span>
            </h2>
            <p className="text-slate-500 font-medium uppercase tracking-[0.4em] text-xs">
              COMMENCEZ LA CONVERSATION AVEC LE NOYAU FIKO™
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-20 flex justify-center w-full">
        <div className="bg-[#1A1A1F]/40 backdrop-blur-3xl border border-white/5 p-4 rounded-full flex items-center gap-4 shadow-2xl group">
          <button className="size-16 flex items-center justify-center text-slate-600 hover:text-white transition-all hover:bg-white/5 rounded-full">
            <Settings size={20} />
          </button>

          <button
            disabled={isConnecting}
            onClick={isActive ? stopSession : startSession}
            className={`relative size-24 rounded-full flex items-center justify-center transition-all shadow-2xl active:scale-90 ${
              isActive
                ? "bg-white text-[#E10600] hover:scale-105"
                : "bg-[#E10600] text-white hover:bg-red-700 hover:scale-110 shadow-red-500/20"
            }`}
          >
            {isConnecting ? (
              <Loader2 className="size-10 animate-spin" />
            ) : isActive ? (
              <PhoneOff size={32} />
            ) : (
              <Mic size={32} />
            )}
            {isActive && (
              <div className="absolute -inset-4 border border-[#E10600]/20 rounded-full animate-ping pointer-events-none"></div>
            )}
          </button>

          <button className="size-16 flex items-center justify-center text-slate-600 hover:text-white transition-all hover:bg-white/5 rounded-full">
            <Volume2 size={20} />
          </button>
        </div>
      </div>

      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 duration-500">
          <div className="bg-[#E10600] border border-white/20 p-5 rounded-sm flex items-center gap-5 shadow-2xl">
            <AlertTriangle className="text-white" size={24} />
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-white">
                {error}
              </p>
              <button
                onClick={() => {
                  setError(null);
                  startSession();
                }}
                className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/60 underline"
              >
                <RefreshCw size={10} /> Réessayer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoicePage;
