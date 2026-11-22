import { useEffect, useState } from "react";
import { APP_URL } from "@/lib/config";
import { BLACK_FRIDAY, blackFridayActif, PRIX_APPEL } from "@/data/offres";

/**
 * Le bandeau fin tout en haut du site (19 novembre 2026, revu le 22 novembre).
 *
 * Toute l'année, il annonce le prix d'appel d'Essentiel. Pendant le Black
 * Friday (27 novembre 2026 à minuit au 1er décembre à minuit, heure de Paris),
 * il annonce l'annuel à prix réduit. L'ancien code PARTENAIRE-1MOIS a disparu
 * avec la décision du 22 novembre 2026. Le serveur applique les remises
 * lui-même (stripe-checkout) : aucun code à saisir.
 */
const LIEN_APPEL = `${APP_URL}/creer?utm_source=site&utm_medium=bandeau&utm_campaign=prix-appel`;
const LIEN_BLACK_FRIDAY = `${APP_URL}/creer?utm_source=site&utm_medium=bandeau&utm_campaign=black-friday`;

export function BandeauPromo() {
  // Le rendu serveur ne connaît pas l'heure du visiteur : on revérifie la date dans le navigateur.
  const [blackFriday, setBlackFriday] = useState(blackFridayActif());
  useEffect(() => setBlackFriday(blackFridayActif()), []);

  return (
    <div className="bandeau-promo pointer-events-auto flex h-8 items-center justify-center gap-2 bg-[#0d0f14] px-3 text-[12.5px] leading-none text-white sm:gap-3 sm:text-[13px]">
      {blackFriday ? (
        <span className="truncate">
          <strong className="font-semibold">Black Friday</strong>
          <span className="hidden sm:inline">
            {" "}
            : Essentiel 1 an à {BLACK_FRIDAY.essentielAn} € au lieu de{" "}
            {BLACK_FRIDAY.essentielAnBarre} €, jusqu'au 30 novembre
          </span>
          <span className="sm:hidden">
            {" "}
            : Essentiel 1 an à {BLACK_FRIDAY.essentielAn} € au lieu de{" "}
            {BLACK_FRIDAY.essentielAnBarre} €
          </span>
        </span>
      ) : (
        <span className="truncate">
          <strong className="font-semibold">Essentiel à {PRIX_APPEL.mensuel} €</strong> par mois
          les {PRIX_APPEL.mois} premiers mois
        </span>
      )}
      <a
        href={blackFriday ? LIEN_BLACK_FRIDAY : LIEN_APPEL}
        className="hidden shrink-0 font-semibold underline underline-offset-2 sm:inline"
      >
        J'en profite →
      </a>
    </div>
  );
}
