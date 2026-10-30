/**
 * Contrôle des palettes de /site-premium/ avant le build (DESIGN.md §12).
 *
 * Les marques inventées ne doivent ni emprunter les couleurs de Sitaly (le
 * bleu, le violet et le rose de la triade, le vert signal), ni descendre sous
 * 4,5:1 entre un texte et son fond. Le script lit les palettes dans
 * src/data/premium.ts (bundle jetable, comme offres-json.mjs) et fait échouer
 * le build au premier écart. Les motifs posés derrière un texte se mesurent
 * sur le rendu, pas ici.
 */
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = await mkdtemp(join(tmpdir(), "sitaly-premium-"));
const bundlePath = join(tmp, "premium.mjs");

const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
function rgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}
function luminance(hex) {
  const [r, g, b] = rgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contraste(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
/** OKLCH depuis sRGB (Björn Ottosson). */
function oklch(hex) {
  const [r, g, b] = rgb(hex).map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { C, H };
}
const INTERDITES = [
  { de: 240, a: 310, nom: "bleu et violet de Sitaly" },
  // Le rose passe par 0 : 330 à 360, puis 0 à 8.
  { de: 330, a: 360, nom: "rose de Sitaly" },
  { de: 0, a: 8, nom: "rose de Sitaly" },
  { de: 145, a: 185, nom: "vert signal" },
];

try {
  await build({
    entryPoints: [join(root, "src/data/premium.ts")],
    outfile: bundlePath,
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    alias: { "@": join(root, "src") },
  });
  const { VITRINES_TOUTES } = await import(pathToFileURL(bundlePath).href);
  const erreurs = [];
  for (const v of VITRINES_TOUTES) {
    const p = v.palette;
    for (const [nom, hex] of Object.entries(p)) {
      const { C, H } = oklch(hex);
      for (const z of INTERDITES) {
        if (C > 0.06 && H >= z.de && H <= z.a)
          erreurs.push(
            `${v.id} : ${nom} ${hex} entre dans le ${z.nom} (teinte ${H.toFixed(0)}, chroma ${C.toFixed(3)})`,
          );
      }
    }
    for (const [texte, fond, seuil] of [
      ["encre", "fond", 4.5],
      ["doux", "fond", 4.5],
      ["sur", "accent", 4.5],
    ]) {
      const r = contraste(p[texte], p[fond]);
      if (r < seuil)
        erreurs.push(`${v.id} : ${texte} sur ${fond} à ${r.toFixed(2)}:1, sous ${seuil}:1`);
    }
  }
  if (erreurs.length) {
    console.error(`verifier-premium : ${erreurs.length} écart(s)\n  ${erreurs.join("\n  ")}`);
    process.exitCode = 1;
  } else {
    console.log(`verifier-premium : ${VITRINES_TOUTES.length} palettes conformes`);
  }
} finally {
  await rm(tmp, { recursive: true, force: true });
}
