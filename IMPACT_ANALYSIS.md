# 💥 IMPACT ANALYSIS: KRYPTON AI (TEMPLATE & PROTOCOL)

## Protocole "Zéro Régression"

Avant **chaque** modification (Pull Request), ce document doit être instancié ou une version abrégée doit être incluse dans la description de la PR.

### 1. Description de la Modification
*(Que changeons-nous et pourquoi ? Référence vers une Architecture Decision Record - ADR si applicable).*

### 2. Modules Impactés (Checklist)
*   [ ] Module 00 : Identity Core (Le prompt change-t-il ?)
*   [ ] Module 01 : Sales Brain (La machine d'état change-t-elle ?)
*   [ ] Module 02 : Trust Engine
*   [ ] Module 03 : AI Router
*   [ ] Module 04 : Memory Engine (Le schéma de base change-t-il ?)
*   [ ] Module 10 : Revenue Intelligence (Les stats seront-elles faussées ?)

### 3. Analyse des Risques et Effets Secondaires
*   **Risque Identité**: Fiko risque-t-il de perdre son ton "Closer" ?
*   **Risque Mémoire**: Les anciennes sessions seront-elles illisibles ?
*   **Risque Latence**: Ajoute-t-on un appel bloquant avant la réponse vocale/texte ?

### 4. Stratégie de Compatibilité Ascendante
*   Comment les anciens utilisateurs / anciennes données seront gérés ?
*   Faut-il un script de migration Firestore ?

### 5. Plan de Rollback
*   Quelle est la procédure exacte si une erreur fatale survient en production ? (ex: Revert de commit + restauration du backup journalier Firestore).
