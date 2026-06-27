# 🔄 ENTERPRISE WORKFLOW ENGINE™

**Opération**: ORCHESTRA™
**Objectif**: Moteur de workflows unifiés de KCG.

## 1. Philosophie
Chaque interaction dans Krypton AI n'est plus isolée. Elle fait partie d'un workflow d'entreprise global, auditable, reprenable et mesurable.

## 2. Le Workflow Critique (Core Pipeline)

Le système force et trace le cycle de vie suivant (State Machine étendue) :

```plaintext
[Acquisition]  -> 1. Lead (Contact initial WhatsApp/Web)
[Qualification]-> 2. Qualification (Fiko extrait Besoin/Budget/Urgence)
[Conversion]   -> 3. Rendez-vous (Ou démonstration immédiate)
[Négociation]  -> 4. Offre (Fiko propose un plan via Pricing Catalog)
[Gouvernance]  -> 5. Validation (Si contrat sur-mesure > Human Escalation)
[Transaction]  -> 6. Signature / Paiement (Wave, Stripe)
[Delivery]     -> 7. Onboarding (Configuration IA client)
[Retention]    -> 8. Support (Fiko SAV)
[Expansion]    -> 9. Upsell / Renouvellement (Fiko proactif)
[Loyalty]      -> 10. Programme Ambassadeur
```

## 3. Propriétés d'un Workflow
*   **Traçable** : Chaque transition génère un événement dans Firestore (`workflowEvents`) avec le `correlationId`.
*   **Reprenable** : Si un prospect abandonne à l'étape 4, le système le relance (Module Cloud Functions) exactement à l'étape 4 trois jours plus tard.
*   **Mesurable** : Le temps passé entre chaque nœud est chronométré pour identifier les goulots d'étranglement de l'entreprise.
*   **Versionné** : Si KCG modifie le workflow (ex: ajout d'une étape KYC), l'ancienne version reste intacte pour les leads en cours.
