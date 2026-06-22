import { UserProfile, FikoLead, Opportunity, OpportunityType } from "../types";
import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy, limit, updateDoc, doc } from "firebase/firestore";

/**
 * Moteur de détection des opportunités Fiko
 */
export const opportunityEngine = {
  detectOpportunities: async (
    user: UserProfile, 
    leads: FikoLead[], 
    activeAgentsCount: number = 0,
    currentPlanId: string = 'PILOT'
  ): Promise<Opportunity[]> => {
    
    if (!user.uid && !user.id) return [];
    const uid = user.uid || user.id;
    
    const detectedOpportunities: Partial<Opportunity>[] = [];
    
    // Calculate global score
    const avgScore = leads.length > 0 
      ? leads.reduce((acc, l) => acc + (l.score || 0), 0) / leads.length 
      : (user.onboardingStep || 0);

    // Rule 1: High Score + Not Enterprise = Upgrade
    if (avgScore > 70 && currentPlanId !== 'KRYPTON' && currentPlanId !== 'GALAXY') {
      detectedOpportunities.push({
        type: 'upgrade',
        value: 1500000, // Estimation +1.5M FCFA potentiels
        impact: 120, // +120 leads/mois
      });
    }

    // Rule 2: Onboarding Done + No Agents Active = Activation
    if (user.onboardingCompleted && activeAgentsCount === 0) {
      detectedOpportunities.push({
        type: 'activation_agents',
        value: 500000,
        impact: 50,
      });
    }

    // Rule 3: Has Leads + Low Conversion Score = Conversion Optimization
    if (leads.length > 10 && avgScore < 50) {
      detectedOpportunities.push({
        type: 'conversion_optimization',
        value: 1000000,
        impact: 80,
      });
    }

    // Check against existing open opportunities to avoid duplicates
    const q = query(collection(db, "opportunities"), where("userId", "==", uid), where("status", "==", "open"));
    const snapshot = await getDocs(q);
    const existingOppTypes = snapshot.docs.map(doc => doc.data().type as string);

    const createdOpportunities: Opportunity[] = [];

    for (const opp of detectedOpportunities) {
      if (!existingOppTypes.includes(opp.type as string)) {
        // Create new opportunity
        const docRef = await addDoc(collection(db, "opportunities"), {
          userId: uid,
          type: opp.type,
          value: opp.value,
          impact: opp.impact,
          status: "open",
          createdAt: serverTimestamp()
        });
        
        createdOpportunities.push({
          id: docRef.id,
          userId: uid,
          type: opp.type as OpportunityType,
          value: opp.value || 0,
          impact: opp.impact || 0,
          status: "open",
          createdAt: new Date()
        });
      }
    }

    // Retrieve all active opportunities
    const activeOppsSnapshot = await getDocs(q);
    const currentOpps = activeOppsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Opportunity[];

    return [...currentOpps, ...createdOpportunities];
  },

  markAsClicked: async (opportunityId: string) => {
    try {
      const oppRef = doc(db, 'opportunities', opportunityId);
      await updateDoc(oppRef, {
        status: 'clicked'
      });
    } catch (error) {
      console.error("Error updating opportunity:", error);
    }
  },

  markAsConverted: async (opportunityId: string) => {
    try {
      const oppRef = doc(db, 'opportunities', opportunityId);
      await updateDoc(oppRef, {
        status: 'converted'
      });
    } catch (error) {
      console.error("Error updating opportunity:", error);
    }
  }
};
