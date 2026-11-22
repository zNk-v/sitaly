/**
 * Génère public/chat-connaissance.md avant le build.
 *
 * C'est la seule source de l'IA du chat de sitaly.fr : la fonction Supabase
 * chat-vitrine (dépôt sitaly-saas) lit ce fichier sur le site publié et
 * l'envoie en bloc système mis en cache. Un prix changé ici arrive dans le
 * chat au prochain déploiement du site, sans toucher à la fonction.
 *
 * Quatre sources, toutes déjà écrites pour être lues telles quelles :
 * - src/data/offres.ts (CREATEUR_IA) : les montants, en tête, pour qu'ils
 *   soient les premiers que l'IA voit et qu'ils ne puissent pas dériver ;
 * - src/data/faq-produit.ts : les questions fréquentes, mot pour mot comme
 *   l'accueil et /tarifs/ les affichent ;
 * - public/pricing.md : ce que chaque formule comprend, et ne comprend pas ;
 * - public/llms-full.txt : le reste du site, déjà rédigé pour les IA.
 *
 * Le fichier n'invente rien et n'ajoute aucune phrase de son cru : il assemble.
 * Ce qui n'y est pas, l'IA du chat répondra qu'elle ne le sait pas, et le
 * visiteur se verra proposer de parler à Ted.
 */
import { build } from "esbuild";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = await mkdtemp(join(tmpdir(), "sitaly-chat-"));
const bundlePath = join(tmp, "connaissance.mjs");

try {
  await build({
    stdin: {
      contents: `export { CREATEUR_IA, MENTION_TVA, PHRASE_APERCU, PHRASE_PRIX_APPEL, GARANTIE } from "@/data/offres"; export { FAQ_PRODUIT } from "@/data/faq-produit"; export { euros } from "@/lib/config";`,
      resolveDir: root,
      loader: "ts",
    },
    outfile: bundlePath,
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    alias: { "@": join(root, "src") },
  });

  const { CREATEUR_IA, MENTION_TVA, PHRASE_APERCU, PHRASE_PRIX_APPEL, GARANTIE, FAQ_PRODUIT, euros } = await import(pathToFileURL(bundlePath).href);
  const [pricing, llms] = await Promise.all([
    readFile(join(root, "public/pricing.md"), "utf8"),
    readFile(join(root, "public/llms-full.txt"), "utf8"),
  ]);

  // « 2 500 » et non « 2500 » : le reste du site écrit les milliers à la française.
  const n = (v) => v.toLocaleString("fr-FR").replace(/\u202f/g, "\u00a0");
  const formule = (f, periode, prixMois = `${euros(f.mensuel)} par mois`) =>
    `- **${f.nom}** : ${prixMois} ou ${euros(f.annuel)} par an${periode}`;

  // Aucune date dans le fichier : il ne doit changer que quand le site change,
  // sinon chaque build salit le dépôt sans rien apporter au chat.
  const sections = [
    `# Ce que dit sitaly.fr

Tout ce qui suit est publié sur sitaly.fr. Rien d'autre n'est vrai de Sitaly.`,

    `## Les formules de Sitaly App, montants officiels

${formule(CREATEUR_IA.essentiel, ` · ${n(CREATEUR_IA.essentiel.credits)} crédits IA par mois`, `${PHRASE_PRIX_APPEL} (premier abonnement, au mois)`)}
${formule(CREATEUR_IA.pro, ` · ${n(CREATEUR_IA.pro.credits)} crédits IA par mois`)}

Il n'existe pas de formule gratuite. ${PHRASE_APERCU}
${GARANTIE} sur le premier paiement d'un abonnement, sur simple demande à contact@sitaly.fr.
${MENTION_TVA}. Sans engagement au mois ; l'annuel se paie pour un an (15 % de moins).
La grille complète : https://sitaly.fr/tarifs/`,

    `## Les questions fréquentes, telles que le site y répond

${FAQ_PRODUIT.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}`,

    `## Ce que chaque formule comprend

${pricing.trim()}`,

    `## Le reste du site

${llms.trim()}`,
  ];

  const texte = `${sections.join("\n\n").trim()}\n`;
  const cible = join(root, "public/chat-connaissance.md");
  const avant = await readFile(cible, "utf8").catch(() => null);
  const taille = `${Math.round(texte.length / 1024)} ko`;
  if (avant === texte) {
    console.log(`chat-connaissance.md déjà à jour (${taille})`);
  } else {
    await writeFile(cible, texte, "utf8");
    console.log(`chat-connaissance.md généré : ${taille}, ${FAQ_PRODUIT.length} questions`);
  }
} finally {
  await rm(tmp, { recursive: true, force: true });
}
