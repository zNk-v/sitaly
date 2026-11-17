import { useEffect, useState } from "react";
import { MessageSquare, SendHorizontal } from "lucide-react";
import { AvatarSitaly, AvatarTed, DEGRADE, EnTete, Equipe } from "@/components/chat/elements";
import type { Ligne } from "@/components/chat/Fil";

/**
 * L'onglet Messages : la conversation de l'onglet en cours, ou une page vide
 * qui invite à écrire. La conversation tient dans sessionStorage, le temps de
 * l'onglet (src/lib/chat.ts) : il n'y en a jamais qu'une.
 */

function depuis(le: number, maintenant: number): string {
  const min = Math.floor((maintenant - le) / 60_000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `${min} min`;
  return `${Math.floor(min / 60)} h`;
}

export function ListeMessages({
  lignes,
  surOuvrir,
  surFermer,
}: {
  lignes: Ligne[];
  surOuvrir: () => void;
  surFermer: () => void;
}) {
  const question = lignes.find((l) => l.auteur === "visiteur");
  const derniere = lignes[lignes.length - 1];
  const tedLa = lignes.some((l) => l.auteur === "ted");

  // L'heure relative avance seule, sans attendre un nouveau message.
  const [maintenant, setMaintenant] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setMaintenant(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <EnTete
        titre={<h2 className="text-[15px] font-semibold text-black">Messages</h2>}
        surFermer={surFermer}
      />
      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white">
        {question ? (
          <button
            type="button"
            onClick={surOuvrir}
            className="flex w-full items-center gap-3 border-b border-black/[0.06] px-5 py-4 text-left transition hover:bg-[#f7f5fb] focus-visible:bg-[#f7f5fb] focus-visible:outline-none"
          >
            {tedLa ? <AvatarTed taille={44} /> : <AvatarSitaly taille={44} />}
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-3">
                <span className="truncate text-sm font-semibold text-black">{question.texte}</span>
                <span className="shrink-0 text-xs text-black/45">
                  {depuis(derniere.le, maintenant)}
                </span>
              </span>
              <span className="mt-0.5 block truncate text-[13px] text-black/55">
                {derniere.auteur === "visiteur" ? "Vous : " : ""}
                {derniere.texte}
              </span>
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center px-8 pb-28 pt-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f3f0f9] text-[#7014c2]">
              <MessageSquare className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-4 text-[15px] font-semibold text-black">Aucun message</p>
            <p className="mt-1 text-sm leading-relaxed text-black/55">
              Posez votre question : l'IA répond tout de suite avec le contenu du site, et Ted prend
              le relais quand il faut.
            </p>
            <span className="mt-5">
              <Equipe taille={40} />
            </span>
          </div>
        )}

        <div className="pointer-events-none sticky bottom-0 flex justify-center bg-gradient-to-t from-white via-white/90 to-transparent px-4 pb-5 pt-10">
          <button
            type="button"
            onClick={surOuvrir}
            className={`pointer-events-auto inline-flex min-h-11 items-center gap-2.5 rounded-full px-5 text-sm font-semibold text-white shadow-lg shadow-[#7014c2]/30 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7014c2]/40 focus-visible:ring-offset-2 ${DEGRADE}`}
          >
            {question ? "Reprendre la conversation" : "Posez-nous une question"}
            <SendHorizontal className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}

/** L'en-tête de la conversation : retour à la liste, les deux visages, fermer. */
export function EnTeteConversation({
  surRetour,
  surFermer,
}: {
  surRetour: () => void;
  surFermer: () => void;
}) {
  return (
    <EnTete
      surRetour={surRetour}
      surFermer={surFermer}
      titre={
        <span className="flex items-center gap-2.5 text-left">
          <Equipe taille={32} />
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold leading-tight text-black">Sitaly</span>
            <span className="block truncate text-xs text-black/50">
              L'IA répond, Ted prend le relais
            </span>
          </span>
        </span>
      }
    />
  );
}
