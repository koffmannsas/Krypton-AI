'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
    { id: 'q1', text: "Présentez votre activité en quelques mots", type: "text" },
    { id: 'q2', text: "Avez-vous déjà un site web ?", type: "choice", choices: ["Oui", "Non"] },
    { id: 'q3', text: "Quel est votre objectif principal aujourd'hui ?", type: "choice", choices: ["Avoir plus de clients", "Vendre en ligne", "Automatiser mon business", "Améliorer mon site"] },
    { id: 'q4', text: "Qu'est-ce qui vous bloque aujourd'hui dans votre croissance ?", type: "text" },
    { id: 'q5', text: "À quel point souhaitez-vous résoudre ce problème rapidement ?", type: "choice", choices: ["Immédiatement", "Dans les prochaines semaines", "Je me renseigne"] },
    { id: 'q6', text: "Quel budget êtes-vous prêt à investir pour développer votre business ?", type: "choice", choices: ["< 200 000 FCFA", "200k – 700k FCFA", "700k – 2M FCFA", "2M+ FCFA"] }
];

export default function OrbitUI({ onInteraction, onNavigate, onOpenFiko }: { onInteraction?: () => void; onNavigate?: (p: any) => void; onOpenFiko?: (gate?: string) => void }) {
    const [phase, setPhase] = useState<'idle' | 'activating' | 'question' | 'analyzing' | 'closing'>('idle');
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [input, setInput] = useState('');
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleStart = () => {
        setPhase('activating');
        setTimeout(() => setPhase('question'), 1500);
    };

    const handleAnswer = (answer: string) => {
        if (!answer.trim()) return;
        
        const currentQ = QUESTIONS[currentQIndex];
        
        setAnswers(prev => ({ ...prev, [currentQ.id]: answer }));
        setInput('');

        if (currentQIndex < QUESTIONS.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            setPhase('analyzing');
            if (onInteraction) onInteraction();
            setTimeout(() => setPhase('closing'), 3000);
        }
    };

    const getRecommendation = () => {
        let score = 0;
        const goal = answers['q3'] || "";
        const problem = answers['q4'] || "";
        const urgency = answers['q5'] || "";
        const budgetStr = answers['q6'] || "";
        const hasWebsite = answers['q2'] === "Oui";

        if (goal.includes("clients")) score += 30;
        if (problem.toLowerCase().includes("client")) score += 30;
        if (urgency === "Immédiatement") score += 40;

        let budget = 0;
        if (budgetStr.startsWith("< 200")) budget = 150000;
        else if (budgetStr.startsWith("200k")) budget = 500000;
        else if (budgetStr.startsWith("700k")) budget = 1500000;
        else if (budgetStr.startsWith("2M+")) budget = 3000000;

        let offerName = "";
        let isAddon = false;

        if (!hasWebsite) {
            if (budget < 200000) offerName = "PORTE ACCESS";
            else if (budget <= 700000) offerName = score >= 80 ? "PORTE MARS" : "PORTE TERRA";
            else if (budget <= 2000000) offerName = "PORTE MARS";
            else if (budget <= 4000000) offerName = "PORTE KRYPTON";
            else offerName = "PORTE GALAXY";
        } else {
            isAddon = true;
            if (budget <= 30000) offerName = "FIKO SOLO";
            else if (budget <= 60000) offerName = "FIKO PILOT";
            else if (budget <= 100000) offerName = "FIKO ELITE";
            else offerName = "FIKO EMPIRE";
        }

        return { offerName, isAddon };
    };

    const currentQuestion = QUESTIONS[currentQIndex];
    const rec = phase === 'closing' ? getRecommendation() : null;

    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            {/* Allow pointer events only on interactive elements */}
            <div className="pointer-events-auto w-full flex flex-col items-center justify-center max-w-4xl px-4">
                <AnimatePresence mode="wait">
                    {phase === 'idle' && (
                        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                            <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-['Oswald'] font-black uppercase tracking-tighter text-white mb-20 text-center drop-shadow-[0_0_30px_rgba(255,39,24,0.5)] leading-[1.1]">
                                Votre site web devient votre meilleur commercial 24h/24 <br/>
                                <span className="text-[#FF2718]">grâce à l’IA</span>
                            </h1>
                            <div className="flex flex-col items-center">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleStart}
                                    className="px-8 py-4 rounded-full bg-black text-white font-semibold tracking-wide shadow-[0_0_30px_rgba(255,39,24,0.35)] hover:shadow-[0_0_40px_#FF2718] transition-shadow border border-[#FF2718]/20"
                                >
                                    ✨ Lancer l’expérience Fiko
                                </motion.button>
                                <p className="text-white mt-3 text-sm text-center font-medium drop-shadow-md">
                                    Cliquez et laissez Fiko analyser votre business en temps réel
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {phase === 'activating' && (
                        <motion.div key="activating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center space-y-2 mt-20">
                            <p className="text-[#FF2718] font-mono text-lg animate-pulse">🔴 Activation en cours...</p>
                            <p className="text-white/70 font-mono text-sm">Fiko initialise votre analyse</p>
                        </motion.div>
                    )}

                    {phase === 'question' && (
                        <motion.div key={currentQuestion.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-center w-full mt-24">
                            <p className="text-[#FF2718] font-mono text-xs uppercase tracking-widest mb-4">Analyse. Étape {currentQIndex + 1}/{QUESTIONS.length}</p>
                            <h2 className="text-2xl md:text-4xl text-white font-['Oswald'] uppercase tracking-tight mb-8">
                                {currentQuestion.text}
                            </h2>

                            {currentQuestion.type === 'text' ? (
                                <motion.input 
                                    autoFocus
                                    className="bg-black/50 border border-white/20 text-white text-center text-xl font-mono outline-none rounded-xl px-6 py-4 w-full max-w-lg focus:border-[#FF2718] transition-colors"
                                    placeholder="Votre réponse..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAnswer(input)}
                                />
                            ) : (
                                <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
                                    {currentQuestion.choices?.map(choice => (
                                        <motion.button 
                                            key={choice}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleAnswer(choice)}
                                            className="px-6 py-3 rounded-full border border-white/20 bg-black/50 text-white font-mono hover:border-[#FF2718] hover:bg-[#FF2718]/10 transition-colors"
                                        >
                                            {choice}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {phase === 'analyzing' && (
                        <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center space-y-4 mt-20">
                            <div className="w-16 h-16 border-t-2 border-[#FF2718] rounded-full animate-spin"></div>
                            <p className="text-[#FF2718] font-mono text-xl">Fiko analyse votre situation...</p>
                            <p className="text-white/50 font-mono text-sm max-w-md">Croisement de vos données avec nos modèles de performance d'acquisition en temps réel.</p>
                        </motion.div>
                    )}

                    {phase === 'closing' && rec && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] pointer-events-none" />
                            <motion.div key="closing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col text-left bg-[#0B0B0F]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-12 w-full max-w-2xl mt-16 md:mt-24 shadow-[0_0_80px_rgba(225,6,0,0.15)] max-h-[75vh] overflow-y-auto custom-scrollbar relative z-10">
                                
                                {rec.isAddon ? (
                                    <div className="space-y-6 font-mono text-sm md:text-base text-gray-300">
                                        <p>Vous avez déjà un site web.</p>
                                        <p>Votre priorité est d’optimiser votre conversion.</p>
                                        <p className="font-bold text-lg mt-4">👉 Fiko recommande : <span className="text-[#FF2718]">{rec.offerName}</span></p>

                                        <div className="space-y-1 text-sm mt-6">
                                            <p className="text-white">→ automatisation des ventes</p>
                                            <p className="text-white">→ génération de trafic</p>
                                            <p className="text-white">→ optimisation SEO</p>
                                        </div>

                                        <div className="border-l-4 border-[#FF2718] pl-6 py-2 my-8 space-y-2 bg-white/[0.02] rounded-r-lg">
                                            <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">Résultat :</p>
                                            <p className="text-xl md:text-2xl text-white font-black">→ plus de leads</p>
                                            <p className="text-xl md:text-2xl text-[#FF2718] font-black">→ plus de ventes</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6 font-mono text-sm md:text-base text-gray-300">
                                        <p><span className="text-white">Fiko a analysé votre situation :</span> <span className="text-[#FF2718] font-bold">{answers['q1']}</span>.</p>
                                        
                                        <p>Au vu de votre activité et de vos objectifs, vous avez besoin d’un système capable de capter et convertir vos visiteurs automatiquement.</p>
                                        
                                        <p className="font-bold text-lg mt-4 text-white">
                                            👉 L’offre la plus adaptée pour vous est : <span className="text-[#FF2718]">{rec.offerName}</span>
                                        </p>

                                        <p className="mt-6 text-[#FF2718] font-bold uppercase tracking-widest text-xs">Pourquoi ?</p>
                                        <div className="space-y-1 text-sm text-white/90">
                                            <p>→ vous souhaitez générer plus de clients rapidement</p>
                                            <p>→ votre budget permet une solution performante</p>
                                            <p>→ votre situation nécessite une automatisation avancée</p>
                                        </div>
                                        
                                        <div className="border-l-4 border-[#FF2718] pl-6 py-2 my-8 space-y-2 bg-white/[0.02] rounded-r-lg">
                                            <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">Avec cette configuration, vous pourriez générer :</p>
                                            <p className="text-xl md:text-2xl text-white font-black">→ 15 à 30 clients / mois</p>
                                            <p className="text-xl md:text-2xl text-[#FF2718] font-black">→ soit +1 500 000 à 3 000 000 FCFA</p>
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mt-10 mb-8 space-y-3 relative z-10">
                                    <p className="font-bold text-white uppercase tracking-widest text-sm">
                                        Votre système est prêt. Il ne reste qu’à l’activer.
                                    </p>
                                    <p className="font-mono text-[#FF2718] uppercase font-bold text-[10px] sm:text-xs">
                                        ⏳ Chaque visiteur qui arrive sans ce système est une opportunité perdue.
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-white/50 italic mt-2">
                                        Je vous recommande d’activer ce système maintenant pour ne pas perdre ce potentiel.
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full relative z-10">
                                    <AnimatePresence>
                                       {isRedirecting && (
                                           <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} className="absolute inset-0 z-20 flex items-center justify-center bg-[#0B0B0F]/90 backdrop-blur-sm rounded-full">
                                                <p className="text-[#FF2718] font-mono text-[10px] sm:text-xs font-bold animate-pulse">Chargement de votre configuration personnalisée...</p>
                                           </motion.div>
                                       )}
                                    </AnimatePresence>

                                    <motion.button 
                                        onClick={() => {
                                            // Mini delay before opening Fiko
                                            if (onOpenFiko) setTimeout(onOpenFiko, 300);
                                        }}
                                        className="relative group overflow-hidden bg-[#FF2718] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_0_20px_#FF2718] text-xs md:text-sm w-full sm:w-auto text-center border border-transparent hover:border-white/50 transition-all"
                                        animate={{
                                            boxShadow: ["0px 0px 20px #FF2718", "0px 0px 40px #FF2718", "0px 0px 20px #FF2718"],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-12 block">
                                            🔥 Parler à Fiko en direct
                                        </span>
                                        <span className="absolute z-10 inset-0 flex items-center justify-center transition-transform duration-300 translate-y-12 group-hover:translate-y-0 text-white font-black">
                                            ACTIVER FIKO MAINTENANT
                                        </span>
                                    </motion.button>

                                    <motion.button 
                                        whileHover={{ scale: 1.05 }} 
                                        onClick={() => {
                                            if (!onNavigate) return;
                                            setIsRedirecting(true);
                                            setTimeout(() => {
                                                if (rec.offerName === "PORTE ACCESS") onNavigate('access_offer');
                                                else if (rec.offerName === "PORTE TERRA") onNavigate('terra_offer');
                                                else if (rec.offerName === "PORTE MARS") onNavigate('mars_offer');
                                                else if (rec.offerName === "PORTE KRYPTON") onNavigate('krypton_offer');
                                                else if (rec.offerName === "PORTE GALAXY") onNavigate('galaxy_offer');
                                                else onNavigate('pricing');
                                            }, 1200);
                                        }}
                                        className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/5 text-xs md:text-sm text-center w-full sm:w-auto"
                                    >
                                        👁 Voir mon offre personnalisée → {rec.offerName} (+320% ROI)
                                    </motion.button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
