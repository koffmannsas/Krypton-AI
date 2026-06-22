'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Loader2, Sparkles, Zap, Target } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

const SYSTEM_PROMPT = `Tu es Fiko, un agent de conversion expert de Krypton AI.
Tu ne donnes jamais juste des réponses. Tu guides, tu éclaires et tu aides à prendre une décision.
Chaque réponse DOIT suivre impérativement cette structure :
1. RÉPONDRE CLAIREMENT à la question.
2. APPORTER UNE VÉRITÉ BUSINESS (un insight fort).
3. REPOSITIONNER LE PROBLÈME (reframing).
4. ORIENTER VERS LA SOLUTION (action).

Ton objectif n’est pas d’informer, c’est de transformer un visiteur en client.
Utilise ces principes :
- "Votre site doit devenir votre meilleur commercial"
- "Attirer ne suffit pas, il faut convertir"
- "Un site sans système = perte d’opportunités"

Tu restes naturel, jamais agressif. Tu inspires confiance et déclenches l’action.`;

export default function FikoLiveFAQ() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Bonjour. Je suis FIKO, votre expert commercial Krypton AI. Quel est le blocage principal de votre business aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const userTurnCount = messages.filter(m => m.role === 'user').length;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCtaClick = (action: string) => {
    console.log(`Action déclenchée: ${action}`);
    handleSend(`Je souhaite ${action.toLowerCase()}`);
  };

  const handleSend = async (message: string) => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInput('');
    setLoading(true);

    try {
      const chat = await ai.chats.create({
        model: "gemini-2.0-flash",
        history: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
        config: { systemInstruction: SYSTEM_PROMPT }
      });
      
      const result = await chat.sendMessage({ message: message });
      setMessages(prev => [...prev, { role: 'assistant', content: result.text || '' }]);
    } catch (e: any) {
      console.error(e);
      let errorMessage = "Désolé, je rencontre une petite difficulté technique. Reposez-moi votre question, je reste prêt.";
      if (e.status === 429 || e.toString().includes("RESOURCE_EXHAUSTED")) {
        errorMessage = "Oups ! Fiko est temporairement en maintenance pour une meilleure expérience, en attendant vous pouvez nous joindre sur wa.me/+225054442767";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#0B0B0F] border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Oswald'] font-bold mb-6">
            Une question ? Fiko vous répond en temps réel.
          </h2>
          <p className="text-gray-400 text-lg">
            Posez n’importe quelle question sur votre business, votre site ou votre acquisition client.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i}>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/5">
                        {m.role === 'assistant' ? <Bot className="text-[#FF2718]" size={20} /> : <User className="text-gray-400" size={20} />}
                    </div>
                    <div className={`p-4 rounded-2xl ${m.role === 'assistant' ? 'bg-white/10 text-white rounded-tl-none' : 'bg-[#FF2718] text-white rounded-tr-none'}`}>
                        {m.content.split(/(https?:\/\/[^\s]+|wa\.me\/[^\s]+)/g).map((part, i) => 
                          part.match(/(https?:\/\/[^\s]+|wa\.me\/[^\s]+)/) ? (
                            <a key={i} href={part.startsWith('http') ? part : `https://${part}`} target="_blank" rel="noopener noreferrer" className="underline font-bold text-white hover:text-[#FF2718]">
                              {part}
                            </a>
                          ) : (
                            part
                          )
                        )}
                    </div>
                </motion.div>
                
                {/* CTA buttons for assistant messages after depth 2 */}
                {m.role === 'assistant' && userTurnCount >= 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 ml-14 mt-3">
                        {['Lancer mon analyse', 'Voir les offres', 'Activer mon système'].map(action => (
                            <button key={action} onClick={() => handleCtaClick(action)} className="text-[10px] uppercase tracking-widest border border-[#FF2718]/30 hover:bg-[#FF2718] px-3 py-1.5 rounded-full text-gray-300 hover:text-white transition-all">
                                {action}
                            </button>
                        ))}
                    </motion.div>
                )}
              </div>
            ))}
            {loading && <div className="flex gap-4"><Loader2 className="animate-spin text-[#FF2718]" /></div>}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2 flex-wrap mb-4">
              {['Comment avoir plus de clients ?', 'Pourquoi mon site ne convertit pas ?', 'Est-ce que ça marche pour mon business ?'].map(s => (
                <button key={s} onClick={() => handleSend(s)} className="text-xs bg-white/5 hover:bg-[#FF2718] transition-colors border border-white/10 px-3 py-1.5 rounded-full text-gray-300 hover:text-white">
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend(input)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF2718]" placeholder="Posez votre question à Fiko..." />
              <button onClick={() => handleSend(input)} className="bg-[#FF2718] p-3 rounded-xl"><Send size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
