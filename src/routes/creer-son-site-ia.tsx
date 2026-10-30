import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

/**
 * L'ancienne page du créateur de site IA (pilote du 29 octobre 2026). Depuis le
 * 30 octobre, l'accueil de sitaly.fr présente Sitaly App : cette adresse y
 * renvoie, pour les liens et les campagnes déjà partis. La page statique porte
 * un rafraîchissement immédiat et l'adresse canonique de l'accueil.
 */
export const Route = createFileRoute("/creer-son-site-ia")({
  head: () => ({
    meta: [
      { title: "Sitaly : créez votre site internet avec l'IA" },
      { name: "robots", content: "noindex, follow" },
      { "http-equiv": "refresh", content: "0; url=/" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/" }],
  }),
  component: Redirection,
});

function Redirection() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return (
    <p className="p-8 text-center">
      Cette page a déménagé : <a href="/">créez votre site avec l'IA sur l'accueil de Sitaly</a>.
    </p>
  );
}
