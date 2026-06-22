import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../../types';
import FikoPayCenter from './components/FikoPayCenter';
import SmartPricing from './components/SmartPricing';
import FikoCore from './components/FikoCore';
import OnboardingWorkflow from './components/OnboardingWorkflow';
import DashboardPreview from './components/DashboardPreview';

interface PortalActivationProps {
    onNavigate: (page: Page) => void;
    gate?: string;
}

export enum ActivationPhase {
    IMMERSION = "IMMERSION",
    FIKO_CORE = "FIKO_CORE",
    PRICING = "PRICING",
    PAYMENT = "PAYMENT",
    ACTIVATING = "ACTIVATING",
    READY = "READY",
    ONBOARDING = "ONBOARDING",
    ANALYSIS = "ANALYSIS",
    VICTORY = "VICTORY"
}

const PortalActivationWorkflow: React.FC<PortalActivationProps> = ({ onNavigate, gate = 'MARS' }) => {
    const [phase, setPhase] = useState<ActivationPhase>(ActivationPhase.IMMERSION);
    const [immersionText, setImmersionText] = useState("Connexion au système Krypton...");
    const [selectedOption, setSelectedOption] = useState<"fractionne" | "unique" | "split">("unique");

    useEffect(() => {
        if (phase === ActivationPhase.IMMERSION) {
            const t1 = setTimeout(() => setImmersionText(`Synchronisation de la Porte ${gate}...`), 1500);
            const t2 = setTimeout(() => setImmersionText("Analyse stratégique en cours..."), 3000);
            const t3 = setTimeout(() => setPhase(ActivationPhase.FIKO_CORE), 4500);
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        } else if (phase === ActivationPhase.ACTIVATING) {
            const t1 = setTimeout(() => setPhase(ActivationPhase.READY), 5000);
            return () => clearTimeout(t1);
        } else if (phase === ActivationPhase.READY) {
            const t1 = setTimeout(() => setPhase(ActivationPhase.ONBOARDING), 3000);
            return () => clearTimeout(t1);
        }
    }, [phase, gate]);

    return (
        <div className="min-h-screen bg-black text-[#F5F3EF] overflow-hidden selection:bg-[#E10600]/30 font-sans">
            <AnimatePresence mode="wait">
                {phase === ActivationPhase.IMMERSION && (
                    <motion.div
                        key="immersion"
                        initial={{ filter: 'blur(0px)', opacity: 0 }}
                        animate={{ opacity: 1, filter: 'blur(2px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 flex items-center justify-center bg-black z-50 mix-blend-screen"
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={immersionText}
                            className="font-mono text-[clamp(1rem,2vw,1.5rem)] tracking-[4px] text-[#8B8B8B] uppercase text-center"
                        >
                            {immersionText}
                        </motion.div>
                    </motion.div>
                )}

                {phase === ActivationPhase.FIKO_CORE && (
                    <FikoCore gate={gate} onNext={() => setPhase(ActivationPhase.PRICING)} key="fiko_core" />
                )}

                {phase === ActivationPhase.PRICING && (
                    <SmartPricing 
                        gate={gate} 
                        onNext={(option) => {
                            setSelectedOption(option);
                            setPhase(ActivationPhase.PAYMENT);
                        }} 
                        key="pricing" 
                    />
                )}

                {phase === ActivationPhase.PAYMENT && (
                    <FikoPayCenter 
                        gate={gate} 
                        selectedOption={selectedOption}
                        onComplete={() => setPhase(ActivationPhase.ACTIVATING)} 
                        key="payment" 
                    />
                )}

                {phase === ActivationPhase.ACTIVATING && (
                    <motion.div
                        key="activating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 text-center px-6"
                    >
                        <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight text-white mb-8 animate-pulse">ACTIVATION EN COURS</h2>
                        <div className="font-mono text-[0.8rem] text-[#8B8B8B] tracking-[4px] uppercase space-y-4 max-w-lg">
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Création de votre environnement...</motion.p>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Connexion Fiko...</motion.p>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Activation des modules...</motion.p>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>Configuration du dashboard...</motion.p>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }}>Synchronisation IA...</motion.p>
                        </div>
                        <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 border border-[#E10600]/30 bg-[#E10600]/5 text-[#E10600]">
                            <div className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
                            <span className="font-mono text-[0.7rem] tracking-[2px] uppercase">Je configure actuellement votre infrastructure intelligente.</span>
                        </div>
                    </motion.div>
                )}

                {phase === ActivationPhase.READY && (
                    <motion.div
                        key="ready"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black z-50"
                    >
                        <div className="text-center px-6">
                            <div className="text-[#E10600] text-6xl mb-6">✓</div>
                            <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight text-white mb-4">Infrastructure active</h2>
                            <p className="font-mono text-[0.8rem] text-[#8B8B8B] tracking-[2px] uppercase">Votre Porte {gate} est maintenant connectée à Krypton AI.</p>
                        </div>
                    </motion.div>
                )}

                {(phase === ActivationPhase.ONBOARDING || phase === ActivationPhase.ANALYSIS || phase === ActivationPhase.VICTORY) && (
                    <OnboardingWorkflow 
                        gate={gate} 
                        phase={phase} 
                        setPhase={setPhase} 
                        onFinish={() => onNavigate(Page.CLIENT_DASHBOARD)} 
                        key="onboarding" 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default PortalActivationWorkflow;
