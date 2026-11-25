import { useState } from "react";
import { CircleCheck, Lock, ShieldCheck, Star } from "lucide-react";
import { BarreIA } from "@/components/produit/Produit";
import { VITRINE } from "@/data/vitrine";
import { GARANTIE_JOURS } from "@/data/offres";
import { FICHE_GOOGLE_URL, NOTE_GOOGLE } from "@/data/avis-google";

/**
 * Les badges de confiance sous la barre (25/11/2026). Chaque promesse est déjà
 * écrite ailleurs : Stripe dans les CGV, la garantie et l'absence d'engagement
 * dans src/data/offres.ts, la note dans src/data/avis-google.ts. Au survol,
 * chaque icône a son propre petit mouvement (styles.css, « badge-icone »).
 */
const BADGE = "group inline-flex items-center gap-1.5 whitespace-nowrap";
const ICONE = "badge-icone h-4 w-4 shrink-0 text-black/60";

/**
 * Le hero de l'accueil depuis le 25 novembre 2026, choisi par Teddy parmi
 * quatre essais inspirés de 21st.dev (« AI Composer ») : un titre, une phrase,
 * et la boîte IA en pilule posée sur des traits flous bleus et violets qui
 * dérivent lentement (le rose du premier essai est passé au violet).
 *
 * Le violet du bouton est celui du badge « −15 % » (`bg-violet`, #7429c3).
 * Aucune lueur autour du bouton ni de la boîte : Teddy n'en veut plus.
 */
export function HeroComposer() {
  const [activite, setActivite] = useState("");

  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--entete-hauteur))] items-center overflow-hidden px-4 py-16 sm:px-6">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <span className="trait-derive absolute top-[18%] left-[-10%] h-40 w-[70%] rotate-[-8deg] rounded-full bg-[#a78bfa]/70 blur-2xl" />
        <span className="trait-derive trait-derive--lent absolute top-[30%] right-[-12%] h-36 w-[60%] rotate-[10deg] rounded-full bg-[#93c5fd]/80 blur-2xl" />
        <span className="trait-derive absolute bottom-[16%] left-[8%] h-32 w-[55%] rotate-[6deg] rounded-full bg-[#c4b5fd]/75 blur-2xl" />
        <span className="trait-derive trait-derive--lent absolute right-[4%] bottom-[8%] h-28 w-[40%] rotate-[-12deg] rounded-full bg-[#b794f6]/55 blur-2xl" />
      </div>

      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className="titre-produit mx-auto max-w-2xl text-[2.4rem] sm:text-6xl">
          {VITRINE.accueilTitre ?? "Votre site internet, créé par l'IA en une minute"}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-black/60">
          {VITRINE.accueilSousTitre ??
            "Décrivez votre activité, l'IA écrit votre site et le met en ligne."}
        </p>

        <div className="mx-auto mt-10 max-w-xl">
          <BarreIA activite={activite} setActivite={setActivite} />
        </div>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-black/60 lg:-mx-16">
          <li className={BADGE}>
            <Lock className={`${ICONE} badge-icone--cadenas`} aria-hidden="true" />
            Paiement sécurisé par Stripe
          </li>
          <li className={BADGE}>
            <ShieldCheck className={`${ICONE} badge-icone--bouclier`} aria-hidden="true" />
            Satisfait ou remboursé {GARANTIE_JOURS} jours
          </li>
          <li className={BADGE}>
            <CircleCheck className={`${ICONE} badge-icone--coche`} aria-hidden="true" />
            Sans engagement
          </li>
          <li>
            <a
              href={FICHE_GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BADGE} hover:text-black`}
            >
              <Star className={`${ICONE} badge-icone--etoile`} aria-hidden="true" />
              {NOTE_GOOGLE.note}/5 sur Google
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
