const fs = require("fs");
const path = require("path");

const source = path.resolve(__dirname, "..", "build");
const destination = path.resolve(__dirname, "..", "..", "build");
const docsDestination = path.resolve(__dirname, "..", "..", "docs");
const spaRoutes = [
  "ecossistema",
  "produto",
  "precos",
  "arquitetura",
  "plugins",
  "casos-de-uso",
  "principios",
  "faq",
  "blog",
  "sustentabilidade",
  "sobre",
  "roadmap",
  "demo-glass",
  "dossie",
  "referencias",
  "privacidade"
];

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

function createRouteEntrypoints(root) {
  const indexFile = path.join(root, "index.html");

  if (!fs.existsSync(indexFile)) {
    throw new Error(`Build index not found: ${indexFile}`);
  }

  for (const route of spaRoutes) {
    const routeDir = path.join(root, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.copyFileSync(indexFile, path.join(routeDir, "index.html"));
  }

  fs.copyFileSync(indexFile, path.join(root, "404.html"));
}

if (!fs.existsSync(source)) {
  throw new Error(`Build source not found: ${source}`);
}

if (fs.existsSync(destination)) {
  fs.rmSync(destination, { recursive: true, force: true });
}

if (fs.existsSync(docsDestination)) {
  fs.rmSync(docsDestination, { recursive: true, force: true });
}

copyDir(source, destination);
copyDir(source, docsDestination);
createRouteEntrypoints(source);
createRouteEntrypoints(destination);
createRouteEntrypoints(docsDestination);
