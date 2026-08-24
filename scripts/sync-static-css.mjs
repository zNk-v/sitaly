/**
 * Réaligne la feuille de style des pages statiques après chaque build.
 *
 * Les landings servies depuis public/ (ChatGPT Ads, Agents IA pour ChatGPT Ads) ne
 * passent pas par le routeur React : elles chargent /static/sitaly.css, une URL stable.
 * Le build, lui, produit un nom haché (styles-XXXX.css) qui change à chaque compilation.
 * Ce script recopie donc la feuille fraîchement construite sur l'URL stable, dans le
 * build ET dans public/, pour que les pages statiques suivent la charte du site.
 */
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "dist/client/assets");

const css = (await readdir(assets)).find((f) => /^styles-.*\.css$/.test(f));
if (!css) {
  console.error("sync-static-css : aucune feuille styles-*.css dans le build.");
  process.exit(1);
}

for (const target of [join(root, "dist/client/static"), join(root, "public/static")]) {
  await mkdir(target, { recursive: true });
  await copyFile(join(assets, css), join(target, "sitaly.css"));
}

console.log(`sync-static-css : ${css} -> /static/sitaly.css`);
