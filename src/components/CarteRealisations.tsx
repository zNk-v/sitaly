import { useRef, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { REALISATIONS, type Realisation } from "@/data/realisations";
import { FICHE_GOOGLE_URL, NOTE_GOOGLE } from "@/data/avis-google";

import lafleurBureau from "@/assets/real-lafleur-560.webp";
import lafleurMobile from "@/assets/real-lafleur-mobile.webp";
import felicioniBureau from "@/assets/real-felicioni-560.webp";
import felicioniMobile from "@/assets/real-felicioni-mobile.webp";
import pataudBureau from "@/assets/real-pataud-560.webp";
import pataudMobile from "@/assets/real-pataud-mobile.webp";

/**
 * Réalisations de la page /carte : chaque site livré, montré sur ordinateur et
 * sur téléphone, avec le parti pris de conception du site.
 *
 * Les captures sont réelles, prises le 21 septembre 2026 sur les sites en ligne,
 * bandeau cookies refusé, en émulation iPhone pour la version mobile. La parole
 * des clients vit dans la section Avis Google de la page, en entier : la
 * reprendre en extrait sous une carte la faisait lire deux fois.
 */

const CAPTURES: Record<string, { bureau: string; mobile: string }> = {
  "lafleur-toiture": { bureau: lafleurBureau, mobile: lafleurMobile },
  "entreprise-felicioni": { bureau: felicioniBureau, mobile: felicioniMobile },
  "aymeric-pataud": { bureau: pataudBureau, mobile: pataudMobile },
};

export function Etoiles({ note, taille = "h-3.5 w-3.5" }: { note: number; taille?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${note} sur 5`}>
      {Array.from({ length: 5 }, (_, n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={`${taille} ${n < note ? "fill-[#f5b301] text-[#f5b301]" : "text-border"}`}
        />
      ))}
    </span>
  );
}

function PartiPris({ r }: { r: Realisation }) {
  const choix = r.choix[0];
  if (!choix) return null;
  return (
    <div className="mt-4 rounded-2xl bg-secondary p-4">
      <p className="rail-label text-muted-foreground">Le parti pris</p>
      <p className="mt-2 font-semibold leading-snug">{choix.titre}</p>
      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {choix.texte}
      </p>
    </div>
  );
}

export function CarteRealisations() {
  const listeRef = useRef<HTMLUListElement>(null);
  const [actif, setActif] = useState(0);
  const realisations = REALISATIONS.filter((r) => CAPTURES[r.slug]);

  const pas = () => {
    const ul = listeRef.current;
    const carte = ul?.firstElementChild as HTMLElement | null;
    return carte ? carte.offsetWidth + 12 : 1;
  };

  const auDefilement = () => {
    const ul = listeRef.current;
    if (ul) setActif(Math.round(ul.scrollLeft / pas()));
  };

  const allerA = (i: number) => {
    listeRef.current?.scrollTo({ left: i * pas(), behavior: "smooth" });
  };

  return (
    <section className="mt-12" aria-labelledby="carte-realisations">
      <p className="rail-label text-muted-foreground">Réalisations</p>
      <h2
        id="carte-realisations"
        className="mt-2 font-display text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.035em]"
      >
        Ils m'ont confié <span className="accent-word">leur site</span>
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
        <a
          href={FICHE_GOOGLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-medium text-foreground"
        >
          <Etoiles note={5} />
          {NOTE_GOOGLE.note} sur Google
        </a>
        <span>{realisations.length} sites en ligne, à vérifier en un clic.</span>
      </div>

      <ul
        ref={listeRef}
        onScroll={auDefilement}
        className="-mx-4 mt-5 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {realisations.map((r) => {
          const cap = CAPTURES[r.slug];
          return (
            <li key={r.slug} className="w-[86%] shrink-0 snap-start">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                {/* La scène : le site sur ordinateur, et le même sur un
                    téléphone posé devant. Le fond reprend la teinte du client. */}
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ouvrir le site ${r.domaine}`}
                  className="relative block aspect-[1/1] overflow-hidden"
                  style={{
                    background: `radial-gradient(120% 90% at 20% 0%, color-mix(in oklab, ${r.accent} 30%, var(--paper)), var(--paper) 70%)`,
                  }}
                >
                  <div className="absolute left-4 top-5 w-[84%] overflow-hidden rounded-lg bg-white shadow-elevated ring-1 ring-black/5">
                    <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-1.5 truncate rounded-full bg-secondary px-2 py-0.5 text-[9px] text-muted-foreground">
                        {r.domaine}
                      </span>
                    </div>
                    <img
                      src={cap.bureau}
                      width={560}
                      height={389}
                      loading="lazy"
                      decoding="async"
                      alt={`Le site ${r.domaine} sur ordinateur`}
                      className="block aspect-[560/389] w-full object-cover object-top"
                    />
                  </div>

                  {/* Téléphone : cadre encre, îlot en haut, écran à 390 px de
                      large comme un iPhone. Il déborde du bas de la scène. */}
                  <div className="absolute -bottom-[6%] right-4 w-[36%] rotate-[3deg] rounded-[1.6rem] bg-ink p-[5px] shadow-[0_24px_40px_-18px_oklch(0.2_0.05_300/0.7)]">
                    <div className="relative overflow-hidden rounded-[1.3rem] bg-white">
                      <span className="absolute left-1/2 top-[5px] z-10 h-[9px] w-[34%] -translate-x-1/2 rounded-full bg-ink" />
                      <img
                        src={cap.mobile}
                        width={360}
                        height={613}
                        loading="lazy"
                        decoding="async"
                        alt={`Le site ${r.domaine} sur téléphone`}
                        className="block aspect-[360/613] w-full object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Le vert marque ce qui se vérifie : le site tourne. */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold text-signal-ink shadow-soft">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                    </span>
                    En ligne
                  </span>
                </a>

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-display text-lg font-extrabold leading-tight tracking-tight">
                    {r.client}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.metier} · {r.zone}
                  </p>

                  <PartiPris r={r} />

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold"
                  >
                    Voir le site
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {/* Repères de position : ils disent qu'il y a d'autres cartes à droite. */}
      <div className="mt-2 flex justify-center gap-1.5">
        {realisations.map((r, i) => (
          <button
            key={r.slug}
            type="button"
            onClick={() => allerA(i)}
            aria-label={`Voir ${r.client}`}
            aria-current={i === actif}
            className={`point-carrousel h-1.5 rounded-full transition-all duration-300 ${i === actif ? "w-5" : "w-1.5 bg-border"}`}
            style={i === actif ? { background: "var(--gradient-ruban)" } : undefined}
          />
        ))}
      </div>
    </section>
  );
}
