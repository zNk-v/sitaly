import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PARTENAIRES_EN_LIGNE } from "@/data/partenaires";
import { ANNEE_DU_BUILD } from "@/lib/date-du-build";
import { ChevronDown, Instagram, Linkedin, Phone, Youtube } from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { LINKEDIN_URL } from "@/components/LinkedinLink";
import { lienCreation } from "@/components/produit/Produit";
import { APP_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY, SITALY_VILLE_PUBLIQUE } from "@/lib/config";

/**
 * Pied de page unique du site (refonte du 30 octobre 2026, sur le modèle de
 * durable.com) : Produit, Ressources, Outils, Comparer, Entreprise, puis les
 * réseaux.
 *
 * Les entrées sans page portent « Bientôt » et ne sont pas des liens : le
 * guide, les tutoriels et le générateur de logo arrivent ensuite. Le
 * parrainage a sa page depuis le 5 novembre 2026. Les pages de l'agence restent en ligne hors
 * menu ; la ligne « Aussi chez Sitaly » garde un lien vers les principales.
 */

type Entree =
  | { label: string; to: string; hash?: string }
  | { label: string; href: string }
  | { label: string; bientot: true };

/**
 * Les pages « site internet + métier » et la page locale (audit OpenSEO du
 * 25 novembre 2026) : liées depuis chaque page du site, elles reçoivent le
 * maillage qui leur manquait. /essonne/ n'avait aucun lien entrant.
 */
const METIERS: { label: string; to: string }[] = [
  { label: "Artisan", to: "/creer-site-internet-artisan/" },
  { label: "Plombier", to: "/site-internet-plombier/" },
  { label: "Électricien", to: "/site-internet-electricien/" },
  { label: "Couvreur", to: "/site-internet-couvreur/" },
  { label: "Maçon", to: "/site-internet-macon/" },
  { label: "Peintre", to: "/site-internet-peintre/" },
  { label: "Menuisier", to: "/site-internet-menuisier/" },
  { label: "Paysagiste", to: "/site-internet-paysagiste/" },
  { label: "Carreleur", to: "/site-internet-carreleur/" },
  { label: "Chauffagiste", to: "/site-internet-chauffagiste/" },
  { label: "Serrurier", to: "/site-internet-serrurier/" },
  { label: "En Essonne", to: "/essonne/" },
];

const COLONNES: { titre: string; entrees: Entree[] }[] = [
  {
    titre: "Produit",
    entrees: [
      { label: "Créer mon site", href: lienCreation() },
      { label: "Fonctionnalités", to: "/", hash: "fonctionnalites" },
      { label: "Devis et factures", to: "/produits/devis-et-factures/" },
      { label: "Prise de rendez-vous", to: "/produits/prise-de-rendez-vous/" },
      { label: "Agents IA", to: "/produits/agents-ia/" },
      { label: "Avis Google", to: "/produits/avis-google/" },
      { label: "Blog écrit par l'IA", to: "/produits/blog-ia/" },
      { label: "SEO et GEO", to: "/produits/referencement-seo-geo/" },
      { label: "Identité de marque", to: "/produits/identite-de-marque/" },
      { label: "Modèles de sites", to: "/modeles/" },
      { label: "Tarifs", to: "/tarifs/" },
      { label: "Se connecter", href: `${APP_URL}/connexion` },
    ],
  },
  {
    titre: "Ressources",
    entrees: [
      { label: "Blog", to: "/blog/" },
      { label: "Guide de démarrage", to: "/guides/publier/" },
      { label: "Tutoriels vidéo", to: "/guides/" },
    ],
  },
  {
    titre: "Outils",
    entrees: [
      { label: "Vérifier un nom de domaine", to: "/outils/verifier-nom-de-domaine/" },
      { label: "Générateur de nom", to: "/outils/generateur-nom-entreprise/" },
      { label: "Générateur de devis", to: "/outils/generateur-devis-gratuit/" },
      { label: "Générateur de mentions légales", to: "/outils/generateur-mentions-legales/" },
      { label: "Générateur de logo", to: "/produits/identite-de-marque/" },
    ],
  },
  {
    titre: "Comparer",
    entrees: [
      { label: "Wix", to: "/comparer/wix/" },
      { label: "WordPress", to: "/comparer/wordpress/" },
      { label: "Squarespace", to: "/comparer/squarespace/" },
      { label: "Une agence web", to: "/comparer/agence/" },
    ],
  },
  {
    titre: "Entreprise",
    entrees: [
      { label: "À propos", to: "/a-propos/" },
      { label: "Réalisations", to: "/realisations/" },
      { label: "Nous contacter", to: "/mon-projet/" },
      { label: "Parrainage", to: "/parrainage/" },
      // Le lien n'apparaît qu'une fois la rubrique ouverte (PARTENAIRES_EN_LIGNE, src/data/partenaires.ts).
      ...(PARTENAIRES_EN_LIGNE ? [{ label: "Offres partenaires", to: "/partenaires/" }] : []),
    ],
  },
];

const AUSSI: { label: string; to: string }[] = [
  { label: "Campagnes Google Ads", to: "/acquisition/" },
  { label: "Site géré par Sitaly", to: "/offres/presence/" },
];

/**
 * 44 px de haut sur téléphone, la taille d'un pouce : les liens du pied de page
 * faisaient 31 px et se touchaient les uns les autres (SITA-28). À partir de `lg`,
 * où le pointeur est une souris, la liste retrouve sa densité.
 */
const LIEN =
  "flex min-h-11 items-center text-black/60 transition hover:text-black lg:min-h-0 lg:py-1";

/**
 * Une rubrique du pied de page, repliée sur téléphone (SITA-31).
 *
 * Les 29 liens à 44 px — la taille d'un pouce, acquise en SITA-28 — faisaient
 * un pied de page de 2 331 px, soit 2,76 écrans à 390 px, répétés sur les cinq
 * pages du parcours. Repliées, les cinq rubriques tiennent en cinq lignes, et
 * les liens restent dans le HTML : Google les lit comme avant.
 *
 * Le serveur rend la rubrique ouverte, comme sur ordinateur : le premier rendu
 * du navigateur lui est donc identique, sans écart d'hydratation ni
 * clignotement sur grand écran. Le repli arrive ensuite, et seulement sous
 * 640 px — là où le pied de page est de toute façon sous la ligne de
 * flottaison, hors de portée du CLS.
 */
function ColonnePied({ colonne }: { colonne: (typeof COLONNES)[number] }) {
  const [replie, setReplie] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) setReplie(true);
  }, []);
  return (
    <details
      open={!replie}
      onToggle={(e) => setReplie(!e.currentTarget.open)}
      className="border-b border-black/[0.06] sm:border-0"
    >
      <summary
        className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-semibold sm:min-h-0 sm:cursor-default [&::-webkit-details-marker]:hidden"
        /* Sans repli, le titre n'est plus un bouton : la souris ne doit rien
           ouvrir ni fermer sur grand écran. */
        onClick={(e) => {
          if (!window.matchMedia("(max-width: 639px)").matches) e.preventDefault();
        }}
      >
        {colonne.titre}
        <ChevronDown
          className="h-4 w-4 shrink-0 text-black/40 transition-transform duration-200 sm:hidden"
          style={{ transform: replie ? "none" : "rotate(180deg)" }}
          aria-hidden="true"
        />
      </summary>
      <ul className="mt-3 pb-2 text-[15px] sm:pb-0">
        {colonne.entrees.map((e) => (
          <li key={e.label}>
            <Ligne e={e} />
          </li>
        ))}
      </ul>
    </details>
  );
}

function Ligne({ e }: { e: Entree }) {
  if ("bientot" in e) {
    return (
      <span className="flex min-h-11 items-center gap-2 text-black/40 lg:min-h-0 lg:py-1">
        <span className="min-w-0">{e.label}</span>
        <span className="shrink-0 rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-medium text-black/50">
          Bientôt
        </span>
      </span>
    );
  }
  if ("href" in e) {
    return (
      <a href={e.href} className={LIEN}>
        {e.label}
      </a>
    );
  }
  return (
    <Link to={e.to} hash={e.hash} className={LIEN}>
      {e.label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-black/[0.06] bg-white pt-16 text-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(5,1fr)]">
          <div>
            <SitalyLogo />
            <p className="mt-4 max-w-xs text-base leading-relaxed text-black/60 sm:text-[15px]">
              Le créateur de site internet par l'IA, conçu en France pour les indépendants et les
              petites entreprises.
            </p>
            <a
              href={`tel:${SITALY_PHONE}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-base font-semibold transition hover:text-black/70 sm:min-h-0 sm:text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITALY_PHONE_DISPLAY}
            </a>
            <div className="mt-6">
              <div className="text-sm font-semibold">Réseaux</div>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sitaly sur LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] transition hover:bg-black/[0.08] sm:h-10 sm:w-10"
                >
                  <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
                {[
                  {
                    nom: "Instagram",
                    Icone: Instagram,
                    url: "https://www.instagram.com/sitaly.fr/",
                  },
                  { nom: "YouTube", Icone: Youtube, url: "https://www.youtube.com/@sitaly-fr" },
                ].map(({ nom, Icone, url }) => (
                  <a
                    key={nom}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Sitaly sur ${nom}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] transition hover:bg-black/[0.08] sm:h-10 sm:w-10"
                  >
                    <Icone className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {COLONNES.map((c) => (
            <nav key={c.titre} aria-label={c.titre}>
              <ColonnePied colonne={c} />
            </nav>
          ))}
        </div>

        <nav
          aria-label="Site internet par métier"
          className="mt-12 flex flex-wrap items-center gap-x-5 border-t border-black/[0.06] pt-6 text-base text-black/50 sm:gap-y-1 sm:text-sm"
        >
          <span className="font-medium text-black/70">Site internet par métier :</span>
          {METIERS.map((m) => (
            <Link key={m.to} to={m.to} className="inline-flex min-h-11 items-center transition hover:text-black sm:min-h-0">
              {m.label}
            </Link>
          ))}
        </nav>

        <nav
          aria-label="Aussi chez Sitaly"
          className="mt-12 flex flex-wrap items-center gap-x-5 border-t border-black/[0.06] pt-6 text-base text-black/50 sm:gap-y-1 sm:text-sm"
        >
          <span className="font-medium text-black/70">Aussi chez Sitaly :</span>
          {AUSSI.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="inline-flex min-h-11 items-center transition hover:text-black sm:min-h-0 sm:py-1"
            >
              {a.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm text-black/50 sm:flex-row sm:text-xs">
          <div>
            © {ANNEE_DU_BUILD} Sitaly · Entreprise française, {SITALY_VILLE_PUBLIQUE}
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 sm:gap-y-1">
            {[
              { to: "/mentions-legales/", label: "Mentions légales" },
              { to: "/politique-confidentialite/", label: "Confidentialité" },
              { to: "/cgv/", label: "CGV" },
              { to: "/cookies/", label: "Cookies" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex min-h-11 items-center transition hover:text-black sm:min-h-0 sm:py-2"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Le nom en très grand, coupé par le bas de la page, comme chez Durable. */}
      <div
        aria-hidden="true"
        className="titre-produit mt-8 -mb-[0.22em] text-center text-[26vw] leading-[0.8] text-black/[0.05] select-none"
      >
        Sitaly
      </div>
    </footer>
  );
}
