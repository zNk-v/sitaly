import logoSitaly from "@/assets/logo-sitaly.png";

/* Logo Sitaly. width/height sont portés sur la balise pour réserver la place
 * avant le chargement de l'image : sans eux le header saute au premier paint
 * (CLS) puisque le logo est le seul élément de hauteur variable de la barre. */
export function SitalyLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoSitaly}
      alt="Sitaly"
      width={414}
      height={108}
      className={`h-6 w-auto sm:h-7 ${className}`}
    />
  );
}
