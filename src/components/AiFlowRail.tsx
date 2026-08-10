import type { LucideIcon } from "lucide-react";

export type FlowStep = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

/**
 * Rail du parcours d'une demande entrante : vertical sur mobile, horizontal
 * sur grand écran. La circulation lumineuse le long du trait est purement
 * décorative et s'arrête si l'utilisateur réduit les animations (styles.css).
 */
export function AiFlowRail({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="ai-rail">
      {steps.map((step, index) => (
        <li key={step.label} className="ai-rail-step">
          <div className="relative z-10 grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-border bg-card text-accent">
            <step.icon className="h-5 w-5" aria-hidden="true" />
            <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-secondary text-[10px] font-bold text-muted-foreground">
              {index + 1}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-tight">{step.label}</div>
            <div className="mt-1 text-[13px] leading-snug text-muted-foreground">{step.detail}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
