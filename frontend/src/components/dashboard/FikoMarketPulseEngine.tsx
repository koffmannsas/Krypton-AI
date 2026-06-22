import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { 
  Activity,
  Zap,
  TrendingUp,
  AlertTriangle,
  Globe
} from "lucide-react";
import { UserProfile, FikoStrategicModeType, FikoMarketPulse } from "../../types";

interface MarketPulseProps {
  user: UserProfile;
  activeMode: FikoStrategicModeType;
  embedded?: boolean;
}

const MOCK_PULSE_DATA = [
  { subject: 'SEO', A: 120, fullMark: 150 },
  { subject: 'Acquisition', A: 98, fullMark: 150 },
  { subject: 'WhatsApp', A: 86, fullMark: 150 },
  { subject: 'CRM', A: 99, fullMark: 150 },
  { subject: 'Funnels', A: 85, fullMark: 150 },
];

export default function FikoMarketPulseEngine({ user, activeMode, embedded }: MarketPulseProps) {
  const [pulseSignals, setPulseSignals] = useState<FikoMarketPulse[]>([]);
  
  // Logic to simulate Market Analysis
  useEffect(() => {
    // Initial fetch from Firestore (mocked)
    setPulseSignals([
      {
        id: "pulse-1",
        userId: user.uid,
        signalType: "whatsapp_growth",
        marketTrend: "rising",
        confidence: 91,
        impact: "strong",
        urgency: "medium",
        recommendedMode: "expansion",
        createdAt: new Date(),
      }
    ]);
  }, [user.uid]);

  return (
    <div className={`${embedded ? 'bg-transparent border-none p-6' : 'bg-[#111116] border border-white/5 p-8 rounded-3xl'} h-full flex flex-col relative overflow-hidden group transition-all`}>
      {!embedded && <div className="absolute inset-0 bg-gradient-to-tl from-red-500/5 to-transparent pointer-events-none" />}
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white">
          <Globe size={16} className="text-red-600" /> Fiko Market Pulse
        </h3>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={MOCK_PULSE_DATA}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#888', fontSize: 10}} />
                    <Radar name="Market" dataKey="A" stroke="#E10600" fill="#E10600" fillOpacity={0.4} />
                    <Tooltip contentStyle={{backgroundColor: '#111', border: '1px solid #333', color: '#fff'}} />
                </RadarChart>
            </ResponsiveContainer>
        </div>

        <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {pulseSignals.map(pulse => (
            <div key={pulse.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <TrendingUp size={16} className={pulse.marketTrend === 'rising' ? 'text-green-500' : 'text-red-500'} />
                    <div>
                        <p className="text-xs text-white font-bold uppercase tracking-widest">{pulse.signalType}</p>
                        <p className="text-[10px] text-slate-500 uppercase">Impact {pulse.impact}</p>
                    </div>
                </div>
                <div className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-bold">
                    {pulse.confidence}% IA
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
