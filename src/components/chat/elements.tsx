import { Fragment, type ReactNode } from "react";
import { ChevronLeft, X } from "lucide-react";
import teddy from "@/assets/teddy-vidal-carte-112.webp";

/** Les petites pièces communes aux trois onglets du chat. */

/** Le dégradé du logo, du bleu au rouge : les 9 teintes du favicon. */
export const DEGRADE =
  "bg-[linear-gradient(to_top_right,#0b53b0,#3049ba,#483dc1,#5d2dc4,#7014c2,#8c009e,#9d0073,#a60047,#a51111)]";

/** Le symbole de Sitaly, les deux chevrons, en blanc sur le dégradé. */
export function AvatarSitaly({ taille = 32 }: { taille?: number }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full ${DEGRADE}`}
      style={{ width: taille, height: taille }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 77 69" width={taille * 0.46} height={taille * 0.42}>
        <g
          transform="translate(-11.5 -15.5)"
          fill="none"
          stroke="#fff"
          strokeWidth="17"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 24 46 50 20 76" />
          <path d="M54 24 80 50 54 76" />
        </g>
      </svg>
    </span>
  );
}

export function AvatarTed({ taille = 32 }: { taille?: number }) {
  return (
    <img
      src={teddy}
      alt=""
      width={taille}
      height={taille}
      loading="lazy"
      decoding="async"
      className="shrink-0 rounded-full object-cover"
      style={{ width: taille, height: taille }}
    />
  );
}

/** Ted et l'IA côte à côte, les deux visages qui répondent. */
export function Equipe({ taille = 36, bord = "ring-white" }: { taille?: number; bord?: string }) {
  return (
    <span className="flex -space-x-2">
      <span className={`rounded-full ring-2 ${bord}`}>
        <AvatarTed taille={taille} />
      </span>
      <span className={`rounded-full ring-2 ${bord}`}>
        <AvatarSitaly taille={taille} />
      </span>
    </span>
  );
}

/** Le **gras** et les paragraphes des articles d'aide. */
export function Texte({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(/\n{2,}/).map((para, i) => (
        <p key={i}>
          {para.split("**").map((morceau, j) =>
            j % 2 ? (
              <strong key={j} className="font-semibold text-black">
                {morceau}
              </strong>
            ) : (
              <Fragment key={j}>{morceau}</Fragment>
            ),
          )}
        </p>
      ))}
    </>
  );
}

const BOUTON_ROND =
  "grid h-9 w-9 shrink-0 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2";

/** L'en-tête blanc des onglets Messages et Aide : retour, titre centré, fermer. */
export function EnTete({
  titre,
  surRetour,
  surFermer,
  children,
}: {
  titre: ReactNode;
  surRetour?: () => void;
  surFermer: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-black/[0.06] bg-white">
      <div className="flex items-center gap-1 px-2 py-2">
        {surRetour ? (
          <button
            type="button"
            onClick={surRetour}
            aria-label="Retour"
            className={`${BOUTON_ROND} text-black/70 hover:bg-black/[0.05] focus-visible:ring-[#7014c2]/40`}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : (
          <span className="h-9 w-9 shrink-0" aria-hidden="true" />
        )}
        <div className="min-w-0 flex-1 text-center">{titre}</div>
        <BoutonFermer surFermer={surFermer} />
      </div>
      {children}
    </div>
  );
}

export function BoutonFermer({ surFermer, clair }: { surFermer: () => void; clair?: boolean }) {
  return (
    <button
      type="button"
      onClick={surFermer}
      aria-label="Fermer la discussion"
      className={`${BOUTON_ROND} ${
        clair
          ? "text-white/85 hover:bg-white/15 hover:text-white focus-visible:ring-white/60"
          : "text-black/60 hover:bg-black/[0.05] hover:text-black focus-visible:ring-[#7014c2]/40"
      }`}
    >
      <X className="h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  );
}
