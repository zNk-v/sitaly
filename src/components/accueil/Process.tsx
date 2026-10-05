import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Pause, Play } from "lucide-react";

/**
 * « On fait le point, on déploie, on optimise » chez la référence : trois
 * temps, puis une feuille de route animée qui tourne en boucle, avec un
 * bouton pour la mettre en pause (WCAG 2.2.2 : tout mouvement de plus de
 * cinq secondes doit pouvoir s'arrêter).
 *
 * L'animation est entièrement en CSS (`.feuille-*`) : les barres poussent
 * l'une après l'autre, le curseur « Aujourd'hui » avance, et le cycle
 * recommence. Le bouton ne fait que basculer `animation-play-state`.
 */
const TEMPS = [
  {
    titre: "On fait le point",
    texte:
      "30 minutes au téléphone : où vos demandes se perdent, quels outils sont en place, ce qu'un agent peut reprendre. Puis une proposition écrite et chiffrée.",
  },
  {
    titre: "On s'occupe de tout",
    texte:
      "L'agent est configuré selon vos règles, branché sur votre téléphonie, votre agenda et vos outils. Vous validez, on exécute.",
  },
  {
    titre: "On suit et on ajuste",
    texte:
      "Chaque mois, la lecture des échanges, les corrections et un compte rendu clair. Le même interlocuteur du premier appel au centième.",
  },
];

/* Lignes de la feuille de route : début et fin en douzièmes de la frise. */
const BARRES = [
  { ligne: "Diagnostic", label: "Appel de 30 min", debut: 0, fin: 2, ton: "feuille-barre--clair" },
  {
    ligne: "Mise en place",
    label: "Agent configuré et branché",
    debut: 2,
    fin: 5,
    ton: "feuille-barre--violet",
  },
  {
    ligne: "Réglages",
    label: "Premiers appels relus",
    debut: 5,
    fin: 8,
    ton: "feuille-barre--degrade",
  },
  {
    ligne: "Pilotage",
    label: "Compte rendu mensuel",
    debut: 8,
    fin: 12,
    ton: "feuille-barre--encre",
  },
];

export function Process() {
  const [pause, setPause] = useState(false);

  return (
    <section id="process" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 data-reveal data-split className="display-section max-w-3xl">
          On fait le point, <span className="accent-word">on installe, on pilote</span>
        </h2>

        <ol className="stagger mt-12 grid gap-8 md:grid-cols-3">
          {TEMPS.map((t, i) => (
            <li key={t.titre} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <p className="flex items-center gap-2.5 font-semibold">
                <span className="h-2 w-2 rounded-full bg-[image:var(--gradient-ruban)]" />
                {t.titre}
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">{t.texte}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={() => setPause((p) => !p)}
            aria-pressed={pause}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-foreground/30"
          >
            {pause ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {pause ? "Reprendre l'animation" : "Mettre en pause"}
          </button>
        </div>

        <div
          data-reveal
          className={`feuille mt-4 rounded-[2rem] border border-border bg-paper-sunk p-3 sm:p-5 ${pause ? "est-en-pause" : ""}`}
        >
          <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-soft sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </span>
                <span className="text-sm font-semibold">Feuille de route · 3 mois</span>
              </div>
              <span className="rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-white">
                Exemple
              </span>
            </div>

            <div className="mt-6 overflow-x-auto">
              <div className="relative min-w-[40rem]">
                {/* En-tête des mois */}
                <div className="grid grid-cols-[7.5rem_1fr] text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <span />
                  <div className="grid grid-cols-3">
                    <span>Mois 1</span>
                    <span>Mois 2</span>
                    <span>Mois 3</span>
                  </div>
                </div>

                <div className="relative mt-3">
                  {/* Quadrillage et curseur, dans la zone des barres. */}
                  <div aria-hidden="true" className="absolute inset-y-0 right-0 left-[7.5rem]">
                    <div className="grid h-full grid-cols-3">
                      <span className="border-l border-border" />
                      <span className="border-l border-border" />
                      <span className="border-l border-border" />
                    </div>
                    <span className="feuille-curseur absolute inset-y-0 w-px bg-ink">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white">
                        Aujourd'hui
                      </span>
                    </span>
                  </div>

                  <ul className="relative space-y-3">
                    {BARRES.map((b, i) => (
                      <li key={b.ligne} className="grid grid-cols-[7.5rem_1fr] items-center">
                        <span className="text-sm text-muted-foreground">{b.ligne}</span>
                        <div className="relative h-10">
                          <span
                            className={`feuille-barre absolute inset-y-1 flex items-center rounded-lg px-3 text-[12px] font-semibold whitespace-nowrap ${b.ton}`}
                            style={
                              {
                                left: `${(b.debut / 12) * 100}%`,
                                width: `${((b.fin - b.debut) / 12) * 100}%`,
                                "--i": i,
                              } as React.CSSProperties
                            }
                          >
                            <span className="truncate">{b.label}</span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="measure mt-10 text-muted-foreground">
          Avant d'en parler, notre guide sur l'
          <Link
            to="/blog/$slug/"
            params={{ slug: "agent-ia-entreprise-guide" }}
            className="font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition hover:decoration-brand-ink"
          >
            agent IA en entreprise
          </Link>{" "}
          dit ce qu'il fait, ce qu'il coûte, et quand une automatisation simple suffit.
        </p>
      </div>
    </section>
  );
}
