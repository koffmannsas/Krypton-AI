import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes

  // 1. Fiko Pay Checkout
  app.post("/api/fiko/checkout", (req, res) => {
    const { plan } = req.body;

    const prices: Record<string, number> = {
      ACCESS: 200000,
      TERRA: 700000,
      MARS: 1900000,
      KRYPTON: 3900000,
    };

    if (!prices[plan]) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    // Mock Fiko Pay URL
    const paymentUrl = `/checkout?plan=${plan}&amount=${prices[plan]}`;

    res.json({ paymentUrl });
  });

  // 2. Admin Stats
  app.get("/api/admin/stats", (req, res) => {
    // Mock stats
    res.json({
      totalRevenue: 15000000,
      totalClients: 42,
    });
  });

  // 3. Webhook Fiko Pay (Mock Firebase Function)
  app.post("/api/webhook/fiko", (req, res) => {
    const { plan, userId, companyName } = req.body;

    // In a real app, this would:
    // 1. Verify webhook signature
    // 2. Create company in Firestore
    // 3. Create subscription
    // 4. Activate AI agents based on plan

    console.log(`Webhook received for ${userId}, plan: ${plan}`);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
