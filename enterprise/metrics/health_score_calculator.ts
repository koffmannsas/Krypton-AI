import { calculateFQI, FQIMetrics } from './fqi_calculator';

export interface EnterpriseHealthMetrics {
  architectureCompliance: number; // 0-100
  sreCompliance: number; // 0-100 (Uptime, Error Budget)
  financialPerformance: number; // 0-100 (MRR, CAC)
  clientSatisfaction: number; // 0-100
  governanceCompliance: number; // 0-100 (ADR, Market Lab)
  fqiMetrics: FQIMetrics;
}

export function calculateEnterpriseHealthScore(metrics: EnterpriseHealthMetrics): number {
  console.log('🌍 Calculating Enterprise Readiness Score...');

  const fqi = calculateFQI(metrics.fqiMetrics);

  // Weighting defined in docs/enterprise_os/ENTERPRISE_SCORE.md
  const score = (
    (metrics.architectureCompliance * 0.15) +
    (metrics.sreCompliance * 0.15) +
    (fqi * 0.20) +
    (metrics.financialPerformance * 0.20) +
    (metrics.clientSatisfaction * 0.15) +
    (metrics.governanceCompliance * 0.15)
  );

  console.log(`✅ Enterprise Health Score Computed: ${score.toFixed(2)}/100`);
  return score;
}
