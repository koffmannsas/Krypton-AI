# 🏢 MULTI-TENANT GOVERNANCE

Pour devenir un SaaS Enterprise, l'isolation stricte des données entre les clients (Tenants) est une obligation absolue.

## 1. Isolation de la Donnée (Firestore)
*   Aucune requête frontend ne doit pouvoir lire la base sans inclure `request.auth.uid`.
*   Toutes les collections métier (`leads`, `opportunities`, `fikoMemory`, `analytics`) doivent posséder une clé `tenantId` (qui correspond à l'ID de l'entreprise cliente).
*   **Audit** : `firestore.rules` doit être testé automatiquement à chaque PR pour vérifier l'impossibilité des accès cross-tenant.

## 2. Isolation de l'Intelligence (RAG / Memory)
*   Le `Sales Brain` et le contexte LLM ne doivent **jamais** charger de la donnée appartenant à un autre tenant.
*   Si le Tenant A entraîne Fiko avec son catalogue PDF de voitures, le Tenant B ne doit jamais entendre Fiko parler de ces modèles.
*   **Mécanisme** : Le vector store (si utilisé) doit partitionner ses namespaces par `tenantId`.

## 3. Isolation du Pricing
*   Les surcoûts d'API LLM (Gemini) générés par le Tenant A ne doivent impacter que l'Error Budget et les quotas du Tenant A. Une entreprise sous attaque DDoS ou surchargeant son bot vocal ne doit pas faire tomber la Gateway globale.
