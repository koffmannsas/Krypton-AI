import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Globe, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Play, 
  Zap, 
  Cpu, 
  Crown, 
  Sparkles, 
  Trophy, 
  Mic, 
  Flame,
  CheckCircle2,
  Lock,
  Layout,
  MessageSquare
} from 'lucide-react';

const EgeriePage: React.FC = () => {
  const [introStep, setIntroStep] = useState(0);
  const [scoreSimulated, setScoreSimulated] = useState(false);
  const [iconScore, setIconScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Intro Sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setIntroStep(1), 1500),
      setTimeout(() => setIntroStep(2), 3500),
      setTimeout(() => setIntroStep(3), 5500),
      setTimeout(() => setIntroStep(4), 7500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // Icon Score Simulation
  useEffect(() => {
    if (scoreSimulated && iconScore < 92) {
      const interval = setInterval(() => {
        setIconScore(prev => Math.min(prev + 1, 92));
      }, 30);
      return () => clearInterval(interval);
    }
  }, [scoreSimulated, iconScore]);

  const stats = [
    { val: "250+", label: "Égéries stratégiques", icon: Crown },
    { val: "42+", label: "pays représentés", icon: Globe },
    { val: "1.2M+", label: "audience cumulée", icon: Users },
    { val: "98%", label: "rétention réseau", icon: ShieldCheck },
    { val: "14M+", label: "interactions générées", icon: Zap },
  ];

  const benefits = [
    { title: "Sponsoring KCG Premium", desc: "Financement direct et stratégique de vos projets créatifs par le groupe.", icon: Crown },
    { title: "Prime Stratégique Mensuelle", desc: "Une rémunération garantie pour soutenir votre croissance et votre statut.", icon: Flame },
    { title: "IA Elite Coach™", desc: "Un accès exclusif à nos outils d'intelligence artificielle de pointe.", icon: Cpu },
    { title: "Accès Campagnes & Visibilité", desc: "Des opportunités uniques sur les plus grandes marques du réseau.", icon: Zap },
    { title: "Image & Branding Coaching", desc: "Direction artistique de rang mondial pour structurer votre identité.", icon: Sparkles },
    { title: "Ecosystème Business Connecté", desc: "Une passerelle directe vers les entrepreneurs et les investisseurs.", icon: Globe },
  ];

  const testimonials = [
    { name: "SARA D.", role: "Artiste Visionnaire", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop", text: "Fiko a transformé ma portée d'influenceur en puissance économique réelle." },
    { name: "MALIK K.", role: "Tech Entrepreneur", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop", text: "Rejoindre l'élité était l'étape logique pour scaler mes projets en Afrique." },
    { name: "ELENA G.", role: "Culture Leader", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", text: "Un écosystème qui comprend enfin la valeur des icônes culturelles." }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-600 selection:text-black">
      
      {/* 🎬 CINEMATIC INTRO SEQUENCE */}
      <AnimatePresence>
        {introStep < 4 && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 text-center"
          >
            <AnimatePresence mode="wait">
              {introStep === 1 && (
                <motion.h2 
                  key="s1"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  className="text-2xl md:text-4xl font-light tracking-[0.4em] uppercase text-slate-400"
                >
                  Le réseau Fiko observe.
                </motion.h2>
              )}
              {introStep === 2 && (
                <motion.h2 
                  key="s2"
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  className="text-2xl md:text-4xl font-light tracking-[0.4em] uppercase text-slate-400"
                >
                  Certaines personnes créent du contenu.
                </motion.h2>
              )}
              {introStep === 3 && (
                <motion.h2 
                  key="s3"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  className="text-2xl md:text-4xl font-black tracking-[0.4em] uppercase text-white"
                >
                  D’autres influencent des marchés.
                </motion.h2>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌌 HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
        {/* Spatial Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,40,0.2)_0%,transparent_60%)]" />
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-20"
            style={{
              background: "radial-gradient(circle at center, rgba(197,160,40,0.1) 0%, transparent 70%)",
              filter: "blur(100px)"
            }}
          />
          {/* Animated Gold Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-1 bg-yellow-600/40 rounded-full"
              initial={{ 
                x: Math.random() * 2000 - 1000, 
                y: Math.random() * 2000 - 1000, 
                opacity: 0 
              }}
              animate={{ 
                y: [null, -150, 150], 
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 4 + Math.random() * 8, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Live Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 8 }}
          className="relative z-20 mb-12"
        >
          <div className="inline-flex items-center gap-6 px-6 py-2.5 bg-yellow-950/20 border border-yellow-700/30 rounded-full backdrop-blur-xl transition-all hover:bg-yellow-900/30">
            <div className="flex items-center gap-2">
              <span className="size-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_#C5A028]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500">Réseau Égérie Actif</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
              <span className="text-white">+3</span> Validations aujourd'hui
            </div>
            <div className="hidden sm:block text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
              <span className="text-white">+42</span> Pays connectés
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-[140px] lg:text-[180px] font-black uppercase tracking-tighter leading-[0.85] mb-12">
            <span className="block bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">FIKO</span>
            <span className="block bg-gradient-to-b from-yellow-400 via-yellow-600 to-yellow-900 bg-clip-text text-transparent italic tracking-[-0.05em] translate-y-[-0.1em]">ÉGÉRIE</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-16 px-4 italic opacity-90">
            Le programme qui transforme des profils prometteurs en figures visibles d’un écosystème mondial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(197,160,40,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.alert('Évaluation initiée...')}
              className="group relative px-12 py-7 bg-yellow-600 text-black rounded-full font-black uppercase tracking-[0.3em] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative z-10 flex items-center gap-3 text-sm md:text-base">
                👑 Entrer dans l’Évaluation Privée
              </span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-7 bg-white/5 border border-white/10 text-white rounded-full font-black uppercase tracking-[0.3em] backdrop-blur-md transition-all flex items-center gap-3 text-sm md:text-base"
            >
              <Play size={18} fill="white" /> Découvrir la Vision
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 10 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-500"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-yellow-600/50 to-transparent" />
        </motion.div>
      </section>

      {/* 📊 ELITE STATS GRID */}
      <section className="py-40 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-yellow-600/30 transition-all text-center lg:text-left"
              >
                <div className="size-12 bg-yellow-600/10 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 group-hover:bg-yellow-600 transition-all">
                  <stat.icon className="text-yellow-600 group-hover:text-black" size={24} />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-yellow-500 transition-colors">
                  {stat.val}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌍 SECTION — “TOUT COMMENCE PAR UNE VISIBILITÉ” */}
      <section className="py-48 relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(197,160,40,0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 tracking-tighter leading-tight">
                TOUT COMMENCE PAR <br />
                <span className="text-yellow-600 italic">UNE VISIBILITÉ.</span>
              </h2>
              <div className="space-y-8 text-xl text-slate-400 font-light italic">
                <p>Il y a quelques années, être visible demandait des relations, des médias, des budgets énormes et des connexions impossibles.</p>
                <p className="border-l-2 border-yellow-600 pl-8 py-4 bg-white/[0.02]">Aujourd’hui, une personne avec une vision claire, une présence forte et une authenticité réelle peut devenir une référence.</p>
                <p>Mais la réalité est brutale. Des milliers de talents publient sans direction, grandissent sans structure et finissent oubliés.</p>
              </div>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative aspect-video rounded-[40px] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-12 text-center"
            >
               <h3 className="text-3xl font-black uppercase mb-6 italic tracking-tighter">Fiko Égérie a été créé pour changer cela.</h3>
               <div className="flex gap-4">
                  {[...Array(3)].map((_, i) => <div key={i} className="size-2 bg-yellow-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🧠 SECTION — “PLUS QU’UN PROGRAMME” */}
      <section className="py-48 relative border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-600">L'Écosystème Stratégique</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase mb-16 tracking-tighter">PLUS QU’UN PROGRAMME.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
               <div className="p-8 rounded-3xl bg-red-900/10 border border-red-900/20">
                  <h4 className="text-red-500 font-black uppercase mb-4 tracking-widest">Ce que nous ne sommes PAS :</h4>
                  <ul className="space-y-4 text-slate-500 italic font-medium">
                    <li>❌ Une agence influenceur classique</li>
                    <li>❌ Une simple affiliation</li>
                    <li>❌ Une plateforme de visibilité artificielle</li>
                  </ul>
               </div>
               <div className="p-8 rounded-3xl bg-yellow-900/10 border border-yellow-900/20">
                  <h4 className="text-yellow-600 font-black uppercase mb-4 tracking-widest">Ce que nous SOMMES :</h4>
                  <p className="text-slate-300 font-medium italic">Un écosystème stratégique qui détecte, développe et propulse des profils capables de devenir des références mondiales.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🎬 SECTION — “IMAGINE…” */}
      <section className="py-48 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-8xl md:text-[180px] font-black uppercase tracking-tighter text-white/5 overflow-hidden">IMAGINE...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
            <div className="space-y-24">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
                <div className="text-5xl font-black uppercase italic tracking-tighter mb-6">Que votre contenu ne soit plus simplement <span className="text-yellow-600">“vu”…</span></div>
                <div className="text-2xl text-slate-500 font-light italic">mais remarqué par ceux qui comptent vraiment.</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative border-l-2 border-white/10 pl-12 py-4">
                <div className="text-3xl font-black uppercase italic tracking-tighter mb-6">Que votre présence attire :</div>
                <ul className="text-xl text-slate-400 font-light italic space-y-3">
                  <li>● Des collaborations internationales</li>
                  <li>● Des invitations exclusives</li>
                  <li>● Des connexions business de haut rang</li>
                </ul>
              </motion.div>
            </div>
            <div className="relative aspect-square">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border border-yellow-600/10 rounded-full"
               />
               <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="text-6xl font-black text-yellow-600 mb-6 italic tracking-widest leading-none">VOTRE FUTUR.</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Expansion sans limite</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 👑 SECTION — “UNE ÉLITE ACCESSIBLE” */}
      <section className="py-48 bg-black relative border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 tracking-tighter leading-tight italic">UNE ÉLITE <br/><span className="text-yellow-600">ACCESSIBLE.</span></h2>
            <p className="text-2xl text-slate-400 font-light italic leading-relaxed mb-16">
              Fiko Égérie n’est pas réservé aux célébrités déjà installées. Nous croyons que certaines personnes n’ont simplement jamais eu le bon écosystème autour d’elles.
            </p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent mb-16" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["Le Potentiel", "La Personnalité", "Le Charisme", "La Vision"].map((word, i) => (
                <div key={i} className="text-[10px] font-black uppercase tracking-[0.4em] text-white opacity-40">{word}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 BENEFITS GRID - HOLOGRAPHIC CARDS */}
      <section className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-yellow-600/30 overflow-hidden transition-all min-h-[340px] flex flex-col justify-end"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <benefit.icon size={160} className="text-yellow-600" />
                </div>
                <div className="relative z-10">
                  <div className="size-16 bg-yellow-600/10 rounded-2xl flex items-center justify-center mb-8 border border-yellow-600/20 group-hover:bg-yellow-600/20 group-hover:scale-110 transition-all">
                    <benefit.icon className="text-yellow-600" size={32} />
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-4 italic leading-none">{benefit.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-300 transition-colors font-medium">{benefit.desc}</p>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌌 ECOSYSTEM EXPERIENCE */}
      <section className="py-48 bg-[#020202] overflow-hidden relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               >
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600 mb-6 font-mono">Fiko World Network</p>
                  <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 tracking-tighter leading-tight">
                    UN ÉCOSYSTÈME <br />
                    <span className="text-yellow-600 italic">SANS FRONTIÈRES.</span>
                  </h2>
                  <div className="space-y-12">
                    {[
                      { t: "Médias & Diffusion", d: "Visibilité massive sur les réseaux premium Fiko et partenaires.", i: MessageSquare },
                      { t: "Business & Investissements", d: "Connectez-vous aux investisseurs stratégiques du KCG Group.", i: TrendingUp },
                      { t: "IA & Innovation", d: "Profitez des outils Fiko IA exclusifs pour optimiser votre portée.", i: Cpu },
                      { t: "Mentorat Élite", d: "Apprenez des plus grands leaders économiques et culturels mondiaux.", i: Star }
                    ].map((item, i) => (
                      <motion.div key={i} className="flex gap-8 items-start group">
                        <div className="size-12 rounded-[14px] border border-yellow-600/30 flex items-center justify-center shrink-0 mt-1 bg-yellow-600/5 group-hover:bg-yellow-600 transition-all duration-500">
                          <item.i className="text-yellow-600 group-hover:text-black transition-colors" size={20} />
                        </div>
                        <div>
                          <h5 className="text-lg font-black uppercase tracking-widest text-white mb-2 group-hover:text-yellow-500 transition-colors">{item.t}</h5>
                          <p className="text-slate-500 text-base leading-relaxed group-hover:text-slate-300 transition-colors">{item.d}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
               </motion.div>
            </div>
            <div className="lg:w-1/2 relative flex justify-center items-center">
               {/* HOLOGRAPHIC CORE SIMULATION */}
               <div className="relative size-[350px] md:size-[600px]">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-yellow-600/10 shadow-[0_0_100px_rgba(197,160,40,0.05)]"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[40px] rounded-full border border-white/5"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="size-[180px] md:size-[260px] bg-yellow-600/10 rounded-full flex items-center justify-center backdrop-blur-3xl border border-yellow-600/20 shadow-[0_0_120px_rgba(197,160,40,0.15)]"
                    >
                      <Globe className="text-yellow-600" size={80} />
                    </motion.div>
                  </div>
                  
                  {/* Rotating Nodes */}
                  {[
                    "MEDIA", "BUSINESS", "TECH", "CULTURE", "ECONOMY", "STRATEGY"
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      className="absolute px-4 py-2 bg-black/60 border border-white/10 rounded-xl backdrop-blur-xl"
                      style={{
                        top: `${50 + 42 * Math.sin((i * 60) * (Math.PI / 180))}%`,
                        left: `${50 + 42 * Math.cos((i * 60) * (Math.PI / 180))}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <span className="text-[9px] font-black uppercase text-yellow-600 tracking-wider font-mono">{node}</span>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📈 FIKO ICON SCORE SIMULATION */}
      <section className="py-48 bg-[#030303] relative border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            onViewportEnter={() => setScoreSimulated(true)}
            className="p-12 md:p-24 rounded-[60px] bg-[#0A0A0C] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
            
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-12 italic">Simulation IA Performance Stratégique</p>
            
            <div className="relative size-64 md:size-96 mx-auto mb-16">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="46%" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
                <motion.circle 
                  cx="50%" cy="50%" r="46%" 
                  fill="none" 
                  stroke="url(#iconScoreGradient)" 
                  strokeWidth="10" 
                  strokeDasharray="100 100"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: iconScore / 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="iconScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B6E1F" />
                    <stop offset="50%" stopColor="#C5A028" />
                    <stop offset="100%" stopColor="#F7E7CE" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[10px] font-black uppercase tracking-widest text-yellow-600 mb-2 italic"
                >
                  Icon Score™
                </motion.span>
                <div className="flex items-start">
                  <span className="text-8xl md:text-[140px] font-black tracking-tighter text-white leading-none">{iconScore}</span>
                  <span className="text-xl md:text-3xl font-black text-yellow-600 mt-2">/100</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-left max-w-xl mx-auto">
              {[
                { l: "Potentiel Stratégique", v: "94%", w: "94%" },
                { l: "Capacité d'Influence", v: "88%", w: "88%" },
                { l: "Engagement Authentique", v: "91%", w: "91%" },
                { l: "Délivrabilité Message", v: "96%", w: "96%" }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-wider font-mono">{item.l}</p>
                    <p className="text-[9px] font-black text-yellow-600 font-mono">{item.v}</p>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: scoreSimulated ? item.w : 0 }} transition={{ duration: 2, delay: 0.5 + i * 0.1 }} className="h-full bg-gradient-to-r from-yellow-900 to-yellow-500" />
                  </div>
                </div>
              ))}
            </div>

            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mt-16 text-slate-500 font-medium italic text-sm tracking-wide"
            >
              Analyse de l'empreinte digitale terminée. <br className="hidden md:block" /> Détection de potentiel "Héritage" confirmée.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 🎬 TESTIMONIALS (NETFLIX STYLE) */}
      <section className="py-48 bg-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-32">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600 mb-6 font-mono">Témoignages Élite</p>
            <h2 className="text-5xl md:text-[100px] font-black uppercase tracking-tighter leading-[0.8] italic translate-x-[-0.025em]">
              ILS ÉCRIVENT <br />
              <span className="text-white">L'HISTOIRE.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {testimonials.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1.2 }}
                className="group relative aspect-[4/5] md:aspect-[3/5] rounded-[40px] overflow-hidden bg-[#0A0A0C] border border-white/5 hover:border-yellow-600 transition-all duration-1000"
              >
                <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 opacity-60 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="size-1 w-24 bg-yellow-600 mb-8 blur-[1px]" />
                   <p className="text-lg md:text-xl font-medium text-white mb-8 italic leading-relaxed">"{p.text}"</p>
                   <div>
                    <h5 className="text-sm font-black text-white uppercase tracking-widest mb-1">{p.name}</h5>
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em]">{p.role}</p>
                   </div>
                </div>
                
                {/* Netflix Hover Overlay */}
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                  <div className="size-16 rounded-full border border-yellow-600/50 flex items-center justify-center bg-yellow-600/10 backdrop-blur-sm">
                    <Play className="text-yellow-500 fill-yellow-500 translate-x-0.5" size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎬 FINAL IMMERSIVE CTA - MAGNIFICENT CONCLUSION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-40 border-t border-white/5 bg-[#050505] overflow-hidden">
        {/* Massive Spatial Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(197,160,40,0.15)_0%,transparent_60%)]" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: 360
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] border border-white/[0.03] rounded-full blur-3xl pointer-events-none"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-500 mb-12 italic">Le réseau vous observe</p>
            
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase mb-16 tracking-tighter leading-[0.8] italic">
              Certaines personnes <br />
              <span className="text-slate-700">regardent les opportunités.</span> <br />
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">D'autres deviennent</span> <br />
              <span className="text-yellow-600">impossibles à ignorer.</span>
            </h2>

            <motion.button 
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 120px rgba(197,160,40,0.7)",
                backgroundColor: "rgb(234, 179, 8)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.alert('Évaluation initiée par le système...')}
              className="relative group px-16 py-10 bg-yellow-600 text-black rounded-full font-black uppercase tracking-[0.5em] text-xl md:text-3xl shadow-[0_40px_130px_-10px_rgba(197,160,40,0.5)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center gap-4">
                ⚡ Lancer mon évaluation privée
              </span>
            </motion.button>
            <div className="mt-16 flex flex-col items-center gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-600/50 italic">Chaque candidature est analysée stratégiquement par le système Fiko.</p>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500">🔒 Réseau privé • Sélection stratégique • Écosystème premium Fiko</p>
            </div>
          </motion.div>
        </div>
        
        {/* Silhouette Entering Light Visual (Decorative) */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-600/20 blur-[150px] rounded-full opacity-30 pointer-events-none" />
      </section>

    </div>
  );
};

export default EgeriePage;
