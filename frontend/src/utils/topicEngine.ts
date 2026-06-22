import { Topic, TopicCoverage, BlogPost } from '../types';

/**
 * Génère automatiquement les titres nécessaires pour couvrir un topic à 100%
 */
export function generateRequiredClusterTitles(topic: string): string[] {
  return [
    `Qu'est-ce que ${topic} ?`,
    `Comment créer ${topic}`,
    `Pourquoi utiliser ${topic}`,
    `Prix de ${topic}`,
    `Exemples de ${topic}`,
    `${topic} vs alternatives`,
    `Erreurs avec ${topic}`,
    `Guide complet ${topic}`,
  ];
}

/**
 * Calcule la couverture SEO d'un topic basé sur les articles existants
 */
export function calculateTopicCoverage(topic: Topic, existingPosts: BlogPost[]): TopicCoverage {
  const required = topic.clusters.length > 0 ? topic.clusters : generateRequiredClusterTitles(topic.topic);
  
  // Normalisation pour comparaison simple
  const normalize = (s: string) => s.toLowerCase().trim();
  
  const covered = required.filter(r => 
    existingPosts.some(p => normalize(p.title).includes(normalize(topic.topic)) && normalize(p.title).includes(normalize(r.replace(topic.topic, '').trim())))
    || existingPosts.some(p => normalize(p.title).includes(normalize(r)))
  );

  const missing = required.filter(r => !covered.includes(r));
  const coverage = (covered.length / required.length) * 100;
  
  // Score d'autorité global
  const score = Math.min(100, covered.length * 5 + coverage);

  return {
    coverage,
    missing,
    score
  };
}

/**
 * Détermine le type d'intention de recherche
 */
export type SearchIntent = 'informational' | 'commercial' | 'transactional';

export function detectIntent(title: string): SearchIntent {
  const t = title.toLowerCase();
  if (t.includes('prix') || t.includes('acheter') || t.includes('tarif') || t.includes('commander')) return 'transactional';
  if (t.includes('vs') || t.includes('comparatif') || t.includes('meilleur') || t.includes('avis')) return 'commercial';
  return 'informational';
}
