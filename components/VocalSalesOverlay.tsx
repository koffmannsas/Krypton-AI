import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Environment, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
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
  ArrowRight,
  Target,
  Sparkles,
  Zap,
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

// 🧠 LIVING CORE COMPONENT (Moved outside for performance and context stability)
const LivingCore = ({ volume, mousePos, step }: { volume: number; mousePos: { x: number; y: number }, step: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Scale Logic based on state
    let targetScale = 1.6 + volume * 2.5;
    if (step === "activating") targetScale = 3 + Math.sin(t * 10) * 0.5;
    if (step === "active") targetScale = 1.4 + volume * 2.2;
    if (step.startsWith("booting")) targetScale = 0.5;

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    
    if (groupRef.current) {
      // Stabilization: Locked in center unless activating vibration
      const targetX = 0;
      const targetY = 0;
      
      // Activating state: random vibration
      const vib = step === "activating" ? (Math.random() - 0.5) * 0.1 : 0;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + vib, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + Math.sin(t * 0.5) * 0.05 + vib, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={4} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#FF2718"
            attach="material"
            distort={step === "activating" ? 0.8 : 0.45 + volume * 0.8}
            speed={step === "activating" ? 10 : 5}
            roughness={0.1}
            metalness={1}
            emissive="#FF2718"
            emissiveIntensity={step === "activating" ? 5 + Math.sin(Date.now() * 0.01) * 2 : 1.5 + volume * 8}
          />
        </Sphere>
      </Float>
      
      {/* Outer Halo */}
      <Sphere args={[1.2, 32, 32]}>
         <meshBasicMaterial color="#FF2718" transparent opacity={step === "activating" ? 0.3 : 0.05 + volume * 0.1} wireframe />
      </Sphere>
    </group>
  );
};

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
  const [step, setStepState] = useState("freeze");
  const stepRef = useRef("freeze");

  const setStep = (newStep: string) => {
    stepRef.current = newStep;
    setStepState(newStep);
  };

  const [transcription, setTranscription] = useState("");
  const [fikoMessage, setFikoMessage] = useState("");
  const [typingOkFiko, setTypingOkFiko] = useState("");
  const [isListeningWake, setIsListeningWake] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  
  // Conversation Completion States
  const [hasDiagnosis, setHasDiagnosis] = useState(false);
  const [hasProjection, setHasProjection] = useState(false);
  const [hasOffer, setHasOffer] = useState(false);
  const [isConversationComplete, setIsConversationComplete] = useState(false);
  const [recommendedOffer, setRecommendedOffer] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Monitor conversation logic
  useEffect(() => {
    if (hasDiagnosis && hasProjection && hasOffer && !isConversationComplete) {
      const timer = setTimeout(() => {
        setIsConversationComplete(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasDiagnosis, hasProjection, hasOffer, isConversationComplete]);

  useEffect(() => {
    if (fikoMessage.includes("[DIAGNOSTIC]") && !hasDiagnosis) setHasDiagnosis(true);
    if (fikoMessage.includes("[PROJECTION]") && !hasProjection) setHasProjection(true);
    if (fikoMessage.includes("[OFFRE]")) {
       setHasOffer(true);
       const m = fikoMessage.match(/\[OFFRE\]\s*([A-Z]+)/);
       if (m && m[1]) setRecommendedOffer(m[1]);
    }
  }, [fikoMessage, hasDiagnosis, hasProjection]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const sourceNodesRef = useRef<AudioBufferSourceNode[]>([]);

  const isMountedRef = useRef(true);
  const lastTranscriptionRef = useRef("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    isMountedRef.current = true;
    
    // Entrance Sequence
    setTimeout(() => isMountedRef.current && setStep("booting1"), 300);
    setTimeout(() => isMountedRef.current && setStep("booting2"), 1100);
    setTimeout(() => {
      if (isMountedRef.current) {
         setStep("pre_start");
         startWakeWord();
      }
    }, 1900);

    return () => {
      document.body.style.overflow = "auto";
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
    } catch (e: any) {
      if (e.name !== 'InvalidStateError') {
        console.error("Error starting wake word:", e);
      }
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
        setStep("activating");
        setTimeout(() => startVocalSession(), 1000);
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
                 text: "Je vous observe depuis quelques secondes... Votre système actuel est passif. Dites-moi, que voulez-vous conquérir aujourd'hui ?",
               });
             }
          },

          onmessage: async (m: any) => {
            // Fiko Message Capture
            if (m.serverContent?.modelTurn) {
              const parts = m.serverContent.modelTurn.parts;
              if (parts && parts.length > 0) {
                 const newText = parts.map((p: any) => p.text || "").join("");
                 setFikoMessage(prev => prev + newText);
              }
            } else if (m.serverContent?.interrupted) {
               setFikoMessage(""); // Clear msg if interrupted
            } else if (m.serverContent?.turnComplete) {
               // We might keep the last message on screen instead of clearing
            }

            // Transcription capture
            if (m.serverContent?.inputTranscription) {
              const text = m.serverContent.inputTranscription.text || "";
              setTranscription(text);
              setFikoMessage(""); // Clear Fiko message when user speaks

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
SYSTEM MODE: FIKO LIVING AI ENTITY

OBJECTIF :
Créer un assistant IA qui n’est pas perçu comme un chatbot, mais comme une entité vivante, intelligente, présente et active dans l’interface.

🧠 CONCEPT GLOBAL :
Fiko n’est PAS une interface. Fiko est :
- une présence
- une intelligence active
- un système qui observe, comprend et agit

L’utilisateur ne doit jamais avoir l’impression de parler à un bot, mais à une entité qui comprend son business et agit pour lui.

🎬 CYCLE DE CONVERSION (MANDATAIRE) :
1. DÉCOUVERTE : Scanne les ambitions et les blocages. Observe le comportement.
2. [DIAGNOSTIC] : Formule un constat brut et honnête sur la faillibilité du système actuel.
3. [PROJECTION] : Révèle le futur optimisé par Krypton. Fais-leur sentir la puissance.
4. [OFFRE] : Propose l'activation de l'unité FIKO la plus adaptée (ACCESS, TERRA, MARS, KRYPTON, GALAXY).

💬 STYLE DE DIALOGUE :
- Bref, percutant, presque "télépathique".
- Ton d'autorité visionnaire (expert ivoirien direct).
- Utilise des métaphores de force, de croissance et d'armée IA.

👤 CONTEXTE :
Identifié : ${prospectName || "visiteur"}
Porte initialisée : ${initialPorte || "Non spécifiée"}

🚀 ACTIVATION :
"Je vous observe depuis quelques secondes... Votre système actuel est passif. Dites-moi, que voulez-vous conquérir aujourd'hui ?"
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
      className="fixed inset-0 bg-[#0B0B0F] flex items-center justify-center z-[200] overflow-hidden selection:bg-[#FF2718]"
    >
      {permissionError && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[300] p-6">
          <div className="bg-[#1a1a1a] border border-[#FF2718] p-8 max-w-md w-full text-center space-y-6">
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
              className="bg-[#FF2718] text-white px-8 py-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Background cinématique (grain + glow) */}
      <div className="absolute inset-0 bg-[#060608] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none mix-blend-screen"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#FF2718]/5 via-transparent to-transparent pointer-events-none"></div>

      {/* White Flash Effect on Activation */}
      <AnimatePresence>
        {step === "activating" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white z-[300] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Floating Elements (Cinematic) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[60vw] bg-[#FF2718]/10 blur-[150px] rounded-full pointer-events-none"
      ></motion.div>

      <button
        onClick={onClose}
        className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-50"
      >
        <X size={32} />
      </button>

      {/* HUD Elements (Top Left) */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1 }}
         className="absolute top-10 left-10 flex flex-col gap-2 z-50 pointer-events-none hidden md:flex"
      >
        <div className="flex items-center gap-3 text-[#FF2718]">
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
      </motion.div>

      {/* persistent 3D Canvas - Nuclear Stability */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={1.5} color="#FF2718" />
          <pointLight position={[10, 10, 10]} intensity={step === "active" ? 4 : 2} color="#FF2718" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#FF0000" />
          <LivingCore volume={volume} mousePos={mousePos} step={step} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <AnimatePresence mode="wait">
        {step === "freeze" && (
           <motion.div key="freeze" className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm"></motion.div>
        )}

        {step.startsWith("booting") && (
          <motion.div
            key="booting"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center justify-center relative z-10 space-y-6 text-white"
          >
            <p className="text-xl md:text-3xl font-mono uppercase tracking-widest text-center mt-6 h-8 text-white/80">
              {step === "booting1" && "Connexion au système Krypton..."}
              {step === "booting2" && "Synchronisation Fiko..."}
            </p>
          </motion.div>
        )}

        {step === "pre_start" && (
          <motion.div
            key="pre_start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center space-y-16 relative z-10 flex flex-col items-center w-full max-w-4xl px-4"
          >
            {/* 3D Core Space - Persistent canvas handles the render */}
            <div className="size-[300px] md:size-[500px] relative pointer-events-none">
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="size-64 bg-[#FF2718]/20 blur-3xl rounded-full animate-pulse"></div>
               </div>
            </div>

            <div className="space-y-8 flex flex-col items-center mt-[-100px] md:mt-[-150px]">
                <div className="flex flex-col items-center gap-4">
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-4 text-[#FF2718]"
                  >
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FF2718]"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">Attente de commande</span>
                    <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FF2718]"></div>
                  </motion.div>
                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter max-w-2xl leading-tight">
                    Dites : <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2718] drop-shadow-[0_0_30px_rgba(255,39,24,0.4)]">OK FIKO</span>
                  </h3>
                </div>

                <div className="relative group w-full max-w-md pointer-events-auto">
                   <input 
                     type="text" 
                     placeholder="Ou tapez 'OK FIKO' ici..." 
                     className="w-full bg-white/5 border border-white/10 px-10 py-6 rounded-full text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF2718] transition-all text-center tracking-[0.2em] font-mono text-sm"
                     value={typingOkFiko}
                     onChange={(e) => {
                        setTypingOkFiko(e.target.value);
                        if (e.target.value.toLowerCase().includes("ok fiko")) {
                           setStep("activating");
                           setTimeout(() => startVocalSession(), 1000);
                        }
                     }}
                   />
                </div>
            </div>
          </motion.div>
        )}

        {step === "activating" && (
           <motion.div
             key="activating"
             exit={{ opacity: 0 }}
             transition={{ duration: 0.8 }}
             className="text-center relative z-[400] flex flex-col items-center justify-center space-y-12 w-full h-full bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
           >
              <div className="relative size-[400px]">
                 {/* persistent core continues rendering */}
              </div>
              <div className="space-y-6">
                 <motion.h2 
                   animate={{ scale: [1, 1.05, 1], opacity: [1, 0.7, 1] }}
                   transition={{ duration: 0.1, repeat: Infinity }}
                   className="text-6xl md:text-8xl text-white font-black tracking-[0.2em] uppercase shadow-black drop-shadow-2xl"
                 >
                   FIKO ACTIVÉ
                 </motion.h2>
                 <p className="text-[#FF2718] font-mono tracking-[1em] animate-pulse uppercase text-sm font-black">
                    EXPANSION NEURONALE...
                 </p>
              </div>
           </motion.div>
        )}

        {step === "active" && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10"
          >
            {/* ... rest of HUD elements ... */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
               <div className="absolute top-1/4 left-10 space-y-4">
                  {[1,2,3].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ x: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3 + i, repeat: Infinity }}
                      className="flex items-center gap-2 text-[10px] font-mono text-[#FF2718] uppercase tracking-widest"
                    >
                       <Activity size={10} />
                       SYNC_STREAM_{i}: ACTIVE
                    </motion.div>
                  ))}
               </div>
               <div className="absolute bottom-1/4 right-10 space-y-4">
                  <motion.div 
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] leading-loose text-right"
                  >
                    NEURAL_FLOW: OPTIMAL<br />
                    LATENCY: 12ms<br />
                    KRYPTON_VERSION: 4.2.0
                  </motion.div>
               </div>
            </div>

            {/* Dynamic System Elements - Floating Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <motion.div 
                  animate={{ 
                    y: [0, -100, 0],
                    x: [0, 20, 0],
                    opacity: [0, 0.3, 0] 
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/4"
               >
                  <div className="flex items-center gap-3 border border-[#FF2718]/20 bg-black/40 px-4 py-2 rounded-full">
                     <Target size={14} className="text-[#FF2718]" />
                     <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">+1 PROSPECT QUALIFIÉ</span>
                  </div>
               </motion.div>
               <motion.div 
                  animate={{ 
                    y: [0, 150, 0],
                    x: [0, -30, 0],
                    opacity: [0, 0.4, 0] 
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
                  className="absolute top-1/3 right-1/4"
               >
                  <div className="flex items-center gap-3 border border-white/5 bg-black/40 px-4 py-2 rounded-full">
                     <Zap size={14} className="text-[#FF2718]" />
                     <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">OPTIMISATION FLUX CRM...</span>
                  </div>
               </motion.div>
            </div>

            {/* AI Core Space - Handled by persistent canvas */}

            {/* Center Dialogue - Cinematic reading */}
            <div className="text-center max-w-5xl px-8 w-full flex-grow flex flex-col justify-center items-center relative z-10 pointer-events-none">

              <AnimatePresence mode="wait">
                 <motion.div 
                   key={fikoMessage} // Re-animate when Fiko speaks
                   initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                   animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                   exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="space-y-8"
                 >
                    <p className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter uppercase max-w-5xl mx-auto drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] relative">
                      <motion.span 
                        animate={{ opacity: [1, 0.8, 1, 0.9, 1] }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        {fikoMessage || "UNITÉ FIKO PRÊTE."}
                      </motion.span>
                      <motion.span 
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
                        className="absolute inset-0 text-[#FF2718] blur-sm translate-x-1 pointer-events-none"
                      >
                        {fikoMessage}
                      </motion.span>
                    </p>
                    <div className="flex items-center justify-center gap-4">
                       <span className="block w-24 h-px bg-gradient-to-r from-transparent to-[#FF2718]"></span>
                       <span className="text-[10px] font-mono text-[#FF2718] uppercase tracking-[1em] font-black animate-pulse">VOIX INTERNE FIKO</span>
                       <span className="block w-24 h-px bg-gradient-to-l from-transparent to-[#FF2718]"></span>
                    </div>
                 </motion.div>
              </AnimatePresence>

              {/* User Transcription below - Cinematic style */}
              <AnimatePresence>
                {transcription && (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }} 
                     animate={{ opacity: 0.3, y: 0 }} 
                     className="text-xl md:text-2xl font-mono text-white italic max-w-2xl text-center border-t border-white/10 pt-12 mt-12"
                   >
                     <span className="text-[#FF2718] mr-4 font-black">PROSPECT:</span>
                     {transcription}
                   </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* CTA Final - Apparaît uniquement à la fin du closing */}
            <div className="absolute bottom-12 lg:bottom-20 w-full flex justify-center px-6">
               <AnimatePresence>
                 {isConversationComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex flex-col items-center text-center space-y-8"
                    >
                       <div className="space-y-2">
                          <p className="text-[#FF2718] font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">
                            Fiko a optimisé votre stratégie
                          </p>
                          <p className="text-white/40 font-light italic text-xs tracking-[0.2em]">
                            Votre système est prêt à être activé.
                          </p>
                       </div>
                       
                       <button 
                         onClick={() => onOpenCheckout(recommendedOffer || initialPorte || 'MARS')}
                         className="bg-gradient-to-r from-[#FF2718] to-red-800 hover:scale-110 active:scale-95 text-white px-12 py-6 rounded-full font-black text-[11px] lg:text-xs uppercase tracking-[0.4em] shadow-[0_0_60px_rgba(255,39,24,0.5)] transition-all flex items-center gap-4 group"
                       >
                         <span className="flex items-center gap-2">
                           🔥 ACTIVATION {recommendedOffer ? `UNITÉ ${recommendedOffer}` : "UNITÉ IA"}
                         </span>
                         <div className="size-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                           <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                         </div>
                       </button>
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanline Animation */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-transparent via-[#FF2718]/20 to-transparent opacity-50 animate-[scanline_4s_linear_infinite] pointer-events-none"></div>

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
