import {
  Page,
  UserRole,
  UserSubscription,
  InfrastructureHealth,
  VivaCampaign,
  VivaLead,
  Agent,
  Lead,
  BuyingWindow,
  LTVClass,
  CountryConfig,
  KryptonClient,
  PlanType,
} from "./types";
import { sendToFiko } from "./services/fikoAPI";

export const MOCK_SUBSCRIPTION: UserSubscription = {
  plan: "pro",
  leadsUsed: 1240,
  leadsLimit: 5000,
  campaignsCount: 12,
  emailCredits: 850,
};

export const MOCK_INFRA_HEALTH: InfrastructureHealth = {
  proxies: { available: 142, total: 150, status: "healthy" },
  apis: { google_places: 0.94, linkedin: 0.88, scrapingbee: 0.99 },
  latency: 14,
};

export const MOCK_VIVA_CAMPAIGNS: VivaCampaign[] = [
  {
    id: "C-001",
    name: "Plombiers Sénégal",
    status: "active",
    progress: 78,
    leadsFound: 342,
    target: { industry: "BTP", location: "Dakar" },
  },
  {
    id: "C-002",
    name: "Investisseurs Côte d'Ivoire",
    status: "completed",
    progress: 100,
    leadsFound: 89,
    target: { industry: "Finance", location: "Abidjan" },
  },
];

export const MOCK_VIVA_LEADS: VivaLead[] = [
  {
    id: "L-001",
    companyName: "BuildCorp Africa",
    industry: "BTP",
    website: "buildcorp.sn",
    contactName: "Moussa Diop",
    email: "m.diop@buildcorp.sn",
    phone: "+221 77 123 45 67",
    score: 92,
    source: "google_maps",
    isMasked: false,
  },
  {
    id: "L-002",
    companyName: "Sahel Logistic",
    industry: "Logistique",
    website: "sahel.ci",
    contactName: "Awa Kone",
    email: "a***@sahel.ci",
    phone: "+225 ******89",
    score: 84,
    source: "linkedin",
    isMasked: true,
  },
];

export const FIKO_AUTOPILOT_MASTER_PROMPT =
  "Tu es FIKO, l'intelligence de closing de Krypton AI.";
export const FIKO_CORE_SYSTEM_PROMPT =
  "Noyau de décision stratégique Krypton v10.0.";
export const FIKO_MASTER_CLOSER_PROMPT =
  "Tu es FIKO, le Master Closer de Krypton AI. Ton but est de qualifier et closer les leads avec une précision chirurgicale.";
export const UNIVERSAL_DISCOVERY_PROMPT =
  "Analyse le métier et propose une unité stratégique d'agents IA adaptée.";

// KRYPTON AI - ARSENAL AGENTS IA - V.1.1.1.1 [LOCKED]
// ATTENTION : NE PAS MODIFIER. Cette liste de 10 agents est critique pour la stabilité
// de la page 'Nos Agents'. Toute modification doit faire l'objet d'une validation
// de version majeure. Ne pas réduire le nombre d'agents en dessous de 10.
export const MASTER_AGENTS: Agent[] = [
  {
    id: "fiko-sdr",
    name: "FIKO SDR",
    sector: "Ventes",
    category: "SDR",
    description:
      "Expert en qualification et premier contact. Analyse les signaux faibles pour préparer le terrain.",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "fiko-closer",
    name: "FIKO Closer",
    sector: "Ventes",
    category: "CLOSING",
    description:
      "Négociateur d'élite. Prend le relais pour transformer les prospects qualifiés en clients fidèles.",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "seoly-prime",
    name: "SEOly Prime",
    sector: "Marketing",
    category: "GROWTH",
    description:
      "Optimise la visibilité organique. Analyse les SERPs pour positionner votre marque en leader.",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "datascraper-v9",
    name: "DataScraper v9",
    sector: "Intelligence",
    category: "DATA",
    description:
      "Maître de l'extraction de données. Identifie les opportunités cachées sur le web.",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "aurora-vision",
    name: "Aurora Vision",
    sector: "Stratégie",
    category: "ANALYTICS",
    description:
      "Analyse les tendances du marché pour anticiper les disruptions et orienter la stratégie long-terme.",
    status: "standby",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "helios-prospect",
    name: "Helios Prospector",
    sector: "Ventes",
    category: "LEAD-GEN",
    description:
      "Génère des listes de prospects ultra-qualifiées en se basant sur des critères prédictifs.",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "orion-negotiator",
    name: "Orion Negotiator",
    sector: "Ventes",
    category: "DEALMAKING",
    description:
      "Spécialiste des cycles de vente complexes. Gère les objections et les négociations multi-intervenants.",
    status: "standby",
    image:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "zenith-bi",
    name: "Zenith BI",
    sector: "Stratégie",
    category: "BI",
    description:
      "Transforme les données brutes en insights visuels pour une prise de décision éclairée au niveau C-Level.",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "anubis-secure",
    name: "anubis secure",
    sector: "Opérations",
    category: "SECURITY",
    description:
      "Assure l'intégrité et la protection de l'écosystème. Détecte et neutralise les menaces en temps réel.",
    status: "deploying",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "echo-crm",
    name: "Echo CRM",
    sector: "Opérations",
    category: "AUTOMATION",
    description:
      "Automatise l'ensemble du cycle de vie client, du premier contact à la fidélisation.",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
  },
];

export const LEADS: Lead[] = [
  {
    id: "LD-001",
    entity: "Koffmann Invest",
    email: "ceo@koffmann.ai",
    category: "Finance",
    priorityScore: 96,
    status: "hot",
    buyingMoment: BuyingWindow.NOW,
    ltvClass: LTVClass.PLATINUM,
    intelligence: {
      decisionId: "DEC-842",
      actionTaken: "CLOSING_ULTIME",
      confidence: 0.98,
      topTriggers: [{ feature: "Pouvoir Décisionnel", impact: 0.9 }],
      timestamp: new Date().toISOString(),
    },
  },
];

export const NAV_LINKS = [
  { id: Page.HOME, label: "Accueil" },
  { id: Page.FIKO, label: "FIKO™" },
  { id: Page.VIVA_LEADS, label: "VIVA LEADS" },
  { id: Page.AGENTS, label: "Nos Agents" },
  { id: Page.PRICING, label: "Tarifs" },
  { id: Page.BLOG, label: "Blog" },
];

export const GATE_THEMES: Record<string, any> = {
  MARS: { color: "#FF2718", desc: "Accélération Incandescente" },
  TERRA: { color: "#10b981", desc: "Fondation Émeraude" },
  KRYPTON: { color: "#3b82f6", desc: "Puissance Électrique" },
};

export const MOCK_CLIENT_PROJECT = {
  id: "PRJ-001",
  name: "Opération Aurora",
  progress: 68,
  status: "Déploiement",
};
export const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "Sync terminée",
    message: "Extraction Node #842 terminée.",
    time: "2m",
    read: false,
  },
];
export const MOCK_CLIENT_DOCS = [
  {
    id: "1",
    name: "Audit_Neural.pdf",
    size: "2.4MB",
    date: "2025-01-10",
    type: "PDF",
    status: "Signé",
  },
];

export const FIKO_EMAIL_TEMPLATES = {
  CONFIRMATION: {
    body: "Bonjour {{Prénom}}, votre audit est prêt pour {{Objectif}}.",
  },
  MAGIC_LINK: {
    body: "Bonjour {{Prénom}}, voici votre lien d'accès sécurisé : {{Link}}",
  },
};

export const COUNTRIES: CountryConfig[] = [
  { id: "sn", name: "Sénégal", code: "XOF", flag: "🇸🇳", rate: 1 },
  { id: "ci", name: "Côte d'Ivoire", code: "XOF", flag: "🇨🇮", rate: 1 },
  { id: "cm", name: "Cameroun", code: "XAF", flag: "🇨🇲", rate: 1 },
];

export const PLAN_DATA: Record<
  PlanType,
  { price: number; maintenance: number; color: string }
> = {
  ACCESS: { price: 200000, maintenance: 20000, color: "#a855f7" },
  FIKO: { price: 500000, maintenance: 50000, color: "#3b82f6" },
  AGENT_IA: { price: 500000, maintenance: 50000, color: "#3b82f6" },
  VOICE_TERRA: { price: 700000, maintenance: 70000, color: "#10b981" },
  VOICE_MARS: { price: 1900000, maintenance: 190000, color: "#FF2718" },
  VOICE_KRYPTON: { price: 3900000, maintenance: 390000, color: "#eab308" },
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const SEO_CLUSTERS = [
  {
    title: "Sites Web Intelligents",
    keywords: [
      "site web intelligent",
      "site web avec intelligence artificielle",
      "site web automatisé",
      "création site web IA",
      "site web nouvelle génération",
      "site web interactif IA",
      "site web qui génère des clients",
      "site web automatisé pour entreprise",
      "site web intelligent Afrique",
      "plateforme de création de site intelligent",
    ],
  },
  {
    title: "Agents IA & Automatisation",
    keywords: [
      "agent IA pour site web",
      "chatbot intelligent entreprise",
      "assistant IA commercial",
      "IA conversationnelle business",
      "automatisation marketing IA",
      "automatisation des ventes",
      "automatisation des leads",
      "intelligence artificielle pour entreprise",
      "agent IA 24h/24",
      "logiciel IA automatisé",
    ],
  },
  {
    title: "Acquisition & Conversion",
    keywords: [
      "génération de leads automatique",
      "convertir visiteurs en clients",
      "site web qui vend automatiquement",
      "acquisition client digitale",
      "stratégie marketing automatisée",
      "tunnel de vente automatisé",
      "outil de génération de clients",
      "augmenter ses ventes avec IA",
      "marketing digital automatisé",
      "conversion automatique prospects",
    ],
  },
  {
    title: "CRM & Gestion Intelligente",
    keywords: [
      "CRM intelligent",
      "CRM avec intelligence artificielle",
      "logiciel CRM automatisé",
      "gestion des leads automatisée",
      "CRM pour PME Afrique",
      "CRM pour entreprise",
      "logiciel de gestion client IA",
      "outil de suivi client automatisé",
      "CRM marketing intelligent",
      "plateforme CRM SaaS",
    ],
  },
];

export const MOCK_CLIENTS: KryptonClient[] = [
  {
    client_id: "C-001",
    name: "BuildCorp Africa",
    email: "contact@buildcorp.sn",
    plan_type: "VOICE_MARS",
    activation_date: "2025-01-15",
    maintenance_start_date: "2025-07-15",
    maintenance_active: false,
    voice_minutes_used: 450,
    voice_minutes_limit: 600,
    status: "active",
    marge_brute: 1850000,
  },
  {
    client_id: "C-002",
    name: "Sahel Logistic",
    email: "direction@sahel.ci",
    plan_type: "ACCESS",
    activation_date: "2024-05-20",
    maintenance_start_date: "2024-11-20",
    maintenance_active: true,
    voice_minutes_used: 0,
    voice_minutes_limit: 0,
    status: "risk",
    marge_brute: -5000,
  },
  {
    client_id: "C-003",
    name: "Clinique Vision",
    email: "admin@vision.ml",
    plan_type: "VOICE_TERRA",
    activation_date: "2025-03-01",
    maintenance_start_date: "2025-09-01",
    maintenance_active: false,
    voice_minutes_used: 150,
    voice_minutes_limit: 150,
    status: "blocked",
    marge_brute: 680000,
  },
  {
    client_id: "C-004",
    name: "Invest Group",
    email: "ceo@invest.com",
    plan_type: "VOICE_KRYPTON",
    activation_date: "2025-02-10",
    maintenance_start_date: "2025-08-10",
    maintenance_active: false,
    voice_minutes_used: 890,
    voice_minutes_limit: 1000,
    status: "active",
    marge_brute: 3750000,
  },
  {
    client_id: "C-005",
    name: "Cabinet Juridis",
    email: "contact@juridis.bf",
    plan_type: "FIKO",
    activation_date: "2024-08-10",
    maintenance_start_date: "2025-02-10",
    maintenance_active: true,
    voice_minutes_used: 0,
    voice_minutes_limit: 0,
    status: "active",
    marge_brute: 480000,
  },
  {
    client_id: "C-006",
    name: "Koffmann Group",
    email: "ceo@koffmann.ai",
    plan_type: "VOICE_KRYPTON",
    activation_date: "2024-01-01",
    maintenance_start_date: "2024-07-01",
    maintenance_active: true,
    voice_minutes_used: 1250,
    voice_minutes_limit: 1000,
    status: "maintenance_required",
    marge_brute: 3500000,
  },
];
