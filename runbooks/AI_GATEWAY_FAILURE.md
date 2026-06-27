# 🧠 RUNBOOK : AI GATEWAY FAILURE

**Incident** : Fiko ne répond plus, ou répond avec des erreurs 500 récurrentes. (Sev-1 / Sev-2)

## 1. Symptômes
*   Le composant UI affiche "Fiko réfléchit..." à l'infini.
*   Spike d'erreurs HTTP 429 (Too Many Requests) ou 503 (Service Unavailable) sur la route `/api/brain/chat`.

## 2. Diagnostic
1.  Vérifier les logs Express : Identifier l'erreur exacte renvoyée par `@google/genai` (ex: `RESOURCE_EXHAUSTED`, `API_KEY_INVALID`).
2.  Vérifier le solde/crédit du compte Google Cloud associé à la clé API.

## 3. Procédure (Failover)
1.  **Si Quota Dépassé** : Basculer (via variable d'environnement ou feature flag) sur la clé API de secours (Fallback Key) ou sur un modèle alternatif moins coûteux/moins contraint configuré dans le `AI Router`.
2.  **Si Panne Fournisseur (Google)** : Activer le "Circuit Breaker" via Feature Flag. L'UI doit cesser de faire des requêtes et afficher un message clair : "Notre intelligence centrale est en cours de maintenance par notre fournisseur (Google). Reprise estimée sous peu."

## 4. Validation
*   Effectuer une requête de test textuelle basique ("Bonjour") et s'assurer d'une réponse < 1.5s.
