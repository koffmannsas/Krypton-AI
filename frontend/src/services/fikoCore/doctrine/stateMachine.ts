export type ConversationState =
  | "DISCOVERY"
  | "QUALIFICATION"
  | "ANALYSIS"
  | "PROJECTION"
  | "OBJECTION"
  | "CLOSING"
  | "ACTIVATION"
  | "FOLLOW-UP";

export interface StateDefinition {
  state: ConversationState;
  title: string;
  description: string;
  criteriaToAdvance: string[];
  systemFocusInstruction: string;
}

export interface FikoStateMachine {
  states: StateDefinition[];
  getNextState: (currentState: ConversationState, collectedData: any) => ConversationState;
}

export const fikoStateMachine: FikoStateMachine = {
  states: [
    {
      state: "DISCOVERY",
      title: "Découverte de l'Activité",
      description: "Identifier l'activité commerciale générale et le secteur géographique du prospect.",
      criteriaToAdvance: ["activitySector", "location"],
      systemFocusInstruction: "Accueillir chaleureusement et s'intéresser uniquement à l'activité de l'interlocuteur. Ne pas essayer de vendre."
    },
    {
      state: "QUALIFICATION",
      title: "Qualification des Volumes & Canaux",
      description: "Découvrir par quels canaux ils vendent et quel est leur volume de prospects ou ventes actuel.",
      criteriaToAdvance: ["salesChannel", "volumeProspects"],
      systemFocusInstruction: "Poser des questions sur l'acquisition de clients (ex: WhatsApp Business, site, pub). Récupérer des chiffres."
    },
    {
      state: "ANALYSIS",
      title: "Analyse des Points de Friction",
      description: "Identifier où ils perdent de l'argent et pourquoi ils ne répondent pas à tous leurs clients.",
      criteriaToAdvance: ["frictionPoint"],
      systemFocusInstruction: "Pointer du doigt la perte de clients en dehors des heures d'ouverture ou les délais de réponse trop longs."
    },
    {
      state: "PROJECTION",
      title: "Projection ROI & Gains",
      description: "Calculer et projeter les gains de chiffre d'affaires potentiels en FCFA grâce à Fiko Connect.",
      criteriaToAdvance: ["estimatedLossFCFA"],
      systemFocusInstruction: "Calculer les gains concrets. Dire par exemple: 'Avec Fiko, vous récupérez 40% de prospects supplémentaires, soit +300 000 FCFA/mois.'"
    },
    {
      state: "OBJECTION",
      title: "Traitement des Hésitations",
      description: "Traiter les doutes liés au prix, à la complexité, ou à l'effort d'intégration.",
      criteriaToAdvance: ["objectionsCleared"],
      systemFocusInstruction: "Écouter l'objection, faire preuve d'empathie, puis recentrer sur le coût de l'inaction et injecter un cas client (Boutique de Fatou)."
    },
    {
      state: "CLOSING",
      title: "Fermeture & Engagement",
      description: "Incitations à l'action concrètes et directes vers l'essai gratuit ou l'inscription.",
      criteriaToAdvance: ["closingAccepted"],
      systemFocusInstruction: "Proposer de lancer l'essai gratuit de 7 jours immédiatement sans carte bancaire pour voir les résultats en direct."
    },
    {
      state: "ACTIVATION",
      title: "Accompagnement à l'Activation",
      description: "Guider l'utilisateur pour connecter son premier canal dans le dashboard.",
      criteriaToAdvance: ["firstChannelConnected"],
      systemFocusInstruction: "Expliquer les étapes simples pour configurer Fiko Connect depuis le dashboard. Rassurer sur la rapidité."
    },
    {
      state: "FOLLOW-UP",
      title: "Relance & Suivi",
      description: "Maintenir le lien commercial post-échange ou relancer si le closing est en attente.",
      criteriaToAdvance: [],
      systemFocusInstruction: "Envoyer une synthèse chaleureuse avec les bénéfices clés identifiés et le lien d'accès."
    }
  ],

  getNextState: (currentState: ConversationState, collectedData: any): ConversationState => {
    switch (currentState) {
      case "DISCOVERY":
        if (collectedData.activitySector) {
          return "QUALIFICATION";
        }
        return "DISCOVERY";
      case "QUALIFICATION":
        if (collectedData.salesChannel || collectedData.volumeProspects) {
          return "ANALYSIS";
        }
        return "QUALIFICATION";
      case "ANALYSIS":
        if (collectedData.frictionPoint) {
          return "PROJECTION";
        }
        return "ANALYSIS";
      case "PROJECTION":
        if (collectedData.estimatedLossFCFA) {
          return "OBJECTION";
        }
        return "PROJECTION";
      case "OBJECTION":
        if (collectedData.objectionsCleared) {
          return "CLOSING";
        }
        return "OBJECTION";
      case "CLOSING":
        if (collectedData.closingAccepted) {
          return "ACTIVATION";
        }
        return "OBJECTION"; // Fallback to objection if they decline or hesitate
      case "ACTIVATION":
        if (collectedData.firstChannelConnected) {
          return "FOLLOW-UP";
        }
        return "ACTIVATION";
      default:
        return currentState;
    }
  }
};
