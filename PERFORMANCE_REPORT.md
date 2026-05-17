# Performance Report

## Résumé

La principale optimisation appliquée est le découpage du bundle initial. Avant cette passe, la route initiale embarquait Framer Motion, la page Découvertes et Supabase. Après refactor, le shell principal charge seulement ce qui est nécessaire à l’expérience courante.

## Mesures build

### Avant optimisation

Dernier build avant cette passe :

- CSS principal : `27.82 kB`, gzip `6.20 kB`
- JS principal : `757.51 kB`, gzip `223.67 kB`
- Warning Vite : chunk supérieur à `500 kB`

### Après optimisation

Build après refactor :

- CSS principal : `28.27 kB`, gzip `6.29 kB`
- JS shell principal : `207.60 kB`, gzip `53.62 kB`
- Chunk Supabase dynamique : `369.00 kB`, gzip `111.21 kB`
- Chunk Découvertes : `182.76 kB`, gzip `60.77 kB`
- Warning Vite > `500 kB` : supprimé

## Optimisations appliquées

- `DiscoveriesPage` est maintenant chargée avec `React.lazy` et `Suspense`.
- `@supabase/supabase-js` est maintenant chargé dynamiquement via `getSupabase()`.
- Les animations de listes dans `App.tsx` utilisent des classes CSS au lieu de Framer Motion.
- Framer Motion reste confiné à la page Découvertes, chargée seulement à la navigation vers `/discoveries`.

## Impact utilisateur attendu

- Chargement initial plus rapide, surtout sur mobile.
- Moins de JavaScript à parser avant le premier écran.
- La navigation vers Découvertes peut charger un chunk dédié, avec fallback léger.
- La synchronisation Supabase continue de fonctionner, mais son code n’est plus dans le chemin critique initial.

## Warnings restants

Aucun warning de chunk Vite après optimisation.

## Limites

- Pas de mesure Lighthouse réelle sur Android/iOS dans cette passe.
- Pas de profil React DevTools sur appareil réel.
- Les données PWA sont précachées, donc le total précaché reste proche de `798 kB`, mais il est mieux découpé pour l’exécution initiale.

