import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { TableauEmpile } from "@/components/TableauEmpile";
import { CARTE, TEXTE_GRIS } from "@/components/produit/Produit";
import { APP_REF } from "@/data/offres";
import type { Pilier } from "@/data/piliers";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Les blocs communs aux deux pages piliers artisans (16 novembre 2026) : fil
 * d'Ariane, corps de texte, questions fréquentes, données structurées et
 * cartes de liens entrants.
 *
 * Même allure que les pages produits (fond blanc, titres `titre-produit`,
 * cartes gris très clair) : ces pages sont des guides, pas une nouvelle
 * charte. Le texte de chaque page vit dans sa route.
 */

/** Le fil d'Ariane, en haut de page : Sitaly App puis le nom de la page. */
export function FilDAriane({ nom }: { nom: string }) {
  return (
    <nav aria-label="Fil d'Ariane" className={`flex items-center gap-1.5 text-sm ${TEXTE_GRIS}`}>
      <Link to="/" className="hover:text-black">
        Sitaly App
      </Link>
      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="text-black">{nom}</span>
    </nav>
  );
}

/**
 * L'espace insécable devant « : ; ? ! », comme sur les titres du blog
 * (src/routes/blog.$slug.tsx) et des pages métier : sans elle, le signe part
 * seul en tête de ligne quand le titre se replie, ce qui arrive sur téléphone
 * comme sur un grand écran.
 */
export const insecable = (texte: string) => texte.replace(/ ([:;?!])/g, " $1");

/** Un titre de section du guide. */
export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="titre-produit text-[1.9rem] sm:text-4xl">
      {typeof children === "string" ? insecable(children) : children}
    </h2>
  );
}

/** Un paragraphe du guide, à la largeur de lecture. */
export function P({ children }: { children: React.ReactNode }) {
  return <p className={`mt-5 text-lg leading-8 ${TEXTE_GRIS}`}>{children}</p>;
}

/** Une section du guide, dans la colonne de lecture. */
export function Bloc({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

/** L'habillage d'un lien posé au fil du texte. */
const LIEN_TEXTE = "font-medium text-black underline underline-offset-4";

/**
 * Le même lien, mais seul sur sa ligne : il prend 44 px de haut sur téléphone,
 * et retrouve la hauteur de son texte dès `sm` (SITA-28). Au fil d'une phrase on
 * ne peut pas grandir sans décaler l'interligne ; seul sur sa ligne, si.
 */
const LIEN_TEXTE_SEUL = `inline-flex min-h-11 items-center sm:min-h-0 ${LIEN_TEXTE}`;

/**
 * Un lien de texte vers une autre page du site.
 *
 * `seul` quand le lien occupe sa propre ligne : il devient alors une zone à
 * toucher de 44 px, ce qu'un lien au fil d'une phrase ne peut pas être.
 */
export function LienTexte({
  to,
  seul,
  children,
}: {
  to: string;
  seul?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} className={seul ? LIEN_TEXTE_SEUL : LIEN_TEXTE}>
      {children}
    </Link>
  );
}

/**
 * Un lien de texte vers une page produit. Les produits passent par la route
 * dynamique /produits/$id/ : le chemin complet en dur ne tient pas dans le
 * type de `to`.
 */
export function LienProduit({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Link to="/produits/$id/" params={{ id }} className={LIEN_TEXTE}>
      {children}
    </Link>
  );
}

/** Un lien de texte vers un article du blog, par sa route dynamique. */
export function LienArticle({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link to="/blog/$slug/" params={{ slug }} className={LIEN_TEXTE}>
      {children}
    </Link>
  );
}

/** Un lien de texte vers un modèle de site, par sa route dynamique. */
export function LienModele({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Link to="/modeles/$id/" params={{ id }} className={LIEN_TEXTE}>
      {children}
    </Link>
  );
}

/** Les questions fréquentes, dépliables, comme sur les pages produits. */
export function FaqPilier({ items }: { items: readonly { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="mt-8 space-y-3">
      {items.map((f) => (
        <details key={f.q} className={`${CARTE} group p-5`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
            {insecable(f.q)}
            <span className="text-xl leading-none transition group-open:rotate-45">+</span>
          </summary>
          <p className={`mt-3 leading-7 ${TEXTE_GRIS}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Un tableau de comparaison, même habillage que ceux des articles du blog.
 * Les cellules viennent toujours de CREATEUR_IA (src/data/offres.ts) quand
 * elles portent un prix.
 */
export function TableauPilier({
  entetes,
  lignes,
  legende,
}: {
  entetes: readonly string[];
  lignes: readonly (readonly string[])[];
  legende?: string;
}) {
  return <TableauEmpile entetes={entetes} lignes={lignes} legende={legende} classe="mt-8" />;
}

/** La carte d'un lien entrant vers un pilier, posée en bas des pages du site. */
export function CartePilier({ pilier }: { pilier: Pilier }) {
  return (
    <Link
      to={pilier.chemin}
      className={`${CARTE} group flex items-start justify-between gap-4 p-6 transition hover:bg-black/[0.05]`}
    >
      <span>
        <span className="block font-semibold">{pilier.ancre}</span>
        <span className={`mt-1 block text-sm ${TEXTE_GRIS}`}>{pilier.resume}</span>
      </span>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

/**
 * Les données structurées d'une page pilier : la page, ses questions et son
 * fil d'Ariane. `avecApplication` ajoute le nœud `SoftwareApplication` de
 * l'application, réservé à la page « créer un site internet d'artisan » : la
 * page sur les devis et factures ne le double pas, puisque
 * /produits/devis-et-factures/ le porte déjà (risque de doublon signalé dans
 * le document source). Les deux pages citent quand même l'application en
 * `about`, car Google ne suit pas un @id d'une page à l'autre.
 */
export function scriptsPilier({
  pilier,
  faq,
  avecApplication = false,
}: {
  pilier: Pilier;
  faq: readonly { q: string; aTexte: string }[];
  avecApplication?: boolean;
}) {
  const url = `${BASE_URL}${pilier.chemin}`;
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${url}#page`,
            url,
            name: pilier.seoTitre,
            description: pilier.description,
            inLanguage: "fr-FR",
            isPartOf: { "@id": `${BASE_URL}/#website` },
            about: avecApplication ? { "@id": APP_REF["@id"] } : APP_REF,
          },
          ...(avecApplication ? [APP_REF] : []),
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.aTexte },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
              { "@type": "ListItem", position: 2, name: pilier.nom, item: url },
            ],
          },
        ],
      }),
    },
  ];
}

/** Les balises meta d'une page pilier, identiques d'une page à l'autre. */
export function metaPilier(pilier: Pilier) {
  const url = `${BASE_URL}${pilier.chemin}`;
  return {
    meta: [
      { title: pilier.seoTitre },
      { name: "description", content: pilier.description },
      { property: "og:title", content: pilier.seoTitre },
      { property: "og:description", content: pilier.description },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
