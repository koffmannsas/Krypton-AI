import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { Agent } from "../types";
import { sendToFiko } from "../services/fikoAPI";
import { resolveUserContext } from "../utils/FikoContextResolver";

const AIChatOverlay = ({
  agent,
  prospectName,
  onClose,
}: {
  agent: Agent | null;
  prospectName?: string;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<
    { role: "user" | "model"; text: string }[]
  >([]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fiko Engine Live Certified HUD states
  const [fikoState, setFikoState] = useState<string>("DISCOVERY");
  const [modelUsed, setModelUsed] = useState<string>("Fiko Engine prêt");
  const [score, setScore] = useState<number>(30);
  const [probability, setProbability] = useState<number>(10);

  useEffect(() => {
    const initializeChat = async () => {
      const userId = localStorage.getItem("fiko_user");
      let greeting = `Bonjour ${prospectName || ""}, je suis ${agent?.name || "FIKO"}. Dites-moi, aujourd’hui vous cherchez à améliorer quoi exactement dans votre activité ?`;
      
      if (userId) {
        const context = await resolveUserContext(userId);
        if (context && context.fiko_memory) {
            const memory = context.fiko_memory;
            if (memory.currentState) {
              setFikoState(memory.currentState);
            }
            if (memory.businessGoals && memory.businessGoals.length > 0) {
                greeting = `Bonjour ${prospectName || ""}, je suis ${agent?.name || "FIKO"}. Je vois que vous travaillez sur ${memory.businessGoals[0]}. Comment puis-je vous aider à avancer sur cet objectif aujourd'hui ?`;
            }
        }
      }
      
      setMessages([{ role: "model", text: greeting }]);
    };
    initializeChat();
  }, [agent, prospectName, onClose]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // 🔥 APPEL FIKO BACKEND - routed through the Fiko Core
      const data = await sendToFiko(userMessage);

      console.log("🔥 SCORE:", data.score);
      console.log("🔥 PROBA:", data.probability);

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      
      // Update HUD parameters with certified results
      if (data.currentState) setFikoState(data.currentState);
      if (data.modelUsed) setModelUsed(data.modelUsed);
      if (data.score !== undefined) setScore(data.score);
      if (data.probability !== undefined) setProbability(data.probability);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Désolé, une erreur s'est produite." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // State Machine Step Tracker definitions
  const steps = [
    { key: "DISCOVERY", label: "Découverte" },
    { key: "QUALIFICATION", label: "Qualif" },
    { key: "ANALYSIS", label: "Analyse" },
    { key: "PROJECTION", label: "Proj" },
    { key: "OBJECTION", label: "Objection" },
    { key: "CLOSING", label: "Closing" },
    { key: "ACTIVATION", label: "Activation" }
  ];

  return (
    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* HEADER */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-500">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">{agent?.name || "FIKO"}</h3>
              <p className="text-xs text-white/50">
                {agent?.category || "Closer IA"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] bg-red-600/20 text-red-400 px-2 py-1 rounded border border-red-500/30 font-mono font-semibold">
              OMEGA V1 CERTIFIED
            </span>
            <button onClick={onClose} className="text-white/50 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* FIKO CERTIFIED LIVE ENGINE HUD */}
        <div className="bg-[#181818] border-b border-white/10 p-3 flex flex-col gap-2">
          {/* Step indicators */}
          <div className="flex justify-between items-center text-[10px] gap-1 px-1">
            {steps.map((st, i) => {
              const isActive = fikoState === st.key;
              const isPassed = steps.findIndex(s => s.key === fikoState) > i;
              return (
                <div key={st.key} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`h-1 w-full rounded-full transition-all duration-300 ${
                    isActive ? "bg-red-500 shadow-lg shadow-red-500/50" : isPassed ? "bg-red-800" : "bg-white/15"
                  }`} />
                  <span className={`font-mono text-[8px] sm:text-[9px] ${isActive ? "text-red-400 font-bold" : isPassed ? "text-white/40" : "text-white/20"}`}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Core Engine Metrics */}
          <div className="flex flex-wrap items-center justify-between text-xs text-white/70 border-t border-white/5 pt-2 mt-1 gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Modèle Routé:</span>
              <span className="text-[10px] font-mono text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded border border-red-900/30">
                {modelUsed}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/40">Score Lead:</span>
                <span className="text-xs font-bold text-white font-mono">{score}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/40">Proba Conv:</span>
                <span className={`text-xs font-bold font-mono ${probability > 70 ? "text-green-400" : "text-amber-400"}`}>{probability}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-red-600 text-white rounded-tr-none"
                    : "bg-white/10 text-white rounded-tl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-white rounded-2xl p-4 flex gap-2">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-white/10 bg-black/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500"
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIChatOverlay;
