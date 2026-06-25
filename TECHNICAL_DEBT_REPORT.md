# 📉 TECHNICAL DEBT REPORT: KRYPTON AI

Ce document identifie les zones de dette technique et les écarts par rapport à l'architecture cible (OMEGA V1).

## 1. Fragmentation de l'Architecture (Frontend vs Monorepo)
*   **Constat**: Le projet semble être dans un état de transition entre un monolithe Vite (`frontend/`) et un monorepo Turborepo/Next.js (`apps/landing`, `apps/client`).
*   **Impact**: Duplication potentielle du code, complexité de build, et difficulté à appliquer une règle de routage unique.
*   **Résolution**: Unifier la codebase autour de l'architecture `apps/` et `packages/`, et déprécier progressivement le dossier `frontend/` hérité.

## 2. Fuite de Logique Métier (Le "Cerveau" dans l'UI)
*   **Constat**: Le prompt central de Fiko et sa logique d'appel (`FikoAIEngine.ts`) sont situés dans les dossiers UI (`components/`).
*   **Impact**: Si demain Fiko est appelé via WhatsApp, l'UI React n'est pas disponible. Le "Cerveau" ne sera pas partagé.
*   **Résolution**: Extraire `FikoAIEngine.ts` vers un package partagé (`packages/fiko/`) ou exclusivement dans le Backend (`backend/src/services/`).

## 3. Absence de Typage Partagé
*   **Constat**: Bien que TypeScript soit utilisé, il y a des fichiers `types.ts` dispersés (`frontend/src/types.ts`, `src/types/index.ts`).
*   **Impact**: Risque de divergence des contrats d'interface (API Contracts) entre le front et le back.
*   **Résolution**: Centraliser les types dans un package (ex: `packages/types/` ou au sein de `packages/fiko/`).
