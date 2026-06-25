export interface ModelRoute {
  modelName: string;
  reason: string;
}

/**
 * Multi-Model Router (Module 03)
 * Dynamically routes conversations based on context and input characteristics
 */
export const multiModelRouter = {
  routeMessage: (message: string, currentState: string): ModelRoute => {
    const msgLower = message.toLowerCase();
    
    // Complex objection, business strategy, pricing discussions or ROI calculations
    const requiresProModel = 
      msgLower.includes("cher") || 
      msgLower.includes("prix") || 
      msgLower.includes("tarif") || 
      msgLower.includes("investir") || 
      msgLower.includes("budget") || 
      msgLower.includes("calculer") || 
      msgLower.includes("roi") || 
      msgLower.includes("combien") || 
      msgLower.includes("stratégie") || 
      msgLower.includes("chiffre d'affaires") || 
      currentState === "OBJECTION" || 
      currentState === "PROJECTION";

    if (requiresProModel) {
      return {
        modelName: "gemini-3.1-pro-preview", // Complex analysis / objections handling
        reason: "Business analysis, pricing objections, or strategic calculations require deep reasoning (Gemini Pro)."
      };
    }

    // Default fast, low-latency conversation
    return {
      modelName: "gemini-3.5-flash", // Fast, low-latency standard conversation
      reason: "Standard conversation flow and discovery require high speed and low latency (Gemini Flash)."
    };
  }
};
