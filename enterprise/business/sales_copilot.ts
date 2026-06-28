/**
 * Sales Copilot™ (Module 04)
 * Augments the human sales rep rather than replacing them.
 */
export class SalesCopilot {
  static suggestNextAction(leadId: string, currentStage: string): string {
    console.log(`🤖 SALES COPILOT: Generating recommendation for Lead [${leadId}] at stage [${currentStage}]`);

    if (currentStage === 'NEGOTIATION') {
      return "Suggestion: Le prospect a mentionné la concurrence. Utilisez le Playbook de Différenciation (Focus sur l'intégration WhatsApp). Ne baissez pas le prix.";
    }

    return "Suggestion: Relance téléphonique recommandée dans 24h.";
  }
}
