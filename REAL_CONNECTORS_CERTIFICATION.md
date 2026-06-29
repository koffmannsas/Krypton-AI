# 🔌 REAL CONNECTORS CERTIFICATION

**Opération** : ARES™
**Statut** : PRE-PRODUCTION CANDIDATE (RC1)

## 1. Objectif
Le développement de l'architecture est **gelé**. L'objectif est la suppression totale des "mocks" (bouchons) utilisés pour le développement et la validation de l'intégration avec les API de production.

## 2. Statut des Connecteurs

| Composant | Statut d'Intégration | Action Requise avant le Pilotage |
| :--- | :--- | :--- |
| **Gemini GenAI API** | 🟢 CONNECTÉ | Migration finale de la clé Frontend vers Backend. |
| **Firestore & Rules** | 🟢 CONNECTÉ | - |
| **Firebase Auth** | 🟢 CONNECTÉ | - |
| **WhatsApp Business API**| 🟡 PARTIEL | Brancher la route `/api/webhook/whatsapp` sur l'App Meta en production. |
| **Voice Gateway (WebRTC)**| 🔴 MOCK | Implémenter le socket WebSocket natif avec le fournisseur STT/TTS. |
| **Pricing Catalog** | 🟢 CONNECTÉ | Package `@krypton/pricing` distribué à 100% de l'UI. |
| **Live Event Bus** | 🟢 CONNECTÉ | Implémenté via l'orchestrateur interne. |
| **Customer 360** | 🟢 CONNECTÉ | - |
| **Business Memory** | 🟢 CONNECTÉ | - |
| **CEO Copilot** | 🟢 CONNECTÉ | Alimenté par les données Event Bus. |

## 3. Plan d'Action "No-Mock"
Toute la logique métier doit utiliser des instances réelles. Les mocks comme les simulations de "Time Saved" dans le `ROIEngine` devront être branchés sur le timestamp réel du `ConversationCompleted` Event dans la version finale RC1.
