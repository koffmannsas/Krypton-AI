export interface GatePricingDetails {
  name: string;
  subtitle: string;
  originalPrice: string;
  uniquePrice: string;
  economy: string;
  fractionne: string;
  splitFirst: string;
  splitSecond: string;
}

export const PRICING_CATALOG: Record<string, GatePricingDetails> = {
  ACCESS: {
    name: "PORTE ACCESS",
    subtitle: "Démarrage standard",
    originalPrice: "200 000 FCFA",
    uniquePrice: "170 000 FCFA",
    economy: "30 000 FCFA",
    fractionne: "45 000 FCFA",
    splitFirst: "100 000 FCFA",
    splitSecond: "100 000 FCFA"
  },
  TERRA: {
    name: "PORTE TERRA",
    subtitle: "L'Artisan Digital",
    originalPrice: "700 000 FCFA",
    uniquePrice: "595 000 FCFA",
    economy: "105 000 FCFA",
    fractionne: "145 800 FCFA",
    splitFirst: "350 000 FCFA",
    splitSecond: "350 000 FCFA"
  },
  MARS: {
    name: "PORTE MARS",
    subtitle: "Le Conquérant",
    originalPrice: "1 900 000 FCFA",
    uniquePrice: "1 615 000 FCFA",
    economy: "285 000 FCFA",
    fractionne: "395 000 FCFA",
    splitFirst: "950 000 FCFA",
    splitSecond: "950 000 FCFA"
  },
  KRYPTON: {
    name: "PORTE KRYPTON",
    subtitle: "Le Souverain",
    originalPrice: "3 900 000 FCFA",
    uniquePrice: "3 315 000 FCFA",
    economy: "585 000 FCFA",
    fractionne: "815 000 FCFA",
    splitFirst: "1 950 000 FCFA",
    splitSecond: "1 950 000 FCFA"
  },
  GALAXY: {
    name: "PORTE GALAXY",
    subtitle: "L'Architecte",
    originalPrice: "SUR DEVIS",
    uniquePrice: "SUR DEVIS",
    economy: "-",
    fractionne: "-",
    splitFirst: "-",
    splitSecond: "-"
  }
};

export const getPricingDetails = (gate: string): GatePricingDetails => {
  const normalized = gate.toUpperCase().trim();
  if (PRICING_CATALOG[normalized]) {
    return PRICING_CATALOG[normalized];
  }
  return {
    name: `PORTE ${normalized}`,
    subtitle: "Configuration Sur Mesure",
    originalPrice: "SUR DEVIS",
    uniquePrice: "SUR DEVIS",
    economy: "-",
    fractionne: "-",
    splitFirst: "-",
    splitSecond: "-"
  };
};

export const VOICE_PRICING_CATALOG = {
    standard: "700 000 FCFA / an",
    pro: "1 900 000 FCFA / an",
    enterprise: "3 900 000 FCFA / an",
    additionalMinute: "1200 FCFA/min",
    packs: [
        { name: "PACK 100", minutes: "100 min", price: "150 000 FCFA" },
        { name: "PACK 300", minutes: "300 min", price: "350 000 FCFA" },
        { name: "PACK 1 000", minutes: "1 000 min", price: "900 000 FCFA" },
    ]
};
