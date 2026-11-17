/**
 * Preuve qu'une coupure de paragraphe ne change pas un seul mot.
 *
 * Couper un paragraphe de dix lignes en deux ou trois blocs améliore la
 * lecture sur téléphone, mais touche à des textes que Ted a validés. Ce script
 * lit le site prérendu (dist/client), en extrait le texte visible de chaque
 * page, normalise les espaces — un retour de paragraphe devient une espace —
 * et le compare mot à mot à un relevé pris avant la coupure. Si un mot change,
 * d'un côté ou de l'autre, il sort en erreur.
 *
 * Deux temps, à lancer chacun après `npm run build` :
 *
 *   node scripts/verifier-texte-guides.mjs --enregistrer=<fichier.json>
 *   node scripts/verifier-texte-guides.mjs --comparer=<fichier.json>
 *
 * Pages par défaut : les deux pages piliers. `--pages=/a/,/b/` pour d'autres.
 * `--long=300` signale au passage les paragraphes qui dépassent 300 signes.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(racine, "dist/client");

const PAGES_DEFAUT = ["/creer-site-internet-artisan/", "/logiciel-devis-factures-artisan/"];

const option = (nom) => {
  const trouve = process.argv.find((a) => a.startsWith(`--${nom}=`));
  return trouve ? trouve.slice(nom.length + 3) : null;
};

const aEnregistrer = option("enregistrer");
const aComparer = option("comparer");
const pages = (option("pages") ?? PAGES_DEFAUT.join(",")).split(",").filter(Boolean);
const seuilLong = Number(option("long") ?? 300);

if (!aEnregistrer === !aComparer) {
  console.error("verifier-texte-guides : passez --enregistrer=<fichier> ou --comparer=<fichier>.");
  process.exit(1);
}

if (!existsSync(dist)) {
  console.error("verifier-texte-guides : dist/client est absent. Lancez d'abord npm run build.");
  process.exit(1);
}

/* ---------------------------------------------------------------------------
   Du HTML au texte
   --------------------------------------------------------------------------- */

const ENTITES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/** Décode les entités d'un HTML que nous produisons nous-mêmes. */
const decoder = (texte) =>
  texte
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (t, nom) => ENTITES[nom.toLowerCase()] ?? t);

/**
 * Le texte visible d'une page, espaces normalisés. Chaque balise devient une
 * espace : deux paragraphes séparés donnent alors le même texte qu'un seul
 * paragraphe qui les contenait tous les deux.
 */
function texteVisible(html) {
  const corps = html.slice(html.indexOf("<body"));
  return decoder(
    corps
      .replace(/<(script|style|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** Les paragraphes d'une page, dans l'ordre, avec leur longueur. */
function paragraphes(html) {
  const corps = html.slice(html.indexOf("<body"));
  return [...corps.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) =>
      decoder(m[1].replace(/<[^>]+>/g, " "))
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

function lire(page) {
  const fichier = join(dist, page.replace(/^\/|\/$/g, ""), "index.html");
  if (!existsSync(fichier)) {
    console.error(`verifier-texte-guides : ${page} est absente du build (${fichier}).`);
    process.exit(1);
  }
  const html = readFileSync(fichier, "utf8");
  return { texte: texteVisible(html), paragraphes: paragraphes(html) };
}

const releve = Object.fromEntries(pages.map((page) => [page, lire(page)]));

/* ---------------------------------------------------------------------------
   Enregistrer
   --------------------------------------------------------------------------- */

if (aEnregistrer) {
  writeFileSync(resolve(aEnregistrer), `${JSON.stringify(releve, null, 2)}\n`, "utf8");
  for (const page of pages) {
    const { texte, paragraphes: ps } = releve[page];
    const longs = ps.filter((p) => p.length > seuilLong).length;
    console.log(
      `${page} : ${texte.length} signes de texte, ${ps.length} paragraphes, ` +
        `${longs} au-delà de ${seuilLong} signes`,
    );
  }
  console.log(`verifier-texte-guides : relevé écrit dans ${aEnregistrer}`);
  process.exit(0);
}

/* ---------------------------------------------------------------------------
   Comparer
   --------------------------------------------------------------------------- */

const fichierReference = resolve(aComparer);
if (!existsSync(fichierReference)) {
  console.error(`verifier-texte-guides : relevé introuvable (${fichierReference}).`);
  process.exit(1);
}
const reference = JSON.parse(readFileSync(fichierReference, "utf8"));

/** Le premier mot qui diffère entre deux textes, et son voisinage. */
function premiereDifference(avant, apres) {
  const a = avant.split(" ");
  const b = apres.split(" ");
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
    if (a[i] !== b[i]) {
      return {
        rang: i,
        avant: a.slice(Math.max(0, i - 6), i + 7).join(" "),
        apres: b.slice(Math.max(0, i - 6), i + 7).join(" "),
      };
    }
  }
  return null;
}

let erreurs = 0;

for (const page of pages) {
  const attendu = reference[page];
  if (!attendu) {
    console.error(`✗ ${page} : absente du relevé de référence.`);
    erreurs += 1;
    continue;
  }
  const obtenu = releve[page];
  const difference = premiereDifference(attendu.texte, obtenu.texte);
  if (difference) {
    console.error(`✗ ${page} : le texte a changé au mot ${difference.rang + 1}.`);
    console.error(`  avant : …${difference.avant}…`);
    console.error(`  après : …${difference.apres}…`);
    erreurs += 1;
    continue;
  }
  const avant = attendu.paragraphes;
  const apres = obtenu.paragraphes;
  const longsAvant = avant.filter((p) => p.length > seuilLong);
  const longsApres = apres.filter((p) => p.length > seuilLong);
  console.log(
    `✓ ${page} : texte identique au mot près (${obtenu.texte.length} signes), ` +
      `${avant.length} → ${apres.length} paragraphes, ` +
      `${longsAvant.length} → ${longsApres.length} au-delà de ${seuilLong} signes ` +
      `(le plus long : ${Math.max(...avant.map((p) => p.length))} → ` +
      `${Math.max(...apres.map((p) => p.length))})`,
  );
}

if (erreurs > 0) {
  console.error(`\nverifier-texte-guides : ${erreurs} page(s) dont le texte a bougé.`);
  process.exit(1);
}
console.log("\nverifier-texte-guides : aucun mot changé.");
