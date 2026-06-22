"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  MessageSquare, 
  Target, 
  Zap, 
  Rocket, 
  BarChart3, 
  ChevronRight, 
  Globe, 
  ShieldCheck, 
  Smartphone, 
  Cpu,
  Brain,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  CreditCard,
  Truck,
  Send
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// --- Components ---

const FikoHubCore = () => {
  return (
    <div className="relative size-[300px] md:size-[500px] flex items-center justify-center">
      {/* Outer rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-white/5 border-dashed"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[10%] rounded-full border border-[#E10600]/10 border-dashed"
      />
      
      {/* Glowing Core Background */}
      <div className="absolute inset-[25%] rounded-full bg-[#E10600]/5 blur-[80px] animate-pulse" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative size-[200px] md:size-[300px] bg-gradient-to-br from-[#E10600] via-[#500] to-black rounded-full shadow-[0_0_100px_rgba(225,6,0,0.6)] flex items-center justify-center overflow-hidden border border-white/10"
      >
        {/* Inner neural-like patterns */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-[#E10600] rounded-full blur-[60px]"
        />
        <Brain size={80} className="text-white relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
      </motion.div>

      {/* Floating Module Indicators - Distributed around the core */}
      {[
        { icon: Brain, label: "AI", angle: -90, color: "#E10600" },
        { icon: Smartphone, label: "CONNECT", angle: -18, color: "#22c55e" },
        { icon: Mail, label: "SEND", angle: 54, color: "#3b82f6" },
        { icon: CreditCard, label: "PAY", angle: 126, color: "#f59e0b" },
        { icon: Truck, label: "LOGISTICS", angle: 198, color: "#8b5cf6" }
      ].map((mod, i) => {
        const radius = 180; // Distance from center
        const x = Math.cos((mod.angle * Math.PI) / 180) * radius;
        const y = Math.sin((mod.angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: 1, 
              x: x, 
              y: y,
            }}
            transition={{ 
              delay: 0.8 + i * 0.1, 
              duration: 1.2, 
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-pointer"
          >
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              style={{ backgroundColor: `${mod.color}20`, borderColor: `${mod.color}40` }}
              className="size-14 rounded-2xl backdrop-blur-xl border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500"
            >
              <mod.icon size={24} style={{ color: mod.color }} />
            </motion.div>
            <div className="text-[9px] font-black tracking-[0.3em] text-white/60 uppercase group-hover:text-white transition-colors">{mod.label}</div>
            
            {/* Connecting line to core */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none -z-10 overflow-visible">
              <motion.line 
                x1="0" y1="0" x2={-x} y2={-y}
                stroke={mod.color} 
                strokeWidth="0.5" 
                strokeDasharray="2 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

const AICampaignSimulation = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "IDÉE", content: "Lancement Collection Été" },
    { label: "FIKO AI", content: "Storytelling Localisé (Dakar/Abidjan/Lagos)" },
    { label: "GÉNÉRATION", content: "Segments Optimisés (92.5% Engagement)" },
    { label: "DÉPLOIEMENT", content: "Omnicanal: SMS + Email + WhatsApp" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % steps.length), 3500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sparkles size={160} />
      </div>
      
      <div className="flex flex-col gap-10 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-[#E10600] rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E10600]">FIKO ENGINE LIVE</span>
          </div>
          <div className="text-[9px] text-slate-600 font-mono tracking-widest">{new Date().toLocaleTimeString()}</div>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              className={`flex items-start gap-4 transition-all duration-700 ${i === step ? "opacity-100 translate-x-4" : "opacity-20 hover:opacity-40"}`}
            >
              <div className={`mt-1 size-6 rounded-md flex items-center justify-center shrink-0 text-[10px] font-black ${i === step ? "bg-[#E10600] text-white shadow-[0_0_15px_rgba(225,6,0,0.5)]" : "bg-white/5 text-slate-500"}`}>
                {i + 1}
              </div>
              <div>
                <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${i === step ? "text-[#E10600]" : "text-slate-600"}`}>{s.label}</div>
                <div className="text-sm font-bold text-white tracking-tight">{s.content}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5">
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Impact Prévu</div>
            <div className="text-2xl font-black text-white tracking-tighter">4.8x ROI</div>
          </div>
          <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5">
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Délivrabilité</div>
            <div className="text-2xl font-black text-[#E10600] tracking-tighter">99.9%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FikoSendPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen selection:bg-[#E10600] selection:text-white pb-0 font-sans overflow-x-hidden">
      
      {/* 🧠 HERO SECTION — ULTRA IMMERSIVE */}
      <section className="relative min-h-screen lg:min-h-[115vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* CINEMATIC BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(225,6,0,0.15),transparent_60%)]" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Subtle moving lines background */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" 
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center max-w-6xl"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#E10600]/10 border border-[#E10600]/30 rounded-full mb-12 backdrop-blur-md">
              <span className="size-2 bg-[#E10600] rounded-full animate-pulse shadow-[0_0_10px_#E10600]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E10600]">Écosystème Krypton IA — FIKO SEND</span>
            </div>
            
            <h1 className="text-[70px] md:text-[160px] lg:text-[200px] font-black uppercase tracking-tighter leading-[0.8] mb-12 bg-gradient-to-b from-white via-white to-white/10 bg-clip-text text-transparent">
              FIKO <span className="text-[#E10600]">SEND</span>
            </h1>
          </motion.div>

          {/* Live Platform Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-32 w-full max-w-5xl">
            {[
              { val: "+12 480", label: "campagnes lancées", icon: Send },
              { val: "+1 240", label: "entreprises connectées", icon: Users },
              { val: "99.9%", label: "délivrabilité IA", icon: ShieldCheck },
              { val: "+32%", label: "reconversion moyenne", icon: TrendingUp }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="group relative p-8 border border-white/5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all"
              >
                <div className="text-3xl font-black text-white mb-2 tracking-tighter group-hover:text-[#E10600] transition-colors">{stat.val}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 NEW INFO ZONE BELOW HERO */}
      <section className="py-32 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E10600]/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white max-w-5xl mx-auto leading-[1.1] mb-12 tracking-tighter uppercase">
              La première plateforme unifiée SMS & Emailing conçue en Afrique, <br className="hidden md:block"/>
              pour propulser le marketing des entreprises africaines.
            </h1>

            <h3 className="text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto font-medium mb-16 leading-relaxed">
              Créez, automatisez et orchestrez des campagnes intelligentes capables de convertir automatiquement vos prospects grâce à l’intelligence artificielle de Krypton AI.
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-7 bg-[#E10600] text-white rounded-full font-black uppercase tracking-[0.2em] shadow-[0_20px_60px_-10px_rgba(225,6,0,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-3 text-sm md:text-base">
                  🔥 Lancer ma première campagne IA
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 rounded-full" />
              </motion.button>
              
              <Link 
                to="/activation" 
                className="px-12 py-7 bg-[#0A0A0C] border border-white/10 text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-sm group"
              >
                ⚡ Explorer le FIKO HUB <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 SECTION — LE FUTUR DU MARKETING AFRICAIN */}
      <section className="py-40 bg-[#050507] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E10600]/10 border border-[#E10600]/20 rounded-full mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E10600]">New Infrastructure</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-12">
                Le marketing <br className="hidden md:block"/> africain <br/>
                <span className="text-slate-700">change de dimension.</span>
              </h2>
              <div className="space-y-8 text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                <p>Trop longtemps, les entreprises africaines ont dû composer avec des outils étrangers complexes, froids et non adaptés à nos comportements d'achat.</p>
                <p className="text-white">FIKO SEND est la première infrastructure technologique intelligente pensée Mobile-First et optimisée pour l'Afrique.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-16">
                <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                  <div className="text-[#E10600] font-black mb-3 uppercase text-[10px] tracking-[0.3em]">Module SMS</div>
                  <div className="text-white text-lg font-black uppercase tracking-tight">Ciblage Précis</div>
                </div>
                <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                  <div className="text-[#E10600] font-black mb-3 uppercase text-[10px] tracking-[0.3em]">Module IA</div>
                  <div className="text-white text-lg font-black uppercase tracking-tight">WhatsApp Ready</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <AICampaignSimulation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚀 SECTION — ÉCOSYSTÈME FIKO HUB */}
      <section className="py-48 bg-black relative">
        {/* Hub Connection Lines (Animated SVG Background) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full">
             <motion.circle cx="50%" cy="50%" r="300" stroke="#E10600" strokeWidth="0.5" fill="none" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 10, repeat: Infinity }} />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-[100px] font-black uppercase tracking-tighter leading-[0.9] mb-10">
              Un écosystème. <br/> Une intelligence. <br className="md:hidden"/> <span className="text-slate-800">Une infrastructure.</span>
            </h2>
            <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.6em] text-slate-500 italic">Bienvenue dans le FIKO HUB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "FIKO AI",
                desc: "La première intelligence artificielle business conçue en Afrique, pour aider les entreprises africaines à automatiser et scaler.",
                icon: Brain,
                color: "#E10600",
                badge: "Core AI"
              },
              {
                title: "FIKO CONNECT",
                desc: "Plateforme intelligente d’automatisation WhatsApp pour transformer les conversations en revenus.",
                icon: Smartphone,
                color: "#22C55E",
                badge: "Conversational"
              },
              {
                title: "FIKO SEND",
                desc: "Plateforme unifiée SMS & Emailing pour orchestrer vos campagnes marketing à grande échelle.",
                icon: Send,
                color: "#3B82F6",
                badge: "Marketing"
              },
              {
                title: "FIKO PAY",
                desc: "Infrastructure de paiement intelligent conçue pour simplifier les transactions des entreprises africaines.",
                icon: CreditCard,
                color: "#F59E0B",
                badge: "Payments"
              },
              {
                title: "FIKO LOGISTICS",
                desc: "Plateforme logistique intelligente connectant les entreprises à une livraison rapide et automatisée.",
                icon: Truck,
                color: "#8B5CF6",
                badge: "Delivery"
              },
              {
                title: "KRYPTON OS",
                desc: "Le système d'exploitation business du futur. Contrôlez votre empire depuis une interface unique.",
                icon: Cpu,
                color: "#FFFFFF",
                badge: "System"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, borderColor: `${item.color}40` }}
                className="group p-10 bg-[#0A0A0C] border border-white/5 rounded-[48px] transition-all flex flex-col items-start gap-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                  <item.icon size={120} />
                </div>
                <div 
                  style={{ backgroundColor: `${item.color}10`, color: item.color }}
                  className="size-16 rounded-3xl flex items-center justify-center shrink-0 border border-current transition-all"
                >
                  <item.icon size={32} />
                </div>
                <div className="flex-grow">
                  <div className="text-[9px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: item.color }}>{item.badge}</div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-6 group-hover:text-[#E10600] transition-colors">{item.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">{item.desc}</p>
                </div>
                <ArrowRight className="mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={24} style={{ color: item.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 SECTION — WHY FIKO SEND IS DIFFERENT */}
      <section className="py-40 bg-[#050507]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-16 bg-white/[0.01] border border-white/5 rounded-[60px] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 grayscale"><BarChart3 size={150} /></div>
              <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.5em] mb-16">Outils Traditionnels</h3>
              <ul className="space-y-10">
                {["Complexité technique avancée", "Expérience froide et figée", "Dépendance outils étrangers", "Emailing 100% manuel", "Coûts de gestion prohibitifs"].map((t, i) => (
                  <li key={i} className="flex items-center gap-6 text-slate-500 font-black uppercase text-xs tracking-[0.2em] opacity-60">
                    <div className="size-2 bg-slate-800 rounded-full" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-16 bg-gradient-to-br from-[#E10600] to-black border border-[#E10600]/30 rounded-[60px] shadow-[0_50px_120px_-20px_rgba(225,6,0,0.4)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10 animate-pulse"><Sparkles size={150} /></div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.5em] mb-16 flex items-center gap-3">
                <Zap size={14} className="animate-bounce" /> FIKO SEND — LE FUTUR
              </h3>
              <ul className="space-y-10">
                {[
                  "Intelligence Artificielle Native Afrique", 
                  "Orchestration Intelligente (IA Logic)", 
                  "Omnicanal Natif (SMS + WhatsApp + Email)", 
                  "Storytelling Automatisé par IA", 
                  "Délivrabilité Optimisée (99.9%)"
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-6 text-white font-black uppercase text-xs tracking-[0.2em]">
                    <div className="size-2 bg-white rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.8)]" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 SECTION — AI FEATURES GRID */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {[
               { title: "Génération Email IA", icon: Mail },
               { title: "Génération Image IA", icon: Sparkles },
               { title: "Segmentation Prédictive", icon: Target },
               { title: "Relance Automatique", icon: Rocket },
               { title: "Prédiction Conversion", icon: BarChart3 },
               { title: "Orchestration SMS + WA", icon: Smartphone },
               { title: "Optimisation Temps Réel", icon: Zap },
               { title: "Analytics Vision", icon: Globe }
             ].map((f, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -5 }}
                 className="flex flex-col items-center text-center group"
               >
                 <div className="size-20 bg-white/[0.03] border border-white/5 rounded-[32px] flex items-center justify-center mb-8 group-hover:bg-[#E10600] group-hover:scale-110 transition-all duration-500 shadow-xl">
                   <f.icon size={28} className="group-hover:text-white transition-colors text-[#E10600]" />
                 </div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/80">{f.title}</h4>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 🚀 SECTION — AFRICAN TECH VISION */}
      <section className="py-60 bg-black relative border-y border-white/5">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-tight mb-20 italic bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
              "Krypton AI construit l’infrastructure technologique qui permettra aux entreprises africaines de communiquer, vendre, automatiser et scaler."
            </h2>
            <div className="inline-block px-10 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.5em] text-xl md:text-2xl shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              La prochaine licorne africaine.
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 CTA FINAL IMMERSIF */}
      <section className="py-72 relative overflow-hidden flex items-center justify-center bg-black">
        {/* Dynamic Glow Background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-[#E10600] rounded-full blur-[160px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-20 leading-[0.9]">
              Entrez dans la <br className="hidden md:block"/>
              <span className="text-[#E10600]">prochaine génération</span> <br/>
               du business africain.
            </h2>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-10 md:px-14 py-6 md:py-8 bg-[#E10600] text-white rounded-full font-black uppercase tracking-[0.4em] text-sm md:text-xl shadow-[0_30px_70px_-10px_rgba(225,6,0,0.6)]"
            >
              🔥 ACTIVER FIKO SEND
              <div className="absolute inset-[-4px] rounded-full border border-[#E10600] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer Meta Trust */}
      <footer className="py-20 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-2">
            <div className="text-[24px] font-black tracking-tighter text-white">FIKO <span className="text-[#E10600]">SEND</span></div>
            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">Powered by Krypton Artificial Intelligence</div>
          </div>
          
          <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full">
               <ShieldCheck size={14} className="text-[#E10600]" /> Infrastructure sécurisée
             </div>
             <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full">
               <Globe size={14} className="text-blue-500" /> Pensé pour l'Afrique
             </div>
          </div>

          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 text-center md:text-right">
            Entreprise vérifiée par Meta • Technologie Partner <br className="hidden md:block"/> Optimized for WhatsApp Business API
          </div>
        </div>
      </footer>
    </div>
  );
}
