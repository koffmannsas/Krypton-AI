import { Policies, PolicyDefinition } from './declarations.js';

export class EnterprisePolicyEngine {
  static async evaluateAll(): Promise<{ passed: number; failed: number; criticalFailures: PolicyDefinition[] }> {
    console.log(`🛡️ ENTERPRISE POLICY ENGINE: Evaluating ${Policies.length} policies...`);

    let passed = 0;
    let failed = 0;
    const criticalFailures: PolicyDefinition[] = [];

    for (const policy of Policies) {
      const isCompliant = await policy.evaluate();
      if (isCompliant) {
        passed++;
      } else {
        failed++;
        if (policy.criticality === 'CRITICAL' || policy.actionOnFailure === 'BLOCK_DEPLOYMENT') {
          criticalFailures.push(policy);
        }
      }
    }

    return { passed, failed, criticalFailures };
  }
}
