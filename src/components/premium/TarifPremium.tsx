import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { CONTENEUR, TITRE_SECTION } from "@/components/premium/communs";
import { PictoRubrique } from "@/components/PictoRubrique";
import { CAPACITE } from "@/data/premium";
import {
  GRILLES,
  MENTION_TVA,
  ligneDepart,
  montantsAcomptes,
  offre,
  prixCourt,
  prixLong,
} from "@/data/offres";
import { SITALY_PHONE, SITALY_PHONE_DISPLAY, euros } from "@/lib/config";
import { suivreEvenement } from "@/lib/mesure";

const PREMIUM = offre("site-premium");
const PRESENCE_PRO = offre("presence-pro");
const MAINTENANCE = offre("maintenance");

/** La valeur d'une ligne de grille pour une offre, par le début de son libellé. */
function valeur(groupe: "site" | "premium", debut: string, id: string): string | undefined {
  for (const r of GRILLES[groupe])
    for (const l of r.lignes)
      if (l.libelle.startsWith(debut)) {
        const v = l.valeurs[id as keyof typeof l.valeurs];
        return v === true ? "oui" : v;
      }
  return undefined;
}

const COMPARATIF: { ligne: string; mois: string; premium: string }[] = [
  {
    ligne: "Le dessin",
    mois: "La charpente commune de Sitaly, à vos couleurs",
    premium: "Une direction artistique faite pour votre métier",
  },
  {
    ligne: "Les pages",
    mois: valeur("site", "Pages rédigées", PRESENCE_PRO.id) ?? "",
    premium: `${valeur("premium", "Pages dessinées", PREMIUM.id) ?? ""} pages, plus sur devis`,
  },
  { ligne: "Le paiement", mois: prixLong(PRESENCE_PRO), premium: prixLong(PREMIUM) },
  {
    ligne: "La propriété",
    mois: "Le site reste à Sitaly pendant l'abonnement, rachat possible",
    premium: "À vous au dernier acompte : code, fichiers, textes",
  },
  {
    ligne: "Après",
    mois: "Tout est compris dans la mensualité",
    premium: `${euros(MAINTENANCE.mensuel ?? 0)}/mois sans engagement, ou rien`,
  },
];

const capacite =
  CAPACITE.parTrimestre && CAPACITE.prochainDemarrage
    ? `Teddy dessine et code chaque site Premium lui-même : ${CAPACITE.parTrimestre} projets par trimestre. Prochain démarrage possible : ${CAPACITE.prochainDemarrage}.`
    : null;

/** Le tarif : la carte d'encre, ce qui est compris, et le comparatif avec l'offre au mois. */
export function TarifPremium() {
  const majuscule = prixCourt(PREMIUM).replace(/^dès/, "Dès");
  return (
    <section
      id="tarif"
      aria-labelledby="tarif-titre"
      className="scroll-mt-24 bg-paper-sunk py-20 sm:py-28"
    >
      <div className={CONTENEUR}>
        <p className="rail-label text-brand-ink">Le tarif</p>
        <h2 id="tarif-titre" className={TITRE_SECTION}>
          {majuscule}, et le site <span className="accent-word">vous appartient</span>
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[24rem_1fr] lg:items-start lg:gap-12">
          {/* La carte d'encre, au gabarit des pages d'offre. */}
          <aside className="on-ink relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-elevated sm:p-8 lg:sticky lg:top-28">
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-[image:var(--gradient-ruban)]"
            />
            <p className="font-display text-2xl font-extrabold tracking-[-0.03em]">{PREMIUM.nom}</p>
            <p className="mt-5 flex items-baseline gap-1.5">
              <span className="font-medium text-white/70">dès</span>
              <span className="font-display text-[3.25rem] font-extrabold leading-none tracking-[-0.045em] tabular-nums">
                {euros(PREMIUM.depart)}
              </span>
            </p>
            <p className="mt-2 text-[15px] font-medium text-white/85">{ligneDepart(PREMIUM)}</p>
            <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-5 text-[15px] text-white/85">
              {montantsAcomptes(PREMIUM).map((a) => (
                <li key={a.moment} className="flex justify-between gap-4 tabular-nums">
                  <span>{a.moment.charAt(0).toUpperCase() + a.moment.slice(1)}</span>
                  <span className="font-semibold text-white">{euros(a.montant)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/55">{MENTION_TVA}.</p>
            <Link
              id="tarif-bouton"
              to="/mon-projet/"
              search={{ offre: PREMIUM.id }}
              onClick={() => suivreEvenement("premium_candidature", { depuis: "tarif" })}
              className="bouton mt-7 w-full px-6 py-3.5"
            >
              Présenter mon projet
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </Link>
            <p className="mt-4 text-center text-sm text-white/70">
              Ou appelez le{" "}
              <a
                href={`tel:${SITALY_PHONE}`}
                className="font-semibold text-white underline decoration-white/30 underline-offset-4"
              >
                {SITALY_PHONE_DISPLAY}
              </a>
            </p>
          </aside>

          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {GRILLES.premium.map((r) => (
                <div
                  key={r.titre}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <p className="flex items-center gap-3 font-display text-lg font-bold">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-ink/10 text-brand-ink">
                      <PictoRubrique icone={r.icone} className="h-4 w-4" />
                    </span>
                    {r.titre}
                  </p>
                  <ul className="mt-4 space-y-2.5 text-[15px]">
                    {r.lignes.map((l) => {
                      const v = l.valeurs[PREMIUM.id];
                      return (
                        <li key={l.libelle} className="flex gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink" />
                          <span>
                            {l.libelle}
                            {typeof v === "string" && (
                              <strong className="font-semibold"> : {v}</strong>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3 text-[15px] leading-relaxed text-foreground/85">
              <p>
                <strong>
                  Le site, son code et ses fichiers vous appartiennent au dernier acompte.
                </strong>
              </p>
              <p>
                Ce qui fait monter le prix : plus de huit pages, une deuxième langue, une
                réservation ou une boutique en ligne, une séance photo. Vous lisez le montant exact
                dans le devis, avant de signer.
              </p>
              <p>
                Après la mise en ligne, l'hébergement et les corrections sont compris pendant trois
                mois. Ensuite, vous gardez l'entretien chez Sitaly pour{" "}
                {euros(MAINTENANCE.mensuel ?? 0)} par mois, sans engagement, ou vous emportez le
                site chez l'hébergeur de votre choix.
              </p>
              {capacite && <p className="font-semibold">{capacite}</p>}
            </div>

            {/* Au mois ou payé une fois : ligne à ligne. */}
            <div className="mt-12">
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Au mois ou payé une fois ?
              </h3>
              <table className="mt-6 hidden w-full border-collapse text-left text-[15px] md:table">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="w-36 py-3 pr-4 font-medium text-muted-foreground">
                      <span className="sr-only">Critère</span>
                    </th>
                    <th scope="col" className="py-3 pr-4 font-display text-lg font-bold">
                      {PRESENCE_PRO.nom}
                    </th>
                    <th scope="col" className="py-3 font-display text-lg font-bold">
                      {PREMIUM.nom}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIF.map((c) => (
                    <tr key={c.ligne} className="border-b border-border align-top">
                      <th scope="row" className="py-3.5 pr-4 font-semibold">
                        {c.ligne}
                      </th>
                      <td className="py-3.5 pr-4 text-muted-foreground">{c.mois}</td>
                      <td className="py-3.5">{c.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 grid gap-4 md:hidden">
                {[
                  { nom: PRESENCE_PRO.nom, cle: "mois" as const },
                  { nom: PREMIUM.nom, cle: "premium" as const },
                ].map((o) => (
                  <div
                    key={o.nom}
                    className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                  >
                    <p className="font-display text-lg font-bold">{o.nom}</p>
                    <dl className="mt-3 space-y-2.5 text-[15px]">
                      {COMPARATIF.map((c) => (
                        <div key={c.ligne}>
                          <dt className="font-semibold">{c.ligne}</dt>
                          <dd className="text-muted-foreground">{c[o.cle]}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <Link
                to="/offres/$id/"
                params={{ id: PRESENCE_PRO.id }}
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-ink"
              >
                Voir {PRESENCE_PRO.nom}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
