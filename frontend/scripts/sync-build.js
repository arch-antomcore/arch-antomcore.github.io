const fs = require("fs");
const path = require("path");
const routeMeta = require("../src/data/routeMeta.json");

const source = path.resolve(__dirname, "..", "build");
const destination = path.resolve(__dirname, "..", "..", "build");
const docsDestination = path.resolve(__dirname, "..", "..", "docs");

const spaRoutes = Object.keys(routeMeta.routes).filter((route) => route !== "/");
const legacyRoutes = ["pacific-palm"];
const today = new Date().toISOString().slice(0, 10);

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.statSync(srcFile).isDirectory()) copyDir(srcFile, destFile);
    else fs.copyFileSync(srcFile, destFile);
  }
}

/* Bake per-route <title>, description, canonical and OG tags into each static
   entrypoint so crawlers and AI agents see the right metadata without JS. */
function renderRouteHtml(indexHtml, route) {
  const meta = routeMeta.routes[route];
  const home = routeMeta.routes["/"];
  const url = `${routeMeta.siteUrl}${route}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const robots = meta.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const swap = (html, pattern, replacement) => html.replace(pattern, replacement);
  let html = indexHtml;
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = swap(html, /(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
  html = swap(html, /(<meta name="title" content=")[^"]*(")/, `$1${title}$2`);
  html = swap(html, /(<meta name="robots" content=")[^"]*(")/, `$1${robots}$2`);
  html = swap(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = swap(html, /(<link rel="alternate" hreflang="pt-BR" href=")[^"]*(")/, `$1${url}$2`);
  html = swap(html, /(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${url}$2`);
  html = swap(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = swap(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  html = swap(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`);
  html = swap(html, /(<meta property="twitter:title" content=")[^"]*(")/, `$1${title}$2`);
  html = swap(html, /(<meta property="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
  // Home-only structured data blocks (FAQ) stay on the home entrypoint.
  const homeTitle = new RegExp(escapeRegExp(escapeHtml(home.title)), "g");
  html = html.replace(homeTitle, title);
  return html;
}

function createRouteEntrypoints(root) {
  const indexFile = path.join(root, "index.html");
  if (!fs.existsSync(indexFile)) throw new Error(`Build index not found: ${indexFile}`);
  const indexHtml = fs.readFileSync(indexFile, "utf8");

  for (const route of spaRoutes) {
    const routeDir = path.join(root, route.replace(/^\//, ""));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, "index.html"), renderRouteHtml(indexHtml, route));
  }
  for (const route of legacyRoutes) {
    const routeDir = path.join(root, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.copyFileSync(indexFile, path.join(routeDir, "index.html"));
  }
  fs.copyFileSync(indexFile, path.join(root, "404.html"));
}

function writeSitemap(root) {
  const priorities = { "/": "1.0", "/produto": "0.9", "/precos": "0.9", "/blog": "0.85", "/validacao": "0.85", "/arquitetura": "0.8", "/casos-de-uso": "0.8", "/sobre": "0.8" };
  const urls = Object.entries(routeMeta.routes)
    .filter(([, meta]) => !meta.noindex)
    .map(([route]) => {
      const loc = `${routeMeta.siteUrl}${route === "/" ? "/" : route}`;
      const changefreq = route === "/" || route === "/blog" ? "weekly" : "monthly";
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priorities[route] || "0.6"}</priority>\n  </url>`;
    });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(root, "sitemap.xml"), xml);
}

function writeLlmsFull(root) {
  const llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
  const updatesFile = path.join(root, "aether-updates-ai.md");
  const updates = fs.existsSync(updatesFile) ? fs.readFileSync(updatesFile, "utf8") : "";
  fs.writeFileSync(path.join(root, "llms-full.txt"), `${llms}\n\n---\n\n${updates}`);
}

if (!fs.existsSync(source)) throw new Error(`Build source not found: ${source}`);
if (fs.existsSync(destination)) fs.rmSync(destination, { recursive: true, force: true });
if (fs.existsSync(docsDestination)) fs.rmSync(docsDestination, { recursive: true, force: true });

copyDir(source, destination);
copyDir(source, docsDestination);
for (const root of [source, destination, docsDestination]) {
  createRouteEntrypoints(root);
  writeSitemap(root);
  writeLlmsFull(root);
}
