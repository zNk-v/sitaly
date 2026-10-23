import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { CookieConsentBandeau } from "@/components/CookieConsent";
import { ChampChevrons } from "@/components/HeroChamp";
import { CarteRealisations, Etoiles } from "@/components/CarteRealisations";
import { AVIS_GOOGLE, NOTE_GOOGLE } from "@/data/avis-google";
import { COULEURS_FAMILLE, type FamilleId } from "@/data/expertises";
import { SITALY_PHONE } from "@/lib/config";

import teddy112 from "@/assets/teddy-vidal-carte-112.webp";
import teddy224 from "@/assets/teddy-vidal-carte-224.webp";

/**
 * Page d'arrivée du QR code imprimé sur les cartes de visite.
 *
 * Le visiteur a rencontré Teddy quelques minutes ou quelques jours plus tôt. Il
 * vient vérifier à qui il a affaire avant d'appeler. Tout le premier écran sert
 * cette seule décision : aucun menu, aucun lien vers le reste du site au-dessus
 * de la ligne de flottaison. Le lien vers l'accueil n'existe qu'en pied de page.
 *
 * Hors index : la page reprend le positionnement de l'accueil et ne doit pas lui
 * prendre sa place dans Google. Elle n'entre pas non plus au sitemap. Aucun lien
 * interne n'y mène, d'où son ajout explicite à `pages` dans vite.config.ts pour
 * que le prérendu la génère.
 */

const TEL_HREF = `tel:${SITALY_PHONE}`;

type Emplacement = "accueil" | "barre";

/** Envoi GA4. `gtag` est posé par le script du `<head>` racine ; sans lui, rien. */
function suivre(evenement: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", evenement, { source: "carte_de_visite", ...params });
}

export const Route = createFileRoute("/carte")({
  head: () => ({
    meta: [
      // `viewport-fit=cover` : sans lui, iOS renvoie 0 pour
      // env(safe-area-inset-bottom) et la barre d'action ignore l'indicateur
      // d'accueil. La balise remplace celle de la racine, même `name`.
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Teddy Vidal, fondateur de Sitaly" },
      {
        name: "description",
        content:
          "Teddy Vidal, fondateur de Sitaly : site internet, publicité en ligne et automatisations. Un seul interlocuteur. Appelez, ou trouvez votre offre en quatre questions.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Teddy Vidal, fondateur de Sitaly" },
      { property: "og:url", content: "https://sitaly.fr/carte/" },
    ],
  }),
  component: Carte,
});

/* ---------------- Contenus ---------------- */

const REPERES = ["Mise en ligne en 48h", "Réponse sous 24h", "Sans engagement de durée"];

const OFFRES: { num: string; famille: FamilleId; titre: string; ligne: string }[] = [
  {
    num: "01",
    famille: "site",
    titre: "Site internet",
    ligne: "Un site sur mesure livré en 48h, puis hébergé, entretenu et modifié pour vous.",
  },
  {
    num: "02",
    famille: "acquisition",
    titre: "Acquisition Google & ChatGPT Ads",
    ligne: "Des campagnes qui amènent des demandes qualifiées, pilotées chaque semaine.",
  },
  {
    num: "03",
    famille: "automatisation",
    titre: "Agents IA & automatisations",
    ligne: "Un standard qui ne rate aucun appel, des devis relancés sans vous.",
  },
];

/* ---------------- Page ---------------- */

function Carte() {
  const actionsRef = useRef<HTMLDivElement>(null);
  const [barreVisible, setBarreVisible] = useState(false);

  // Un seul événement de scan par chargement.
  useEffect(() => {
    suivre("carte_scan");
  }, []);

  // La barre apparaît quand les deux boutons sont sortis par le haut de l'écran,
  // pas quand ils sont encore en dessous (écran très court au chargement).
  useEffect(() => {
    const el = actionsRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) => {
      setBarreVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-svh bg-background pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <CookieConsentBandeau />

      {/* ---------- Premier écran ---------- */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 hero-bg" aria-hidden="true" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden opacity-80">
          <ChampChevrons suffixe="carte" />
        </div>

        <div className="mx-auto max-w-md px-4 pb-8">
          {/* En-tête minimal : le logo, et rien d'autre. Pas de lien. */}
          <header className="flex h-16 items-center">
            <SitalyLogo />
          </header>

          <div className="mt-4 flex items-center gap-4">
            {/* TODO photo : à remplacer si tu préfères un autre portrait.
                Carré recadré sur le visage, exporté en 112 et 224 px. */}
            <img
              src={teddy112}
              srcSet={`${teddy112} 1x, ${teddy224} 2x`}
              width={112}
              height={112}
              fetchPriority="high"
              decoding="async"
              alt="Teddy Vidal, fondateur de Sitaly"
              className="h-20 w-20 shrink-0 rounded-full border-2 border-card object-cover shadow-soft"
            />
            <div>
              <p className="font-display text-lg font-extrabold leading-tight tracking-tight">
                Teddy Vidal
              </p>
              <p className="text-sm text-muted-foreground">Fondateur de Sitaly</p>
            </div>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.1rem,10vw,2.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
            Ravi de vous avoir{" "}
            <span className="accent-word" style={{ paddingRight: 0 }}>
              rencontré
            </span>
            .
          </h1>

          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
            Teddy, fondateur de Sitaly. Je conçois et je gère votre site, votre publicité en ligne
            et vos automatisations.{" "}
            <span className="font-semibold text-foreground">Un seul interlocuteur.</span>
          </p>

          <div ref={actionsRef} className="mt-6 flex flex-col gap-3">
            <a
              href={TEL_HREF}
              onClick={() => suivre("carte_clic_appel", { emplacement: "accueil" })}
              className="bouton w-full px-6 py-4 text-base"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Me contacter
            </a>
            <Link
              to="/mon-projet/"
              className="bouton-secondaire w-full px-6 py-4 text-base"
              onClick={() => suivre("carte_clic_questionnaire", { emplacement: "accueil" })}
            >
              Trouver mon offre
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-md px-4">
        {/* ---------- Preuves ---------- */}
        <ul className="flex flex-col gap-2 border-y border-border py-5 text-sm text-foreground">
          {REPERES.map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <Check className="h-4 w-4 shrink-0 text-signal-ink" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>

        <CarteRealisations />

        {/* Les avis de la fiche Google, en entier. Initiale en pastille : la
            fiche ne donne pas de photo exploitable, et une photo récupérée
            ailleurs ne serait pas celle que l'auteur a choisie. */}
        <section className="mt-12" aria-labelledby="carte-avis">
          <p className="rail-label text-muted-foreground">Avis Google</p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <h2
              id="carte-avis"
              className="font-display text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.035em]"
            >
              Ce qu'ils <span className="accent-word">en disent</span>
            </h2>
            <div className="shrink-0 text-right">
              <p className="font-display text-2xl font-extrabold leading-none">
                {NOTE_GOOGLE.note}
              </p>
              <Etoiles note={5} />
            </div>
          </div>
          <ul className="mt-5 flex flex-col gap-3">
            {AVIS_GOOGLE.map((a) => (
              <li key={a.auteur} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold text-white"
                    style={{ background: "var(--gradient-ruban)" }}
                  >
                    {a.auteur.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight">{a.auteur}</p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                  <Etoiles note={a.note} />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{a.texte}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Offres ---------- */}
        <section className="mt-12" aria-labelledby="carte-offres">
          <h2 id="carte-offres" className="rail-label text-muted-foreground">
            Ce que je fais pour vous
          </h2>
          <ol className="mt-4 flex flex-col gap-3">
            {OFFRES.map((o) => {
              const c = COULEURS_FAMILLE[o.famille];
              return (
                <li
                  key={o.num}
                  className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 pl-5"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1"
                    style={{ background: c.couleur }}
                  />
                  <p className="flex items-baseline gap-3">
                    <span
                      className="font-display text-sm font-extrabold tabular-nums"
                      style={{ color: c.encre }}
                    >
                      {o.num}
                    </span>
                    <span className="font-display font-extrabold leading-tight">{o.titre}</span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{o.ligne}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ---------- Pied de page ---------- */}
        <footer className="mt-12 flex flex-col items-start gap-3 border-t border-border pt-6 text-sm">
          <Link to="/" className="font-semibold underline underline-offset-4">
            Voir le site complet
          </Link>
          <a href="mailto:contact@sitaly.fr" className="text-muted-foreground">
            contact@sitaly.fr
          </a>
        </footer>
      </div>

      {/* ---------- Barre d'action collante ---------- */}
      <div
        aria-hidden={!barreVisible}
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_oklch(0.2_0.05_300/0.5)] transition-transform duration-300 motion-reduce:transition-none ${barreVisible ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
      >
        <div className="mx-auto flex max-w-md gap-3">
          <a
            href={TEL_HREF}
            tabIndex={barreVisible ? 0 : -1}
            onClick={() =>
              suivre("carte_clic_appel", { emplacement: "barre" satisfies Emplacement })
            }
            className="bouton flex-1 px-4 py-3 text-sm"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Me contacter
          </a>
          <Link to="/mon-projet/" tabIndex={barreVisible ? 0 : -1}>
            Mon offre
          </Link>
        </div>
      </div>
    </div>
  );
}
