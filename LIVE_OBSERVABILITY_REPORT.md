# 🔭 LIVE OBSERVABILITY REPORT

**Opération** : ARES™

## 1. Intégration de la Télémétrie
L'observabilité théorique passe en mode "Live".
Toutes les applications (Frontend Vite, Backend Express, Cloud Functions) envoient désormais leurs métriques structurées vers l'outil de monitoring principal (Datadog / Google Cloud Monitoring).

## 2. Dashboards Requis en Production
Les vues suivantes doivent être implémentées et fonctionnelles avant le lancement pilote :
*   **Errors Dashboard** : Suivi des codes HTTP 4xx et 5xx.
*   **Latency Dashboard** : P90/P95 pour UI, Voice, et Gemini.
*   **Business Events Dashboard** : Visualisation du `LiveEventBus` (Nombre de `LeadCreated` vs `OpportunityWon`).
*   **Customer Success Dashboard** : Suivi de la métrique composite `FQI`.
