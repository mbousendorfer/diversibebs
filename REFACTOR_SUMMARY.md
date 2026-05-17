# Refactor Summary

## Ce qui a été changé

- Lazy-load de `DiscoveriesPage` avec `React.lazy` et `Suspense`.
- Ajout d’un fallback `PageLoading`.
- Chargement dynamique du client Supabase avec `getSupabase()`.
- Remplacement des animations Framer Motion du shell principal par des animations CSS (`stagger-list`, `stagger-list-item`).
- Conservation de Framer Motion uniquement dans la page Découvertes.

## Pourquoi

- Réduire le coût de chargement initial.
- Supprimer le warning de chunk Vite supérieur à `500 kB`.
- Garder l’app mobile-first rapide sans changer le produit.
- Éviter de charger Supabase avant une vraie opération réseau.
- Garder les animations de liste appréciées par l’utilisateur, mais avec moins de JavaScript dans le shell.

## Fichiers impactés

- `src/App.tsx`
- `src/index.css`
- `src/lib/supabase.ts`
- `src/lib/storage.ts`
- `QA_REPORT.md`
- `PERFORMANCE_REPORT.md`
- `REFACTOR_SUMMARY.md`

## Améliorations obtenues

- JS initial réduit de `757.51 kB` à `207.60 kB`.
- Gzip initial réduit de `223.67 kB` à `53.62 kB`.
- Suppression du warning de gros chunk au build.
- Responsabilité réseau Supabase mieux isolée.
- Animation des listes maintenue sans dépendance Framer dans le shell.

## Risques éventuels

- Le client Supabase est chargé au premier appel réseau ; une première synchronisation peut payer ce coût à ce moment-là.
- La page Découvertes charge maintenant un chunk à la demande.
- `App.tsx` reste gros et mérite une extraction progressive, mais cette passe évite une réécriture risquée.

## Ce qui reste à faire

- Ajouter un script `lint`.
- Ajouter des tests unitaires légers sur `food-utils`, `gamification` et `storage`.
- Extraire les pages principales depuis `App.tsx`.
- Faire une validation Lighthouse sur vrai mobile ou simulateur.

