import { DoctrineImpactAnalyzer, DoctrineMetric } from '../intelligence/doctrine_impact.js';

export interface MarketExperiment {
  id: string;
  status: 'DRAFT' | 'RUNNING' | 'COMPLETED' | 'ROLLED_BACK';
  hypothesis: string;
  cohortAllocation: number; // 0.0 to 1.0 (e.g., 0.1 for 10%)
}

export class EnterpriseExperimentPlatform {

  static startExperiment(exp: MarketExperiment) {
    console.log(`🧪 MARKET LAB: Starting experiment [${exp.id}] with ${exp.cohortAllocation * 100}% allocation.`);
    // Actuates the AI Router to apply the variant doctrine
  }

  static evaluateExperiment(expId: string): 'PROMOTE' | 'ROLLBACK' | 'CONTINUE' {
    const metric = DoctrineImpactAnalyzer.evaluateArgument(expId);

    if (DoctrineImpactAnalyzer.isReadyForGeneralization(metric)) {
       console.log(`🚀 MARKET LAB: Experiment [${expId}] is statistically significant. Ready for promotion to validation.`);
       return 'PROMOTE';
    }

    if (metric.impactScore < 0 && metric.sampleSize > 100) {
       console.error(`🚨 MARKET LAB: Experiment [${expId}] degrades conversion. Automatic Rollback triggered.`);
       return 'ROLLBACK';
    }

    return 'CONTINUE';
  }
}
