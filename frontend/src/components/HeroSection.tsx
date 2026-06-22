'use client';
import FikoCore3D from './FikoCore3D';
import OrbitUI from './OrbitUI';
import { Page } from "../types";

export default function HeroSection({ onNavigate, onOpenFiko }: { onNavigate: (p: any) => void; onOpenFiko: (gate?: string) => void }) {
    return (
        <section className="relative min-h-screen bg-[#0B0B0F] flex items-center justify-center">
            <FikoCore3D />
            <OrbitUI onNavigate={onNavigate} onOpenFiko={onOpenFiko} onInteraction={() => console.log('Interacted')} />
            
            <div className="absolute top-10 left-10 z-30 text-white font-mono text-xs opacity-70">
                🔴 Système en activité: 3 visiteurs en cours | 1 lead qualifié
            </div>
        </section>
    );
}
