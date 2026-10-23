/**
 * Génère public/offres.json avant le build.
 *
 * Le relais de formulaires (~/sitaly-forms) lit ce fichier sur sitaly.fr pour
 * écrire au prospect l'offre que le questionnaire /mon-projet/ lui conseille.
 * Le navigateur n'envoie que l'identifiant de l'offre : le nom, le prix et ce
 * qu'elle comprend viennent d'ici, donc de src/data/offres.ts. Personne ne
 * peut faire partir de sitaly.fr un e-mail au contenu de son choix.
 */
import { build } from "esbuild";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = await mkdtemp(join(tmpdir(), "sitaly-offres-"));
const bundlePath = join(tmp, "offres.mjs");

try {
  await build({
    entryPoints: [join(root, "src/data/offres.ts")],
    outfile: bundlePath,
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    alias: { "@": join(root, "src") },
  });

  const { OFFRES, GROUPES, MENTION_TVA, lignesIncluses, prixLong } = await import(
    pathToFileURL(bundlePath).href
  );
  const offres = Object.fromEntries(
    OFFRES.map((o) => [
      o.id,
      {
        nom: o.nom,
        pour: o.pour,
        prix: prixLong(o),
        inclus: lignesIncluses(o),
        tarifs: `https://sitaly.fr/tarifs/#${GROUPES[o.groupe].ancre}`,
      },
    ]),
  );
  const json = `${JSON.stringify({ mention: MENTION_TVA, offres }, null, 2)}\n`;
  const target = join(root, "public/offres.json");

  const previous = await readFile(target, "utf8").catch(() => null);
  if (previous === json) {
    console.log(`offres.json déjà à jour (${OFFRES.length} offres)`);
  } else {
    await writeFile(target, json, "utf8");
    console.log(`offres.json généré : ${OFFRES.length} offres`);
  }
} finally {
  await rm(tmp, { recursive: true, force: true });
}
