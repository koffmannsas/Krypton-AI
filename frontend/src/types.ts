export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  keywords: string[];
  cluster: string;
}

export interface Topic {
  id: string;
  topic: string;
  pillar: boolean;
  keywords: string[];
  clusters: string[]; // List of titles/queries that should be covered
}

export interface TopicCoverage {
  coverage: number;
  missing: string[];
  score: number;
}

export interface BacklinkTask {
  id: string;
  platform: string;
  targetUrl: string;
  status: 'pending' | 'published' | 'failed';
  variantTitle: string;
  createdAt: string;
}

export interface DomainAuthority {
  score: number;
  totalBacklinks: number;
  referringDomains: number;
  history: { date: string; score: number }[];
}

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
  PROFILE = "profile",
  WHITEPAPER = "whitepaper",
  ADMIN_AUTH = "admin_auth",
  FIKO = "fiko",
  FIKO_AUDIT = "fiko_audit",
  FIKO_CONNECT = "fiko_connect",
  VIVA_LEADS = "viva_leads",
  ACCESS_OFFER = "access_offer",
  TERRA_OFFER = "terra_offer",
  MARS_OFFER = "mars_offer",
  KRYPTON_OFFER = "krypton_offer",
  GALAXY_OFFER = "galaxy_offer",
  FIKO_SOLO_OFFER = "fiko_solo_offer",
  FIKO_PILOT_OFFER = "fiko_pilot_offer",
  FIKO_ELITE_OFFER = "fiko_elite_offer",
  FIKO_EMPIRE_OFFER = "fiko_empire_offer",
  SEO = "seo",
  PAYMENT = "payment",
  CATEGORY = "category",
  BLOG = "blog",
  PILLAR_SITE_WEB = "pillar_site_web",
  PILLAR_AGENTS_IA = "pillar_agents_ia",
  PILLAR_ACQUISITION = "pillar_acquisition",
  PRIVACY = "privacy",
  DATA_DELETION = "data_deletion",
  TERMS = "terms",
  AUTH_CALLBACK = "auth_callback",
  AMBASSADEURS = "ambassadeurs",
  ASSISTANCE = "assistance",
  ASSISTANCE_TOPIC = "assistance_topic",
  ABOUT = "about",
  PORTAL_ACTIVATION = "portal_activation",
  FIKO_SEND = "fiko_send",
  EGERIE = "egerie",
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

// --
// FIKO MEMORY ENGINE
// --

export interface FikoMemoryEvent {
  period: string; // 'Aujourd\'hui', 'Hier', 'Cette semaine'
  events: Array<{
    text: string;
    type: 'system' | 'behavior' | 'success' | 'conversation' | 'business';
  }>;
}

export interface FikoMemory {
  id: string;
  userId: string;
  businessGoals: string[];
  activeModules: string[];
  onboardingProgress: number; // 0-100
  acquisitionChannels: string[];
  recentActions: string[];
  recommendations: string[];
  memoryLevel: string;
  lastInteraction: string; // ISO Date String
  growthScore: number;
  timeline: FikoMemoryEvent[];
  updatedAt: string;
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

export type FikoDecisionType = 'micro_recommendation' | 'strategic_alert' | 'proactive_decision' | 'autonomous_preparation';
export type FikoDecisionPriority = 'urgent' | 'important' | 'optimization' | 'future';
export type FikoDecisionUrgency = 'high' | 'medium' | 'low';
export type FikoDecisionImpact = 'strong' | 'medium' | 'low';

export interface FikoDecision {
  id: string;
  userId: string;
  type: FikoDecisionType;
  priority: FikoDecisionPriority;
  confidence: number;
  recommendation: string;
  impact: FikoDecisionImpact;
  urgency: FikoDecisionUrgency;
  status: 'pending' | 'acknowledged' | 'actioned' | 'dismissed';
  createdAt: any;
  acknowledgedAt?: any;
}

export type FikoAutonomousActionType = 'preparation' | 'configuration' | 'optimization' | 'predictive';
export type FikoAutonomousActionPriority = 'critical' | 'strategic' | 'optimization' | 'opportunity';
export type FikoAutonomousActionStatus = 'prepared' | 'executing' | 'completed' | 'dismissed';

export interface FikoAutonomousAction {
  id: string;
  userId: string;
  type: FikoAutonomousActionType;
  title: string;
  description: string;
  estimatedImpact: string; // e.g., "+27% prospects qualifiés"
  estimatedTimeGain: string; // e.g., "12 heures / semaine"
  status: FikoAutonomousActionStatus;
  confidence: number;
  priority: FikoAutonomousActionPriority;
  generatedAt: any;
  activatedAt?: any;
}

export type FikoStrategicModeType = 'expansion' | 'conversion' | 'authority' | 'automation' | 'domination';

export interface FikoStrategicMode {
  id: string;
  userId: string;
  activeMode: FikoStrategicModeType;
  modeLevel: number;
  effectivenessScore: number;
  activatedAt: any;
  recommendedByAI: boolean;
  strategicGoals: string[];
  performanceMetrics: any; // e.g. { conversionRate: number, traffic: number }
}

export interface FikoOrchestration {
  id: string;
  userId: string;
  orchestrationType: string; // e.g., 'crm_sync', 'acquisition_boost'
  systemsAffected: string[]; // e.g., ['crm', 'whatsapp']
  confidence: number;
  impact: 'strong' | 'medium' | 'low';
  status: 'pending' | 'executed' | 'failed';
  strategicMode: FikoStrategicModeType;
  results: any;
  executedAt: any;
}

export interface FikoMarketPulse {
  id: string;
  userId: string;
  signalType: string;
  marketTrend: 'rising' | 'falling' | 'stable';
  confidence: number;
  impact: 'strong' | 'medium' | 'low';
  urgency: 'high' | 'medium' | 'low';
  recommendedMode: FikoStrategicModeType;
  createdAt: any;
}

export interface FikoImpactSimulation {
  id: string;
  userId: string;
  simulationType: 'acquisition' | 'conversion' | 'seo' | 'automation' | 'strategic';
  projectedImpact: number; // percentage
  confidence: number;
  riskLevel: 'high' | 'medium' | 'low';
  strategicMode: FikoStrategicModeType;
  generatedAt: any;
  validatedAt?: any;
  marketFactors: any; // object
}

export interface FikoRelationship {
  id: string;
  userId: string;
  relationshipLevel: 'discovery' | 'synchronization' | 'trust' | 'contextual' | 'copilot' | 'symbiosis';
  communicationStyle: 'executive' | 'growth' | 'guided' | 'enterprise';
  trustScore: number;
  dominantBehaviors: string[];
  strategicPreferences: string[];
  favoriteModes: FikoStrategicModeType[];
  interactionHistory: any;
  synchronizationLevel: number;
  updatedAt: any;
}

export interface FikoBehaviorPrediction {
  id: string;
  userId: string;
  predictionType: 'engagement' | 'growth' | 'conversion' | 'risk' | 'market';
  confidenceScore: number;
  impactLevel: 'strong' | 'medium' | 'low';
  urgencyLevel: 'high' | 'medium' | 'low';
  predictionMessage: string;
  recommendedAction?: string;
  status: 'active' | 'acknowledged' | 'completed';
  createdAt: any;
}

export interface FikoLearningEvent {
  id: string;
  userId: string;
  sourceType: 'prediction' | 'orchestration' | 'decision';
  sourceId: string;
  predictionValue: number;
  actualValue: number;
  accuracyScore: number;
  strategyAdjustment: string;
  createdAt: any;
}

export type OperationType = 'acquisition' | 'crm' | 'automation' | 'seo' | 'strategic';
export type OperationStatus = 'prepared' | 'executing' | 'completed' | 'dismissed';
export type ExecutionMode = 'assisted' | 'semi_autonomous' | 'autonomous';

export interface FikoAutonomousOperation {
  id: string;
  userId: string;
  operationType: OperationType;
  operationStatus: OperationStatus;
  confidenceScore: number;
  businessImpact: 'high' | 'medium' | 'low';
  executionMode: ExecutionMode;
  systemsAffected: string[];
  triggeredBy: string;
  createdAt: any;
  executedAt?: any;
  results?: any;
}

export interface FikoEconomicForecast {
  id: string;
  userId: string;
  forecastType: 'market_growth' | 'economic_risk' | 'opportunity' | 'revenue' | 'strategic';
  confidenceScore: number;
  projectedGrowth: number;
  economicRisk: 'high' | 'medium' | 'low';
  opportunityLevel: 'strong' | 'medium' | 'low';
  strategicRecommendation: string;
  marketSignals: any;
  generatedAt: any;
  forecastWindow: '7d' | '30d' | '90d' | '6m' | '12m';
  status: 'active' | 'outdated';
}

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
