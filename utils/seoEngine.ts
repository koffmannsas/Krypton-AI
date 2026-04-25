import { BlogPost } from '../types';

/**
 * Moteur de maillage interne intelligent
 * Calcule la pertinence sémantique entre les pages pour injecter des liens contextuels
 */

export function getSmartInternalLinks(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  const links: BlogPost[] = [];

  // 1. Même cluster (Pertinence thématique forte)
  const sameCluster = allPosts.filter(
    p => p.cluster === currentPost.cluster && p.slug !== currentPost.slug
  );
  links.push(...sameCluster.slice(0, 2));

  // 2. Score sémantique par mots-clés
  const semanticMatches = allPosts
    .filter(p => !links.find(l => l.slug === p.slug) && p.slug !== currentPost.slug)
    .map(p => ({
      post: p,
      score: p.keywords.filter(k => currentPost.keywords.includes(k)).length
    }))
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0);

  links.push(...semanticMatches.slice(0, 1).map(m => m.post));

  return links;
}

/**
 * Injection automatique de liens dans le HTML
 */
export function injectSeoLinks(content: string, links: BlogPost[]): string {
  let updatedContent = content;

  links.forEach(link => {
    // On cherche le titre ou des mots clés du lien dans le texte
    const searchTerms = [link.title, ...link.keywords.slice(0, 2)];
    
    for (const term of searchTerms) {
      if (!term) continue;
      
      const regex = new RegExp(`(${term})`, 'i');
      // On ne remplace qu'une seule fois pour éviter le spam SEO
      if (updatedContent.includes(term) && !updatedContent.includes(`href="/blog/${link.slug}"`)) {
        updatedContent = updatedContent.replace(
          regex,
          `<a href="/blog/${link.slug}" class="text-[#FF2718] font-bold border-b border-[#FF2718]/30 hover:border-[#FF2718] transition-all">$1</a>`
        );
        break; // Un seul lien par article cible
      }
    }
  });

  return updatedContent;
}
