
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  target: string;
  description: string;
  isRecommended?: boolean;
}

export const KRYPTON_PRICING: PricingPlan[] = [
  {
    id: "starter",
    name: "STARTER",
    price: 250000,
    currency: "XOF",
    target: "Indépendants & TPE",
    description: "La base solide pour digitaliser votre acquisition.",
    features: [
      "Site Web Intelligent (1 page)",
      "Agent IA Basique (Chat fixe)",
      "Qualification de Leads",
      "Dashboard Client",
      "Support standard"
    ]
  },
  {
    id: "pro",
    name: "PRO",
    price: 550000,
    currency: "XOF",
    target: "PME en croissance",
    description: "L'écosystème complet pour dominer votre marché.",
    features: [
      "Site Web Multi-pages (5 pages)",
      "Agent FIKO SDR (Qualification poussée)",
      "VIVA LEADS (Scraping ciblé)",
      "Intégration CRM Krypton",
      "Support prioritaire"
    ],
    isRecommended: true
  },
  {
    id: "elite",
    name: "ELITE",
    price: 1250000,
    currency: "XOF",
    target: "Entreprises & Grands Comptes",
    description: "Puissance brute et automatisation totale.",
    features: [
      "Écosystème Digital Complet",
      "FIKO Autopilot (Closing IA)",
      "Agents IA sur mesure",
      "VIVA LEADS Illimité",
      "Accompagnement Stratégique Hebdomadaire"
    ]
  }
];
