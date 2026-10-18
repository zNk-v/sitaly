import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Check, CornerDownRight, ShoppingBag, Wrench } from "lucide-react";
import { cheminExpertise, expertise } from "@/data/expertises";
import { FlecheRonde } from "@/components/accueil/communs";

import photoChatgpt800 from "@/assets/photos/service-chatgpt-800.webp";
import photoChatgpt1400 from "@/assets/photos/service-chatgpt-1400.webp";
import photoGoogle800 from "@/assets/photos/service-google-800.webp";
import photoGoogle1400 from "@/assets/photos/service-google-1400.webp";
import photoSite800 from "@/assets/photos/service-site-800.webp";
import photoSite1400 from "@/assets/photos/service-site-1400.webp";

/**
 * Les services de l'accueil (recentrage du 18 octobre 2026) :
 * - Detail : trois formats expliqués en rangées alternées, photo de banque
 *   d'images (Unsplash) et carte d'interface à cheval sur son coin ;
 * - Formats : les six formats en défilé horizontal épinglé ;
 * - AllerPlusLoin : la maintenance et les agents IA, en deux cartes
 *   compactes sur l'encre.
 *
 * Mouvement : la photo glisse depuis son côté, la carte monte un temps plus
 * tard (`.rangee-photo`, `.rangee-carte`, déclenchés par `data-reveal`).
 */

type Habillage = { photo: [string, string]; position: string; alt: string; carte: React.ReactNode };

/* Les photos gardent la légende qui décrit ce qu'elles montrent : elles
   illustrent un usage, jamais un client (DESIGN.md §11). */
const HABILLAGE: Record<string, Habillage> = {
  vitrine: {
    photo: [photoSite800, photoSite1400],
    position: "50% 30%",
    alt: "Un artisan souriant dans son atelier",
    carte: <CarteSite />,
  },
  ecommerce: {
    photo: [photoChatgpt800, photoChatgpt1400],
    position: "50% 35%",
    alt: "Un client souriant, ordinateur portable en main",
    carte: <CarteCommande />,
  },
  refonte: {
    photo: [photoGoogle800, photoGoogle1400],
    position: "50% 40%",
    alt: "Une particulière cherche un artisan sur son téléphone",
    carte: <CarteRedirections />,
  },
};

/** Une rangée : ce que le texte en face de la photo doit porter. */
type DetailFormat = {
  cle: string;
  categorie: string;
  titre: React.ReactNode;
  texte: React.ReactNode;
  points: readonly string[];
  cta: { label: string; to?: string; href?: string };
};

/** Les trois formats détaillés en rangées. Les repères viennent des pages
    elles-mêmes (src/data/expertises.ts). */
const DETAILS: DetailFormat[] = [
  {
    cle: "vitrine",
    categorie: "Site vitrine",
    titre: (
      <>
        Un site qui travaille <span className="accent-word">pendant que vous travaillez</span>
      </>
    ),
    texte:
      "Vos prestations, vos réalisations, votre zone et vos avis, sur un site rapide et pensé pour le téléphone. Le bouton Appeler reste visible sur chaque page, et chaque demande de devis vous arrive directement.",
    points: expertise("site-vitrine").reperes,
    cta: { label: "Découvrir le site vitrine", to: "/site-vitrine/" },
  },
  {
    cle: "ecommerce",
    categorie: "Site e-commerce",
    titre: (
      <>
        Vendre en ligne <span className="accent-word">sans y passer vos soirées</span>
      </>
    ),
    texte:
      "Vos produits avec leurs photos, leurs prix et leurs stocks. Le paiement passe par une page sécurisée, et l'argent arrive directement sur votre compte. Ajouter un produit ou changer un prix fait partie du suivi.",
    points: expertise("site-e-commerce").reperes,
    cta: { label: "Découvrir le site e-commerce", to: "/site-e-commerce/" },
  },
  {
    cle: "refonte",
    categorie: "Refonte de site",
    titre: (
      <>
        Moderniser votre site <span className="accent-word">sans perdre Google</span>
      </>
    ),
    texte:
      "Un site qui date coûte des clients, mais le refaire sans précaution peut vous faire disparaître des recherches. On fait l'inventaire de vos pages avant les travaux, on redirige chaque ancienne adresse, puis on surveille vos positions.",
    points: expertise("refonte-site-internet").reperes,
    cta: { label: "Découvrir la refonte", to: "/refonte-site-internet/" },
  },
];

/** Les six formats de site, dans l'ordre où le client les présente. Le titre
    de carte peut différer du libellé de menu ; les repères viennent de la page
    elle-même (src/data/expertises.ts), pour ne rien promettre de plus. */
const FORMATS: { slug: string; titre: string; pour: string; schema: React.ReactNode }[] = [
  {
    slug: "creation-site-internet",
    titre: "Site internet sur mesure",
    pour: "Exister en ligne avec un site à vous, construit pour votre métier.",
    schema: <SchemaSurMesure />,
  },
  {
    slug: "site-vitrine",
    titre: "Site vitrine",
    pour: "Présenter votre activité, vos prestations, et recevoir des demandes de devis.",
    schema: <SchemaVitrine />,
  },
  {
    slug: "site-e-commerce",
    titre: "Site e-commerce",
    pour: "Vendre vos produits en ligne, avec le paiement et la livraison compris.",
    schema: <SchemaBoutique />,
  },
  {
    slug: "landing-page",
    titre: "Landing page",
    pour: "Une offre, une campagne ou un lancement : une page, une seule action.",
    schema: <SchemaLanding />,
  },
  {
    slug: "refonte-site-internet",
    titre: "Refonte de site",
    pour: "Moderniser un site qui date, sans perdre votre place sur Google.",
    schema: <SchemaRefonte />,
  },
  {
    slug: "site-evenementiel",
    titre: "Site événementiel",
    pour: "Un salon, une ouverture, un festival : en ligne le temps de l'opération.",
    schema: <SchemaEvenement />,
  },
];

/**
 * Les six formats en défilé horizontal épinglé (demande du client du
 * 18 octobre 2026, dans l'esprit des sections « horizontal scroll » de
 * 21st.dev) : à partir de `lg`, la section se fige et les cartes glissent de
 * droite à gauche pendant le défilement vertical.
 *
 * Une seule mesure par image : la progression dans la section, convertie en
 * translation de la piste (écrite directement sur le style, sans rendu React).
 * La hauteur de la section est calculée pour que la course verticale égale la
 * course horizontale. Sous `lg`, ou si le visiteur réduit les animations, pas
 * d'épingle : une rangée qui défile au doigt, cartes aimantées.
 */
export function Formats() {
  const section = useRef<HTMLElement>(null);
  const piste = useRef<HTMLUListElement>(null);
  const barre = useRef<HTMLSpanElement>(null);
  const [epingle, setEpingle] = useState(false);
  const [course, setCourse] = useState(0);

  useEffect(() => {
    const el = section.current;
    const rail = piste.current;
    if (!el || !rail) return;
    const requete = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let image = 0;

    const mesurerCourse = () => {
      const actif = requete.matches;
      setEpingle(actif);
      if (!actif) {
        rail.style.transform = "";
        return;
      }
      const parent = rail.parentElement;
      const largeur = parent ? parent.clientWidth : window.innerWidth;
      setCourse(Math.max(0, rail.scrollWidth - largeur));
    };

    const suivre = () => {
      image = 0;
      if (!requete.matches) return;
      const r = el.getBoundingClientRect();
      const verticale = r.height - window.innerHeight;
      const p = verticale > 0 ? Math.min(1, Math.max(0, -r.top / verticale)) : 0;
      const parent = rail.parentElement;
      const largeur = parent ? parent.clientWidth : window.innerWidth;
      const horizontale = Math.max(0, rail.scrollWidth - largeur);
      rail.style.transform = `translate3d(${-p * horizontale}px,0,0)`;
      if (barre.current) barre.current.style.transform = `scaleX(${p})`;
    };
    const planifier = () => {
      if (!image) image = requestAnimationFrame(suivre);
    };

    mesurerCourse();
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener("scroll", planifier, { passive: true });
        planifier();
      } else {
        window.removeEventListener("scroll", planifier);
      }
    });
    obs.observe(el);
    const surRedim = () => {
      mesurerCourse();
      planifier();
    };
    window.addEventListener("resize", surRedim);
    requete.addEventListener("change", surRedim);
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", surRedim);
      requete.removeEventListener("change", surRedim);
      if (image) cancelAnimationFrame(image);
    };
  }, []);

  return (
    <section
      ref={section}
      id="formats"
      aria-label="Les six formats de site"
      className="relative bg-paper"
      style={epingle ? { height: `calc(100vh + ${course}px)` } : undefined}
    >
      <div
        className={
          epingle
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24"
            : "py-16 sm:py-20"
        }
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <EnTete
              titre={
                <>
                  Un site pour <span className="accent-word">chaque projet</span>
                </>
              }
              texte="Six formats, la même méthode : un appel pour comprendre votre activité, des textes écrits pour vous, puis un site en ligne, hébergé et tenu à jour."
            />
            {epingle && (
              <div aria-hidden="true" className="w-56 shrink-0 pb-2">
                <p className="rail-label text-muted-foreground">Faites défiler</p>
                <span className="mt-3 block h-1 overflow-hidden rounded-full bg-border">
                  <span
                    ref={barre}
                    style={{ transform: "scaleX(0)" }}
                    className="block h-full origin-left rounded-full bg-[image:var(--gradient-ruban)]"
                  />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* La piste démarre aligné sur la colonne de texte et finit sur le
            bord droit de cette même colonne. */}
        <div
          className={`mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 ${
            epingle ? "" : "overflow-x-auto overscroll-x-contain [scrollbar-width:none]"
          }`}
        >
          <ul
            ref={piste}
            className={`flex gap-4 lg:gap-5 ${epingle ? "w-max will-change-transform" : "snap-x snap-mandatory"}`}
          >
            {FORMATS.map((f) => {
              const e = expertise(f.slug);
              return (
                <li key={f.slug} className="w-[min(82vw,22rem)] shrink-0 snap-start lg:w-[25rem]">
                  <Link
                    to={cheminExpertise(e)}
                    className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-elevated sm:p-6"
                  >
                    <div
                      aria-hidden="true"
                      className="h-40 overflow-hidden rounded-[1.25rem] border border-border bg-paper-sunk p-4"
                    >
                      {f.schema}
                    </div>
                    <h3 className="mt-6 font-display text-[1.6rem] font-extrabold leading-[1.1] tracking-[-0.03em] transition-colors group-hover:text-brand-ink">
                      {f.titre}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{f.pour}</p>
                    <ul className="mt-5 space-y-2 text-[15px]">
                      {e.reperes.map((r) => (
                        <li key={r} className="flex items-center gap-2.5">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal/20 text-signal-ink">
                            <Check className="h-3 w-3" />
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                    <span className="lien-service mt-auto pt-7">
                      Découvrir
                      <FlecheRonde />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mx-auto mt-6 w-full max-w-7xl px-4 text-xs text-muted-foreground sm:px-6">
          Schémas d'interface, à titre d'illustration.
        </p>
      </div>
    </section>
  );
}

/**
 * Trois formats vus de près, en rangées alternées. C'est l'ancienne mise en
 * scène des services (photo, carte d'interface, explication, repères), mise
 * au service des sites. Première section sous le premier écran : elle remonte
 * dessus, coins arrondis.
 */
export function Detail() {
  return (
    <section
      id="detail"
      className="relative z-10 -mt-10 overflow-x-clip rounded-t-[2.5rem] bg-gradient-to-b from-paper-sunk via-paper to-paper pt-16 pb-16 sm:pt-20 sm:pb-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EnTete
          titre={
            <>
              Un site pensé pour <span className="accent-word">ce que vous faites</span>
            </>
          }
          texte="Présenter votre activité, vendre en ligne ou remettre à neuf un site qui date : trois projets qu'on nous confie souvent, expliqués."
        />
        <div className="mt-14 space-y-20 sm:mt-16 sm:space-y-28">
          {DETAILS.map((l, i) => (
            <Rangee key={l.cle} levier={l} rang={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Les autres services, après les sites : deux cartes compactes sur l'encre,
 * sans photo. Les demandes de chantier en sont sorties le 18 octobre 2026
 * (Sitaly n'avance plus le budget publicitaire) ; la maintenance de sites
 * existants prend leur place.
 */
const AUTRES_OFFRES = [
  {
    icone: Wrench,
    categorie: "Maintenance de site",
    titre: "Votre site existant, entretenu chaque mois",
    texte:
      "Un site fait ailleurs, sous WordPress ou autre ? On le reprend : audit, sauvegardes, mises à jour et corrections mineures, pour une mensualité sans engagement.",
    href: "/tarifs/#maintenance",
    lien: "Voir le tarif",
  },
  {
    icone: Bot,
    categorie: "Agents IA",
    titre: "Chaque demande reçue, traitée",
    texte:
      "Des agents qui décrochent, qualifient, proposent des rendez-vous et relancent les devis restés sans réponse. Ils se présentent comme une IA et passent la main quand il le faut.",
    to: "/agents-ia/",
    lien: "Découvrir le service",
  },
];

type AutreOffre = (typeof AUTRES_OFFRES)[number];

/* La maintenance n'a pas de page de service : sa carte mène à son tarif. */
function CarteLien({
  o,
  className,
  children,
}: {
  o: AutreOffre;
  className: string;
  children: React.ReactNode;
}) {
  return "to" in o && o.to ? (
    <Link to={o.to} className={className}>
      {children}
    </Link>
  ) : (
    <a href={"href" in o ? o.href : "#contact"} className={className}>
      {children}
    </a>
  );
}

export function AllerPlusLoin() {
  return (
    <section
      id="aller-plus-loin"
      className="on-ink fond-rayures relative overflow-x-clip bg-ink py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <EnTete
          sombre
          titre={
            <>
              Quand le site tourne, <span className="accent-word">on peut aller plus loin</span>
            </>
          }
          texte="Pour un site que vous avez déjà, ou pour ne plus perdre une demande."
        />
        <ul className="stagger mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {AUTRES_OFFRES.map((o, i) => (
            <li key={o.categorie} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <CarteLien
                o={o}
                className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-8"
              >
                <p className="rail-label flex items-center gap-2 text-white/55">
                  <o.icone className="h-4 w-4" />
                  {o.categorie}
                </p>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
                  {o.titre}
                </h3>
                <p className="mt-3 leading-relaxed text-white/70">{o.texte}</p>
                <span className="lien-service mt-auto pt-7">
                  {o.lien}
                  <FlecheRonde />
                </span>
              </CarteLien>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-white/60">
          Et aussi :{" "}
          {AUTRES.map((a, i) => (
            <span key={a.label}>
              <a
                href={a.href}
                className="font-medium text-white/85 underline decoration-white/25 underline-offset-4 transition hover:decoration-white"
              >
                {a.label}
              </a>
              {i < AUTRES.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* Liens simples : /chatgpt-ads/ est servie depuis public/, hors du routeur. */
const AUTRES = [
  { label: "ChatGPT Ads", href: "/chatgpt-ads/" },
  { label: "Référencement local", href: "/referencement-local/" },
  { label: "Référencement IA", href: "/referencement-ia/" },
  { label: "Automatisation des tâches", href: "/automatisation-taches/" },
  { label: "CRM sur mesure", href: "/crm-sur-mesure/" },
];

function EnTete({
  titre,
  texte,
  sombre = false,
}: {
  titre: React.ReactNode;
  texte: string;
  sombre?: boolean;
}) {
  return (
    <div data-reveal className="max-w-2xl">
      <h2 data-split className="display-section">
        {titre}
      </h2>
      <p className={`mt-5 text-lg ${sombre ? "text-white/70" : "text-muted-foreground"}`}>
        {texte}
      </p>
    </div>
  );
}

function Rangee({
  levier: l,
  rang,
  sombre = false,
}: {
  levier: DetailFormat;
  rang: number;
  sombre?: boolean;
}) {
  const h = HABILLAGE[l.cle];
  const inverse = rang % 2 === 1;
  const lien = l.cta.to ? (
    <Link to={l.cta.to} className="lien-service">
      Découvrir le service
      <FlecheRonde />
    </Link>
  ) : (
    <a href={l.cta.href} className="lien-service">
      Découvrir le service
      <FlecheRonde />
    </a>
  );

  return (
    <article className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      <div
        data-reveal
        className={`rangee relative ${inverse ? "rangee--droite lg:order-2" : "rangee--gauche"}`}
      >
        <img
          src={h.photo[1]}
          srcSet={`${h.photo[0]} 800w, ${h.photo[1]} 1400w`}
          sizes="(min-width: 1024px) 600px, 100vw"
          width={1400}
          height={934}
          loading="lazy"
          alt={h.alt}
          className="rangee-photo aspect-[4/3] w-full rounded-[1.75rem] object-cover"
          style={{ objectPosition: h.position }}
        />
        <div
          className={`rangee-carte sur-papier absolute -bottom-8 w-[min(20rem,80%)] ${
            inverse ? "-left-3 sm:-left-8" : "-right-3 sm:-right-8"
          }`}
        >
          {h.carte}
        </div>
      </div>

      <div data-reveal className={inverse ? "lg:order-1" : ""}>
        <p className={`rail-label ${sombre ? "text-white/55" : "text-brand-ink"}`}>{l.categorie}</p>
        <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
          {l.titre}
        </h3>
        <p
          className={`measure mt-5 text-lg leading-relaxed ${sombre ? "text-white/70" : "text-muted-foreground"}`}
        >
          {l.texte}
        </p>
        <ul className="mt-7 space-y-3">
          {l.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal/20 text-signal-ink">
                <Check className={`h-3 w-3 ${sombre ? "text-signal" : ""}`} />
              </span>
              <span className={sombre ? "text-white/90" : ""}>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9">{lien}</div>
      </div>
    </article>
  );
}

/* ---- Cartes d'interface, construites en balisage (DESIGN.md §7) ---- */

function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-left text-foreground shadow-elevated">
      {children}
    </div>
  );
}

function CarteSite() {
  return (
    <Cadre>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-2 flex-1 truncate rounded-md bg-paper-sunk px-2 py-0.5 text-[11px] text-muted-foreground">
          votre-entreprise.fr
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-2.5 w-4/5 rounded bg-foreground/80" />
        <div className="h-2.5 w-3/5 rounded bg-foreground/80" />
        <div className="h-2 w-full rounded bg-border" />
      </div>
      <div className="mt-3 flex gap-2">
        <span className="rounded-full bg-[image:var(--gradient-ruban)] px-3 py-1 text-[11px] font-semibold text-white">
          Appeler
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold">
          Devis gratuit
        </span>
      </div>
      <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-signal/15 px-2.5 py-1.5 text-[12px] font-semibold text-signal-ink">
        <Check className="h-3.5 w-3.5" />
        Nouvelle demande reçue
      </p>
    </Cadre>
  );
}

/* Une commande reçue sur une boutique. Exemple, sans chiffre de résultat. */
function CarteCommande() {
  return (
    <Cadre>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <ShoppingBag className="h-3.5 w-3.5" />
          Nouvelle commande · 14:32
        </span>
        <span>Exemple</span>
      </div>
      <p className="mt-2 text-sm font-semibold">2 × Bougie Figue noire</p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">
        Payée par carte · livraison Colissimo
      </p>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 text-[12px] font-semibold text-signal-ink">
        <Check className="h-3.5 w-3.5" />
        Paiement reçu, colis à préparer
      </p>
    </Cadre>
  );
}

/* Le plan de redirection d'une refonte : chaque ancienne adresse mène à la
   nouvelle. Exemple. */
function CarteRedirections() {
  const lignes = [
    ["/tarifs.html", "/tarifs/"],
    ["/contact.php", "/contact/"],
    ["/nos-chantiers", "/realisations/"],
  ];
  return (
    <Cadre>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Redirections 301</span>
        <span>Exemple</span>
      </div>
      <ul className="mt-2 space-y-1.5 font-mono text-[11.5px]">
        {lignes.map(([avant, apres]) => (
          <li key={avant} className="flex items-center gap-1.5">
            <span className="truncate text-muted-foreground line-through decoration-border">
              {avant}
            </span>
            <CornerDownRight className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="truncate font-semibold">{apres}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 text-[12px] font-semibold text-signal-ink">
        <Check className="h-3.5 w-3.5" />
        Aucune ancienne page perdue
      </p>
    </Cadre>
  );
}

/* ---- Schémas des six formats, construits en balisage (DESIGN.md §7) ----
   Ils montrent la forme de chaque format, sans copier l'interface d'aucun
   produit. Décoratifs : la carte qui les porte est masquée aux lecteurs
   d'écran à cet endroit (aria-hidden sur le cadre). */

function Barre({ className = "" }: { className?: string }) {
  return <span className={`block rounded bg-foreground/75 ${className}`} />;
}
function Ligne({ className = "" }: { className?: string }) {
  return <span className={`block rounded bg-border ${className}`} />;
}
function Navigateur({
  children,
  url = "votre-entreprise.fr",
}: {
  children: React.ReactNode;
  url?: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-3 shadow-soft">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="ml-1.5 flex-1 truncate rounded bg-paper-sunk px-1.5 text-[10px] text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="mt-2.5 flex-1">{children}</div>
    </div>
  );
}

function SchemaSurMesure() {
  return (
    <Navigateur>
      <div className="space-y-1.5">
        <Barre className="h-2 w-4/5" />
        <Barre className="h-2 w-3/5" />
        <Ligne className="h-1.5 w-full" />
        <Ligne className="h-1.5 w-11/12" />
      </div>
      <div className="mt-3 flex gap-1.5">
        <span className="rounded-full bg-[image:var(--gradient-ruban)] px-2.5 py-0.5 text-[10px] font-semibold text-white">
          Appeler
        </span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-semibold">
          Devis gratuit
        </span>
      </div>
    </Navigateur>
  );
}

function SchemaVitrine() {
  return (
    <Navigateur>
      <Barre className="h-2 w-1/2" />
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {["Prestations", "Réalisations", "Contact"].map((t) => (
          <span
            key={t}
            className="truncate rounded-md border border-border bg-paper-sunk px-1 py-2.5 text-center text-[9px] font-medium text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-2.5 flex items-center gap-1 text-[10px] font-semibold text-signal-ink">
        <Check className="h-3 w-3" />
        Nouvelle demande reçue
      </p>
    </Navigateur>
  );
}

function SchemaBoutique() {
  return (
    <Navigateur url="votre-boutique.fr">
      <div className="flex gap-2.5">
        <span className="h-[4.25rem] w-14 shrink-0 rounded-lg bg-[image:var(--gradient-ruban)] opacity-80" />
        <div className="min-w-0 flex-1">
          <Barre className="h-1.5 w-4/5" />
          <p className="mt-1.5 text-[11px] font-semibold tabular-nums">29,00 €</p>
          <span className="mt-1.5 inline-block rounded-full bg-foreground px-2 py-0.5 text-[9px] font-semibold text-background">
            Ajouter au panier
          </span>
        </div>
        <span className="flex h-6 shrink-0 items-center gap-1 rounded-full border border-border px-1.5 text-[9px] font-semibold">
          <ShoppingBag className="h-3 w-3" />2
        </span>
      </div>
    </Navigateur>
  );
}

function SchemaLanding() {
  return (
    <Navigateur url="offre.votre-entreprise.fr">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Barre className="h-2 w-4/5" />
        <Barre className="mt-1.5 h-2 w-3/5" />
        <span className="mt-3 rounded-full bg-[image:var(--gradient-ruban)] px-4 py-1 text-[10px] font-semibold text-white">
          Réserver mon créneau
        </span>
      </div>
    </Navigateur>
  );
}

function SchemaRefonte() {
  return (
    <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-2">
      <div className="flex h-full flex-col rounded-xl border border-dashed border-border bg-card/60 p-2.5">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Avant
        </span>
        <div className="mt-2 space-y-1">
          <Ligne className="h-1.5 w-full" />
          <Ligne className="h-1.5 w-2/3" />
          <Ligne className="h-4 w-full" />
          <Ligne className="h-1.5 w-1/2" />
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
      <div className="flex h-full flex-col rounded-xl border border-border bg-card p-2.5 shadow-soft">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-brand-ink">
          Après
        </span>
        <div className="mt-2 space-y-1">
          <Barre className="h-1.5 w-4/5" />
          <Ligne className="h-1.5 w-full" />
        </div>
        <span className="mt-auto self-start rounded-full bg-[image:var(--gradient-ruban)] px-2 py-0.5 text-[9px] font-semibold text-white">
          Appeler
        </span>
      </div>
    </div>
  );
}

function SchemaEvenement() {
  return (
    <Navigateur url="salon-2026.fr">
      <div className="flex items-center gap-2.5">
        <span className="grid h-12 w-11 shrink-0 place-items-center rounded-lg bg-ink text-center leading-none text-white">
          <span>
            <span className="block font-display text-base font-extrabold">14</span>
            <span className="text-[8px] font-semibold uppercase tracking-wider">nov.</span>
          </span>
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <Barre className="h-1.5 w-4/5" />
          <Ligne className="h-1.5 w-3/5" />
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="rounded-full bg-[image:var(--gradient-ruban)] px-2.5 py-0.5 text-[10px] font-semibold text-white">
          S'inscrire
        </span>
        <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">J-12</span>
      </div>
    </Navigateur>
  );
}
