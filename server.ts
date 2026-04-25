import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { BLOG_POSTS } from "./data/blogPosts";
import { generateProgrammaticPages } from "./utils/programmaticEngine";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // SEO Middleware: Force Lowercase and Trailing Slash Removal
  app.use((req, res, next) => {
    // Skip for API and static files
    if (req.url.startsWith('/api') || req.url.includes('.')) {
      return next();
    }

    const url = req.url.split('?')[0];
    const query = req.url.split('?')[1] ? `?${req.url.split('?')[1]}` : '';

    // 🔥 enlever trailing slash
    if (url !== '/' && url.endsWith('/')) {
      return res.redirect(301, url.slice(0, -1) + query);
    }

    // 🔥 lowercase SEO
    if (url !== url.toLowerCase()) {
      return res.redirect(301, url.toLowerCase() + query);
    }

    // 🔥 redirection index.php
    if (url === '/index.php') {
      return res.redirect(301, '/' + query);
    }

    // 🔥 Specific legacy query redirect (/page?id=12 -> /tarifs)
    if (url === '/page' && req.query.id === '12') {
      return res.redirect(301, '/tarifs');
    }

    next();
  });

  // 301 Redirects Mapping
  const legacyRedirects: Record<string, string> = {
    '/pricing': '/tarifs',
    '/features': '/nos-agents',
    '/fonctionnalites': '/nos-agents',
    '/articles': '/blog',
    '/contact': '/fiko/audit', // Redirecting contact to audit for lead gen
  };

  app.get(Object.keys(legacyRedirects), (req, res) => {
    const target = legacyRedirects[req.path];
    if (target) {
      res.redirect(301, target);
    }
  });

  // Dynamic Sitemap
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://krypton-ia.tech";
    const staticPages = [
      "",
      "/tarifs",
      "/fonctionnalites",
      "/contact",
      "/fiko",
      "/viva-leads",
      "/nos-agents",
      "/voice-ia",
      "/crm-intelligent",
      "/data-scraper",
      "/seo-ia",
      "/blog",
      "/site-web-intelligent",
      "/agent-ia-automatisation",
      "/generation-leads-automatique"
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(path => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
${BLOG_POSTS.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n")}
${generateProgrammaticPages().map(page => `  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  // Dynamic Robots.txt
  app.get("/robots.txt", (req, res) => {
    const content = `User-agent: *
Allow: /
Sitemap: https://krypton-ia.tech/sitemap.xml`;
    res.header("Content-Type", "text/plain");
    res.send(content);
  });

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
