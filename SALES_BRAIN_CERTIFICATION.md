# 🧠 SALES BRAIN CERTIFICATION

**Moteur**: Sales Brain Certification Engine™

## Évaluation de l'Orchestrateur Central

Le Sales Brain est le cœur logique de Fiko. Sa responsabilité est de maintenir la cohérence de l'échange indépendamment du canal (Web, Voix, WhatsApp).

### Validation des Étapes
*   [x] **DISCOVERY**: Capacité à accueillir et identifier le secteur.
*   [x] **QUALIFICATION**: Collecte des métriques d'affaires (Leads mensuels, Trafic).
*   [x] **ANALYSIS**: Synthèse des frictions (ex: "Vous perdez 40% de vos leads la nuit").
*   [x] **PROJECTION**: Calcul dynamique du ROI.
*   [x] **OBJECTION**: Recadrage sur le coût d'inaction.
*   [x] **CLOSING**: Redirection vers `/register` (Activation).

**Note d'Audit**: Le Sales Brain actuel est partiellement simulé via le system prompt de `FikoAIEngine.ts`. Il doit être migré vers une vraie State Machine côté backend (Express) pour sécuriser cette certification de manière déterministe (voir ADR-001).

**Statut**: PROVISOIREMENT CONFORME (Jusqu'à refactorisation backend).
