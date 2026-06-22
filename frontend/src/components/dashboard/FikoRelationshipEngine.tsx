import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  BrainCircuit,
  Zap,
  Activity,
  UserCheck
} from "lucide-react";
import { UserProfile, FikoRelationship } from "../../types";

interface RelationshipEngineProps {
  user: UserProfile;
  embedded?: boolean;
}

export default function FikoRelationshipEngine({ user, embedded }: RelationshipEngineProps) {
  const [relationship, setRelationship] = useState<FikoRelationship | null>(null);

  useEffect(() => {
    // Mock fetch
    setRelationship({
        id: "rel-1",
        userId: user.uid,
        relationshipLevel: 'trust',
        communicationStyle: 'growth',
        trustScore: 88,
        dominantBehaviors: ["acquisition_focus", "rapid_decision"],
        strategicPreferences: ["scaling"],
        favoriteModes: ["conversion"],
        interactionHistory: {},
        synchronizationLevel: 75,
        updatedAt: new Date(),
    });
  }, [user.uid]);

  if (!relationship) return null;

  return (
    <div className={`${embedded ? 'bg-transparent border-none p-6' : 'bg-[#111116] border border-white/5 p-8 rounded-3xl'} h-full flex flex-col relative overflow-hidden group transition-all`}>
      {!embedded && <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent pointer-events-none" />}
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white">
          <HeartHandshake size={16} className="text-purple-500" /> Fiko Relationship
        </h3>
        <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full uppercase tracking-widest border border-purple-500/20">
          Niveau {relationship.relationshipLevel}
        </span>
      </div>

      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-6">
            <div className="size-20 rounded-full border-2 border-purple-500/30 flex items-center justify-center p-1">
                <div className="size-full rounded-full bg-purple-500/20 flex items-center justify-center">
                    <BrainCircuit className="text-purple-400" size={32} />
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-black text-white">{user.firstName}, Fiko vous connaît bien.</p>
                <p className="text-xs text-slate-500">Style : <span className="text-purple-300 font-bold uppercase">{relationship.communicationStyle}</span></p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${relationship.trustScore}%`}} />
                    </div>
                    <span className="text-[10px] text-purple-400 font-bold">{relationship.trustScore}%</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[10px] uppercase text-slate-500 tracking-widest">Synchro</p>
                <p className="text-lg font-bold text-white">{relationship.synchronizationLevel}%</p>
            </div>
             <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[10px] uppercase text-slate-500 tracking-widest">Favoris</p>
                <p className="text-lg font-bold text-white uppercase">{relationship.favoriteModes[0]}</p>
            </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/5 p-4 rounded-xl">
             <UserCheck size={16} className="text-purple-500 mb-2" />
             <p className="text-[10px] text-purple-200/80 leading-relaxed">
                Fiko a identifié votre préférence pour le mode <span className="text-purple-400 font-bold uppercase">{relationship.favoriteModes[0]}</span> et adapte sa communication executive pour maximiser votre efficacité.
             </p>
        </div>
      </div>
    </div>
  );
}
