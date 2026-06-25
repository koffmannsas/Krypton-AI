import { GoogleGenAI, Type } from "@google/genai";
import { fikoPersonality } from "./doctrine/personality";
import { fikoSalesDoctrine } from "./doctrine/salesDoctrine";
import { fikoNegotiationRules } from "./doctrine/negotiationRules";
import { fikoTrustRules } from "./doctrine/trustRules";
import { fikoStateMachine, ConversationState } from "./doctrine/stateMachine";
import { memoryEngine, FikoUserMemory } from "./memoryEngine";
import { multiModelRouter } from "./multiModelRouter";
import { pricingCatalogService, PricingCatalogPlan } from "./pricingCatalogService";

/**
 * AI Gateway & Trust Layer (Module 02)
 * Orchestrates calls, compiles instructions, and manages conversational state
 */
export const aiGateway = {
  /**
   * Process an incoming message from a prospect
   */
  processMessage: async (
    userId: string, 
    userMessage: string
  ): Promise<{ reply: string; currentState: ConversationState; modelUsed: string; reason: string }> => {
    
    // 1. Load context and conversation history from Memory Engine
    const memory = await memoryEngine.getMemory(userId);
    const history = await memoryEngine.getConversationHistory(userId);

    // 2. Fetch the real, live Pricing Catalog and compute the perfect recommendation
    const activePlans = await pricingCatalogService.getPlans();
    const recommendation = pricingCatalogService.recommendPlan(
      memory.volumeProspects || userMessage,
      memory.activitySector,
      memory.frictionPoint
    );

    // 3. Determine appropriate model routing
    const route = multiModelRouter.routeMessage(userMessage, memory.currentState);
    
    // Check if Gemini API Key is available
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    
    let reply = "";
    let updatedVariables: Partial<FikoUserMemory> = {};
    let nextState = memory.currentState;

    if (apiKey && apiKey.trim() !== "") {
      try {
        // Initialize Gemini Client with named parameter and telemetry headers
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        // 3. Compile System Prompt with exact Dynamic Pricing and state boundaries
        const systemInstruction = aiGateway.compileSystemInstruction(memory, activePlans, recommendation);

        // Map historical messages for @google/genai format
        const contents = history.map(h => ({
          role: h.role === "model" ? "model" as const : "user" as const,
          parts: [{ text: h.text }]
        }));
        
        contents.push({
          role: "user" as const,
          parts: [{ text: userMessage }]
        });

        // Request structured JSON to extract state variables
        const response = await ai.models.generateContent({
          model: route.modelName,
          contents,
          config: {
            systemInstruction,
            temperature: 0.3,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: { 
                  type: Type.STRING, 
                  description: "La réponse de Fiko en français, chaleureuse, percutante, posture de Closer d'affaires. Très court (1-2 phrases)." 
                },
                detectedActivitySector: { type: Type.STRING, description: "Secteur d'activité détecté si mentionné (ex: transport, e-commerce, immobilier)." },
                detectedLocation: { type: Type.STRING, description: "Ville ou pays détecté si mentionné." },
                detectedSalesChannel: { type: Type.STRING, description: "Canal d'acquisition ou de vente mentionné (ex: whatsapp, facebook)." },
                detectedVolumeProspects: { type: Type.STRING, description: "Nombre estimé de prospects perdus ou de ventes quotidiennes." },
                detectedFrictionPoint: { type: Type.STRING, description: "Problème principal ou friction mentionnée (ex: temps de réponse, fermeture la nuit)." },
                estimatedLossFCFA: { type: Type.INTEGER, description: "Estimation financière de perte mensuelle calculée en FCFA s'il y a des chiffres." },
                objectionsCleared: { type: Type.BOOLEAN, description: "true si le prospect accepte les arguments de Fiko, comprend la valeur, ou demande comment tester." },
                closingAccepted: { type: Type.BOOLEAN, description: "true si le prospect accepte d'activer l'essai gratuit ou de réserver un rendez-vous commercial." }
              },
              required: ["reply"]
            }
          }
        });

        const resultJson = JSON.parse(response.text || "{}");
        reply = resultJson.reply || "Désolé, je me reconfigure. Reprenons sur notre portail principal.";

        // Extract variables identified by Gemini
        if (resultJson.detectedActivitySector) updatedVariables.activitySector = resultJson.detectedActivitySector;
        if (resultJson.detectedLocation) updatedVariables.location = resultJson.detectedLocation;
        if (resultJson.detectedSalesChannel) updatedVariables.salesChannel = resultJson.detectedSalesChannel;
        if (resultJson.detectedVolumeProspects) updatedVariables.volumeProspects = resultJson.detectedVolumeProspects;
        if (resultJson.detectedFrictionPoint) updatedVariables.frictionPoint = resultJson.detectedFrictionPoint;
        if (resultJson.estimatedLossFCFA) updatedVariables.estimatedLossFCFA = resultJson.estimatedLossFCFA;
        if (resultJson.objectionsCleared !== undefined) updatedVariables.objectionsCleared = resultJson.objectionsCleared;
        if (resultJson.closingAccepted !== undefined) updatedVariables.closingAccepted = resultJson.closingAccepted;

      } catch (err) {
        console.error("Gemini invocation failed, falling back to local rule engine:", err);
        // Fallback to local rule simulation if API call fails
        const localSim = aiGateway.localRuleEngine(userMessage, memory, activePlans, recommendation);
        reply = localSim.reply;
        updatedVariables = localSim.variables;
      }
    } else {
      // 4. Executing high-fidelity Local Rule Engine (when API Key is absent)
      const localSim = aiGateway.localRuleEngine(userMessage, memory, activePlans, recommendation);
      reply = localSim.reply;
      updatedVariables = localSim.variables;
    }

    // Determine state transition based on the State Machine
    const fullStateVariables = { ...memory, ...updatedVariables };
    nextState = fikoStateMachine.getNextState(memory.currentState, fullStateVariables);
    
    // Save state variables and current message log to Memory Engine
    const nextGoals = [...memory.businessGoals];
    if (fullStateVariables.activitySector && !nextGoals.includes(fullStateVariables.activitySector)) {
      nextGoals.push(fullStateVariables.activitySector);
    }
    
    const nextMemory: Partial<FikoUserMemory> = {
      ...updatedVariables,
      currentState: nextState,
      businessGoals: nextGoals,
      lastInteraction: new Date().toISOString()
    };

    // Persistent storage
    await memoryEngine.saveMemory(userId, nextMemory);
    await memoryEngine.saveMessage(userId, "user", userMessage);
    await memoryEngine.saveMessage(userId, "model", reply);

    // Update relationship trust score
    let trustDelta = 1;
    if (updatedVariables.objectionsCleared) trustDelta = 15;
    if (updatedVariables.closingAccepted) trustDelta = 25;
    await memoryEngine.updateRelationship(userId, trustDelta);

    return {
      reply,
      currentState: nextState,
      modelUsed: apiKey ? route.modelName : "Local Rule Engine (Fallback)",
      reason: route.reason
    };
  },

  /**
   * Compiles the dynamic system instructions for Gemini using dynamic plans
   */
  compileSystemInstruction: (
    memory: FikoUserMemory,
    activePlans: PricingCatalogPlan[],
    recommendation: { planId: string; planName: string; price: string; explanation: string }
  ): string => {
    const currentStateDef = fikoStateMachine.states.find(s => s.state === memory.currentState);
    
    const formattedPlansList = activePlans.map(p => {
      return `- Nom de l'offre : ${p.name} | Tarif : ${p.price} | Inclusions : ${p.included.slice(0, 4).join(", ")}`;
    }).join("\n");

    return `
      # IDENTITÉ IMMUABLE DE FIKO
      Nom : ${fikoPersonality.name}
      Rôle : ${fikoPersonality.role}
      Ton : ${fikoPersonality.tone}
      Directives comportementales : ${fikoPersonality.behavioralDirectives.join(" | ")}
      Mots interdits (Ne JAMAIS les utiliser) : ${fikoPersonality.vocabulary.bannedWords.join(", ")}
      Nuances culturelles / d'Abidjan acceptées : ${fikoPersonality.vocabulary.culturalNuances.join(", ")}

      # DOCTRINE COMMERCIALE DE KRYPTON AI
      Objectif final : ${fikoSalesDoctrine.coreObjective}
      Méthode : ${fikoSalesDoctrine.methodologyName}
      Gestion d'objections : ${fikoSalesDoctrine.objectionHandlingStrategy.steps.join(" \n ")}
      Formule Coût Inaction : ${fikoSalesDoctrine.objectionHandlingStrategy.costOfInactionFormula}

      # RÈGLES DE NÉGOCIATION TARIFAIRE DYNAMIQUES (Source of Truth : Pricing Catalog)
      Plans d'abonnements officiels Krypton AI :
      ${formattedPlansList}

      RECOMMANDATION DE PLAN CALCULÉE POUR CE PROSPECT :
      - Offre conseillée : ${recommendation.planName}
      - Tarif : ${recommendation.price}
      - Argumentaire de justification : ${recommendation.explanation}

      Directives strictes de défense des prix :
      - Ne jamais accorder de rabais sur les offres officielles.
      - Présenter la recommandation personnalisée ci-dessus (${recommendation.planName}) comme le meilleur rapport ROI pour l'activité du prospect.
      - ${fikoNegotiationRules.priceDefenseDirectives.join(" | ")}
      Alternative de secours : ${fikoNegotiationRules.negotiationFramework.freeTrialAlternative}

      # PREUVES DE CONFIANCE (TRUST ENGINE)
      Cas d'études de confiance en Afrique de l'Ouest :
      ${fikoTrustRules.caseStudies.map(cs => `- ${cs.clientName} (${cs.location}) : ${cs.problem} -> Solution : ${cs.solution} -> Résultat : ${cs.metricResult}`).join("\n")}

      # MACHINE À ÉTATS DE LA CONVERSATION
      État actuel : ${memory.currentState} (${currentStateDef?.title})
      Mission de cet état : ${currentStateDef?.description}
      Consigne de focus : ${currentStateDef?.systemFocusInstruction}

      # CONTEXTE PROSPECT MÉMORISÉ (MEMOIRES LONGUES)
      - Secteur d'activité : ${memory.activitySector || "Non identifié"}
      - Localisation : ${memory.location || "Non identifiée"}
      - Canaux de vente : ${memory.salesChannel || "Non identifié"}
      - Volume quotidien : ${memory.volumeProspects || "Non identifié"}
      - Friction : ${memory.frictionPoint || "Non identifiée"}
      - Perte mensuelle estimée : ${memory.estimatedLossFCFA ? memory.estimatedLossFCFA + " FCFA" : "Non calculée"}
      - Objections levées : ${memory.objectionsCleared ? "Oui" : "Non"}
      - Closing validé : ${memory.closingAccepted ? "Oui" : "Non"}

      # FORMAT DE SORTIE REQUIS
      Tu es un Closer d'affaires d'élite basé en Afrique. Tu dois renvoyer obligatoirement un objet JSON contenant :
      1. "reply" : Ta réponse directe au prospect (max 1-2 phrases percutantes, pas de jargon d'IA).
      2. Mettre à jour les variables détectées dans le message de l'utilisateur (activitySector, location, salesChannel, volumeProspects, frictionPoint, objectionsCleared, closingAccepted) si elles apparaissent.
    `;
  },

  /**
   * Local high-fidelity Rule Engine mimicking Fiko when API key is unavailable
   */
  localRuleEngine: (
    message: string, 
    memory: FikoUserMemory,
    activePlans: PricingCatalogPlan[],
    recommendation: { planId: string; planName: string; price: string; explanation: string }
  ): { reply: string; variables: Partial<FikoUserMemory> } => {
    const msgLower = message.toLowerCase();
    const variables: Partial<FikoUserMemory> = {};
    let reply = "";

    // 1. Keyword Extraction
    // Sector Detection
    if (msgLower.includes("transport") || msgLower.includes("livraison")) {
      variables.activitySector = "Transport";
    } else if (msgLower.includes("vetement") || msgLower.includes("boutique") || msgLower.includes("prêt") || msgLower.includes("habits") || msgLower.includes("robe")) {
      variables.activitySector = "Prêt-à-porter";
    } else if (msgLower.includes("immo") || msgLower.includes("maison") || msgLower.includes("terrain") || msgLower.includes("appartement")) {
      variables.activitySector = "Immobilier";
    }

    // Location Detection
    if (msgLower.includes("abidjan") || msgLower.includes("côte d'ivoire") || msgLower.includes("yopougon") || msgLower.includes("cocody")) {
      variables.location = "Abidjan, Côte d'Ivoire";
    } else if (msgLower.includes("dakar") || msgLower.includes("sénégal")) {
      variables.location = "Dakar, Sénégal";
    } else if (msgLower.includes("lomé") || msgLower.includes("togo")) {
      variables.location = "Lomé, Togo";
    }

    // Channels Detection
    if (msgLower.includes("whatsapp") || msgLower.includes("wa")) {
      variables.salesChannel = "WhatsApp Business";
    } else if (msgLower.includes("facebook") || msgLower.includes("fb") || msgLower.includes("insta") || msgLower.includes("réseau")) {
      variables.salesChannel = "Réseaux Sociaux";
    }

    // Objection Handling Detection
    const isPriceObjection = 
      msgLower.includes("cher") || 
      msgLower.includes("prix") || 
      msgLower.includes("tarif") || 
      msgLower.includes("moyen") || 
      msgLower.includes("combien") || 
      msgLower.includes("réduction") || 
      msgLower.includes("cadeau");

    if (isPriceObjection) {
      memory.currentState = "OBJECTION";
    }

    if (msgLower.includes("d'accord") || msgLower.includes("compris") || msgLower.includes("ok") || msgLower.includes("marche") || msgLower.includes("comment faire") || msgLower.includes("tester")) {
      if (memory.currentState === "OBJECTION") {
        variables.objectionsCleared = true;
      }
      if (memory.currentState === "CLOSING") {
        variables.closingAccepted = true;
      }
    }

    // 2. Draft Response based on exact State Machine constraints
    const state = memory.currentState;
    
    if (state === "DISCOVERY") {
      reply = "Ravi de vous compter parmi nous ! Je suis Fiko de Krypton AI. Dites-moi, quel est le secteur d'activité de votre entreprise et où êtes-vous basé exactement ?";
      if (variables.activitySector) {
        reply = `C'est un excellent domaine d'avenir. Pour votre entreprise dans le secteur ${variables.activitySector}, comment trouvez-vous vos prospects actuellement ? WhatsApp Business, réseaux sociaux ou bouche-à-oreille ?`;
      }
    } 
    else if (state === "QUALIFICATION") {
      reply = "Parfait. Et aujourd'hui, vous gérez combien de demandes de clients ou prospects par jour en moyenne ?";
      if (variables.salesChannel) {
        reply = `Le canal ${variables.salesChannel} est ultra-puissant en Afrique ! Et quel volume de messages ou de prospects recevez-vous chaque jour en moyenne ?`;
      }
    } 
    else if (state === "ANALYSIS") {
      reply = "C'est un volume très intéressant ! Mais dites-moi, quel est votre plus grand problème actuel ? Perdez-vous des ventes la nuit après la fermeture, ou par manque de temps pour répondre instantanément ?";
      variables.frictionPoint = "Perte de prospects hors horaires d'ouverture";
    } 
    else if (state === "PROJECTION") {
      const loss = 350000;
      variables.estimatedLossFCFA = loss;
      reply = `C'est une perte sèche ! Si vous ratez plusieurs clients par jour, cela représente environ ${loss.toLocaleString()} FCFA jetés par la fenêtre chaque mois. Fiko est justement là pour capturer 100% de ce chiffre d'affaires, 24h/24.`;
    } 
    else if (state === "OBJECTION") {
      reply = `Je comprends tout à fait l'enjeu budgétaire. Pour votre situation, notre grille officielle recommande le plan ${recommendation.planName} à ${recommendation.price}. Comme la Boutique de Fatou à Abidjan qui s'est rentabilisée en 3 semaines, Fiko s'autofinance par le chiffre d'affaires qu'il récupère. Commençons par l'essai gratuit de Fiko Connect ?`;
    } 
    else if (state === "CLOSING") {
      reply = `Excellent choix ! Commençons dès maintenant avec un essai gratuit de 7 jours de Fiko Connect, configuré sur l'offre ${recommendation.planName}. Pas de carte bancaire demandée, vous pourrez juger des ventes récupérées en direct. On l'active ?`;
    } 
    else if (state === "ACTIVATION") {
      reply = "Félicitations, votre espace Fiko Connect est créé ! Rendez-vous sur votre tableau de bord principal pour connecter votre premier numéro WhatsApp Business et lancer l'acquisition automatique !";
      variables.firstChannelConnected = "true";
    } 
    else {
      reply = "Ravi de vous revoir ! Fiko est prêt à propulser vos ventes à Abidjan et partout ailleurs. Commençons par configurer votre premier agent d'acquisition automatique.";
    }

    return { reply, variables };
  }
};
