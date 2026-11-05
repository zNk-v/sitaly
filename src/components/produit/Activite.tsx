import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Play, Send, Sparkles, Star } from "lucide-react";
import { useVisible } from "@/components/produit/Vitrine";
import type { ProduitId } from "@/data/produits";

/**
 * Deux blocs de l'accueil ajoutés le 4 novembre 2026, avec la sortie du film
 * de lancement et des publicités Meta : le film lui-même, et la gestion de
 * l'activité (devis dictés, rendez-vous, agents IA, marque), que la publicité
 * promet et que l'accueil ne montrait pas. Données d'exemple, entreprises
 * inventées, comme le reste de la vitrine.
 */

export function FilmLancement() {
  return (
    <figure className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-3xl bg-[#f5f5f7] shadow-[0_30px_80px_-30px_rgba(25,20,60,0.35)] ring-1 ring-black/[0.06]">
        <video
          className="block aspect-video w-full"
          src="/video/sitaly-film.mp4"
          poster="/video/sitaly-film.webp"
          controls
          playsInline
          preload="none"
          aria-label="Film de présentation de Sitaly, 55 secondes"
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-center gap-2 text-sm text-black/55">
        <Play className="h-3.5 w-3.5" aria-hidden="true" /> Sitaly en 55 secondes, avec le son
      </figcaption>
    </figure>
  );
}

function Carte({ id, titre, texte, large = false, children }: { id: ProduitId; titre: string; texte: string; large?: boolean; children: ReactNode }) {
  const { ref, classe } = useVisible<HTMLAnchorElement>(0.3);
  return (
    <Link
      ref={ref}
      to="/produits/$id/"
      params={{ id }}
      className={`${classe} ${large ? "md:col-span-2" : ""} group flex flex-col overflow-hidden rounded-3xl bg-black/[0.03] p-7 transition hover:bg-black/[0.05] sm:p-8`}
    >
      <div className="flex-1">{children}</div>
      <h3 className="mt-7 text-xl font-semibold tracking-tight">{titre}</h3>
      <p className="mt-1.5 leading-7 text-black/60">{texte}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
        En savoir plus <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

const PASTILLE = "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold";

export function GrilleActivite() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Carte
        id="devis-et-factures"
        titre="Devis dicté, facture payée"
        texte="Dites votre devis à voix haute sur le chantier. Le client l'accepte en ligne, paie l'acompte par carte et reçoit une facture conforme."
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div>
              <div className="text-xs text-black/50">D-2026-0014 · Mme Lopez</div>
              <div className="text-2xl font-bold tracking-tight tabular-nums">2 850,00 €</div>
            </div>
            <span className={`${PASTILLE} bg-[#dcfce7] text-[#15803d]`}>Accepté</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="text-sm">
              <div className="text-xs text-black/50">Acompte 30 % · carte bancaire</div>
              <div className="font-semibold">855,00 € encaissés</div>
            </div>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#16a34a] text-white">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Carte>
      <Carte
        id="prise-de-rendez-vous"
        titre="Vos clients réservent seuls"
        texte="Vos prestations et vos horaires sur votre site. Chaque rendez-vous arrive par e-mail et dans votre liste de clients."
      >
        <div className="rounded-2xl bg-white p-4">
          <div className="text-sm font-semibold">Diagnostic à domicile · 1 h</div>
          <div className="text-xs text-black/50">Jeudi 5 novembre</div>
          <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-sm font-medium">
            {["9:00", "10:00", "11:30", "14:00", "15:30", "17:00"].map((h) => (
              <span key={h} className={`rounded-xl py-2 ${h === "10:00" ? "bg-black/85 text-white" : "bg-black/[0.04]"}`}>
                {h}
              </span>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-[#16a34a] py-2 text-center text-sm font-semibold text-white">Rendez-vous confirmé</div>
        </div>
      </Carte>
      <Carte
        id="agents-ia"
        titre="Des agents IA qui répondent"
        texte="Demandes du site, avis Google, articles de blog : la réponse est prête dans votre ton, vous la validez."
      >
        <div className="space-y-2.5">
          <div className="rounded-2xl bg-white p-4 text-sm">
            <div className="flex items-center gap-2 text-xs text-black/50">
              Sophie B. · il y a 4 min <span className={`${PASTILLE} bg-[#fee2e2] text-[#b91c1c]`}>Urgent</span>
            </div>
            <p className="mt-1 text-black/75">Une fuite sous l'évier, vous pouvez passer aujourd'hui ?</p>
          </div>
          <div className="rounded-2xl bg-[#f5f3ff] p-4 text-sm">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6d28d9]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Réponse prête
            </div>
            <p className="mt-1 text-black/80">Bonjour Sophie, je peux venir aujourd'hui entre 14 h et 16 h.</p>
          </div>
        </div>
      </Carte>
      <Carte
        id="identite-de-marque"
        titre="Votre marque, prête à servir"
        texte="Deux logos dessinés par l'IA, vos couleurs, votre police et l'aperçu de votre carte de visite."
      >
        <div className="grid grid-cols-[auto_1fr] gap-2.5">
          <div className="grid h-full min-h-28 w-28 place-items-center rounded-2xl bg-white">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f4471c] text-2xl font-extrabold text-white">D</span>
          </div>
          <div className="flex min-w-0 flex-col justify-between rounded-2xl bg-[#0a2540] p-4 text-white">
            <div className="truncate font-bold">Durand Plomberie</div>
            <div className="text-xs text-white/70">Plombier chauffagiste · Valmont</div>
            <div className="mt-2 text-xs text-white/85">01 99 00 12 34</div>
          </div>
        </div>
      </Carte>
      <Carte
        id="avis-google"
        large
        titre="Plus d'avis Google, et une réponse à chacun"
        texte="Connectez votre fiche : chaque nouvel avis arrive le matin avec sa réponse prête, vous la publiez d'un clic. Le lendemain d'une facture payée, votre client reçoit la demande d'avis à votre nom."
      >
        <div className="grid gap-2.5 md:grid-cols-[1fr_1fr_auto]">
          <div className="rounded-2xl bg-white p-4 text-sm">
            <div className="flex items-center gap-2 text-xs text-black/50">
              <span className="inline-flex text-[#f5a623]" aria-label="5 étoiles sur 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                ))}
              </span>
              Claire M. · ce matin
            </div>
            <p className="mt-1 text-black/75">Intervention rapide et propre, le devis a été respecté. Je recommande.</p>
          </div>
          <div className="rounded-2xl bg-[#f0fdf4] p-4 text-sm">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15803d]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Réponse prête
            </div>
            <p className="mt-1 text-black/80">Merci Claire, ravi que le chantier se soit bien passé. À bientôt !</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 text-xs font-semibold text-white">
              <Send className="h-3.5 w-3.5" aria-hidden="true" /> Publier sur Google
            </span>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4 md:flex-col md:justify-center md:text-center">
            <div className="text-3xl font-bold tracking-tight tabular-nums">
              4,9<span className="text-base font-semibold text-black/45">/5</span>
            </div>
            <div className="text-xs text-black/50">
              37 avis
              <br />
              +6 ce mois-ci
            </div>
          </div>
        </div>
      </Carte>
    </div>
  );
}
