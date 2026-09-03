// Static prerendering injects each route into the client build template.
// The browser receives complete HTML and can paint without waiting for JavaScript.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");

// Dynamic import requires a file URL on Windows.
const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
const template = readFileSync(resolve(dist, "index.html"), "utf-8");

const routes = [
  { url: "/", out: "index.html" },
  { url: "/termos", out: "termos/index.html" },
  { url: "/privacidade", out: "privacidade/index.html" },
];

for (const route of routes) {
  const appHtml = render(route.url);
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Template is missing <div id="root"></div> for prerendering.');
  }
  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const outPath = resolve(dist, route.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`prerendered ${route.url} -> dist/${route.out} (${(html.length / 1024).toFixed(1)} kB)`);
}

// The server bundle is temporary and exists only to generate static HTML.
rmSync(ssrDir, { recursive: true, force: true });
