import { cities, businesses } from '../data/programmatic';

export interface ProgrammaticPageData {
  slug: string;
  title: string;
  description: string;
  h1: string;
  context: string;
  type: 'city' | 'business';
}

export function generateProgrammaticPages(): ProgrammaticPageData[] {
  const pages: ProgrammaticPageData[] = [];

  // Generation par ville
  cities.forEach(city => {
    pages.push({
      slug: `site-web-ia-${city.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Création de Site Web IA à ${city} | Krypton AI`,
      description: `Découvrez comment Krypton AI transforme les entreprises à ${city} avec des sites web intelligents et automatisés.`,
      h1: `L'Intelligence Artificielle au service de votre business à ${city}`,
      context: city,
      type: 'city'
    });
  });

  // Generation par métier
  businesses.forEach(business => {
    pages.push({
      slug: `site-web-ia-${business.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Site Web IA pour ${business} | Solution Krypton`,
      description: `Optimisez votre ${business} avec un site web intelligent capable de qualifier vos prospects automatiquement.`,
      h1: `Le futur du web pour les ${business}`,
      context: business,
      type: 'business'
    });
  });

  return pages;
}

export function getProgrammaticPage(slug: string): ProgrammaticPageData | undefined {
  return generateProgrammaticPages().find(p => p.slug === slug);
}
