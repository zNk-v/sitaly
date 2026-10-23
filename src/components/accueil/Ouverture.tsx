import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Inbox } from "lucide-react";

import { AVIS_GOOGLE } from "@/data/avis-google";
import { PLATEFORMES } from "@/data/plateformes";
import { Etoiles, LogoGoogle, NoteGoogle, Pastille } from "@/components/accueil/communs";

import heroTelephone800 from "@/assets/photos/hero-telephone-800.webp";
import heroTelephone1400 from "@/assets/photos/hero-telephone-1400.webp";

/**
 * Le premier écran, sur l'encre, comme celui de futurdigital.fr : une
 * affirmation centrée, deux boutons, la note Google, puis deux cartes (une
 * photo, un avis), et le bandeau des plateformes qui défile.
 *
 * La section suivante remonte sur celle-ci avec des coins arrondis : c'est
 * elle qui porte `-mt` et `rounded-t`, celle-ci lui réserve la place.
 */
export function Ouverture() {
  const avis = AVIS_GOOGLE[0];

  return (
    <section
      id="top"
      className="on-ink relative isolate overflow-hidden bg-ink pt-28 pb-24 sm:pt-36 sm:pb-28"
    >
      {/* Trois foyers de la triade, très bas en opacité : la couleur de la
          marque sans nappe saturée (DESIGN.md §3). */}
      <div aria-hidden="true" className="hero-foyers absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div data-reveal>
            {/* Le point pulse comme un appel entrant : c'est la scène que le
                titre raconte. Il reste fixe sous mouvement réduit. */}
            <Pastille className="border-white/15 bg-white/5 text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="appel-pulse absolute inline-flex h-full w-full rounded-full bg-signal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Site web · Visibilité · Agents IA
            </Pastille>
          </div>

          {/* Allègement du 23 octobre 2026, à la demande du client : le premier
              écran reprend les trois onglets du menu (Site web, Visibilité,
              Agents IA) dans la pastille et le sous-titre. Les pastilles des
              six formats quittent le Hero : la section Formats les présente
              juste en dessous. */}
          <h1
            data-split
            className="stagger mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-balance"
          >
            Un site internet qui vous fait trouver.{" "}
            <span className="accent-word block">Et appeler.</span>
          </h1>

          <p data-reveal className="measure mx-auto mt-6 text-lg text-white/70 sm:text-xl">
            Sitaly crée votre site, le fait remonter sur Google et répond à vos clients avec des
            agents IA. Un seul interlocuteur.
          </p>

          <div
            data-reveal
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/mon-projet/" className="bouton px-7 py-3.5 text-base">
              Trouver mon offre
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </Link>
            <Link
              to="/tarifs/"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition hover:border-white/50"
            >
              Voir les tarifs
            </Link>
          </div>

          <a
            data-reveal
            href="#avis"
            className="mt-7 inline-flex text-white/75 transition hover:text-white"
          >
            <NoteGoogle />
          </a>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:gap-5">
          <figure
            data-reveal
            className="relative isolate h-[26rem] overflow-hidden rounded-[2rem] sm:h-[30rem] lg:col-span-2"
          >
            <img
              src={heroTelephone1400}
              srcSet={`${heroTelephone800} 800w, ${heroTelephone1400} 1400w`}
              sizes="(min-width: 1024px) 860px, 100vw"
              width={1400}
              height={788}
              alt="Une cliente consulte la confirmation de son rendez-vous sur son téléphone"
              fetchPriority="high"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_40%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/10 to-transparent"
            />
            <figcaption className="p-6 text-white sm:p-8">
              <p className="font-display text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">
                Un site, un objectif : qu'on vous contacte.
              </p>
            </figcaption>

            {/* Carte d'interface posée sur la photo, comme chez la
                référence. Elle porte sa mention « Exemple » (DESIGN.md §7). */}
            <div className="carte-flottante sur-papier absolute right-4 bottom-4 w-64 rounded-2xl bg-card p-4 text-left shadow-elevated sm:right-6 sm:bottom-6">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Inbox className="h-3.5 w-3.5" />
                  votre-entreprise.fr · 18:47
                </span>
                <span>Exemple</span>
              </div>
              <p className="mt-2 text-sm font-semibold">Demande de devis, Brétigny</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                Reçue par le formulaire du site
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 text-[12px] font-semibold text-signal-ink">
                <Check className="h-3.5 w-3.5" />
                Transmise par SMS et e-mail
              </p>
            </div>
          </figure>

          {/* Un avis réel, recopié de la fiche Google (src/data/avis-google.ts). */}
          <figure
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="flex flex-col rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-7 sm:p-8"
          >
            <div className="flex items-center gap-2.5">
              <LogoGoogle className="h-5 w-5" />
              <Etoiles />
            </div>
            <blockquote className="mt-auto pt-10 text-lg leading-snug text-white/90">
              « C'est la 1ère fois que quelqu'un comprend exactement ce que je veux et trouve les
              bons mots pour raconter qui je suis et ce que je fais. »
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <div className="font-semibold text-white">{avis.auteur}</div>
              <div className="text-white/60">Avis Google · {avis.date}</div>
            </figcaption>
          </figure>
        </div>

        <BandeauPlateformes />
      </div>
    </section>
  );
}

/**
 * « Visible là où vos clients vous cherchent » : les plateformes en défilé
 * continu, fondues sur les bords. La piste est doublée pour boucler sans
 * saut ; la copie est masquée aux lecteurs d'écran.
 */
function BandeauPlateformes() {
  const piste = (copie: boolean) => (
    <ul
      aria-hidden={copie || undefined}
      className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
    >
      {PLATEFORMES.map((p) => (
        <li key={p.nom} className="flex items-center gap-2.5 whitespace-nowrap text-white/70">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
            <path d={p.d} />
          </svg>
          <span className="text-[15px] font-medium">{p.nom}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-16 sm:mt-20">
      <p className="text-center text-sm text-white/55">Visible là où vos clients vous cherchent</p>
      <div className="defile-masque mt-6 overflow-hidden">
        <div className="defile-plateformes flex w-max">
          {piste(false)}
          {piste(true)}
        </div>
      </div>
    </div>
  );
}
