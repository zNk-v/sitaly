import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CAPACITE } from "@/data/premium";
import { SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";
import { suivreEvenement } from "@/lib/mesure";

/** L'appel final : la seule section centrée de la page (DESIGN.md §5). */
export function AppelPremium() {
  return (
    <section aria-labelledby="appel-titre" className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2
          id="appel-titre"
          className="font-display text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.04em]"
        >
          Parlons de <span className="accent-word">votre</span> site
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Quatre questions sur votre projet, puis vos coordonnées. Teddy lit chaque projet et vous
          répond sous 24 heures. Si une offre au mois vous suffit, il vous le dit, avec son prix.
        </p>
        <Link
          id="appel-bouton"
          to="/mon-projet/"
          search={{ offre: "site-premium" }}
          onClick={() => suivreEvenement("premium_candidature", { depuis: "final" })}
          className="bouton mt-8 w-full px-7 py-3.5 sm:w-auto"
        >
          Présenter mon projet
          <ArrowRight className="bouton-fleche h-4 w-4" />
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">
          Ou appelez le{" "}
          <a
            href={`tel:${SITALY_PHONE}`}
            className="font-semibold text-foreground underline decoration-foreground/30 underline-offset-4"
          >
            {SITALY_PHONE_DISPLAY}
          </a>
        </p>
        {CAPACITE.prochainDemarrage && (
          <p className="mt-6 text-sm font-semibold">
            Prochain démarrage possible : {CAPACITE.prochainDemarrage}.
          </p>
        )}
      </div>
    </section>
  );
}
