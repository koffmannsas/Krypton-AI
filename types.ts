export enum Page {
  HOME = "home",
  AGENTS = "agents",
  VOICE = "voice",
  CRM = "crm",
  SCRAPER = "scraper",
  TRUST = "trust",
  PRICING = "pricing",
  BILLING = "billing",
  CLIENT_DASHBOARD = "client_dashboard",
  ADMIN_DASHBOARD = "admin_dashboard",
  AUTH = "auth",
  SIGNUP = "signup",
  WHITEPAPER = "whitepaper",
  ADMIN_AUTH = "admin_auth",
  FIKO = "fiko",
  FIKO_AUDIT = "fiko_audit",
  VIVA_LEADS = "viva_leads",
  ACCESS_OFFER = "access_offer",
  TERRA_OFFER = "terra_offer",
  MARS_OFFER = "mars_offer",
  KRYPTON_OFFER = "krypton_offer",
  GALAXY_OFFER = "galaxy_offer",
  SEO = "seo",
  PAYMENT = "payment",
}

/* Added missing FikoFlowStep enum */
export enum FikoFlowStep {
  START = "start",
  QUALIFY = "qualify",
  CLOSING = "closing",
}

export type SubscriptionPlan = "free" | "pro" | "enterprise";

export interface UserSubscription {
  plan: SubscriptionPlan;
  leadsUsed: number;
  leadsLimit: number;
  campaignsCount: number;
  emailCredits: number;
}

export interface InfrastructureHealth {
  proxies: {
    available: number;
    total: number;
    status: "healthy" | "degraded" | "critical";
  };
  apis: { google_places: number; linkedin: number; scrapingbee: number };
  latency: number;
}

export interface VivaCampaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  progress: number;
  leadsFound: number;
  target: { industry: string; location: string };
}

export interface VivaLead {
  id: string;
  companyName: string;
  industry: string;
  website: string;
  contactName: string;
  email: string;
  phone: string;
  score: number;
  source: "google_maps" | "linkedin" | "website";
  isMasked: boolean;
}

export enum UserRole {
  CLIENT = "client",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export interface UserProfile {
  id: string; // Will align with uid in firebase
  uid?: string; // Aligning with auth implementation
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  company?: string;
  status?: string;
  subscription?: UserSubscription;
  
  // Onboarding
  onboardingCompleted?: boolean;
  onboardingStep?: number;
  businessType?: string;
  objective?: string;
  revenueLevel?: string;
  budget?: string;
  urgency?: string;
  createdAt?: any;
}

export interface FikoLead {
  id: string;
  userId: string;
  email: string;
  score: number;
  status: "new" | "contacted" | "qualified" | "converted";
  qualification: "hot" | "warm" | "cold";
  source: string;
  createdAt: any;
  updatedAt?: any;
}

/* Updated Message interface with latency and modelUsed */
export interface Message {
  role: "user" | "model";
  text: string;
  timestamp?: string;
  latency?: number;
  modelUsed?: string;
}

export interface Project {
  id: string;
  name: string;
  gate: string;
  status: string;
  progress: number;
}

export interface KryptonDocument {
  id: string;
  name: string;
  size: string;
  date: string;
  type: string;
  status: string;
}

export interface KryptonNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface FollowUpRecord {
  id: string;
  targetName: string;
  channel: "email" | "chat";
  scenario: string;
  tone: string;
  message: string;
  sentAt: string;
  status: string;
  type: "auto" | "manual";
  targetId: string;
}

export enum BuyingWindow {
  NOW = "NOW",
  H24 = "24H",
  H72 = "72H",
  LATER = "LATER",
}

export enum LTVClass {
  PLATINUM = "PLATINUM",
  GOLD = "GOLD",
  SILVER = "SILVER",
  BRONZE = "BRONZE",
}

export interface Agent {
  id: string;
  name: string;
  sector: string;
  category: string;
  description: string;
  status: "active" | "standby" | "deploying";
  image: string;
}

export interface Lead {
  id: string;
  entity: string;
  email: string;
  category: string;
  priorityScore: number;
  status: string;
  buyingMoment: BuyingWindow;
  ltvClass?: LTVClass;
  assignedTo?: string;
  intelligence?: {
    decisionId: string;
    actionTaken: string;
    confidence: number;
    topTriggers: Array<{ feature: string; impact: number }>;
    timestamp: string;
  };
}

/* Added missing ProspectInfo type */
export interface ProspectInfo {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  visitorId?: string;
  lastSeen?: string;
  isNewDevice?: boolean;
}

/* Added missing StrategicBrief type */
export interface StrategicBrief {
  solutionName: string;
  sector: string;
  description: string;
  challenges: string[];
  recommendedAgents: string[];
}

/* Added missing CountryConfig type */
export interface CountryConfig {
  id: string;
  name: string;
  code: string;
  flag: string;
  rate: number;
}

/* Added missing MagicLinkContext type */
export interface MagicLinkContext {
  prospect: ProspectInfo;
  gate?: string;
  timestamp: string;
}

/* Added missing TrustedDevice type */
export interface TrustedDevice {
  email: string;
  visitorId: string;
  firstSeen: string;
  lastSeen: string;
  userAgent: string;
}

// Added for Billing Dashboard
export type OpportunityType = 'upgrade' | 'activation_agents' | 'conversion_optimization';

export interface Opportunity {
  id: string;
  userId: string;
  type: OpportunityType;
  value: number; // Potential extra revenue
  impact: number; // Potential extra leads/clients
  status: "open" | "clicked" | "converted" | "closed";
  createdAt: any;
}

export interface PaymentPlan {
  id: string;
  price: number;
  name: string;
}

export interface PaymentOption {
  installments: 1 | 2 | 3 | 4;
  total: number;
  monthlyAmount: number;
  extraCost: number;
  label: string;
  isRecommended?: boolean;
}

export interface PaymentRecord {
  id?: string;
  userId: string;
  plan: string;
  basePrice: number;
  installments: number;
  total: number;
  monthlyAmount: number;
  status: "pending" | "succeeded" | "failed";
  createdAt: any;
}


export type PlanType =
  | "ACCESS"
  | "FIKO"
  | "AGENT_IA"
  | "VOICE_TERRA"
  | "VOICE_MARS"
  | "VOICE_KRYPTON";

export type ClientStatus =
  | "active"
  | "blocked"
  | "maintenance_required"
  | "risk";

export interface KryptonClient {
  client_id: string;
  name: string;
  email: string;
  plan_type: PlanType;
  activation_date: string; // ISO date string
  maintenance_start_date: string; // ISO date string
  maintenance_active: boolean;
  voice_minutes_used: number;
  voice_minutes_limit: number;
  status: ClientStatus;
  marge_brute: number;
}
