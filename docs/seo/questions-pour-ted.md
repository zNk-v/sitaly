# Questions pour Ted

Plan SEO d'octobre 2026, branche `seo-octobre-2026`. Chaque question porte sur
un fait que le plan ne donne pas. Aucun de ces faits n'a été inventé : le texte
publié s'arrête là où la réponse manque. Les questions sont classées de la plus
bloquante à la moins bloquante.

## 1. Sortie du contrat agents IA : durée, préavis, restitution des données

**Où ça manque.** Article /blog/agence-agents-ia-questions/, question 9
(« Comment arrête-t-on, et que deviennent mes données ? ») : la partie
« Chez Sitaly » est absente. La FAQ du même article répond de façon générale
(« Cela dépend des contrats »).

**Ce qu'il faut savoir.**
- Durée d'engagement du pilotage mensuel (sans engagement, 3 mois, 12 mois ?).
- Préavis de résiliation.
- Ce qui est remis au client à la sortie : historique des conversations, règles
  et scripts, numéro de téléphone (portabilité du numéro Twilio ?), et dans
  quel format.
- Délai de suppression des données chez Sitaly et chez les sous-traitants.

**Une fois la réponse connue**, ajouter un paragraphe « Chez Sitaly : … » dans
`src/data/articles/agence-agents-ia-questions.ts`, question 9, et la même ligne
dans `public/llms-full.txt`.

## 2. CGV : la description des services ne couvre plus l'offre

**Constat.** L'article 1 « Objet » des CGV (`src/routes/cgv.tsx`) décrit deux
familles de services : des sites « à destination des artisans, TPE et
professionnels indépendants », et une « Plateforme Sitaly : une application en
ligne (logiciel en mode SaaS) ». Les agents IA, ChatGPT Ads et Google Ads n'y
figurent pas. Le plan interdit de toucher aux clauses : rien n'a été modifié
dans le corps des CGV (seuls le title et la meta ont changé en phase 1).

**Proposition de nouvelle rédaction de l'article 1**, à faire valider :

> Le Prestataire propose, à destination des PME, TPE et professionnels
> indépendants, les services suivants :
> - **Agents IA** : conception, mise en place et pilotage mensuel d'agents
>   conversationnels (voix, SMS, messages écrits) et d'automatisations
>   connectés aux outils du Client ;
> - **Gestion de campagnes publicitaires** : Google Ads et ChatGPT Ads, le
>   budget publicitaire étant payé directement par le Client à la régie ;
> - **Sites internet** : création, hébergement et maintenance de sites ;
> - **Plateforme Sitaly** : une application en ligne permettant à
>   l'Utilisateur de gérer ses clients et prospects, d'être assisté par une
>   intelligence artificielle pour la rédaction de messages, et de gérer sa
>   visibilité et ses avis Google.

**Questions liées.**
- La plateforme Sitaly (application en ligne) est-elle toujours proposée ? Si
  non, les articles 2, 6 et suivants qui en parlent sont à revoir.
- Les agents IA et la publicité ont-ils besoin de conditions propres
  (durée, résiliation, sous-traitance au sens du RGPD, responsabilité sur les
  échanges de l'agent) ? La question 1 ci-dessus en fait partie.

## 3. Politique de confidentialité : même décalage

**Constat.** L'article 2 de `src/routes/politique-confidentialite.tsx` présente
l'application Sitaly comme « l'espace client destiné aux artisans et petites
entreprises ». Non modifié (texte juridique).

**Proposition.** « l'espace client destiné aux PME, TPE et professionnels
indépendants », si l'application est maintenue. Par ailleurs, la politique ne
décrit pas les traitements faits pour le compte des clients par les agents IA
(Sitaly y est sous-traitant) : à ajouter avec un juriste.

## 4. Hébergement des données des agents et transferts hors UE

**Où ça manque.** Article /blog/agent-ia-rgpd/, section 6 « Les transferts hors
de l'Union européenne » : l'article dit au lecteur quoi demander, mais pas ce
que fait Sitaly. Même chose pour la question 4 de l'article F1.

**Ce qu'il faut savoir**, outil par outil (Vapi, Twilio, Cal.com, n8n, Claude
d'Anthropic, Supabase) :
- région d'hébergement des données (Union européenne ou non) ;
- n8n est-il auto-hébergé, et où ?
- mécanisme de transfert pour les outils américains (Data Privacy Framework,
  clauses contractuelles types) ;
- les enregistrements audio sont-ils conservés, et combien de temps ?

**Une fois la réponse connue**, ajouter un paragraphe « Chez Sitaly » dans les
sections 4 et 6 de `src/data/articles/agent-ia-rgpd.ts`.

## 5. Date d'ouverture du libre-service ChatGPT Ads Manager

**Écart entre les sources.** Le plan (section 3) et l'article de datashake
donnent le 1er septembre 2026. L'annonce d'OpenAI, « ChatGPT Ads se déploie en
Europe », mise à jour le 31 août 2026, annonce l'ouverture du libre-service pour
les 31 marchés européens à cette date.

**Ce qui est publié.** « Libre-service depuis le 1er septembre 2026 » partout,
et, sur /chatgpt-ads/, la précision « OpenAI a annoncé cette ouverture pour les
31 marchés européens le 31 août 2026 ».

**Question.** Garder le 1er septembre (date du plan), ou passer au 31 août ?

## 6. Lien Calendly du diagnostic de 30 minutes (D4)

`CALENDLY_URL` pointe toujours vers l'événement « decouverte-de-votre-projet-web ».
Seuls les libellés des boutons disent « Réserver un diagnostic de 30 min ».
Dès que l'événement « Diagnostic Sitaly (30 min) » existe, donner son URL :
elle remplace `CALENDLY_URL` dans `src/lib/config.ts`, le lien de
`public/llms.txt` et celui de `public/llms-full.txt`.

## 7. Garder son numéro de téléphone avec l'agent vocal

**Où c'est écrit.** Page /agents-ia/agent-vocal/ (outils et FAQ « Faut-il
changer de numéro ? ») et article /blog/standard-telephonique-ia/ : un renvoi
d'appel réglé chez l'opérateur du client envoie les appels vers l'agent. La
réponse est formulée « En règle générale, non », avec vérification pendant le
diagnostic.

**Question.** Est-ce bien ainsi que Sitaly installe l'agent (renvoi vers un
numéro Twilio), ou le client reçoit-il un nouveau numéro ? Si le renvoi est la
règle, la formulation peut devenir plus nette.

## 8. Offres secondaires encore proposées ?

`public/pricing.md` liste encore un « Blog SEO : articles rédigés et mis en
page chaque mois » et des compléments (logo, photos, rédaction). Sont-ils
toujours vendus ? Sinon, les retirer du fichier.

## Rappel : montants recopiés à la main

Les montants de `PRIX_AGENTS_IA` et `PRIX_CHATGPT_ADS` (`src/lib/config.ts`)
sont aussi écrits en clair dans `public/chatgpt-ads/index.html`,
`public/llms.txt`, `public/llms-full.txt` et `public/pricing.md`. Toute
modification de prix se reporte dans ces quatre fichiers.
