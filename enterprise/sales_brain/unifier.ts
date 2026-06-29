import { LiveEventBus } from '../integration/event_bus.js';

/**
 * Sales Brain Unifier™ (Module 03)
 * Enforces that all commercial decisions pass through a single orchestrator.
 */
export class SalesBrainUnifier {

  static initializeIntegration() {
    // Intercepts intent from any channel and forces routing through the Brain
    LiveEventBus.subscribe('LeadIntentDetected', async (payload) => {
      console.log(`🧠 SALES BRAIN: Orchestrating intent [${payload.data.intent}] from source [${payload.data.source}]`);

      // Forces logic here, preventing React components from deciding commercial logic
      if (payload.data.intent === 'PURCHASE') {
        LiveEventBus.publish('StateChanged', {
           ...payload,
           data: { newState: 'CLOSING' }
        });
      }
    });
  }
}
