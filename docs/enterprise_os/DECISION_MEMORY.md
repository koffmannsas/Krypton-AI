# 🧠 DECISION MEMORY™

**Opération**: ORCHESTRA™
**Objectif**: Historiser l'intuition et la stratégie de l'entreprise.

## 1. La Carence des Systèmes Classiques
Un système classique stocke les données, mais pas *pourquoi* une donnée a changé. Si le prix passe de 10k à 8k FCFA, le système le sait, mais dans 6 mois, personne ne saura *pourquoi* cette décision a été prise, ni ce qu'elle a rapporté.

## 2. Le Registre des Décisions
Le Decision Memory est l'extension fonctionnelle des ADR (Architecture Decision Records) appliquées au business. Chaque modification stratégique devient un nœud dans l'Enterprise Knowledge Graph.

## 3. Structure d'une Mémorisation

Quand le CEO valide une recommandation via l'Executive Command Center, une entrée est générée et verrouillée :

*   **Décision ID** : `DEC-2024-06-25-001`
*   **Contexte** : "Baisse du taux de conversion sur le segment BTP." (Source: Module 13).
*   **Action** : "Modification de la doctrine Fiko pour utiliser l'argument ROI 6 mois."
*   **Auteur** : J. Koffmann (CEO).
*   **ADR Technique Associée** : `ADR-0024`.
*   **Snapshot Avant** : (Lien vers les KPI à T-1).

## 4. Rétrospective Automatisée (Leçons Apprises)
90 jours après la décision, l'Executive AI Board évalue automatiquement les résultats (Snapshot Après vs Snapshot Avant) et qualifie la décision : `Succès`, `Neutre`, `Échec`.
Fiko (via l'Intelligence Loop) utilise cette mémoire pour ne jamais proposer deux fois une stratégie qui a échoué dans un contexte similaire.
