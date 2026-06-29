// Shared domain interfaces
export interface GatePricingDetails {
  name: string;
  subtitle: string;
  originalPrice: number | null; // null represents "SUR DEVIS"
  uniquePrice: number | null;
  economy: number | null;
  fractionne: number | null;
  splitFirst: number | null;
  splitSecond: number | null;
}

export interface VoicePack {
  name: string;
  minutes: number;
  price: number;
}

export interface VoicePricing {
  standardAnnual: number;
  proAnnual: number;
  enterpriseAnnual: number;
  additionalMinute: number;
  packs: VoicePack[];
}

export class PricingCatalogClient {
  // In a real application, this would fetch from an API or Firebase Remote Config
  // For safety and zero-regression, we use the exact same values previously hardcoded.

  static getGatePricing(gate: string): GatePricingDetails {
    const catalog: Record<string, GatePricingDetails> = {
      ACCESS: {
        name: "PORTE ACCESS", subtitle: "Démarrage standard",
        originalPrice: 200000, uniquePrice: 170000, economy: 30000,
        fractionne: 45000, splitFirst: 100000, splitSecond: 100000
      },
      TERRA: {
        name: "PORTE TERRA", subtitle: "L'Artisan Digital",
        originalPrice: 700000, uniquePrice: 595000, economy: 105000,
        fractionne: 145800, splitFirst: 350000, splitSecond: 350000
      },
      MARS: {
        name: "PORTE MARS", subtitle: "Le Conquérant",
        originalPrice: 1900000, uniquePrice: 1615000, economy: 285000,
        fractionne: 395000, splitFirst: 950000, splitSecond: 950000
      },
      KRYPTON: {
        name: "PORTE KRYPTON", subtitle: "Le Souverain",
        originalPrice: 3900000, uniquePrice: 3315000, economy: 585000,
        fractionne: 815000, splitFirst: 1950000, splitSecond: 1950000
      },
      GALAXY: {
        name: "PORTE GALAXY", subtitle: "L'Architecte",
        originalPrice: null, uniquePrice: null, economy: null,
        fractionne: null, splitFirst: null, splitSecond: null
      }
    };

    return catalog[gate.toUpperCase().trim()] || catalog['GALAXY'];
  }

  static getVoicePricing(): VoicePricing {
    return {
      standardAnnual: 700000,
      proAnnual: 1900000,
      enterpriseAnnual: 3900000,
      additionalMinute: 1200,
      packs: [
        { name: "PACK 100", minutes: 100, price: 150000 },
        { name: "PACK 300", minutes: 300, price: 350000 },
        { name: "PACK 1 000", minutes: 1000, price: 900000 },
      ]
    };
  }
}
