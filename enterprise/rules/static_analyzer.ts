import * as fs from 'fs';
import * as path from 'path';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory() && !filePath.includes('node_modules')) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

export function runStaticAnalysis() {
  console.log('🔍 RUNNING STATIC ANALYSIS ENGINE...');
  const dirsToScan = [
    path.resolve(process.cwd(), 'frontend/src/pages'),
    path.resolve(process.cwd(), 'frontend/src/components')
  ];

  let allFiles: string[] = [];
  dirsToScan.forEach(dir => {
      allFiles = getAllFiles(dir, allFiles);
  });

  const priceRegex = /(?:^|\s)(?:\d{1,3}(?:[.,]\d{3})+|\d+)\s?(FCFA|CFA|XOF|€|\$)(?:\s|$)/gi;
  let violations = 0;

  console.log(`Scanning ${allFiles.length} React components for business logic...`);

  for (const file of allFiles) {
      if (file.includes('pricingData.ts')) continue; // Legacy catalog

      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        if (priceRegex.test(line)) {
            console.error(`🚨 VIOLATION [Hardcoded Price]: ${file}:${index + 1}`);
            console.error(`   -> ${line.trim()}`);
            violations++;
        }
      });
  }

  if (violations > 0) {
    console.error(`❌ Static Analysis Failed: ${violations} business logic violations detected.`);
    process.exit(1);
  } else {
    console.log('✅ Static Analysis Passed: No hardcoded business strings detected in UI components.');
  }
}

if (require.main === module) {
  runStaticAnalysis();
}
