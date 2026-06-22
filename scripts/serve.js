const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const distPath = path.join(process.cwd(), "dist");

console.log(`Starting simple static server on port ${PORT}`);
console.log(`Serving dist from: ${distPath}`);

if (!fs.existsSync(distPath)) {
  console.error(`ERROR: ${distPath} does not exist! Please run build.`);
}

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distPath, req.url === "/" ? "index.html" : req.url);
  
  // Basic security, prevent directory traversal
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(distPath))) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  // Try to read the file
  fs.stat(filePath, (err, stats) => {
    // If not found, fallback to index.html for SPA
    if (err || !stats.isFile()) {
      filePath = path.join(distPath, "index.html");
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404);
          res.end("404 - Not Found. Have you built the app?");
        } else {
          res.writeHead(500);
          res.end("500 - Internal Error");
        }
      } else {
        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = MIME_TYPES[extname] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
