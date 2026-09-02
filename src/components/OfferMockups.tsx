import { Bell, Calendar, Check, Phone, Search, Sparkles } from "lucide-react";

/**
 * Maquettes des offres, construites en balisage plutôt que générées.
 *
 * Une image abstraite ne dit ni « Google Ads » ni « un agent qui répond au
 * téléphone ». Ces maquettes montrent le mécanisme, en français, et restent
 * nettes à toutes les densités d'écran pour quelques centaines d'octets.
 *
 * Parti pris volontaire : elles ne copient l'interface de personne. Ni Google,
 * ni OpenAI, ni un opérateur téléphonique. Ce sont des schémas dans la charte
 * Sitaly, pas de fausses captures d'écran d'un produit tiers.
 */

function Cadre({ children, legende }: { children: React.ReactNode; legende: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl border border-border bg-paper-sunk p-4 shadow-soft">
          {children}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">{legende}</p>
      </div>
    </div>
  );
}

/** Ce que voit quelqu'un qui cherche un artisan sur un moteur de recherche. */
export function MaquetteRecherche() {
  return (
    <Cadre legende="Schéma d'un résultat de recherche. Illustration, pas une capture.">
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
        <span className="truncate text-sm text-neutral-800">couvreur urgence essonne</span>
      </div>

      <div className="mt-3 rounded-xl border-2 border-brand/60 bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-ink">
            Annonce
          </span>
          <span className="text-[11px] text-neutral-500">votre-entreprise.fr</span>
        </div>
        <div className="mt-1.5 text-sm font-semibold text-neutral-900">
          Couvreur en Essonne — devis sous 24h
        </div>
        <div className="mt-1 text-xs leading-relaxed text-neutral-500">
          Intervention rapide, garantie décennale, artisan local.
        </div>
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-brand-ink px-2.5 py-1.5 text-[11px] font-semibold text-white">
          <Phone className="h-3 w-3" aria-hidden="true" />
          Appeler
        </div>
      </div>

      {/* Les concurrents, repoussés sous l'annonce. */}
      <div className="mt-2.5 space-y-2.5 opacity-40">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-xl bg-white/70 p-3">
            <div className="h-2 w-24 rounded bg-neutral-300" />
            <div className="mt-2 h-2 w-full rounded bg-neutral-200" />
            <div className="mt-1.5 h-2 w-2/3 rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    </Cadre>
  );
}

/** Un futur client qui décrit son besoin à un assistant plutôt qu'à un moteur. */
export function MaquetteConversation() {
  return (
    <Cadre legende="Schéma d'une conversation assistée. Illustration, pas une capture.">
      <div className="space-y-3">
        <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-white px-3.5 py-2.5 text-sm text-neutral-800">
          Ma toiture fuit depuis l'orage, je cherche quelqu'un de sérieux vers Brétigny.
        </div>

        <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-white/90 px-3.5 py-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-ink">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Assistant
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">
            Voici un couvreur qui intervient en urgence dans ce secteur :
          </p>
          <div className="mt-2.5 rounded-xl border border-brand/40 bg-brand/5 p-2.5">
            <div className="text-sm font-semibold text-neutral-900">Votre entreprise</div>
            <div className="mt-0.5 text-xs text-neutral-500">
              Couverture · Essonne · Devis sous 24h
            </div>
          </div>
        </div>
      </div>
    </Cadre>
  );
}

/** L'appel manqué qui ne se perd plus. */
export function MaquetteAgent() {
  return (
    <Cadre legende="Schéma d'un enchaînement automatisé. Illustration, pas une capture.">
      <div className="space-y-2.5">
        <div className="flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-100 text-red-600">
            <Phone className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-neutral-900">Appel manqué</div>
            <div className="text-xs text-neutral-500">Vous étiez sur un chantier</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-ink">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-neutral-900">SMS envoyé sur-le-champ</div>
            <div className="text-xs leading-relaxed text-neutral-500">
              « Désolé, je suis en intervention. Quel est votre besoin ? »
            </div>
          </div>
        </div>

        {/* Fond clair comme les deux lignes précédentes : un fond teinté à 10 %
            sur l'encre laissait du texte quasi noir sur fond sombre. */}
        <div className="flex items-center gap-3 rounded-xl border border-signal-ink/40 bg-white px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-signal-ink text-white">
            <Calendar className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
              Rendez-vous posé
              <Check className="h-3.5 w-3.5 text-signal-ink" aria-hidden="true" />
            </div>
            <div className="text-xs text-neutral-500">Jeudi 14h, sans que vous décrochiez</div>
          </div>
        </div>
      </div>
    </Cadre>
  );
}
