import * as fs from 'fs';
import * as path from 'path';
import { EnterpriseRule, RuleResult } from './engine';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

export const noHardcodedPricingRule: EnterpriseRule = {
  name: 'No Hardcoded Pricing',
  description: 'Ensures no FCFA or specific pricing amounts are hardcoded in the frontend.',
  adrRef: 'CERBERUS-M06',
  execute: async (): Promise<RuleResult> => {
    const dirsToScan = [
      path.resolve(process.cwd(), 'frontend/src/pages'),
      path.resolve(process.cwd(), 'frontend/src/components')
    ];

    let allFiles: string[] = [];
    dirsToScan.forEach(dir => {
        allFiles = getAllFiles(dir, allFiles);
    });

    const priceRegex = /(?:^|\s)(?:\d{1,3}(?:[.,]\d{3})+|\d+)\s?(FCFA|CFA|XOF|€|\$)(?:\s|$)/gi;
    let foundHardcoded = false;
    let violatingFile = '';

    for (const file of allFiles) {
        if (file.includes('pricingData.ts')) continue; // Ignore the catalog itself

        const content = fs.readFileSync(file, 'utf8');
        if (priceRegex.test(content)) {
            foundHardcoded = true;
            violatingFile = file;
            break;
        }
    }

    if (foundHardcoded) {
       return { passed: false, message: `Hardcoded price detected in UI component: ${violatingFile}`, ruleName: 'No Hardcoded Pricing' };
    }

    return { passed: true, message: 'All pricing is dynamically loaded.', ruleName: 'No Hardcoded Pricing' };
  }
};
