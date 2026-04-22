import React, { useEffect, useState } from "react";
import { GATE_THEMES } from "../constants";
import { soundEngine } from "../utils/SoundEngine";
import { sendToFiko } from "../services/fikoAPI";

interface GateTransitionProps {
  gate: string;
  onComplete: () => void;
}

const OFFER_NAMES: Record<string, string> = {
  TERRA: "SOLO",
  MARS: "PILOT",
  KRYPTON: "ELITE",
  GALAXY: "EMPIRE",
};

const GateTransition: React.FC<GateTransitionProps> = ({
  gate,
  onComplete,
}) => {
  const theme = GATE_THEMES[gate] || GATE_THEMES.MARS;
  const displayName = OFFER_NAMES[gate] || gate;
  const [phase, setPhase] = useState<"init" | "warp" | "exit">("init");

  useEffect(() => {
    // Trigger Warp Sound
    soundEngine.playWarp();

    const t1 = setTimeout(() => setPhase("warp"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 2000);
    const t3 = setTimeout(() => onComplete(), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
      {/* Stars Layer */}
      <div
        className={`absolute inset-0 transition-transform duration-[3s] ease-in ${phase === "warp" ? "scale-[5]" : "scale-100"}`}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              boxShadow: phase === "warp" ? `0 0 20px ${theme.color}` : "none",
            }}
          />
        ))}
      </div>

      {/* Portal Ring */}
      <div
        className={`relative z-10 size-[300px] border-8 rounded-full transition-all duration-1000 ease-expo flex items-center justify-center
          ${phase === "init" ? "scale-0 opacity-0" : "scale-100 opacity-100"}
          ${phase === "warp" ? "scale-[15] opacity-0" : ""}
        `}
        style={{
          borderColor: theme.color,
          boxShadow: `0 0 100px ${theme.color}, inset 0 0 100px ${theme.color}`,
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-black uppercase tracking-[0.5em] text-white">
            PORTE {displayName}
          </h2>
        </div>
      </div>

      {/* Warp Flash Overlay */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700
          ${phase === "exit" ? "bg-white opacity-100" : "bg-white opacity-0"}
        `}
      />

      <style>{`
        .ease-expo { transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1); }
      `}</style>
    </div>
  );
};

export default GateTransition;
