/**
 * Captures avant/après à 390 px, côte à côte, sur les endroits que SITA-28 a changés.
 *
 * Pourquoi un script à part de `mesurer-debordement-mobile.mjs` : celui-ci prend des
 * captures pleine hauteur, et une page d'accueil de 40 000 px de haut dans un PNG de
 * 4,5 Mo ne se regarde pas. Ted demande des captures à 390 px (critère 4 de SITA-28) :
 * ce qu'il faut voir, c'est l'écran de l'iPhone, cadré sur le bloc qui a changé, avec
 * l'avant à gauche et l'après à droite dans la même image.
 *
 * Le cadrage est identique des deux côtés : on cherche la même ancre dans les deux
 * constructions, on la pose à 80 px du haut de l'écran, et on photographie l'écran.
 * Sans cette ancre commune, deux captures du « même » bloc se comparent mal, la
 * hauteur du contenu au-dessus ayant elle aussi changé.
 *
 * Usage :
 *     node scripts/captures-avant-apres-mobile.mjs \
 *       --avant=../SITA-28-avant/dist/client --apres=dist/client
 *
 * Options :
 *     --avant=<chemin>   racine servie pour le côté « avant » (obligatoire)
 *     --apres=<chemin>   racine servie pour le côté « après » (défaut : dist/client)
 *     --sortie=<nom>     dossier dans sitaly.fr-audit/mobile/ (défaut : comparaisons)
 *     --spots=a,b        ne faire que ces endroits (défaut : tous)
 *     --montage          refaire les images côte à côte sans rephotographier,
 *                        à partir des captures déjà dans le dossier de sortie
 *
 * Moteur : WebKit, celui de l'iPhone. Les deux côtés passent l'un après l'autre et
 * chaque navigateur se ferme dès sa série finie : deux WebKit en même temps ont déjà
 * coupé un run sur cette machine (charge trop élevée).
 */
import { createRequire } from "node:module";
import { createReadStream, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LARGEUR = 390;
const HAUTEUR = 844;
/** Marge au-dessus de l'ancre : le bloc photographié garde son contexte. */
const MARGE_HAUT = 80;

/**
 * Les endroits à comparer. Un par correctif visible de la branche : l'ancre doit
 * exister dans les deux constructions, sinon la comparaison ne cadre pas la même
 * chose. D'où le choix d'ancres de contenu (un titre, un mot) plutôt que de classes.
 */
const SPOTS = [
  {
    nom: "cookies-tableau",
    chemin: "/cookies/",
    ancre: { css: "table" },
    titre: "/cookies/ — le tableau des traceurs",
    quoi: "Quatre colonnes dans 390 px : 204 px de contenu restaient hors du cadre. Chaque ligne devient une carte, intitulé de colonne compris.",
  },
  {
    nom: "pilier-tableau",
    chemin: "/creer-site-internet-artisan/",
    ancre: { css: "table" },
    titre: "/creer-site-internet-artisan/ — le comparatif",
    quoi: "Le même tableau empilé, sur la page pilier la plus travaillée en SEO.",
  },
  {
    nom: "rendez-vous-jours",
    chemin: "/produits/prise-de-rendez-vous/",
    ancre: { texte: "Choisissez un jour" },
    titre: "/produits/prise-de-rendez-vous/ — la bande des jours",
    quoi: "Deux des cinq jours étaient hors écran, et la carte poussait la page de 47 px à 320 px. Les jours passent à la ligne.",
  },
  {
    nom: "pied-legal",
    chemin: "/mentions-legales/",
    ancre: { css: "footer" },
    titre: "/mentions-legales/ — le pied de page",
    quoi: "Les quatre liens étaient écrits au fil de la phrase, hauts de 15 px. Ils deviennent une rangée de 44 px qui se replie.",
  },
  {
    nom: "agents-ia-onglets",
    chemin: "/agents-ia/",
    ancre: { css: '[role="tablist"]' },
    titre: "/agents-ia/ — les onglets de workflows",
    quoi: "Le plus gros bloc caché du site : 736 px hors écran, soit trois workflows sur cinq invisibles sans glisser le doigt. Les onglets passent à la ligne.",
  },
  {
    nom: "agents-ia-champs",
    chemin: "/agents-ia/",
    ancre: { css: "form input, form textarea" },
    titre: "/agents-ia/ — le formulaire de contact",
    quoi: "Champs écrits en 15 px : Safari iOS zoomait toute la page au premier toucher, et le zoom restait. L'écart de 15 à 16 px se voit à peine ici ; ce qu'il empêche, le zoom, ne se photographie pas. C'est le relevé qui le dit : 4 champs sous 16 px avant, 0 après.",
  },
  {
    nom: "chat-ouvert",
    chemin: "/",
    chat: true,
    titre: "L'accueil, chat ouvert",
    quoi: "Réponses en 16 px, bouton d'envoi et bouton de fermeture à 44 px. Le chat suit le visiteur sur toutes les pages.",
  },
];

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function lireArguments(argv) {
  const opts = {
    avant: null,
    apres: join(racine, "dist/client"),
    sortie: "comparaisons",
    spots: null,
    montage: false,
  };
  for (const arg of argv) {
    if (arg === "--montage") opts.montage = true;
    else if (arg.startsWith("--avant=")) opts.avant = resolve(racine, arg.slice(8));
    else if (arg.startsWith("--apres=")) opts.apres = resolve(racine, arg.slice(8));
    else if (arg.startsWith("--sortie=")) opts.sortie = arg.slice(9);
    else if (arg.startsWith("--spots=")) opts.spots = arg.slice(8).split(",").filter(Boolean);
  }
  return opts;
}

function servirDist(dist) {
  const serveur = createServer((req, res) => {
    const chemin = decodeURIComponent(req.url.split("?")[0]);
    let fichier = join(dist, chemin);
    if (chemin.endsWith("/")) fichier = join(fichier, "index.html");
    else if (!extname(fichier) && existsSync(join(fichier, "index.html")))
      fichier = join(fichier, "index.html");
    if (!existsSync(fichier) || !fichier.startsWith(dist)) {
      res.writeHead(404).end("introuvable");
      return;
    }
    res.writeHead(200, {
      "content-type": TYPES[extname(fichier)] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    createReadStream(fichier).pipe(res);
  });
  return new Promise((ok) => serveur.listen(0, "127.0.0.1", () => ok(serveur)));
}

function chargerPlaywright() {
  const require = createRequire(import.meta.url);
  const pistes = [
    process.env.PLAYWRIGHT_MODULE,
    "playwright",
    "playwright-core",
    join(process.env.PAPERCLIP_TASK_SCRATCH_DIR ?? "", "pw/node_modules/playwright"),
  ].filter(Boolean);
  for (const piste of pistes) {
    try {
      return require(piste);
    } catch {
      /* piste suivante */
    }
  }
  throw new Error(
    "Playwright introuvable. Installe-le hors du dépôt puis passe le chemin :\n" +
      "  mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright && npx playwright install webkit\n" +
      "  PLAYWRIGHT_MODULE=/tmp/pw/node_modules/playwright node scripts/captures-avant-apres-mobile.mjs",
  );
}

/**
 * Descend puis remonte : les blocs animés à l'affichage se posent, et leur état
 * final est le seul qui compte. `scroll-behavior: smooth` est neutralisé le temps
 * du parcours, sinon chaque saut s'anime.
 */
async function derouler(page) {
  await page.evaluate(async () => {
    const avant = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    const pas = window.innerHeight;
    const max = Math.min(document.body.scrollHeight, pas * 40);
    for (let y = 0; y < max; y += pas) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r()));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 60));
    document.documentElement.style.scrollBehavior = avant;
  });
}

/**
 * `__root.tsx` charge `BulleChat` en `lazy()` et ne la monte qu'après un temps
 * libre, secours à 2 s : le bouton n'existe dans la page qu'à partir de ~3 s.
 */
async function ouvrirLeChat(page) {
  const bouton = page
    .locator(
      'button[aria-label*="chat" i], button[aria-label*="Discuter" i], button[aria-label*="assistant" i], [data-chat-ouvrir]',
    )
    .first();
  try {
    await bouton.waitFor({ state: "attached", timeout: 8000 });
    await bouton.click({ timeout: 2500 });
    await page.waitForTimeout(800);
    return true;
  } catch {
    return false;
  }
}

/** Pose l'ancre à `MARGE_HAUT` du haut de l'écran. Renvoie false si elle manque. */
async function cadrerSurLAncre(page, ancre) {
  if (!ancre) return true;
  const cible = page.locator(ancre.css ?? `text=${ancre.texte}`).first();
  try {
    await cible.waitFor({ state: "attached", timeout: 5000 });
  } catch {
    return false;
  }
  await page.evaluate(
    ({ selecteur, texte, marge }) => {
      let el = null;
      if (selecteur) el = document.querySelector(selecteur);
      else {
        const parcours = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
        while (parcours.nextNode()) {
          const n = parcours.currentNode;
          if (n.children.length === 0 && n.textContent?.trim().includes(texte)) {
            el = n;
            break;
          }
        }
      }
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - marge;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, Math.max(0, y));
    },
    { selecteur: ancre.css ?? null, texte: ancre.texte ?? null, marge: MARGE_HAUT },
  );
  await page.waitForTimeout(350);
  return true;
}

/** Une série de captures pour un côté. Le navigateur se ferme à la fin. */
async function capturerUnCote(playwright, dist, cote, spots, dossier) {
  const serveur = await servirDist(dist);
  const base = `http://127.0.0.1:${serveur.address().port}`;
  const navigateur = await playwright.webkit.launch({ headless: true });
  const contexte = await navigateur.newContext({
    viewport: { width: LARGEUR, height: HAUTEUR },
    deviceScaleFactor: 2,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const page = await contexte.newPage();
  const faits = {};
  for (const spot of spots) {
    const fichier = join(dossier, `${cote}-${spot.nom}.png`);
    try {
      await page.goto(base + spot.chemin, { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(600);
      await derouler(page);
      if (spot.chat && !(await ouvrirLeChat(page))) {
        faits[spot.nom] = { erreur: "bulle introuvable" };
        process.stdout.write(`${cote} ${spot.nom} : bulle introuvable\n`);
        continue;
      }
      const cadre = await cadrerSurLAncre(page, spot.ancre);
      if (!cadre) {
        faits[spot.nom] = { erreur: "ancre introuvable" };
        process.stdout.write(`${cote} ${spot.nom} : ancre introuvable\n`);
        continue;
      }
      await page.screenshot({ path: fichier });
      faits[spot.nom] = { fichier };
      process.stdout.write(`${cote} ${spot.nom} ok\n`);
    } catch (err) {
      faits[spot.nom] = { erreur: String(err.message ?? err) };
      process.stdout.write(`${cote} ${spot.nom} : ${err.message ?? err}\n`);
    }
  }
  await contexte.close();
  await navigateur.close();
  serveur.close();
  return faits;
}

/**
 * Compose l'avant et l'après dans une seule image. Un navigateur sert de table de
 * montage : il n'y a pas de bibliothèque d'images dans le projet, et en ajouter une
 * pour coller deux PNG côte à côte ne se justifie pas.
 */
async function composer(playwright, spots, avant, apres, dossier) {
  const navigateur = await playwright.webkit.launch({ headless: true });
  const contexte = await navigateur.newContext({ deviceScaleFactor: 2 });
  const page = await contexte.newPage();
  const sorties = [];
  for (const spot of spots) {
    const a = avant[spot.nom];
    const b = apres[spot.nom];
    if (!a?.fichier || !b?.fichier) continue;
    await page.setViewportSize({ width: 2 * LARGEUR + 72, height: HAUTEUR + 150 });
    // Les deux PNG partent en base64 dans la page : WebKit refuse un `file://`
    // chargé depuis `about:blank`, et la page de montage se composait sans ses
    // images — deux cadres vides, dont rien ne signalait qu'ils étaient vides.
    await page.setContent(html(spot, await enBase64(a.fichier), await enBase64(b.fichier)));
    await page.waitForTimeout(250);
    // Un montage dont les images n'ont pas peint ressemble à un montage réussi :
    // deux cadres gris, à la bonne taille, et rien dedans. On le refuse ici.
    const peintes = await page.evaluate(() =>
      Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
    );
    if (!peintes) throw new Error(`images non peintes pour ${spot.nom}`);
    const fichier = join(dossier, `${spot.nom}-390.png`);
    await page.screenshot({ path: fichier, fullPage: true });
    sorties.push({ spot, fichier });
    process.stdout.write(`comparaison ${spot.nom}-390.png\n`);
  }
  await contexte.close();
  await navigateur.close();
  return sorties;
}

async function enBase64(fichier) {
  return `data:image/png;base64,${(await readFile(fichier)).toString("base64")}`;
}

function html(spot, sourceAvant, sourceApres) {
  const cote = (libelle, source, teinte) => `
    <figure style="margin:0;flex:0 0 ${LARGEUR}px">
      <figcaption style="font:600 13px/1.4 -apple-system,system-ui,sans-serif;color:${teinte};
        margin-bottom:8px;letter-spacing:.01em">${libelle}</figcaption>
      <img src="${source}" width="${LARGEUR}" height="${HAUTEUR}"
        style="display:block;border:1px solid #0001;border-radius:14px" />
    </figure>`;
  return `<!doctype html><meta charset="utf-8">
<body style="margin:0;padding:24px;background:#f6f6f7;
  font:400 13px/1.5 -apple-system,system-ui,sans-serif;color:#111">
  <div style="font:700 15px/1.4 -apple-system,system-ui,sans-serif;margin-bottom:4px">
    ${spot.titre}
  </div>
  <div style="color:#555;max-width:${2 * LARGEUR}px;margin-bottom:16px">${spot.quoi}</div>
  <div style="display:flex;gap:24px;align-items:flex-start">
    ${cote("Avant", sourceAvant, "#9f1239")}
    ${cote("Après", sourceApres, "#166534")}
  </div>
</body>`;
}

async function main() {
  const opts = lireArguments(process.argv.slice(2));
  if (!opts.avant) throw new Error("Passe --avant=<chemin vers le dist/client d'avant>");
  for (const dist of [opts.avant, opts.apres])
    if (!existsSync(dist)) throw new Error(`Racine introuvable : ${dist}. Lance npm run build.`);

  const spots = opts.spots ? SPOTS.filter((s) => opts.spots.includes(s.nom)) : SPOTS;
  const dossier = join(racine, "sitaly.fr-audit/mobile", opts.sortie);
  await mkdir(dossier, { recursive: true });

  const playwright = chargerPlaywright();
  // L'un après l'autre, jamais les deux : deux WebKit en même temps ont déjà
  // coupé un run sur cette machine.
  const dejaLa = (cote) =>
    Object.fromEntries(
      spots.map((s) => {
        const fichier = join(dossier, `${cote}-${s.nom}.png`);
        return [s.nom, existsSync(fichier) ? { fichier } : { erreur: "capture absente" }];
      }),
    );
  const avant = opts.montage
    ? dejaLa("avant")
    : await capturerUnCote(playwright, opts.avant, "avant", spots, dossier);
  const apres = opts.montage
    ? dejaLa("apres")
    : await capturerUnCote(playwright, opts.apres, "apres", spots, dossier);
  const sorties = await composer(playwright, spots, avant, apres, dossier);

  await writeFile(
    join(dossier, "index.json"),
    JSON.stringify({ avant: opts.avant, apres: opts.apres, spots, sorties }, null, 2),
  );
  process.stdout.write(
    `\n${sorties.length}/${spots.length} comparaisons — sitaly.fr-audit/mobile/${opts.sortie}/\n`,
  );
  process.exitCode = sorties.length === spots.length ? 0 : 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
