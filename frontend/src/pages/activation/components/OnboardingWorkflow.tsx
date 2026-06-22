import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivationPhase } from '../PortalActivationWorkflow';

interface OnboardingWorkflowProps {
    gate: string;
    phase: ActivationPhase;
    setPhase: (p: ActivationPhase) => void;
    onFinish: () => void;
}

const OnboardingWorkflow: React.FC<OnboardingWorkflowProps> = ({ gate, phase, setPhase, onFinish }) => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<Record<string, any>>({});

    const handleNext = (key: string, value: any) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        if (step < 6) {
            setStep(step + 1);
        } else {
            setPhase(ActivationPhase.ANALYSIS);
        }
    };

    const renderOnboardingStep = () => {
        const stepAnim = {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { duration: 0.4 }
        };

        switch (step) {
            case 1:
                return (
                    <motion.div key="step1" {...stepAnim} className="w-full max-w-xl">
                        <h3 className="font-sans font-black text-2xl md:text-3xl mb-8">Comment devons-nous appeler votre entreprise ?</h3>
                        <input 
                            type="text" 
                            placeholder="Nom de l'entreprise"
                            className="w-full p-4 bg-[#111111] border border-white/10 text-white font-sans text-xl focus:border-[#E10600] focus:outline-none mb-6"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value) handleNext('companyName', e.currentTarget.value);
                            }}
                        />
                        <p className="font-mono text-[0.65rem] text-[#8B8B8B] tracking-[1px] uppercase">Appuyez sur Entrée pour valider</p>
                    </motion.div>
                );
            case 2:
                const objectives = ["Générer des leads", "Automatiser WhatsApp", "Vendre plus", "Dominer Google", "Construire une marque"];
                return (
                    <motion.div key="step2" {...stepAnim} className="w-full max-w-3xl">
                        <h3 className="font-sans font-black text-2xl md:text-3xl mb-8">Quel est l'objectif principal de cette infrastructure ?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {objectives.map((obj, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleNext('objective', obj)}
                                    className="p-6 border border-white/10 bg-[#111111] hover:border-[#E10600] hover:bg-[#E10600]/5 text-left transition-colors font-sans text-lg font-medium"
                                >
                                    {obj}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div key="step3" {...stepAnim} className="w-full max-w-xl">
                        <h3 className="font-sans font-black text-2xl md:text-3xl mb-8">Quel secteur représente votre activité ?</h3>
                        <input 
                            type="text" 
                            placeholder="Ex: Immobilier, E-commerce, B2B..."
                            className="w-full p-4 bg-[#111111] border border-white/10 text-white font-sans text-xl focus:border-[#E10600] focus:outline-none mb-6"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value) handleNext('industry', e.currentTarget.value);
                            }}
                        />
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div key="step4" {...stepAnim} className="w-full max-w-xl text-center">
                        <h3 className="font-sans font-black text-2xl md:text-3xl mb-4">Connectons votre WhatsApp Business</h3>
                        <p className="font-mono text-[0.8rem] text-[#8B8B8B] tracking-[1px] mb-8 leading-relaxed">
                            Fiko a besoin d'un numéro pour initialiser le moteur conversationnel.
                        </p>
                        <button 
                            onClick={() => handleNext('whatsappConnected', true)}
                            className="bg-[#25D366] text-black font-mono font-bold text-[0.8rem] tracking-[2px] uppercase py-4 px-10 hover:bg-[#20bd5a] transition-colors w-full sm:w-auto"
                        >
                            ⚡ Connecter maintenant
                        </button>
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div key="step5" {...stepAnim} className="w-full max-w-xl text-center">
                        <h3 className="font-sans font-black text-2xl md:text-3xl mb-8">Avez-vous déjà un site internet ?</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={() => handleNext('hasWebsite', true)}
                                className="p-6 border border-white/10 bg-[#111111] hover:border-[#E10600] transition-colors font-sans text-lg min-w-[150px]"
                            >
                                Oui
                            </button>
                            <button 
                                onClick={() => handleNext('hasWebsite', false)}
                                className="p-6 border border-white/10 bg-[#111111] hover:border-[#E10600] transition-colors font-sans text-lg min-w-[150px]"
                            >
                                Non pas encore
                            </button>
                        </div>
                    </motion.div>
                );
            case 6:
                const sources = ["TikTok", "Facebook", "Référencement Google", "WhatsApp", "Réseau physique"];
                return (
                    <motion.div key="step6" {...stepAnim} className="w-full max-w-3xl">
                        <h3 className="font-sans font-black text-2xl md:text-3xl mb-8">D'où viennent actuellement vos clients ?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sources.map((src, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleNext('clientSource', src)}
                                    className="p-6 border border-white/10 bg-[#111111] hover:border-[#E10600] hover:bg-[#E10600]/5 text-left transition-colors font-sans text-lg font-medium"
                                >
                                    {src}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    // Analysis Phase logic
    const [analysisText, setAnalysisText] = useState("Analyse de votre potentiel...");
    useEffect(() => {
        if (phase === ActivationPhase.ANALYSIS) {
            const t1 = setTimeout(() => setAnalysisText("Identification des leviers..."), 1500);
            const t2 = setTimeout(() => setAnalysisText("Opportunités détectées"), 3000);
            const t3 = setTimeout(() => setPhase(ActivationPhase.VICTORY), 5000);
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        }
    }, [phase, setPhase]);

    // Victory Messages based on gate
    const getVictoryMessages = () => {
        switch (gate.toUpperCase()) {
            case 'ACCESS': return ["votre dashboard est actif", "votre système est prêt"];
            case 'TERRA': return ["structure SEO créée", "tunnel prêt"];
            case 'MARS': return ["tracking acquisition activé", "Fiko acquisition connecté"];
            case 'KRYPTON': return ["automatisation IA active", "moteur conversationnel prêt"];
            case 'GALAXY': return ["environnement enterprise initialisé", "modules stratégiques activés"];
            default: return ["infrastructure compilée", "modules actifs"];
        }
    };

    return (
        <div className="fixed inset-0 bg-[#050505] z-50 flex flex-col pt-10 px-6 overflow-y-auto">
            {/* Minimal Header */}
            <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-16 shrink-0 pt-6 border-b border-white/5 pb-8">
                <div className="font-serif font-bold text-xl tracking-wide">KRYPTON<span className="text-[#E10600]">.AI</span></div>
                {phase === ActivationPhase.ONBOARDING && (
                    <div className="flex items-center gap-4">
                        <div className="font-mono text-[0.6rem] text-[#8B8B8B] tracking-[2px] uppercase">
                            Configuration {Math.round((step / 6) * 100)}%
                        </div>
                        <div className="w-32 h-1 bg-white/10 relative">
                            <div 
                                className="absolute top-0 left-0 h-full bg-[#E10600] transition-all duration-300"
                                style={{ width: `${(step / 6) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
                {(phase === ActivationPhase.ANALYSIS || phase === ActivationPhase.VICTORY) && (
                    <div className="flex items-center gap-2 font-mono text-[0.6rem] text-[#E10600] tracking-[2px] uppercase">
                        <span className="w-1.5 h-1.5 bg-[#E10600] rounded-full animate-pulse" /> Fiko Live Status
                    </div>
                )}
            </header>

            <div className="flex-1 flex flex-col items-center justify-center w-full pb-20">
                <AnimatePresence mode="wait">
                    {phase === ActivationPhase.ONBOARDING && renderOnboardingStep()}

                    {phase === ActivationPhase.ANALYSIS && (
                        <motion.div
                            key="analysis"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center w-full max-w-4xl"
                        >
                            <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight text-white mb-12">
                                {analysisText}
                            </h2>
                            {analysisText === "Opportunités détectées" && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
                                    className="bg-[#111111] border border-white/10 p-10 mt-8"
                                >
                                    <div className="font-mono text-xl tracking-[4px] text-[#E10600] mb-6 border-b border-white/5 pb-6">
                                        Growth Score : <span className="text-white font-bold">82/100</span>
                                    </div>
                                    <p className="font-sans text-xl leading-relaxed text-[#D0D0D0]">
                                        Votre système peut être optimisé pour générer plus de prospects automatiquement.
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {phase === ActivationPhase.VICTORY && (
                        <motion.div
                            key="victory"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center w-full max-w-4xl flex flex-col items-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-[#E10600]/10 border border-[#E10600]/30 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(225,6,0,0.2)]">
                                <span className="text-[#E10600] text-3xl">✓</span>
                            </div>
                            
                            <div className="font-mono text-[0.8rem] text-[#E10600] tracking-[4px] uppercase mb-4">
                                Première ligne établie
                            </div>
                            <h2 className="font-sans font-black text-4xl md:text-6xl tracking-tight text-white mb-12">
                                Votre infrastructure est en place.
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-16">
                                {getVictoryMessages().map((msg, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.3 }}
                                        className="bg-[#111111] border-l-2 border-[#E10600] p-6 text-left"
                                    >
                                        <div className="font-mono text-[0.7rem] tracking-[1px] text-[#8B8B8B] uppercase mb-2">Check</div>
                                        <div className="font-sans font-bold text-lg text-white">✓ {msg}</div>
                                    </motion.div>
                                ))}
                            </div>

                            <button 
                                onClick={onFinish}
                                className="bg-white text-black font-sans font-bold text-lg py-5 px-12 hover:bg-[#D0D0D0] transition-colors border-2 border-white focus:outline-none focus:ring-4 focus:ring-white/20"
                            >
                                Accéder au Dashboard
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OnboardingWorkflow;
