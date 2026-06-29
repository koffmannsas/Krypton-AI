import { LiveEventBus } from '../integration/event_bus.js';

export interface Playbook {
  id: string;
  name: string;
  triggerEvent: string;
  steps: string[];
  version: string;
}

/**
 * Playbook Engine™ (Module 07)
 * Actively executes playbooks triggered by the Event Bus.
 */
export class PlaybookEngine {

  static initializeIntegration() {
    LiveEventBus.subscribe('StateChanged', async (payload) => {
       if (payload.data.newState === 'INACTIVE_7_DAYS') {
          console.log(`📖 PLAYBOOK ENGINE: Triggering reactivation playbook for [${payload.leadId}]`);
          // Execute steps
          LiveEventBus.publish('PlaybookExecuted', { ...payload, data: { playbookId: 'pb_reactivation' }});
       }
    });
  }

  static getPlaybook(name: string): Playbook {
    return {
      id: `pb_${name.toLowerCase()}`,
      name,
      triggerEvent: 'INACTIVE_7_DAYS',
      steps: [
        'Envoyer message WhatsApp de prise de nouvelles',
        'Si réponse, qualifier le nouveau frein',
        'Si pas de réponse, envoyer email avec étude de cas ROI'
      ],
      version: '1.2.0'
    };
  }
}
