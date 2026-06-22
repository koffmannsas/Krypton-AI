import { BacklinkTask, BlogPost } from '../types';

const PLATFORMS = [
  'Medium',
  'LinkedIn',
  'Dev.to',
  'Hashnode',
  'Reddit'
];

/**
 * Génère des variantes de titres pour le guest posting
 */
export function generateGuestPostVariants(postTitle: string): string[] {
  return [
    `Guide complet : ${postTitle}`,
    `Pourquoi ${postTitle} change tout en 2026`,
    `Comment nous avons réussi avec ${postTitle}`,
    `L'envers du décor : ${postTitle}`,
    `Ce que personne ne vous dit sur ${postTitle}`
  ];
}

/**
 * Prépare les tâches de distribution pour un nouvel article
 */
export function prepareDistributionTasks(post: BlogPost): BacklinkTask[] {
  const variants = generateGuestPostVariants(post.title);
  
  return PLATFORMS.map((platform, i) => ({
    id: `${post.slug}-${platform.toLowerCase()}`,
    platform,
    targetUrl: `/blog/${post.slug}`,
    status: 'pending',
    variantTitle: variants[i % variants.length],
    createdAt: new Date().toISOString()
  }));
}

/**
 * Simule le tracking des domaines référents (Authority Engine)
 */
export function getSimulatedAuthority(totalPosts: number) {
  return {
    score: Math.min(100, 25 + (totalPosts * 2)),
    totalBacklinks: totalPosts * 8,
    referringDomains: Math.floor(totalPosts * 1.5),
    history: [
      { date: '2026-01', score: 10 },
      { date: '2026-02', score: 15 },
      { date: '2026-03', score: 22 },
      { date: '2026-04', score: 32 }
    ]
  };
}
