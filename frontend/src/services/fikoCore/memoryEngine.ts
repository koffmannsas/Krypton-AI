import { db } from "../../firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  limit, 
  orderBy, 
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { ConversationState } from "./doctrine/stateMachine";

export interface FikoUserMemory {
  userId: string;
  activitySector?: string;
  location?: string;
  salesChannel?: string;
  volumeProspects?: string;
  frictionPoint?: string;
  estimatedLossFCFA?: number;
  objectionsCleared?: boolean;
  closingAccepted?: boolean;
  currentState: ConversationState;
  businessGoals: string[];
  memoryLevel: string;
  lastInteraction: string;
  updatedAt: any;
}

export interface FikoMessage {
  role: "user" | "model";
  text: string;
  timestamp: any;
}

export const memoryEngine = {
  /**
   * Load or initialize Fiko Memory for a user
   */
  getMemory: async (userId: string): Promise<FikoUserMemory> => {
    try {
      const q = query(collection(db, "fiko_memory"), where("userId", "==", userId), limit(1));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        return {
          userId,
          activitySector: data.activitySector,
          location: data.location,
          salesChannel: data.salesChannel,
          volumeProspects: data.volumeProspects,
          frictionPoint: data.frictionPoint,
          estimatedLossFCFA: data.estimatedLossFCFA,
          objectionsCleared: data.objectionsCleared,
          closingAccepted: data.closingAccepted,
          currentState: (data.currentState || "DISCOVERY") as ConversationState,
          businessGoals: data.businessGoals || [],
          memoryLevel: data.memoryLevel || "discovery",
          lastInteraction: data.lastInteraction || new Date().toISOString(),
          updatedAt: data.updatedAt
        };
      }
    } catch (error) {
      console.warn("Firestore not reachable for fiko_memory, falling back to localStorage:", error);
    }

    // Local Storage Fallback
    const local = localStorage.getItem(`fiko_mem_${userId}`);
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        // ignore
      }
    }

    // Default Memory
    return {
      userId,
      currentState: "DISCOVERY",
      businessGoals: [],
      memoryLevel: "discovery",
      lastInteraction: new Date().toISOString(),
      updatedAt: new Date()
    };
  },

  /**
   * Save or update Fiko Memory
   */
  saveMemory: async (userId: string, memory: Partial<FikoUserMemory>): Promise<void> => {
    // Save to local storage first for speed
    const currentLocal = await memoryEngine.getMemory(userId);
    const updated = { ...currentLocal, ...memory, updatedAt: new Date().toISOString() };
    localStorage.setItem(`fiko_mem_${userId}`, JSON.stringify(updated));

    // Save to Firestore
    try {
      const q = query(collection(db, "fiko_memory"), where("userId", "==", userId), limit(1));
      const snapshot = await getDocs(q);

      const dbPayload = {
        ...memory,
        userId,
        updatedAt: serverTimestamp()
      };

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        await updateDoc(doc(db, "fiko_memory", docId), dbPayload);
      } else {
        await addDoc(collection(db, "fiko_memory"), {
          ...dbPayload,
          currentState: memory.currentState || "DISCOVERY",
          businessGoals: memory.businessGoals || [],
          memoryLevel: memory.memoryLevel || "discovery",
          lastInteraction: new Date().toISOString()
        });
      }
    } catch (error) {
      console.warn("Could not save to Firestore, local storage only:", error);
    }
  },

  /**
   * Get historical messages for a user
   */
  getConversationHistory: async (userId: string): Promise<FikoMessage[]> => {
    try {
      const q = query(
        collection(db, "fiko_conversations"), 
        where("userId", "==", userId),
        orderBy("timestamp", "asc")
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            role: data.role as "user" | "model",
            text: data.text,
            timestamp: data.timestamp
          };
        });
      }
    } catch (error) {
      console.warn("Could not load history from Firestore, falling back to localStorage:", error);
    }

    const localHist = localStorage.getItem(`fiko_hist_${userId}`);
    if (localHist) {
      try {
        return JSON.parse(localHist);
      } catch (e) {
        return [];
      }
    }
    return [];
  },

  /**
   * Add message to historical logs
   */
  saveMessage: async (userId: string, role: "user" | "model", text: string): Promise<void> => {
    // Local storage
    const currentHist = await memoryEngine.getConversationHistory(userId);
    const newMessage: FikoMessage = { role, text, timestamp: new Date().toISOString() };
    localStorage.setItem(`fiko_hist_${userId}`, JSON.stringify([...currentHist, newMessage]));

    // Firestore
    try {
      await addDoc(collection(db, "fiko_conversations"), {
        userId,
        role,
        text,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.warn("Could not save message to Firestore:", error);
    }
  },

  /**
   * Update or initialize Fiko Relationship state (trust score, behaviors)
   */
  updateRelationship: async (userId: string, trustScoreDelta: number, communicationStyle?: string): Promise<void> => {
    try {
      const q = query(collection(db, "fiko_relationships"), where("userId", "==", userId), limit(1));
      const snapshot = await getDocs(q);

      let currentScore = 50;
      let style = communicationStyle || "growth";

      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        currentScore = Math.max(0, Math.min(100, (data.trustScore || 50) + trustScoreDelta));
        const docId = snapshot.docs[0].id;
        await updateDoc(doc(db, "fiko_relationships", docId), {
          trustScore: currentScore,
          communicationStyle: style,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, "fiko_relationships"), {
          userId,
          relationshipLevel: "discovery",
          communicationStyle: style,
          trustScore: Math.max(0, Math.min(100, 50 + trustScoreDelta)),
          dominantBehaviors: ["ambitious"],
          strategicPreferences: ["whatsapp_focused"],
          favoriteModes: ["conversion"],
          synchronizationLevel: 10,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.warn("Could not update relationship state in Firestore:", error);
    }
  }
};
