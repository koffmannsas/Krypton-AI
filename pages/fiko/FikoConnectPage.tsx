"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, Zap, Smartphone, CheckCircle2, TrendingUp, Bot, Mic, Lock, PlayCircle, XCircle, Clock } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Page } from "../../types";

interface Props {
  onNavigate: (page: Page) => void;
  onOpenVocal: (gate: any) => void;
}

// [Design System Constants]
const COLORS = {
  primary: "#E10600", // Krypton Red
  bg: "#050505",
  text: "#FFFFFF",
  glass: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
};

/**
 * [EFFET 1] HERO / SYSTEM ACTIVATION
 */
const SystemActivationHero = () => {
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const logPool = ["Analyse de votre activité...", "+1 client potentiel détecté", "Connexion à WhatsApp...", "Activation du moteur Fiko..."];
    let i = 0;
    const interval = setInterval(() => {
     if(i < logPool.length) {
       setLogs(prev => [...prev, logPool[i]]);
       i++;
     }
  }, 1000);
  return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <div className="flex flex-col gap-2 font-mono text-sm text-[#E10600] mb-8">
        {logs.map((log, i) => <motion.div key={log + i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{`> ${log}`}</motion.div>)}
      </div>

      <motion.h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        Votre WhatsApp pourrait <br/> déjà être en train de vendre.
      </motion.h1>
      <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl">
        Fiko Connect transforme chaque message en opportunité de vente.
      </p>
      
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        className="px-10 py-5 bg-[#E10600] text-white font-black uppercase tracking-widest text-lg rounded-full shadow-[0_0_40px_rgba(225,6,0,0.4)]"
      >
        Tester Fiko maintenant
      </motion.button>
    </section>
  );
};

/**
 * [EFFET 2/3] SMARTPHONE + SIMULATION (FLOW COMPLET)
 */
const WhatsAppStickyButton = () => (
    <motion.a
        href="https://wa.me/your-number"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold hover:scale-110 transition-transform"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
    >
        <span className="hidden md:inline">Tester Fiko sur WhatsApp</span>
        <span className="md:hidden">💬</span>
    </motion.a>
);

const InteractiveSimulation = ({ activePlan }: { activePlan: string }) => {
    const [messages, setMessages] = useState<{id: string, sender: 'client' | 'fiko', text: string, isClosing?: boolean}[]>([]);
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    // Define scenarios based on plan
    const scenarios: Record<string, { sender: 'client' | 'fiko', text: string, isClosing?: boolean }[]> = {
        START: [
            { sender: 'client', text: "Bonjour, info ?" },
            { sender: 'fiko', text: "Bonjour 👋. Fiko Start activé." },
            { sender: 'fiko', text: "Vous perdez des clients sans suivi. Fiko le récupère." },
        ],
        PRO: [
            { sender: 'client', text: "Bonjour, je veux des infos..." },
            { sender: 'fiko', text: "Bonjour 👋. Je vous aide pour vos ventes." },
            { sender: 'fiko', text: "Vous perdez environ 3 à 5 clients/jour." },
            { sender: 'fiko', text: "Fiko Connect peut récupérer ces ventes." },
            { sender: 'client', text: "Ok, je valide." },
            { sender: 'fiko', text: "Parfait. Activation : https://fiko-pay.com/paiement/xdf", isClosing: true },
        ],
        BUSINESS: [
            { sender: 'client', text: "Infos ?" },
            { sender: 'fiko', text: "Bonjour 👋. Lead qualifié détecté." },
            { sender: 'fiko', text: "Priorité : HOT 🔥. Relance activée." },
            { sender: 'fiko', text: "Structure commerciale en place. Prêt ?" },
        ],
        EMPIRE: [
            { sender: 'client', text: "Je veux commander" },
            { sender: 'fiko', text: "Système EMPIRE détecté. Auto-closing..." },
            { sender: 'fiko', text: "Paiement en cours. Vente réussie ✅" },
            { sender: 'fiko', text: "Empire : Croissance illimitée." },
        ]
    };

    const [leads, setLeads] = useState(120);
    const [convs, setConvs] = useState(2);
    const [simulationFinished, setSimulationFinished] = useState(false);

    useEffect(() => {
        let isCancelled = false;
        const timeouts: NodeJS.Timeout[] = [];
        
        // Reset state
        setMessages([]);
        setSimulationFinished(false);
        const flow = scenarios[activePlan] || scenarios.PRO;
        
        let delay = 500;
        flow.forEach((msg, i) => {
            const t1 = setTimeout(() => {
                if (isCancelled) return;
                setTyping(true);
                const t2 = setTimeout(() => {
                    if (isCancelled) return;
                    setTyping(false);
                    setMessages(prev => [...prev, { ...msg, id: `msg-${activePlan}-${i}-${Date.now()}` }]);
                    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                    
                    if (i === flow.length - 1) setSimulationFinished(true); // Fini
                }, i === flow.length - 1 ? 400 : 800); // Accelerates
                timeouts.push(t2);
            }, delay);
            timeouts.push(t1);
            delay += i === flow.length - 1 ? 1000 : 1200; // Rhythm accelerates
        });
        
        // Sim live background
        const interval = setInterval(() => {
            if (Math.random() > 0.7) setLeads(prev => prev + 1);
            if (Math.random() > 0.8) setConvs(prev => prev + 1);
        }, 3000);
        
        return () => {
            isCancelled = true;
            timeouts.forEach(clearTimeout);
            clearInterval(interval);
        };
    }, [activePlan]);

    return (
        <section className="py-24 px-6 bg-white/5 border-y border-white/10">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                    <h2 className="text-5xl font-black uppercase tracking-tighter">Chaque conversation peut devenir une vente.</h2>
                    <p className="text-xl text-slate-400">Voyez Fiko Connect en action : le closing automatisé, sans effort.</p>
                </div>
                <div className="w-[320px] h-[640px] bg-neutral-900 rounded-[50px] border-[10px] border-neutral-800 p-4 relative shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full p-2 bg-neutral-800 text-[10px] flex justify-between px-4">
                        <span className="text-[#00FF00]">● Fiko Actif</span>
                        <span>{leads} Leads | {convs} Convs</span>
                    </div>
                    {/* Phone Mockup Screen */}
                    <div className="bg-[#050510] h-full rounded-[30px] p-4 flex flex-col pt-8">
                        <div className="flex items-center gap-2 mb-4 p-2 bg-neutral-800 rounded-xl">
                            <Bot className="text-[#00F0FF]" />
                            <span className="text-sm font-bold">Fiko Assistant</span>
                        </div>
                        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1">
                            {messages.map((msg, i) => (
                                <motion.div 
                                    key={msg.id} 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                                        msg.sender === 'client' 
                                        ? 'bg-neutral-800 rounded-bl-sm self-start' 
                                        : msg.isClosing 
                                            ? 'bg-[#E10600] rounded-br-sm self-end text-white shadow-[0_0_15px_rgba(225,6,0,0.6)] animate-pulse'
                                            : 'bg-[#E10600] rounded-br-sm self-end text-white shadow-[0_0_15px_rgba(225,6,0,0.4)]'
                                    }`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                            {typing && <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="p-3 bg-neutral-800 rounded-2xl w-12 ml-2">...</motion.div>}
                        </div>
                    </div>
                </div>
                {simulationFinished && (
                    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="flex flex-col items-center gap-4">
                        <p className="text-sm text-slate-400 italic">"Votre WhatsApp ne manque pas de clients. Il manque un système pour les transformer."</p>
                        <button className="px-8 py-4 bg-[#E10600] rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform">🔥 Activer mon système maintenant</button>
                        <div className="text-center p-6 bg-red-900/10 border border-red-900/30 rounded-2xl mt-4 max-w-sm">
                            <p className="text-xs text-red-400 uppercase tracking-widest mb-1">Estimation actuelle :</p>
                            <p className="text-lg font-black text-white">Vous perdez ≈ 300 000 à 900 000 FCFA / mois</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

/**
 * [EFFET 3/5] OBJECTIVE SELECTOR (GUIDED DECISION)
 */
const ObjectiveSelector = ({ onSelect, activeObjective }: { onSelect: (plan: string, obj: string) => void, activeObjective: string | null }) => (
    <div className="flex flex-col items-center py-10 bg-[#050505]">
      <h3 className="mb-6 text-slate-400 font-bold uppercase tracking-widest text-sm">Quel est votre objectif principal ?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
          <button onClick={() => onSelect("PRO", "Faire plus de ventes")} className={`px-8 py-4 border rounded-full transition-all ${activeObjective === "Faire plus de ventes" ? 'border-[#E10600] bg-[#E10600]/10 text-white' : 'border-white/20 hover:border-[#E10600]'}`}>💸 Faire plus de ventes</button>
          <button onClick={() => onSelect("START", "Gagner du temps")} className={`px-8 py-4 border rounded-full transition-all ${activeObjective === "Gagner du temps" ? 'border-[#E10600] bg-[#E10600]/10 text-white' : 'border-white/20 hover:border-[#E10600]'}`}>⚡ Gagner du temps</button>
          <button onClick={() => onSelect("EMPIRE", "Développer mon business")} className={`px-8 py-4 border rounded-full transition-all ${activeObjective === "Développer mon business" ? 'border-[#E10600] bg-[#E10600]/10 text-white' : 'border-white/20 hover:border-[#E10600]'}`}>📈 Développer mon business</button>
      </div>
    </div>
);

/**
 * [EFFET 4/5] PRICING (GAMEIFIED)
 */
const PricingSection = ({ setActivePlan }: { setActivePlan: (plan: string) => void }) => {
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

    const plans = [
        { 
            name: "START", color: "text-slate-400", badge: "Activation", price: "10 000", 
            hook: "Arrêtez de perdre des clients pendant que vous êtes occupé",
            feats: ["1 compte WhatsApp", "IA réponse auto", "Relance auto J+1", "300 msg IA / mois"],
            stats: { before: "Clients ignorés", after: "Clients servis" },
            roi: "40 000+", cta: "Je récupère mes ventes" 
        },
        { 
            name: "PRO", color: "text-[#E10600]", badge: "⭐ LE PLUS RENTABLE", price: "30 000", 
            hook: "Transformez vos conversations en ventes automatiques",
            feats: ["IA Fiko avancée", "Qualification auto", "Relance multi-étapes", "1 500 msg IA / mois"],
            stats: { before: "Réponses manuelles", after: "Ventes automatiques" },
            roi: "120 000+", cta: "J'active mon commercial IA", highlighted: true
        },
        { 
            name: "BUSINESS", color: "text-purple-400", badge: "Structure", price: "50 000", 
            hook: "Arrêtez de gérer le chaos, structurez vos ventes",
            feats: ["3 comptes WhatsApp", "Dashboard & Tracking", "Lead Scoring", "3 000 msg IA / mois"],
            stats: { before: "Désordre commercial", after: "Contrôle total" },
            roi: "450 000+", cta: "Je structure mon business"
        },
        { 
            name: "EMPIRE", color: "text-amber-400", badge: "Domination", price: "100 000", 
            hook: "Transformez votre business en machine à vendre",
            feats: ["10+ WhatsApp", "IA Premium + CRM", "Paiement intégré", "10 000 msg IA / mois"],
            stats: { before: "Capacité limitée", after: "Machine illimitée" },
            roi: "3 000 000+", cta: "J'active la machine"
        }
    ];

    return (
        <section className="py-32 px-6 bg-[#0B0B0F] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 animate-pulse">
                        <span className="w-2 h-2 bg-[#E10600] rounded-full"></span>
                        3 entreprises activent Fiko en ce moment
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Choisissez votre puissance</h2>
                    <p className="text-slate-400">Chaque jour sans Fiko, vos clients achètent ailleurs.</p>
                </div>
            
                <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-6 mb-16 pb-6 px-6 -mx-6 md:px-0 md:mx-0 md:flex-wrap md:grid md:grid-cols-2 lg:grid-cols-4">
                    {plans.map((p, i) => (
                        <motion.div 
                            key={p.name} 
                            whileHover={{ y: -10, scale: 1.02 }}
                            onHoverStart={() => { setHoveredPlan(i); setActivePlan(p.name); }}
                            onHoverEnd={() => setHoveredPlan(null)}
                            className={`min-w-[280px] p-8 rounded-[24px] bg-gradient-to-b from-[#18181C] to-[#0B0B0F] border backdrop-blur-xl flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 snap-center ${p.highlighted ? 'border-[#E10600] shadow-[0_0_40px_rgba(225,6,0,0.2)]' : 'border-white/10'}`}
                        >
                            {p.highlighted && <div className="absolute inset-x-0 top-0 h-1 bg-[#E10600]" />}
                            
                            <div className={`${p.color} font-bold text-xs uppercase mb-4 tracking-widest`}>{p.badge}</div>
                            <h3 className="text-2xl font-black mb-1 tracking-tight">{p.name}</h3>
                            <div className="text-lg font-black text-white mb-6">{p.price} <span className="text-sm font-normal text-slate-500">FCFA / mois</span></div>
                            
                            <p className="text-sm text-slate-400 mb-8 h-16 italic">"{p.hook}"</p>

                            <ul className="space-y-3 text-sm text-slate-300 w-full text-left mb-8 flex-1">
                                {p.feats.map((f, j) => <li key={j} className="flex gap-2">✔ {f}</li>)}
                            </ul>

                            <div className="w-full bg-[#050505] p-3 rounded-xl mb-6 border border-white/5">
                                {hoveredPlan === i ? (
                                    <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="text-center text-xs">
                                        <div className="text-neutral-500 line-through">{p.stats.before}</div>
                                        <div className="text-[#00F0FF] font-bold">→ {p.stats.after}</div>
                                        <div className="text-[#E10600] font-black ">+{p.roi} FCFA / mois</div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center text-xs text-slate-500 uppercase tracking-widest">Survolez pour voir le ROI</div>
                                )}
                            </div>

                            <button className={`w-full py-4 rounded-xl font-black uppercase text-sm tracking-widest transition-all ${p.highlighted ? 'bg-[#E10600] text-white hover:bg-[#ff1a1a]' : 'border border-[#E10600] text-[#E10600] hover:bg-[#E10600] hover:text-white'}`}>
                                {p.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-xl mx-auto text-center">
                    <div className="text-sm text-slate-500 mb-2 uppercase tracking-widest">Votre système de vente est prêt à</div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-[#E10600]" initial={{ width: "60%" }} animate={{ width: hoveredPlan !== null ? "100%" : "70%" }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function FikoConnectPage({ onNavigate, onOpenVocal }: Props) {
  const [activePlan, setActivePlan] = useState<string>("PRO");
  const [objective, setObjective] = useState<string | null>(null);

  const handleObjective = (plan: string, obj: string) => {
      setActivePlan(plan);
      setObjective(obj);
  };
  
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <WhatsAppStickyButton />
      <SystemActivationHero />
      <InteractiveSimulation activePlan={activePlan} />
      <ObjectiveSelector onSelect={handleObjective} activeObjective={objective} />
      <PricingSection setActivePlan={setActivePlan} />
      
      <section className="py-24 text-center bg-[#050505]">
        <h2 className="text-5xl font-black mb-10 uppercase tracking-tighter">Votre système est prêt.</h2>
        <p className="text-xl text-slate-400 mb-8 max-w-lg mx-auto">Vous n’avez pas besoin de plus de clients. Vous avez besoin d’un système pour ne plus en perdre.</p>
        <button className="px-12 py-6 bg-[#E10600] text-white font-black uppercase text-xl rounded-full hover:scale-105 transition-transform">Activer Fiko Connect maintenant</button>
      </section>
    </div>
  );
}
