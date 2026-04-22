import { db } from "@krypton/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export type AgentType = "marketing" | "sales" | "sav" | "cto" | "cfo";

export async function createAgent(
  companyId: string,
  type: AgentType,
  name: string,
) {
  try {
    await addDoc(collection(db, "ai_agents"), {
      companyId,
      type,
      name,
      status: "active",
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating agent", error);
    throw error;
  }
}

export async function analyzeBusiness(companyId: string) {
  // Mock AI analysis
  return {
    score: 85,
    recommendations: [
      "Increase marketing spend on LinkedIn",
      "Automate follow-ups for leads older than 3 days",
    ],
  };
}

export async function recommendUpgrade(companyId: string) {
  // Mock logic to recommend upgrade based on usage
  const agentsQuery = query(
    collection(db, "ai_agents"),
    where("companyId", "==", companyId),
  );
  const agentsSnapshot = await getDocs(agentsQuery);

  if (agentsSnapshot.size > 3) {
    return {
      shouldUpgrade: true,
      recommendedPlan: "KRYPTON",
      reason: "High agent usage detected.",
    };
  }

  return {
    shouldUpgrade: false,
    recommendedPlan: null,
    reason: "Current plan is sufficient.",
  };
}
