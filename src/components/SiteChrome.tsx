import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import type { AppelPrincipal } from "@/components/MobileMenu";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * En-tête et pied de page communs aux pages secondaires.
 *
 * L'en-tête était recopié à l'identique dans plusieurs routes, chacune ayant
 * dérivé de son côté. Il vit ici une seule fois, et le pied de page avec lui :
 * c'est `SiteFooter`, le même sur toutes les pages du site. Il en existait six
 * versions, une par route, dont trois ne renvoyaient nulle part.
 */
export function SiteChrome({
  children,
  appel,
}: {
  children: ReactNode;
  /** Le bouton principal de l'en-tête, pour une page qui vend une seule offre. */
  appel?: AppelPrincipal;
}) {
  return (
    <>
      <SiteHeader appel={appel} />

      <div className="pt-[var(--entete-hauteur)]">{children}</div>

      <SiteFooter />
    </>
  );
}
