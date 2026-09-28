/**
 * Page 404 statique : retire de dist/client/404.html ce qui l'hydrate.
 *
 * Pourquoi : GitHub Pages sert 404.html pour toute adresse inconnue, mais le
 * fichier est prérendu depuis la route /404. Au chargement, le routeur compare
 * l'état prérendu (route /404) à l'adresse réelle (/nimporte-quoi/), échoue
 * sur un invariant et vide la page. Sans les scripts du routeur, la page reste
 * ce que le prérendu a produit : l'en-tête, le message, les liens utiles et le
 * pied de page, tous en liens classiques.
 *
 * Restent : le chargement différé de GA4 (inline), les données structurées de
 * l'entité et la feuille de style. Le bouton du menu mobile ne s'ouvre pas sans
 * JavaScript ; le pied de page porte toute la navigation.
 *
 * Lancé en postbuild, après css-critique.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fichier = join(racine, "dist/client/404.html");

if (!existsSync(fichier)) {
  console.warn("page-404 : dist/client/404.html absent, rien à faire");
  process.exit(0);
}

let html = readFileSync(fichier, "utf8");
const avant = html.length;

html = html
  // Le point d'entrée du routeur et ses modules préchargés.
  .replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, "")
  // L'état sérialisé du routeur et la barrière de flux.
  .replace(/<script\b[^>]*class="\$tsr"[^>]*>[\s\S]*?<\/script>/g, "")
  // La restauration du défilement, propre au routeur.
  .replace(/<script\b[^>]*>(?:(?!<\/script>)[\s\S])*__TSR_key(?:(?!<\/script>)[\s\S])*<\/script>/g, "");

if (/type="module"|\$_TSR|__TSR_key/.test(html)) {
  console.error("page-404 : des scripts du routeur restent dans 404.html");
  process.exit(1);
}

writeFileSync(fichier, html, "utf8");
console.log(`page-404 : 404.html rendue statique (${avant - html.length} octets retirés)`);
