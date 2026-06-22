export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: "admin" | "client";
  companyId?: string;
}

export interface Company {
  id: string;
  name: string;
  ownerId: string;
  createdAt: number;
}

export interface Subscription {
  id: string;
  companyId: string;
  plan: "ACCESS" | "TERRA" | "MARS" | "KRYPTON";
  status: "active" | "past_due" | "canceled";
  currentPeriodEnd: number;
}

export interface Payment {
  id: string;
  companyId: string;
  amount: number;
  currency: string;
  status: "succeeded" | "failed" | "pending";
  createdAt: number;
}

export interface AIAgent {
  id: string;
  companyId: string;
  type: "assistant" | "marketing" | "sales" | "sav";
  status: "active" | "inactive";
  name: string;
}
