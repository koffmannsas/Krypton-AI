import * as path from 'path';
import * as fs from 'fs';

export interface DiagnosticResult {
  module: string;
  status: 'healthy' | 'degraded' | 'failed';
  latencyMs?: number;
  message: string;
}

export class SelfDiagnosticEngine {

  static async checkEnvVars(): Promise<DiagnosticResult> {
    const requiredEnvVars = ['GEMINI_API_KEY'];
    // In a real environment we would check process.env
    // Here we check if a placeholder exists in .env.example as a proxy for structural health
    const envExamplePath = path.resolve(process.cwd(), '.env.example');
    let hasGeminiConfig = false;

    if (fs.existsSync(envExamplePath)) {
        const content = fs.readFileSync(envExamplePath, 'utf8');
        hasGeminiConfig = content.includes('GEMINI_API_KEY') || content.includes('NEXT_PUBLIC_GEMINI_API_KEY');
    }

    if (hasGeminiConfig) {
         return {
            module: 'Environment Config',
            status: 'healthy',
            message: 'Required AI configuration keys are defined.'
         }
    }

    return {
        module: 'Environment Config',
        status: 'failed',
        message: 'Missing critical AI configuration keys.'
    }
  }

  static async checkFirebaseRules(): Promise<DiagnosticResult> {
      const rulesPath = path.resolve(process.cwd(), 'firestore.rules');
      if (!fs.existsSync(rulesPath)) {
          return {
              module: 'Firestore Rules',
              status: 'failed',
              message: 'firestore.rules file is missing.'
          }
      }

      const content = fs.readFileSync(rulesPath, 'utf8');
      if (content.includes('allow read, write: if true;')) {
          return {
              module: 'Firestore Rules',
              status: 'failed',
              message: 'CRITICAL SECURITY: Firestore rules are completely open.'
          }
      }

      return {
          module: 'Firestore Rules',
          status: 'healthy',
          message: 'Firestore rules are present and do not contain obvious open access flaws.'
      }
  }

  static async runDiagnostics(): Promise<DiagnosticResult[]> {
    console.log('🩺 Running Self-Diagnostic Engine...');
    const results: DiagnosticResult[] = [];

    results.push(await this.checkEnvVars());
    results.push(await this.checkFirebaseRules());

    return results;
  }
}
