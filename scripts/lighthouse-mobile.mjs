/**
 * Lighthouse mobile sur le site construit : performance, LCP, CLS, INP (TBT en
 * secours, Lighthouse ne mesure pas l'INP en laboratoire).
 *
 * Pourquoi : SITA-31 vise CLS < 0,05 et un défilement sans saccade. WebKit ne
 * sait pas rapporter `layout-shift` ; seul Chrome le fait. Le navigateur est
 * donc lancé sans interface, avec un profil jetable et sans accès au trousseau
 * (consigne de Ted du 16/11 : sinon une fenêtre « Trousseau introuvable »
 * surgit sur son écran).
 *
 * Usage :
 *     npm run build
 *     node scripts/lighthouse-mobile.mjs --sortie=avant
 */
import { createRequire } from "node:module";
import { createReadStream, existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MODULES = process.env.LIGHTHOUSE_MODULES ?? "/Users/vidalozzi/sitaly/.paperclip/playwright/pw/node_modules";
const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const PAGES_PAR_DEFAUT = [
  "/",
  "/tarifs/",
  "/modeles/plombier/",
  "/creer-site-internet-artisan/",
  "/logiciel-devis-factures-artisan/",
];

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

/**
 * Les types que GitHub Pages renvoie compressés. Sans gzip ici, Lighthouse voit
 * 621 ko de JavaScript au lieu des ~170 ko reçus en production : sa simulation
 * réseau en déduit un LCP de 9 s que personne ne subit (relevé du 17/11/2026).
 */
const COMPRESSIBLE = /^(text\/|application\/(javascript|json|xml|manifest\+json)|image\/svg)/;

function servirDist(dist) {
  const serveur = createServer((req, res) => {
    const chemin = decodeURIComponent(req.url.split("?")[0]);
    let fichier = join(dist, chemin);
    if (chemin.endsWith("/")) fichier = join(fichier, "index.html");
    else if (!extname(fichier) && existsSync(join(fichier, "index.html")))
      fichier = join(fichier, "index.html");
    if (!existsSync(fichier) || !fichier.startsWith(dist)) {
      res.writeHead(404).end("introuvable");
      return;
    }
    const type = TYPES[extname(fichier)] ?? "application/octet-stream";
    const gzip =
      COMPRESSIBLE.test(type) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
    res.writeHead(200, {
      "content-type": type,
      "cache-control": "no-store",
      ...(gzip ? { "content-encoding": "gzip", vary: "accept-encoding" } : {}),
    });
    const flux = createReadStream(fichier);
    if (gzip) flux.pipe(createGzip()).pipe(res);
    else flux.pipe(res);
  });
  return new Promise((ok) => serveur.listen(0, "127.0.0.1", () => ok(serveur)));
}

async function main() {
  const argv = process.argv.slice(2);
  const sortie = (argv.find((a) => a.startsWith("--sortie=")) ?? "--sortie=avant").slice(9);
  const pagesArg = argv.find((a) => a.startsWith("--pages="));
  const pages = pagesArg ? pagesArg.slice(8).split(",").filter(Boolean) : PAGES_PAR_DEFAUT;
  const dist = join(racine, "dist/client");
  if (!existsSync(dist)) throw new Error("dist/client manquant : lance d'abord npm run build");
  if (!existsSync(CHROME)) throw new Error(`Chrome introuvable : ${CHROME}`);

  const require = createRequire(join(MODULES, "x.js"));
  const lighthouse = (await import(join(MODULES, "lighthouse/core/index.js"))).default;
  const chromeLauncher = require("chrome-launcher");

  const serveur = await servirDist(dist);
  const base = `http://127.0.0.1:${serveur.address().port}`;
  const profil = join(tmpdir(), `sitaly-lh-${Date.now()}`);
  await mkdir(profil, { recursive: true });

  /** Sans interface, profil jetable, pas de trousseau : la règle de Ted du 16/11. */
  const chrome = await chromeLauncher.launch({
    chromePath: CHROME,
    userDataDir: profil,
    chromeFlags: [
      "--headless=new",
      "--use-mock-keychain",
      "--password-store=basic",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
    ],
  });

  const resultats = [];
  try {
    for (const chemin of pages) {
      const { lhr } = await lighthouse(
        base + chemin,
        { port: chrome.port, output: "json", logLevel: "error" },
        null,
      );
      const a = lhr.audits;
      const r = {
        chemin,
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibilite: lhr.categories.accessibility
          ? Math.round(lhr.categories.accessibility.score * 100)
          : null,
        lcp: a["largest-contentful-paint"].numericValue,
        cls: a["cumulative-layout-shift"].numericValue,
        tbt: a["total-blocking-time"].numericValue,
        fcp: a["first-contentful-paint"].numericValue,
        si: a["speed-index"].numericValue,
        elementLcp:
          a["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.snippet ??
          null,
        sauts: (a["layout-shift-elements"]?.details?.items ?? []).map((i) => ({
          noeud: i.node?.snippet?.slice(0, 120) ?? null,
          score: i.score,
        })),
        octetsInutiles: {
          images: a["uses-responsive-images"]?.details?.overallSavingsBytes ?? 0,
          horsEcran: a["offscreen-images"]?.details?.overallSavingsBytes ?? 0,
          jsInutilise: a["unused-javascript"]?.details?.overallSavingsBytes ?? 0,
          cssInutilise: a["unused-css-rules"]?.details?.overallSavingsBytes ?? 0,
        },
      };
      resultats.push(r);
      console.log(
        `${chemin} → perf ${r.performance}, LCP ${Math.round(r.lcp)} ms, CLS ${r.cls.toFixed(3)}, TBT ${Math.round(r.tbt)} ms`,
      );
    }
  } finally {
    await chrome.kill();
    serveur.close();
    await rm(profil, { recursive: true, force: true });
  }

  const dossier = join(racine, "sitaly.fr-audit/mobile-scroll", sortie);
  await mkdir(dossier, { recursive: true });
  await writeFile(join(dossier, "lighthouse.json"), JSON.stringify(resultats, null, 2));

  const l = ["# Lighthouse mobile", "", "| Page | Perf. | LCP | CLS | TBT | FCP | Speed Index |", "| --- | --- | --- | --- | --- | --- | --- |"];
  for (const r of resultats)
    l.push(
      `| \`${r.chemin}\` | ${r.performance} | ${Math.round(r.lcp)} ms | ${r.cls.toFixed(3)} | ${Math.round(r.tbt)} ms | ${Math.round(r.fcp)} ms | ${Math.round(r.si)} ms |`,
    );
  l.push("");
  for (const r of resultats) {
    l.push(`## \`${r.chemin}\``);
    l.push("");
    if (r.elementLcp) l.push(`- Élément LCP : \`${r.elementLcp.slice(0, 160)}\``);
    if (r.sauts.length) {
      l.push("- Éléments qui sautent :");
      for (const s of r.sauts.slice(0, 5))
        l.push(`  - \`${s.noeud}\` (${s.score?.toFixed?.(4) ?? s.score})`);
    }
    l.push(
      `- Économies possibles : images ${Math.round(r.octetsInutiles.images / 1024)} ko, ` +
        `hors écran ${Math.round(r.octetsInutiles.horsEcran / 1024)} ko, ` +
        `JS inutilisé ${Math.round(r.octetsInutiles.jsInutilise / 1024)} ko, ` +
        `CSS inutilisé ${Math.round(r.octetsInutiles.cssInutilise / 1024)} ko`,
    );
    l.push("");
  }
  await writeFile(join(dossier, "lighthouse.md"), l.join("\n"));
  console.log(`\nRapport : sitaly.fr-audit/mobile-scroll/${sortie}/lighthouse.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
