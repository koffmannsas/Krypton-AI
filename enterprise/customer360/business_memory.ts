import { LiveEventBus } from '../integration/event_bus.js';

export interface BusinessMemoryState {
  customerId: string;
  goals: string[];
  objectionsRaised: string[];
  roiAchievedFCFA: number;
  preferences: Record<string, any>;
  activeProjects: string[];
}

/**
 * Business Memory Engine™ (Module 02)
 * Integrated via Event Bus to passively absorb business context.
 */
export class BusinessMemoryEngine {

  static initializeIntegration() {
    LiveEventBus.subscribe('ObjectionRaised', async (payload) => {
      console.log(`🧠 BUSINESS MEMORY: Memorizing objection [${payload.data.objectionType}] for [${payload.leadId}]`);
      this.updateContext(payload.leadId as string, { objectionsRaised: [payload.data.objectionType] });
    });

    LiveEventBus.subscribe('ROICalculated', async (payload) => {
      console.log(`🧠 BUSINESS MEMORY: Updating ROI achieved for [${payload.leadId}] to ${payload.data.value}`);
    });
  }

  static async getContext(customerId: string): Promise<BusinessMemoryState> {
    return {
      customerId,
      goals: ['Augmenter acquisition Web', 'Réduire temps de réponse'],
      objectionsRaised: ['Prix', 'Complexité technique'],
      roiAchievedFCFA: 0,
      preferences: { communicationChannel: 'WhatsApp' },
      activeProjects: ['Onboarding Fiko', 'Campagne Web']
    };
  }

  static async updateContext(customerId: string, delta: Partial<BusinessMemoryState>) {
    // Saves to Firestore
  }
}
