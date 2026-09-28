# Rapport SEO, octobre 2026

Branche `seo-octobre-2026`, créée depuis `refonte-da-2026` (68e49ae), le
28 septembre 2026. Rien n'est poussé ni déployé. Le plan exécuté est
`docs/seo/PLAN_SEO_CLAUDE_CODE.md`.

## 1. Phases

| Phase | État | Ce qui a été fait, et les réserves |
|---|---|---|
| 0. Lecture et état initial | Fait | Branche créée, `scripts/verifier-seo.mjs` écrit (`npm run verifier:seo`), état initial dans `docs/seo/etat-initial.txt` : 41 erreurs, 21 avertissements. |
| 1. Titles, metas, textes à risque | Fait | Annexe A appliquée. « Jusqu'à 30 % » et les chiffres sans source retirés des articles indexables (relances, rendez-vous, suivi client, agent immobilier, chatbot, guide agent IA) ; simulations en variables à la place. Diagnostic de 30 minutes partout. |
| 2. /chatgpt-ads/ | Fait | H1 et structure de l'annexe C, faits du lancement datés et sourcés (OpenAI, datashake, Waisso), tarif 890 € + 10 %, FAQ de 12 questions identique au JSON-LD, formulaire envoyé au relais `sitaly-forms` avec repli téléphone et e-mail. Réserve : le relais refuse les envois depuis localhost ; seul le repli a pu être testé. Un envoi réel est à faire après la mise en ligne. |
| 3. Accueil, IA en tête | Fait | Titre, bloc « Un seul système », prestations et expertises réordonnées (agents IA, acquisition, site), FAQ de l'annexe D, processus en cinq étapes. /agents-ia/ : six agents (Instagram à la place de WhatsApp), prix plancher D1, section service client. DESIGN.md §8, §8 bis et §9 mis à jour et datés. |
| 4. /acquisition/ et /essonne/ | Fait | /acquisition/ recadrée sur Google Ads (H1 de l'annexe A, « Un seul consultant », lien vers ChatGPT Ads). /essonne/ créée (annexe E) : services, communes, cas Lafleur Toiture, horaires, FAQ, barre d'appel sur mobile. |
| 5. Maillage interne | Fait | Blocs « À lire » sur les pages de vente, lien vers la page de vente dans le texte de chaque article indexable, CTA de fin d'article selon le sujet, carte « Étape suivante » vers une autre famille. |
| 6. Données structurées | Fait | Entité complétée (horaires, zone, offres dans l'ordre de l'annexe B, logo), rattachements par `@id` (accueil, Service, CreativeWork, articles). |
| 7. Performance mobile | Fait | Erreur React #418 corrigée (dates formatées en UTC, date du build fixée par Vite). Corps des articles chargés à la demande : environ 90 Kio gzip de JavaScript en moins par page (accueil : 298 → 208 Kio). CSS critique en ligne (beasties), GA4 chargé après la page, captures en WebP avec `srcset`, lectures et écritures de mise en page séparées dans les hooks d'animation. |
| 8. Contenus | Fait | F1 à F5 publiés le 28 septembre 2026 (F5 parce que D1 affiche les prix) ; page F6 /agents-ia/agent-vocal/. /blog/cout-chatgpt-ads/ et /blog/publicite-chatgpt-ads-guide/ mis à jour avec le lancement ; section agent IA, chatbot et assistant IA ajoutée à l'article chatbot. /automatisation-taches/ : cause probable du soft 404 traitée (voir plus bas). /crm-sur-mesure/ et /logiciel-metier/ enrichis, sans montant. Brouillon `docs/seo/brouillons/chatgpt-ads-manager.md` et `docs/seo/backlog-contenus.md`. |
| 9. Nettoyage, fichiers pour les IA | Fait | Page 404 en français, `noindex`, prérendue en `/404.html`. `llms.txt`, `llms-full.txt` et `pricing.md` réécrits (ordre agents IA, ChatGPT Ads, Google Ads, sites ; tarifs D1 et D2). Sitemap : 50 pages, toutes indexables. CGV et politique de confidentialité non modifiées : propositions dans `questions-pour-ted.md`. |
| 10. Contrôles et rapport | Fait | Build, `tsc` et lint sans erreur ; `verifier:seo` à 0 erreur et 0 avertissement ; ce rapport. |

### Points à connaître

- **Soft 404 de /automatisation-taches/.** Le HTML prérendu était complet,
  sans texte d'erreur. Causes probables : un contenu principal court à côté
  d'un menu et d'un pied de page très fournis, un H1 sans « automatisation des
  tâches » et aucun `<main>`. Corrigé : H1 avec le mot-clé, étapes, exemples
  par secteur, deux questions de plus, `<main>` dans le gabarit (et sur les
  secteurs, les articles, l'accueil et /acquisition/). Affirmations sans
  preuve retirées (« quelques heures par semaine sont un résultat courant »).
  Seule la Search Console dira si Google change son classement.
- **Page 404.** Servie à une autre adresse que /404, la page hydratée se
  vidait sur un invariant du routeur. `scripts/page-404.mjs` (postbuild)
  retire donc ses scripts : la page reste en HTML et CSS, tous ses liens
  marchent, mais le bouton du menu mobile ne s'ouvre pas. Le pied de page
  porte toute la navigation.
- **Montants recopiés à la main.** `public/chatgpt-ads/index.html`,
  `llms.txt`, `llms-full.txt` et `pricing.md` écrivent les prix en clair.
  Tout changement de `PRIX_AGENTS_IA` ou `PRIX_CHATGPT_ADS` s'y reporte.
- **Pages hors index (D3).** Aucune n'a été touchée. **Gemini (D6).** Aucun
  contenu.

## 2. Avant, après

### Contrôle du build (`npm run verifier:seo`)

| | Erreurs | Avertissements | Pages indexables | Adresses au sitemap |
|---|---|---|---|---|
| Avant (68e49ae) | 41 | 21 | 43 | 43 |
| Après | 0 | 0 | 50 | 50 |

Les cinq derniers avertissements (titles et metas courts des pages cookies,
mentions légales et confidentialité) ont été corrigés : seuls le title et la
meta ont changé, pas le texte juridique.

### Lighthouse mobile, accueil

Mesuré en local (Lighthouse 12, profil mobile simulé, serveur statique avec
gzip), médiane de trois passages. Ce ne sont pas les chiffres de PageSpeed sur
le site en ligne (73 et 5,1 s dans l'audit), qui dépendent aussi de l'hébergement.

| | Score | LCP | FCP | CLS |
|---|---|---|---|---|
| Avant (68e49ae) | 79 | 4,2 s | 3,3 s | 0,002 |
| Après (phase 7) | 84 | 3,5 s | 3,2 s | 0,002 |
| Après (build final) | 83 | 3,5 s | 3,3 s | 0,002 |

/agents-ia/agent-vocal/, build final : 87, LCP 3,2 s.

### Titles, metas et H1 modifiés

Comparaison des pages indexables du build d'origine et du build final.

| Page | Élément | Avant | Après |
|---|---|---|---|
| / | Title | Agents IA et automatisation pour PME \| Sitaly | Agence IA pour PME : agents IA et automatisation \| Sitaly |
| /acquisition/ | Title | Agence Google Ads pour PME, TPE et artisans \| Sitaly | Consultant et agence Google Ads pour PME \| Sitaly |
| /acquisition/ | Meta | Sitaly crée, pilote et optimise vos campagnes Google Ads pour générer des demandes qualifiées. Forfait de gestion mensuel, budget Google séparé et sans engagement de durée. | Sitaly crée, pilote et optimise vos campagnes Google Ads pour générer des demandes qualifiées. Forfait mensuel sans engagement, budget Google séparé. |
| /acquisition/ | H1 | Transformez Google en source régulière de nouveaux clients. | Agence Google Ads pour PME : des demandes qualifiées chaque mois |
| /agents-ia/ | H1 | Agents IA pour PME Chaque demande traitée. Chaque client qualifié. Chaque relance envoyée. | Agents IA pour PME |
| /automatisation-taches/ | H1 | Automatisation : rendre à la semaine les heures qu'elle vous prend | Automatisation des tâches : relances, rappels et saisies faits sans vous |
| /blog/ | Title | Blog Sitaly : agents IA, automatisation et acquisition pour PME | Blog Sitaly : agents IA, ChatGPT Ads et automatisation |
| /blog/agent-ia-entreprise-guide/ | Meta | Ce qu'un agent IA fait réellement dans une TPE ou une PME, les quatre tâches où il tient ses promesses, comment en calculer le retour, et les cas où une automatisation simple suffit. | Ce qu'un agent IA fait dans une PME, les tâches où il est rentable, ce qu'il coûte et les cas où une automatisation simple suffit. |
| /blog/automatiser-suivi-client-tpe/ | Meta | 7 automatisations simples pour une TPE ou un indépendant : relances, rappels, réponses automatiques, demandes d'avis. Gagnez des heures et ne perdez plus aucun client. | 7 automatisations simples pour une TPE : relances, rappels, réponses automatiques, demandes d'avis. Par où commencer et quoi éviter. |
| /blog/chatgpt-ads-secteurs-pme/ | Meta | SaaS, B2B, immobilier, assurance, formation, e-commerce : quels secteurs bénéficient vraiment de la publicité dans ChatGPT, lesquels n'y gagnent rien, et comment le vérifier. | SaaS, B2B, immobilier, assurance, formation : les secteurs où la publicité dans ChatGPT a du sens, ceux où elle n'apporte rien, et comment le vérifier. |
| /blog/cout-chatgpt-ads/ | Meta | Aucun CPA fiable n'existe encore sur ChatGPT Ads en France. Voici la structure de coût, pourquoi s'en méfier des chiffres qui circulent, et comment calculer votre propre seuil. | Prix de ChatGPT Ads en France : ce qui compose le coût, quel budget de test prévoir et comment calculer le coût par lead acceptable pour votre marge. |
| /blog/prise-rendez-vous-en-ligne-guide/ | Meta | Moins d'appels manqués, plus de rendez-vous remplis : pourquoi et comment mettre en place la prise de rendez-vous en ligne quand on est indépendant ou thérapeute. | Pourquoi et comment mettre en place la prise de rendez-vous en ligne quand on est indépendant : moins d'appels manqués, moins de rendez-vous oubliés. |
| /blog/prise-rendez-vous-en-ligne-guide/ | H1 | Prise de rendez-vous en ligne : le guide complet pour indépendants et thérapeutes | Prise de rendez-vous en ligne : le guide complet pour PME, TPE et indépendants |
| /blog/publicite-chatgpt-ads-guide/ | Meta | Comment fonctionne la publicité dans ChatGPT, ce qu'elle change par rapport à Google Ads, et cinq critères concrets pour décider si ce canal mérite votre budget. | Comment fonctionne la publicité dans ChatGPT, ce qu'elle change par rapport à Google Ads, et cinq critères pour décider si ce canal mérite votre budget. |
| /blog/relance-automatique-devis/ | Title | Relance de devis automatique : signez plus (guide 2026) | Relance de devis automatique : méthode et modèles (2026) |
| /blog/relance-automatique-devis/ | Meta | Jusqu'à 30 % de devis signés en plus grâce à la relance automatique. Méthode, timing, modèles de SMS et d'email prêts à l'emploi pour artisans et indépendants. | Quand et comment relancer un devis automatiquement : le bon timing, des modèles de SMS et d'email, et ce qu'un agent IA peut prendre en charge. |
| /cgv/ | Title | CGV — Conditions Générales de Vente et d'Utilisation — Sitaly | CGV — Conditions générales de vente \| Sitaly |
| /cgv/ | Meta | Conditions générales de vente et d'utilisation des services Sitaly : création de sites internet et plateforme SaaS pour artisans. | Conditions générales de vente et d'utilisation des services Sitaly : sites internet, hébergement et maintenance, et accès à la plateforme Sitaly. |
| /chatgpt-ads/ | Title | Agence ChatGPT Ads en France — Publicité dans ChatGPT \| Sitaly | Agence ChatGPT Ads : publicité dans ChatGPT \| Sitaly |
| /chatgpt-ads/ | Meta | Sitaly conçoit et pilote vos campagnes ChatGPT Ads : analyse des intentions, messages, tracking des conversions et optimisation du coût d'acquisition. | Publicité dans ChatGPT pour PME et B2B : stratégie, annonces, suivi des conversions et pilotage de vos campagnes ChatGPT Ads. Analyse sans engagement. |
| /chatgpt-ads/ | H1 | Apparaissez dans ChatGPT au moment où vos futurs clients cherchent une solution. | Agence ChatGPT Ads : votre publicité dans ChatGPT |
| /cookies/ | Title | Politique cookies — Sitaly | Politique cookies du site sitaly.fr \| Sitaly |
| /cookies/ | Meta | Politique de gestion des cookies du site Sitaly conformément à la réglementation CNIL. | Les cookies utilisés sur sitaly.fr, leur finalité et leur durée de conservation, et la façon de gérer vos préférences, selon les recommandations de la CNIL. |
| /creation-site-internet/ | Title | Création de site internet pour TPE, PME et indépendants \| Sitaly | Création de site internet pour TPE et PME \| Sitaly |
| /crm-sur-mesure/ | Title | CRM sur mesure pour TPE et PME : suivi client simple \| Sitaly | CRM sur mesure pour TPE et PME \| Sitaly |
| /integration-api/ | Title | Intégration d'API : connecter vos logiciels entre eux \| Sitaly | Intégration d'API : connecter vos logiciels \| Sitaly |
| /mentions-legales/ | Title | Mentions légales — Sitaly | Mentions légales du site sitaly.fr \| Sitaly |
| /mentions-legales/ | Meta | Mentions légales du site Sitaly conformément à la loi française. | Mentions légales de sitaly.fr : éditeur du site (Teddy Vidal, entrepreneur individuel), hébergement, propriété intellectuelle, droit applicable et contact. |
| /politique-confidentialite/ | Meta | Politique de confidentialité et protection des données personnelles (RGPD) du site et de l'application Sitaly. | Politique de confidentialité de Sitaly : données collectées sur le site et dans l'application, finalités, bases légales, durées de conservation et vos droits. |
| /realisations/ | Meta | Les sites réalisés par Sitaly pour des artisans et des indépendants. Chaque projet est en ligne et consultable : couvreur en Essonne, rénovation en Haute-Garonne, chef à domicile en Île-de-France. | Sites réalisés par Sitaly, en ligne et consultables : couvreur en Essonne, rénovation en Haute-Garonne, chef consultant en Île-de-France. |
| /realisations/aymeric-pataud/ | Title | Aymeric Pataud, chef consultant, expert du goût — étude de cas \| Sitaly | Aymeric Pataud : site d'un chef consultant \| Sitaly |
| /realisations/aymeric-pataud/ | Meta | Un chef qui ne vend pas une prestation mais une signature. Ici le site devait porter une voix, pas un catalogue : la conception part de l'écriture plutôt que de la grille. Site en ligne sur aymericpataud.fr, réalisé par Sitaly. | Étude de cas : le site d'Aymeric Pataud, chef consultant, pensé comme une signature éditoriale plutôt qu'un catalogue de prestations. |
| /realisations/entreprise-felicioni/ | Title | Entreprise Felicioni, rénovation complète et second œuvre — étude de cas \| Sitaly | Entreprise Felicioni : site de rénovation \| Sitaly |
| /realisations/entreprise-felicioni/ | Meta | En rénovation, le client ne compare pas des prix, il compare des chantiers. Le site est bâti autour de la démonstration visuelle plutôt que de la description. Site en ligne sur entreprise-felicioni.com, réalisé par Sitaly. | Étude de cas : le site d'Entreprise Felicioni, rénovation et second œuvre, construit autour des photos de chantiers plutôt que des descriptions. |
| /realisations/lafleur-toiture/ | Title | Lafleur Toiture, couverture, ravalement et peinture — étude de cas \| Sitaly | Lafleur Toiture : site d'un couvreur en Essonne \| Sitaly |
| /realisations/lafleur-toiture/ | Meta | Un couvreur dont les clients appellent en urgence, pour une fuite ou une tuile envolée. Le site est construit autour d'une seule question : combien de secondes entre l'arrivée sur la page et l'appel. Site en ligne sur lafleur-toiture.fr, réalisé par Sitaly. | Étude de cas : le site de Lafleur Toiture, couvreur en Essonne, conçu pour réduire le délai entre l'arrivée sur la page et l'appel. Site en ligne. |
| /refonte-site-internet/ | Title | Refonte de site internet sans perdre son référencement \| Sitaly | Refonte de site internet sans perte de SEO \| Sitaly |
| /site-vitrine/ | Title | Site vitrine professionnel : création et référencement \| Sitaly | Site vitrine professionnel : création et SEO \| Sitaly |

**Pages nouvelles**

| Page | Title | H1 |
|---|---|---|
| /agents-ia/agent-vocal/ | Agent vocal IA pour PME : accueil téléphonique \| Sitaly | Agent vocal IA pour PME |
| /blog/agence-agents-ia-questions/ | Agence agents IA : 10 questions à poser avant de signer | Agence agents IA : 10 questions à poser avant de signer |
| /blog/agent-ia-prise-de-rendez-vous/ | Prise de rendez-vous par agent IA : 5 étapes \| Sitaly | Prise de rendez-vous par agent IA : le brancher sur votre agenda en 5 étapes |
| /blog/agent-ia-rgpd/ | Agent IA et RGPD : la checklist avant de le connecter | Agent IA et RGPD : la checklist avant de connecter un agent à vos données clients |
| /blog/prix-agent-ia/ | Prix d'un agent IA en 2026 : mise en place et abonnement | Prix d'un agent IA en 2026 : mise en place, abonnement, coût à la minute |
| /blog/standard-telephonique-ia/ | Standard téléphonique IA : ce qu'il remplace en PME | Standard téléphonique IA : ce qu'il remplace dans une PME |
| /essonne/ | Agence web, SEO et agents IA en Essonne (91) \| Sitaly | Agence web et agents IA en Essonne, à Brétigny-sur-Orge |

## 3. Questions ouvertes

Détail dans `docs/seo/questions-pour-ted.md` :

1. Sortie du contrat agents IA : durée, préavis, restitution des données (la
   question 9 de l'article F1 n'a pas de partie « Chez Sitaly »).
2. CGV : l'article 1 ne décrit ni les agents IA ni la publicité ; nouvelle
   rédaction proposée.
3. Politique de confidentialité : « destiné aux artisans », et rien sur les
   traitements faits par les agents pour le compte des clients.
4. Hébergement des données des agents et transferts hors de l'Union, outil par outil.
5. Date du libre-service ChatGPT Ads Manager : 1er septembre 2026 (plan,
   datashake) ou 31 août 2026 (OpenAI).
6. URL de l'événement Calendly « Diagnostic Sitaly (30 min) » (D4).
7. Numéro de téléphone conservé ou non avec l'agent vocal.
8. Offres secondaires de `pricing.md` (blog SEO, logo, photos) encore vendues ?

## 4. Mise en ligne, à lancer par Ted après relecture

```bash
git checkout refonte-da-2026 && git merge --no-ff seo-octobre-2026 && ./deploy.sh "SEO : plan d'octobre 2026"
```

## 5. Actions manuelles après la mise en ligne

- **Search Console** : Inspection de l'URL, Tester l'URL en ligne, puis Demander une indexation pour /automatisation-taches/, /blog/agent-ia-entreprise-guide/, /, /agents-ia/, /chatgpt-ads/, /acquisition/, /essonne/, /agents-ia/agent-vocal/ et chaque nouvel article. Renvoyer le sitemap.
- **Calendly** : créer l'événement « Diagnostic Sitaly (30 min) » et donner son URL (D4).
- **Fiche Google** (textes prêts dans la section 10 du rapport d'audit) : nouvelle description ; un post par semaine pendant 4 semaines ; service « Gestion de campagnes ChatGPT Ads » ; retirer les catégories « Entreprise de logiciels » et « Consultant en marketing » ; nouvelle photo de couverture et photos de Teddy au travail ; lien vers /essonne/ avec paramètres UTM ; demander un avis à chaque client livré.
- **Cache** : passer Cloudflare devant GitHub Pages (compte déjà utilisé pour sitaly-forms). Déplacer les DNS de sitaly.fr d'OVH vers Cloudflare en vérifiant que les MX, le SPF et les deux DKIM Brevo sont repris, puis une règle de cache d'un an sur /assets/* et /fonts/*.
- **Annuaires** : PagesJaunes, Mappy et 118 712 décrivent encore Sitaly « pour artisans ».
- **Rythme** : un article par semaine depuis `docs/seo/backlog-contenus.md`.
- **Dans 4 semaines** : relire dans Search Console les impressions de /agents-ia/, /chatgpt-ads/ et /essonne/.

Les nouveaux articles à soumettre : /blog/agence-agents-ia-questions/,
/blog/agent-ia-prise-de-rendez-vous/, /blog/standard-telephonique-ia/,
/blog/agent-ia-rgpd/, /blog/prix-agent-ia/.

À vérifier aussi, une fois en ligne : un envoi réel du formulaire de
/chatgpt-ads/ (le relais doit accepter l'origine sitaly.fr et l'événement
`generate_lead` doit remonter dans GA4), et une adresse inconnue, pour voir la
page 404.

## 6. Commits de la branche

| Commit | Message |
|---|---|
| 7e5dd59 | SEO : script de contrôle du build et état initial |
| d3c9edc | Titles et metas : annexe A appliquée, chiffres sans source retirés des articles |
| c8094c5 | ChatGPT Ads : page de vente refondue, formulaire branché sur le relais |
| 945695b | Accueil et architecture : l'IA en tête |
| 522b3ad | Google Ads et Essonne : page de vente recadrée, page locale créée |
| ea26df5 | Maillage interne : blocs À lire, liens vers les pages de vente, CTA par sujet |
| 476e1a4 | Données structurées : entité Sitaly complétée, rattachements par @id |
| 9b2ff18 | Performance mobile : hydratation réparée, blog hors des autres pages, CSS critique |
| 52f3715 | Contenus : corps de l'article F1 (agence agents IA, 10 questions), pas encore publié |
| 56ee9af | Performance : date du build injectée par Vite (oubliée du commit précédent) |
| bf687cc | Contenus : cinq articles agents IA et la page agent vocal |
| 4996de4 | Contenus : articles ChatGPT Ads à jour, pages d'automatisation enrichies |
| 60c2546 | Nettoyage : page 404 en français, fichiers pour les IA à jour |
| (ce commit) | Contrôles : pages légales, questions ouvertes et rapport |
