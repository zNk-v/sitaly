import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { LinkedinLink } from "@/components/LinkedinLink";
import { SECTEURS, cheminSecteur } from "@/data/secteurs";
import { COULEURS_FAMILLE, FAMILLES, entreesFamille } from "@/data/expertises";
import {
  SITALY_DEPARTEMENT,
  SITALY_PHONE,
  SITALY_PHONE_DISPLAY,
  SITALY_VILLE,
} from "@/lib/config";

/**
 * Pied de page unique du site.
 *
 * Il en existait deux : une version riche sur l'accueil et une version réduite
 * à une ligne de liens sur les pages secondaires. Les pages d'expertise étant
 * désormais nombreuses, le pied de page devient la carte du site : chacune est
 * accessible depuis n'importe quelle autre en un clic, ce qui vaut autant pour
 * le visiteur que pour l'exploration par les moteurs.
 *
 * Les colonnes sortent de `entreesFamille` : ajouter une expertise l'y fait
 * apparaître sans toucher à ce fichier.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink pt-16 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <SitalyLogo variant="blanc" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Agents IA, automatisations et sites pour les PME. Un seul interlocuteur, celui qui
              construit.
            </p>
            <p className="mt-2 max-w-xs text-sm text-white/60">
              Basé à {SITALY_VILLE} ({SITALY_DEPARTEMENT}).
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a
                href={`tel:${SITALY_PHONE}`}
                className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-brand"
              >
                <Phone className="h-4 w-4" />
                {SITALY_PHONE_DISPLAY}
              </a>
              <a
                href="mailto:contact@sitaly.fr"
                className="inline-flex items-center gap-2 text-white/60 transition hover:text-white"
              >
                <Mail className="h-4 w-4" />
                contact@sitaly.fr
              </a>
            </div>
            <div className="mt-5">
              <LinkedinLink variant="clair" />
            </div>
          </div>

          {FAMILLES.map((f) => (
            <nav key={f.id} aria-label={f.titre}>
              {/* Sur l'encre, ce sont les jetons `-on-ink` qu'il faut : les
                  jetons d'encre de la triade tombent sous 2:1 sur ce fond. */}
              <div className="rail-label" style={{ color: COULEURS_FAMILLE[f.id].surEncre }}>
                {f.titre}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                {entreesFamille(f.id).map((e) => (
                  <li key={e.label}>
                    {e.to ? (
                      <Link to={e.to} className="block py-0.5 transition hover:text-white">
                        {e.label}
                      </Link>
                    ) : (
                      <a href={e.href} className="block py-0.5 transition hover:text-white">
                        {e.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <nav aria-label="Le site">
            <div className="rail-label text-white/60">Sitaly</div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/60">
              <li>
                <Link to="/" className="transition hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/realisations/" className="transition hover:text-white">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link to="/blog/" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/a-propos/" className="transition hover:text-white">
                  À propos
                </Link>
              </li>
            </ul>
          </nav>
          {/* Les pages métier artisans sont sorties de l'index le 26 septembre
              2026 (src/lib/indexation.ts) : elles quittent la carte du site.
              Les pages Agents IA par secteur prennent leur place. */}
          <nav aria-label="Agents IA par secteur" className="mt-6">
            <div className="rail-label text-white/60">Agents IA par secteur</div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/60">
              {SECTEURS.map((s) => (
                <li key={s.slug}>
                  <Link to={cheminSecteur(s)} className="transition hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Sitaly</div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <Link to="/mentions-legales/" className="py-2 transition hover:text-white">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite/" className="py-2 transition hover:text-white">
              Confidentialité
            </Link>
            <Link to="/cgv/" className="py-2 transition hover:text-white">
              CGV
            </Link>
            <Link to="/cookies/" className="py-2 transition hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
