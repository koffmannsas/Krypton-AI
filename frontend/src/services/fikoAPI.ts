import { aiGateway } from "./fikoCore/aiGateway";

export const sendToFiko = async (message: string) => {
  let userId = localStorage.getItem("fiko_user");

  if (!userId) {
    userId = "visitor_" + Date.now();
    localStorage.setItem("fiko_user", userId);
  }

  // Use the new, robust, and certifiable Fiko AI Gateway
  const result = await aiGateway.processMessage(userId, message);

  // Compute realistic scores and conversion probabilities based on current state
  let score = 30;
  let probability = 10;

  if (result.currentState === "QUALIFICATION") {
    score = 45;
    probability = 25;
  } else if (result.currentState === "ANALYSIS") {
    score = 60;
    probability = 45;
  } else if (result.currentState === "PROJECTION") {
    score = 75;
    probability = 65;
  } else if (result.currentState === "OBJECTION") {
    score = 80;
    probability = 75;
  } else if (result.currentState === "CLOSING") {
    score = 90;
    probability = 85;
  } else if (result.currentState === "ACTIVATION") {
    score = 98;
    probability = 95;
  }

  return {
    reply: result.reply,
    score,
    probability,
    currentState: result.currentState,
    modelUsed: result.modelUsed,
    reason: result.reason
  };
};

