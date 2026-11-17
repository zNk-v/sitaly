/**
 * Mesure le rythme de défilement des pages sur téléphone : combien d'écrans fait
 * chaque section, quelles grilles s'empilent en longues colonnes, quelles images
 * sont trop lourdes pour 390 px, et si les éléments collants se gênent.
 *
 * Pourquoi ce script : le 16/11/2026 Ted demandait « que le site soit plus sympa
 * à scroller sur mobile » (SITA-31). « Sympa » se mesure : une idée par écran,
 * des sections courtes, des cartes qui défilent de côté au lieu de s'empiler,
 * et zéro saut de mise en page. Le script donne les chiffres avant de toucher au
 * code, puis sert de contrôle après chaque commit.
 *
 * Moteur : WebKit de Playwright, c'est le moteur de Safari sur iPhone, et sur
 * SITA-28 c'est lui qui a vu les débordements que Chromium cachait. Pas de
 * Chrome lancé d'ici (consigne de Ted du 16/11 : le trousseau manquant fait
 * surgir une fenêtre sur son écran).
 *
 * Usage :
 *     npm run build
 *     node scripts/mesurer-rythme-mobile.mjs --sortie=avant
 *
 * Options :
 *     --sortie=<nom>       dossier du rapport dans sitaly.fr-audit/mobile-scroll/ (défaut : avant)
 *     --largeurs=320,390   largeurs testées (défaut : 320,390)
 *     --pages=/,/tarifs/   chemins à mesurer (défaut : les pages prioritaires de SITA-31)
 *     --captures           enregistre la page entière et un découpage écran par écran à 390 px
 *     --dist=<chemin>      racine servie (défaut : dist/client)
 */
import { createRequire } from "node:module";
import { createReadStream, existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Les pages du parcours, de l'accueil à l'inscription (description de SITA-31). */
const PAGES_PAR_DEFAUT = [
  "/",
  "/tarifs/",
  "/modeles/plombier/",
  "/creer-site-internet-artisan/",
  "/logiciel-devis-factures-artisan/",
];

const HAUTEUR = 844; // iPhone 14 : 390 x 844
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
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function lireArguments(argv) {
  const opts = {
    sortie: "avant",
    largeurs: [320, 390],
    pages: [...PAGES_PAR_DEFAUT],
    captures: false,
    dist: join(racine, "dist/client"),
  };
  for (const arg of argv) {
    if (arg === "--captures") opts.captures = true;
    else if (arg.startsWith("--sortie=")) opts.sortie = arg.slice(9);
    else if (arg.startsWith("--largeurs="))
      opts.largeurs = arg.slice(11).split(",").map(Number).filter(Boolean);
    else if (arg.startsWith("--pages=")) opts.pages = arg.slice(8).split(",").filter(Boolean);
    else if (arg.startsWith("--dist=")) opts.dist = resolve(racine, arg.slice(7));
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

/**
 * Playwright et ses navigateurs vivent hors du dépôt, installés une fois pour
 * SITA-28 : `.paperclip/playwright/pw` pour le module, `navigateurs` pour WebKit.
 */
const NAVIGATEURS = "/Users/vidalozzi/sitaly/.paperclip/playwright/navigateurs";

function chargerPlaywright() {
  if (!process.env.PLAYWRIGHT_BROWSERS_PATH && existsSync(NAVIGATEURS))
    process.env.PLAYWRIGHT_BROWSERS_PATH = NAVIGATEURS;
  const require = createRequire(import.meta.url);
  const pistes = [
    process.env.PLAYWRIGHT_MODULE,
    join(racine, ".paperclip/playwright/pw/node_modules/playwright"),
    "/Users/vidalozzi/sitaly/.paperclip/playwright/pw/node_modules/playwright",
    "playwright",
    "playwright-core",
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
      "  PLAYWRIGHT_MODULE=/chemin/node_modules/playwright node scripts/mesurer-rythme-mobile.mjs",
  );
}

/** Descend puis remonte : les blocs qui apparaissent au défilement se posent. */
async function derouler(page) {
  await page.evaluate(async () => {
    const avant = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    const pas = Math.round(window.innerHeight / 2);
    const max = Math.min(document.body.scrollHeight, pas * 80);
    for (let y = 0; y < max; y += pas) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r()));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 120));
    document.documentElement.style.scrollBehavior = avant;
  });
}

/**
 * Tout ce qui se lit dans le navigateur. Une seule fonction évaluée dans la page :
 * sections et leur hauteur en écrans, grilles empilées, images surdimensionnées,
 * éléments collants et leurs chevauchements, blocs de texte longs.
 */
function mesurerDansLaPage() {
  const vue = { l: window.innerWidth, h: window.innerHeight };
  const ecrans = (px) => Math.round((px / vue.h) * 100) / 100;
  const texte = (el) => (el.innerText || "").replace(/\s+/g, " ").trim();

  /** Les sections de premier niveau : ce que le visiteur perçoit comme « un bloc ». */
  const racines = [...document.querySelectorAll("section, footer, header")].filter(
    (el) => !el.closest("section section, footer section"),
  );
  const sections = racines
    .map((el, i) => {
      const r = el.getBoundingClientRect();
      const haut = Math.round(r.top + window.scrollY);
      const titre = el.querySelector("h1, h2");
      const paragraphes = [...el.querySelectorAll("p")].map((p) => texte(p).length);
      return {
        rang: i,
        balise: el.tagName.toLowerCase(),
        id: el.id || null,
        haut,
        hauteur: Math.round(r.height),
        ecrans: ecrans(r.height),
        titre: titre ? texte(titre).slice(0, 90) : null,
        titreLongueur: titre ? texte(titre).length : 0,
        caracteres: texte(el).length,
        paragrapheLePlusLong: paragraphes.length ? Math.max(...paragraphes) : 0,
        paragraphesLongs: paragraphes.filter((n) => n > 280).length,
      };
    })
    .filter((s) => s.hauteur > 40);

  /**
   * Les grilles qui s'empilent : au moins trois enfants directs, posés les uns
   * sous les autres (même gauche), sans défilement horizontal. Ce sont les
   * candidates au carrousel à arrêts de SITA-31.
   */
  const grilles = [];
  for (const el of document.querySelectorAll("div, ul, ol")) {
    const enfants = [...el.children].filter((c) => c.getBoundingClientRect().height > 30);
    if (enfants.length < 3) continue;
    const r = el.getBoundingClientRect();
    if (r.height < vue.h * 1.2) continue;
    const rects = enfants.map((c) => c.getBoundingClientRect());
    const memeColonne = rects.every((x) => Math.abs(x.left - rects[0].left) < 8);
    const empile = rects.every((x, i) => i === 0 || x.top >= rects[i - 1].bottom - 8);
    if (!memeColonne || !empile) continue;
    const style = getComputedStyle(el);
    grilles.push({
      selecteur:
        el.tagName.toLowerCase() +
        (el.className && typeof el.className === "string"
          ? "." + el.className.trim().split(/\s+/).slice(0, 4).join(".")
          : ""),
      haut: Math.round(r.top + window.scrollY),
      cartes: enfants.length,
      hauteur: Math.round(r.height),
      ecrans: ecrans(r.height),
      hauteurCarte: Math.round(rects[0].height),
      snap: style.scrollSnapType !== "none" ? style.scrollSnapType : null,
      defilementX: style.overflowX === "auto" || style.overflowX === "scroll",
    });
  }

  /** Les images : trop grandes pour la largeur rendue, ou sans taille réservée. */
  const images = [...document.querySelectorAll("img")].map((img) => {
    const r = img.getBoundingClientRect();
    const haut = Math.round(r.top + window.scrollY);
    return {
      src: (img.currentSrc || img.src || "").split("/").slice(-1)[0],
      haut,
      sousLaLigne: haut > vue.h,
      rendu: [Math.round(r.width), Math.round(r.height)],
      naturel: [img.naturalWidth, img.naturalHeight],
      surdimension:
        r.width > 0 && img.naturalWidth
          ? Math.round((img.naturalWidth / (r.width * (window.devicePixelRatio || 2))) * 100) / 100
          : null,
      lazy: img.loading === "lazy",
      tailleReservee: Boolean(img.getAttribute("width") && img.getAttribute("height")),
      decoding: img.getAttribute("decoding"),
      fetchpriority: img.getAttribute("fetchpriority"),
    };
  });

  /** Les éléments collants : barre d'activité, bulle de chat, bandeau cookies. */
  const collants = [...document.querySelectorAll("body *")]
    .filter((el) => {
      const p = getComputedStyle(el).position;
      return p === "fixed" || p === "sticky";
    })
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 8 && r.height > 8 && getComputedStyle(el).visibility !== "hidden";
    })
    .map((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        selecteur:
          el.tagName.toLowerCase() +
          (el.className && typeof el.className === "string"
            ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
            : ""),
        position: s.position,
        zIndex: s.zIndex,
        rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
        role: el.getAttribute("aria-label") || el.getAttribute("role") || null,
      };
    });

  /** Deux éléments collants qui se recouvrent gênent le pouce : on les nomme. */
  const chevauchements = [];
  for (let i = 0; i < collants.length; i += 1) {
    for (let j = i + 1; j < collants.length; j += 1) {
      const [ax, ay, aw, ah] = collants[i].rect;
      const [bx, by, bw, bh] = collants[j].rect;
      const x = Math.min(ax + aw, bx + bw) - Math.max(ax, bx);
      const y = Math.min(ay + ah, by + bh) - Math.max(ay, by);
      if (x > 4 && y > 4)
        chevauchements.push({
          a: collants[i].selecteur,
          b: collants[j].selecteur,
          surface: Math.round(x * y),
        });
    }
  }

  /** Les conteneurs qui défilent déjà de côté : ont-ils des arrêts ? */
  const rails = [...document.querySelectorAll("div, ul")]
    .filter((el) => {
      const s = getComputedStyle(el);
      return (
        (s.overflowX === "auto" || s.overflowX === "scroll") && el.scrollWidth > el.clientWidth + 8
      );
    })
    .map((el) => {
      const s = getComputedStyle(el);
      return {
        selecteur:
          el.tagName.toLowerCase() +
          (el.className && typeof el.className === "string"
            ? "." + el.className.trim().split(/\s+/).slice(0, 4).join(".")
            : ""),
        haut: Math.round(el.getBoundingClientRect().top + window.scrollY),
        largeurDefilement: el.scrollWidth,
        snap: s.scrollSnapType !== "none" ? s.scrollSnapType : null,
        enfantsAvecSnap: [...el.children].filter(
          (c) => getComputedStyle(c).scrollSnapAlign !== "none",
        ).length,
        enfants: el.children.length,
      };
    });

  /** Le premier pas vers l'app : où tombe le premier champ ou bouton d'inscription. */
  const appels = [...document.querySelectorAll("a, button, input, textarea")]
    .filter((el) => {
      const t = texte(el).toLowerCase();
      const href = (el.getAttribute("href") || "").toLowerCase();
      return (
        href.includes("app.sitaly.fr") ||
        el.tagName === "TEXTAREA" ||
        /gratuit|commencer|créer mon site|essayer|inscri/.test(t)
      );
    })
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        texte: texte(el).slice(0, 48) || el.getAttribute("placeholder") || el.tagName.toLowerCase(),
        haut: Math.round(r.top + window.scrollY),
        ecran: ecrans(Math.round(r.top + window.scrollY)),
        hauteurTactile: Math.round(r.height),
      };
    })
    .sort((a, b) => a.haut - b.haut);

  /** Les polices : une police sans `font-display: swap` clignote au chargement. */
  const polices = [];
  for (const feuille of document.styleSheets) {
    let regles;
    try {
      regles = feuille.cssRules;
    } catch {
      continue;
    }
    for (const regle of regles || []) {
      if (regle.constructor.name === "CSSFontFaceRule" || regle.type === 5) {
        polices.push({
          famille: regle.style.getPropertyValue("font-family"),
          display: regle.style.getPropertyValue("font-display") || "(aucun)",
        });
      }
    }
  }

  return {
    vue,
    hauteurTotale: document.documentElement.scrollHeight,
    ecransTotal: ecrans(document.documentElement.scrollHeight),
    debordementX: document.documentElement.scrollWidth - vue.l,
    sections,
    grillesEmpilees: grilles
      .sort((a, b) => b.ecrans - a.ecrans)
      .filter(
        (g, i, tout) =>
          // une grille imbriquée dans une autre déjà listée n'ajoute rien
          !tout.some((autre, j) => j < i && Math.abs(autre.haut - g.haut) < 24),
      )
      .slice(0, 12),
    images,
    imagesSurdimensionnees: images.filter((i) => i.surdimension && i.surdimension > 1.5).length,
    imagesSousLaLigneSansLazy: images.filter((i) => i.sousLaLigne && !i.lazy).length,
    imagesSansTaille: images.filter((i) => !i.tailleReservee).length,
    collants,
    chevauchements,
    rails,
    appels: appels.slice(0, 8),
    polices,
  };
}

async function mesurerPage(contexte, base, chemin, largeur, opts, dossierCaptures) {
  const page = await contexte.newPage();
  await page.setViewportSize({ width: largeur, height: HAUTEUR });

  /** Le poids réellement téléchargé, par type : utile pour le chargement différé. */
  const octets = { total: 0, image: 0, script: 0, css: 0, police: 0, media: 0 };
  page.on("response", (reponse) => {
    const longueur = Number(reponse.headers()["content-length"] || 0);
    if (!longueur) return;
    octets.total += longueur;
    const url = reponse.url();
    const ext = extname(url.split("?")[0]).toLowerCase();
    if ([".webp", ".png", ".jpg", ".jpeg", ".avif", ".svg", ".ico"].includes(ext))
      octets.image += longueur;
    else if ([".js", ".mjs"].includes(ext)) octets.script += longueur;
    else if (ext === ".css") octets.css += longueur;
    else if ([".woff", ".woff2"].includes(ext)) octets.police += longueur;
    else if ([".mp4", ".webm"].includes(ext)) octets.media += longueur;
  });

  await page.goto(base + chemin, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(400);

  /** Premier relevé, sans avoir déroulé : ce que le visiteur reçoit à l'arrivée. */
  const arrivee = await page.evaluate(() => ({
    hauteur: document.documentElement.scrollHeight,
    imagesChargees: [...document.images].filter((i) => i.complete && i.naturalWidth > 0).length,
    images: document.images.length,
  }));

  await derouler(page);
  await page.waitForTimeout(250);
  const mesure = await page.evaluate(mesurerDansLaPage);

  /**
   * Le saut de mise en page, approché : WebKit n'expose pas `layout-shift`, donc
   * on compare la hauteur du document à l'arrivée et après déroulement. Un écart
   * veut dire que du contenu a poussé le reste pendant la lecture.
   */
  mesure.sautHauteur = mesure.hauteurTotale - arrivee.hauteur;
  mesure.octets = octets;
  mesure.chemin = chemin;
  mesure.largeur = largeur;

  if (opts.captures && largeur === 390) {
    const nom = chemin === "/" ? "accueil" : chemin.replace(/^\/|\/$/g, "").replace(/\//g, "-");
    await mkdir(join(dossierCaptures, nom), { recursive: true });
    await page.screenshot({
      path: join(dossierCaptures, nom, "entier.png"),
      fullPage: true,
    });
    /** Écran par écran : c'est là qu'on voit si une idée tient dans un écran. */
    const total = Math.min(Math.ceil(mesure.hauteurTotale / HAUTEUR), 14);
    for (let i = 0; i < total; i += 1) {
      await page.evaluate((y) => window.scrollTo(0, y), i * HAUTEUR);
      await page.waitForTimeout(220);
      await page.screenshot({ path: join(dossierCaptures, nom, `ecran-${String(i + 1).padStart(2, "0")}.png`) });
    }
  }

  await page.close();
  return mesure;
}

function rendreMarkdown(mesures, opts) {
  const l = [];
  l.push("# Rythme de défilement sur téléphone — mesures brutes");
  l.push("");
  l.push(
    `Relevé du ${new Date().toISOString().slice(0, 10)}, WebKit sans interface, ` +
      `largeurs ${opts.largeurs.join(" et ")} px, hauteur ${HAUTEUR} px, sur \`dist/client\`.`,
  );
  l.push("");
  l.push("## Vue d'ensemble");
  l.push("");
  l.push("| Page | Largeur | Écrans | Hauteur | Débordement X | Saut de hauteur | Octets | dont images |");
  l.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const m of mesures) {
    l.push(
      `| \`${m.chemin}\` | ${m.largeur} | **${m.ecransTotal}** | ${m.hauteurTotale} px | ${m.debordementX} px | ${m.sautHauteur} px | ${Math.round(m.octets.total / 1024)} ko | ${Math.round(m.octets.image / 1024)} ko |`,
    );
  }
  l.push("");
  for (const m of mesures.filter((x) => x.largeur === 390)) {
    l.push(`## \`${m.chemin}\` à 390 px`);
    l.push("");
    l.push(`${m.ecransTotal} écrans, ${m.sections.length} sections de premier niveau.`);
    l.push("");
    l.push("### Sections, de haut en bas");
    l.push("");
    l.push("| # | Section | Écrans | Titre | Caractères | Paragraphe le plus long |");
    l.push("| --- | --- | --- | --- | --- | --- |");
    for (const s of m.sections) {
      l.push(
        `| ${s.rang} | ${s.id ? `#${s.id}` : s.balise} | ${s.ecrans} | ${s.titre ? `${s.titre.slice(0, 44)} (${s.titreLongueur})` : "—"} | ${s.caracteres} | ${s.paragrapheLePlusLong} |`,
      );
    }
    l.push("");
    if (m.grillesEmpilees.length) {
      l.push("### Grilles empilées (candidates au carrousel)");
      l.push("");
      l.push("| Écrans | Cartes | Hauteur carte | Arrêts | Sélecteur |");
      l.push("| --- | --- | --- | --- | --- |");
      for (const g of m.grillesEmpilees)
        l.push(
          `| ${g.ecrans} | ${g.cartes} | ${g.hauteurCarte} px | ${g.snap ?? "aucun"} | \`${g.selecteur}\` |`,
        );
      l.push("");
    }
    if (m.rails.length) {
      l.push("### Rails horizontaux existants");
      l.push("");
      for (const r of m.rails)
        l.push(
          `- \`${r.selecteur}\` à ${r.haut} px : arrêts \`${r.snap ?? "aucun"}\`, ${r.enfantsAvecSnap}/${r.enfants} enfants alignés`,
        );
      l.push("");
    }
    const grosses = m.images
      .filter((i) => i.surdimension && i.surdimension > 1.5)
      .sort((a, b) => b.surdimension - a.surdimension)
      .slice(0, 10);
    if (grosses.length) {
      l.push("### Images trop grandes pour 390 px");
      l.push("");
      l.push("| Fichier | Rendu | Naturel | Surdimension | Différé | Taille réservée |");
      l.push("| --- | --- | --- | --- | --- | --- |");
      for (const i of grosses)
        l.push(
          `| ${i.src} | ${i.rendu.join("×")} | ${i.naturel.join("×")} | ×${i.surdimension} | ${i.lazy ? "oui" : "non"} | ${i.tailleReservee ? "oui" : "non"} |`,
        );
      l.push("");
    }
    l.push(
      `Images : ${m.images.length} au total, ${m.imagesSurdimensionnees} surdimensionnées, ` +
        `${m.imagesSousLaLigneSansLazy} sous la ligne de flottaison sans \`loading="lazy"\`, ` +
        `${m.imagesSansTaille} sans largeur/hauteur réservées.`,
    );
    l.push("");
    if (m.collants.length) {
      l.push("### Éléments collants");
      l.push("");
      for (const c of m.collants)
        l.push(
          `- \`${c.selecteur}\` (${c.position}, z-index ${c.zIndex}) : x ${c.rect[0]}, y ${c.rect[1]}, ${c.rect[2]}×${c.rect[3]} px${c.role ? ` — ${c.role}` : ""}`,
        );
      if (m.chevauchements.length) {
        l.push("");
        l.push("Chevauchements :");
        for (const ch of m.chevauchements)
          l.push(`- \`${ch.a}\` et \`${ch.b}\` se recouvrent sur ${ch.surface} px²`);
      }
      l.push("");
    }
    if (m.appels.length) {
      l.push("### Pas vers l'app");
      l.push("");
      for (const a of m.appels)
        l.push(`- « ${a.texte} » à ${a.haut} px (écran ${a.ecran}), cible ${a.hauteurTactile} px`);
      l.push("");
    }
    if (m.polices.length) {
      l.push(
        `Polices : ${m.polices.map((p) => `${p.famille} → ${p.display}`).join(", ")}`,
      );
      l.push("");
    }
  }
  return l.join("\n");
}

async function main() {
  const opts = lireArguments(process.argv.slice(2));
  if (!existsSync(opts.dist)) throw new Error(`${opts.dist} manquant : lance d'abord npm run build`);
  const playwright = chargerPlaywright();
  const serveur = await servirDist(opts.dist);
  const base = `http://127.0.0.1:${serveur.address().port}`;
  const dossier = join(racine, "sitaly.fr-audit/mobile-scroll", opts.sortie);
  await mkdir(dossier, { recursive: true });

  const navigateur = await playwright.webkit.launch({ headless: true });
  const contexte = await navigateur.newContext({
    viewport: { width: opts.largeurs[0], height: HAUTEUR },
    deviceScaleFactor: 2,
    hasTouch: true,
    isMobile: false, // WebKit de Playwright refuse isMobile
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    locale: "fr-FR",
  });

  const mesures = [];
  try {
    for (const chemin of opts.pages) {
      for (const largeur of opts.largeurs) {
        process.stdout.write(`${chemin} à ${largeur} px… `);
        const m = await mesurerPage(
          contexte,
          base,
          chemin,
          largeur,
          opts,
          join(dossier, "captures"),
        );
        mesures.push(m);
        console.log(`${m.ecransTotal} écrans, débordement ${m.debordementX} px`);
      }
    }
  } finally {
    await contexte.close();
    await navigateur.close();
    serveur.close();
  }

  await writeFile(join(dossier, "mesures.json"), JSON.stringify(mesures, null, 2));
  await writeFile(join(dossier, "mesures.md"), rendreMarkdown(mesures, opts));
  console.log(`\nRapport : sitaly.fr-audit/mobile-scroll/${opts.sortie}/mesures.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
