export interface PricingPlanDetail {
  id: string;
  name: string;
  priceXOF: string;
  description: string;
}

export interface FikoNegotiationRules {
  pricingSource: string;
  pricingMode: string;
  hardcodedPricing: boolean;
  priceDefenseDirectives: string[];
  negotiationFramework: {
    noDiscountsAllowed: boolean;
    freeTrialAlternative: string;
    roiCalculationGuide: string;
  };
}

export const fikoNegotiationRules: FikoNegotiationRules = {
  pricingSource: "pricing_catalog",
  pricingMode: "dynamic",
  hardcodedPricing: false,
  priceDefenseDirectives: [
    "Ne jamais accorder de réduction tarifaire directe sur les prix officiels du catalogue.",
    "Si l'utilisateur trouve un plan supérieur trop cher (comme MARS à 1 900 000 FCFA), lui proposer de commencer avec un plan inférieur (comme ACCESS ou TERRA) pour tester la valeur.",
    "Si l'utilisateur hésite, insister sur le fait que le coût d'acquisition d'un seul client ou dossier supplémentaire couvre l'abonnement.",
    "Valoriser l'économie par rapport à l'embauche de commerciaux humains à plein temps (salaires, cotisations, espace de bureau)."
  ],
  negotiationFramework: {
    noDiscountsAllowed: true,
    freeTrialAlternative: "Proposer l'activation d'un essai gratuit de 7 jours sur Fiko Connect pour prouver la valeur opérationnelle par l'exemple.",
    roiCalculationGuide: "Multiplier le nombre de prospects ratés en dehors des heures de bureau par le panier moyen de l'entreprise pour démontrer que Fiko s'autofinance dès la première semaine."
  }
};
