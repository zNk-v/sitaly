# Plan SEO sitaly.fr : mise en œuvre complète

> Prompt pour Claude Code, rédigé le 28 septembre 2026 à partir de l'audit SEO de sitaly.fr (Search Console, Keyword Planner, Google Trends, Ubersuggest, crawl, PageSpeed, données structurées, fiche Google) et de la stratégie validée avec Ted.
> **Lis ce fichier en entier avant de toucher au code.** Il est la seule source des décisions et des faits à utiliser.

---

## Ta mission

Mettre en œuvre, dans ce dépôt (`~/sitaly` : app TanStack Start prérendue, publiée sur GitHub Pages par `./deploy.sh`), tout ce qui relève du code et du contenu de sitaly.fr. Tu ne déploies pas : Ted relit, fusionne et déploie lui-même.

**Principe directeur : l'IA en tête.** La page d'accueil et la marque vendent les agents IA. L'acquisition (ChatGPT Ads, Google Ads) vient en deuxième. Le site internet devient une porte d'entrée locale (Essonne), pas un appât pour vendre l'IA. Chaque page propose l'étape suivante logique, pas tout le catalogue.

### Pourquoi (données de l'audit, pour prioriser : ne jamais les publier)

- **Search Console, 26 juin – 25 septembre 2026** : 19 clics, dont 11 sur la marque. /agents-ia/ : 4 impressions. /chatgpt-ads/ : 5 impressions, position 35,8. /blog/cout-chatgpt-ads/ est le seul contenu qui ramène des clics hors marque (position 9,9), et il ne renvoie pas vers /chatgpt-ads/. /automatisation-taches/ est classée « soft 404 ». /blog/agent-ia-entreprise-guide/ est « détectée, non indexée ». La page d'accueil se classe sur des requêtes web locales (« agence web essonne », « consultant seo 91 ») parce que son processus et sa FAQ vendent encore un abonnement site.
- **Keyword Planner, France** : « chatgpt ads », « agence ia » et « consultant google ads » font chacun 1 k à 10 k recherches par mois. « agence chatgpt ads » : 0 à 10. « agence web essonne » et « agence web 91 » : 100 à 1 k. Les requêtes d'achat sur les agents IA (prix, pme, agence, prise de rendez-vous) font 10 à 100 et sont peu disputées.
- **Google Trends** : « agent ia » multiplié par 2,7 en un an, « site web » −14 %. Novembre est le mois fort : ce qui doit se classer en novembre se publie en octobre.
- **PageSpeed mobile** : score 73, LCP 5,1 s. L'élément LCP est le mot « Sitaly » du H1, animé mot par mot : 2,3 s de délai d'affichage. Erreur React #418 (hydratation) au chargement.
- **Concurrents directs** (Linov, Waisso) : presque aucun trafic organique. Waisso publie vite sur ChatGPT Ads (6 articles en six semaines) mais n'a pas de page de vente dédiée. Sitaly en a une : c'est elle qui doit recevoir les liens.

---

## 1. Décisions de Ted (à relire avant de lancer)

| # | Sujet | Décision | Si Ted a changé la ligne |
|---|---|---|---|
| D1 | Prix plancher des agents IA | Afficher. Dans `src/lib/config.ts` : `PRIX_AGENTS_IA = { afficher: true, miseEnPlaceMin: 1200, mensuelMin: 499 }` (le code contient encore 1 500 et 900). | `afficher: false` : aucun montant nulle part, l'article F5 reste en brouillon. |
| D2 | Prix ChatGPT Ads | Afficher « à partir de 890 € par mois + 10 % du budget publicitaire ». Crée l'interrupteur `PRIX_CHATGPT_ADS = { afficher: true, mensuelMin: 890, partBudget: 10 }` dans `config.ts`. | `afficher: false` : retire aussi la grille Sitaly de l'article /blog/cout-chatgpt-ads/ (les données de marché restent). |
| D3 | Pages hors index (`src/lib/indexation.ts`) | On n'y touche pas : ni réindexation, ni redirection, ni suppression. Décision du 26 septembre 2026 : elles servent la prospection directe par lien. | — |
| D4 | Lien Calendly | `CALENDLY_URL` inchangé tant que Ted ne fournit pas l'URL d'un événement « Diagnostic Sitaly (30 min) ». Seuls les libellés des boutons changent. | Si une nouvelle URL est écrite ici, remplace `CALENDLY_URL` et le lien de `llms.txt`. |
| D5 | Hébergement | Reste sur GitHub Pages. Le cache (10 minutes imposées) se règlera hors code, par Ted. | — |
| D6 | Gemini Ads | Aucun contenu sans une source officielle datée fournie par Ted. | — |

D1 et D2 dérogent à DESIGN.md §8 (aucun prix sur les pages commerciales depuis le 2 septembre 2026). Consigne la nouvelle décision dans §8, datée du jour, sur le modèle des décisions existantes : prix plancher affichés pour les agents IA et ChatGPT Ads ; toujours aucun prix pour les sites.

---

## 2. Règles non négociables

1. **Règle de preuve.** Sitaly n'a aucun résultat client chiffré. Interdit : chiffre de résultat, pourcentage de gain, témoignage, cas ou avis inventé. Autorisé : les faits de la section 3, les faits déjà publiés sur les pages indexables actuelles, des données de marché avec source ouverte et datée, des simulations présentées comme telles (avec des variables, pas des résultats). Si un fait manque, ne l'invente pas : écris la question dans `docs/seo/questions-pour-ted.md` et avance sur le reste.
2. **DESIGN.md fait loi.** Identité (§9) : « nous » de marque, jamais d'adresse de rue, jamais d'effectif, jamais d'invitation à se rencontrer : tout commence par un appel. Le diagnostic dure 30 minutes, partout. Architecture (§8 bis) : une intention de recherche = une page, `src/data/expertises.ts` source unique, quatre blocs par page d'expertise. Mouvement (§6) et hero (§4 bis) : relis-les avant la phase 7. Toute dérogation se consigne dans DESIGN.md, datée.
3. **Aucune nouvelle page dans la famille « Site internet ».** /essonne/ est une page locale, hors familles.
4. **Écriture.** Français, vouvoiement du visiteur, phrases courtes, pas de jargon, pas de superlatifs (meilleur, leader, n° 1), pas d'emoji. Typographie du dépôt : espaces insécables avant `: ; ? !` et à l'intérieur des « ». Dates explicites (« depuis le 24 août 2026 »). Sur les pages agents IA, jamais « sans frais d'installation » : il y a une mise en place.
5. **Git.** Crée la branche `seo-octobre-2026` depuis `refonte-da-2026`. Un commit par phase, message en français au format du dépôt (« Sujet : ce qui change »). Jamais de `git push`, de force-push ou de rebase de commits publiés (AGENTS.md), jamais `./deploy.sh`.
6. **Build.** `npm run build` doit passer à la fin de chaque phase (le `prebuild` régénère `public/sitemap.xml`). Si une optimisation casse le build ou le prérendu, annule-la et note-la dans le rapport.
7. **Mesure.** Ne supprime aucun événement GA4 existant (`generate_lead`…) et garde le consent mode tel quel.
8. **Sources.** Ne cite jamais une source que tu n'as pas ouverte. Si tu as accès au web, tu peux ajouter des sources officielles vérifiées.

---

## 3. Faits autorisés

**Sitaly**
- Micro-agence. Entrepreneur individuel : Teddy Vidal (SIREN 833 848 831). Basée à Brétigny-sur-Orge (91220), Essonne. Pas de local recevant du public, pas d'adresse de rue publiée.
- Un seul interlocuteur : Teddy Vidal conçoit, installe et pilote chaque projet.
- Zone : Essonne et Île-de-France, et à distance dans toute la France.
- Horaires : du lundi au vendredi de 8 h à 19 h, le samedi de 9 h à 13 h.
- Téléphone, e-mail, fiche Google : constantes de `src/lib/config.ts`.
- Porte d'entrée : diagnostic offert de 30 minutes, puis proposition écrite.
- Avis Google : uniquement les données de `src/data/avis-google.ts`.
- Réalisations : uniquement `src/data/realisations.ts` (Lafleur Toiture, couvreur en Essonne ; Entreprise Felicioni, rénovation en Haute-Garonne ; Aymeric Pataud, chef consultant en Île-de-France). Pour Lafleur Toiture : numéro cliquable dans l'en-tête, en haut de page, dans la section contact et en pied de page ; note Google réelle affichée à côté du bouton d'appel ; communes d'intervention listées en clair ; fiche Google optimisée ; site hébergé et entretenu chaque mois.
- Cibles : PME et TPE structurées, en priorité agences immobilières, courtiers en crédit et en assurance, entreprises du BTP. Approche ouverte aux autres secteurs.

**Agents IA**
- Six agents : accueil téléphonique (agent vocal), prise de rendez-vous, SMS après un appel manqué, réponses aux messages Instagram (pas WhatsApp), relance des devis, gestion des avis Google.
- L'agent se présente comme une IA dès le début de l'échange (article 50 du règlement européen sur l'IA, applicable depuis le 2 août 2026) et passe la main à un humain dès que la situation le demande.
- Il ne fait pas de prospection téléphonique à froid auprès de particuliers : consentement préalable obligatoire depuis le 11 août 2026 (loi du 30 juin 2025). Il traite les demandes entrantes et recontacte les personnes qui l'ont demandé ou les clients existants.
- Il ne donne ni avis de valeur immobilier, ni conseil en crédit ou en assurance, ni chiffrage de travaux : il prépare le travail des équipes.
- Outils (citables dans les contenus techniques) : Vapi pour la voix, Twilio pour les appels et SMS, Cal.com pour les rendez-vous, n8n pour les automatisations, Claude d'Anthropic comme modèle de langage, Supabase pour les données.
- Tarif : une mise en place puis un pilotage mensuel, chiffrés par écrit après le diagnostic. Montants plancher : D1. Le pilotage mensuel couvre les coûts variables (minutes de voix, SMS). Ne publie ni plafond ni tarif à la minute.

**ChatGPT Ads**
- Ouverture en France le 24 août 2026, dans 31 marchés européens. Libre-service (ChatGPT Ads Manager) déployé depuis le 1er septembre 2026.
- Annonces signalées comme telles et séparées des réponses. Affichées aux utilisateurs adultes des offres gratuite et Go, pas aux abonnés Plus et Pro. Ciblage contextuel, suivi des conversions.
- Sources : https://www.datashake.fr/articles/chatgpt-ads-france-self-service et https://waisso.com/digital/chatgpt-ads-france/ (ajoute l'annonce officielle d'OpenAI si tu peux l'ouvrir).
- Tarif Sitaly : 890 € par mois + 10 % du budget publicitaire, budget payé séparément (D2).
- Méthode Sitaly : mesurer avant de dépenser, tester petit, décider sur des chiffres.

**Google Ads**
- Forfait de gestion mensuel, sans engagement de durée. Budget Google séparé, payé directement à Google par le client.
- Suivi des appels et des formulaires en place avant toute dépense. Campagnes sur le Réseau de Recherche.

**Sites internet**
- Site sur mesure, hébergement et maintenance en abonnement. Aucun prix affiché.

---

## 4. Travaux, par phase

L'ordre est la priorité. Si la session s'arrête avant la fin, les phases 1 à 4 doivent être terminées et commitées.

### Phase 0 : lecture et état initial

1. Lis : `DESIGN.md`, `AGENTS.md`, `src/lib/config.ts`, `src/lib/indexation.ts`, `src/lib/sitemap.ts`, `src/lib/formulaire.ts`, `src/lib/mesure.ts`, `src/data/expertises.ts`, la structure de `src/data/blog-posts.ts` et `src/data/blog-posts-agents-ia.ts` (champs `metaTitle`, `metaDescription`, `updatedAt`…), `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/agents-ia.tsx`, `src/routes/acquisition.tsx`, `src/routes/blog.$slug.tsx`, `src/components/ZoomIntro.tsx`, `src/components/ExpertiseLanding.tsx`, `public/chatgpt-ads/index.html`, `public/llms.txt`, `public/llms-full.txt`, `vite.config.ts`, `scripts/generate-sitemap.mjs`.
2. Crée la branche, lance `npm run build`.
3. Écris `scripts/verifier-seo.mjs` (spécification en section 5), ajoute `"verifier:seo": "node scripts/verifier-seo.mjs"` à `package.json`, lance-le sur ce build de référence et enregistre la sortie dans `docs/seo/etat-initial.txt`.
4. Déplace ce fichier dans `docs/seo/PLAN_SEO_CLAUDE_CODE.md`. Commit.

### Phase 1 : titles, metas et textes à risque

1. Applique l'annexe A. Le `<title>` final, suffixe compris, fait 60 caractères au plus ; la meta description entre 120 et 160.
2. /blog/relance-automatique-devis/ : retire « Jusqu'à 30 % de devis signés en plus » (extrait et meta) et tout chiffre sans source nommée dans l'article. Vise les PME, pas « artisans et indépendants ». Ajoute un lien vers l'agent de relance de /agents-ia/.
3. Passe en revue tous les articles indexables : liste dans le rapport chaque chiffre sans source, puis retire-le ou source-le.
4. Mets à jour `updatedAt` de chaque article modifié.

### Phase 2 : /chatgpt-ads/ (page statique `public/chatgpt-ads/index.html`)

Page hors routeur : elle n'importe pas `config.ts`. Reporte-y les valeurs à la main et mets à jour son commentaire d'en-tête (il décrit encore un envoi par mailto).

1. **Balises** : title, meta et H1 de l'annexe A. L'ancien H1 (« Apparaissez dans ChatGPT au moment où vos futurs clients cherchent une solution. ») devient le paragraphe d'accroche sous le H1. Sous l'accroche : « Campagnes pilotées par Teddy Vidal, mis à jour le [date du jour] », avec un lien vers /a-propos/.
2. **H2** : table de l'annexe C.
3. **Nouvelle section** « ChatGPT Ads en France : dates, audiences et formats » : les faits de la section 3, avec les liens des sources.
4. **Prix** (D2) : section « Tarif de gestion ChatGPT Ads : forfait et part du budget ». Même discours que l'article /blog/cout-chatgpt-ads/.
5. **Comparatif** : les deux colonnes « Recherche classique / Recherche conversationnelle » deviennent un tableau (intention, format, maturité, mesure).
6. **FAQ** : ajoute les questions de l'annexe C. Le FAQPage JSON-LD reprend mot pour mot la FAQ visible.
7. **Bloc « Pour aller plus loin »** (guide, coût, secteurs) : visible en permanence sous la FAQ. Aujourd'hui, il n'apparaît qu'après l'envoi du formulaire.
8. **Formulaire** : remplace le mailto par un envoi JSON à `https://sitaly-forms.sitaly-forms.workers.dev` (valeur de `FORM_ENDPOINT`), avec les mêmes règles que `src/lib/formulaire.ts` :
   - champs `name`, `email`, `company`, `phone`, `message`, `subject` = « ChatGPT Ads », et le pot de miel `website`, caché et vide ;
   - succès : message de confirmation dans la page, puis `gtag('event', 'generate_lead', { form_id: 'chatgpt-ads' })` si `gtag` existe ;
   - erreur ou réseau indisponible : afficher le téléphone et un lien mailto prérempli avec la saisie, sans rien effacer.
   Le Worker refuse les origines absentes de sa liste, localhost compris : en local, la requête doit tomber en erreur et déclencher le repli. Vérifie ce repli.
9. **JSON-LD** : annexe B (Service avec `provider` en `@id`, BreadcrumbList). Plus aucune Organization dupliquée dans cette page.

### Phase 3 : accueil et architecture « IA en tête »

1. **Ordre des familles** (`FAMILLES` dans `src/data/expertises.ts`) : automatisation, acquisition, site. Titre de la famille automatisation : « Agents IA et automatisation ». /agents-ia/ passe en tête partout : menu de bureau, menu mobile, section Expertises de l'accueil, pied de page. Dans les menus, garde « Site internet » : c'est le terme que les gens tapent.
2. **Accueil** (`src/routes/index.tsx`) :
   - title de l'annexe A (et `name` du nœud WebPage) ; le H1 actuel reste ;
   - offres dans l'ordre : Agents IA, ChatGPT Ads, Google Ads, Site internet ;
   - une section courte « Un seul système », avec les composants et jetons existants : faire venir les demandes (Acquisition : /chatgpt-ads/, /acquisition/), les recevoir (Site internet : /creation-site-internet/), les traiter (Agents IA : /agents-ia/). Une section, pas un mur de texte ;
   - processus réécrit pour les agents IA : diagnostic offert de 30 minutes, proposition écrite, mise en place, réglages sur de vraies demandes, pilotage mensuel. Aucune durée chiffrée ;
   - FAQ : remplace les cinq questions actuelles (budget, mise en ligne, modifications incluses, arrêt de l'abonnement, achat du site) par l'annexe D. FAQPage JSON-LD identique au texte visible ;
   - lien vers /blog/agent-ia-entreprise-guide/ avec l'ancre « agent IA en entreprise ».
3. **/agents-ia/** : H1 « Agents IA pour PME », seul. L'accroche fusionnée aujourd'hui dans le H1 devient un paragraphe. Ajoute une section « Agent IA et service client ». Prix selon D1. Dans la FAQ, un lien « combiner ChatGPT Ads et agents IA » vers /chatgpt-ads/.
4. **Étape suivante** : dans le bloc des pages voisines des gabarits (`ExpertiseLanding`, `SecteurLanding`), ajoute un lien vers une autre famille, sans créer de cinquième bloc :
   - pages Site internet : « Votre site reçoit des demandes. Un agent IA y répond, même à 19 h. » → /agents-ia/ ;
   - pages Acquisition : « Chaque clic payé mérite une réponse immédiate. » → /agents-ia/ ;
   - pages Agents IA et automatisation : « Un agent a besoin de demandes à traiter. » → /chatgpt-ads/ et /acquisition/.
5. **H2 du gabarit des pages d'expertise** : les intitulés répétés à l'identique sur les pages de service (« Ce que ça comprend », « Quand ça se justifie », « Ce qu'on nous demande », à vérifier dans le code) deviennent « Ce que comprend [le service] », « Pour quelles entreprises [le service] est rentable », « Questions fréquentes sur [le service] ». Mets DESIGN.md §8 bis à jour si les noms de blocs y figurent.

### Phase 4 : /acquisition/ et /essonne/

1. **/acquisition/** : title, meta et H1 de l'annexe A (« artisans » sort du title). Ajoute la section « Un seul consultant, du réglage au rapport » : mesure des appels et formulaires avant toute dépense, campagnes sur le Réseau de Recherche, forfait mensuel sans engagement, budget payé directement à Google. Dans la section sur l'amélioration par les données, ajoute un lien « compléter Google Ads avec ChatGPT Ads » vers /chatgpt-ads/. Ne change pas l'URL.
2. **/essonne/** : nouvelle route `src/routes/essonne.tsx`, spécification en annexe E. Ajoute-la à `TOUTES_LES_PAGES` (`src/lib/sitemap.ts`) et à `llms.txt`. Liens depuis le pied de page (« Agence en Essonne ») et depuis /a-propos/.

### Phase 5 : maillage interne

1. **Bloc « À lire »** :
   - sur /agents-ia/ : agent-ia-entreprise-guide, relance-automatique-devis, prise-rendez-vous-en-ligne-guide, automatiser-suivi-client-tpe, chatbot-entreprise-tpe-guide, demarchage-telephonique-agent-ia-2026, ai-act-article-50-agent-vocal, puis les nouveaux articles de la phase 8 ;
   - sur /chatgpt-ads/ : publicite-chatgpt-ads-guide, cout-chatgpt-ads, chatgpt-ads-secteurs-pme ;
   - sur /automatisation-taches/ : relance-automatique-devis, automatiser-suivi-client-tpe, prise-rendez-vous-en-ligne-guide.
2. **Dans le texte de chaque article indexable** : au moins un lien vers la page de vente de son sujet (ancres des articles ChatGPT Ads : annexe C).
3. **Pages trop peu liées** : /blog/chatbot-entreprise-tpe-guide/ et /blog/trouver-clients-agent-immobilier/ reçoivent chacune au moins 4 liens entrants (depuis /agents-ia/, /agents-ia/agences-immobilieres/ et les articles proches).
4. **CTA de fin d'article** (`src/routes/blog.$slug.tsx`, « Et si on créait votre site ? ») : ajoute un champ `cta` aux données d'article (`"agents-ia" | "chatgpt-ads" | "automatisation" | "site"`) et affiche :
   - agents-ia : « 30 minutes pour repérer où vos demandes se perdent », bouton « Réserver un diagnostic » → Calendly ;
   - chatgpt-ads : « ChatGPT Ads a-t-il du sens pour votre entreprise ? », bouton « Demander une analyse » → /chatgpt-ads/ (ancre du formulaire) ;
   - automatisation : « Ce que vous pouvez arrêter de faire à la main », bouton « Voir les automatisations » → /automatisation-taches/ ;
   - site : le CTA actuel.
5. **Libellés Calendly** (D4) : « Réserver un diagnostic de 30 min » partout où le bouton parle encore de « projet web ».

### Phase 6 : données structurées

Applique l'annexe B. Les graphes JSON-LD vivent dans `__root.tsx`, `index.tsx`, `agents-ia.tsx`, `blog.$slug.tsx`, `realisations.$slug.tsx`, les gabarits et la page statique /chatgpt-ads/ : trouve chaque source et modifie-la là, sans dupliquer l'entité Sitaly (toujours `{"@id": "https://sitaly.fr/#business"}`).

### Phase 7 : performance mobile

Relis DESIGN.md §4 bis et §6 avant de toucher au hero. Mesure avant et après avec Lighthouse mobile sur la page d'accueil si Chrome est disponible (`npx lighthouse` sur le build servi en local). Sinon, ne donne aucun chiffre.

1. **LCP** (`src/components/ZoomIntro.tsx`, `.zoom-leger-mot` dans `src/styles.css`) : le H1 doit être visible dans le HTML prérendu, sans attendre le JavaScript. Pas d'état initial invisible (opacity 0, visibility hidden, clip) sur le mot LCP. Anime seulement `transform` après l'hydratation, ou coupe l'effet sous 768 px et avec `prefers-reduced-motion`.
2. **Erreur React #418** : reproduis-la avec `npm run build:dev` puis `npm run preview`, lis le message non minifié dans la console, et rends le premier rendu client identique au HTML prérendu. Dates, valeurs aléatoires, lectures de `window` ou de `localStorage` passent dans un `useEffect`. Pistes : `CookieConsent`, `HeroChamp`, `MetiersDefilement`, `WorkflowCanvas`.
3. **GA4** (`__root.tsx`) : garde tout de suite le stub `dataLayer`/`gtag` et le consent par défaut. Charge `gtag.js` après l'événement `load`, pendant un temps libre (`requestIdleCallback`) ou à la première interaction, avec un délai de secours de 4 s. Les événements envoyés avant restent en file dans `dataLayer`.
4. **CSS bloquant** : si c'est possible sans fragiliser le prérendu, intègre le CSS critique au HTML en post-traitement de `dist/client/**/*.html` (script postbuild, par exemple avec le paquet `beasties`) et charge le reste en différé. Sinon, passe et note-le.
5. **Images** : `RealisationsCarousel` sert les variantes WebP existantes avec `srcset` et `sizes` justes (le mobile reçoit 65 Kio pour un affichage de 378 × 263), et toutes les images ont `width` et `height`.
6. **Police du H1** : `<link rel="preload" as="font" type="font/woff2" crossorigin>` pour la seule graisse utilisée par le H1, avec `font-display: swap`.
7. **Recalculs de mise en page forcés** (`use-reveal-on-scroll.ts`, `use-split-words.ts`, `use-progression-defilement.ts`) : IntersectionObserver, lectures et écritures du DOM regroupées.
8. **`.entete-plaque`** : anime `transform` ou `opacity`, pas `background-position`.
9. **Zones tactiles** : 44 × 44 px au moins pour les pastilles du carrousel (« Voir Entreprise Felicioni », « Voir Aymeric Pataud »).
10. Vérifie que le code est découpé par route et qu'aucune page ne charge le JavaScript des autres.

### Phase 8 : contenus

1. **Publier** les articles F1 à F4 et la page F6 (annexe F). Publier F5 seulement si D1 affiche les prix, sinon brouillon.
2. **/blog/cout-chatgpt-ads/** : meta de l'annexe A ; section « Depuis le lancement du 24 août 2026 » avec les faits de la section 3 ; lien vers /chatgpt-ads/ dans l'introduction (ancre « agence ChatGPT Ads ») et CTA chatgpt-ads ; `updatedAt`.
3. **/blog/publicite-chatgpt-ads-guide/** : mise à jour avec les faits du lancement. Gemini Ads : voir D6.
4. **/blog/chatbot-entreprise-tpe-guide/** : section « Agent IA, chatbot ou assistant IA : la différence sur un même cas client ». Dans les textes, préfère « agent IA » à « chatbot » : c'est le terme qui monte.
5. **/automatisation-taches/** (soft 404) : ouvre `dist/client/automatisation-taches/index.html` et trouve ce qui peut ressembler à une page vide ou d'erreur (contenu principal absent du HTML prérendu, texte d'erreur, contenu trop court). Corrige la cause, puis enrichis la page dans le gabarit, avec des H2 porteurs du mot-clé « automatisation des tâches ».
6. **/logiciel-metier/ et /crm-sur-mesure/** (100 à 1 k recherches par mois chacun) : enrichis dans le gabarit (exemples par secteur, étapes, questions). Aucun montant.
7. **Brouillon non publié** : `docs/seo/brouillons/chatgpt-ads-manager.md`, tutoriel « ChatGPT Ads Manager : créer une première campagne pas à pas ». Plan complet, et `[À COMPLÉTER PAR TED]` à chaque étape d'interface : ne décris aucun écran que tu n'as pas vu.
8. **Backlog** : `docs/seo/backlog-contenus.md` à partir de l'annexe G, un article par semaine, dans l'ordre donné.

### Phase 9 : nettoyage et fichiers pour les IA

1. **Traces de l'ancien positionnement sur les pages indexables** : /realisations/ (« pour des artisans » : décris les trois clients réels) et les articles indexables (« pour artisans et indépendants » → PME, TPE et indépendants). Dans les CGV, ne touche à aucune clause : propose la nouvelle description du service (« plateforme SaaS pour artisans ») dans `docs/seo/questions-pour-ted.md`.
2. **Page 404** : GitHub Pages sert `/404.html`. Produis-la au build (route ou `notFoundComponent`, puis copie en postbuild si nécessaire), en `noindex`, avec la navigation et des liens vers /agents-ia/, /chatgpt-ads/, /blog/ et le contact.
3. **`llms.txt` et `llms-full.txt`** : ordre Agents IA, ChatGPT Ads, Google Ads, Sites ; ajoute /essonne/, /agents-ia/agent-vocal/ et les nouveaux articles ; ligne des tarifs selon D1 et D2.
4. **Sitemap** : les nouvelles pages y figurent, aucune page hors index.

### Phase 10 : contrôles et rapport

1. `npm run build`, puis `npm run verifier:seo` : zéro erreur. Chaque avertissement restant est justifié dans le rapport.
2. Lighthouse mobile avant et après, si mesuré.
3. Rapport final (section 6), dans le chat et dans `docs/seo/rapport-octobre-2026.md`. Commit.

---

## 5. Spécification de `scripts/verifier-seo.mjs`

Sans nouvelle dépendance si possible : des expressions régulières suffisent sur du HTML prérendu. Sinon, une dépendance de développement.

- Parcourt `dist/client/**/index.html` et `dist/client/404.html`.
- Chaque page indexable (robots sans `noindex`) : `<title>` de 60 caractères au plus et meta description de 160 au plus (entités décodées), sinon erreur ; title de moins de 30 ou meta de moins de 120 : avertissement ; exactement un `<h1>` ; canonical absolue égale à `https://sitaly.fr` + chemin avec slash final ; `og:title` présent.
- Titles ou descriptions en double entre pages indexables : erreur.
- Chaque bloc JSON-LD se parse. Chaque question d'un FAQPage figure dans le texte visible de la page.
- Liens internes (`href="/…"` ou `https://sitaly.fr/…`) : la cible existe dans `dist/client`, sinon erreur. Lien d'une page indexable vers une page hors index : avertissement.
- `sitemap.xml` : chaque `<loc>` existe et est indexable (erreur sinon) ; page indexable absente du sitemap : avertissement.
- Chaînes interdites sur les pages indexables : « Jusqu'à 30 % », « plateforme SaaS », « rencontrons-nous » ; « sans frais d'installation » sur /agents-ia/ et ses sous-pages ; formulaire `mailto:` comme envoi principal sur /chatgpt-ads/ ; « Et si on créait votre site » ailleurs que sur les articles dont `cta` vaut `site`.
- Sortie : un récapitulatif lisible, et un code de sortie 1 s'il reste une erreur.

---

## 6. Rapport final attendu

1. Tableau des phases : fait, partiel ou non fait, avec la raison.
2. Avant/après : titles et metas modifiés, résultat de `verifier:seo`, Lighthouse mobile si mesuré.
3. Les questions ouvertes (`docs/seo/questions-pour-ted.md`).
4. Les commandes de mise en ligne, que Ted lance lui-même après relecture :
   ```bash
   git checkout refonte-da-2026 && git merge --no-ff seo-octobre-2026 && ./deploy.sh "SEO : plan d'octobre 2026"
   ```
5. Les actions manuelles de Ted après la mise en ligne, reprises telles quelles :
   - **Search Console** : Inspection de l'URL, Tester l'URL en ligne, puis Demander une indexation pour /automatisation-taches/, /blog/agent-ia-entreprise-guide/, /, /agents-ia/, /chatgpt-ads/, /acquisition/, /essonne/, /agents-ia/agent-vocal/ et chaque nouvel article. Renvoyer le sitemap.
   - **Calendly** : créer l'événement « Diagnostic Sitaly (30 min) » et donner son URL (D4).
   - **Fiche Google** (textes prêts dans la section 10 du rapport d'audit) : nouvelle description ; un post par semaine pendant 4 semaines ; service « Gestion de campagnes ChatGPT Ads » ; retirer les catégories « Entreprise de logiciels » et « Consultant en marketing » ; nouvelle photo de couverture et photos de Teddy au travail ; lien vers /essonne/ avec paramètres UTM ; demander un avis à chaque client livré.
   - **Cache** : passer Cloudflare devant GitHub Pages (compte déjà utilisé pour sitaly-forms). Déplacer les DNS de sitaly.fr d'OVH vers Cloudflare en vérifiant que les MX, le SPF et les deux DKIM Brevo sont repris, puis une règle de cache d'un an sur /assets/* et /fonts/*.
   - **Annuaires** : PagesJaunes, Mappy et 118 712 décrivent encore Sitaly « pour artisans ».
   - **Rythme** : un article par semaine depuis `docs/seo/backlog-contenus.md`.
   - **Dans 4 semaines** : relire dans Search Console les impressions de /agents-ia/, /chatgpt-ads/ et /essonne/.

---

## Annexe A : titles, metas et H1

| Page | Élément | Texte | Car. |
|---|---|---|---|
| / | Title | Agence IA pour PME : agents IA et automatisation \| Sitaly | 57 |
| /acquisition/ | Title | Consultant et agence Google Ads pour PME \| Sitaly | 49 |
| /acquisition/ | Meta | Sitaly crée, pilote et optimise vos campagnes Google Ads pour générer des demandes qualifiées. Forfait mensuel sans engagement, budget Google séparé. | 149 |
| /acquisition/ | H1 | Agence Google Ads pour PME : des demandes qualifiées chaque mois | 64 |
| /chatgpt-ads/ | Title | Agence ChatGPT Ads : publicité dans ChatGPT \| Sitaly | 52 |
| /chatgpt-ads/ | Meta | Publicité dans ChatGPT pour PME et B2B : stratégie, annonces, suivi des conversions et pilotage de vos campagnes ChatGPT Ads. Analyse sans engagement. | 150 |
| /chatgpt-ads/ | H1 | Agence ChatGPT Ads : votre publicité dans ChatGPT | 49 |
| /agents-ia/ | H1 | Agents IA pour PME | 18 |
| /realisations/lafleur-toiture/ | Title | Lafleur Toiture : site d'un couvreur en Essonne \| Sitaly | 56 |
| /realisations/lafleur-toiture/ | Meta | Étude de cas : le site de Lafleur Toiture, couvreur en Essonne, conçu pour réduire le délai entre l'arrivée sur la page et l'appel. Site en ligne. | 146 |
| /realisations/entreprise-felicioni/ | Title | Entreprise Felicioni : site de rénovation \| Sitaly | 50 |
| /realisations/entreprise-felicioni/ | Meta | Étude de cas : le site d'Entreprise Felicioni, rénovation et second œuvre, construit autour des photos de chantiers plutôt que des descriptions. | 144 |
| /realisations/aymeric-pataud/ | Title | Aymeric Pataud : site d'un chef consultant \| Sitaly | 51 |
| /realisations/aymeric-pataud/ | Meta | Étude de cas : le site d'Aymeric Pataud, chef consultant, pensé comme une signature éditoriale plutôt qu'un catalogue de prestations. | 133 |
| /realisations/ | Meta | Sites réalisés par Sitaly, en ligne et consultables : couvreur en Essonne, rénovation en Haute-Garonne, chef consultant en Île-de-France. | 137 |
| /blog/ | Title | Blog Sitaly : agents IA, ChatGPT Ads et automatisation | 54 |
| /blog/agent-ia-entreprise-guide/ | Meta | Ce qu'un agent IA fait dans une PME, les tâches où il est rentable, ce qu'il coûte et les cas où une automatisation simple suffit. | 130 |
| /blog/cout-chatgpt-ads/ | Meta | Prix de ChatGPT Ads en France : ce qui compose le coût, quel budget de test prévoir et comment calculer le coût par lead acceptable pour votre marge. | 149 |
| /blog/chatgpt-ads-secteurs-pme/ | Meta | SaaS, B2B, immobilier, assurance, formation : les secteurs où la publicité dans ChatGPT a du sens, ceux où elle n'apporte rien, et comment le vérifier. | 151 |
| /blog/publicite-chatgpt-ads-guide/ | Meta | Comment fonctionne la publicité dans ChatGPT, ce qu'elle change par rapport à Google Ads, et cinq critères pour décider si ce canal mérite votre budget. | 152 |
| /blog/automatiser-suivi-client-tpe/ | Meta | 7 automatisations simples pour une TPE : relances, rappels, réponses automatiques, demandes d'avis. Par où commencer et quoi éviter. | 132 |
| /blog/prise-rendez-vous-en-ligne-guide/ | Meta | Pourquoi et comment mettre en place la prise de rendez-vous en ligne quand on est indépendant : moins d'appels manqués, moins de rendez-vous oubliés. | 149 |
| /blog/relance-automatique-devis/ | Meta | Quand et comment relancer un devis automatiquement : le bon timing, des modèles de SMS et d'email, et ce qu'un agent IA peut prendre en charge. | 143 |
| /creation-site-internet/ | Title | Création de site internet pour TPE et PME \| Sitaly | 50 |
| /site-vitrine/ | Title | Site vitrine professionnel : création et SEO \| Sitaly | 53 |
| /refonte-site-internet/ | Title | Refonte de site internet sans perte de SEO \| Sitaly | 51 |
| /integration-api/ | Title | Intégration d'API : connecter vos logiciels \| Sitaly | 52 |
| /crm-sur-mesure/ | Title | CRM sur mesure pour TPE et PME \| Sitaly | 39 |
| /cgv/ | Title | CGV — Conditions générales de vente \| Sitaly | 44 |

Dans les tableaux de ce fichier, `\|` désigne le caractère `|` (échappé pour le Markdown) ; les comptes de caractères l'incluent sans la barre oblique.

Les titles des pages d'expertise vivent dans `src/data/expertises.ts`, ceux des réalisations dans `src/data/realisations.ts`, ceux des articles dans le champ `metaTitle`.

---

## Annexe B : données structurées

**Graphe de l'entité** (`https://sitaly.fr/#business`, `@type` `["Organization", "ProfessionalService"]`), à compléter là où il est généré :
- `geo` : `{"@type": "GeoCoordinates", "latitude": 48.61056, "longitude": 2.30889}` (centre de Brétigny-sur-Orge, pas d'adresse de rue) ;
- `openingHoursSpecification` : du lundi au vendredi de 08:00 à 19:00, le samedi de 09:00 à 13:00 ;
- `priceRange` : `"€€€"` ;
- `areaServed` : ajouter `{"@type": "AdministrativeArea", "name": "Essonne"}` avant Île-de-France et France ;
- `knowsAbout` : ajouter « ChatGPT Ads » et « Google Ads » après « Automatisation de processus » ;
- `logo` : ajouter `"width": 512, "height": 512` ;
- `makesOffer`, dans cet ordre : Agents IA pour PME (/agents-ia/), ChatGPT Ads (/chatgpt-ads/), Google Ads (/acquisition/), Automatisation des tâches (/automatisation-taches/), Création de site internet (/creation-site-internet/).

**WebSite** (`#website`) : `"alternateName": ["sitaly.fr", "Sitaly Agence"]`.

**Accueil** : un nœud `WebPage` (`https://sitaly.fr/#webpage`) avec `isPartOf` #website, `about` #business, `primaryImageOfPage` et `inLanguage` « fr-FR ». Le FAQPage prend l'`@id` `https://sitaly.fr/#faq` et reprend mot pour mot la FAQ de l'annexe D.

**/chatgpt-ads/** :
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://sitaly.fr/chatgpt-ads/#service",
      "name": "Gestion de campagnes ChatGPT Ads",
      "serviceType": "Agence ChatGPT Ads",
      "description": "Conception, lancement, mesure et optimisation de campagnes publicitaires ChatGPT Ads pour PME, entreprises de services, B2B, SaaS et e-commerce.",
      "url": "https://sitaly.fr/chatgpt-ads/",
      "provider": { "@id": "https://sitaly.fr/#business" },
      "areaServed": { "@type": "Country", "name": "France" },
      "audience": { "@type": "BusinessAudience", "audienceType": "PME, entreprises B2B, SaaS, e-commerce" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://sitaly.fr/chatgpt-ads/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://sitaly.fr/" },
        { "@type": "ListItem", "position": 2, "name": "ChatGPT Ads", "item": "https://sitaly.fr/chatgpt-ads/" }
      ]
    }
  ]
}
```
Plus le FAQPage de la page, aligné sur sa FAQ visible.

**Articles** : quand un article n'a pas d'image, l'Article prend l'image de partage par défaut (`https://sitaly.fr/og-image.png`). `author` en `{"@id": "https://sitaly.fr/#teddy-vidal"}`, `publisher` en `{"@id": "https://sitaly.fr/#business"}`, `dateModified` = `updatedAt`.

**Études de cas** (`realisations.$slug.tsx`) : BreadcrumbList Accueil › Réalisations › nom du client.

**/essonne/** : `WebPage` avec `about` #business, plus BreadcrumbList. Aucune nouvelle entité LocalBusiness.

---

## Annexe C : /chatgpt-ads/

**H2**

| # | Actuel | Nouveau |
|---|---|---|
| 1 | La recherche ne s'arrête plus à une requête | ChatGPT Ads ou Google Ads : ce qui change pour votre acquisition |
| 2 | Vos budgets sont déjà engagés. Un canal vient de s'ouvrir à côté. | Pourquoi tester ChatGPT Ads maintenant |
| 3 | Six étapes, aucune improvisation | Notre méthode de gestion de campagnes ChatGPT Ads en 6 étapes |
| 4 | Ce canal n'est pas pertinent pour tout le monde | ChatGPT Ads est-il rentable pour votre entreprise ? |
| 5 | À quoi ressemble une intention exploitable | Exemples d'intentions exploitables, secteur par secteur |
| 6 | Une agence d'acquisition, pas un revendeur de nouveauté | Pourquoi confier vos campagnes ChatGPT Ads à Sitaly |
| 7 | (nouvelle section) | ChatGPT Ads en France : dates, audiences et formats |
| 8 | Un accompagnement complet, budget publicitaire séparé | Tarif de gestion ChatGPT Ads : forfait et part du budget |
| 9 | Ce qu'il faut savoir sur la publicité dans ChatGPT | Questions fréquentes sur ChatGPT Ads |
| 10 | Découvrez si ChatGPT Ads peut devenir un nouveau canal… | Demander une analyse ChatGPT Ads |

**Questions à ajouter à la FAQ**
- *Combien coûte ChatGPT Ads ?* Deux budgets distincts : le budget publicitaire, payé à OpenAI, et la gestion. Chez Sitaly, la gestion démarre à 890 € par mois plus 10 % du budget publicitaire (D2). Le détail du calcul et le budget de test : lien vers /blog/cout-chatgpt-ads/.
- *Qui voit les publicités dans ChatGPT ?* Les utilisateurs adultes des offres gratuite et Go. Les abonnés Plus et Pro n'en voient pas. Les annonces sont signalées comme telles et séparées des réponses.
- *Faut-il passer par ChatGPT Ads Manager ou par une agence ?* Le libre-service est ouvert depuis le 1er septembre 2026. Une agence apporte le suivi des conversions en place avant de dépenser, le choix des intentions à cibler et le pilotage. (Lien vers le tutoriel seulement une fois celui-ci publié.)
- *Comment se passe le lancement d'une première campagne ?* Analyse du potentiel, mise en place du suivi des conversions, premier test avec un budget limité, puis décision sur les chiffres obtenus.

**Liens entrants vers /chatgpt-ads/**

| Depuis | Ancre | Emplacement |
|---|---|---|
| /blog/cout-chatgpt-ads/ | agence ChatGPT Ads | Introduction, puis CTA de fin |
| /blog/publicite-chatgpt-ads-guide/ | gestion de campagnes ChatGPT Ads | Section « Comment cadrer un premier test » |
| /blog/chatgpt-ads-secteurs-pme/ | analyse ChatGPT Ads | Section « Comment vérifier pour votre cas » |
| /acquisition/ | compléter Google Ads avec ChatGPT Ads | Section sur l'amélioration par les données |
| /agents-ia/ | combiner ChatGPT Ads et agents IA | FAQ |
| / (accueil) | publicité dans ChatGPT | Texte de l'offre ChatGPT Ads |
| Tutoriel ChatGPT Ads Manager (une fois publié) | confier vos campagnes ChatGPT Ads | Conclusion |

---

## Annexe D : FAQ de la page d'accueil

1. **Qu'est-ce qu'un agent IA peut faire pour ma PME ?** Décrocher le téléphone, qualifier une demande selon vos règles, proposer un créneau dans votre agenda, envoyer un SMS après un appel manqué, relancer un devis, répondre aux messages Instagram et gérer vos avis Google. Il met à jour vos outils et passe la main à un humain dès que la situation le demande.
2. **L'agent dit-il qu'il est une IA ?** Oui, dès la première phrase. C'est une obligation de l'article 50 du règlement européen sur l'IA, applicable depuis le 2 août 2026.
3. **Comment se construit le budget ?** Une mise en place, puis un pilotage mensuel, chiffrés par écrit après un diagnostic offert de 30 minutes. [Si D1 affiche les prix : « La mise en place démarre à 1 200 €, le pilotage à 499 € par mois. » Les montants viennent de `PRIX_AGENTS_IA`.]
4. **Que se passe-t-il quand l'agent ne sait pas répondre ?** Il passe la main : la demande est transmise à la bonne personne de votre équipe, selon les règles fixées ensemble pendant la mise en place.
5. **Qui s'occupe de mon projet ?** Teddy Vidal, fondateur de Sitaly, conçoit, installe et pilote lui-même chaque agent. Vous avez un seul interlocuteur, du diagnostic au suivi mensuel.
6. **Vous faites aussi les sites et la publicité ?** Oui. Sitaly pilote les campagnes ChatGPT Ads et Google Ads, et crée les sites, pour que les demandes arrivent, soient bien reçues, puis traitées par vos agents. (Liens vers /chatgpt-ads/, /acquisition/ et /creation-site-internet/.)

---

## Annexe E : page /essonne/

- **Title** (53) : Agence web, SEO et agents IA en Essonne (91) | Sitaly
- **Meta** (149) : Agence basée à Brétigny-sur-Orge : sites internet, référencement local, Google Ads et agents IA pour les entreprises de l'Essonne et d'Île-de-France.
- **H1** : Agence web et agents IA en Essonne, à Brétigny-sur-Orge
- **H2** :
  1. Ce que nous faisons pour les entreprises de l'Essonne (sites, référencement local, Google Ads, agents IA : un paragraphe et un lien chacun) ;
  2. Les communes où nous intervenons : Brétigny-sur-Orge, Saint-Michel-sur-Orge, Sainte-Geneviève-des-Bois, Arpajon, Évry-Courcouronnes, Corbeil-Essonnes, Massy, Palaiseau, Étampes, et toute l'Île-de-France à distance ;
  3. Une réalisation en Essonne : Lafleur Toiture (faits de la section 3, lien vers l'étude de cas) ;
  4. Un seul interlocuteur, à Brétigny-sur-Orge (DESIGN.md §9 : pas d'invitation à se rencontrer, tout commence par un appel) ;
  5. Questions fréquentes : « Intervenez-vous dans toute l'Essonne ? », « Faut-il se déplacer ? » (non : tout commence par un appel de 30 minutes, le diagnostic offert), « Travaillez-vous hors de l'Essonne ? » (Île-de-France, et toute la France à distance), « Par quoi commencer ? » (diagnostic offert de 30 minutes).
- Une seule page pour le département. Aucune page par ville : elles seraient traitées comme des pages satellites.
- CTA : appel (lien `tel:`) et réservation du diagnostic. Sur mobile, un bouton d'appel reste visible, avec le style existant du site.

---

## Annexe F : contenus à produire

Chaque article suit la structure de `src/data/blog-posts-agents-ia.ts` : `metaTitle` de 60 caractères au plus, `metaDescription` de 120 à 160, auteur Teddy Vidal, `publishedAt` à la date du jour, champ `cta`, au moins un lien vers la page de vente dans l'introduction et deux liens internes de plus. Entre 1 200 et 1 800 mots utiles, sans remplissage. Les faits viennent de la section 3, jamais d'ailleurs sans source.

| # | Slug | H1 | `metaTitle` | `metaDescription` | Cible (volume par mois) | CTA |
|---|---|---|---|---|---|---|
| F1 | agence-agents-ia-questions | Agence agents IA : 10 questions à poser avant de signer | Agence agents IA : 10 questions à poser avant de signer | Avant de confier un agent IA à une agence : 10 questions sur la conception, les données, la reprise humaine, la facturation et la sortie du contrat. | agence agent ia (10–100) | agents-ia |
| F2 | agent-ia-prise-de-rendez-vous | Prise de rendez-vous par agent IA : le brancher sur votre agenda en 5 étapes | Prise de rendez-vous par agent IA : 5 étapes \| Sitaly | Un agent IA qui propose des créneaux et confirme les rendez-vous : règles, connexion à l'agenda, qualification, rappels et reprise humaine, en 5 étapes. | agent ia prise de rendez vous (10–100) | agents-ia |
| F3 | standard-telephonique-ia | Standard téléphonique IA : ce qu'il remplace dans une PME | Standard téléphonique IA : ce qu'il remplace en PME | Standard téléphonique IA : ce qu'il remplace dans une PME, ce qu'il ne doit pas faire, les obligations en vigueur depuis août 2026 et comment le tester. | standard téléphonique ia (100–1 k) | agents-ia |
| F4 | agent-ia-rgpd | Agent IA et RGPD : la checklist avant de connecter un agent à vos données clients | Agent IA et RGPD : la checklist avant de le connecter | Base légale, information des appelants, sous-traitants, durée de conservation, transferts hors UE : la checklist RGPD avant de connecter un agent IA. | agent ia rgpd | agents-ia |
| F5 | prix-agent-ia | Prix d'un agent IA en 2026 : mise en place, abonnement, coût à la minute | Prix d'un agent IA en 2026 : mise en place et abonnement | Combien coûte un agent IA pour une PME en 2026 : mise en place, abonnement mensuel, coût des minutes de voix, et comment savoir s'il sera rentable. | agent ia prix (10–100) | agents-ia |

**Plans**
- **F1** : les 10 questions (qui conçoit et qui maintient l'agent ; se présente-t-il comme une IA ; que fait-il quand il ne sait pas ; où vont les données et quels sous-traitants ; comment il se connecte à l'agenda et au CRM ; ce qui est facturé à la mise en place, au mois, à l'usage ; comment on mesure ce qu'il traite ; qui relit les conversations et corrige ; comment on arrête et récupère ses données ; ce qu'il ne doit pas faire : démarchage à froid, conseil réglementé). Pour chacune : pourquoi la poser, la bonne réponse, ce que fait Sitaly (faits de la section 3 seulement). Liens : /agents-ia/, F4, articles AI Act et démarchage.
- **F2** : 1. fixer les règles (types de rendez-vous, durées, zones, qui reçoit) ; 2. connecter l'agenda ; 3. écrire les questions de qualification ; 4. confirmations et rappels par SMS ou e-mail ; 5. reprise humaine et suivi. Distinct de /blog/prise-rendez-vous-en-ligne-guide/ (outils de réservation), qu'il cite.
- **F3** : ce que fait un standard (accueil, filtrage, transfert, messages) ; ce qu'un agent vocal remplace, et ce qu'il ne remplace pas (standard humain, secrétariat externalisé, messagerie) ; obligations (AI Act article 50, pas de démarchage à froid des particuliers) ; quand ce n'est pas adapté ; comment le tester sur de vraies demandes. Lien principal vers F6. Aucun prix de marché sans source.
- **F4** : finalité et base légale ; information des personnes (annonce IA, enregistrement, transcription) ; minimisation ; durée de conservation ; sous-traitants et contrat (article 28 du RGPD) ; transferts hors Union européenne ; sécurité et accès ; droits des personnes ; registre des traitements ; analyse d'impact quand elle s'impose ; lien avec l'article 50 de l'AI Act. Mention : « Ce guide n'est pas un avis juridique. » Liens vers des pages de la CNIL seulement si tu les as ouvertes.
- **F5** (si D1 affiche les prix) : les trois composantes (mise en place, pilotage mensuel, coûts variables des minutes de voix et des SMS) ; ce qui fait varier le prix (nombre d'agents, intégrations, volume d'appels) ; les montants plancher de Sitaly lus dans `PRIX_AGENTS_IA` ; une méthode de calcul de rentabilité avec les chiffres du lecteur (simulation explicite, en variables) ; les questions à poser (lien F1).
- **F6** : page `/agents-ia/agent-vocal/`, nouvelle route sur le modèle de `agents-ia_.btp.tsx`. Title (55) : « Agent vocal IA pour PME : accueil téléphonique | Sitaly ». Meta (139) : « Un agent vocal IA qui décroche, se présente comme une IA, qualifie la demande et propose un rendez-vous. Mis en place et piloté par Sitaly. » H1 : « Agent vocal IA pour PME ». Contenu : ce qu'il fait, ce qu'il ne fait pas, déroulé de la mise en place, outils connectés, quatre questions, liens vers les trois pages secteurs et vers F3. Ajoute-la au sitemap, à `llms.txt` et aux liens de /agents-ia/.

---

## Annexe G : backlog (un article par semaine, dans cet ordre)

1. Agent IA : définition simple, et ce qui le distingue d'un logiciel classique
2. 12 exemples d'agents IA en PME, classés par métier (liens vers les pages secteurs)
3. Agent IA ou scénario n8n : comment savoir si vous avez vraiment besoin d'IA (lien /automatisation-taches/)
4. Quel agent IA choisir pour une PME en 2026 : comparatif par usage
5. Agent IA pour Gmail et Outlook : trier, répondre et relancer les e-mails d'une PME
6. Risques des agents IA en entreprise : erreurs, fuites de données, dérives, et comment les cadrer
7. Comment fonctionne un agent IA : mémoire, outils et règles expliqués aux dirigeants
8. Agent IA autonome : ce qu'il peut décider seul, ce qui doit rester humain
9. Agent IA et RAG : pourquoi votre agent doit s'appuyer sur vos propres documents
10. ChatGPT, Claude ou Mistral : sur quel modèle bâtir l'agent IA d'une entreprise française
11. Agent IA gratuit ou sur mesure : ce que le gratuit coûte vraiment en entreprise
12. Agent vocal IA en France : ce qu'il faut exiger (voix, RGPD, AI Act, hébergement)
13. Mettre en place un agent IA dans une PME : étapes, délais et budget d'un projet
14. Agent IA pour agence immobilière : ce qu'il gère, ce qu'il coûte, comment le tester (soutien de /agents-ia/agences-immobilieres/)
15. Les agents IA dont on parle (Claude Code, OpenClaw, Hermes agent, « skills ») expliqués à une PME, avec renvoi vers /agents-ia/
16. ChatGPT Ads Manager : le brouillon de la phase 8, une fois complété par Ted
17. Gemini Ads : seulement avec une source officielle (D6)

Calendrier : ce qui doit se classer en novembre part en octobre. Les contenus « site internet » se préparent pour janvier à mars, leur pic. Rien d'important ne se lance en juillet et août.
