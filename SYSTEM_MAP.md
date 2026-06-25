# 🗺️ SYSTEM MAP: KRYPTON AI ARCHITECTURE

Ce document fournit la cartographie de haut niveau du système Krypton AI.

## 1. Topologie des Applications (Interfaces)

Le projet utilise une approche Monorepo avec plusieurs interfaces distinctes pour interagir avec l'écosystème Fiko.

*   **Public Landing (`apps/landing`)**:
    *   *Rôle*: Acquisition, Vitrine, Pricing.
    *   *Techno*: Next.js / React.
*   **Client Workspace (`apps/client`)**:
    *   *Rôle*: Espace connecté utilisateur, CRM, Gestion des agents.
    *   *Techno*: Next.js / React.
*   **Admin Dashboard (`apps/admin`)**:
    *   *Rôle*: Monitoring global, statistiques globales (Super Admin).
    *   *Techno*: Next.js / React.
*   **Legacy SPA (`frontend/`)**:
    *   *Rôle*: Base monolithique Vite.js en cours de transition / supportant certains écrans (Routes.config).
    *   *Techno*: Vite / React.

## 2. Couche Serveur & Cloud (Backend)

*   **Express Gateway (`backend/src/server.ts`)**:
    *   *Rôle*: Centralise les webhooks (ex: WhatsApp), gère l'AI Gateway serveur.
    *   *Dépendances*: `express`, `firebase-admin`, `@google/genai`.
*   **Firebase Cloud Functions (`functions/src/`)**:
    *   *Rôle*: Moteurs asynchrones et tâches planifiées (Cron).
    *   *Composants clés*: `relanceEngine.ts` (Follow-up auto).

## 3. Topologie Firebase / Infrastructures

*   **Firestore**:
    *   Base de données primaire, structurée autour des utilisateurs, leads, opportunités, et la mémoire de l'IA.
    *   Sécurisée strictement par `firestore.rules`.
*   **Firebase Auth**:
    *   Fournisseur d'identité unique pour l'Admin, les Clients et la liaison des données.
*   **Firebase Hosting**:
    *   Déploiement des applications front-end.
*   **Secret Manager (Implicit)**:
    *   Gestion des `.env` (Gemini API, Firebase config).

## 4. Couche Intelligence Artificielle (AI Layer)

*   **Fiko Core**: Moteur de LLM (actuellement Gemini 1.5 Flash/Pro).
*   **Client-side Wrapper**: `components/FikoAIEngine.ts` (Doit être migré côté backend).
*   **Data Processors**: `utils/VisitorMemory.ts`, `services/opportunityEngine.ts`.
