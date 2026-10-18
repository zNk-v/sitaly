import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  FileText,
  Globe,
  Inbox,
  MapPin,
  MessageSquare,
  MousePointerClick,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
} from "lucide-react";

/**
 * La phrase qui résume l'offre, épinglée pendant trois écrans de défilement,
 * pendant que des cartes d'interface entrent et sortent autour d'elle par
 * groupes. Chaque groupe allume son mot dans la phrase. C'est la section
 * « Futur Digital réunit tout » de la référence.
 *
 * Depuis le recentrage du 18 octobre 2026, la phrase dit ce que comprend un
 * site Sitaly, quel que soit son format : le design, la fiche Google, le
 * référencement local et l'entretien.
 *
 * Une seule mesure par image : la progression dans la section, qui donne le
 * groupe actif. Tout le reste est en transitions CSS. Sous `lg`, ni épingle
 * ni cartes : la phrase seule, à hauteur normale.
 */

type Carte = {
  icone: React.ComponentType<{ className?: string }>;
  haut: string;
  corps: React.ReactNode;
  sombre?: boolean;
};

type Groupe = { mot: string; couleur: string; cartes: [Carte, Carte, Carte, Carte] };

const GROUPES: Groupe[] = [
  {
    mot: "un design sur mesure",
    couleur: "text-blue-ink",
    cartes: [
      { icone: Globe, haut: "votre-entreprise.fr", corps: "Maquette validée en un appel" },
      {
        icone: Sparkles,
        haut: "Score mobile",
        corps: (
          <>
            <span className="block font-display text-3xl font-extrabold tracking-tight">100</span>
            sur 100
          </>
        ),
        sombre: true,
      },
      { icone: MousePointerClick, haut: "Bouton Appeler", corps: "Visible sur chaque page" },
      { icone: FileText, haut: "Textes", corps: "Écrits pour vous, à partir de l'appel" },
    ],
  },
  {
    mot: "votre fiche Google",
    couleur: "text-red-ink",
    cartes: [
      { icone: MapPin, haut: "Google Maps", corps: "« Fleuriste Brétigny-sur-Orge »" },
      { icone: Star, haut: "Avis clients", corps: "Demandés après chaque prestation" },
      {
        icone: Target,
        haut: "Photos publiées",
        corps: (
          <>
            <span className="block font-display text-3xl font-extrabold tracking-tight">6</span>
            ce mois-ci
          </>
        ),
        sombre: true,
      },
      { icone: RefreshCw, haut: "Horaires", corps: "À jour, jours fériés compris" },
    ],
  },
  {
    mot: "le référencement local",
    couleur: "text-violet-ink",
    cartes: [
      { icone: Search, haut: "Recherche Google", corps: "« Tatoueur près de chez moi »" },
      {
        icone: Target,
        haut: "Pages par ville",
        corps: (
          <>
            <span className="block font-display text-3xl font-extrabold tracking-tight">12</span>
            communes couvertes
          </>
        ),
        sombre: true,
      },
      { icone: Globe, haut: "Données structurées", corps: "Adresse, horaires, zone" },
      { icone: MessageSquare, haut: "ChatGPT et Gemini", corps: "Des pages qu'ils savent lire" },
    ],
  },
  {
    mot: "l'entretien du site",
    couleur: "text-blue-ink",
    cartes: [
      { icone: RefreshCw, haut: "Modification demandée", corps: "Nouveaux tarifs en ligne" },
      { icone: ShieldCheck, haut: "HTTPS", corps: "Certificat renouvelé sans vous" },
      {
        icone: Sparkles,
        haut: "Chargement",
        corps: (
          <>
            <span className="block font-display text-3xl font-extrabold tracking-tight">0,8 s</span>
            sur mobile
          </>
        ),
        sombre: true,
      },
      { icone: Inbox, haut: "Sauvegarde", corps: "Faite chaque nuit" },
    ],
  },
];

/* Les quatre places autour de la phrase, et l'inclinaison de chacune. */
const PLACES = [
  "left-[3%] top-[13%] -rotate-3",
  "right-[4%] top-[10%] rotate-2",
  "left-[7%] bottom-[12%] rotate-2",
  "right-[6%] bottom-[15%] -rotate-2",
];

export function Manifeste() {
  const ref = useRef<HTMLElement>(null);
  const [actif, setActif] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const grand = window.matchMedia("(min-width: 1024px)");
    let image = 0;
    const mesurer = () => {
      image = 0;
      if (!grand.matches) return;
      const r = el.getBoundingClientRect();
      const course = r.height - window.innerHeight;
      const p = course > 0 ? Math.min(0.999, Math.max(0, -r.top / course)) : 0;
      setActif(Math.floor(p * GROUPES.length));
    };
    const planifier = () => {
      if (!image) image = requestAnimationFrame(mesurer);
    };
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener("scroll", planifier, { passive: true });
        planifier();
      } else {
        window.removeEventListener("scroll", planifier);
      }
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", planifier);
      if (image) cancelAnimationFrame(image);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Ce que comprend un site Sitaly"
      className="relative bg-gradient-to-b from-paper-sunk to-paper lg:h-[260vh]"
    >
      <div className="relative flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
          {GROUPES.map((g, gi) =>
            g.cartes.map((c, ci) => (
              <div
                key={`${gi}-${ci}`}
                className={`manifeste-carte absolute w-60 rounded-2xl border p-4 shadow-elevated ${PLACES[ci]} ${
                  c.sombre
                    ? "border-white/10 bg-ink text-white"
                    : "border-border bg-card text-foreground"
                } ${gi === actif ? "est-actif" : gi < actif ? "est-passe" : ""}`}
                style={{ "--d": `${ci * 70}ms` } as React.CSSProperties}
              >
                <div
                  className={`flex items-center gap-2 text-[12px] ${c.sombre ? "text-white/60" : "text-muted-foreground"}`}
                >
                  <c.icone className="h-4 w-4 shrink-0" />
                  <span className="truncate">{c.haut}</span>
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug">{c.corps}</p>
              </div>
            )),
          )}
        </div>

        <p className="relative mx-auto max-w-3xl text-center font-display text-[clamp(1.6rem,3.4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.03em]">
          Chaque site Sitaly comprend{" "}
          {GROUPES.map((g, i) => (
            <span key={g.mot}>
              {/* Sous `lg`, tous les mots gardent leur teinte. Au-dessus, seul
                  le mot du groupe actif la garde, les autres s'effacent. */}
              <span
                className={`transition-colors duration-500 ${g.couleur} ${
                  i === actif ? "" : "lg:text-foreground/35"
                }`}
              >
                {g.mot}
              </span>
              {i < GROUPES.length - 2 ? ", " : i === GROUPES.length - 2 ? " et " : ""}
            </span>
          ))}
          , suivis par la personne qui le construit.
        </p>

        <a
          href="#process"
          className="rail-label relative mt-12 inline-flex flex-col items-center gap-2 text-muted-foreground transition hover:text-foreground"
        >
          Continuez la visite
          <span className="grid h-8 w-8 place-items-center rounded-full border border-border">
            <ChevronDown className="h-4 w-4" />
          </span>
        </a>

        <p className="absolute bottom-6 hidden text-xs text-muted-foreground lg:block">
          Illustrations d'interfaces. Les chiffres et les textes sont des exemples.
        </p>
      </div>
    </section>
  );
}
