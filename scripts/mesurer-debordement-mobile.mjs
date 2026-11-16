/**
 * Mesure le débordement horizontal de toutes les pages du sitemap, sur les largeurs
 * de téléphone courantes (320 à 414 px).
 *
 * Pourquoi ce script : le 16/11/2026 Ted signalait « on doit slider de gauche à droite
 * pour lire les infos du site ». Un débordement d'un seul pixel suffit à rendre la page
 * glissante, et il vient presque toujours d'un composant partagé, pas de la page où on
 * le remarque. Le script sert donc à deux choses : dire quelles pages débordent, et
 * nommer l'élément fautif pour corriger le composant une seule fois.
 *
 * Critère, celui de la tâche SITA-28 :
 *     document.documentElement.scrollWidth <= window.innerWidth
 *
 * Usage :
 *     npm run build                                   # le script lit dist/client
 *     node scripts/mesurer-debordement-mobile.mjs
 *     node scripts/mesurer-debordement-mobile.mjs --sortie=apres --chat
 *
 * Options :
 *     --sortie=<nom>     nom du rapport dans sitaly.fr-audit/mobile/ (défaut : rapport)
 *     --largeurs=320,390 largeurs à tester (défaut : 320,360,375,390,414)
 *     --pages=/,/tarifs/ ne tester que ces chemins
 *     --liste=<fichier>  lire les chemins dans un fichier, un par ligne
 *                        (scripts/pages-les-plus-vues.txt pour la passe courte)
 *     --chat             rouvre aussi chaque page bulle de chat ouverte
 *     --captures=/,/tarifs/  enregistre une capture pleine hauteur à 390 px
 *     --dist=<chemin>    racine servie (défaut : dist/client)
 *
 * Chromium : celui de Playwright, en mode sans interface, avec un profil jetable et
 * sans accès au trousseau (consigne de Ted du 16/11 : un Chrome lancé par le service
 * de fond fait surgir « Trousseau introuvable » sur son écran).
 */
import { createRequire } from "node:module";
import { createReadStream, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const LARGEURS_PAR_DEFAUT = [320, 360, 375, 390, 414];
const HAUTEUR = 844;

/* ------------------------------------------------------------------ arguments */

function lireArguments(argv) {
  const opts = {
    sortie: "rapport",
    largeurs: LARGEURS_PAR_DEFAUT,
    pages: null,
    liste: null,
    chat: false,
    captures: [],
    dist: join(racine, "dist/client"),
    moteur: "webkit",
    parallele: 4,
  };
  for (const arg of argv) {
    if (arg === "--chat") opts.chat = true;
    else if (arg.startsWith("--moteur=")) opts.moteur = arg.slice(9);
    else if (arg.startsWith("--parallele=")) opts.parallele = Math.max(1, Number(arg.slice(12)));
    else if (arg.startsWith("--sortie=")) opts.sortie = arg.slice(9);
    else if (arg.startsWith("--largeurs="))
      opts.largeurs = arg
        .slice(11)
        .split(",")
        .map((n) => Number(n.trim()))
        .filter(Boolean);
    else if (arg.startsWith("--pages=")) opts.pages = arg.slice(8).split(",").filter(Boolean);
    else if (arg.startsWith("--liste=")) opts.liste = resolve(racine, arg.slice(8));
    else if (arg.startsWith("--captures="))
      opts.captures = arg.slice(11).split(",").filter(Boolean);
    else if (arg.startsWith("--dist=")) opts.dist = resolve(racine, arg.slice(7));
  }
  return opts;
}

/* -------------------------------------------------------------------- sitemap */

/** Chemins des pages du sitemap, dans l'ordre du fichier. */
async function cheminsDuSitemap() {
  const xml = await readFile(join(racine, "public/sitemap.xml"), "utf8");
  const chemins = [];
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const chemin = new URL(m[1]).pathname;
    if (!chemins.includes(chemin)) chemins.push(chemin);
  }
  return chemins;
}

/**
 * Chemins lus dans un fichier, un par ligne, `#` pour un commentaire.
 *
 * Pourquoi : mesurer les 134 pages du sitemap à cinq largeurs sature cette
 * machine (le run du 16/11 à 22 h 50 s'est coupé en pleine passe). La liste
 * courte de `scripts/pages-les-plus-vues.txt` garde une page par famille de
 * gabarit, ce qui suffit à surveiller les composants partagés.
 */
async function cheminsDuFichier(fichier) {
  const texte = await readFile(fichier, "utf8");
  return texte
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

/* --------------------------------------------------------- serveur statique */

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
  ".md": "text/markdown; charset=utf-8",
};

/** Sert dist/client comme GitHub Pages : /x/ → x/index.html, 404.html en secours. */
function servirDist(dist) {
  const serveur = createServer((req, res) => {
    let chemin = decodeURIComponent(req.url.split("?")[0]);
    let fichier = join(dist, chemin);
    if (chemin.endsWith("/")) fichier = join(fichier, "index.html");
    else if (!extname(fichier) && existsSync(join(fichier, "index.html")))
      fichier = join(fichier, "index.html");
    if (!existsSync(fichier) || !fichier.startsWith(dist)) {
      const secours = join(dist, "404.html");
      if (existsSync(secours)) {
        res.writeHead(404, { "content-type": TYPES[".html"] });
        createReadStream(secours).pipe(res);
        return;
      }
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

/* ------------------------------------------------------------------ Chromium */

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
      "  mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright && npx playwright install chromium\n" +
      "  PLAYWRIGHT_MODULE=/tmp/pw/node_modules/playwright node scripts/mesurer-debordement-mobile.mjs",
  );
}

/* ------------------------------------------------------------------- mesures */

/**
 * Exécuté dans la page. Renvoie l'écart de largeur et les éléments fautifs.
 * On remonte au plus petit ancêtre fautif pour désigner le composant, pas le texte.
 */
const MESURE = () => {
  const vue = window.innerWidth;
  const html = document.documentElement;

  /**
   * Le test que fait vraiment le pouce de Ted : on pousse la page à droite et
   * on regarde si elle a bougé. `scrollWidth` ignore certains débordements que
   * Safari laisse pourtant balayer, à commencer par ceux des blocs `fixed`.
   */
  const avant = window.scrollX;
  window.scrollTo(9999, window.scrollY);
  const glisse = Math.round(window.scrollX);
  window.scrollTo(avant, window.scrollY);

  /** Vrai si un ancêtre rogne ou fait défiler l'élément : son débordement est tenu. */
  const tenuParUnAncetre = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") {
        const r = p.getBoundingClientRect();
        // L'ancêtre ne tient le débordement que s'il reste lui-même dans l'écran.
        if (r.right <= vue + 1 && r.left >= -1) return true;
      }
    }
    return false;
  };

  const coupables = [];
  const vus = new Set();
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") continue;
    const depasse = Math.max(r.right - vue, -r.left);
    if (depasse <= 1) continue;
    // Un carrousel déborde par construction : ses diapositives sont rognées par
    // leur piste. Ne sont fautifs que les blocs que personne ne rattrape.
    if (tenuParUnAncetre(el)) continue;
    // Un élément fautif dont le parent déborde déjà autant n'ajoute rien : on garde
    // l'ancêtre le plus haut pour chaque signature, c'est lui qui porte la cause.
    const signature = [
      el.tagName.toLowerCase(),
      el.className && typeof el.className === "string" ? el.className.slice(0, 160) : "",
      Math.round(depasse),
    ].join("|");
    if (vus.has(signature)) continue;
    vus.add(signature);
    coupables.push({
      balise: el.tagName.toLowerCase(),
      classes: typeof el.className === "string" ? el.className : "",
      texte: (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 70),
      depasse: Math.round(depasse),
      largeur: Math.round(r.width),
      gauche: Math.round(r.left),
      overflowX: style.overflowX,
      position: style.position,
    });
  }
  coupables.sort((a, b) => b.depasse - a.depasse);

  /**
   * Les glissières : un bloc qui défile dans son coin. La page ne bouge pas, donc
   * `scrollWidth` la déclare saine, et pourtant Ted doit bien glisser du doigt pour
   * lire la fin de la ligne. Un carrousel assume ce geste, un tableau le subit :
   * `snap-x` sépare les deux.
   */
  const glissieres = [];
  for (const el of document.querySelectorAll("body *")) {
    const style = getComputedStyle(el);
    if (!["auto", "scroll"].includes(style.overflowX)) continue;
    if (el.scrollWidth <= el.clientWidth + 1) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || style.visibility === "hidden") continue;
    const classes = typeof el.className === "string" ? el.className : "";
    glissieres.push({
      balise: el.tagName.toLowerCase(),
      classes,
      texte: (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 70),
      cache: el.scrollWidth - el.clientWidth,
      carrousel: /snap-x|snap-mandatory/.test(classes),
      tableau: Boolean(el.querySelector("table")) || el.tagName === "TABLE",
    });
  }
  glissieres.sort((a, b) => b.cache - a.cache);

  /** Corps de texte sous 16 px : c'est ce qui force à zoomer, donc à glisser. */
  const petitTexte = [];
  for (const el of document.querySelectorAll("p, li, dd, dt, td, th, figcaption, blockquote")) {
    const propre = (el.textContent ?? "").trim();
    if (propre.length < 40) continue;
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") continue;
    const taille = Number.parseFloat(style.fontSize);
    if (taille >= 15.5) continue;
    petitTexte.push({
      balise: el.tagName.toLowerCase(),
      classes: typeof el.className === "string" ? el.className : "",
      taille: Math.round(taille * 10) / 10,
      texte: propre.replace(/\s+/g, " ").slice(0, 60),
    });
  }

  /** Zones à toucher sous 44 px : la cible du pouce, pas celle de la souris. */
  const petitesCibles = [];
  for (const el of document.querySelectorAll(
    'a, button, [role="button"], input, select, summary',
  )) {
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") continue;
    if (el.type === "hidden") continue;
    // Ni le pouce ni le clavier n'atteignent ces éléments : le pot de miel du
    // formulaire d'`/agents-ia/` est un `input` posé à -9999 px, `aria-hidden`
    // et `tabindex="-1"`. Le mesurer n'apprend rien.
    if (el.closest('[aria-hidden="true"]') || el.getAttribute("tabindex") === "-1") continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // Une case à cocher dessine un carré de 16 px, mais c'est son `label` qu'on
    // touche : cocher en appuyant sur le texte est le comportement du
    // navigateur, pas une astuce. La cible, c'est donc le label.
    if (["checkbox", "radio"].includes(el.type)) {
      const etiquette =
        el.closest("label") ?? (el.id ? document.querySelector(`label[for="${el.id}"]`) : null);
      if (etiquette && etiquette.getBoundingClientRect().height >= 44) continue;
    }
    // Un lien au fil d'une phrase n'est pas une zone à toucher : il suit la
    // ligne, et lui donner 44 px de haut décalerait l'interligne de la phrase.
    // Pour qu'il devienne une cible, il faut d'abord qu'il quitte la ligne —
    // c'est ce qu'on a fait du pied de page des pages légales.
    //
    // Deux conditions : le lien coule dans la ligne (`display: inline`, donc un
    // `block` ou un `inline-flex` posé exprès reste une cible), et le bloc qui
    // le porte écrit autre chose que lui. Le test cherche le plus proche
    // ancêtre de bloc plutôt qu'une liste de balises, parce que les pages
    // légales et les articles enveloppent leurs liens dans des `span`.
    //
    // « Autre chose que lui » se prend au pied de la lettre : « Source : Tarifs
    // Wix » ne laisse que neuf caractères autour du lien, et c'est pourtant une
    // phrase. À l'inverse, `<li><a>Google Chrome</a></li>` n'en laisse aucun :
    // le lien est seul, donc il doit se toucher.
    if (el.tagName === "A" && style.display === "inline") {
      let bloc = el.parentElement;
      while (bloc && !["block", "flow-root", "list-item"].includes(getComputedStyle(bloc).display))
        bloc = bloc.parentElement;
      const autour = (bloc?.textContent ?? "").trim().length;
      if (bloc && autour > (el.textContent ?? "").trim().length) continue;
    }
    if (r.height >= 44 && r.width >= 24) continue;
    petitesCibles.push({
      balise: el.tagName.toLowerCase(),
      classes: typeof el.className === "string" ? el.className : "",
      hauteur: Math.round(r.height),
      largeur: Math.round(r.width),
      texte: (el.textContent ?? el.getAttribute("aria-label") ?? "").trim().slice(0, 40),
    });
  }

  /**
   * Champs de saisie sous 16 px. C'est la cause que Ted a vue sur le chat
   * (commentaire du 16/11) : sous 16 px, Safari iOS zoome la page entière au
   * premier toucher du champ, et le zoom reste — la page devient glissante
   * jusqu'à ce qu'on la dézoome à la main. Seuls `input`, `textarea` et
   * `select` déclenchent ce zoom ; un bouton, même petit, ne le fait pas.
   */
  const champs = [];
  for (const el of document.querySelectorAll("input, textarea, select")) {
    if (el.type === "hidden") continue;
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const taille = Number.parseFloat(style.fontSize);
    if (taille >= 16) continue;
    champs.push({
      balise: el.tagName.toLowerCase(),
      classes: typeof el.className === "string" ? el.className : "",
      type: el.getAttribute("type") ?? "",
      taille: Math.round(taille * 10) / 10,
      hauteur: Math.round(r.height),
      texte: (el.getAttribute("placeholder") ?? el.getAttribute("aria-label") ?? "").slice(0, 40),
    });
  }

  return {
    vue,
    scrollWidth: html.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    glisse,
    deborde: html.scrollWidth > vue || glisse > 0,
    ecart: Math.max(html.scrollWidth - vue, glisse),
    // 60 et non 12 : à douze par page et par largeur, corriger les douze
    // premiers faisait apparaître les suivants à la passe d'après, sans que
    // rien ne dise qu'il en restait. On préfère un rapport long et complet.
    coupables: coupables.slice(0, 60),
    glissieres: glissieres.slice(0, 60),
    petitTexte: petitTexte.slice(0, 60),
    petitesCibles: petitesCibles.slice(0, 60),
    champs: champs.slice(0, 60),
  };
};

/**
 * Touche le champ du chat ouvert, comme Ted le fait pour écrire sa question.
 * Le clavier monte, la fenêtre rapetisse, le panneau se remet en page : c'est
 * le moment où l'affichage se déréglait. Renvoie true si un champ a reçu le
 * toucher.
 *
 * Le champ de `Fil.tsx` est un `input`, pas un `textarea` : la première version
 * de ce script ne cherchait qu'un `textarea` et ne touchait donc jamais rien.
 */
async function toucherLeChampDuChat(page) {
  const champ = page
    .locator('[role="dialog"] form input, [role="dialog"] textarea, [data-chat-panneau] input')
    .first();
  if (!(await attendreLaPresence(champ))) return false;
  try {
    await champ.click({ timeout: 2500 });
    await page.waitForTimeout(400);
    return true;
  } catch {
    return false;
  }
}

/**
 * Attend qu'un élément existe, jusqu'à `delai` ms. Renvoie false à l'épuisement.
 *
 * `count()` seul ne suffit pas : `__root.tsx` charge `BulleChat` en `lazy()`,
 * donc le bouton n'existe qu'une fois son morceau de code arrivé. Compter tout
 * de suite renvoyait zéro, et la colonne « chat » du rapport restait vide sans
 * que rien ne signale l'absence de mesure.
 */
async function attendreLaPresence(locator, delai = 4000) {
  try {
    await locator.waitFor({ state: "attached", timeout: delai });
    return true;
  } catch {
    return false;
  }
}

/** Ouvre la bulle de chat si elle est présente. Renvoie true si elle s'est ouverte. */
async function ouvrirLeChat(page) {
  const bouton = page
    .locator(
      'button[aria-label*="chat" i], button[aria-label*="Discuter" i], button[aria-label*="assistant" i], [data-chat-ouvrir]',
    )
    .first();
  if (!(await attendreLaPresence(bouton))) return false;
  try {
    await bouton.click({ timeout: 2500 });
    await page.waitForTimeout(500);
    return true;
  } catch {
    return false;
  }
}

/**
 * Descend jusqu'en bas puis remonte : les blocs animés à l'affichage se posent,
 * et leur état final est le seul qui compte.
 *
 * `scroll-behavior: smooth` est neutralisé le temps du parcours : sinon chaque
 * saut s'anime et une page longue prend des minutes au lieu d'une seconde.
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
 * Une seule navigation par page, puis un changement de largeur par mesure.
 * Recharger cinq fois la même page coûtait vingt minutes sur le sitaly complet,
 * et la mise en page ne dépend que du CSS : le redimensionnement suffit.
 */
async function mesurerUnePage(page, url, largeurs, avecChat) {
  const resultats = {};
  await page.setViewportSize({ width: largeurs[0], height: HAUTEUR });
  await page.goto(url, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(200);
  for (const largeur of largeurs) {
    await page.setViewportSize({ width: largeur, height: HAUTEUR });
    await page.waitForTimeout(120);
    await derouler(page);
    resultats[largeur] = await page.evaluate(MESURE);
  }
  if (avecChat) {
    // Le chat se mesure à part, à 390 px : s'il refuse de s'ouvrir, la page
    // suivante ne doit pas en souffrir. D'où le rechargement qui suit.
    await page.setViewportSize({ width: 390, height: HAUTEUR });
    try {
      const ouvert = await ouvrirLeChat(page);
      // Une bulle qui ne s'ouvre pas est un résultat, pas un trou : le rapport
      // le dit, au lieu d'afficher le même tiret qu'une page sans chat.
      resultats.chat = ouvert ? await page.evaluate(MESURE) : { erreur: "bulle introuvable" };
      if (ouvert) {
        if (await toucherLeChampDuChat(page)) {
          // Le clavier de l'iPhone prend environ la moitié de l'écran, et aucun
          // navigateur sans interface ne le fait monter : on rapetisse la fenêtre
          // à sa place. 390 × 400, c'est ce qu'il reste à voir quand on écrit.
          await page.setViewportSize({ width: 390, height: 400 });
          await page.waitForTimeout(250);
          resultats.chatChamp = await page.evaluate(MESURE);
          await page.setViewportSize({ width: 390, height: HAUTEUR });
        } else {
          resultats.chatChamp = { erreur: "champ introuvable" };
        }
      }
    } catch (err) {
      resultats.chat = resultats.chat ?? { erreur: String(err.message ?? err) };
    }
  }
  return resultats;
}

/* -------------------------------------------------------------------- rapport */

/** Vrai dès qu'une largeur, ou le chat ouvert, déborde. */
function debordeQuelquePart(par, largeurs) {
  if (par.erreur) return false;
  return (
    largeurs.some((l) => par[l]?.deborde) ||
    Boolean(par.chat?.deborde) ||
    Boolean(par.chatChamp?.deborde)
  );
}

/** La case d'une mesure : `ok`, l'écart, ou le signe qu'il n'y avait rien à mesurer. */
function caseMesure(m) {
  if (!m) return "–";
  if (m.erreur) return "erreur";
  return m.deborde ? `**+${m.ecart}**` : "ok";
}

function tableau(mesures, largeurs, avecChat) {
  const colonnes = [
    ...largeurs.map((l) => `${l} px`),
    ...(avecChat ? ["chat 390 px", "chat + champ"] : []),
  ];
  const lignes = [
    `| Page | ${colonnes.join(" | ")} |`,
    `|---|${colonnes.map(() => "---").join("|")}|`,
  ];
  for (const [chemin, par] of Object.entries(mesures)) {
    if (par.erreur) {
      lignes.push(`| \`${chemin}\` | ${colonnes.map(() => "erreur").join(" | ")} |`);
      continue;
    }
    const cases = largeurs.map((l) => (par[l] ? caseMesure(par[l]) : "?"));
    if (avecChat) cases.push(caseMesure(par.chat), caseMesure(par.chatChamp));
    lignes.push(`| \`${chemin}\` | ${cases.join(" | ")} |`);
  }
  return lignes.join("\n");
}

function coupablesRegroupes(mesures) {
  const parSignature = new Map();
  for (const [chemin, par] of Object.entries(mesures)) {
    for (const [largeur, m] of Object.entries(par)) {
      for (const source of [m].filter((s) => s && s.coupables)) {
        if (!source.deborde) continue;
        for (const c of source.coupables) {
          const cle = `${c.balise}.${c.classes}`;
          const e = parSignature.get(cle) ?? {
            balise: c.balise,
            classes: c.classes,
            texte: c.texte,
            pages: new Set(),
            largeurs: new Set(),
            depasseMax: 0,
          };
          e.pages.add(chemin);
          e.largeurs.add(largeur === "chat" ? "chat" : Number(largeur));
          e.depasseMax = Math.max(e.depasseMax, c.depasse);
          parSignature.set(cle, e);
        }
      }
    }
  }
  return [...parSignature.values()]
    .sort((a, b) => b.pages.size - a.pages.size || b.depasseMax - a.depasseMax)
    .map((e) => ({ ...e, pages: [...e.pages], largeurs: [...e.largeurs] }));
}

/**
 * Regroupe un relevé par signature d'élément, toutes pages et largeurs confondues.
 * `cle` nomme le composant, `valeur` donne le chiffre à retenir (px cachés, taille…).
 */
function regrouper(mesures, champ, valeur) {
  const par = new Map();
  for (const [chemin, mesuresPage] of Object.entries(mesures)) {
    for (const m of Object.values(mesuresPage)) {
      if (!m || !m[champ]) continue;
      for (const item of m[champ]) {
        const cle = `${item.balise}.${item.classes}`;
        const e = par.get(cle) ?? { ...item, pages: new Set(), pire: 0 };
        e.pages.add(chemin);
        e.pire = Math.max(e.pire, valeur(item));
        par.set(cle, e);
      }
    }
  }
  return [...par.values()]
    .sort((a, b) => b.pages.size - a.pages.size || b.pire - a.pire)
    .map((e) => ({ ...e, pages: [...e.pages] }));
}

/** Une section « du plus répandu au plus rare », ou rien si le relevé est vide. */
/**
 * Une section « du plus répandu au plus rare ». Le titre porte le compte, et
 * la liste s'arrête à 60 : couper en silence donnait l'illusion d'avoir fini.
 */
function section(titre, items, ligne) {
  if (!items.length) return [`## ${titre}`, "", "Rien à signaler.", ""];
  const montres = items.slice(0, 60);
  return [
    `## ${titre} — ${items.length}`,
    "",
    ...montres.map(ligne),
    ...(items.length > montres.length ? [`- …et ${items.length - montres.length} autres.`] : []),
    "",
  ];
}

const nomme = (c) =>
  `\`${c.balise}\` ${c.classes ? `\`${c.classes.slice(0, 120)}\`` : "(sans classe)"}`;

/* ---------------------------------------------------------------------- main */

async function main() {
  const opts = lireArguments(process.argv.slice(2));
  if (!existsSync(join(opts.dist, "index.html")))
    throw new Error(`${opts.dist} est vide : lance d'abord \`npm run build\`.`);

  const playwright = chargerPlaywright();
  // WebKit par défaut : c'est le moteur de l'iPhone, et c'est sur son iPhone que
  // Ted fait glisser la page. Chromium reste disponible pour comparer.
  const lanceur = playwright[opts.moteur];
  if (!lanceur) throw new Error(`Moteur inconnu : ${opts.moteur} (chromium ou webkit)`);
  const chemins =
    opts.pages ?? (opts.liste ? await cheminsDuFichier(opts.liste) : await cheminsDuSitemap());
  const serveur = await servirDist(opts.dist);
  const base = `http://127.0.0.1:${serveur.address().port}`;
  const profil = await mkdtemp(join(tmpdir(), "sitaly-mesure-"));

  const OPTIONS_CONTEXTE = {
    viewport: { width: opts.largeurs[0], height: HAUTEUR },
    deviceScaleFactor: 2,
    isMobile: opts.moteur === "chromium",
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  };
  // Chromium reçoit le profil jetable et les options du trousseau (consigne de
  // Ted) ; Playwright refuse un `--user-data-dir` passé dans `args`.
  const navigateur =
    opts.moteur === "chromium"
      ? await lanceur.launchPersistentContext(profil, {
          headless: true,
          args: [
            "--headless=new",
            "--use-mock-keychain",
            "--password-store=basic",
            "--hide-scrollbars",
          ],
          ...OPTIONS_CONTEXTE,
        })
      : await lanceur.launch({ headless: true });
  const contexte =
    opts.moteur === "chromium" ? navigateur : await navigateur.newContext(OPTIONS_CONTEXTE);

  const mesures = {};
  let debordantes = 0;
  let suivant = 0;
  let faits = 0;

  // Un onglet par fil : 133 pages × 5 largeurs en série prenaient trois quarts
  // d'heure, le temps passant à attendre le réseau local plutôt qu'à mesurer.
  async function fil() {
    const page = await contexte.newPage();
    while (suivant < chemins.length) {
      const chemin = chemins[suivant++];
      try {
        mesures[chemin] = await mesurerUnePage(page, base + chemin, opts.largeurs, opts.chat);
        const ko = debordeQuelquePart(mesures[chemin], opts.largeurs);
        if (ko) debordantes++;
        process.stdout.write(
          `${String(++faits).padStart(3)}/${chemins.length} ${ko ? "DÉBORDE" : "ok     "} ${chemin}\n`,
        );
      } catch (err) {
        mesures[chemin] = { erreur: String(err.message ?? err) };
        process.stdout.write(
          `${String(++faits).padStart(3)}/${chemins.length} ERREUR  ${chemin}\n`,
        );
      }
    }
    await page.close();
  }
  await Promise.all(Array.from({ length: Math.min(opts.parallele, chemins.length) }, fil));

  const page = await contexte.newPage();
  if (opts.captures.length) {
    const dossier = join(racine, "sitaly.fr-audit/mobile/captures", opts.sortie);
    await mkdir(dossier, { recursive: true });
    await page.setViewportSize({ width: 390, height: HAUTEUR });
    for (const chemin of opts.captures) {
      await page.goto(base + chemin, { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(600);
      const nom = chemin.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "accueil";
      await page.screenshot({ path: join(dossier, `${nom}-390.png`), fullPage: true });
      process.stdout.write(`capture ${nom}-390.png\n`);
    }
  }

  await contexte.close();
  if (navigateur !== contexte) await navigateur.close();
  serveur.close();
  await rm(profil, { recursive: true, force: true });

  const dossier = join(racine, "sitaly.fr-audit/mobile");
  await mkdir(dossier, { recursive: true });
  const coupables = coupablesRegroupes(mesures);
  const glissieres = regrouper(mesures, "glissieres", (g) => g.cache);
  const petitTexte = regrouper(mesures, "petitTexte", (t) => -t.taille);
  const petitesCibles = regrouper(mesures, "petitesCibles", (c) => -c.hauteur);
  const champs = regrouper(mesures, "champs", (c) => -c.taille);
  await writeFile(
    join(dossier, `${opts.sortie}.json`),
    JSON.stringify(
      {
        date: new Date().toISOString(),
        opts: { ...opts },
        mesures,
        coupables,
        glissieres,
        petitTexte,
        petitesCibles,
        champs,
      },
      null,
      2,
    ),
  );
  const md = [
    `# Débordement horizontal sur téléphone — ${opts.sortie}`,
    "",
    `${chemins.length} pages, largeurs ${opts.largeurs.join(", ")} px${opts.chat ? ", chat ouvert inclus" : ""}.`,
    `**${debordantes} page(s) débordent.**`,
    "",
    "`ok` = `scrollWidth <= innerWidth`. Sinon, l'écart en pixels.",
    "",
    tableau(mesures, opts.largeurs, opts.chat),
    "",
    "## Éléments fautifs, du plus répandu au plus rare",
    "",
    ...(coupables.length
      ? coupables
          .slice(0, 40)
          .map(
            (c) =>
              `- ${nomme(c)} — ${c.pages.length} page(s), jusqu'à +${c.depasseMax} px` +
              (c.texte ? ` — « ${c.texte} »` : ""),
          )
      : ["Rien à signaler."]),
    "",
    ...section(
      "Blocs qui défilent dans leur coin (hors carrousels assumés)",
      glissieres.filter((g) => !g.carrousel),
      (g) =>
        `- ${nomme(g)} — ${g.pages.length} page(s), ${g.pire} px hors écran` +
        (g.tableau ? " — tableau" : "") +
        (g.texte ? ` — « ${g.texte} »` : ""),
    ),
    ...section(
      "Champs de saisie sous 16 px (Safari iOS zoome au premier toucher)",
      champs,
      (c) =>
        `- ${nomme(c)}${c.type ? ` type=\`${c.type}\`` : ""} — ${c.pages.length} page(s), ${c.taille} px, ${c.hauteur} px de haut` +
        (c.texte ? ` — « ${c.texte} »` : ""),
    ),
    ...section(
      "Corps de texte sous 16 px",
      petitTexte,
      (t) => `- ${nomme(t)} — ${t.pages.length} page(s), ${t.taille} px — « ${t.texte} »`,
    ),
    ...section(
      "Zones à toucher sous 44 px de haut",
      petitesCibles,
      (c) =>
        `- ${nomme(c)} — ${c.pages.length} page(s), ${c.hauteur}×${c.largeur} px` +
        (c.texte ? ` — « ${c.texte} »` : ""),
    ),
  ].join("\n");
  await writeFile(join(dossier, `${opts.sortie}.md`), md);
  process.stdout.write(
    `\n${debordantes}/${chemins.length} pages débordent — sitaly.fr-audit/mobile/${opts.sortie}.md\n`,
  );
  process.exitCode = debordantes > 0 ? 1 : 0;
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
