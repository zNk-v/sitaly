import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { euros } from "@/lib/config";
import { GROUPES, MENTION_TVA, lignesIncluses, offre, type OffreId } from "@/data/offres";

/**
 * Les offres d'une page de service, prix compris (23 octobre 2026) : chaque
 * entrée du menu mène à une page qui détaille l'offre cliquée, comme sur
 * devmiweb.com. Sert sur /site-e-commerce/, /logiciel-metier/, /agents-ia/ et
 * /agents-ia/agent-vocal/. Prix et contenu : src/data/offres.ts.
 */
export function OffresEnBref({ ids, apres }: { ids: OffreId[]; apres?: React.ReactNode }) {
  const offres = ids.map(offre);
  const groupe = offres[0].groupe;
  const colonnes =
    offres.length >= 3 ? "lg:grid-cols-3" : offres.length === 2 ? "md:grid-cols-2" : "max-w-xl";

  return (
    <div>
      <div className={`grid gap-6 ${colonnes}`}>
        {offres.map((o) => (
          <article
            key={o.id}
            className={`relative flex flex-col rounded-[2rem] border p-6 sm:p-8 ${
              o.recommandee
                ? "on-ink border-transparent bg-ink text-white shadow-elevated"
                : "border-border bg-card shadow-soft"
            }`}
          >
            {o.recommandee && (
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-[image:var(--gradient-ruban)]"
              />
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-[1.6rem] font-extrabold tracking-[-0.03em]">
                {o.nom}
              </h3>
              {o.recommandee && (
                <span className="rounded-full bg-[image:var(--gradient-ruban)] px-3 py-1 text-[12px] font-semibold text-white">
                  Recommandée
                </span>
              )}
            </div>
            <p
              className={`mt-2 leading-relaxed ${o.recommandee ? "text-white/70" : "text-muted-foreground"}`}
            >
              {o.pour}
            </p>
            <p className="mt-6 flex items-baseline gap-1.5">
              {o.aPartirDe && <span className="font-medium opacity-70">dès</span>}
              <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-[-0.045em] tabular-nums">
                {euros(o.mensuel ?? o.depart)}
              </span>
              {o.mensuel !== undefined && <span className="font-medium opacity-70">/mois</span>}
            </p>
            <p className="mt-2 text-[15px] font-medium opacity-85">
              {o.mensuel === undefined
                ? `${o.departLibelle.replace(/^de /, "")}, puis un suivi mensuel chiffré dans le devis`
                : `+ ${o.aPartirDe ? "dès " : ""}${euros(o.depart)} ${o.departLibelle}`}
            </p>
            <ul
              className={`mt-6 flex-1 space-y-2.5 border-t pt-6 text-[15px] ${
                o.recommandee ? "border-white/10" : "border-border"
              }`}
            >
              {lignesIncluses(o).map((l) => (
                <li key={l} className="flex gap-3">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${o.recommandee ? "text-signal" : "text-signal-ink"}`}
                  />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
            {(o.notes || o.mention) && (
              <div
                className={`mt-5 space-y-1 text-sm ${o.recommandee ? "text-white/60" : "text-muted-foreground"}`}
              >
                {o.notes?.map((n) => (
                  <p key={n}>{n}</p>
                ))}
                {o.mention && <p>{o.mention}</p>}
              </div>
            )}
            <Link
              to="/mon-projet/"
              search={{ offre: o.id }}
              className={`mt-7 w-full px-6 py-3 ${o.recommandee ? "bouton" : "bouton-secondaire"}`}
            >
              Choisir {o.nom}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
      {apres}
      <p className="mt-6 text-sm text-muted-foreground">
        Sans engagement. {MENTION_TVA}.{" "}
        <Link
          to="/tarifs/"
          hash={GROUPES[groupe].ancre}
          className="font-semibold text-brand-ink underline decoration-brand-ink/30 underline-offset-4"
        >
          Voir toute la grille sur la page Tarifs
        </Link>
      </p>
    </div>
  );
}
