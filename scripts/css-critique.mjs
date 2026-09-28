/**
 * CSS critique : inline les règles utiles au premier affichage de chaque page
 * prérendue, et charge le reste de la feuille sans bloquer le rendu.
 *
 * Pourquoi : la feuille compilée pèse autour de 150 Kio. Sur un téléphone en
 * 4G lente, le navigateur attendait qu'elle arrive entière avant d'afficher
 * quoi que ce soit, et le premier affichage en dépendait. Beasties lit le HTML
 * produit par le prérendu, garde les règles qui s'y appliquent, les pose dans
 * un <style> en tête, et transforme le lien de la feuille en chargement
 * différé (media="print" puis "all" au chargement, avec un <noscript>).
 *
 * Les pages statiques de public/ (ChatGPT Ads, landings hors index) ne passent
 * pas par ici : elles chargent /static/sitaly.css, une URL stable.
 *
 * Lancé en postbuild, après sync-static-css. Un échec n'interrompt pas le
 * build : la page garde alors sa feuille bloquante, comme avant.
 */
import Beasties from "beasties";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(racine, "dist/client");

async function pagesHtml(dossier) {
  const sortie = [];
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) {
      if (entree.name === "assets" || entree.name === "static") continue;
      sortie.push(...(await pagesHtml(chemin)));
    } else if (entree.name.endsWith(".html")) {
      sortie.push(chemin);
    }
  }
  return sortie;
}

const beasties = new Beasties({
  path: dist,
  publicPath: "/",
  // media="print" puis "all" au chargement, et un <noscript> de secours.
  preload: "media",
  noscriptFallback: true,
  // Les @font-face restent dans la feuille : les polices sont déjà préchargées.
  inlineFonts: false,
  fonts: false,
  keyframes: "critical",
  compress: true,
  logLevel: "silent",
});

const pages = await pagesHtml(dist);
let traitees = 0;
let ignorees = 0;
for (const fichier of pages) {
  const html = await readFile(fichier, "utf8");
  // Seules les pages du routeur chargent la feuille compilée.
  if (!/<link rel="stylesheet" href="\/assets\/styles-[^"]+\.css"/.test(html)) {
    ignorees++;
    continue;
  }
  try {
    const sortie = await beasties.process(html);
    await writeFile(fichier, sortie, "utf8");
    traitees++;
  } catch (e) {
    ignorees++;
    console.warn(`css-critique : ${relative(dist, fichier)} laissé tel quel (${e.message})`);
  }
}
console.log(`css-critique : ${traitees} pages traitées, ${ignorees} laissées telles quelles`);
