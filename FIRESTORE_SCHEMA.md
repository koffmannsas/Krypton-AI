# 🗄️ FIRESTORE SCHEMA: KRYPTON AI

Basé sur `firestore.rules` et l'architecture OMEGA.

## Collections Principales

### `users`
Données d'authentification et profil global.
*   `uid` (string): ID unique Firebase Auth.
*   `email` (string, max 256): Email de l'utilisateur.
*   `role` (string): `client`, `admin`, ou `super_admin`.

### `payments`
Historique des transactions.
*   `userId` (string): Référence vers `users`.
*   `amount` (number): Montant > 0.
*   `offer` (string, max 100): Nom de l'offre.
*   `method` (string): `wave`, `bank`, `cash`, `check`.
*   `status` (string): `succeeded`, `failed`, `pending`.

### `leads`
Prospects collectés.
*   `userId` (string, optionnel): Utilisateur propriétaire.
*   `email` (string, max 256).
*   `score` (number): 0 à 100 (Probabilité de conversion).

### `opportunities`
Gestion du pipeline commercial.
*   `userId` (string): Propriétaire.
*   `type` (string): `upgrade`, `activation_agents`, `conversion_optimization`.
*   `status` (string): `open`, `clicked`, `converted`, `closed`.
*   `value` (number): Valeur financière estimée.
*   `impact` (number): Score d'impact.

## Collections "Sentient OS" (Intelligence & Mémoire)

### `fikoMemory`
Mémoire contextuelle du visiteur/client.
*   `userId` (string).
*   `memoryLevel` (string).

### `fikoDecisions`
Recommandations générées par l'IA.
*   `userId` (string).
*   `type` (string): `micro_recommendation`, `strategic_alert`...
*   `priority` (string): `urgent`, `important`, `optimization`, `future`.
*   `confidence` (number).
*   `recommendation` (string).
*   `status` (string): `pending`, `actioned`, `dismissed`.

### `fikoAutonomousActions`
Actions prises par l'IA en arrière-plan.
*   `userId` (string).
*   `type` (string).
*   `status` (string): `prepared`, `executing`, `completed`, `dismissed`.

### `fikoStrategicModes`
Mode de fonctionnement global de Fiko pour un client donné.
*   `userId` (string).
*   `activeMode` (string): `expansion`, `conversion`, `authority`...
*   `modeLevel` (number).
*   `effectivenessScore` (number).
