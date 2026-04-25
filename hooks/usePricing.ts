import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, setDoc, getDocs } from 'firebase/firestore';

export interface Plan {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  included: string[];
  color: string;
  cta: string;
  story: string;
  order: number;
}

export interface ComparisonFeature {
  name: string;
  access: string;
  terra: string;
  mars: string;
  krypton: string;
  galaxy: string;
  order: number;
}

const DEFAULT_PLANS: Plan[] = [
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
    color: "#a855f7",
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
    color: "#10b981",
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
    color: "#FF2718",
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
    color: "#3b82f6",
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
    color: "#f59e0b",
    cta: "<<CRÉER MA CIVILISATION>>",
    story: "Vous ne construisez plus un business, vous édifiez une civilisation. Galaxy est votre atelier d'ingénierie sociale. Votre héritage digital commence ici.",
    order: 5
  },
];

const DEFAULT_FEATURES: ComparisonFeature[] = [
  { name: "Site Web Professionnel", access: "✅", terra: "✅", mars: "✅", krypton: "✅", galaxy: "✅", order: 1 },
  { name: "Design Premium Responsive", access: "✅", terra: "✅", mars: "✅", krypton: "✅", galaxy: "✅", order: 2 },
  { name: "SEO de base", access: "✅", terra: "✅", mars: "✅", krypton: "✅", galaxy: "✅", order: 3 },
  { name: "Infrastructure évolutive", access: "✅", terra: "✅", mars: "✅", krypton: "✅", galaxy: "✅", order: 4 },
  { name: "Agent IA (FIKO)", access: "❌", terra: "Basique", mars: "Avancé", krypton: "Multi-agent", galaxy: "IA stratégique", order: 5 },
  { name: "Agent IA sectoriel", access: "❌", terra: "Option", mars: "✅", krypton: "✅", galaxy: "✅", order: 6 },
  { name: "Automatisation CRM", access: "❌", terra: "Basique", mars: "✅", krypton: "Avancée", galaxy: "Orchestrée", order: 7 },
  { name: "FIKO Voice", access: "❌", terra: "Option", mars: "Option", krypton: "✅ Inclus", galaxy: "Standard IA", order: 8 },
  { name: "Minutes vocales incluses", access: "❌", terra: "150 min", mars: "600 min", krypton: "1 000 min", galaxy: "Illimité encadré", order: 9 },
  { name: "Standard téléphonique IA", access: "❌", terra: "❌", mars: "Option", krypton: "✅", galaxy: "✅", order: 10 },
  { name: "Multi-agents spécialisés", access: "❌", terra: "❌", mars: "✅", krypton: "✅", galaxy: "✅", order: 11 },
  { name: "Intelligence décisionnelle", access: "❌", terra: "❌", mars: "❌", krypton: "Option", galaxy: "✅", order: 12 },
  { name: "Support prioritaire", access: "Standard", terra: "Standard", mars: "Prioritaire", krypton: "Premium", galaxy: "VIP", order: 13 },
  { name: "Maintenance (après 6 mois)", access: "10 %", terra: "10 %", mars: "10 %", krypton: "10 %", galaxy: "10 %", order: 14 },
];

export function usePricing() {
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
  const [features, setFeatures] = useState<ComparisonFeature[]>(DEFAULT_FEATURES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*
    const seedIfNeeded = async () => {
      const plansSnap = await getDocs(collection(db, 'pricing_plans'));
      if (plansSnap.empty) {
        for (const plan of DEFAULT_PLANS) {
          await setDoc(doc(db, 'pricing_plans', plan.id), plan);
        }
      }

      const featuresSnap = await getDocs(collection(db, 'pricing_features'));
      if (featuresSnap.empty) {
        for (const feature of DEFAULT_FEATURES) {
          await setDoc(doc(collection(db, 'pricing_features')), feature);
        }
      }
    };

    seedIfNeeded();
    */

    const qPlans = query(collection(db, 'pricing_plans'), orderBy('order'));
    const unsubscribePlans = onSnapshot(qPlans, (snapshot) => {
      const fetchedPlans = snapshot.docs.map(d => {
        const data = d.data() as Plan;
        return { ...data, id: data.id || d.id };
      });
      if (fetchedPlans.length > 0) setPlans(fetchedPlans);
      setLoading(false);
    });

    const qFeatures = query(collection(db, 'pricing_features'), orderBy('order'));
    const unsubscribeFeatures = onSnapshot(qFeatures, (snapshot) => {
      const fetchedFeatures = snapshot.docs.map(d => d.data() as ComparisonFeature);
      if (fetchedFeatures.length > 0) setFeatures(fetchedFeatures);
    });

    return () => {
      unsubscribePlans();
      unsubscribeFeatures();
    };
  }, []);

  return { plans, features, loading };
}
