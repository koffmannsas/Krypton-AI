# 🛣️ END-TO-END BUSINESS JOURNEYS CERTIFICATION

**Opération** : ARES™

## 1. Définition du Parcours Critique
Le système n'est plus testé par modules, mais par "Journey". Un test end-to-end automatisé (E2E) valide chaque transition de la séquence suivante :

1.  **Visiteur** atterrit sur `krypton-ia.tech`.
2.  **Lead** : L'utilisateur interagit avec le widget Chat ou envoie un WhatsApp.
3.  **Conversation** : Le `Sales Brain` prend le relais.
4.  **Qualification** : Extraction du triptyque (Besoin/Budget/Urgence).
5.  **Offre** : Recommandation de l'offre (ex: *TERRA*) via le `Pricing Catalog`.
6.  **Paiement** : Simulation via Wave/Stripe (Status = `Succeeded`).
7.  **Activation** : Le tenant est provisionné.
8.  **Onboarding** : Le `EnterpriseOnboardingEngine` s'exécute (< 15 mins).
9.  **Customer Success** : Le `CustomerSuccessCopilot` génère un Health Score.

## 2. Statut des Tests E2E
*   **Implémentation requise** : Une suite de tests d'intégration (ex: Playwright ou Cypress) qui injecte des mocks d'interactions client dans l'Event Bus et vérifie que la base de données (Firestore) atteint l'état final de manière déterministe.
