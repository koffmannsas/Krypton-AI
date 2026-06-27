import fs from 'fs';
import path from 'path';

// SUPER BASIC ARCHITECTURE GUARD
// Ensures key files/modules are present and haven't been deleted or moved.

const CRITICAL_FILES = [
  'frontend/src/components/FikoAIEngine.ts',
  'backend/src/server.ts',
  'firestore.rules',
  'utils/VisitorMemory.ts',
];

export function checkArchitectureCompliance() {
  console.log('🛡️ KCG CLOUD VERIFIED: Running Architecture Compliance Check...');
  let hasErrors = false;

  CRITICAL_FILES.forEach(filePath => {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ REGRESSION DETECTED: Critical file missing: ${filePath}`);
      hasErrors = true;
    } else {
      console.log(`✅ ${filePath} is intact.`);
    }
  });

  if (hasErrors) {
    console.error('🚫 FUSION INTERDITE: Architecture constraints violated.');
    process.exit(1);
  } else {
    console.log('✅ Architecture Compliance Passed.');
  }
}

if (require.main === module) {
  checkArchitectureCompliance();
}
