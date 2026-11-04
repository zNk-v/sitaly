/**
 * Lit, avant chaque build, ce que Teddy a publié depuis le centre de pilotage de
 * l'app (app.sitaly.fr/app/admin, espace « sitaly.fr ») : les textes, les prix et
 * les articles du blog. Fonction publique vitrine-contenu (Supabase), qui ne livre
 * que du contenu publié. Résultat : src/data/vitrine.json, lu par src/data/vitrine.ts.
 *
 * Sans réseau ou si la fonction ne répond pas, le fichier existant est gardé : le
 * site se construit toujours, avec le dernier contenu connu.
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FICHIER = join(dirname(fileURLToPath(import.meta.url)), "../src/data/vitrine.json");
const SOURCE = "https://zgigeakspxdzgaigypoq.supabase.co/functions/v1/vitrine-contenu";

try {
  const r = await fetch(SOURCE, { signal: AbortSignal.timeout(15_000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = await r.json();
  if (!d || typeof d.contenus !== "object" || !Array.isArray(d.articles)) throw new Error("réponse inattendue");
  const avant = await readFile(FICHIER, "utf8").catch(() => "");
  const apres = `${JSON.stringify({ lu_le: d.lu_le, contenus: d.contenus, articles: d.articles }, null, 2)}\n`;
  // La date de lecture change à chaque build : on n'écrit que si le contenu a changé.
  const sansDate = (t) => t.replace(/"lu_le": [^,]*,/, "");
  if (sansDate(avant) !== sansDate(apres)) await writeFile(FICHIER, apres);
  console.log(`contenus-vitrine : ${d.articles.length} article(s), blocs : ${Object.keys(d.contenus).join(", ") || "aucun"}`);
} catch (e) {
  console.warn(`contenus-vitrine : contenu non lu (${e.message}), le dernier connu est gardé.`);
}
