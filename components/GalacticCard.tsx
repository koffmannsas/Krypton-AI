import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useCosmic } from "../contexts/CosmicContext";
import { sendToFiko } from "../services/fikoAPI";

interface GalacticCardProps {
  id: string;
  title: string;
  story: string;
  price: string;
  subtitle: string;
  features: string[];
  cta: string;
  color: string;
  onClick: () => void;
}

export default function GalacticCard({
  id,
  title,
  story,
  price,
  subtitle,
  features,
  cta,
  color,
  onClick,
}: GalacticCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setActiveCardId } = useCosmic();

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 20;
    const rotateX = (y / rect.height - 0.5) * -20;

    setRotate({ x: rotateX, y: rotateY });

    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    setLight({ x: lightX, y: lightY, opacity: 1 });
  };

  const handleEnter = () => {
    if (isTouchDevice) return;
    setActiveCardId(id);
    setIsFlipped(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play().catch((e) => {});
    }
    setLight((prev) => ({ ...prev, opacity: 1 }));
  };

  const handleLeave = () => {
    if (isTouchDevice) return;
    setActiveCardId(null);
    setIsFlipped(false);
    setRotate({ x: 0, y: 0 });
    setLight((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    if (isTouchDevice) {
      if (!isFlipped) {
        setIsFlipped(true);
        setActiveCardId(id);
        if (audioRef.current) {
          audioRef.current.volume = 0.1;
          audioRef.current.play().catch((e) => {});
        }
      } else {
        onClick();
      }
    } else {
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full h-full perspective cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <audio ref={audioRef} src="./sounds/galactic-open.mp3" preload="auto" />

      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateY: isFlipped ? 180 + rotate.y : rotate.y,
          rotateX: rotate.x,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FACE AVANT (STORYTELLING) */}
        <div
          className="absolute w-full h-full rounded-sm p-8 shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white border-t-4"
          style={{ 
            borderColor: color,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)"
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${light.x}% ${light.y}%, ${color}33, transparent 60%)`,
              opacity: light.opacity,
            }}
          />
          <div>
            <h2 className="text-2xl font-black mb-4 tracking-tighter uppercase text-white">
              {title}
            </h2>
            <p className="text-base opacity-80 leading-relaxed font-light italic line-clamp-6 text-white/80">
              {story}
            </p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-4 animate-pulse text-[#FF2718]">
            {isTouchDevice
              ? "Touchez pour activer →"
              : "Survolez pour activer →"}
          </div>
        </div>

        {/* FACE ARRIÈRE (PRIX & CONTENU) */}
        <div
          className="absolute w-full h-full rounded-sm p-6 shadow-2xl flex flex-col justify-between bg-black text-white border-t-4"
          style={{ 
            transform: "rotateY(180deg)", 
            borderColor: color,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="overflow-hidden flex flex-col flex-grow">
            <h3 className="text-sm font-black uppercase tracking-tighter pt-2 opacity-60">
              {title}
            </h3>
            <p className="text-2xl font-black tracking-tighter text-white mt-2">
              {price}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 line-clamp-1">
              {subtitle}
            </p>
            <ul className="text-sm space-y-3 mt-4 pt-4 border-t border-white/10 overflow-y-auto flex-grow custom-scrollbar pr-2">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[10px] text-slate-400"
                >
                  <CheckCircle2
                    size={12}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span className="font-bold uppercase tracking-widest">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="mt-4 w-full py-4 text-white font-black text-[9px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 group/btn"
            style={{ backgroundColor: color }}
          >
            {cta}
            <ArrowRight
              size={14}
              className="group-hover/btn:translate-x-2 transition-transform"
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
