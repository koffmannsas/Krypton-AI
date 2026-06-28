export interface FQIMetrics {
  stability: number; // 0-100
  latencyScore: number; // 0-100
  conversionRate: number; // 0-100
  memoryRetention: number; // 0-100
  recommendationQuality: number; // 0-100
}

export function calculateFQI(metrics: FQIMetrics): number {
  console.log('📊 Calculating Fiko Quality Index (FQI)...');

  // Weighting defined in operations/FIKO_QUALITY_INDEX.md
  const weight = 0.2;

  const fqi = (
    (metrics.stability * weight) +
    (metrics.latencyScore * weight) +
    (metrics.conversionRate * weight) +
    (metrics.memoryRetention * weight) +
    (metrics.recommendationQuality * weight)
  );

  console.log(`✅ FQI Computed: ${fqi.toFixed(2)}/100`);
  return fqi;
}
