import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SECTEURS, cheminSecteur, type SecteurSlug } from "@/data/secteurs";
import { Compteur } from "@/components/accueil/communs";

import photoImmo600 from "@/assets/photos/secteur-immobilier-600.webp";
import photoImmo1000 from "@/assets/photos/secteur-immobilier-1000.webp";
import photoBtp600 from "@/assets/photos/secteur-btp-600.webp";
import photoBtp1000 from "@/assets/photos/secteur-btp-1000.webp";
import photoCourtiers600 from "@/assets/photos/secteur-courtiers-600.webp";
import photoCourtiers1000 from "@/assets/photos/secteur-courtiers-1000.webp";
import photoArtisans600 from "@/assets/photos/secteur-artisans-600.webp";
import photoArtisans1000 from "@/assets/photos/secteur-artisans-1000.webp";
import photoRestau600 from "@/assets/photos/secteur-restauration-600.webp";
import photoRestau1000 from "@/assets/photos/secteur-restauration-1000.webp";
import photoSante600 from "@/assets/photos/secteur-sante-600.webp";
import photoSante1000 from "@/assets/photos/secteur-sante-1000.webp";
import photoBeaute600 from "@/assets/photos/secteur-beaute-600.webp";
import photoBeaute1000 from "@/assets/photos/secteur-beaute-1000.webp";
import photoAuto600 from "@/assets/photos/secteur-automobile-600.webp";
import photoAuto1000 from "@/assets/photos/secteur-automobile-1000.webp";
import photoLiberales600 from "@/assets/photos/secteur-professions-liberales-600.webp";
import photoLiberales1000 from "@/assets/photos/secteur-professions-liberales-1000.webp";

/**
 * La rubrique Secteurs, en vitrine : un accordéon d'images inspiré de deux
 * composants 21st.dev (« Hover Expand Gallery » et « Squeeze Carousel »).
 *
 * Sur grand écran, neuf panneaux côte à côte. Le panneau actif s'ouvre et
 * montre sa photo, son texte et ce que fait l'agent ; les autres restent des
 * bandes étroites au libellé couché. Le défilé avance seul, une barre de
 * progression sur le panneau ouvert, et s'arrête au survol, au focus ou hors
 * de l'écran. Sur téléphone, le même contenu devient un accordéon vertical.
 *
 * Un halo de la triade suit le pointeur sur le fond (`--mx`, `--my`).
 * Aucune bibliothèque : l'ouverture est une transition CSS sur `flex`.
 *
 * Photos Unsplash (crédits dans DESIGN.md §11). Les pages Site internet par
 * métier restent hors index (décision D3) : le panneau Artisans mène à la
 * création de site.
 */

type Photo = { src: [string, string]; position: string; alt: string };

const PHOTOS: Record<SecteurSlug, Photo> = {
  "agences-immobilieres": {
    src: [photoImmo600, photoImmo1000],
    position: "60% 30%",
    alt: "Une agente immobilière tend les clés d'un logement",
  },
  btp: {
    src: [photoBtp600, photoBtp1000],
    position: "50% 25%",
    alt: "Un chef de chantier en casque de sécurité",
  },
  courtiers: {
    src: [photoCourtiers600, photoCourtiers1000],
    position: "50% 40%",
    alt: "Un courtier et sa cliente échangent autour d'un ordinateur",
  },
  restauration: {
    src: [photoRestau600, photoRestau1000],
    position: "50% 25%",
    alt: "Un restaurateur souriant en tablier",
  },
  sante: {
    src: [photoSante600, photoSante1000],
    position: "50% 25%",
    alt: "Une praticienne souriante en tenue de soin",
  },
  beaute: {
    src: [photoBeaute600, photoBeaute1000],
    position: "60% 40%",
    alt: "Une coiffeuse coiffe une cliente dans son salon",
  },
  automobile: {
    src: [photoAuto600, photoAuto1000],
    position: "50% 35%",
    alt: "Une mécanicienne souriante dans son garage",
  },
  "professions-liberales": {
    src: [photoLiberales600, photoLiberales1000],
    position: "55% 30%",
    alt: "Une avocate souriante dans son cabinet",
  },
};

/* L'ordre de la liste de futurdigital.fr : les artisans d'abord, puis les
   secteurs, les courtiers en dernier. */
const ORDRE: SecteurSlug[] = [
  "btp",
  "restauration",
  "sante",
  "beaute",
  "agences-immobilieres",
  "automobile",
  "professions-liberales",
  "courtiers",
];

/* Libellé court pour la bande couchée et le bouton : le libellé complet ne
   tient pas dans une bande de 76 px. */
const COURTS: Record<SecteurSlug, string> = {
  btp: "BTP",
  restauration: "Restauration",
  sante: "Santé",
  beaute: "Beauté",
  "agences-immobilieres": "Immobilier",
  automobile: "Automobile",
  "professions-liberales": "Professions libérales",
  courtiers: "Courtiers",
};

type Panneau = {
  cle: string;
  label: string;
  court: string;
  texte: string;
  points: string[];
  to: string;
  photo: Photo;
};

const PANNEAUX: Panneau[] = [
  {
    cle: "artisans",
    label: "Artisans",
    court: "Artisans",
    texte: "Un site pensé pour votre métier, qui fait sonner le téléphone et remplit l'agenda.",
    points: ["Site qui fait appeler", "Fiche Google tenue à jour", "Référencement local"],
    to: "/creation-site-internet/",
    photo: {
      src: [photoArtisans600, photoArtisans1000],
      position: "50% 30%",
      alt: "Un artisan souriant, outil en main",
    },
  },
  ...ORDRE.map((slug) => {
    const s = SECTEURS.find((x) => x.slug === slug)!;
    return {
      cle: s.slug,
      label: s.label,
      court: COURTS[slug],
      texte: s.carte,
      points: s.actions.slice(0, 3).map((a) => a.t),
      to: cheminSecteur(s),
      photo: PHOTOS[slug],
    };
  }),
];

const DUREE = 5000;

export function Secteurs() {
  const [actif, setActif] = useState(0);
  const [arret, setArret] = useState(false);
  const [visible, setVisible] = useState(false);
  const [auto, setAuto] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const n = PANNEAUX.length;

  /* Le défilé automatique ne tourne qu'à l'écran, sur grand écran, et
     jamais sous mouvement réduit. Le survol et le focus l'arrêtent. Sur
     téléphone, les panneaux changent de hauteur : un défilé automatique
     ferait sauter la page sous le doigt du lecteur. */
  useEffect(() => {
    setAuto(
      window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches,
    );
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tourne = auto && visible && !arret;
  useEffect(() => {
    if (!tourne) return;
    const t = window.setTimeout(() => setActif((i) => (i + 1) % n), DUREE);
    return () => window.clearTimeout(t);
  }, [tourne, actif, n]);

  const suivre = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <section
      ref={ref}
      id="secteurs"
      onPointerMove={suivre}
      className="vitrine-secteurs on-ink relative isolate overflow-hidden bg-ink py-20 sm:py-28"
    >
      <div aria-hidden="true" className="vitrine-halo absolute inset-0 -z-10" />
      <div aria-hidden="true" className="vitrine-grain absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          data-reveal
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="rail-label text-white/55">Secteurs</p>
            <h2 data-split className="display-section mt-3">
              Votre secteur, <span className="accent-word">vos demandes</span>
            </h2>
            <p className="mt-5 text-lg text-white/70">
              Chaque métier perd ses clients à un endroit différent. On commence par celui-là.
            </p>
          </div>

          <div className="flex items-end gap-6">
            <p className="font-display leading-none font-extrabold tracking-[-0.05em]">
              <Compteur valeur={n} className="vitrine-chiffre text-[clamp(4.5rem,9vw,7.5rem)]" />
              <span className="ml-2 align-top text-lg font-bold tracking-tight text-white/60">
                secteurs
              </span>
            </p>
            <div className="hidden gap-2 lg:flex">
              <button
                type="button"
                aria-label="Secteur précédent"
                onClick={() => setActif((i) => (i - 1 + n) % n)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-white/60 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Secteur suivant"
                onClick={() => setActif((i) => (i + 1) % n)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-white/60 hover:bg-white/10"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="vitrine mt-12 flex flex-col gap-2 lg:h-[34rem] lg:flex-row"
          onPointerEnter={() => setArret(true)}
          onPointerLeave={() => setArret(false)}
          onFocus={() => setArret(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setArret(false);
          }}
        >
          {PANNEAUX.map((p, i) => {
            const ouvert = i === actif;
            const idCorps = `vitrine-corps-${p.cle}`;
            return (
              <article
                key={p.cle}
                className={`vitrine-panneau relative isolate overflow-hidden rounded-[1.5rem] ${ouvert ? "est-ouvert" : ""}`}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActif(i);
                }}
              >
                <img
                  src={p.photo.src[1]}
                  srcSet={`${p.photo.src[0]} 600w, ${p.photo.src[1]} 1000w`}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  width={1000}
                  height={1250}
                  loading="lazy"
                  alt={p.photo.alt}
                  className="vitrine-photo absolute inset-0 -z-20 h-full w-full object-cover"
                  style={{ objectPosition: p.photo.position }}
                />
                <span aria-hidden="true" className="vitrine-voile absolute inset-0 -z-10" />

                {/* Bande repliée : numéro et libellé couché. Elle sert de
                    bouton d'ouverture, au clavier comme au doigt. */}
                <button
                  type="button"
                  onClick={() => setActif(i)}
                  aria-expanded={ouvert}
                  aria-controls={idCorps}
                  className="vitrine-bande absolute inset-0 z-10 flex w-full items-center gap-3 px-5 text-left lg:flex-col lg:justify-between lg:px-0 lg:py-6"
                >
                  <span className="rail-num font-display text-sm font-bold text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="vitrine-libelle font-display text-lg font-bold tracking-tight text-white">
                    {p.court}
                  </span>
                </button>

                <div
                  id={idCorps}
                  className="vitrine-corps relative flex h-full flex-col justify-end p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="rail-num font-display text-sm font-bold text-white/70">
                      {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                    </span>
                    <span className="h-px w-10 bg-white/40" />
                  </div>
                  <h3 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
                    {p.label}
                  </h3>
                  <p className="mt-3 max-w-md text-white/80">{p.texte}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] text-white backdrop-blur-sm"
                      >
                        <Check className="h-3.5 w-3.5 text-signal" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={p.to}
                    tabIndex={ouvert ? 0 : -1}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:gap-3"
                  >
                    Voir la page {p.court.toLowerCase()}
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Barre de progression du défilé automatique. La clé la
                      relance à chaque changement de panneau. */}
                  {ouvert && tourne && (
                    <span
                      key={`barre-${actif}`}
                      aria-hidden="true"
                      className="vitrine-barre absolute inset-x-0 bottom-0 h-1 origin-left"
                      style={{ animationDuration: `${DUREE}ms` }}
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
