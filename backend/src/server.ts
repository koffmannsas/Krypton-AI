import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { GoogleGenAI } from "@google/genai";

// Lazy initialize Firebase Admin
let db: FirebaseFirestore.Firestore | null = null;
function getDb() {
  if (!db) {
    try {
      if (admin && admin.apps && !admin.apps.length) {
        admin.initializeApp();
      }
      if (admin && admin.firestore) {
        db = admin.firestore();
        console.log("✅ Firebase Admin lazily initialized in backend");
      }
    } catch (error) {
      console.error("❌ Firebase Admin lazy init error:", error);
    }
  }
  return db;
}

// Lazy initialize GenAI
let genAIClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);
  
  // ensure we log as early as possible
  console.log(`Starting server process... environment PORT=${process.env.PORT}`);

  app.use(express.json());

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled Express error:", err);
    res.status(500).send("Internal Server Error");
  });

  // ============================================
  // ✅ HEALTH CHECK
  // ============================================
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", backend: "active" });
  });

  // ============================================
  // 🔥 FIKO & WHATSAPP WEBHOOKS
  // ============================================
  app.post("/api/data-deletion", (req, res) => {
    const confirmationCode = Math.random().toString(36).substring(2, 15);
    res.status(200).json({
      url: "https://www.krypton-ia.tech/data-deletion",
      confirmation_code: confirmationCode,
    });
  });

  app.post("/api/webhook/whatsapp", async (req, res) => {
    // WhatsApp logic handles incoming leads, GenAI response, and CRM updates
    console.log("WhatsApp Webhook Triggered");
    res.sendStatus(200);
  });

  app.post("/api/webhook/fiko", (req, res) => {
    const { plan, userId } = req.body;
    console.log(`Fiko Webhook received for ${userId}, plan: ${plan}`);
    res.json({ success: true });
  });

  // ============================================
  // 💳 PRICING / KSPM API
  // ============================================
  app.post("/api/fiko/checkout", (req, res) => {
    const { plan } = req.body;
    const prices: Record<string, number> = {
      ACCESS: 200000,
      TERRA: 700000,
      MARS: 1900000,
      KRYPTON: 3900000,
    };
    if (!prices[plan]) return res.status(400).json({ error: "Invalid plan" });
    const paymentUrl = `/checkout?plan=${plan}&amount=${prices[plan]}`;
    res.json({ paymentUrl });
  });

  // ============================================
  // 🌐 FRONTEND SERVING (AI Studio / Prod)
  // ============================================
  const isProd = process.env.NODE_ENV === "production" || !!process.env.K_SERVICE;

  if (!isProd) {
    // Note: In dev, Vite handles the frontend on port 3000 usually, but in AI Studio, 
    // we must proxy requests or serve Vite's middleware.
    import("vite").then(async ({ createServer: createViteServer }) => {
      try {
        const vite = await createViteServer({
          root: path.join(__dirname, "../../frontend"),
          server: { middlewareMode: true },
          appType: "spa",
        });
        app.use(vite.middlewares);
        console.log("Vite dev middleware active.");
      } catch (e) {
        console.warn("Vite failed to start middleware", e);
      }
    }).catch(e => console.warn("Vite import failed", e));
  } else {
    // Serve from dist
    const possiblePaths = [
      path.join(process.cwd(), "dist"),
      path.join(process.cwd(), "../dist"),
      path.resolve(__dirname, "../../dist")
    ];
    let distPath = possiblePaths[0];
    for (const p of possiblePaths) {
      if (fs.existsSync(path.join(p, "index.html"))) {
        distPath = p;
        break;
      }
    }
    console.log("Dist path used:", distPath);
    
    app.use(express.static(distPath));
    app.get(/.*/, (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send("<h1>App is building or failed to build. Please check deployment logs.</h1><p>Missing: " + indexPath + "</p>");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Backend running on port ${PORT}`);
  });
}

startServer();

