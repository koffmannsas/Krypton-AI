# ⏪ ROLLBACK PLAN

Ce document décrit les procédures de retour arrière automatiques ou manuelles en cas d'incident de production majeur suite à un déploiement.

## 1. Rollback Frontend & API Stateless (Instant)

*   **Déclencheur** : Chute de la disponibilité sous 99.9% ou augmentation des erreurs 5xx de plus de 5% dans les 15 minutes suivant une Release.
*   **Action Automatisée** : Le CI/CD (ex: Vercel) re-pointe le domaine principal vers le commit précédent (Instant Rollback).
*   **Temps de restauration cible** : < 2 minutes.

## 2. Rollback Firestore (Database)

*   **Déclencheur** : Corruption de données détectée, ou règles de sécurité (firestore.rules) déployées de manière erronée (bloquant les requêtes légitimes).
*   **Action (Rules)** : `firebase deploy --only firestore:rules` depuis le commit précédent.
*   **Action (Données)** : Firestore ne supporte pas de "rollback instantané" des données de manière native. Nous appliquons la doctrine du **Roll Forward** (script de correction des données corrompues) ou la restauration ponctuelle (PITR - Point-in-Time Recovery) fournie par Google Cloud si l'incident est catastrophique.

## 3. Critères "Go / No-Go" de Rollback

Un rollback manuel doit être déclenché immédiatement si :
*   Le canal vocal tombe (Latence > 2000ms).
*   L'intégration WhatsApp ne répond plus aux webhooks (Timeout).
*   Les calculs de Pricing remontent des valeurs erronées (0 FCFA).
