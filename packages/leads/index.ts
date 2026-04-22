import { db } from "@krypton/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  source: string;
}

export async function scrapeLeads(companyId: string): Promise<Lead[]> {
  // Mock scraping logic
  return [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      companyName: "Acme Corp",
      source: "LinkedIn",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+0987654321",
      companyName: "TechFlow",
      source: "Website",
    },
  ];
}

export async function enrichData(
  lead: Lead,
): Promise<Lead & { enriched: boolean; score: number }> {
  // Mock enrichment
  return {
    ...lead,
    enriched: true,
    score: Math.floor(Math.random() * 100),
  };
}

export async function pushLeadToDashboard(
  companyId: string,
  lead: Lead & { enriched: boolean; score: number },
) {
  try {
    await addDoc(collection(db, "leads"), {
      ...lead,
      companyId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error pushing lead", error);
    throw error;
  }
}
