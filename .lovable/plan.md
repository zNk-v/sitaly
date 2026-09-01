# Plan d'amélioration SEO

## 1. Anonymisation des données personnelles (prioritaire)

**Sur la page d'accueil (`src/routes/index.tsx`)**
- Section "Exemples" : remplacer "K.S Artisan" → "Couvreur-Façadier — Essonne" et "Yacine Menuiserie" → "Menuiserie — Île-de-France"
- Témoignages : remplacer "Julien M.", "Sophie R.", "Karim B." par des initiales/villes seules ("J. M. — Plombier à Lyon", etc.) — déjà partiellement anonymes, on harmonise

**Sur la page exemple (`src/routes/exemples.ks-artisan.tsx`)**
- Renommer le titre/meta vers la version anonymisée
- Garder l'iframe (preuve sociale)
- Créer en parallèle `exemples.menuiserie.tsx` pour le 2ème exemple (cohérence)

**Dans le blog (`src/data/blog-posts.ts`)**
- Article 5 : remplacer "Karim, chauffagiste à Montpellier" par "Un chauffagiste à Montpellier"

> Note : la ligne `Téléphone : 0658683372` dans `mentions-legales.tsx` est celle de **Sitaly** (obligation légale), elle est conservée.

## 2. Maillage interne entre articles

- Ajouter un champ `relatedSlugs?: string[]` au type `BlogPost`
- Pour chaque article, définir 3 slugs reliés thématiquement (ex: l'article "prix" lie vers "rentabilité" et "création")
- Dans `blog.$slug.tsx`, afficher une section "Articles liés" en bas de page (3 cartes)
- Bonus : ajouter des liens contextuels in-text dans 2-3 endroits par article (sous forme de section `{ type: "p" }` enrichie — on garde simple : juste la section "Articles liés")

## 3. Table des matières cliquable

- Dans `blog.$slug.tsx`, générer un TOC automatique à partir des sections `type: "h2"`
- Slugifier chaque h2, l'ajouter en `id` sur le `<h2>` lors du rendu
- Afficher le TOC en haut de l'article (juste après l'intro) dans un encadré stylisé avec liens ancres
- Améliore l'UX + favorise les "Sitelinks" Google (rich result "Jump to")

## 4. CTA dans les articles

- Créer un composant `BlogCTA` réutilisable dans `blog.$slug.tsx` (encadré avec dégradé, titre, sous-titre, bouton vers homepage avec ancre `#contact`)
- L'injecter automatiquement : 1 fois au milieu de l'article (après ~50% des sections) + 1 fois en bas avant les articles liés

## 5. Pages landing par métier (4 nouvelles routes)

Créer 4 pages adaptées du layout homepage, ciblées SEO :
- `/site-internet-plombier` — "Site internet plombier"
- `/site-internet-electricien` — "Site internet électricien"
- `/site-internet-menuisier` — "Site internet menuisier" (mise en avant : iframe Menuiserie anonymisé)
- `/site-internet-couvreur` — "Site internet couvreur / façadier" (mise en avant : iframe Couvreur anonymisé)

Chaque page contient :
- Hero adapté au métier (H1 avec mot-clé exact, sous-titre, CTA)
- Section "Pourquoi un site pour [métier]" — 3 bénéfices spécifiques (urgences, dépannage, devis…)
- Aperçu iframe du site exemple correspondant (quand pertinent) ou capture
- Bloc tarif (reprend 790€ / 99€)
- FAQ spécifique au métier (3-4 questions)
- CTA final
- Meta SEO complets + Schema.org `Service` + `FAQPage`

Toutes ajoutées au sitemap.xml.

## Détails techniques

- TOC : helper `slugify()` partagé, rendu conditionnel si ≥3 h2
- CTA : composant local au fichier `blog.$slug.tsx`
- Landing pages : un composant `MetierLanding` partagé dans `src/components/MetierLanding.tsx` paramétré par props (titre, métier, couleurs accent, FAQ, iframe), puis 4 fichiers routes minimes qui le consomment
- Sitemap : ajouter les 4 nouvelles routes + `/exemples/menuiserie`

## Fichiers touchés

- `src/data/blog-posts.ts` (ajout `relatedSlugs`, anonymisation Karim)
- `src/routes/blog.$slug.tsx` (TOC, CTA, articles liés, ids sur h2)
- `src/routes/index.tsx` (anonymisation Examples + Testimonials)
- `src/routes/exemples.ks-artisan.tsx` (relabel)
- `src/routes/exemples.menuiserie.tsx` (nouveau)
- `src/components/MetierLanding.tsx` (nouveau)
- `src/routes/site-internet-plombier.tsx` (nouveau)
- `src/routes/site-internet-electricien.tsx` (nouveau)
- `src/routes/site-internet-menuisier.tsx` (nouveau)
- `src/routes/site-internet-couvreur.tsx` (nouveau)
- `src/routes/sitemap[.]xml.ts` (ajout routes)
