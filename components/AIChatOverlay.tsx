import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { Agent } from "../types";
import { sendToFiko } from "../services/fikoAPI";

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
  >([
    {
      role: "model",
      text: `Bonjour ${prospectName || ""}, je suis ${agent?.name || "FIKO"}. Dites-moi, aujourd’hui vous cherchez à améliorer quoi exactement dans votre activité ?`,
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      // 🔥 APPEL FIKO BACKEND
      const data = await sendToFiko(userMessage);

      console.log("🔥 SCORE:", data.score);
      console.log("🔥 PROBA:", data.probability);

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
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

  return (
    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl"
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

          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={24} />
          </button>
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
