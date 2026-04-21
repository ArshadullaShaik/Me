import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');
const host = '127.0.0.1';
const port = 4173;

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

async function serveStaticFile(urlPath) {
  const cleanPath = decodeURIComponent((urlPath || '/').split('?')[0]);
  const relativePath = cleanPath === '/' ? '/index.html' : cleanPath;
  const filePath = path.join(distDir, relativePath);
  const normalizedPath = path.normalize(filePath);

  if (!normalizedPath.startsWith(distDir)) {
    return null;
  }

  try {
    const data = await fs.readFile(normalizedPath);
    return {
      data,
      contentType: getMimeType(normalizedPath),
    };
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const file = await serveStaticFile(req.url || '/');

  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }

  res.writeHead(200, { 'Content-Type': file.contentType });
  res.end(file.data);
});

async function prerenderHomePage() {
  await new Promise((resolve, reject) => {
    server.listen(port, host, () => resolve());
    server.once('error', reject);
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`http://${host}:${port}/`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });

    await page.waitForSelector('#root', { timeout: 15000 });
    await page.waitForFunction(() => {
      const root = document.querySelector('#root');
      return !!root && root.childElementCount > 0 && (root.textContent || '').trim().length > 0;
    }, { timeout: 45000 });

    // Give motion effects one frame to settle before snapshotting the HTML.
    await new Promise((resolve) => setTimeout(resolve, 100));

    const html = await page.content();
    await fs.writeFile(indexPath, `${html}\n`, 'utf8');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

prerenderHomePage().catch((error) => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
