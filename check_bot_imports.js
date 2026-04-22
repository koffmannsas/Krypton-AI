
import fs from 'fs';
import path from 'path';

const files = [
  './pages/home/HomePage.tsx',
  './components/Footer.tsx',
  './components/AIChatOverlay.tsx',
  './components/OrderModal.tsx',
  './components/GateAuthModal.tsx',
  './pages/whitepaper/WhitepaperPage.tsx',
  './pages/dashboard/ClientDashboardPage.tsx',
  './pages/dashboard/AdminDashboardPage.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('<Bot') && !content.match(/import.*Bot.*from 'lucide-react'|import.*Bot.*from "lucide-react"/s)) {
      console.log(`ERROR: ${file} uses <Bot but does not import it correctly.`);
    } else {
      console.log(`OK: ${file}`);
    }
  } else {
    console.log(`MISSING: ${file}`);
  }
});
