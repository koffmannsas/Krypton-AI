# 🗄️ DATA GOVERNANCE

Ce document définit les politiques de gestion du cycle de vie des données, garantissant la conformité (ex: RGPD) et l'optimisation des coûts de stockage.

## 1. Cycle de Vie des Conversations
*   **Actif** : Stockées en "chaud" (Firestore) pendant 30 jours pour le `Memory Engine`.
*   **Archivage** : Après 30 jours, export automatique vers le stockage froid (Google Cloud Storage) pour analyse par le `Pattern Intelligence Engine`.
*   **Suppression/Anonymisation** : Au-delà de 24 mois, ou à la demande du prospect (via API webhook de suppression), les logs doivent être soit supprimés, soit purgés de toute PII (Personal Identifiable Information - Noms, Emails, Téléphones).

## 2. Données Audio (Voice Engine)
*   **Rétention** : Les flux audios (fichiers ou buffers) de la Gateway vocale ne sont conservés que le temps strict du traitement (STT) et sont purgés immédiatement de la RAM.
*   *Exception* : Un échantillon de 1% peut être stocké (avec l'accord explicite du client) pendant 7 jours pour l'analyse QA et le debugging.

## 3. Journaux d'Audit (Audit Trails)
*   Toute validation humaine dans le `Continuous Intelligence Loop` (Module 15) est journalisée et conservée pendant 5 ans à des fins de conformité légale et d'historique de doctrine.
