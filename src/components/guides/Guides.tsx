import { Fragment, useEffect, useRef } from "react";
import { clipGuide, imageGuide, type Guide } from "@/data/guides";

/**
 * Les morceaux des pages /guides/ (3 novembre 2026) : le texte d'une étape
 * (gras et paragraphes) et son extrait vidéo, servi par app.sitaly.fr.
 */

/** Le texte d'une étape : des paragraphes séparés par une ligne vide, et du **gras**. */
export function TexteGuide({ texte }: { texte: string }) {
  return (
    <>
      {texte.split("\n\n").map((p, i) => (
        <p key={i}>
          {p.split(/\*\*(.+?)\*\*/g).map((bout, j) =>
            j % 2 ? (
              <strong key={j} className="font-semibold text-black">
                {bout}
              </strong>
            ) : (
              <Fragment key={j}>{bout}</Fragment>
            ),
          )}
        </p>
      ))}
    </>
  );
}

/** Un extrait muet qui tourne quand il est à l'écran, et s'arrête ailleurs. */
export function ExtraitGuide({ guide, etape }: { guide: Guide; etape: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduit) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);
  if (guide.etapes[etape].video === false) return null;
  return (
    <video
      ref={ref}
      src={clipGuide(guide.id, etape)}
      poster={imageGuide(guide.id, etape)}
      muted
      loop
      playsInline
      controls
      preload="none"
      width={1120}
      height={700}
      aria-label={`${guide.titre}, étape ${etape + 1} : ${guide.etapes[etape].titre}`}
      className="aspect-[1120/700] h-auto w-full rounded-2xl border border-black/10 bg-black/[0.03]"
    />
  );
}
