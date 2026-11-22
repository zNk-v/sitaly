import { ArrowUpRight, ChevronRight, Search, SendHorizontal } from "lucide-react";
import logoBlanc from "@/assets/sitaly-logo-blanc.svg";
import { A_LA_UNE, LIEN_CREER, extrait, type Article } from "@/components/chat/articles-aide";
import { BoutonFermer, DEGRADE, Equipe } from "@/components/chat/elements";

/**
 * L'onglet Accueil du chat : le dégradé du logo qui se fond dans la page, le
 * bonjour, puis des cartes blanches. La première ouvre la conversation, la
 * deuxième la recherche de l'onglet Aide, les suivantes trois réponses
 * fréquentes. La dernière mène à l'application.
 */

const CARTE =
  "block w-full rounded-2xl bg-white px-4 py-3.5 text-left shadow-[0_1px_3px_rgba(17,12,46,0.08)] ring-1 ring-black/[0.04] transition hover:shadow-[0_4px_14px_rgba(112,20,194,0.12)] hover:ring-[#7014c2]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7014c2]/50";

export function Accueil({
  surFermer,
  surQuestion,
  surChercher,
  surArticle,
  conversationEnCours,
}: {
  surFermer: () => void;
  surQuestion: () => void;
  surChercher: () => void;
  surArticle: (a: Article) => void;
  conversationEnCours: boolean;
}) {
  return (
    <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#f7f5fb]">
      {/* Le dégradé du logo, fondu vers le fond de la page. */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[340px] ${DEGRADE}`}
        style={{
          maskImage: "linear-gradient(to bottom, #000 45%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 45%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-5 pb-6 pt-5">
        <div className="flex items-center justify-between gap-3">
          <img src={logoBlanc} alt="Sitaly" width={92} height={25} className="h-[25px] w-auto" />
          <div className="flex items-center gap-2">
            <Equipe taille={34} bord="ring-white/70" />
            <BoutonFermer surFermer={surFermer} clair />
          </div>
        </div>

        <h2 className="font-display mt-10 text-[1.7rem] font-bold leading-[1.15] tracking-[-0.01em] text-white">
          Bonjour 👋
          <br />
          Comment pouvons-nous vous aider ?
        </h2>

        <div className="mt-6 space-y-3">
          <button type="button" onClick={surQuestion} className={CARTE}>
            <span className="flex items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-black">
                  {conversationEnCours ? "Reprendre la conversation" : "Posez-nous une question"}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-black/55">
                  L'IA répond tout de suite. Ted prend le relais si besoin.
                </span>
              </span>
              <SendHorizontal className="h-5 w-5 shrink-0 text-[#7014c2]" aria-hidden="true" />
            </span>
          </button>

          <button type="button" onClick={surChercher} className={CARTE}>
            <span className="flex items-center justify-between gap-3">
              <span className="text-[15px] font-semibold text-black">Trouver une réponse</span>
              <Search className="h-[18px] w-[18px] shrink-0 text-[#7014c2]" aria-hidden="true" />
            </span>
          </button>

          {A_LA_UNE.map((a) => (
            <button key={a.id} type="button" onClick={() => surArticle(a)} className={CARTE}>
              <span className="flex items-center justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold leading-snug text-black">
                    {a.titre}
                  </span>
                  <span className="mt-1 line-clamp-2 text-[13px] leading-snug text-black/55">
                    {extrait(a)}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#7014c2]" aria-hidden="true" />
              </span>
            </button>
          ))}

          <a href={LIEN_CREER} className={`${CARTE} relative overflow-hidden`}>
            <span className={`absolute inset-y-0 left-0 w-1 ${DEGRADE}`} aria-hidden="true" />
            <span className="flex items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-[13px] font-medium text-[#7014c2]">
                  Aperçu gratuit, sans compte ni carte
                </span>
                <span className="mt-0.5 block text-[15px] font-semibold text-black">
                  Créer mon site maintenant
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#7014c2]" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
