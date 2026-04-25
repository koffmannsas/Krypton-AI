import { Page } from './types';

export interface RouteConfig {
  path: string;
  enum: Page;
  title: string;
  description: string;
}

export const ROUTES: Record<Page, RouteConfig> = {
  [Page.HOME]: {
    path: '/',
    enum: Page.HOME,
    title: 'Krypton AI | Votre site web devient votre meilleur commercial',
    description: 'Transformez votre présence digitale en machine de guerre commerciale avec l\'intelligence artificielle Krypton.',
  },
  [Page.FIKO]: {
    path: '/fiko',
    enum: Page.FIKO,
    title: 'FIKO™ AI | L\'Intelligence de Closing Autonome',
    description: 'Découvrez FIKO™, l\'agent IA qui qualifie et close vos leads 24h/24 en toute autonomie.',
  },
  [Page.VIVA_LEADS]: {
    path: '/viva-leads',
    enum: Page.VIVA_LEADS,
    title: 'VIVA LEADS | Extraction & Qualification de Leads Massive',
    description: 'Accédez à des milliers de leads ultra-qualifiés chaque mois grâce à notre moteur de scraping et d\'analyse prédictive.',
  },
  [Page.AGENTS]: {
    path: '/nos-agents',
    enum: Page.AGENTS,
    title: 'Nos Agents IA | L\'Arsenal de Domination Digitale',
    description: 'Déployez une armée d\'agents spécialisés : SDR, Closer, SEOly Prime, DataScraper et plus encore.',
  },
  [Page.PRICING]: {
    path: '/tarifs',
    enum: Page.PRICING,
    title: 'Tarifs & Plans | Investissez dans votre Croissance',
    description: 'Découvrez nos offres Gate et Unités IA adaptées à votre ambition. De Terra à Galaxy.',
  },
  [Page.VOICE]: {
    path: '/voice-ia',
    enum: Page.VOICE,
    title: 'Voice IA | La révolution de la vente vocale',
    description: 'Agents vocaux ultra-réalistes qui appellent vos prospects et gèrent vos rendez-vous.',
  },
  [Page.CRM]: {
    path: '/crm-intelligent',
    enum: Page.CRM,
    title: 'CRM Intelligent | Le cerveau de vos ventes',
    description: 'Le premier CRM assisté par IA qui priorise vos actions de vente en temps réel.',
  },
  [Page.SCRAPER]: {
    path: '/data-scraper',
    enum: Page.SCRAPER,
    title: 'DataScraper | Intelligence de Marché en temps réel',
    description: 'Extrayez les données stratégiques de vos concurrents et de votre marché automatiquement.',
  },
  [Page.TRUST]: {
    path: '/confiance',
    enum: Page.TRUST,
    title: 'Infrastructures & Sécurité | La Forteresse Krypton',
    description: 'Découvrez pourquoi les leaders font confiance à Krypton AI pour leur infrastructure IA.',
  },
  [Page.SEO]: {
    path: '/seo-ia',
    enum: Page.SEO,
    title: 'SEO IA | Dominez les résultats Google',
    description: 'Propulsez votre site en première page grâce à nos algorithmes d\'optimisation sémantique.',
  },
  [Page.WHITEPAPER]: {
    path: '/whitepaper',
    enum: Page.WHITEPAPER,
    title: 'Livre Blanc | La stratégie de Domination Digitale',
    description: 'Téléchargez notre guide exclusif sur l\'intégration de l\'IA dans votre business.',
  },
  [Page.AUTH]: {
    path: '/connexion',
    enum: Page.AUTH,
    title: 'Connexion | Espace Membre Krypton',
    description: 'Accédez à votre centre de commandement Krypton AI.',
  },
  [Page.SIGNUP]: {
    path: '/inscription',
    enum: Page.SIGNUP,
    title: 'Inscription | Rejoignez l\'élite IA',
    description: 'Commencez votre conquête digitale dès aujourd\'hui.',
  },
  [Page.ADMIN_AUTH]: {
    path: '/admin/auth',
    enum: Page.ADMIN_AUTH,
    title: 'Admin Access | Krypton HQ',
    description: 'Accès sécurisé au quartier général administratif.',
  },
  [Page.CLIENT_DASHBOARD]: {
    path: '/dashboard',
    enum: Page.CLIENT_DASHBOARD,
    title: 'Dashboard | Votre Centre de Commandement',
    description: 'Pilotez votre croissance, vos leads et vos agents depuis une interface unique.',
  },
  [Page.ADMIN_DASHBOARD]: {
    path: '/admin',
    enum: Page.ADMIN_DASHBOARD,
    title: 'Admin Console | Krypton HQ Monitoring',
    description: 'Surveillance globale et gestion de l\'écosystème Krypton.',
  },
  [Page.FIKO_AUDIT]: {
    path: '/fiko/audit',
    enum: Page.FIKO_AUDIT,
    title: 'Audit Fiko™ | Analyse de votre potentiel',
    description: 'Laissez Fiko™ analyser votre business et vous proposer une stratégie de croissance.',
  },
  [Page.BILLING]: {
    path: '/facturation',
    enum: Page.BILLING,
    title: 'Facturation & Evolution',
    description: 'Gérez vos plans et vos paiements Krypton AI.',
  },
  [Page.PAYMENT]: {
    path: '/paiement',
    enum: Page.PAYMENT,
    title: 'Paiement Sécurisé',
    description: 'Finalisez votre accès à l\'écosystème Krypton.',
  },
  [Page.ACCESS_OFFER]: {
    path: '/offres/access',
    enum: Page.ACCESS_OFFER,
    title: 'Offre Access | Votre porte d\'entrée IA',
    description: 'Commencez modestement mais intelligemment.',
  },
  [Page.TERRA_OFFER]: {
    path: '/offres/terra',
    enum: Page.TERRA_OFFER,
    title: 'Offre Terra | La Fondation',
    description: 'Lancez votre business avec la puissance de la Terre.',
  },
  [Page.MARS_OFFER]: {
    path: '/offres/mars',
    enum: Page.MARS_OFFER,
    title: 'Offre Mars | L\'Accélération',
    description: 'Passez à la vitesse supérieure avec Mars.',
  },
  [Page.KRYPTON_OFFER]: {
    path: '/offres/krypton',
    enum: Page.KRYPTON_OFFER,
    title: 'Offre Krypton | La Puissance Ultime',
    description: 'Maîtrisez votre marché avec l\'offre signature.',
  },
  [Page.GALAXY_OFFER]: {
    path: '/offres/galaxy',
    enum: Page.GALAXY_OFFER,
    title: 'Offre Galaxy | Domination Totale',
    description: 'Rien ne vous arrête avec Galaxy.',
  },
  [Page.FIKO_SOLO_OFFER]: {
    path: '/fiko/solo',
    enum: Page.FIKO_SOLO_OFFER,
    title: 'Module Fiko™ Solo',
    description: 'Ajoutez Fiko™ à votre infrastructure existante.',
  },
  [Page.FIKO_PILOT_OFFER]: {
    path: '/fiko/pilot',
    enum: Page.FIKO_PILOT_OFFER,
    title: 'Module Fiko™ Pilot',
    description: 'Fiko™ en mode pilotage de croissance.',
  },
  [Page.FIKO_ELITE_OFFER]: {
    path: '/fiko/elite',
    enum: Page.FIKO_ELITE_OFFER,
    title: 'Module Fiko™ Elite',
    description: 'Le meilleur de Fiko™ pour votre closing.',
  },
  [Page.FIKO_EMPIRE_OFFER]: {
    path: '/fiko/empire',
    enum: Page.FIKO_EMPIRE_OFFER,
    title: 'Module Fiko™ Empire',
    description: 'Fiko™ à l\'échelle industrielle.',
  },
  [Page.CATEGORY]: {
    path: '/recherche/:slug',
    enum: Page.CATEGORY,
    title: 'Solutions IA pour %s',
    description: 'Optimisez votre business avec l\'intelligence artificielle pour %s.',
  },
  [Page.BLOG]: {
    path: '/blog',
    enum: Page.BLOG,
    title: 'Blog Krypton AI | Stratégies & Innovations IA',
    description: 'Restez à la pointe de l\'innovation avec nos analyses sur l\'IA, le marketing et la croissance digitale.',
  },
  [Page.PILLAR_SITE_WEB]: {
    path: '/site-web-intelligent',
    enum: Page.PILLAR_SITE_WEB,
    title: 'Site Web Intelligent | L\'Écosystème de Vente de Demain',
    description: 'Découvrez comment l\'IA transforme votre site vitrine en une machine de guerre commerciale ultra-performante.',
  },
  [Page.PILLAR_AGENTS_IA]: {
    path: '/agent-ia-automatisation',
    enum: Page.PILLAR_AGENTS_IA,
    title: 'Agents IA & Automatisation | Votre Armée Digitale',
    description: 'Automatisez vos processus et décuplez votre productivité grâce à nos agents spécialisés.',
  },
  [Page.PILLAR_ACQUISITION]: {
    path: '/generation-leads-automatique',
    enum: Page.PILLAR_ACQUISITION,
    title: 'Génération de Leads Automatique | Le Futur du Marketing',
    description: 'Ne cherchez plus vos clients, laissez notre IA les attirer et les qualifier pour vous.',
  },
};
