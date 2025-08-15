const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const app = express();

// Example route
app.get('/', (req, res) => {
    res.send('Hello from server 🚀');
});

// Check environment
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    // -------- PRODUCTION: Use CA-issued SSL certificate --------
    const key = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
    const cert = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem', 'utf8');

    https.createServer({ key, cert }, app).listen(443, () => {
        console.log('✅ HTTPS server running on port 443');
    });

    // Redirect HTTP to HTTPS
    http.createServer((req, res) => {
        res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
        res.end();
    }).listen(80, () => {
        console.log('🔄 HTTP requests redirected to HTTPS');
    });

} else {
    // -------- DEVELOPMENT: Run simple HTTP server --------
    const PORT = 3000;
    http.createServer(app).listen(PORT, () => {
        console.log(`🛠 Development server running at http://localhost:${PORT}`);
        console.log(`💡 Tip: Set NODE_ENV=production to enable HTTPS`);
    });
}
