/**
 * Génère public/sitemap.xml avant le build.
 *
 * Pourquoi ce script : /sitemap.xml est une route serveur, or le site est déployé sur
 * GitHub Pages, qui n'exécute aucun handler. Le prérendu ne suit que les liens et ne
 * trouve donc jamais cette route. Sans ce script, le sitemap servi en ligne est un
 * fichier statique qu'il faut penser à mettre à jour à la main, ce qui finit toujours
 * par être oublié (les articles publiés après le 26/07/2026 n'y figuraient plus).
 *
 * Le contenu vient de src/lib/sitemap.ts, partagé avec la route serveur : une seule
 * source de vérité, dérivée de BLOG_POSTS.
 */
import { build } from "esbuild";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const tmp = await mkdtemp(join(tmpdir(), "sitaly-sitemap-"));
const bundlePath = join(tmp, "sitemap.mjs");

try {
  await build({
    entryPoints: [join(root, "src/lib/sitemap.ts")],
    outfile: bundlePath,
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    alias: { "@": join(root, "src") },
  });

  const { buildSitemapXml, SITEMAP_ENTRIES } = await import(pathToFileURL(bundlePath).href);
  const xml = buildSitemapXml();
  const target = join(root, "public/sitemap.xml");

  const previous = await readFile(target, "utf8").catch(() => null);
  if (previous === xml) {
    console.log(`sitemap.xml déjà à jour (${SITEMAP_ENTRIES.length} URLs)`);
  } else {
    await writeFile(target, `${xml}\n`, "utf8");
    console.log(`sitemap.xml généré : ${SITEMAP_ENTRIES.length} URLs`);
  }
} finally {
  await rm(tmp, { recursive: true, force: true });
}
