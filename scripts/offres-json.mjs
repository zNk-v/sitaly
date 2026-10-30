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
    /* Le verrou de Premium vient avec la grille : tant qu'il est fermé, l'offre
       reste hors du fichier, comme elle reste hors du menu et du sitemap. */
    stdin: {
      contents: `export * from "@/data/offres"; export { PREMIUM_PUBLIE } from "@/data/premium";`,
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

  const { OFFRES, GROUPES, MENTION_TVA, PREMIUM_PUBLIE, lignesIncluses, prixLong } = await import(
    pathToFileURL(bundlePath).href
  );
  const publiees = OFFRES.filter((o) => PREMIUM_PUBLIE || o.groupe !== "premium");
  const offres = Object.fromEntries(
    publiees.map((o) => [
      o.id,
      {
        nom: o.nom,
        pour: o.pour,
        prix: prixLong(o),
        inclus: lignesIncluses(o),
        // Premium n'est pas dans la grille de /tarifs/ : le lien mène à sa page.
        tarifs:
          o.groupe === "premium"
            ? `https://sitaly.fr${o.page}#tarif`
            : `https://sitaly.fr/tarifs/#${GROUPES[o.groupe].ancre}`,
      },
    ]),
  );
  const json = `${JSON.stringify({ mention: MENTION_TVA, offres }, null, 2)}\n`;
  const target = join(root, "public/offres.json");

  const previous = await readFile(target, "utf8").catch(() => null);
  if (previous === json) {
    console.log(`offres.json déjà à jour (${publiees.length} offres)`);
  } else {
    await writeFile(target, json, "utf8");
    console.log(`offres.json généré : ${publiees.length} offres`);
  }
} finally {
  await rm(tmp, { recursive: true, force: true });
}
