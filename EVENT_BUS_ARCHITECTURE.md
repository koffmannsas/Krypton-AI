# 🚌 EVENT BUS ARCHITECTURE

**Opération** : NEXUS™
**Date** : 2024-06-28

## 1. Objectif
Remplacer les intégrations point-à-point spaghetti par un bus d'événements centralisé. Chaque moteur publie ce qu'il fait, et s'abonne à ce dont il a besoin. Cela permet une intégration totale sans couplage fort.

## 2. Typologie des Événements
*   **Business Events** : `LeadCreated`, `OpportunityWon`, `SubscriptionCancelled`.
*   **Customer Events** : `MessageReceived`, `ObjectionRaised`, `GoalUpdated`.
*   **Commercial Events** : `PricingCatalogUpdated`, `PlaybookExecuted`.
*   **Decision Events** : `ExperimentPromoted`, `GovernanceAlertTriggered`.

## 3. Flux Exemple (NEXUS)
1. Fiko clôture une vente.
2. `SalesBrain` publie `OpportunityWon`.
3. `ROIEngine` est abonné : calcule le gain financier.
4. `BusinessMemory` est abonné : enregistre la victoire pour le client.
5. `CustomerSuccess` est abonné : programme le onboarding.
