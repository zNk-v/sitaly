import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, ArrowUp, Lock, Sparkles, Star } from "lucide-react";
import { lienCreation } from "@/components/produit/Produit";

/**
 * Les blocs vivants de l'accueil de sitaly.fr (30 octobre 2026), après l'étude
 * de durable.com : des métiers en action, la barre IA qui suit le visiteur,
 * des fonctions qui s'animent, une conversation avec l'IA, et les outils que
 * Sitaly remplace. Chaque animation part quand son bloc entre à l'écran et
 * s'efface si le visiteur a demandé moins d'animations (styles.css, « Vitrine »).
 *
 * Les photos de métiers sont créées par l'IA (FLUX.2 pro, scripts/images-vitrine.ts
 * de sitaly-saas) ; les entreprises montrées sur les petits sites sont inventées.
 */

/** Pose .est-visible quand l'élément entre à l'écran (une seule fois). */
export function useVisible<T extends HTMLElement>(seuil = 0.25) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: seuil },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [seuil, visible]);
  return { ref, visible, classe: visible ? "est-visible" : "" };
}

const reduit = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------------------
   Les métiers en action
   --------------------------------------------------------------------------- */

export interface Metier {
  id: string;
  /** « le site de votre … » */
  activite: string;
  entreprise: string;
  titre: string;
  phrase: string;
  couleur: string;
  accent: string;
}

export const METIERS: Metier[] = [
  {
    id: "fleuriste",
    activite: "boutique de fleurs",
    entreprise: "Atelier Pivoine",
    titre: "Des bouquets qui racontent votre histoire",
    phrase: "Fleuriste à Nantes, bouquets de mariage et livraison",
    couleur: "#3d2a33",
    accent: "#e8a0b4",
  },
  {
    id: "plombier",
    activite: "entreprise de plomberie",
    entreprise: "Garnier Plomberie",
    titre: "Votre plombier, chez vous dans l'heure",
    phrase: "Plombier chauffagiste à Arpajon, dépannage rapide",
    couleur: "#0a2540",
    accent: "#f4471c",
  },
  {
    id: "coach",
    activite: "activité de coach sportive",
    entreprise: "Léa Coaching",
    titre: "Bougez mieux, dès la première séance",
    phrase: "Coach sportive à Bordeaux, en plein air et à domicile",
    couleur: "#17302a",
    accent: "#f2c94c",
  },
  {
    id: "boulanger",
    activite: "boulangerie",
    entreprise: "Le Fournil d'Or",
    titre: "Pain au levain, cuit chaque matin",
    phrase: "Boulangerie artisanale à Lyon, pain au levain",
    couleur: "#3d2614",
    accent: "#d9a35b",
  },
  {
    id: "coiffeuse",
    activite: "salon de coiffure",
    entreprise: "Studio Lune",
    titre: "Coupe, couleur et soin, sur rendez-vous",
    phrase: "Salon de coiffure à Lille, coupe et couleur",
    couleur: "#2b323b",
    accent: "#c48b9f",
  },
  {
    id: "paysagiste",
    activite: "entreprise de paysage",
    entreprise: "Vert Cerisier",
    titre: "Des jardins entretenus toute l'année",
    phrase: "Paysagiste en Essonne, création et entretien de jardins",
    couleur: "#2f4a3a",
    accent: "#c9e4a6",
  },
  {
    id: "photographe",
    activite: "activité de photographe",
    entreprise: "Instants Clairs",
    titre: "Vos plus beaux souvenirs, sans pose",
    phrase: "Photographe de mariage en Gironde",
    couleur: "#111111",
    accent: "#e5e5e5",
  },
  {
    id: "osteopathe",
    activite: "cabinet d'ostéopathie",
    entreprise: "Cabinet Morel",
    titre: "Retrouvez votre équilibre, en douceur",
    phrase: "Ostéopathe à Massy, adultes, sportifs et nourrissons",
    couleur: "#3d4d63",
    accent: "#a8c3d9",
  },
  {
    id: "traiteur",
    activite: "activité de traiteur",
    entreprise: "Maison Verrier",
    titre: "Des réceptions dont on se souvient",
    phrase: "Traiteur pour mariages et événements à Bordeaux",
    couleur: "#1f2a37",
    accent: "#e0a458",
  },
];

const sousDomaine = (nom: string) =>
  nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const photo = (id: string, taille: 768 | 1536 = 1536) =>
  `/vitrine/metiers/${id}-${taille}.webp`;

/** Un petit site, aux couleurs du métier, qui montre ce que l'IA en a fait. */
export function MiniSite({ m, className = "" }: { m: Metier; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="ml-2 flex items-center gap-1 truncate text-[10px] text-black/50">
          <Lock className="h-2.5 w-2.5 text-[#16a34a]" />
          {sousDomaine(m.entreprise)}.sitaly.fr
        </span>
      </div>
      <div className="relative">
        <img src={photo(m.id, 768)} alt="" className="h-28 w-full object-cover" loading="lazy" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${m.couleur}f0 0%, ${m.couleur}b0 55%, transparent 100%)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-4 text-white">
          <div className="text-[9px] font-semibold tracking-wide uppercase opacity-80">
            {m.entreprise}
          </div>
          <div className="mt-1 max-w-[70%] text-[13px] leading-tight font-semibold">{m.titre}</div>
          <span
            className="mt-2 inline-flex w-fit rounded-full px-2.5 py-1 text-[9px] font-semibold"
            style={{ background: m.accent, color: m.couleur }}
          >
            Demander un devis
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2.5">
        {["Services", "Avis", "Contact"].map((s) => (
          <div
            key={s}
            className="rounded-md bg-black/[0.04] py-2 text-center text-[9px] font-medium text-black/60"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Le carrousel du premier écran : une grande photo de métier en action, le
 * site que l'IA en tire en surimpression. Il avance seul toutes les 4,5 s ;
 * les points permettent de choisir, et le survol le met en pause.
 */
export function Carrousel() {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause || reduit()) return;
    const t = setInterval(() => setI((x) => (x + 1) % METIERS.length), 4500);
    return () => clearInterval(t);
  }, [pause]);

  return (
    <section
      aria-label="Exemples de métiers"
      className="overflow-hidden pt-4 pb-6"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <div className="relative mx-auto max-w-[1600px]">
        <div
          className="flex gap-4 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] sm:gap-6"
          style={
            {
              transform: `translateX(calc(${-i} * (var(--diapo) + var(--ecart)) + (100% - var(--diapo)) / 2))`,
              ["--diapo" as string]: "min(86vw, 1180px)",
              ["--ecart" as string]: "1.5rem",
            } as CSSProperties
          }
        >
          {METIERS.map((m, k) => (
            <figure
              key={m.id}
              className={`relative aspect-[4/5] w-[var(--diapo)] shrink-0 overflow-hidden rounded-[28px] transition-opacity duration-700 sm:aspect-[16/9] ${k === i ? "opacity-100" : "opacity-50"}`}
              aria-hidden={k !== i}
            >
              <picture>
                <source media="(max-width: 640px)" srcSet={photo(m.id, 768)} />
                <img
                  src={photo(m.id)}
                  alt={`Une personne au travail : ${m.activite}`}
                  className="h-full w-full object-cover"
                  loading={k < 2 ? "eager" : "lazy"}
                  width={1536}
                  height={864}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <figcaption className="absolute bottom-6 left-6 max-w-md text-white sm:bottom-10 sm:left-10">
                <div className="text-2xl leading-tight font-semibold tracking-tight sm:text-4xl">
                  Le site de votre {m.activite}, en une minute.
                </div>
                <a
                  href={lienCreation(m.phrase)}
                  tabIndex={k === i ? 0 : -1}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-black hover:bg-white"
                >
                  Essayer avec « {m.phrase.split(",")[0]} »
                  <ArrowRight className="h-4 w-4" />
                </a>
              </figcaption>
              <MiniSite
                m={m}
                className="absolute right-8 bottom-8 hidden w-72 md:block lg:right-12 lg:bottom-12 lg:w-80"
              />
            </figure>
          ))}
        </div>
        <div
          className="mt-6 flex justify-center gap-2"
          role="tablist"
          aria-label="Choisir un métier"
        >
          {METIERS.map((m, k) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={m.activite}
              onClick={() => setI(k)}
              className={`h-2 rounded-full transition-all ${k === i ? "w-7 bg-black/80" : "w-2 bg-black/20 hover:bg-black/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   La barre IA qui suit le visiteur
   --------------------------------------------------------------------------- */

/**
 * Collée en bas de l'écran pendant le défilement, comme chez Durable. Elle se
 * cache tant qu'une autre boîte IA (attribut data-boite-ia) est visible, et en
 * haut de page.
 */
export function BarreCollante() {
  const [montre, setMontre] = useState(false);
  const [activite, setActivite] = useState("");
  useEffect(() => {
    const boites = Array.from(document.querySelectorAll("[data-boite-ia]"));
    const visibles = new Set<Element>();
    const maj = () => setMontre(window.scrollY > 500 && visibles.size === 0);
    const obs = new IntersectionObserver((entrees) => {
      for (const e of entrees) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      maj();
    });
    boites.forEach((b) => obs.observe(b));
    window.addEventListener("scroll", maj, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", maj);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 transition-all duration-500 ${montre ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      aria-hidden={!montre}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = lienCreation(activite.trim());
        }}
        className="flex w-full max-w-xl items-center gap-2 rounded-full border border-black/10 bg-white/95 p-1.5 pl-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] backdrop-blur"
      >
        <Sparkles className="h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
        <label className="sr-only" htmlFor="barre-collante">
          Votre activité
        </label>
        <input
          id="barre-collante"
          tabIndex={montre ? 0 : -1}
          value={activite}
          onChange={(e) => setActivite(e.target.value)}
          placeholder="Quelle est votre activité ?"
          className="min-h-10 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-black/40"
        />
        <button
          type="submit"
          tabIndex={montre ? 0 : -1}
          aria-label="Créer mon site"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-black/85 px-4 text-sm font-medium text-white hover:bg-black"
        >
          <span className="hidden sm:inline">Créer mon site</span>
          <ArrowUp className="h-4 w-4 sm:hidden" />
        </button>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Les familles d'activités
   --------------------------------------------------------------------------- */

const FAMILLES = [
  {
    titre: "Artisans et dépannage",
    exemples: "Plombier, électricien, paysagiste",
    photo: "plombier",
    phrase: "Électricien à Rennes, dépannage et rénovation",
  },
  {
    titre: "Santé et bien-être",
    exemples: "Ostéopathe, coach, sophrologue",
    photo: "osteopathe",
    phrase: "Sophrologue à Paris, gestion du stress",
  },
  {
    titre: "Beauté",
    exemples: "Coiffure, esthétique, onglerie",
    photo: "coiffeuse",
    phrase: "Institut de beauté à Nice, soins du visage",
  },
  {
    titre: "Bouche et réceptions",
    exemples: "Boulangerie, traiteur, restaurant",
    photo: "traiteur",
    phrase: "Restaurant de quartier à Toulouse, cuisine maison",
  },
  {
    titre: "Commerces",
    exemples: "Fleuriste, épicerie fine, boutique",
    photo: "fleuriste",
    phrase: "Épicerie fine à Annecy, produits locaux",
  },
  {
    titre: "Créatifs et conseil",
    exemples: "Photographe, consultant, formateur",
    photo: "photographe",
    phrase: "Consultante RH indépendante à Lyon",
  },
];

export function Familles() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FAMILLES.map((f) => (
        <a
          key={f.titre}
          href={lienCreation(f.phrase)}
          className="group relative flex items-center gap-4 overflow-hidden rounded-3xl bg-black/[0.03] p-3 pr-5 transition hover:bg-black/[0.06]"
        >
          <img
            src={photo(f.photo, 768)}
            alt=""
            className="h-20 w-20 shrink-0 rounded-2xl object-cover"
            loading="lazy"
          />
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{f.titre}</span>
            <span className="mt-0.5 block text-sm text-black/55">{f.exemples}</span>
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white shadow-sm transition group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Les fonctions, en blocs animés
   --------------------------------------------------------------------------- */

function Bloc({
  titre,
  texte,
  children,
  className = "",
  sombre = false,
}: {
  titre: string;
  texte: string;
  children: ReactNode;
  className?: string;
  sombre?: boolean;
}) {
  const { ref, classe } = useVisible<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      className={`${classe} flex flex-col overflow-hidden rounded-3xl p-7 sm:p-8 ${sombre ? "bg-[#0d0f14] text-white" : "bg-black/[0.03]"} ${className}`}
    >
      <div className="flex-1">{children}</div>
      <h3 className="mt-7 text-xl font-semibold tracking-tight">{titre}</h3>
      <p className={`mt-1.5 leading-7 ${sombre ? "text-white/60" : "text-black/60"}`}>{texte}</p>
    </div>
  );
}

/** Le site se construit, section par section. */
function VisuelConstruction() {
  const sections = [
    {
      h: "h-24",
      contenu: (
        <div className="flex h-full flex-col justify-center gap-1.5 px-4">
          <div className="h-2.5 w-2/3 rounded-full bg-white/90" />
          <div className="h-2 w-1/2 rounded-full bg-white/60" />
          <div className="mt-1 h-5 w-20 rounded-full bg-[#f4471c]" />
        </div>
      ),
      fond: "bg-[#0a2540]",
    },
    {
      h: "h-14",
      contenu: (
        <div className="grid h-full grid-cols-3 gap-2 p-2.5">
          {[0, 1, 2].map((k) => (
            <div key={k} className="rounded-lg bg-black/[0.05]" />
          ))}
        </div>
      ),
      fond: "bg-white",
    },
    {
      h: "h-12",
      contenu: (
        <div className="flex h-full items-center gap-2 px-3">
          {[0, 1, 2, 3, 4].map((k) => (
            <Star key={k} className="h-3.5 w-3.5 fill-[#f5b301] text-[#f5b301]" />
          ))}
          <div className="ml-2 h-2 w-24 rounded-full bg-black/10" />
        </div>
      ),
      fond: "bg-[#eef4fa]",
    },
    {
      h: "h-12",
      contenu: (
        <div className="flex h-full items-center justify-between px-3">
          <div className="h-2 w-28 rounded-full bg-white/70" />
          <div className="h-6 w-16 rounded-full bg-white" />
        </div>
      ),
      fond: "bg-[#0a2540]",
    },
  ];
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-3 py-2">
        {[0, 1, 2].map((k) => (
          <span key={k} className="h-1.5 w-1.5 rounded-full bg-black/15" />
        ))}
        <span className="ml-2 text-[10px] text-black/45">garnier-plomberie.sitaly.fr</span>
      </div>
      {sections.map((s, k) => (
        <div
          key={k}
          className={`vitrine-monte ${s.h} ${s.fond}`}
          style={{ "--delai": `${0.3 + k * 0.45}s` } as CSSProperties}
        >
          {s.contenu}
        </div>
      ))}
    </div>
  );
}

/** Les demandes de contact qui arrivent. */
function VisuelDemandes() {
  const demandes = [
    ["Julie", "une fuite sous l'évier"],
    ["Marc", "un devis pour une salle de bain"],
    ["Sofia", "un rendez-vous jeudi"],
    ["Thomas", "le prix d'un chauffe-eau"],
    ["Nadia", "une intervention samedi"],
  ];
  const liste = [...demandes, ...demandes];
  return (
    <div className="relative h-44 overflow-hidden [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)]">
      <div className="vitrine-ticker space-y-2.5">
        {liste.map(([nom, objet], k) => (
          <div key={k} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#16a34a]/10 text-xs font-semibold text-[#16a34a]">
              {nom[0]}
            </span>
            <span className="min-w-0 text-sm">
              <span className="block font-semibold">Nouvelle demande</span>
              <span className="block truncate text-black/55">
                {nom} : {objet}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Le même site, quatre thèmes, qui changent d'un coup. */
function VisuelThemes() {
  const themes = [
    { nom: "Franc", fond: "#0a2540", texte: "#ffffff", accent: "#f4471c", police: "font-sans" },
    {
      nom: "Doux",
      fond: "#fcfaf6",
      texte: "#2b323b",
      accent: "#3d4d63",
      police: "font-serif italic",
    },
    { nom: "Joyeux", fond: "#fafbf6", texte: "#17302a", accent: "#f2c94c", police: "font-sans" },
    {
      nom: "Éclat",
      fond: "#0d0f14",
      texte: "#ffffff",
      accent: "#e11d48",
      police: "font-sans uppercase tracking-tight",
    },
  ];
  const [k, setK] = useState(0);
  const { ref, visible } = useVisible<HTMLDivElement>(0.4);
  useEffect(() => {
    if (!visible || reduit()) return;
    const t = setInterval(() => setK((x) => (x + 1) % themes.length), 1800);
    return () => clearInterval(t);
  }, [visible, themes.length]);
  const t = themes[k];
  return (
    <div ref={ref}>
      <div
        className="overflow-hidden rounded-2xl shadow-sm transition-colors duration-500"
        style={{ background: t.fond, color: t.texte }}
      >
        <div className="px-5 py-6">
          <div className={`text-lg leading-tight font-semibold ${t.police}`}>Studio Lune</div>
          <div className="mt-1 text-xs opacity-70">Coupe, couleur et soin</div>
          <span
            className="mt-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-500"
            style={{ background: t.accent, color: t.fond }}
          >
            Prendre rendez-vous
          </span>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        {themes.map((x, n) => (
          <span
            key={x.nom}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${n === k ? "bg-black/85 text-white" : "bg-white text-black/55"}`}
          >
            {x.nom}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Une photo créée par l'IA, en train de s'écrire. */
function VisuelPhotoIA() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src={photo("boulanger", 768)}
        alt=""
        className="aspect-[4/3] w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs shadow">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-ink" />
        <span className="truncate">Un boulanger sort ses baguettes du four</span>
        <span className="ml-auto shrink-0 text-black/45">5 crédits</span>
      </div>
    </div>
  );
}

/** Le site sur Google, et ses visites qui montent. */
function VisuelGoogle() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="text-[11px] text-black/45">studio-lune.sitaly.fr</div>
      <div className="mt-0.5 text-[15px] font-medium text-[#1a0dab]">
        Studio Lune, coiffeuse à Lille
      </div>
      <div className="mt-1 text-xs leading-5 text-black/60">
        Coupe, couleur et soin, sur rendez-vous. Ouvert du mardi au samedi.
      </div>
      <svg viewBox="0 0 300 70" className="mt-4 w-full" aria-hidden="true">
        <path
          className="vitrine-courbe"
          d="M0 62 C 40 60, 60 55, 90 50 S 150 40, 180 30 S 240 18, 300 6"
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-1 text-xs text-black/50">Visites de votre site</div>
    </div>
  );
}

/** L'adresse qui s'écrit, puis « En ligne ». */
function VisuelAdresse() {
  const adresse = "votre-nom.sitaly.fr";
  const { ref, visible } = useVisible<HTMLDivElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (reduit()) return setN(adresse.length);
    const t = setInterval(() => setN((x) => (x >= adresse.length ? x : x + 1)), 70);
    return () => clearInterval(t);
  }, [visible]);
  return (
    <div ref={ref} className="space-y-3">
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm shadow-sm">
        <Lock className="h-3.5 w-3.5 text-[#16a34a]" />
        <span className="font-medium">
          {adresse.slice(0, n)}
          <span className="vitrine-curseur">|</span>
        </span>
      </div>
      <div
        className={`flex items-center gap-2 text-sm transition-opacity duration-500 ${n >= adresse.length ? "opacity-100" : "opacity-0"}`}
      >
        <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
        En ligne, sécurisé, sur tous les écrans
      </div>
    </div>
  );
}

export function GrilleFonctions() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Bloc
        className="lg:col-span-2"
        titre="Un site complet en une minute"
        texte="Textes, mise en page, couleurs et photo : l'IA construit chaque section pour votre métier."
      >
        <VisuelConstruction />
      </Bloc>
      <Bloc
        titre="Les demandes arrivent"
        texte="Le formulaire de votre site vous envoie chaque demande par e-mail."
      >
        <VisuelDemandes />
      </Bloc>
      <Bloc
        titre="Quatre thèmes, un clic"
        texte="Franc, Doux, Joyeux ou Éclat : l'allure change, vos textes restent."
      >
        <VisuelThemes />
      </Bloc>
      <Bloc
        titre="Des photos créées par l'IA"
        texte="Pas de photo sous la main ? Décrivez-la, l'IA la crée pour vous."
      >
        <VisuelPhotoIA />
      </Bloc>
      <Bloc
        titre="Prêt pour Google"
        texte="Titre, description, fiche de votre entreprise et plan du site, dès la publication."
      >
        <VisuelGoogle />
      </Bloc>
      <Bloc
        className="lg:col-span-3"
        titre="En ligne en un clic"
        texte="Votre site est publié sur votre-nom.sitaly.fr. Bientôt, votre propre nom de domaine."
      >
        <div className="max-w-md">
          <VisuelAdresse />
        </div>
      </Bloc>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   La conversation avec l'IA
   --------------------------------------------------------------------------- */

const ECHANGES: {
  de: "client" | "ia";
  texte: string;
  titre?: string;
  tarifs?: boolean;
  ton?: boolean;
}[] = [
  { de: "client", texte: "Ajoute mes tarifs : coupe femme 38 €, couleur 55 €." },
  {
    de: "ia",
    texte: "C'est fait : une section Tarifs avec vos deux prix, juste après vos services.",
    tarifs: true,
  },
  { de: "client", texte: "Et un titre plus chaleureux en haut ?" },
  {
    de: "ia",
    texte: "Voici : « Prenez soin de vous, on s'occupe du reste ».",
    titre: "Prenez soin de vous, on s'occupe du reste",
    tarifs: true,
  },
  { de: "client", texte: "Passe le site en thème Doux." },
  {
    de: "ia",
    texte: "Thème Doux appliqué : tons crème et titres élégants. Vos textes n'ont pas bougé.",
    titre: "Prenez soin de vous, on s'occupe du reste",
    tarifs: true,
    ton: true,
  },
];

export function Conversation() {
  const { ref, visible } = useVisible<HTMLDivElement>(0.35);
  const [n, setN] = useState(0);
  const [ecrit, setEcrit] = useState(false);
  useEffect(() => {
    if (!visible) return;
    if (reduit()) return setN(ECHANGES.length);
    let k = 0;
    let arret = false;
    const suivant = () => {
      if (arret) return;
      if (k >= ECHANGES.length) {
        setTimeout(() => {
          if (arret) return;
          k = 0;
          setN(0);
          setTimeout(suivant, 900);
        }, 4500);
        return;
      }
      const ia = ECHANGES[k].de === "ia";
      setEcrit(ia);
      setTimeout(
        () => {
          if (arret) return;
          setEcrit(false);
          k += 1;
          setN(k);
          setTimeout(suivant, ia ? 1600 : 700);
        },
        ia ? 1300 : 600,
      );
    };
    const t = setTimeout(suivant, 500);
    return () => {
      arret = true;
      clearTimeout(t);
    };
  }, [visible]);

  const dernier = [...ECHANGES.slice(0, n)].reverse().find((e) => e.de === "ia");
  const titre = dernier?.titre ?? "Coupe, couleur et soin, sur rendez-vous";
  const doux = dernier?.ton;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2">
      <div className="min-h-[26rem] space-y-3" aria-live="polite">
        {ECHANGES.slice(0, n).map((e, k) => (
          <div key={k} className={`flex ${e.de === "client" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-6 ${e.de === "client" ? "bg-white text-black" : "bg-white/10 text-white"}`}
              style={{ animation: "vitrine-monte 0.4s ease-out" }}
            >
              {e.de === "ia" && <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-[#c4b5fd]" />}
              {e.texte}
            </div>
          </div>
        ))}
        {ecrit && (
          <div
            className="flex gap-1 rounded-2xl bg-white/10 px-4 py-3.5"
            style={{ width: "fit-content" }}
          >
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className="vitrine-point h-1.5 w-1.5 rounded-full bg-white"
                style={{ animationDelay: `${k * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>
      <div
        className="overflow-hidden rounded-2xl bg-white text-black shadow-2xl"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-3 py-2">
          {[0, 1, 2].map((k) => (
            <span key={k} className="h-1.5 w-1.5 rounded-full bg-black/15" />
          ))}
          <span className="ml-2 text-[10px] text-black/45">studio-lune.sitaly.fr</span>
        </div>
        <div
          className="px-6 py-8 transition-colors duration-700"
          style={{ background: doux ? "#fcfaf6" : "#2b323b", color: doux ? "#2b323b" : "#fff" }}
        >
          <div className="text-[10px] font-semibold tracking-wide uppercase opacity-70">
            Studio Lune
          </div>
          <div
            className={`mt-2 text-2xl leading-tight font-semibold transition-all duration-500 ${doux ? "font-serif italic" : ""}`}
          >
            {titre}
          </div>
          <span
            className="mt-4 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: doux ? "#3d4d63" : "#c48b9f", color: "#fff" }}
          >
            Prendre rendez-vous
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4">
          {["Coupe", "Couleur", "Soin"].map((s) => (
            <div
              key={s}
              className="rounded-lg bg-black/[0.04] py-3 text-center text-xs font-medium"
            >
              {s}
            </div>
          ))}
        </div>
        <div
          className={`grid transition-all duration-700 ${dernier?.tarifs ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-black/[0.06] px-6 py-5">
              <div className="text-sm font-semibold">Tarifs</div>
              <div className="mt-2 flex justify-between text-sm">
                <span>Coupe femme</span>
                <span className="font-semibold">38 €</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span>Couleur</span>
                <span className="font-semibold">55 €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Ce que Sitaly remplace
   --------------------------------------------------------------------------- */

const OUTILS = [
  { nom: "Créateur de site", couleur: "#2563eb", x: "4%", rot: "-8deg", chute: "150px" },
  { nom: "Hébergement", couleur: "#16a34a", x: "30%", rot: "5deg", chute: "170px" },
  { nom: "Rédacteur web", couleur: "#e11d48", x: "55%", rot: "-4deg", chute: "140px" },
  { nom: "Banque d'images", couleur: "#f59e0b", x: "86%", rot: "9deg", chute: "165px" },
  { nom: "Outil de référencement", couleur: "#7c3aed", x: "12%", rot: "7deg", chute: "205px" },
  { nom: "Formulaire de contact", couleur: "#0891b2", x: "47%", rot: "-10deg", chute: "215px" },
  { nom: "Graphiste", couleur: "#db2777", x: "78%", rot: "-3deg", chute: "225px" },
];

export function OutilsRemplaces() {
  const { ref, classe } = useVisible<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`${classe} relative mx-auto h-72 max-w-3xl`} aria-hidden="true">
      {OUTILS.map((o, k) => (
        <span
          key={o.nom}
          className="vitrine-pastille absolute top-0 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-lg sm:px-4 sm:py-2 sm:text-sm"
          style={
            {
              // Le recul d'autant de sa propre largeur garde la pastille dans le cadre.
              left: o.x,
              translate: `-${o.x} 0`,
              background: o.couleur,
              "--rotation": o.rot,
              "--chute-bureau": o.chute,
              "--chute-mobile": `${20 + k * 34}px`,
              "--delai": `${k * 0.18}s`,
            } as CSSProperties
          }
        >
          {o.nom}
        </span>
      ))}
    </div>
  );
}
