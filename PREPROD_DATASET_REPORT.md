# 🗃️ PREPRODUCTION DATASET REPORT

**Opération** : ARES™

## 1. Objectif du Dataset
Pour valider l'Executive War Room, le Market Lab, et l'Autonomous KPI Engine, une base de données vide est inutile. Un script de "Seeding" doit générer un historique réaliste sur 6 mois pour simuler l'activité.

## 2. Spécification du Dataset (Volume Cible)
*   **Entreprises (Tenants)** : 50 (Profilées avec `TenantOrchestrator`).
*   **Secteurs** : 20 (Alimentant le `SectorHub` avec BTP, Restauration, Santé...).
*   **Prospects (Leads)** : 500.
*   **Conversations** : 1 000 (Générées via le `LiveEventBus`).
*   **Devis (Opportunities)** : 100.
*   **Transactions (Payments)** : 100 transactions simulées réussies.

## 3. Qualité des Données
Le script de seeding doit générer des données imparfaites pour tester le `Customer Success Copilot` :
*   10% des tenants doivent avoir un Health Score très bas (Risque de Churn) pour vérifier les alertes de l'Executive War Room.
*   20% des conversations doivent échouer à l'étape "Prix" pour alimenter le `Pattern Intelligence Engine`.
