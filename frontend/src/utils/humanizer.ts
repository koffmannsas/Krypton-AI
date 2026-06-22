/**
 * Moteur d'humanisation de contenu IA pour Krypton AI
 * L'objectif est d'améliorer la qualité perçue, l'engagement et la conversion.
 */

export function humanizeContent(text: string): string {
  let humanized = text;

  // 1. Rythme & Aération : Casser les gros blocs de texte
  humanized = humanized.replace(/\. /g, '.\n\n');

  // 2. Transitions Naturelles
  const transitions = [
    { target: /^/, replacement: "Aujourd’hui, " },
    { target: /Il est important de/gi, replacement: "Concrètement," },
    { target: /Il est nécessaire de/gi, replacement: "L'idée, c'est de" },
    { target: /permet d'automatiser/gi, replacement: "va travailler pour vous en automatisant" }
  ];

  transitions.forEach(t => {
    humanized = humanized.replace(t.target, t.replacement);
  });

  // 3. Projection Utilisateur
  humanized = humanized.replace(/vous pouvez/gi, "vous allez pouvoir");
  humanized = humanized.replace(/votre entreprise/gi, "votre business");

  // 4. Ajout de personnalité (Fin de paragraphe)
  const paragraphBreaks = humanized.split('\n\n');
  if (paragraphBreaks.length > 1) {
    paragraphBreaks[0] = paragraphBreaks[0] + " — et c’est exactement là que la différence se fait.";
  }
  
  return paragraphBreaks.join('\n\n');
}

/**
 * Injection de contexte réel pour renforcer la crédibilité
 */
export function injectContext(text: string, context: string): string {
  return `${text}\n\nDans un contexte comme ${context}, cette approche devient encore plus puissante car elle répond à des problématiques de terrain réelles.`;
}

/**
 * Applique la structure HOOK -> PROBLEM -> REALITY -> SOLUTION -> PROJECTION
 */
export function applyHumanStructure(hook: string, problem: string, reality: string, solution: string, projection: string): string {
  return `
${hook}

${problem}

Dans la réalité, ${reality}

C'est ici que notre solution intervient : ${solution}

D'ici 30 jours, ${projection}
  `.trim();
}
