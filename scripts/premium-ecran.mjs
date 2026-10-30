// Pose le site d'un métier sur l'écran blanc d'une image-clé de la page Premium.
//
//   node scripts/premium-ecran.mjs medias-premium/k01-garage-paysage.png
//     [--metier garagiste] [--largeur 1280] [--coins x,y,x,y,x,y,x,y]
//
// 1. Repère l'écran : la plus grande zone blanche et neutre qui ne touche pas
//    le bord de l'image et remplit son quadrilatère ; les côtés sont ajustés
//    par droites, pour que les coins arrondis de l'écran ne tirent pas les
//    coins vers l'intérieur.
// 2. Capture la maquette du métier sur /site-premium/ (serveur de dév sur le
//    port 3000), à la proportion apparente de l'écran.
// 3. La pose en perspective (matrix3d, fusion « produit » pour garder la
//    lumière de la scène) et écrit <image>-ecran.png, plus une image de
//    contrôle dans medias-premium/controle/.
// Les coins vont dans medias-premium/ecrans.json : la page s'en sert pour
// poser le site en HTML pendant la pause.
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";

const args = process.argv.slice(2);
const option = (nom) => {
  const i = args.indexOf(`--${nom}`);
  return i === -1 ? undefined : args[i + 1];
};
const entree = resolve(
  args.find((a) => a.endsWith(".png") || a.endsWith(".jpg") || a.endsWith(".webp")),
);
const racine = resolve(dirname(new URL(import.meta.url).pathname), "..");
const dossier = join(racine, "medias-premium");
const storyboard = JSON.parse(readFileSync(join(dossier, "storyboard.json"), "utf8"));
const cle = (storyboard.images ?? storyboard.cles).find((k) =>
  new RegExp(`^${k.fichier}[-.]`).test(basename(entree)),
);
const metier = option("metier") ?? cle?.metier;
if (!metier) throw new Error(`Métier introuvable pour ${basename(entree)} : passez --metier.`);
const sortie = entree.replace(/\.(png|jpg|webp)$/, "-ecran.png");
const SITE = process.env.SITE ?? "http://localhost:3000/site-premium/";

// Petit serveur pour les fichiers : un canvas refuse de lire une image file://.
const fichiers = new Map();
const serveur = createServer((req, res) => {
  const f = fichiers.get(req.url);
  if (!f) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": f.type }).end(f.corps);
});
await new Promise((r) => serveur.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${serveur.address().port}`;
const typeImage = entree.endsWith(".jpg")
  ? "image/jpeg"
  : entree.endsWith(".webp")
    ? "image/webp"
    : "image/png";
fichiers.set("/cle", { type: typeImage, corps: readFileSync(entree) });

// Chrome sans fenêtre, piloté par le protocole DevTools.
const port = 9300 + Math.floor(Math.random() * 500);
const profil = mkdtempSync(join(tmpdir(), "chrome-ecran-"));
const chrome = spawn(
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profil}`,
    "--hide-scrollbars",
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" },
);
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
let cibles;
for (let i = 0; i < 50; i++) {
  try {
    cibles = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    if (cibles.find((t) => t.type === "page")) break;
  } catch {}
  await attendre(200);
}
const ws = new WebSocket(cibles.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let n = 0;
const enAttente = new Map();
const chargees = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && enAttente.has(d.id)) {
    enAttente.get(d.id)(d);
    enAttente.delete(d.id);
  } else if (d.method === "Page.loadEventFired") chargees.splice(0).forEach((r) => r());
};
const cdp = (method, params = {}) =>
  new Promise((r, rej) => {
    const i = ++n;
    enAttente.set(i, (d) =>
      d.error ? rej(new Error(`${method} : ${d.error.message}`)) : r(d.result),
    );
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const evaluer = async (expression) => {
  const r = await cdp("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails)
    throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
};
const ouvrir = async (url) => {
  const charge = new Promise((r) => chargees.push(r));
  await cdp("Page.navigate", { url });
  await charge;
};
const taille = (largeur, hauteur, echelle = 1) =>
  cdp("Emulation.setDeviceMetricsOverride", {
    width: largeur,
    height: hauteur,
    deviceScaleFactor: echelle,
    mobile: false,
  });
await cdp("Page.enable");

try {
  // 1. L'écran blanc.
  fichiers.set("/vide", { type: "text/html", corps: "<!doctype html><body style=margin:0>" });
  await taille(800, 600);
  await ouvrir(`${base}/vide`);
  const reperage = await evaluer(
    `(${reperer.toString()})(${JSON.stringify(option("coins") ?? null)})`,
  );
  if (!reperage.coins)
    throw new Error(
      `Aucun écran blanc trouvé (${reperage.raison}). Passez --coins x,y,x,y,x,y,x,y (haut-gauche, haut-droite, bas-droite, bas-gauche).`,
    );
  const { coins, largeurImage, hauteurImage } = reperage;
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const rapport =
    (dist(coins[0], coins[1]) + dist(coins[3], coins[2])) /
    (dist(coins[0], coins[3]) + dist(coins[1], coins[2]));
  const largeurSite =
    Number(option("largeur")) || (rapport >= 1 ? 1280 : rapport > 0.62 ? 820 : 390);
  const hauteurSite = Math.round(largeurSite / rapport);

  // 2. La maquette, à la proportion de l'écran, en mode galerie (état final).
  await cdp("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await taille(largeurSite, hauteurSite, 2);
  await ouvrir(SITE);
  await attendre(1500);
  await evaluer(`(async () => {
    await document.fonts.ready;
    const s = document.createElement("style");
    s.textContent = \`
      html, body { visibility: hidden !important; overflow: hidden !important; }
      #metier-${metier} .vitrine-ecran {
        visibility: visible !important; position: fixed !important; inset: 0 auto auto 0 !important;
        width: ${largeurSite}px !important; height: ${hauteurSite}px !important; aspect-ratio: auto !important;
        margin: 0 !important; border: 0 !important; border-radius: 0 !important;
        transform: none !important; opacity: 1 !important; z-index: 2147483647 !important;
      }
      #metier-${metier} .vitrine-ecran * { visibility: visible !important; }\`;
    document.head.append(s);
    if (!document.querySelector("#metier-${metier} .vitrine-ecran")) throw new Error("Maquette introuvable : ${metier}");
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  })()`);
  await attendre(300);
  const capture = await cdp("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width: largeurSite, height: hauteurSite, scale: 1 },
  });
  fichiers.set("/site", { type: "image/png", corps: Buffer.from(capture.data, "base64") });

  // 3. La pose, puis l'image de contrôle.
  const marge = (c) => {
    // Un pixel de plus vers l'extérieur, pour couvrir le liseré antialiasé.
    const cx = coins.reduce((s, p) => s + p[0], 0) / 4;
    const cy = coins.reduce((s, p) => s + p[1], 0) / 4;
    return c.map(([x, y]) => {
      const d = Math.hypot(x - cx, y - cy);
      return [x + ((x - cx) / d) * 1.5, y + ((y - cy) / d) * 1.5];
    });
  };
  const matrice = quadMatrix3d(largeurSite, hauteurSite, marge(coins));
  await cdp("Emulation.setEmulatedMedia", { features: [] });
  await taille(largeurImage, hauteurImage, 1);
  const page = (controle) => `<!doctype html><body style="margin:0;overflow:hidden">
    <div style="position:relative;width:${largeurImage}px;height:${hauteurImage}px;isolation:isolate">
      <img src="/cle" style="position:absolute;inset:0;width:100%;height:100%">
      <img src="/site" width="${largeurSite}" height="${hauteurSite}"
        style="position:absolute;left:0;top:0;transform-origin:0 0;transform:${matrice};mix-blend-mode:multiply">
      ${
        controle
          ? `<svg width="${largeurImage}" height="${hauteurImage}" style="position:absolute;inset:0">
        <polygon points="${coins.map((p) => p.join(",")).join(" ")}" fill="none" stroke="#ff2d55" stroke-width="3"/></svg>`
          : ""
      }
    </div>`;
  for (const controle of [false, true]) {
    fichiers.set("/pose", { type: "text/html", corps: page(controle) });
    await ouvrir(`${base}/pose`);
    await evaluer("Promise.all([...document.images].map((i) => i.decode()))");
    const r = await cdp("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 0, width: largeurImage, height: hauteurImage, scale: 1 },
    });
    if (controle) {
      mkdirSync(join(dossier, "controle"), { recursive: true });
      writeFileSync(join(dossier, "controle", basename(sortie)), Buffer.from(r.data, "base64"));
    } else writeFileSync(sortie, Buffer.from(r.data, "base64"));
  }

  const registre = join(dossier, "ecrans.json");
  const ecrans = existsSync(registre) ? JSON.parse(readFileSync(registre, "utf8")) : {};
  ecrans[basename(entree)] = {
    metier,
    image: [largeurImage, hauteurImage],
    coins: coins.map((p) => p.map((v) => Math.round(v * 10) / 10)),
    site: [largeurSite, hauteurSite],
  };
  writeFileSync(registre, JSON.stringify(ecrans, null, 2) + "\n");
  console.log(
    `${basename(sortie)} : ${metier}, écran ${largeurSite} × ${hauteurSite}, coins ${JSON.stringify(ecrans[basename(entree)].coins)}`,
  );
} finally {
  ws.close();
  chrome.kill();
  serveur.close();
}

// Exécutée dans la page : lit /cle et rend les quatre coins de l'écran blanc.
function reperer(coinsForces) {
  return new Promise((fin) => {
    const img = new Image();
    img.onload = () => {
      const L = img.naturalWidth,
        H = img.naturalHeight;
      if (coinsForces) {
        const v = coinsForces.split(",").map(Number);
        return fin({
          coins: [0, 2, 4, 6].map((i) => [v[i], v[i + 1]]),
          largeurImage: L,
          hauteurImage: H,
        });
      }
      const c = document.createElement("canvas");
      c.width = L;
      c.height = H;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const px = ctx.getImageData(0, 0, L, H).data;
      let raison = "aucune zone blanche assez rectangulaire";
      // Plusieurs seuils : un écran généré n'est pas toujours d'un blanc pur, et
      // son éclairage peut griser un côté. On garde la plus grande zone valide.
      let retenue = null;
      for (const seuil of [235, 220, 205, 190, 175]) {
        const masque = new Uint8Array(L * H);
        for (let i = 0; i < L * H; i++) {
          const r = px[i * 4],
            g = px[i * 4 + 1],
            b = px[i * 4 + 2];
          const mn = Math.min(r, g, b),
            mx = Math.max(r, g, b);
          masque[i] = mn >= seuil && mx - mn <= 36 ? 1 : 0;
        }
        // Composantes connexes (4-voisins).
        const etiquette = new Int32Array(L * H);
        const pile = new Int32Array(L * H);
        let meilleure = null;
        let num = 0;
        for (let depart = 0; depart < L * H; depart++) {
          if (!masque[depart] || etiquette[depart]) continue;
          num++;
          let haut = 0,
            aire = 0,
            bord = false;
          let tl = [0, 0, Infinity],
            br = [0, 0, -Infinity],
            tr = [0, 0, -Infinity],
            bl = [0, 0, Infinity];
          pile[haut++] = depart;
          etiquette[depart] = num;
          while (haut) {
            const p = pile[--haut];
            const x = p % L,
              y = (p / L) | 0;
            aire++;
            if (x === 0 || y === 0 || x === L - 1 || y === H - 1) bord = true;
            if (x + y < tl[2]) tl = [x, y, x + y];
            if (x + y > br[2]) br = [x, y, x + y];
            if (x - y > tr[2]) tr = [x, y, x - y];
            if (x - y < bl[2]) bl = [x, y, x - y];
            for (const q of [p - 1, p + 1, p - L, p + L]) {
              if (q < 0 || q >= L * H || etiquette[q] || !masque[q]) continue;
              if ((q === p - 1 && x === 0) || (q === p + 1 && x === L - 1)) continue;
              etiquette[q] = num;
              pile[haut++] = q;
            }
          }
          if (aire < L * H * 0.004 || bord) continue;
          const quad = [tl, tr, br, bl].map((p) => [p[0], p[1]]);
          let s = 0;
          for (let i = 0; i < 4; i++) {
            const [x1, y1] = quad[i],
              [x2, y2] = quad[(i + 1) % 4];
            s += x1 * y2 - x2 * y1;
          }
          const remplissage = aire / Math.abs(s / 2);
          if (remplissage < 0.82 || remplissage > 1.08) continue;
          if (!meilleure || aire > meilleure.aire) meilleure = { num, aire, quad };
        }
        if (meilleure && (!retenue || meilleure.aire > retenue.meilleure.aire))
          retenue = { meilleure, etiquette, seuil };
      }
      if (retenue) {
        const { meilleure, etiquette, seuil } = retenue;
        // Ajustement des côtés : droites passant par le contour, loin des coins.
        const contour = [];
        for (let y = 1; y < H - 1; y++)
          for (let x = 1; x < L - 1; x++) {
            const p = y * L + x;
            if (etiquette[p] !== meilleure.num) continue;
            if (
              etiquette[p - 1] !== meilleure.num ||
              etiquette[p + 1] !== meilleure.num ||
              etiquette[p - L] !== meilleure.num ||
              etiquette[p + L] !== meilleure.num
            )
              contour.push([x + 0.5, y + 0.5]);
          }
        const q = meilleure.quad;
        const droites = [];
        for (let i = 0; i < 4; i++) {
          const a = q[i],
            b = q[(i + 1) % 4];
          const dx = b[0] - a[0],
            dy = b[1] - a[1],
            l2 = dx * dx + dy * dy,
            l = Math.sqrt(l2);
          const pts = contour.filter(([x, y]) => {
            const t = ((x - a[0]) * dx + (y - a[1]) * dy) / l2;
            const d = Math.abs((x - a[0]) * dy - (y - a[1]) * dx) / l;
            return t > 0.15 && t < 0.85 && d < Math.max(4, l * 0.03);
          });
          if (pts.length < 10) {
            droites.push(null);
            continue;
          }
          const mx = pts.reduce((s, p) => s + p[0], 0) / pts.length,
            my = pts.reduce((s, p) => s + p[1], 0) / pts.length;
          let sxx = 0,
            syy = 0,
            sxy = 0;
          for (const [x, y] of pts) {
            sxx += (x - mx) ** 2;
            syy += (y - my) ** 2;
            sxy += (x - mx) * (y - my);
          }
          const angle = 0.5 * Math.atan2(2 * sxy, sxx - syy);
          droites.push({ p: [mx, my], d: [Math.cos(angle), Math.sin(angle)] });
        }
        const coins = q.map((coin, i) => {
          const d1 = droites[(i + 3) % 4],
            d2 = droites[i];
          if (!d1 || !d2) return coin;
          const det = d1.d[0] * -d2.d[1] - d1.d[1] * -d2.d[0];
          if (Math.abs(det) < 1e-6) return coin;
          const rx = d2.p[0] - d1.p[0],
            ry = d2.p[1] - d1.p[1];
          const t = (rx * -d2.d[1] - ry * -d2.d[0]) / det;
          return [d1.p[0] + t * d1.d[0], d1.p[1] + t * d1.d[1]];
        });
        return fin({ coins, largeurImage: L, hauteurImage: H, seuil });
      }
      fin({ coins: null, raison });
    };
    img.onerror = () => fin({ coins: null, raison: "image illisible" });
    img.src = "/cle";
  });
}

// Matrice CSS qui envoie le rectangle (0,0)-(w,h) sur les coins [hg, hd, bd, bg].
function quadMatrix3d(w, h, dst) {
  const src = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  const A = [],
    b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i],
      [u, v] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  for (let c = 0; c < 8; c++) {
    let m = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r;
    [A[c], A[m]] = [A[m], A[c]];
    [b[c], b[m]] = [b[m], b[c]];
    for (let r = c + 1; r < 8; r++) {
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  const x = Array(8);
  for (let r = 7; r >= 0; r--) {
    let s = b[r];
    for (let k = r + 1; k < 8; k++) s -= A[r][k] * x[k];
    x[r] = s / A[r][r];
  }
  const [a, bb, c, d, e, f, g, hh] = x;
  return `matrix3d(${[a, d, 0, g, bb, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1].map((v) => +v.toFixed(10)).join(",")})`;
}
