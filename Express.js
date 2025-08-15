// express.js
// Run: node express.js
// Tips:
// - Put your mkcert files here: ./cert/localhost.pem and ./cert/localhost-key.pem
//   (or set env vars SSL_CRT_FILE / SSL_KEY_FILE to custom paths)
// - Default HTTPS port is 3443 so it won't clash with CRA dev server on 3000.

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');

const app = express();

/* ---------- Config ---------- */
const PORT = Number(process.env.PORT) || 3443;
const HTTP_PORT = Number(process.env.HTTP_PORT) || 3080; // used for HTTP→HTTPS redirect (optional)

const SSL_CRT_FILE =
  process.env.SSL_CRT_FILE ||
  path.join(__dirname, 'cert', 'localhost.pem'); // you can also generate dif.local.pem
const SSL_KEY_FILE =
  process.env.SSL_KEY_FILE ||
  path.join(__dirname, 'cert', 'localhost-key.pem');

const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://dif.local:3000',
  'https://dif.local:3000',
  process.env.FRONTEND_ORIGIN || ''
].filter(Boolean);

/* ---------- Middleware ---------- */
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

/* ---------- Sample API routes ---------- */
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'dif-backend', time: new Date().toISOString() });
});

app.get('/api/products', (_req, res) => {
  // mock data; replace with your DB/service
  res.json([
    { id: 1, name: 'Orange Sneakers', price: 59.99, image: '/img/shoe.jpg' },
    { id: 2, name: 'Wireless Headphones', price: 89.0, image: '/img/headphones.jpg' },
    { id: 3, name: 'Smart Watch', price: 129.0, image: '/img/watch.jpg' }
  ]);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  // super basic mock auth
  if (email && password) {
    return res.json({ success: true, token: 'fake-jwt-123', user: { email } });
  }
  res.status(400).json({ success: false, message: 'email and password required' });
});

/* ---------- Serve CRA build in production (optional) ---------- */
// 1) Run: npm run build (in your React app) to create /build
// 2) Start this server with NODE_ENV=production
if (process.env.NODE_ENV === 'production') {
  const buildDir = path.join(__dirname, 'build');
  if (fs.existsSync(buildDir)) {
    app.use(express.static(buildDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(buildDir, 'index.html'));
    });
  }
}

/* ---------- HTTPS (with optional HTTP→HTTPS redirect) ---------- */
function startHttps() {
  const hasKey = fs.existsSync(SSL_KEY_FILE);
  const hasCert = fs.existsSync(SSL_CRT_FILE);

  if (!hasKey || !hasCert) {
    console.warn(
      `\n⚠️  SSL files not found.\n` +
        `Expected:\n  KEY:  ${SSL_KEY_FILE}\n  CERT: ${SSL_CRT_FILE}\n` +
        `Starting HTTP only on port ${PORT}… (set SSL_CRT_FILE/SSL_KEY_FILE to enable HTTPS)\n`
    );
    http.createServer(app).listen(PORT, () => {
      console.log(`🌐 HTTP server running at http://localhost:${PORT}`);
    });
    return;
  }

  const key = fs.readFileSync(SSL_KEY_FILE);
  const cert = fs.readFileSync(SSL_CRT_FILE);

  // Main HTTPS server
  https.createServer({ key, cert }, app).listen(PORT, () => {
    console.log(`🔐 HTTPS server running at https://localhost:${PORT}`);
    console.log(`   Allowed CORS origins: ${allowedOrigins.join(', ') || '(none set)'}`);
  });

  // Optional: tiny HTTP redirector → HTTPS
  http
    .createServer((req, res) => {
      const host = req.headers.host || `localhost:${PORT}`;
      const redirectURL = `https://${host.replace(/:\d+$/, `:${PORT}`)}${req.url}`;
      res.writeHead(301, { Location: redirectURL });
      res.end();
    })
    .listen(HTTP_PORT, () => {
      console.log(`↪️  HTTP redirector listening on http://localhost:${HTTP_PORT} → HTTPS ${PORT}`);
    });
}

startHttps();
