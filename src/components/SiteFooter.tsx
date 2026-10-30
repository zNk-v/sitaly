import { Link } from "@tanstack/react-router";
import { ANNEE_DU_BUILD } from "@/lib/date-du-build";
import { Instagram, Linkedin, Phone, Youtube } from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { LINKEDIN_URL } from "@/components/LinkedinLink";
import { lienCreation } from "@/components/produit/Produit";
import {
  APP_URL,
  SITALY_DEPARTEMENT,
  SITALY_PHONE,
  SITALY_PHONE_DISPLAY,
  SITALY_VILLE,
} from "@/lib/config";

/**
 * Pied de page unique du site (refonte du 30 octobre 2026, sur le modèle de
 * durable.com) : Produit, Ressources, Outils, Comparer, Entreprise, puis les
 * réseaux.
 *
 * Les entrées sans page portent « Bientôt » et ne sont pas des liens : le
 * guide, les tutoriels, le générateur de logo et le programme d'affiliation
 * arrivent ensuite. Les pages de l'agence restent en ligne hors
 * menu ; la ligne « Aussi chez Sitaly » garde un lien vers les principales.
 */

type Entree =
  | { label: string; to: string; hash?: string }
  | { label: string; href: string }
  | { label: string; bientot: true };

const COLONNES: { titre: string; entrees: Entree[] }[] = [
  {
    titre: "Produit",
    entrees: [
      { label: "Créer mon site", href: lienCreation() },
      { label: "Fonctionnalités", to: "/", hash: "fonctionnalites" },
      { label: "Prise de rendez-vous", to: "/produits/prise-de-rendez-vous/" },
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
      { label: "Guide de démarrage", bientot: true },
      { label: "Tutoriels vidéo", bientot: true },
    ],
  },
  {
    titre: "Outils",
    entrees: [
      { label: "Vérifier un nom de domaine", to: "/outils/verifier-nom-de-domaine/" },
      { label: "Générateur de nom", to: "/outils/generateur-nom-entreprise/" },
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
      { label: "Programme d'affiliation", bientot: true },
    ],
  },
];

const AUSSI: { label: string; to: string }[] = [
  { label: "Campagnes Google Ads", to: "/acquisition/" },
  { label: "Référencement local", to: "/referencement-local/" },
  { label: "Site sur mesure", to: "/mon-projet/" },
  { label: "Agents IA", to: "/agents-ia/" },
];

const LIEN = "block py-1 text-black/60 transition hover:text-black";

function Ligne({ e }: { e: Entree }) {
  if ("bientot" in e) {
    return (
      <span className="flex items-center gap-2 py-1 text-black/40">
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
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-black/60">
              Le créateur de site internet par l'IA, conçu en France pour les indépendants et les
              petites entreprises.
            </p>
            <a
              href={`tel:${SITALY_PHONE}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-black/70"
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] transition hover:bg-black/[0.08]"
                >
                  <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
                {[
                  { nom: "Instagram", Icone: Instagram },
                  { nom: "YouTube", Icone: Youtube },
                ].map(({ nom, Icone }) => (
                  <span
                    key={nom}
                    title={`${nom} : bientôt`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] text-black/30"
                  >
                    <Icone className="h-[18px] w-[18px]" aria-hidden="true" />
                    <span className="sr-only">{nom}, bientôt</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {COLONNES.map((c) => (
            <nav key={c.titre} aria-label={c.titre}>
              <div className="text-sm font-semibold">{c.titre}</div>
              <ul className="mt-3 text-[15px]">
                {c.entrees.map((e) => (
                  <li key={e.label}>
                    <Ligne e={e} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <nav
          aria-label="Aussi chez Sitaly"
          className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-black/[0.06] pt-6 text-sm text-black/50"
        >
          <span className="font-medium text-black/70">Aussi chez Sitaly :</span>
          {AUSSI.map((a) => (
            <Link key={a.to} to={a.to} className="py-1 transition hover:text-black">
              {a.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-black/50 sm:flex-row">
          <div>
            © {ANNEE_DU_BUILD} Sitaly · Entreprise française, {SITALY_VILLE} ({SITALY_DEPARTEMENT})
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <Link to="/mentions-legales/" className="py-2 transition hover:text-black">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite/" className="py-2 transition hover:text-black">
              Confidentialité
            </Link>
            <Link to="/cgv/" className="py-2 transition hover:text-black">
              CGV
            </Link>
            <Link to="/cookies/" className="py-2 transition hover:text-black">
              Cookies
            </Link>
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
