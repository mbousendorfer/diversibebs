# QA Report

## Résumé exécutif

L’application est fonctionnelle, cohérente avec une PWA mobile-first et compatible GitHub Pages. La base de données métier est centralisée dans `src/data/foods.ts`, la persistance locale est versionnée, et la synchronisation Supabase reste optionnelle côté runtime.

Les points principaux relevés pendant l’audit étaient :

- le bundle initial était trop lourd pour une app personnelle simple ;
- `src/App.tsx` concentre encore beaucoup de responsabilités ;
- le client Supabase et la page Découvertes étaient chargés dès le démarrage ;
- les animations de listes forçaient Framer Motion dans le shell principal ;
- il n’existe pas encore de script `lint` ou `test`.

Les corrections appliquées ciblent le coût initial réel utilisateur sans changer le produit : lazy-load de la page Découvertes, chargement dynamique de Supabase, et remplacement des animations de listes du shell par une animation CSS légère.

## Problèmes bloquants

Aucun problème bloquant détecté après corrections.

## Problèmes importants

- `src/App.tsx` reste très volumineux. Il contient le routing, plusieurs pages, des composants de cartes, le panneau de test, le thème et une partie du comportement PWA.
- Les tests automatisés sont absents. Les fonctions métier critiques sont testables, mais aucun runner n’est configuré.
- Le lint n’est pas configuré, donc la qualité statique dépend uniquement de TypeScript et du build.
- Les opérations Supabase sont optimistes : en cas d’erreur réseau après une mutation locale, l’état local reste modifié. C’est acceptable pour une app local-first, mais il faut surveiller les erreurs de sync.

## Problèmes mineurs

- Quelques composants partagent encore des patterns proches autour de l’ouverture du panneau de test.
- La page Découvertes utilise encore Framer Motion. C’est acceptable depuis le lazy-load, mais cela reste un coût de chunk sur cette route.
- La confirmation de suppression est volontairement simple en deux taps, pas un Dialog. C’est plus léger, mais moins explicite qu’une modale.

## Opportunités de simplification

- Extraire progressivement `FoodsPage`, `WeekPage`, `HistoryPage`, `SettingsPage` et `FoodTestDrawer` hors de `App.tsx`.
- Créer un hook `useFoodTestSheet(food, test?)` si d’autres surfaces continuent d’ouvrir le même panneau.
- Centraliser les libellés UI réutilisés si l’app grossit.

## Opportunités de performance

- Virtualiser la liste des aliments uniquement si le catalogue dépasse largement sa taille actuelle ou si les appareils cibles restent lents.
- Découper Supabase et Découvertes a déjà supprimé le warning de chunk > 500 kB.
- Garder Framer Motion isolé à la page Découvertes, ou le remplacer plus tard par CSS si cette page doit devenir plus légère.

## Plan d’action priorisé

1. Fait : réduire le bundle initial en lazy-loadant Découvertes.
2. Fait : sortir Supabase du chunk initial via import dynamique.
3. Fait : remplacer Framer Motion dans le shell principal par une animation CSS légère.
4. À faire : extraire les pages principales de `App.tsx`.
5. À faire : ajouter un setup de tests léger pour les helpers métier.
6. À faire : ajouter ESLint si le projet doit être maintenu sur la durée.

## QA fonctionnelle effectuée

- Catalogue chargé.
- Recherche alimentaire testée avec `abricot`.
- Ouverture d’une card aliment.
- Ajout/modification d’une note.
- Vérification de la note dans le journal.
- Refresh puis vérification de la persistance locale.
- Page Semaine chargée.
- Vérification que les cards d’aliments n’affichent plus de bouton visuel `Tester`.
- Page Découvertes chargée après lazy-load.
- Page Réglages chargée.

