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
