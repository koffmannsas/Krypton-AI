# ADR 0002: Intelligence Governance & OMEGA MARKET LAB

**Date** : 2024-06-25
**Statut** : Accepté

## Contexte
La "Continuous Intelligence Loop" (Modules 12-16) a été conçue pour proposer des évolutions de doctrine commerciale au CEO (Human validation). Cependant, appliquer globalement une suggestion de l'IA (même validée par un humain) à l'ensemble du flux de production présente un risque systémique. Le Learning Engine risque de "sur-apprendre" sur un faible volume de données ou de suggérer des changements fragiles.

## Problème
Comment garantir qu'une évolution de la doctrine commerciale proposée par Fiko est réellement performante avant de la généraliser, sans introduire de régression (baisse de conversion) sur l'ensemble de la plateforme ?

## Décision
1.  **Création du Layer 4 (Intelligence Governance)** : Un garde-fou au-dessus de l'Intelligence Loop. Chaque recommandation générée par le système doit obligatoirement inclure un score de confiance (basé sur le volume de données analysées) et une estimation du risque. Le CEO ne valide jamais une intuition isolée.
2.  **Création de l'OMEGA MARKET LAB (Module 18 - Business Experiment Engine)** : Aucune modification de doctrine n'est appliquée massivement d'un coup. Le système d'A/B testing est intégré nativement. Une suggestion validée est d'abord routée vers 10% du flux de prospects (Expérience B), tandis que 90% reste sur la doctrine stable (Expérience A).

## Conséquences
*   **Positives** : Transforme Krypton AI en une plateforme d'amélioration continue basée sur des *preuves statistiques réelles*, et non sur des opinions ou des hallucinations de l'IA. Sécurité absolue contre la dérive du système.
*   **Risques/Négatives** : Complexité accrue dans le `Sales Brain` (Module 01) et le `Router` (Module 03) qui devront gérer simultanément plusieurs versions de la doctrine.

## Stratégie de Migration
*   Mise à jour du `AI Router` pour supporter un flag `experiment_cohort` (ex: `A` ou `B`) lors du dispatching des requêtes LLM.

## Historique
*   2024-06-25 : Document créé et validé pour l'initiative OMEGA MARKET LAB.
