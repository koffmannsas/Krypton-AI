# 🔥 HOTFIX POLICY

Règles pour le déploiement d'un correctif d'urgence (Sev 1 / Sev 2) contournant le Release Process standard.

## 1. Définition d'un Hotfix
Un Hotfix n'est autorisé **que** pour :
*   Faille de sécurité critique (Exposition de données tierces).
*   Panne totale d'un canal (Web, Voix, WhatsApp).
*   Régression majeure sur la doctrine Fiko causant un préjudice financier immédiat (ex: Fiko accepte des rabais de 90%).

## 2. Procédure Exceptionnelle
1.  **Création de branche** : `hotfix/nom-du-bug` créée directement depuis `main`.
2.  **Code & Test** : Le fix doit être le plus minimaliste possible. Aucun refactoring n'est autorisé dans un Hotfix.
3.  **Approbation** : Nécessite l'approbation verbale/synchrone du Chief Reliability Engineer.
4.  **Déploiement** : Contournement du Staging autorisé. Déploiement direct en production avec surveillance accrue.
5.  **Post-Mortem** : Obligatoire sous 48h après la résolution.
