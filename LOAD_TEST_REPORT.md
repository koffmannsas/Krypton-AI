# ⚖️ LOAD TEST REPORT

**Opération** : ARES™

## 1. Métriques de Référence (Load)
Objectif : Garantir les SLAs sous charge nominale prévue en production.

| Scénario de Charge | Composant | Latence P95 Attendue | Statut Actuel |
| :--- | :--- | :--- | :--- |
| **100 Utilisateurs C/C** | Express Server | < 100ms | 🟡 À valider (K6 / Artillery) |
| **1000 Conversations/h** | Gemini GenAI | < 1500ms | 🟡 À valider (Rate limits Google) |
| **5000 Events/min** | Live Event Bus | < 50ms | 🟡 À valider |

## 2. Infrastructure
La charge doit être testée sur l'infrastructure réelle (ex: Google Cloud Run + Firebase) avec le véritable dataset de préproduction.
