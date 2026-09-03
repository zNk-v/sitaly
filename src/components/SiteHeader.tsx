import { Link } from "@tanstack/react-router";
import { Calendar, Phone } from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { MainNav } from "@/components/MainNav";
import { MobileMenu } from "@/components/MobileMenu";
import { CALENDLY_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * L'en-tête du site, en un seul endroit.
 *
 * Il existait en trois copies — l'accueil, les pages secondaires, les landings
 * métier — qui avaient dérivé chacune de leur côté : deux fonds différents,
 * deux bordures différentes, et un bouton resté sur l'ancien style là où les
 * deux autres avaient suivi.
 *
 * Il ne barre plus la page, il flotte au-dessus. Ce n'est pas qu'une affaire
 * de goût : en occupant 65 px de flux, le bandeau repoussait l'écran collé du
 * hero d'autant, et cet écran finissait donc 65 px sous le pli — le repère de
 * défilement était coupé par le bas de la fenêtre à tous les formats. Hors du
 * flux, l'écran collé coïncide avec la fenêtre.
 *
 * La pastille est transparente en haut de page, où elle laisse voir le champ
 * du hero, et prend son fond une fois le défilement engagé. C'est la timeline
 * de défilement qui la peint, donc aucun écouteur. Sans `animation-timeline`,
 * elle reste peinte : un en-tête transparent bloqué au-dessus d'une section
 * claire serait illisible.
 */
export function SiteHeader({
  accueil = false,
  nav = "complete",
  premierEcran = "clair",
}: {
  /** Sur l'accueil, le logo renvoie à l'ancre de tête plutôt qu'à la route. */
  accueil?: boolean;
  /** Les landings métier n'ouvrent pas les menus déroulants. */
  nav?: "complete" | "simple";
  /** Sur un premier écran sombre, la pastille reste peinte : ses liens sont
      en encre et s'effaceraient sur le fond. */
  premierEcran?: "clair" | "sombre";
}) {
  const Logo = accueil ? (
    <a href="#top" className="flex items-center" aria-label="Sitaly — accueil">
      <SitalyLogo />
    </a>
  ) : (
    <Link to="/" className="flex items-center" aria-label="Sitaly — accueil">
      <SitalyLogo />
    </Link>
  );

  return (
    <>
      {/* Progression de lecture, sur l'arête de la fenêtre et non sous une
          pastille aux angles ronds, où un filet droit se couperait mal. */}
      <div
        className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
        aria-hidden="true"
      />

      {/* La gouttière ne doit pas intercepter les clics destinés au hero. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={`entete-plaque${premierEcran === "sombre" ? " entete-plaque--fixe" : ""} pointer-events-auto mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full pl-5 pr-2 sm:pl-6 sm:pr-3`}
        >
          {Logo}

          {nav === "complete" ? (
            <MainNav />
          ) : (
            <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
              <Link to="/" className="lien-entete">
                Accueil
              </Link>
              <Link to="/blog/" className="lien-entete">
                Blog
              </Link>
            </nav>
          )}

          <div className="flex items-center gap-1 sm:gap-3">
            {/* Le téléphone redevient un lien, pas une seconde pastille : deux
                boutons côte à côte se disputaient l'appel à l'action. */}
            <a
              href={`tel:${SITALY_PHONE}`}
              className="lien-entete hidden items-center gap-2 sm:inline-flex"
              aria-label={`Appeler Sitaly au ${SITALY_PHONE_DISPLAY}`}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">{SITALY_PHONE_DISPLAY}</span>
              <span className="lg:hidden">Appeler</span>
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton hidden h-10 px-5 text-sm sm:inline-flex"
            >
              <Calendar className="h-4 w-4" />
              Parler de votre projet
            </a>
            <MobileMenu onHome={accueil} />
          </div>
        </div>
      </header>
    </>
  );
}
