import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKEDIN_URL } from "@/components/LinkedinLink";
import {
  SITALY_DEPARTEMENT,
  SITALY_PHONE,
  SITALY_PHONE_DISPLAY,
  SITALY_VILLE,
} from "@/lib/config";

import teddy448 from "@/assets/teddy-vidal-448.jpg";
import teddy672 from "@/assets/teddy-vidal-672.jpg";

const INSTAGRAM_URL = "https://instagram.com/sitaly.fr";

/**
 * Carte du fondateur : grande photo à gauche, carte qui la chevauche à droite.
 *
 * Adaptée d'un carrousel de profils 21st.dev, ramenée à une seule personne.
 * Ce qui a sauté avec le carrousel, et pourquoi :
 *
 * - Les flèches, les points et l'état d'index n'ont plus d'objet : naviguer
 *   entre une seule fiche ne mène nulle part.
 * - Framer Motion servait au fondu entre les fiches. Sans fiches à enchaîner,
 *   la dépendance n'a plus de raison d'entrer au bundle.
 * - `next/image` et `next/link` n'existent pas ici : le projet tourne sur Vite.
 *
 * Les quatre pastilles ne portent que des comptes qui existent réellement.
 */
export function FondateurCard({ className }: { className?: string }) {
  const liens = [
    { icon: Linkedin, url: LINKEDIN_URL, label: "LinkedIn", externe: true },
    { icon: Instagram, url: INSTAGRAM_URL, label: "Instagram", externe: true },
    { icon: Phone, url: `tel:${SITALY_PHONE}`, label: `Appeler le ${SITALY_PHONE_DISPLAY}` },
    { icon: Mail, url: "mailto:contact@sitaly.fr", label: "Écrire à contact@sitaly.fr" },
  ];

  return (
    <div className={cn("mx-auto w-full max-w-5xl", className)}>
      <div className="items-center md:flex">
        {/* La photo est cadrée en 4:5 avec le visage au tiers supérieur :
            `object-top` conserve ce cadrage quand le conteneur devient carré. */}
        <div className="mx-auto w-full max-w-sm shrink-0 overflow-hidden rounded-3xl border border-border bg-secondary md:mx-0 md:aspect-square md:w-[46%] md:max-w-none">
          <img
            src={teddy448}
            srcSet={`${teddy448} 448w, ${teddy672} 672w`}
            sizes="(min-width: 768px) 46vw, 24rem"
            width={448}
            height={560}
            loading="lazy"
            decoding="async"
            draggable={false}
            alt="Teddy Vidal, fondateur de Sitaly"
            className="block h-full w-full object-cover object-top"
          />
        </div>

        <div className="relative z-10 -mt-10 flex-1 rounded-3xl border border-border bg-card p-8 shadow-elevated sm:p-10 md:-ml-20 md:mt-0">
          <div className="rail-label text-brand-ink">Qui est derrière</div>
          <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Teddy Vidal
          </h3>
          <p className="mt-2 font-medium text-muted-foreground">
            Fondateur de Sitaly, et la personne qui construit vos outils
          </p>

          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Sitaly, c'est moi. J'installe les agents IA, je conçois les sites et je pilote les
              campagnes. Vous n'aurez pas un commercial à l'appel découverte et un stagiaire sur
              votre projet.
            </p>
            <p>
              Je suis basé à {SITALY_VILLE}, dans l'{SITALY_DEPARTEMENT}. Je travaille avec des PME
              d'Île-de-France et, à distance, de toute la France. Pas de rendez-vous à caler trois
              semaines à l'avance : on s'appelle et on sait tout de suite si ça vaut le coup.
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            {liens.map(({ icon: Icone, url, label, externe }) => (
              <a
                key={label}
                href={url}
                aria-label={label}
                {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background transition hover:scale-105 hover:bg-brand-ink"
              >
                <Icone className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
