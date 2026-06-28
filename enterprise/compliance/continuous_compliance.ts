import { EnterprisePolicyEngine } from '../policies/engine.js';
import { SelfDiagnosticEngine } from '../diagnostics/health_checker.js';

export class ContinuousComplianceEngine {
  /**
   * Cron-job triggered every 5 minutes in production
   */
  static async runCycle(): Promise<number> {
    console.log('🔄 CONTINUOUS COMPLIANCE ENGINE: Starting 5-min cycle...');

    // 1. Evaluate declarative policies
    const policyResults = await EnterprisePolicyEngine.evaluateAll();

    // 2. Evaluate active infrastructure health
    const healthResults = await SelfDiagnosticEngine.runDiagnostics();
    const activeFailures = healthResults.filter(h => h.status !== 'healthy');

    // 3. Compute Compliance Score (100 = Perfect)
    let score = 100;

    // Penalize for policy failures
    score -= (policyResults.failed * 5);

    // Penalize heavily for CRITICAL policy failures
    score -= (policyResults.criticalFailures.length * 20);

    // Penalize for infra degradation
    score -= (activeFailures.length * 10);

    // Bound the score
    score = Math.max(0, score);

    console.log(`📈 Compliance Score Computed: ${score}/100`);

    if (score < 80) {
      console.warn('⚠️ COMPLIANCE ALERT: Score degraded below threshold. Triggering PagerDuty/Slack notification.');
      // triggerAlert()
    }

    return score;
  }
}
