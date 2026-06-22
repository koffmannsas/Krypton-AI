import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface FikoCoreProps {
    gate: string;
    onNext: () => void;
}

const FikoCore: React.FC<FikoCoreProps> = ({ gate, onNext }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            onNext();
        }, 5000); // Fiko Core visible for 5s then transition to pricing
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-black z-40 overflow-hidden px-6"
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,rgba(225,6,0,0.15)_0%,transparent_70%)] animate-pulse" />
            </div>

            {/* Fiko Core Sphere */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#E10600] blur-xl opacity-20 animate-pulse" />
                <motion.div 
                    animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full border border-[#E10600]/30 border-dashed"
                />
                <motion.div 
                    animate={{ scale: [1, 0.9, 1], rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[80%] h-[80%] rounded-full border border-[#E10600]/50"
                />
                <div className="absolute w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[#E10600] to-[#FF4D4D] shadow-[0_0_40px_rgba(225,6,0,0.8)]" />
                
                {/* Floating micro signals */}
                <div className="absolute -left-10 top-10 font-mono text-[0.55rem] text-[#E10600] tracking-[2px] opacity-70 whitespace-nowrap">+1 environnement détecté</div>
                <div className="absolute -right-12 bottom-10 font-mono text-[0.55rem] text-[#E10600] tracking-[2px] opacity-70 whitespace-nowrap">Analyse comportementale active</div>
                <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 font-mono text-[0.55rem] text-[#E10600] tracking-[2px] opacity-70 whitespace-nowrap">Infrastructure compatible</div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center z-10"
            >
                <div className="inline-flex items-center gap-2 font-mono text-[0.7rem] text-[#E10600] tracking-[4px] uppercase mb-6 px-4 py-2 border border-[#E10600]/20 bg-[#E10600]/5">
                    <div className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
                    Porte {gate} détectée
                </div>
                
                <h1 className="font-sans font-black text-3xl md:text-5xl tracking-tight text-white mb-6 max-w-2xl">
                    Cette infrastructure peut être activée immédiatement.
                </h1>
                
                <p className="font-mono text-[0.85rem] text-[#8B8B8B] tracking-[2px] uppercase">
                    Fiko analyse actuellement votre configuration optimale...
                </p>
            </motion.div>
        </motion.div>
    );
};

export default FikoCore;
