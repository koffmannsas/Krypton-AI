# 🚀 EVOLUTION ROADMAP: KRYPTON AI (OPÉRATION SANCTUARY)

Cette roadmap dicte les prochaines étapes de développement. La règle absolue est la **Non-Régression**.

## Protocole Décisionnel Obligatoire (ADR)
Toute évolution listée ci-dessous **doit** faire l'objet d'un *Architecture Decision Record (ADR)* avant implémentation, validant le "Pourquoi", les "Alternatives", et les "Conséquences".

## Phase 1 : Consolidation (Immédiat)
1.  **Centralisation Backend (ADR-001)**: Déplacer la logique `FikoAIEngine.ts` (Prompt + Gemini API) de l'UI React vers le backend Express (`/api/brain/chat`).
2.  **Sécurisation API**: Masquer `NEXT_PUBLIC_GEMINI_API_KEY` en `GEMINI_API_KEY` (Secret Manager).
3.  **State Machine Backend**: Coder le "Sales Brain" (Discovery -> Qualification -> ...) dans le backend pour qu'il soit indépendant du canal (Web ou WhatsApp).

## Phase 2 : WhatsApp & Omnicanalité
1.  **WhatsApp Engine (Module 08)**: Finaliser la route `/api/webhook/whatsapp` pour brancher le "Sales Brain" (centralisé en Phase 1) sur WhatsApp.
2.  **Memory Sync**: Garantir qu'une conversation commencée sur WhatsApp puisse se poursuivre sur le Widget Web grâce au `Memory Engine`.

## Phase 3 : Intelligence Vocale (Verrouillée)
*   *Prérequis*: Phase 1 & 2 terminées et validées sans régression.
1.  **Fiko Realtime Voice Gateway (Module 07)**: Implémentation du streaming duplex.

## 4. Mesure du Succès
Le succès des développements ne se mesure **pas** au nombre de features, mais à :
*   Taux de qualification (via Firestore `leads`).
*   Volume de transactions (`payments`).
*   Stabilité (0 erreur d'API sur la Gateway).
