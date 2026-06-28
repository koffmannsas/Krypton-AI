import * as fs from 'fs';
import * as path from 'path';

export interface RuleResult {
  passed: boolean;
  message: string;
  ruleName: string;
}

export interface EnterpriseRule {
  name: string;
  description: string;
  adrRef: string;
  execute: () => Promise<RuleResult>;
}

export class RuleEngine {
  private rules: EnterpriseRule[] = [];

  register(rule: EnterpriseRule) {
    this.rules.push(rule);
  }

  async runAll(): Promise<boolean> {
    console.log('🛡️ KCG ENTERPRISE RULE ENGINE: Executing validations...');
    let allPassed = true;

    for (const rule of this.rules) {
      const result = await rule.execute();
      if (!result.passed) {
        console.error(`❌ RULE FAILED: [${rule.name}] (Ref: ${rule.adrRef}) - ${result.message}`);
        allPassed = false;
      } else {
        console.log(`✅ RULE PASSED: [${rule.name}]`);
      }
    }

    return allPassed;
  }
}
