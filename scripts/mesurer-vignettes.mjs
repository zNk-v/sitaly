/**
 * Ce que l'accueil télécharge vraiment pour ses photos de métiers (SITA-32).
 *
 * Les six vignettes de « Familles » s'affichent dans un carré de 80 px. Ce
 * script joue la page dans WebKit (le moteur des navigateurs de l'iPhone),
 * descend jusqu'en bas pour déclencher le chargement différé, et compte les
 * octets reçus par /vitrine/metiers/. Le dist est servi en gzip, comme
 * Cloudflare le sert.
 *
 * Usage :
 *     npm run build
 *     node scripts/mesurer-vignettes.mjs --dist=dist/client
 *
 * Options :
 *     --dist=<chemin>      dossier servi (défaut : dist/client)
 *     --largeurs=390,320   largeurs d'écran à jouer
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MODULES =
  process.env.PLAYWRIGHT_MODULES ?? "/Users/vidalozzi/sitaly/.paperclip/playwright/pw/node_modules";
const { webkit } = createRequire(join(MODULES, "/"))("playwright");
// Le service de fond n'a pas le HOME de Ted : les navigateurs se disent absents.
process.env.PLAYWRIGHT_BROWSERS_PATH ||= "/Users/vidalozzi/Library/Caches/ms-playwright";

const option = (nom, defaut) =>
  process.argv.find((a) => a.startsWith(`--${nom}=`))?.split("=").slice(1).join("=") ?? defaut;

const dist = resolve(racine, option("dist", "dist/client"));
const largeurs = option("largeurs", "390,320").split(",").map(Number);
if (!existsSync(dist)) {
  console.error(`Dossier introuvable : ${dist}. Lance d'abord npm run build.`);
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};
/** Les images et les polices sont déjà compressées : les regzipper ne sert à rien. */
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg", ".xml", ".txt"]);

const serveur = createServer((req, res) => {
  const chemin = decodeURIComponent(req.url.split("?")[0]);
  let fichier = join(dist, chemin);
  if (!fichier.startsWith(dist)) return res.writeHead(403).end();
  if (existsSync(fichier) && statSync(fichier).isDirectory()) fichier = join(fichier, "index.html");
  if (!existsSync(fichier)) {
    fichier = join(dist, "404.html");
    if (!existsSync(fichier)) return res.writeHead(404).end();
    res.statusCode = 404;
  }
  const ext = extname(fichier);
  res.setHeader("Content-Type", TYPES[ext] ?? "application/octet-stream");
  if (COMPRESSIBLE.has(ext) && (req.headers["accept-encoding"] ?? "").includes("gzip")) {
    res.setHeader("Content-Encoding", "gzip");
    return createReadStream(fichier).pipe(createGzip()).pipe(res);
  }
  createReadStream(fichier).pipe(res);
});

await new Promise((ok) => serveur.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${serveur.address().port}`;

/** Sans interface, profil jetable, pas de trousseau : la règle de Ted du 16/11. */
const navigateur = await webkit.launch({ headless: true });

try {
  for (const largeur of largeurs) {
    const contexte = await navigateur.newContext({
      viewport: { width: largeur, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const page = await contexte.newPage();
    const recues = new Map();

    page.on("response", async (r) => {
      const url = new URL(r.url());
      if (!url.pathname.startsWith("/vitrine/metiers/")) return;
      const { responseBodySize } = await r.request().sizes().catch(() => ({ responseBodySize: 0 }));
      recues.set(url.pathname.replace("/vitrine/metiers/", ""), responseBodySize);
    });

    await page.goto(`${base}/`, { waitUntil: "load" });
    // Descendre par paliers : le chargement différé n'arme que ce qui approche.
    const hauteur = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= hauteur; y += 600) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(900);

    const lignes = [...recues.entries()].sort();
    const total = lignes.reduce((s, [, o]) => s + o, 0);
    console.log(`\n=== Accueil à ${largeur} px — /vitrine/metiers/ ===`);
    for (const [nom, octets] of lignes) console.log(`  ${nom.padEnd(32)} ${String(octets).padStart(7)} o`);
    console.log(`  ${"TOTAL".padEnd(32)} ${String(total).padStart(7)} o  (${lignes.length} fichiers)`);

    await contexte.close();
  }
} finally {
  await navigateur.close();
  serveur.close();
}
