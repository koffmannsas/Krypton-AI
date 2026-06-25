# 📈 SCALABILITY REPORT: KRYPTON AI

Évaluation de la capacité du système à supporter la charge.

## 1. Cloud & Database (Firebase)
*   **Capacité**: Firestore est conçu pour une mise à l'échelle automatique et massive. Tant que les règles de requêtage (indexation) sont respectées, la base de données ne sera pas le goulot d'étranglement.
*   **Limitation**: Le nombre d'écritures concurrentes sur un même document (ex: un compteur global) est limité à 1/seconde. Le modèle actuel par utilisateur (`userId`) évite ce problème.

## 2. Intelligence Artificielle (API LLM)
*   **Capacité**: Dépendante des quotas Google GenAI.
*   **Limitation**: L'erreur "RESOURCE_EXHAUSTED" (429) est déjà prévue dans le code (fallback).
*   **Solution**: Mettre en place un système de Retry avec Backoff Exponentiel dans l'AI Gateway, et envisager un fallback vers un autre fournisseur (ex: Groq) via le `AI Router` si le fournisseur principal sature.

## 3. Serverless vs Long-running (Express)
*   **Architecture**: L'utilisation d'Express (`backend/`) hébergé potentiellement sur un conteneur (Docker) vs Cloud Functions.
*   **Recommandation**: Pour les Webhooks WhatsApp et l'AI Gateway, une infrastructure conteneurisée auto-scalable (ex: Google Cloud Run) est préférable aux Cloud Functions à cause du risque de "Cold Start" qui briserait l'exigence de latence (< 1.5s).
