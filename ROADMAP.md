# Roadmap Balick UI

Document de référence pour la stratégie et l'avancement du projet. Les cases
cochées sont faites ; mettre ce fichier à jour à chaque étape terminée.

## Positionnement

> **Balick UI : des blocks conçus pour aller ensemble. Compose ta page,
> installe-la en une commande.**

Le marché compte des centaines de registres shadcn. La plupart sont des
catalogues : un hero d'un registre, un pricing d'un autre et un footer d'un
troisième donnent une page qui semble conçue par trois personnes. Balick UI se
distingue par :

1. **Un système cohérent** : tous les blocks partagent les mêmes primitives et
   les mêmes règles (voir [`DESIGN.md`](DESIGN.md)). N'importe quelle
   combinaison fonctionne.
2. **Le composeur** : choisir ses blocks sur le site, voir la page en direct,
   puis tout installer (blocks et page assemblée) avec une seule commande.
3. **Une qualité de production démontrée** : accessibilité, poids,
   compatibilité Server Components, respect des préférences de mouvement.

L'animation est **sobre et assumée** : là où d'autres cherchent à
impressionner, Balick accompagne.

## Histoire de lancement

« Je l'ai construit pour moi, j'ai réalisé plusieurs sites avec, aujourd'hui je
le partage. » Condition : utiliser réellement le composeur pour construire ces
sites avant le lancement (étape D).

## Modèle économique

- **Gratuit et open source, pour toujours** : tous les composants, tous les
  blocks, le composeur.
- **Pro, plus tard** : templates complets (sites multi-pages), packs de blocks
  avancés, thèmes supplémentaires. Distribution possible via un registre
  `@balick-pro` protégé par une clé.
- **Règle** : ne jamais rendre payant quelque chose qui a été gratuit.

### Frontière gratuit / Pro du composeur

Le cœur du composeur est gratuit : c'est le différenciateur et la vitrine de
l'offre Pro. La frontière suit ce qui coûte à faire tourner et ce qui fait
gagner beaucoup de temps aux professionnels.

| Gratuit, pour toujours | Pro, plus tard |
| --- | --- |
| Choisir et ordonner les blocks gratuits | Blocks Pro visibles dans le composeur, installables avec une clé |
| Aperçu en direct (desktop, tablette, mobile) | Sites multi-pages |
| Lien de partage (composition dans l'URL) | Projets enregistrés dans un compte |
| Installation en une commande | Personnalisation avant export (textes, logo, couleurs) |
| | Export vers GitHub ou déploiement Vercel |
| | Génération d'une page par IA |

## Étapes

### A. Fondations

- [x] Règles de design écrites ([`DESIGN.md`](DESIGN.md))
- [x] Primitive partagée `section` : `Section`, `Container`, `SectionHeader`
- [x] Item `theme` installable, synchronisé automatiquement avec la palette du site
- [x] Les 4 blocks existants utilisent les primitives partagées
- [x] Page de documentation « Theming »

### B. Blocks essentiels

Mieux vaut 15 blocks parfaitement compatibles que 60 disparates.

- [x] Navbar (indispensable pour composer une vraie page) : `navbar-01`
- [x] Logos : `logos-01`
- [x] Témoignages : `testimonials-01`
- [x] FAQ : `faq-01`
- [x] Call to action : `cta-01`
- [ ] Variantes des blocks clés : hero-02, features-02, pricing-02, footer-02

### C. Composeur

Première version volontairement simple : une page, un ordre de blocks, pas
d'édition des textes dans l'interface.

- [x] Page `/compose` : choix des blocks par catégorie, insérés à la bonne place
- [x] Réordonnancement des sections (glisser-déposer, flèches, suppression)
- [x] Aperçu responsive en direct (desktop, tablette, mobile), sans rechargement
- [x] Composition stockée dans l'URL (partageable)
- [x] Item de registre généré à la volée : `page.tsx` assemblé et tous les
      blocks en dépendances, installable avec une seule commande
      (`/r/compose/<blocks>.json`), aussi ouvrable dans v0
- [x] Suggestions de structure (navbar en premier, footer en dernier, doublons)
- [ ] Tester l'installation réelle une fois le site déployé (le CLI ne peut
      pas joindre `ui.balick.dev` avant le déploiement)

### D. Utilisation réelle

- [ ] Refaire `balick.me` avec le composeur
- [ ] Construire un ou deux autres sites
- [ ] Corriger tout ce qui a gêné pendant ces constructions

### E. Lancement

- [ ] Déploiement sur `ui.balick.dev` (DNS, Vercel, `NEXT_PUBLIC_BASE_URL`)
- [ ] Dépôt public et licence MIT
- [ ] Inscription dans l'annuaire shadcn (`@balick`), puis dépendances en
      `@balick/...` au lieu des URL complètes
- [ ] Page « Built with Balick UI »
- [ ] Liste d'attente Pro
- [ ] Annonce avec l'histoire de lancement

## Idées pour plus tard

- Badges de qualité mesurés sur chaque composant : poids gzip, score
  d'accessibilité, compatibilité Server Components, dépendances.
- Métadonnées pour les agents IA : consignes « quand l'utiliser / quand
  l'éviter », `llms.txt`.
- Thèmes supplémentaires (base de l'offre Pro).

## Décisions

| Date | Décision |
| --- | --- |
| 2026-09-25 | Domaine : `ui.balick.dev` (portfolio sur `balick.me`) |
| 2026-09-25 | Namespace du registre : `@balick` |
| 2026-09-25 | Site et code en anglais pour viser un public international |
| 2026-09-25 | Identité minimaliste et monochrome, inspirée de Vercel |
| 2026-09-25 | Gratuit et open source d'abord, offre Pro plus tard |
| 2026-09-25 | Le composeur est la fonctionnalité phare |
| 2026-09-25 | Pas d'attribution Claude dans les commits ni les pull requests |
| 2026-09-26 | Cœur du composeur gratuit ; fonctionnalités avancées réservées au Pro (voir tableau) |
