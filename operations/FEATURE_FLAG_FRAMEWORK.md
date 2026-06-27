# 🎛️ FEATURE FLAG FRAMEWORK

Afin de découpler le déploiement du code (Release) du lancement d'une fonctionnalité (Launch), l'utilisation d'un système de Feature Flags (ex: LaunchDarkly, Firebase Remote Config) est standardisée.

## 1. Niveaux de Pilotage
1.  **Kill Switch (Global)** : Bouton d'urgence pour désactiver instantanément un composant défaillant (ex: `enable_voice_engine = false`) sans redéployer le code.
2.  **Beta Segment (Tenant-based)** : Activer une nouveauté (ex: `enable_whatsapp_integration`) uniquement pour un sous-ensemble de clients VIP ou d'early-adopters (ex: liste blanche de `tenantId`).
3.  **A/B Testing (User-based)** : Piloté par l'OMEGA MARKET LAB (Module 18) pour tester les évolutions de doctrine.

## 2. Cycle de Vie d'un Flag
*   **Création** : Documenté avec une date de retrait prévue.
*   **Nettoyage (Debt Reduction)** : Une fois qu'une feature est en `General Availability` (100% de la base utilisateur) depuis 30 jours, le Feature Flag doit être supprimé du code source pour éviter la prolifération de dettes conditionnelles (les `if (flag) else`).
