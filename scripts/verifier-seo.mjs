/**
 * Contrôle SEO du site prérendu, à lancer après `npm run build`.
 *
 * Il lit le HTML tel que GitHub Pages le servira (dist/client) et vérifie ce
 * que Google et les assistants IA verront : balises de tête, titre unique,
 * données structurées, liens internes, sitemap, et les formulations que le
 * site ne doit plus porter. Aucune dépendance : des expressions régulières
 * suffisent sur un HTML produit par nous-mêmes.
 *
 * Sortie : un récapitulatif lisible, et un code de sortie 1 s'il reste une
 * erreur. Les avertissements ne bloquent pas, mais ils se justifient.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(racine, "dist/client");
const DOMAINE = "https://sitaly.fr";

if (!existsSync(dist)) {
  console.error("verifier-seo : dist/client est absent. Lancez d'abord npm run build.");
  process.exit(1);
}

/* ---------------------------------------------------------------------------
   Outils
   --------------------------------------------------------------------------- */

const ENTITES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  rsquo: "\u2019",
  lsquo: "\u2018",
  laquo: "\u00ab",
  raquo: "\u00bb",
  hellip: "\u2026",
  mdash: "\u2014",
  ndash: "\u2013",
  eacute: "é",
  egrave: "è",
  agrave: "à",
  ccedil: "ç",
};

function decoder(texte) {
  return texte.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (tout, code) => {
    if (code[0] === "#") {
      const n =
        code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : tout;
    }
    return ENTITES[code.toLowerCase()] ?? tout;
  });
}

/** Forme comparable d'un texte : espaces insécables, apostrophes et blancs unifiés. */
function normaliser(texte) {
  return texte
    .replace(/[\u00a0\u202f\u2009]/g, " ")
    .replace(/[\u2019\u2018]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const longueur = (texte) => [...texte].length;

function attribut(balise, nom) {
  const m = balise.match(new RegExp(`\\s${nom}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return m ? decoder(m[1] ?? m[2] ?? "") : null;
}

function metas(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
}

function meta(html, cle, valeur) {
  const b = metas(html).find((t) => (attribut(t, cle) ?? "").toLowerCase() === valeur);
  return b ? attribut(b, "content") : null;
}

function texteVisible(html) {
  const corps = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return decoder(
    corps
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<template\b[\s\S]*?<\/template>/gi, " ")
      // Les balises de texte (lien, gras, italique) ne coupent pas les mots :
      // « <a>ancre</a>. » se lit « ancre. ». Les autres séparent des blocs.
      .replace(/<\/?(a|strong|em|b|i|span|abbr|code|small|sup|sub|mark)\b[^>]*>/gi, "")
      .replace(/<[^>]+>/g, " "),
  );
}

function fichiersHtml(dossier) {
  const sortie = [];
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) {
      if (nom === "assets") continue;
      sortie.push(...fichiersHtml(chemin));
    } else if (nom === "index.html") {
      sortie.push(chemin);
    }
  }
  return sortie;
}

function cheminDePage(fichier) {
  const rel = relative(dist, fichier).split("\\").join("/");
  if (rel === "404.html") return "/404.html";
  const dossier = rel.replace(/index\.html$/, "");
  return `/${dossier}`.replace(/\/+/g, "/");
}

/** Chemin interne d'un href, ou null s'il sort du site. */
function cheminInterne(href) {
  if (!href) return null;
  let h = href.trim();
  if (h.startsWith(DOMAINE)) h = h.slice(DOMAINE.length) || "/";
  else if (/^https?:\/\/(www\.)?sitaly\.fr/i.test(h))
    h = h.replace(/^https?:\/\/(www\.)?sitaly\.fr/i, "") || "/";
  if (!h.startsWith("/") || h.startsWith("//")) return null;
  const net = h.split(/[?#]/)[0];
  return net === "" ? "/" : net;
}

/** Le fichier que GitHub Pages servira pour ce chemin, ou null. */
function cible(chemin) {
  const brut = decodeURIComponent(chemin);
  const direct = join(dist, brut);
  if (brut.endsWith("/")) {
    const f = join(direct, "index.html");
    return existsSync(f) ? f : null;
  }
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const index = join(direct, "index.html");
  return existsSync(index) ? index : null;
}

/** Toutes les FAQPage d'un bloc JSON-LD, où qu'elles soient dans le graphe. */
function faqPages(noeud, sortie = []) {
  if (Array.isArray(noeud)) {
    for (const n of noeud) faqPages(n, sortie);
  } else if (noeud && typeof noeud === "object") {
    const type = noeud["@type"];
    if (type === "FAQPage" || (Array.isArray(type) && type.includes("FAQPage"))) sortie.push(noeud);
    for (const v of Object.values(noeud)) if (v && typeof v === "object") faqPages(v, sortie);
  }
  return sortie;
}

/* ---------------------------------------------------------------------------
   Lecture des pages
   --------------------------------------------------------------------------- */

const fichiers = fichiersHtml(dist);
if (existsSync(join(dist, "404.html"))) fichiers.push(join(dist, "404.html"));

const pages = fichiers.map((fichier) => {
  const html = readFileSync(fichier, "utf8");
  const chemin = cheminDePage(fichier);
  const robots = meta(html, "name", "robots") ?? "";
  const redirection = /<meta[^>]+http-equiv=["']refresh["']/i.test(html);
  const indexable = !redirection && chemin !== "/404.html" && !/noindex/i.test(robots);
  return { fichier, chemin, html, robots, redirection, indexable };
});

const parChemin = new Map(pages.map((p) => [p.chemin, p]));

const erreurs = [];
const avertissements = [];
const erreur = (page, message) => erreurs.push(`${page} : ${message}`);
const avertir = (page, message) => avertissements.push(`${page} : ${message}`);

/* ---------------------------------------------------------------------------
   Contrôles page par page
   --------------------------------------------------------------------------- */

const titres = new Map();
const descriptions = new Map();

for (const p of pages) {
  if (p.redirection) continue;
  const { html, chemin } = p;
  const visible = texteVisible(html);
  const visibleNorme = normaliser(visible);

  // Données structurées : chaque bloc se lit. Sur les pages indexables,
  // chaque question de FAQ se voit aussi : les pages hors index restent en
  // l'état (décision du 26 septembre 2026, src/lib/indexation.ts), et Google
  // n'en tire aucun résultat enrichi.
  for (const m of html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    let donnees;
    try {
      donnees = JSON.parse(m[1]);
    } catch (e) {
      erreur(chemin, `JSON-LD illisible (${e.message.slice(0, 80)})`);
      continue;
    }
    if (!p.indexable) continue;
    for (const faq of faqPages(donnees)) {
      const questions = Array.isArray(faq.mainEntity) ? faq.mainEntity : [faq.mainEntity];
      for (const q of questions) {
        if (!q?.name) continue;
        if (!visibleNorme.includes(normaliser(q.name))) {
          erreur(chemin, `question de FAQPage absente du texte visible : « ${q.name} »`);
        }
        const reponse = q.acceptedAnswer?.text;
        if (reponse && !visibleNorme.includes(normaliser(reponse))) {
          avertir(chemin, `réponse de FAQPage différente du texte visible : « ${q.name} »`);
        }
      }
    }
  }

  // Liens internes.
  for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attribut(m[0], "href");
    const interne = cheminInterne(href ?? "");
    if (!interne) continue;
    const f = cible(interne);
    if (!f) {
      erreur(chemin, `lien interne cassé vers ${interne}`);
      continue;
    }
    if (p.indexable && f.endsWith("index.html")) {
      const vise = parChemin.get(cheminDePage(f));
      if (vise && !vise.indexable && !vise.redirection && vise.chemin !== "/404.html") {
        avertir(chemin, `lien vers une page hors index : ${vise.chemin}`);
      }
    }
  }

  if (!p.indexable) continue;

  // Balises de tête.
  const titre = decoder(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  const description = meta(html, "name", "description");
  if (!titre) erreur(chemin, "<title> absent");
  else {
    if (longueur(titre) > 60)
      erreur(chemin, `title de ${longueur(titre)} caractères (60 au plus) : « ${titre} »`);
    else if (longueur(titre) < 30)
      avertir(chemin, `title court (${longueur(titre)}) : « ${titre} »`);
    titres.set(titre, [...(titres.get(titre) ?? []), chemin]);
  }
  if (!description) erreur(chemin, "meta description absente");
  else {
    const d = description.trim();
    if (longueur(d) > 160)
      erreur(chemin, `meta description de ${longueur(d)} caractères (160 au plus)`);
    else if (longueur(d) < 120) avertir(chemin, `meta description courte (${longueur(d)})`);
    descriptions.set(d, [...(descriptions.get(d) ?? []), chemin]);
  }

  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1 !== 1) erreur(chemin, `${h1} balises <h1> (une seule attendue)`);

  const canonique = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .find((t) => (attribut(t, "rel") ?? "").toLowerCase() === "canonical");
  const attendue = `${DOMAINE}${chemin.endsWith("/") ? chemin : `${chemin}/`}`;
  const href = canonique ? attribut(canonique, "href") : null;
  if (!href) erreur(chemin, "canonical absente");
  else if (href !== attendue) erreur(chemin, `canonical ${href} (attendue : ${attendue})`);

  if (!meta(html, "property", "og:title")) erreur(chemin, "og:title absent");

  // Formulations que le site ne porte plus.
  const aVerifier = normaliser(`${titre} ${description ?? ""} ${visible}`);
  const interdites = ["jusqu'à 30 %", "plateforme saas", "rencontrons-nous"];
  if (chemin.startsWith("/agents-ia/")) interdites.push("sans frais d'installation");
  for (const f of interdites) {
    if (aVerifier.includes(f)) erreur(chemin, `formulation interdite : « ${f} »`);
  }

  if (chemin === "/chatgpt-ads/") {
    if (
      /<form\b[^>]*action=["']mailto:/i.test(html) ||
      /location\.href\s*=\s*["']mailto:/i.test(html)
    ) {
      erreur(chemin, "le formulaire part encore par mailto: comme envoi principal");
    }
  }

  if (aVerifier.includes("et si on créait votre site")) {
    const ctaSite = /data-cta=["']site["']/i.test(html);
    if (!chemin.startsWith("/blog/") || !ctaSite) {
      erreur(chemin, "CTA « Et si on créait votre site » hors d'un article dont le cta vaut site");
    }
  }
}

for (const [titre, chemins] of titres) {
  if (chemins.length > 1) erreurs.push(`title en double « ${titre} » : ${chemins.join(", ")}`);
}
for (const [d, chemins] of descriptions) {
  if (chemins.length > 1)
    erreurs.push(`meta description en double : ${chemins.join(", ")} (« ${d.slice(0, 60)}… »)`);
}

/* ---------------------------------------------------------------------------
   Sitemap
   --------------------------------------------------------------------------- */

const sitemap = join(dist, "sitemap.xml");
const dansSitemap = new Set();
if (!existsSync(sitemap)) {
  erreurs.push("sitemap.xml absent de dist/client");
} else {
  const xml = readFileSync(sitemap, "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const chemin = cheminInterne(m[1].trim());
    if (!chemin) {
      erreurs.push(`sitemap : adresse hors domaine ${m[1]}`);
      continue;
    }
    dansSitemap.add(chemin);
    const f = cible(chemin);
    if (!f) {
      erreurs.push(`sitemap : ${chemin} n'existe pas`);
      continue;
    }
    const page = parChemin.get(cheminDePage(f));
    if (page && !page.indexable) erreurs.push(`sitemap : ${chemin} n'est pas indexable`);
  }
  for (const p of pages) {
    if (p.indexable && !dansSitemap.has(p.chemin))
      avertir(p.chemin, "page indexable absente du sitemap");
  }
}

/* ---------------------------------------------------------------------------
   Récapitulatif
   --------------------------------------------------------------------------- */

const indexables = pages.filter((p) => p.indexable).length;
const horsIndex = pages.filter((p) => !p.indexable && !p.redirection).length;
const redirections = pages.filter((p) => p.redirection).length;

console.log("Vérification SEO du build (dist/client)");
console.log(
  `${pages.length} pages lues : ${indexables} indexables, ${horsIndex} hors index, ${redirections} redirections. ${dansSitemap.size} adresses au sitemap.`,
);
console.log("");

if (erreurs.length) {
  console.log(`ERREURS (${erreurs.length})`);
  for (const e of erreurs) console.log(`  ✗ ${e}`);
  console.log("");
}
if (avertissements.length) {
  console.log(`AVERTISSEMENTS (${avertissements.length})`);
  for (const a of avertissements) console.log(`  ! ${a}`);
  console.log("");
}

console.log(`Résultat : ${erreurs.length} erreur(s), ${avertissements.length} avertissement(s).`);
process.exit(erreurs.length ? 1 : 0);
