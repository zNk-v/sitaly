import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useSplitWords } from "@/hooks/use-split-words";
import { NOMBRE_VITRINES_LETTRES, VITRINES } from "@/data/premium";
import { offre, prixCourt } from "@/data/offres";

const PREMIUM = offre("site-premium");

/**
 * L'ouverture. Sur ordinateur en mode effet, le panneau du hero couvre la
 * colonne de gauche de la scène, déjà collée, et monte avec la page : il
 * découvre l'index comme un rideau, pendant que le premier site reste en
 * place dans le cadre. Partout ailleurs, c'est une section ordinaire.
 */
export function HeroPremium() {
  const titre = useRef<HTMLHeadingElement>(null);
  useSplitWords(titre);
  const premier = VITRINES[0].metier.toLowerCase();
  const dernier = VITRINES[VITRINES.length - 1].metier.toLowerCase();

  return (
    <section className="premium-hero" aria-labelledby="premium-titre">
      <div className="premium-hero-grille">
        <div className="premium-hero-panneau">
          <p className="rail-label text-brand-ink">Sitaly Premium · site sur mesure</p>
          <h1 id="premium-titre" ref={titre} className="premium-hero-titre">
            Un site sur mesure, <span className="accent-word">dessiné</span> pour votre métier
          </h1>
          <p className="premium-hero-texte">
            Sitaly Premium dessine votre site à partir de zéro : direction artistique, textes et
            code. Faites défiler : {NOMBRE_VITRINES_LETTRES} sites inventés, un par métier, du{" "}
            {premier} au {dernier}. Nous avons inventé ces marques pour cette page.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              to="/mon-projet/"
              search={{ offre: PREMIUM.id }}
              className="bouton premium-hero-bouton px-7 py-3.5"
            >
              Présenter mon projet
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </Link>
            <a
              href="#tarif"
              className="font-semibold text-brand-ink underline decoration-brand-ink/30 underline-offset-4"
            >
              Voir le tarif
            </a>
          </div>
          <ul className="premium-hero-reperes">
            {[
              `${prixCourt(PREMIUM).replace(/^dès/, "Dès")}, en trois acomptes`,
              "En ligne en 8 à 10 semaines",
              "Le site vous appartient",
            ].map((r) => (
              <li key={r}>
                <Check className="h-4 w-4 text-signal-ink" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
