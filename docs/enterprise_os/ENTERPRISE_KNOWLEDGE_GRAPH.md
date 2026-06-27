# 🕸️ ENTERPRISE KNOWLEDGE GRAPH™

**Opération**: ORCHESTRA™
**Objectif**: La source de vérité relationnelle de Krypton AI.

## 1. La Nécessité d'un Graphe
Dans un Enterprise OS, les tables SQL ou les documents NoSQL isolés ne suffisent plus. Il faut comprendre la relation entre une conversation, un paiement, et un incident serveur.

## 2. Noeuds (Entities) et Arêtes (Relationships)

Le Knowledge Graph relie :

*   `(Lead) -[HAS_CONVERSATION]-> (Conversation)`
*   `(Conversation) -[RAISED_OBJECTION]-> (ObjectionPricing)`
*   `(Conversation) -[GENERATED]-> (Opportunity)`
*   `(Opportunity) -[CLOSED_BY]-> (Fiko_Version_2)`
*   `(Opportunity) -[RESULTED_IN]-> (Payment)`
*   `(Payment) -[PURCHASED]-> (Product_Scale)`
*   `(Product_Scale) -[BELONGS_TO]-> (Pricing_Catalog_V3)`
*   `(Incident_Voice) -[IMPACTED]-> (Conversation)`

## 3. Architecture Technique (Hybride)
*   **Stockage Primaire** : Firestore reste la base de données transactionnelle (OLTP).
*   **Graph Engine** : Les événements métiers sont streamés (via Eventarc/PubSub) vers un moteur de graphe ou un data warehouse (BigQuery) optimisé pour les jointures massives, permettant à l'**Executive AI Board** de poser des questions complexes (ex: "Quelles conversations ont échoué hier à cause d'une latence vocale supérieure à 1s sur l'offre Starter ?").
