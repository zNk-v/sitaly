import { useEffect, useState } from "react";
import { APP_URL } from "@/lib/config";

/**
 * Le bandeau fin du Black Friday, tout en haut du site (19 novembre 2026).
 *
 * Le code PARTENAIRE-1MOIS se saisit dans le champ « Ajouter un code promo »
 * du paiement Stripe, sur l'abonnement au mois : il offre la première facture.
 * Le bandeau s'efface seul le 1er décembre 2026 à minuit, heure de Paris.
 * Un clic sur le code le copie, pour qu'il n'y ait rien à retaper.
 */
export const CODE_PROMO = "PARTENAIRE-1MOIS";
const FIN = Date.parse("2026-12-01T00:00:00+01:00");
const LIEN = `${APP_URL}/creer?utm_source=site&utm_medium=bandeau&utm_campaign=black-friday`;

export function promoActive(maintenant = Date.now()) {
  return maintenant < FIN;
}

export function BandeauPromo() {
  const [copie, setCopie] = useState(false);
  // Le rendu serveur ne connaît pas l'heure du visiteur : on revérifie la date dans le navigateur.
  const [visible, setVisible] = useState(promoActive());
  useEffect(() => setVisible(promoActive()), []);
  if (!visible) return null;

  async function copier() {
    try {
      await navigator.clipboard.writeText(CODE_PROMO);
      setCopie(true);
      window.setTimeout(() => setCopie(false), 2000);
    } catch {
      /* Sans presse-papiers, le code reste lisible à l'écran. */
    }
  }

  return (
    <div className="bandeau-promo pointer-events-auto flex h-8 items-center justify-center gap-2 bg-[#0d0f14] px-3 text-[12.5px] leading-none text-white sm:gap-3 sm:text-[13px]">
      <span className="truncate">
        <strong className="font-semibold">Black Friday</strong>
        <span className="hidden sm:inline"> : votre premier mois offert avec le code</span>
        <span className="sm:hidden"> : 1er mois offert</span>
      </span>
      <button
        type="button"
        onClick={copier}
        className="shrink-0 rounded-md border border-white/30 px-1.5 py-1 font-mono text-[11.5px] tracking-wide hover:bg-white/10"
        aria-label={`Copier le code ${CODE_PROMO}`}
      >
        {copie ? "Copié ✓" : CODE_PROMO}
      </button>
      <a
        href={LIEN}
        className="hidden shrink-0 font-semibold underline underline-offset-2 sm:inline"
      >
        J'en profite →
      </a>
    </div>
  );
}
