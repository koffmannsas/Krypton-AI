import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, FikoLead } from '../types';
import { db } from '../firebase';
import { doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Bot, Send, ShieldCheck, Rocket, CheckCircle, Crosshair, AlertCircle, Sparkles, TrendingUp, Zap, Target } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { KRYPTON_PRICING, PricingPlan } from '../pricingData';
import { useNavigate } from 'react-router-dom';

interface FikoOnboardingOverlayProps {
  user: UserProfile;
  onComplete: () => void;
}

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '' });

const FIKO_SYSTEM_PROMPT = `
Tu es FIKO, le Master Closer de KRYPTON AI (v2.0). Ton but est d'accompagner les nouveaux utilisateurs dans leur stratégie et de transformer leur vision en machine de revenus.

TON PHILOSOPHIE :
"Votre site devient votre meilleur commercial. Attirez, qualifiez et transformez vos visiteurs en clients, automatiquement."
"Krypton AI conçoit des sites intelligents qui travaillent pour vous 24h/24. Fini les vitrines passives."

TES MISSIONS :
1. ANALYSER : Comprendre le business, l'objectif, le volume actuel, le budget et l'urgence.
2. REFORMULER : Montre ton expertise en reformulant le besoin du client de manière percutante.
3. PROJETER : Projette des résultats concrets (clients, revenus) grâce à l'IA.
4. RECOMMANDER : Propose UNE SEULE offre claire parmi les suivantes : 
   - STARTER (250k XOF) : Pour démarrer (Indépendants/TPE).
   - PRO (550k XOF) : Le standard de croissance (Recommandé par défaut).
   - ELITE (1.25M XOF) : Pour le scaling et l'automatisation totale.
5. URGENCE : Insiste sur le fait que l'activation prioritaire est disponible AUJOURD'HUI.

LES QUESTIONS (à poser une par une) :
1. Quel est ton business exactly ?
2. Quel est ton objectif principal de croissance ?
3. Quel volume de clients génères-tu actuellement ?
4. Quel est ton budget / capacité d'investissement ?
5. Dans combien de temps veux-tu voir les premiers résultats ?

Dès que tu as collecté assez d'informations, appelle 'finalize_onboarding' avec les données extraites et l'offre recommandée.
Ne sois pas robotique. Sois un expert, un directeur commercial, pas un chatbot.
`;

export default function FikoOnboardingOverlay({ user, onComplete }: FikoOnboardingOverlayProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [startTime] = useState(Date.now());
  const [step, setStep] = useState(0); 
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [offerReady, setOfferReady] = useState(false);
  const [leadScore, setLeadScore] = useState(0);
  const [velocityScore, setVelocityScore] = useState(0);
  const [recommendedPlan, setRecommendedPlan] = useState<PricingPlan | null>(null);
  
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, analyzing, analysisStep]);

  useEffect(() => {
    const initChat = async () => {
      chatRef.current = ai.chats.create({
        model: 'gemini-2.0-flash',
        config: {
          systemInstruction: FIKO_SYSTEM_PROMPT,
          tools: [{
            functionDeclarations: [
              {
                name: 'finalize_onboarding',
                description: 'À utiliser lorsque la qualification est terminée pour générer la stratégie et l\'offre.',
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    businessType: { type: Type.STRING },
                    objective: { type: Type.STRING },
                    revenueLevel: { type: Type.STRING },
                    budget: { type: Type.STRING },
                    urgency: { type: Type.STRING },
                    recommendedPlanId: { type: Type.STRING, enum: ['starter', 'pro', 'elite'] },
                    strategicJustification: { type: Type.STRING, description: 'Pourquoi cette offre est la meilleure pour ce client précis.' }
                  },
                  required: ['businessType', 'objective', 'revenueLevel', 'budget', 'urgency', 'recommendedPlanId', 'strategicJustification']
                }
              }
            ]
          }]
        }
      });
      
      const greeting = `Félicitations pour ton accès ${user.firstName}. Je suis FIKO, le Master Closer de Krypton AI. On va transformer ton site en machine de conversion. Quel est exactement ton business ?`;
      setMessages([{ role: 'model', text: greeting }]);
      setStep(1);
    };
    initChat();
  }, [user]);

  const handleSend = async () => {
    if (!input.trim() || analyzing || offerReady) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      
      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === 'finalize_onboarding') {
          await completeOnboarding(call.args);
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
        setStep(prev => Math.min(prev + 1, 5));
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Connexion réseau instable. Recommence, s\'il te plaît.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAdvancedScore = (args: any) => {
    let score = 0;
    
    // 1. Budget (40%)
    const budget = args.budget?.toLowerCase() || '';
    if (budget.includes('élevé') || budget.includes('high') || budget.includes('10k') || budget.includes('5k')) score += 40;
    else if (budget.includes('moyen') || budget.includes('1k')) score += 25;
    else score += 10;

    // 2. Urgency (25%)
    const urgency = args.urgency?.toLowerCase() || '';
    if (urgency.includes('immédia') || urgency.includes('urgent') || urgency.includes('now')) score += 25;
    else if (urgency.includes('1 mois') || urgency.includes('soon')) score += 15;
    else score += 5;

    // 3. Business Maturity (15%)
    const revenue = args.revenueLevel?.toLowerCase() || '';
    if (revenue.includes('audit') || revenue.includes('+') || revenue.includes('clients')) score += 15;
    else score += 10;

    // 4. Need/Objective (10%)
    const objective = args.objective?.toLowerCase() || '';
    if (objective.includes('croissance') || objective.includes('vente') || objective.includes('automatisation')) score += 10;
    else score += 5;

    // 5. Engagement (10%)
    const engagementBonus = Math.min(messages.length * 2, 10);
    score += engagementBonus;

    // Score Velocity Bonus
    const timeTaken = (Date.now() - startTime) / 1000; // ms -> s
    const velocity = timeTaken < 60 ? 20 : timeTaken < 120 ? 10 : 5;
    setVelocityScore(velocity);

    return Math.min(score, 100);
  };

  const completeOnboarding = async (args: any) => {
    setAnalyzing(true);
    
    const score = calculateAdvancedScore(args);
    setLeadScore(score);

    const plan = KRYPTON_PRICING.find(p => p.id === args.recommendedPlanId) || KRYPTON_PRICING[1];
    setRecommendedPlan({
      ...plan,
      description: args.strategicJustification || plan.description
    });

    try {
      const userRef = doc(db, 'users', user.uid || user.id);
      await updateDoc(userRef, {
        onboardingCompleted: true,
        businessType: args.businessType || '',
        objective: args.objective || '',
        revenueLevel: args.revenueLevel || '',
        budget: args.budget || '',
        urgency: args.urgency || '',
        recommendedPlanId: plan.id,
        updatedAt: serverTimestamp()
      });

      const leadRef = doc(db, 'leads', user.uid || user.id);
      await setDoc(leadRef, {
        userId: user.uid || user.id,
        email: user.email,
        score: score,
        velocity: (Date.now() - startTime) / 1000,
        status: 'new',
        qualification: score >= 85 ? 'hot' : score >= 60 ? 'warm' : 'cold',
        source: 'signup_onboarding',
        createdAt: serverTimestamp(),
        recommendedOffer: plan.name
      });
    } catch (e) {
      console.error("Firebase update failed", e);
    }

    setTimeout(() => setAnalysisStep(1), 1200);
    setTimeout(() => setAnalysisStep(2), 2400);
    setTimeout(() => setAnalysisStep(3), 3600);
    setTimeout(() => {
      setAnalyzing(false);
      setOfferReady(true);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-[500] bg-[#0A0A0C] flex flex-col items-center justify-center p-4">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-3xl flex flex-col h-full max-h-[90vh] relative z-10">
        
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-red-600/10 border border-red-500/20 rounded-2xl mb-4 relative">
            <Bot className="text-red-500 w-8 h-8" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0A0A0C]" 
            />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
            Audit Stratégique <span className="text-red-500">v2.0</span>
          </h2>
          <div className="w-full bg-white/5 rounded-full h-1 mb-2 overflow-hidden max-w-md mx-auto">
            <motion.div 
              className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${analyzing || offerReady ? 100 : (step / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-[10px] text-white/30 font-black tracking-[0.3em] uppercase">
            {analyzing ? 'Analyse Décisionnelle' : offerReady ? 'Closing en cours' : `Qualification • Étape ${step}/5`}
          </p>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            
            {!analyzing && !offerReady && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                className="h-full flex flex-col bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-3xl"
              >
                <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                  {messages.map((m, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-3xl p-5 ${
                        m.role === 'user' 
                        ? 'bg-white/10 text-white border border-white/5 rounded-tr-none' 
                        : 'bg-gradient-to-br from-red-950/40 to-black/40 text-red-50 border border-red-500/20 rounded-tl-none shadow-xl'
                      }`}>
                        {m.role === 'model' && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                              <Bot size={10} className="text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Master Closer FIKO</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed font-medium">{m.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div key="typing" className="flex gap-1.5 p-4 items-center">
                      {[0, 1, 2].map(n => (
                        <motion.div 
                          key={n}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1, delay: n * 0.2 }}
                          className="w-1.5 h-1.5 bg-red-500 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-6 bg-black/50 border-t border-white/5 backdrop-blur-xl">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 pr-4 focus-within:border-red-500/50 transition-all shadow-inner">
                    <input 
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder="Réponds à Fiko..."
                      className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none px-4 py-2"
                      disabled={isLoading}
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center disabled:opacity-50 hover:bg-red-500 transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {analyzing && (
              <motion.div 
                key="analysis"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-12"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-[60px] animate-pulse rounded-full" />
                  <div className="w-40 h-40 border-b-4 border-red-500 rounded-full animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 w-16 h-16" />
                </div>
                
                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {analysisStep >= 1 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 text-white/50">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">Matrice de scoring calculée</span>
                      </motion.div>
                    )}
                    {analysisStep >= 2 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 text-white/50">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">Offre personnalisée identifiée</span>
                      </motion.div>
                    )}
                    {analysisStep >= 3 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 text-red-400">
                        <Zap size={16} className="animate-bounce" />
                        <span className="text-sm font-black uppercase tracking-widest">Closing intelligent prêt.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {offerReady && recommendedPlan && (
              <motion.div 
                key="offer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center max-w-xl mx-auto"
              >
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 text-center relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                  
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                  
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/20 border border-red-500/30 rounded-full mb-8">
                    <Sparkles size={12} className="text-red-500" />
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Recommandé par FIKO</span>
                  </div>

                  <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
                    Pack {recommendedPlan.name}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-8 leading-relaxed italic px-6">
                    "{recommendedPlan.description}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <TrendingUp size={20} className="text-green-500 mx-auto mb-2" />
                      <p className="text-[10px] text-white/40 uppercase font-black">Score Vélocité</p>
                      <p className="text-xl font-black text-white">{velocityScore}%</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <Target size={20} className="text-blue-500 mx-auto mb-2" />
                      <p className="text-[10px] text-white/40 uppercase font-black">Score Lead</p>
                      <p className="text-xl font-black text-white">{leadScore}/100</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-10 text-left">
                    {recommendedPlan.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <CheckCircle size={14} className="text-red-500" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => navigate('/billing/payment', { state: { plan: recommendedPlan, user } })}
                      className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-red-600/20 transform active:scale-95 flex items-center justify-center gap-3"
                    >
                      Activer Maintenant <Zap size={16} />
                    </button>
                    
                    <button 
                      onClick={onComplete}
                      className="text-white/30 hover:text-white/60 text-[10px] font-black uppercase tracking-widest transition-colors py-2"
                    >
                      Accéder au Dashboard (Plus tard)
                    </button>
                  </div>

                  <p className="mt-8 text-[10px] text-white/40 italic font-medium">
                    "Basé sur votre situation, voici la meilleure stratégie pour vous."
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PAYMENT MODAL INTEGRATED */}
      </div>
    </div>
  );
}
