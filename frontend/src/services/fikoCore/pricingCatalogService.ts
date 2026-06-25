import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface PricingCatalogPlan {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  included: string[];
  cta: string;
  story: string;
  order: number;
}

const FALLBACK_PLANS: PricingCatalogPlan[] = [
  {
    id: "ACCESS",
    name: "🎯 PORTE ACCESS",
    price: "200 000 FCFA",
    subtitle: "Licence 12 mois",
    included: [
      "Site web 5 pages",
      "Design premium responsive",
      "Optimisation mobile",
      "SEO de base",
      "Formulaire de contact",
      "Hébergement configuré",
    ],
    cta: "Découvrir l'offre",
    story: "Toute grande entreprise commence par une fondation solide. ACCESS pose les bases de votre présence digitale professionnelle, prête à évoluer vers l’intelligence artificielle.",
    order: 1
  },
  {
    id: "TERRA",
    name: "⚡ PORTE TERRA",
    price: "700 000 FCFA",
    subtitle: "L'Artisan Digital qui Pose les Fondations de Votre Empire",
    included: [
      "Site Internet Statique Pro",
      "Hébergement Web Haute Perf.",
      "1-5 Pages Conquérantes",
      "Nom de Domaine .com/.ai",
      "Fiko Commercial IA Basique",
      "Mini CRM Intégré",
      "Compte-Rendu Automatique",
      "Référencement SEO Basique",
      "Assistance 24h/24 Gardienne",
    ],
    cta: "ACTIVER MA FONDATION",
    story: "Votre empire s'étend. La base stable qui prépare votre ascension vers l'intelligence artificielle.",
    order: 2
  },
  {
    id: "MARS",
    name: "🛡️ PORTE MARS",
    price: "1 900 000 FCFA",
    subtitle: "Le Conquérant qui Domine Son Marché",
    included: [
      "Tout inclus Terra",
      "5-10 Pages Stratégiques",
      "Fiko Commercial IA Premium",
      "Tableau de Bord Dynamique",
      "Référencement Premium",
      "Assistance Prioritaire 24h/24",
      "Système Mailing Automatique",
      "Agent IA Métier Basique",
      "320% ROI (Performance)",
      "+45% Parts marché GAIN",
    ],
    cta: "<<LANCER MA CONQUÊTE>>",
    story: "Chaque matin, vous découvrez que votre armée IA a conquis de nouveaux territoires pendant la nuit. Votre tableau de bord devient votre centre de commandement interstellaire.",
    order: 3
  },
  {
    id: "KRYPTON",
    name: "👑 PORTE KRYPTON",
    price: "3 900 000 FCFA",
    subtitle: "Le Souverain dont la Légende Traverse les Systèmes",
    included: [
      "✅ Tout inclus Mars",
      "5-30 Pages Souveraines",
      "Fiko Super Commercial IA",
      "Fiko Super Closer IA Premium",
      "Tableau de Bord Avancé",
      "Seoly Cocon Semantic SEO",
      "Trillion AI ADS Basique",
      "Assistance Prioritaire 24h/24",
      "Agent IA Métier Premium",
      "375% ROI",
      "Leader Secteur GAIN",
    ],
    cta: "<<REVENDIQUER MON TRÔNE>>",
    story: "Vous n'êtes plus un simple mortel. Krypton fait de vous une légende vivante. Vos closers IA négocient comme des diplomates intergalactiques. Vos concurrents vous observent avec crainte et respect. Le trône digital vous attend.",
    order: 4
  },
  {
    id: "GALAXY",
    name: "🏛️ PORTE GALAXY",
    price: "SUR DEVIS",
    subtitle: "L'Architecte de Civilisations Digitales",
    included: [
      "Développement Sur Mesure",
      "Application Web Avancée",
      "Application Mobile Native",
      "Architecture Évolutive",
      "Solutions Personnalisées",
      "Équipe Dédiée Krypton",
      "Support Illimité 24h/24",
      "Votre Vision, Notre Expertise",
      "∞ ROI",
      "Héritage GAIN",
    ],
    cta: "<<CRÉER MA CIVILISATION>>",
    story: "Vous ne construisez plus un business, vous édifiez une civilisation. Galaxy est votre atelier d'ingénierie sociale. Votre héritage digital commence ici.",
    order: 5
  },
];

export const pricingCatalogService = {
  /**
   * Retrieves active plans either dynamically from Firestore or falls back securely to default catalog.
   */
  getPlans: async (): Promise<PricingCatalogPlan[]> => {
    try {
      const q = query(collection(db, "pricing_plans"), orderBy("order"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || doc.id,
            price: data.price || "Contactez-nous",
            subtitle: data.subtitle || "",
            included: data.included || [],
            cta: data.cta || "Sélectionner",
            story: data.story || "",
            order: data.order || 99
          } as PricingCatalogPlan;
        });
      }
    } catch (error) {
      console.warn("Could not query Firestore 'pricing_plans' collection, using local fallback catalog:", error);
    }
    return FALLBACK_PLANS;
  },

  /**
   * Smartly recommends the most appropriate plan based on business metrics
   */
  recommendPlan: (
    volumeProspects?: string,
    activitySector?: string,
    needs?: string
  ): { planId: string; planName: string; price: string; explanation: string } => {
    const vol = (volumeProspects || "").toLowerCase();
    const sec = (activitySector || "").toLowerCase();
    const nds = (needs || "").toLowerCase();

    // 1. Galaxy Trigger for extremely high volume or custom needs
    if (
      vol.includes("millions") ||
      vol.includes("millier") ||
      vol.includes("sur-mesure") ||
      vol.includes("personnalisé") ||
      nds.includes("sur mesure") ||
      nds.includes("multinationale") ||
      nds.includes("groupe")
    ) {
      return {
        planId: "GALAXY",
        planName: "🏛️ PORTE GALAXY",
        price: "Sur Devis",
        explanation: "Vos besoins hautement sur-mesure nécessitent une infrastructure de classe mondiale gérée par nos équipes d'ingénieurs dédiées."
      };
    }

    // 2. Krypton Trigger for established leaders & high-volume conversion (autoclose, multiple agents)
    if (
      vol.includes("100") ||
      vol.includes("200") ||
      vol.includes("beaucoup") ||
      vol.includes("surchargé") ||
      nds.includes("closer") ||
      nds.includes("autopilot") ||
      nds.includes("closing")
    ) {
      return {
        planId: "KRYPTON",
        planName: "👑 PORTE KRYPTON",
        price: "3 900 000 FCFA",
        explanation: "Le plan KRYPTON vous dote de Fiko Super Closer IA Premium en mode Autopilot total, idéal pour transformer un fort volume de messages sans recruter."
      };
    }

    // 3. Mars Plan for growing SMEs wanting serious AI commercial support (Fiko Premium)
    if (
      vol.includes("10") ||
      vol.includes("20") ||
      vol.includes("50") ||
      sec.includes("transport") ||
      sec.includes("immobilier") ||
      nds.includes("marketing") ||
      nds.includes("ventes")
    ) {
      return {
        planId: "MARS",
        planName: "🛡️ PORTE MARS",
        price: "1 900 000 FCFA",
        explanation: "Le plan MARS est le parfait conquérant pour dominer votre marché : il inclut Fiko Commercial IA Premium et un tableau de bord dynamique pour un ROI visé de 320%."
      };
    }

    // 4. Terra Plan for standard small business starting with AI and CRM integration
    if (
      vol.includes("faible") ||
      vol.includes("début") ||
      vol.includes("1") ||
      vol.includes("5") ||
      sec.includes("boutique") ||
      sec.includes("prêt-à-porter") ||
      sec.includes("artisan")
    ) {
      return {
        planId: "TERRA",
        planName: "⚡ PORTE TERRA",
        price: "700 000 FCFA",
        explanation: "Le plan TERRA est le choix de prédilection des boutiques et artisans pour poser les bases de leur empire avec Fiko Commercial IA de base et un mini CRM."
      };
    }

    // Default to Access for very low barriers or simple presence
    return {
      planId: "ACCESS",
      planName: "🎯 PORTE ACCESS",
      price: "200 000 FCFA",
      explanation: "Idéal pour poser une présence digitale professionnelle irréprochable avant de passer aux modules IA avancés."
    };
  }
};
