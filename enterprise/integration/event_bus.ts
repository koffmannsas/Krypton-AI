export interface EnterpriseEventPayload { correlationId: string; tenantId: string; leadId?: string; timestamp: string; version: string; data: Record<string, any>; }

export type EventCallback = (event: EnterpriseEventPayload) => Promise<void>;

/**
 * Live Event Bus™ (Module 08)
 * Centralizes communication between all KBOS engines (Pub/Sub pattern).
 */
export class LiveEventBus {
  private static subscribers: Record<string, EventCallback[]> = {};

  static subscribe(eventType: string, callback: EventCallback) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(callback);
    console.log(`🔌 EVENT BUS: Subscribed to [${eventType}]`);
  }

  static async publish(eventType: string, payload: EnterpriseEventPayload) {
    console.log(`🚀 EVENT BUS: Publishing [${eventType}] - Correlation ID: ${payload.correlationId}`);

    const callbacks = this.subscribers[eventType] || [];
    // Execute all subscribers concurrently
    await Promise.all(callbacks.map(cb => cb(payload)));
  }
}
