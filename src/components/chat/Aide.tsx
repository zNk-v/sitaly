import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, Search, SendHorizontal, X } from "lucide-react";
import {
  COLLECTIONS,
  chercher,
  extrait,
  type Article,
  type Collection,
} from "@/components/chat/articles-aide";
import { DEGRADE, EnTete, Texte } from "@/components/chat/elements";
import { suivreEvenement } from "@/lib/mesure";

/**
 * L'onglet Aide du chat : un champ de recherche, puis les collections, puis
 * les articles. Une recherche sans résultat propose d'envoyer la même phrase
 * à l'IA, dans l'onglet Messages : le visiteur n'a rien à retaper.
 */

export type VueAide =
  | { type: "collections" }
  | { type: "collection"; collection: Collection }
  | { type: "article"; article: Article; depuis: VueAide };

const nombre = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;

const LIGNE =
  "flex w-full items-center gap-3 border-b border-black/[0.06] px-5 py-4 text-left transition hover:bg-[#f7f5fb] focus-visible:bg-[#f7f5fb] focus-visible:outline-none";

export function Aide({
  vue,
  surVue,
  surFermer,
  surDemander,
  rechercheAuto,
}: {
  vue: VueAide;
  surVue: (v: VueAide) => void;
  surFermer: () => void;
  /** Ouvre la conversation, avec une question déjà posée ou non. */
  surDemander: (question?: string) => void;
  /** Vrai quand le visiteur arrive par « Trouver une réponse » : le champ prend le focus. */
  rechercheAuto: boolean;
}) {
  const [requete, setRequete] = useState("");
  const champ = useRef<HTMLInputElement | null>(null);
  const defile = useRef<HTMLDivElement | null>(null);
  const resultats = useMemo(() => chercher(requete), [requete]);
  const enRecherche = requete.trim().length > 1;

  useEffect(() => {
    if (rechercheAuto) champ.current?.focus();
  }, [rechercheAuto]);

  // Chaque vue repart du haut.
  useEffect(() => {
    defile.current?.scrollTo({ top: 0 });
  }, [vue]);

  // La recherche n'est comptée qu'une fois le visiteur arrêté d'écrire.
  useEffect(() => {
    if (!enRecherche) return;
    const id = window.setTimeout(
      () =>
        suivreEvenement("chat_aide_recherche", {
          requete: requete.trim().slice(0, 80),
          resultats: resultats.length,
        }),
      1200,
    );
    return () => window.clearTimeout(id);
  }, [requete, enRecherche, resultats.length]);

  const ouvrir = (article: Article) => {
    suivreEvenement("chat_aide_article", { article: article.id });
    surVue({ type: "article", article, depuis: vue });
  };

  const retour =
    vue.type === "collection"
      ? () => surVue({ type: "collections" })
      : vue.type === "article"
        ? () => surVue(vue.depuis)
        : undefined;

  return (
    <>
      <EnTete
        titre={<h2 className="text-[15px] font-semibold text-black">Aide</h2>}
        surRetour={retour}
        surFermer={surFermer}
      >
        {vue.type !== "article" && (
          <form role="search" onSubmit={(e) => e.preventDefault()} className="px-4 pb-3">
            <label className="relative block">
              <span className="sr-only">Chercher dans l'aide</span>
              <input
                ref={champ}
                type="search"
                value={requete}
                onChange={(e) => setRequete(e.target.value)}
                placeholder="Trouver une réponse"
                autoComplete="off"
                enterKeyHint="search"
                className="w-full rounded-xl border-0 bg-black/[0.045] py-2.5 pl-3.5 pr-10 text-base text-black placeholder:text-black/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7014c2]/40 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
              />
              {requete ? (
                <button
                  type="button"
                  onClick={() => {
                    setRequete("");
                    champ.current?.focus();
                  }}
                  aria-label="Effacer la recherche"
                  className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-black/50 hover:bg-black/[0.06]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <Search
                  className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#7014c2]"
                  aria-hidden="true"
                />
              )}
            </label>
          </form>
        )}
      </EnTete>

      <div ref={defile} className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white">
        {vue.type !== "article" && enRecherche ? (
          <section aria-live="polite">
            <p className="border-b border-black/[0.06] px-5 py-3.5 text-[15px] font-semibold text-black">
              {resultats.length ? nombre(resultats.length, "résultat") : "Aucun article trouvé"}
            </p>
            {resultats.map((a) => (
              <button key={a.id} type="button" onClick={() => ouvrir(a)} className={LIGNE}>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-black">{a.titre}</span>
                  <span className="mt-1 line-clamp-2 text-[13px] leading-snug text-black/55">
                    {extrait(a)}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#7014c2]" aria-hidden="true" />
              </button>
            ))}
            <div className="px-5 py-5">
              <p className="text-sm text-black/60">
                {resultats.length
                  ? "Pas ce que vous cherchiez ?"
                  : "L'IA de Sitaly peut chercher pour vous dans tout le site."}
              </p>
              <button
                type="button"
                onClick={() => surDemander(requete.trim())}
                className={`mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-md shadow-[#7014c2]/25 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7014c2]/40 focus-visible:ring-offset-2 ${DEGRADE}`}
              >
                Demander à l'IA
                <SendHorizontal className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </section>
        ) : vue.type === "collections" ? (
          <section>
            <p className="border-b border-black/[0.06] px-5 py-3.5 text-[15px] font-semibold text-black">
              {nombre(COLLECTIONS.length, "collection")}
            </p>
            {COLLECTIONS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => surVue({ type: "collection", collection: c })}
                className={LIGNE}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-black">{c.titre}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-black/70">
                    {c.description}
                  </span>
                  <span className="mt-1.5 block text-[13px] text-black/45">
                    {nombre(c.articles.length, "article")}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#7014c2]" aria-hidden="true" />
              </button>
            ))}
          </section>
        ) : vue.type === "collection" ? (
          <section>
            <div className="border-b border-black/[0.06] px-5 py-4">
              <h3 className="text-lg font-bold text-black">{vue.collection.titre}</h3>
              <p className="mt-1 text-[13px] leading-snug text-black/70">
                {vue.collection.description}
              </p>
              <p className="mt-2 text-[13px] text-black/45">
                {nombre(vue.collection.articles.length, "article")}
              </p>
            </div>
            {vue.collection.articles.map((a) => (
              <button key={a.id} type="button" onClick={() => ouvrir(a)} className={LIGNE}>
                <span className="min-w-0 flex-1 text-sm font-medium text-black">{a.titre}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#7014c2]" aria-hidden="true" />
              </button>
            ))}
          </section>
        ) : (
          <article className="px-5 py-5">
            <h3 className="font-display text-xl font-bold leading-snug text-black">
              {vue.article.titre}
            </h3>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-black/75">
              <Texte texte={vue.article.texte} />
            </div>
            {vue.article.lien && (
              <a
                href={vue.article.lien.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7014c2] underline-offset-4 hover:underline"
              >
                {vue.article.lien.libelle}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <div className="mt-8 rounded-2xl bg-[#f7f5fb] px-4 py-4">
              <p className="text-sm font-semibold text-black">Une autre question ?</p>
              <p className="mt-0.5 text-[13px] text-black/60">
                L'IA répond tout de suite. Ted prend le relais si besoin.
              </p>
              <button
                type="button"
                onClick={() => surDemander()}
                className={`mt-3 inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7014c2]/40 focus-visible:ring-offset-2 ${DEGRADE}`}
              >
                Poser ma question
                <SendHorizontal className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        )}
      </div>
    </>
  );
}
