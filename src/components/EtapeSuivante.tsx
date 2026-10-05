import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COULEURS_FAMILLE, FAMILLES, type FamilleId } from "@/data/expertises";

/**
 * L'étape suivante, vers une autre famille : chaque page propose la suite
 * logique de son sujet, pas le catalogue entier. Un site reçoit des demandes
 * qu'un agent traite ; une campagne paie des clics qu'un agent rappelle ; un
 * agent a besoin de demandes, que l'acquisition amène.
 */
type EtapeSuivante = {
  famille: FamilleId;
  phrase: string;
  liens: { label: string; to?: string; href?: string }[];
};

const ETAPE_SUIVANTE: Record<FamilleId, EtapeSuivante> = {
  site: {
    famille: "automatisation",
    phrase: "Votre site reçoit des demandes. Un agent IA y répond, même à 19 h.",
    liens: [{ label: "Voir les agents IA", to: "/agents-ia/" }],
  },
  acquisition: {
    famille: "automatisation",
    phrase: "Chaque clic payé mérite une réponse immédiate.",
    liens: [{ label: "Voir les agents IA", to: "/agents-ia/" }],
  },
  automatisation: {
    famille: "acquisition",
    phrase: "Un agent a besoin de demandes à traiter.",
    liens: [
      { label: "ChatGPT Ads", href: "/chatgpt-ads/" },
      { label: "Demandes de chantier", to: "/acquisition/" },
    ],
  },
};

/** La carte d'étape suivante, posée dans la grille des pages voisines. */
export function CarteEtapeSuivante({ depuis }: { depuis: FamilleId }) {
  const etape = ETAPE_SUIVANTE[depuis];
  const couleur = COULEURS_FAMILLE[etape.famille];
  const vers = FAMILLES.find((f) => f.id === etape.famille)!;
  return (
    <div
      className="flex flex-col rounded-2xl border-2 bg-card p-6 shadow-soft"
      style={{ borderColor: couleur.couleur }}
    >
      <span className="rail-label" style={{ color: couleur.encre }}>
        Étape suivante · {vers.titre}
      </span>
      <p className="mt-3 font-display text-lg font-bold leading-snug">{etape.phrase}</p>
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-4">
        {etape.liens.map((l) =>
          l.to ? (
            <Link
              key={l.label}
              to={l.to}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: couleur.encre }}
            >
              {l.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            /* Page statique hors routeur : lien classique. */
            <a
              key={l.label}
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: couleur.encre }}
            >
              {l.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          ),
        )}
      </div>
    </div>
  );
}
