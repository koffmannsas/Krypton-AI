# 📦 RELEASE PROCESS

Le processus strict pour faire passer une évolution de Krypton AI du code au marché.

## Phase 1 : Continuous Integration (CI)
*   **Trigger** : Pull Request ouverte.
*   **Checks obligatoires** :
    1. Linter & Typescript (Zéro warning toléré).
    2. Tests unitaires (Sales Brain, Mémoire, Pricing).
    3. Architecture Guard (Vérification des dépendances interdites).

## Phase 2 : KCG Certification
*   **Trigger** : Validation de la PR par au moins un Senior Engineer.
*   **Checks** : Le framework `CERBERUS` s'assure de l'absence de régression sur la doctrine commerciale.

## Phase 3 : Staging & Market Lab
*   **Environnement** : Déploiement sur `staging.krypton-ia.tech`.
*   **Test Manuel** : QA sur les flux critiques (Création compte, Paiement, Conversation WhatsApp).

## Phase 4 : Production & Post-Release
*   **Déploiement** : Stratégie Blue/Green ou Canary (selon le module).
*   **Monitoring** : Surveillance active de l'Error Budget pendant 24h.
*   **Notification** : Génération automatique du Changelog.
