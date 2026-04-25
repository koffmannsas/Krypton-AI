/**
 * Moteur de génération de titres magnétiques pour Google Discover
 */
export function generateDiscoverTitles(topic: string): string[] {
  return [
    `L'IA remplace déjà 70% des commerciaux : comment ${topic} change la donne`,
    `Ce que personne ne vous dit sur ${topic} en 2026`,
    `Pourquoi 90% des entreprises ratent ${topic} (et comment faire mieux)`,
    `Comment cette PME a multiplié ses ventes par 3 grâce à ${topic}`,
    `L'innovation secrète derrière ${topic} qui affole le marché`,
    `ARRÊTEZ tout : ${topic} est en train de redéfinir votre business`,
  ];
}

/**
 * Analyse si un titre a un fort potentiel Discover (CTR théorique)
 */
export function getDiscoverScore(title: string): number {
  let score = 50;
  const powerWords = ['secret', 'personne', 'pourquoi', 'comment', 'révélé', 'choquant', 'immédiat', 'offert', 'gratuit', '2026', '!'];
  
  powerWords.forEach(word => {
    if (title.toLowerCase().includes(word)) score += 5;
  });

  if (title.length > 60 && title.length < 90) score += 10;
  if (title.includes(':')) score += 5;
  
  return Math.min(100, score);
}
