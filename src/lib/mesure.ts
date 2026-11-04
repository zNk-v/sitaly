/**
 * Mesure des demandes de contact dans GA4.
 *
 * Jusqu'ici, rien ne disait quelle page produisait des clients : le
 * formulaire ouvrait la messagerie du visiteur et les clics sur le téléphone
 * ou le Calendly n'étaient pas comptés. Trois événements suffisent :
 *
 * - `generate_lead` : un formulaire a bien été transmis ;
 * - `click_tel` : clic sur un numéro de téléphone ;
 * - `click_calendly` : clic vers la prise de rendez-vous.
 *
 * Dans GA4, marquer `generate_lead` et `click_calendly` comme événements clés.
 *
 * Le consentement reste géré par le mode de consentement déjà en place
 * (`__root.tsx`) : gtag décide lui-même de ce qu'il envoie selon le choix du
 * visiteur. Ce module ne fait qu'émettre les événements.
 */

type Gtag = (commande: "event", nom: string, params?: Record<string, unknown>) => void;

export function suivreEvenement(nom: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", nom, { page_location: window.location.href, ...params });
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

/**
 * Un seul écouteur pour tout le site, posé sur le document : les liens `tel:`
 * et Calendly sont répartis dans une vingtaine de composants, et les annoter
 * un par un en oublierait toujours un.
 */
export function suivreClicsDeContact(): () => void {
  if (typeof document === "undefined") return () => {};
  const auClic = (event: MouseEvent) => {
    const cible = event.target as Element | null;
    const lien = cible?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!lien) return;
    const href = lien.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) {
      suivreEvenement("click_tel", { link_url: href });
    } else if (href.includes("calendly.com")) {
      suivreEvenement("click_calendly", { link_url: href });
    }
  };
  document.addEventListener("click", auClic, { capture: true });
  return () => document.removeEventListener("click", auClic, { capture: true });
}

/**
 * La mesure d'audience de Sitaly (4 novembre 2026), sans cookie : chaque
 * page vue part à la fonction mesure de l'app (Supabase), qui n'en garde
 * qu'une empreinte du jour, effacée le lendemain. Exemptée de consentement
 * par la CNIL, elle compte aussi les visiteurs qui refusent les cookies de
 * GA4. Toutes les minutes, tant que l'onglet est visible, un « battement »
 * alimente le direct du tableau de bord. Rien ne part en local.
 */
// Depuis le 5 novembre 2026, la balise passe par mesure.sitaly.fr (programme des sites
// de l'app), qui ajoute le pays et la ville lus par Cloudflare avant la fonction mesure.
const MESURE = "https://mesure.sitaly.fr/v";
let premiereVue = true;

function envoyerMesure(corps: Record<string, unknown>): void {
  try {
    const donnees = new Blob([JSON.stringify({ s: "sitaly.fr", ...corps })], { type: "text/plain" });
    if (!navigator.sendBeacon?.(MESURE, donnees)) void fetch(MESURE, { method: "POST", body: donnees, keepalive: true }).catch(() => {});
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

const mesureActive = () => typeof window !== "undefined" && /(^|\.)sitaly\.fr$/.test(window.location.hostname);

export function compterVue(chemin: string): void {
  if (!mesureActive()) return;
  envoyerMesure({ p: chemin, r: premiereVue ? document.referrer : null, q: premiereVue ? window.location.search : undefined });
  premiereVue = false;
}

/** Le battement de présence ; renvoie de quoi l'arrêter. */
export function battreMesure(): () => void {
  if (!mesureActive()) return () => {};
  const minuterie = window.setInterval(() => {
    if (document.visibilityState === "visible") envoyerMesure({ b: true });
  }, 60_000);
  return () => window.clearInterval(minuterie);
}
