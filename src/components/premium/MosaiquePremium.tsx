import { useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { styleLogo } from "@/components/premium/style-logo";
import {
  FAMILLES_METIERS,
  NOMBRE_METIERS,
  NOMBRE_VITRINES_LETTRES,
  VITRINES,
} from "@/data/premium";
import { suivreEvenement } from "@/lib/mesure";
import { trouver, type Trouve } from "@/lib/trouver-metier";

const num = (i: number) => String(i + 1).padStart(2, "0");
const majuscule = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * La mosaïque des treize sites, puis « Et le vôtre ? » : le visiteur tape son
 * métier et la page lui montre le site inventé qui suit la même logique.
 *
 * Sans script, le champ est un formulaire GET vers le questionnaire, avec
 * l'offre Premium et le métier tapé : il garde son utilité. Avec script, la
 * soumission reste sur la page et répond dans la ligne d'état.
 */
export function MosaiquePremium() {
  const [saisie, setSaisie] = useState("");
  const [reponse, setReponse] = useState<{ texte: string; trouve: Trouve | null } | null>(null);

  function chercher(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const texte = saisie.trim();
    if (!texte) return;
    const t = trouver(texte);
    setReponse({ texte, trouve: t });
    suivreEvenement("premium_metier_cherche", { trouve: !!t });
  }

  const n = VITRINES.length;
  const lienProjet = {
    offre: "site-premium" as const,
    ...(saisie.trim() ? { metier: saisie.trim() } : {}),
  };

  return (
    <section
      id="mosaique"
      aria-labelledby="mosaique-titre"
      className="scroll-mt-24 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="rail-label text-brand-ink">La mosaïque</p>
        <h2
          id="mosaique-titre"
          className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.04em]"
        >
          {majuscule(NOMBRE_VITRINES_LETTRES)} métiers, {NOMBRE_VITRINES_LETTRES} sites,{" "}
          <span className="accent-word">aucune</span> grille commune
        </h2>
        <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">
          Chaque maquette part de la façon dont les clients de ce métier choisissent. Le site
          suivant partira du vôtre.
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {VITRINES.map((v, i) => (
            <li key={v.id}>
              <a
                href={`#metier-${v.id}`}
                className="lift group flex aspect-[4/3] flex-col justify-between rounded-2xl border border-black/5 p-3.5 shadow-soft [container-type:inline-size] sm:p-4"
                style={
                  {
                    background: v.palette.fond,
                    color: v.palette.encre,
                    ...styleLogo(v.logo),
                  } as CSSProperties
                }
              >
                <span className="logo-marque block text-[max(16px,15.5cqi)] leading-[1.02]">
                  {v.marque}
                </span>
                <span
                  className="text-[13px] font-medium leading-tight"
                  style={{ color: v.palette.doux }}
                >
                  {num(i)} · {v.metier}
                </span>
              </a>
            </li>
          ))}
          <li className="col-span-2 sm:col-span-4 lg:col-span-1">
            <a
              href="#votre-metier"
              className="flex h-full min-h-[6.5rem] flex-col justify-between rounded-2xl border-2 border-dashed border-foreground/25 p-3.5 transition hover:border-brand-ink sm:p-4 lg:aspect-[4/3] lg:min-h-0"
            >
              <span className="font-display text-xl font-extrabold tracking-[-0.03em]">
                Le vôtre ?
              </span>
              <span className="text-[13px] font-medium text-muted-foreground">
                Tapez votre métier
              </span>
            </a>
          </li>
        </ul>

        {/* Le chercheur de métier. */}
        <div
          id="votre-metier"
          className="mt-14 scroll-mt-28 rounded-[1.75rem] border border-border bg-card p-6 shadow-soft sm:p-8"
        >
          <form
            method="get"
            action="/mon-projet/"
            onSubmit={chercher}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <input type="hidden" name="offre" value="site-premium" />
            <label className="flex-1">
              <span className="font-semibold">Votre métier</span>
              <input
                name="metier"
                value={saisie}
                onChange={(e) => setSaisie(e.target.value)}
                maxLength={40}
                list="premium-metiers"
                autoComplete="off"
                placeholder="serrurier, sophrologue, auto-école…"
                className="mt-2 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-[16px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <datalist id="premium-metiers">
                {FAMILLES_METIERS.flatMap((f) => f.metiers).map((m) => (
                  <option key={m.nom} value={m.nom} />
                ))}
              </datalist>
            </label>
            <button type="submit" className="bouton-secondaire min-h-[3.125rem] px-6">
              <Search className="h-4 w-4" />
              Chercher
            </button>
          </form>

          <div aria-live="polite" className="mt-4 min-h-[1.5rem] text-[15px] leading-relaxed">
            {reponse &&
              (reponse.trouve ? (
                <p>
                  {reponse.trouve.via === "metier" ? (
                    <>
                      <strong>{majuscule(reponse.texte)}</strong> : voici{" "}
                      {reponse.trouve.vitrine.marque}, le site inventé pour ce métier.
                    </>
                  ) : (
                    <>
                      <strong>{majuscule(reponse.texte)}</strong> : même logique que{" "}
                      {reponse.trouve.vitrine.marque}, le site inventé pour un{" "}
                      {reponse.trouve.vitrine.metier.toLowerCase()}.
                    </>
                  )}{" "}
                  <a
                    href={`#metier-${reponse.trouve.vitrine.id}`}
                    className="font-semibold text-brand-ink underline decoration-brand-ink/30 underline-offset-4"
                  >
                    Voir {reponse.trouve.vitrine.marque}
                  </a>
                </p>
              ) : (
                <p>
                  « {reponse.texte} » n'a pas de maquette sur cette page. Votre site partira de
                  votre activité, comme les {n} autres.
                </p>
              ))}
          </div>

          <Link
            to="/mon-projet/"
            search={lienProjet}
            onClick={() => suivreEvenement("premium_candidature", { depuis: "chercheur" })}
            className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-ink"
          >
            Présenter mon projet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Tous les métiers nommés, chacun relié au site qui suit sa logique. */}
        <div id="tous-les-metiers" className="mt-14">
          <h3 className="font-display text-xl font-bold tracking-tight">
            Les {NOMBRE_METIERS} métiers nommés sur cette page
          </h3>
          <div className="mt-6 gap-8 sm:columns-2 lg:columns-4">
            {FAMILLES_METIERS.map((f) => (
              <div key={f.famille} className="mb-6 break-inside-avoid">
                <p className="rail-label text-muted-foreground">{f.famille}</p>
                <ul className="mt-2 space-y-1">
                  {f.metiers.map((m) => (
                    <li key={m.nom}>
                      <a
                        href={`#metier-${m.vitrine}`}
                        className="text-[15px] font-medium hover:text-brand-ink hover:underline"
                      >
                        {majuscule(m.nom)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
