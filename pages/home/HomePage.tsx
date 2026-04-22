import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Page } from "../../types";
import TestimonialsSection from "../../components/TestimonialsSection";
import FikoLiveFAQ from "../../components/FikoLiveFAQ";
import {
  Shield,
  Zap,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Hexagon,
  Activity,
  Search,
  BrainCircuit,
  Sparkles,
  MousePointer2,
  Bolt,
  Target,
  Mic,
  AlertTriangle,
  CheckCircle2,
  UserCheck,
  BarChart3,
  Clock,
  Settings,
  MessageSquare,
  Rocket,
  Bot,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (p: Page) => void;
  onOpenFiko: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenFiko }) => {
  const [query, setQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(80, textareaRef.current.scrollHeight)}px`;
    }
  }, [query]);

  // Schema Markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Krypton AI",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "description": "Krypton AI transforme votre site web en un commercial intelligent autonome grâce à l'IA.",
    "offers": {
      "@type": "Offer",
      "price": "200000",
      "priceCurrency": "XOF"
    },
    "featureList": [
      "Agent IA conversationnel",
      "Qualification automatique des prospects",
      "Automatisation marketing",
      "CRM intelligent"
    ]
  };

  const faqMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'un site web intelligent ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un site web intelligent intègre un agent IA capable d'engager, qualifier et convertir les visiteurs en clients de manière autonome."
        }
      },
      {
        "@type": "Question",
        "name": "Comment Krypton AI aide-t-il mon entreprise ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krypton AI automatise votre tunnel de vente, réduit le temps de qualification des leads et augmente votre taux de conversion."
        }
      }
    ]
  };

  return (
    <div className="relative overflow-hidden bg-[#0B0B0F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqMarkup) }}
      />
      {/* Background patterns - Ultra subtle hexagonal grid */}
      <div className="absolute inset-0 hex-bg opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#E10600]/5 blur-[180px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="flex flex-col gap-10 relative z-10">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-4xl lg:text-[60px] font-['Oswald'] font-black leading-[1.1] tracking-tighter uppercase">
                Votre site web devient votre <br />
                meilleur commercial <br />
                <span className="text-[#E10600] italic">grâce à l’IA</span>
              </h1>

              <div className="space-y-6 border-l-2 border-[#E10600] pl-12 max-w-xl">
                <p className="text-xl lg:text-2xl text-white font-medium uppercase tracking-widest leading-relaxed">
                  Attirez, qualifiez et transformez vos visiteurs en clients{" "}
                  <span className="text-[#E10600]">automatiquement</span>.
                </p>
                <p className="text-lg text-slate-500 font-light leading-relaxed italic">
                  Krypton AI conçoit des sites intelligents qui travaillent pour
                  vous 24h/24. Fini les sites vitrines passifs. Place à une machine qui vend.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              <div className="flex flex-row items-center gap-4 lg:gap-6">
                <button
                  onClick={() => onNavigate(Page.AUTH)}
                  className="group relative bg-[#E10600] hover:bg-red-700 text-white px-8 lg:px-12 py-6 lg:py-8 rounded-sm font-black text-[10px] lg:text-xs transition-all uppercase tracking-[0.3em] lg:tracking-[0.4em] shadow-2xl shadow-red-500/40 flex items-center gap-4 lg:gap-6 overflow-hidden active:scale-95 whitespace-nowrap"
                >
                  <span className="relative z-10">Créer mon site intelligent</span>
                  <ArrowRight
                    size={18}
                    className="relative z-10 group-hover:translate-x-2 transition-transform"
                  />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>

                <button
                  onClick={onOpenFiko}
                  className="group border border-white/10 hover:border-[#E10600]/50 text-white px-8 lg:px-12 py-6 lg:py-8 rounded-sm font-black text-[10px] lg:text-xs transition-all uppercase tracking-[0.3em] lg:tracking-[0.4em] bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.05] flex items-center gap-4 active:scale-95 whitespace-nowrap"
                >
                  Voir une démo
                  <MousePointer2
                    size={16}
                    className="text-slate-500 group-hover:text-[#E10600] transition-colors"
                  />
                </button>
              </div>

              <p className="text-[10px] text-slate-700 uppercase tracking-[0.4em] font-black italic pl-4 text-center lg:text-left">
                Accès immédiat • Aucune installation requise
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-red-600/10 blur-[250px] rounded-full animate-pulse pointer-events-none"></div>
            <div className="relative border border-white/5 bg-[#1A1A1F]/60 backdrop-blur-3xl p-10 rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 font-mono text-[10px] text-[#E10600] opacity-60 flex items-center gap-3">
                <Activity size={14} className="animate-pulse" /> IA_ACTIVE:
                COMMERCIAL_v4
              </div>

              <div className="relative aspect-square overflow-hidden rounded-sm mb-10 border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200"
                  alt="Krypton AI SEO Commercial"
                  className="w-full h-full object-cover grayscale brightness-[0.4] contrast-150 opacity-60 group-hover:scale-105 transition-transform duration-[30s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 80,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Hexagon
                      size={400}
                      className="text-[#E10600]/5"
                      strokeWidth={0.5}
                    />
                  </motion.div>
                  <motion.div
                    className="absolute"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 50,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Hexagon
                      size={250}
                      className="text-[#E10600]/20"
                      strokeWidth={1}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute size-40 bg-[#E10600]/20 blur-3xl rounded-full"
                  ></motion.div>
                </div>
              </div>

              <div className="bg-[#0B0B0F]/90 backdrop-blur-2xl border border-white/10 p-12 rounded-sm relative shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E10600]"></div>
                <p className="text-[11px] uppercase tracking-[0.5em] text-[#E10600] font-black mb-8 flex items-center gap-4">
                  <span className="size-2 bg-[#E10600] rounded-full animate-pulse shadow-[0_0_15px_#E10600]"></span>
                  CONVERSION EN COURS
                </p>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                      <span>Taux de Closing</span>
                      <span className="text-white">+312%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 w-full rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "98%" }}
                        transition={{
                          duration: 2,
                          ease: "easeOut",
                          delay: 0.5,
                        }}
                        className="h-full bg-gradient-to-r from-red-900 to-[#E10600] shadow-[0_0_20px_#E10600]"
                      ></motion.div>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
                        Qualification
                      </p>
                      <p className="text-2xl font-black text-white">MAX</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
                        Statut
                      </p>
                      <motion.p
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl font-black text-[#E10600]"
                      >
                        EN VENTE
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 px-6 relative bg-black/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none mb-8">
              Pourquoi votre site web <br />
              <span className="text-[#E10600] italic">ne génère pas de clients</span>
            </h2>
            <p className="text-slate-500 text-lg uppercase tracking-widest font-black italic">
              Le constat est simple : votre site actuel est passif.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Votre site ne parle à personne",
                desc: "Un visiteur attend une interaction. Sans réponse, il repart en moins de 10 secondes.",
                icon: <MessageSquare className="w-12 h-12 text-[#E10600]" />,
              },
              {
                title: "Aucun suivi des visiteurs",
                desc: "98% de vos visiteurs partent sans laisser de traces. C'est du budget marketing jeté par les fenêtres.",
                icon: <Search className="w-12 h-12 text-[#E10600]" />,
              },
              {
                title: "Vous perdez des clients chaque jour",
                desc: "Pendant que vous dormez ou travaillez, vos prospects cherchent des solutions chez vos concurrents plus réactifs.",
                icon: <TrendingUp className="w-12 h-12 text-[#E10600]" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-12 border border-white/5 bg-[#1A1A1F]/40 hover:border-[#E10600]/30 transition-all duration-500 rounded-sm relative overflow-hidden"
              >
                <div className="mb-8 opacity-60 group-hover:opacity-100 transition-all active:scale-95 group-hover:scale-110 duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black uppercase mb-6 tracking-tight group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-500 group-hover:text-slate-300 transition-colors text-lg leading-relaxed font-light italic">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 px-6 relative bg-[#0B0B0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none mb-8">
              Le site web nouvelle génération <br />
              <span className="text-[#E10600] italic">avec agent IA intégré</span>
            </h2>
            <p className="text-slate-500 text-lg uppercase tracking-widest font-black italic">
              Nous ne vendons pas des sites. Nous vendons des commerciaux digitaux.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Agent IA qui discute avec vos visiteurs",
                desc: "Une IA formée sur votre business qui répond instantanément et personnellement à chaque question.",
                icon: <Bot className="w-14 h-14 text-[#E10600]" />,
              },
              {
                title: "Qualification automatique des prospects",
                desc: "L'IA détecte l'urgence, le budget et le besoin réel avant même que vous consultiez vos emails.",
                icon: <Target className="w-14 h-14 text-[#E10600]" />,
              },
              {
                title: "Conversion et relance automatiques",
                desc: "Le système prend des rendez-vous, envoie des devis et relance les indécis sans votre intervention.",
                icon: <Zap className="w-14 h-14 text-[#E10600]" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-12 border border-white/5 bg-[#1A1A1F]/40 hover:bg-[#1A1A1F] transition-all duration-700 rounded-sm text-center"
              >
                <div className="mb-10 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black uppercase mb-8 tracking-tight group-hover:text-[#E10600]">
                  {item.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-200 transition-colors text-lg leading-relaxed font-light italic">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - HOW IT WORKS */}
      <section className="relative py-48 px-6 bg-black border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 hex-bg opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-[85px] font-black uppercase tracking-tighter leading-[1.0] mb-12">
              Comment votre site devient <br />
              <span className="text-[#E10600] italic">une machine à vendre</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {[
              {
                step: "01",
                label: "Capture",
                title: "Un visiteur arrive",
                desc: "Dès la première seconde, l'attention est captée par une interface dynamique.",
              },
              {
                step: "02",
                label: "Engagement",
                title: "L’IA engage la conversation",
                desc: "Plus de formulaires froids. Une discussion fluide et naturelle commence.",
              },
              {
                step: "03",
                label: "Intelligence",
                title: "Le prospect est qualifié",
                desc: "L'IA analyse les intentions et identifie les opportunités à haute valeur.",
              },
              {
                step: "04",
                label: "Profit",
                title: "Le système convertit",
                desc: "Paiement, réservation ou transfert commercial : l'objectif est atteint.",
              },
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="absolute -top-10 -left-6 text-[120px] font-black text-white/[0.03] group-hover:text-[#E10600]/10 transition-colors pointer-events-none">
                  {step.step}
                </div>
                <div className="p-10 border border-white/5 bg-[#1A1A1F]/60 backdrop-blur-xl h-full relative overflow-hidden group-hover:border-[#E10600]/30 transition-all">
                  <div className="text-[10px] font-black text-[#E10600] uppercase tracking-[0.5em] mb-6">
                    MÉTHODE_KRYPTON
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 font-light italic leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#E10600] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-48 px-6 bg-[#0B0B0F] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
              Ce que Krypton AI <br />
              <span className="text-[#E10600] italic">change pour votre business</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "+ de clients automatiquement",
                desc: "Votre site ne dort jamais. Chaque visiteur est une opportunité saisie en temps réel par l'IA.",
                val: "+312%",
                label: "Conversion moy.",
              },
              {
                title: "+ de ventes sans effort",
                desc: "L'IA gère la partie ingrate : qualifier, répondre aux objections et fermer la transaction.",
                val: "24/7",
                label: "Disponibilité",
              },
              {
                title: "+ de temps pour vous",
                desc: "Déléguez le premier contact à une machine de guerre et concentrez-vous sur votre expertise.",
                val: "-80%",
                label: "Temps de qualification",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-16 border border-white/5 bg-[#1A1A1F]/40 hover:border-[#E10600]/50 transition-all duration-700 rounded-sm relative overflow-hidden"
              >
                <div className="mb-10">
                  <span className="text-5xl font-black text-[#E10600]">{item.val}</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-2">{item.label}</p>
                </div>
                <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light italic">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Section */}
      <section className="py-48 px-6 bg-black relative border-y border-white/5">
        <div className="absolute inset-0 hex-bg opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
              Une solution adaptée <br />
              <span className="text-[#E10600] italic">à tous les business</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "PME", desc: "Automatisez votre croissance sans recruter." },
              { title: "ONG", desc: "Engagez vos donateurs et sensibilisez à grande échelle." },
              { title: "E-commerce", desc: "Guidez vos acheteurs et boostez votre panier moyen." },
              { title: "Services", desc: "Qualifiez vos leads et prenez des rendez-vous en automatique." },
            ].map((item, i) => (
              <div key={i} className="p-10 border border-white/5 bg-[#1A1A1F]/60 backdrop-blur-xl group hover:border-[#E10600]/30 transition-all">
                <h4 className="text-2xl font-black uppercase mb-4 text-[#E10600]">{item.title}</h4>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-48 px-6 bg-[#0B0B0F] overflow-hidden">
        <div className="absolute inset-0 bg-[#E10600]/5 blur-[200px] rounded-full translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
            Transformez votre site en <br />
            <span className="text-[#E10600] italic">commercial autonome</span> <br />
            dès aujourd’hui
          </h2>
          <p className="text-xl lg:text-2xl text-slate-500 font-light italic uppercase tracking-widest mb-16 max-w-2xl mx-auto">
            Ne laissez plus un seul visiteur partir sans lui avoir parlé.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => onNavigate(Page.AUTH)}
              className="group relative bg-[#E10600] text-white px-12 lg:px-20 py-8 lg:py-10 rounded-sm font-black text-sm lg:text-base transition-all uppercase tracking-[0.5em] shadow-[0_40px_100px_rgba(225,6,0,0.15)] flex items-center gap-6 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Créer mon site intelligent</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-3 transition-transform" />
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
            <span>#SITE_WEB_INTELLIGENT</span>
            <span>#AGENT_IA_ENTREPRISE</span>
            <span>#AUTOMATISATION_MARKETING</span>
            <span>#CRM_INTELLIGENT</span>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <FikoLiveFAQ />
    </div>
  );
};

export default HomePage;
