import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { offre, prixCourt } from "@/data/offres";
import { suivreEvenement } from "@/lib/mesure";

const PREMIUM = offre("site-premium");

/**
 * La barre d'appel du téléphone (sous 1 024 px). Elle apparaît quand la
 * mosaïque entre à l'écran, et s'efface quand un autre bouton « Présenter
 * mon projet » ou le pied de page est visible : jamais deux appels à la fois.
 * Cachée, elle sort de l'arbre d'accessibilité et du parcours clavier.
 */
export function BarreAppelMobile() {
  const [passee, setPassee] = useState(false);
  const [masquee, setMasquee] = useState(false);

  useEffect(() => {
    const mosaique = document.getElementById("mosaique");
    const autres = ["tarif-bouton", "appel-bouton"]
      .map((id) => document.getElementById(id))
      .concat(document.querySelector("footer"))
      .filter((e): e is HTMLElement => !!e);
    const visibles = new Set<Element>();

    const entree = new IntersectionObserver(([e]) => {
      /* Une fois la mosaïque atteinte, ou dépassée par une ancre. */
      if (e.isIntersecting || e.boundingClientRect.top < 0) setPassee(true);
    });
    const concurrents = new IntersectionObserver((entrees) => {
      for (const e of entrees) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      setMasquee(visibles.size > 0);
    });
    if (mosaique) entree.observe(mosaique);
    autres.forEach((e) => concurrents.observe(e));
    return () => {
      entree.disconnect();
      concurrents.disconnect();
    };
  }, []);

  const visible = passee && !masquee;
  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur transition duration-200 motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <Link
        to="/mon-projet/"
        search={{ offre: PREMIUM.id }}
        onClick={() => suivreEvenement("premium_candidature", { depuis: "barre" })}
        className="bouton h-12 w-full text-base"
      >
        Présenter mon projet · {prixCourt(PREMIUM)}
        <ArrowRight className="bouton-fleche h-4 w-4" />
      </Link>
    </div>
  );
}
