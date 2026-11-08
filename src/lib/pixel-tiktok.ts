/**
 * Le pixel TikTok (8 novembre 2026). La campagne visait les ouvertures de page :
 * TikTok ne savait pas qui cliquait sur « Créer mon site », et trouvait des gens
 * qui cliquent sans rester. Le pixel lui donne ce signal.
 *
 * Rien ne part avant l'accord du visiteur au bandeau cookies : le script n'est
 * même pas chargé. Un refus coupe le pixel et efface ses cookies.
 */
const PIXEL_ID = "DBOCH1BC77UBQ4PDPB60";

type Ttq = {
  load: (id: string) => void;
  page: () => void;
  track: (evenement: string, proprietes?: Record<string, unknown>) => void;
  revokeConsent: () => void;
};

declare global {
  interface Window {
    ttq?: Ttq;
    TiktokAnalyticsObject?: string;
  }
}

let actif = false;
let dernierChemin: string | null = null;

const surSitaly = () => typeof window !== "undefined" && /(^|\.)sitaly\.fr$/.test(window.location.hostname);

/* Le code de base donné par TikTok, gardé tel quel : il met les appels en file
   jusqu'à l'arrivée du script. */
function poserLeCodeTiktok(id: string) {
  /* eslint-disable */
  (function (w: any, d: Document, t: string) {
    w.TiktokAnalyticsObject = t;
    const ttq: any = (w[t] = w[t] || []);
    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
    ttq.setAndDefer = function (o: any, e: string) {
      o[e] = function () {
        o.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance = function (n: string) {
      const e = ttq._i[n] || [];
      for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(e, ttq.methods[i]);
      return e;
    };
    ttq.load = function (e: string, n?: any) {
      const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i = ttq._i || {};
      ttq._i[e] = [];
      ttq._i[e]._u = r;
      ttq._t = ttq._t || {};
      ttq._t[e] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[e] = n || {};
      const s = d.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = r + "?sdkid=" + e + "&lib=" + t;
      const p = d.getElementsByTagName("script")[0];
      p.parentNode!.insertBefore(s, p);
    };
    ttq.load(id);
  })(window, document, "ttq");
  /* eslint-enable */
}

/** Appelé quand le visiteur a accepté les cookies (ou l'avait déjà fait). */
export function activerPixelTiktok(): void {
  if (!PIXEL_ID || actif || !surSitaly()) return;
  try {
    poserLeCodeTiktok(PIXEL_ID);
    window.ttq?.page();
    actif = true;
    dernierChemin = window.location.pathname;
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

/** Appelé au refus : plus rien ne part, et les cookies de TikTok disparaissent. */
export function couperPixelTiktok(): void {
  if (!surSitaly()) return;
  try {
    window.ttq?.revokeConsent?.();
  } catch {
    // La mesure ne doit jamais casser la page.
  }
  actif = false;
  for (const nom of ["_ttp", "_tt_enable_cookie", "ttcsid"]) {
    for (const domaine of ["", "; domain=.sitaly.fr"]) document.cookie = `${nom}=; Max-Age=0; path=/${domaine}`;
  }
}

/** Une page vue à chaque changement d'adresse. */
export function pageTiktok(chemin: string): void {
  if (!actif || chemin === dernierChemin) return;
  dernierChemin = chemin;
  try {
    window.ttq?.page();
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

/** Le signal de la campagne : le visiteur part créer son site dans l'app. */
export function departVersAppTiktok(origine: string): void {
  if (!actif) return;
  try {
    window.ttq?.track("ClickButton", { content_name: "creer_mon_site", description: origine });
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

/** Un seul écouteur pour tous les liens vers l'app, sauf la connexion des clients. */
export function suivreDepartsVersApp(): () => void {
  if (typeof document === "undefined") return () => {};
  const auClic = (event: MouseEvent) => {
    const lien = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!lien || lien.hostname !== "app.sitaly.fr" || lien.pathname.startsWith("/connexion")) return;
    departVersAppTiktok("lien");
  };
  document.addEventListener("click", auClic, { capture: true });
  return () => document.removeEventListener("click", auClic, { capture: true });
}
