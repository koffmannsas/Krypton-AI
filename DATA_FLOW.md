# 🔄 DATA FLOW: KRYPTON AI

Ce document décrit le parcours de la donnée depuis l'utilisateur jusqu'aux modèles IA et aux bases de données.

## 1. Flux Conversationnel Standard (Text / Web)

1.  **User Input**: Le visiteur tape un message sur le composant Web (ex: `AIChatOverlay.tsx`).
2.  **Context Assembly**: Le Frontend récupère le contexte local de l'utilisateur (via `utils/VisitorMemory.ts`) et l'historique de session.
3.  *(État actuel - À MIGRE)* **Direct AI Call**: Le frontend appelle l'API Gemini (`components/FikoAIEngine.ts`).
4.  *(État cible)* **API Gateway Request**: Le frontend envoie le message + sessionID à l'Express Server (`/api/chat`).
5.  *(État cible)* **Sales Brain Processing**: Le backend charge la mémoire complète (Firestore), injecte la `Commercial Doctrine`, valide l'état, et route la requête vers l'AI Gateway.
6.  **LLM Execution**: Le modèle (Gemini Flash) génère la réponse.
7.  **Memory Update**: Le backend met à jour Firestore (nouvelle intention, score, etc.).
8.  **Response Delivery**: L'UI affiche la réponse.

## 2. Flux Webhook (WhatsApp - Asynchrone)

1.  **User Message**: L'utilisateur envoie un message WhatsApp.
2.  **Webhook Trigger**: Meta/WhatsApp tape la route `/api/webhook/whatsapp` (`backend/src/server.ts`).
3.  **Identity Resolution**: Le backend cherche l'utilisateur via son numéro de téléphone dans Firestore.
4.  **Sales Brain**: Mêmes étapes que le flux web (chargement mémoire, doctrine, LLM).
5.  **WhatsApp Response**: Le backend répond via l'API WhatsApp.

## 3. Flux Télémétrie & Business (Revenue Intelligence)

1.  **Event Generation**: Actions utilisateur (création compte, choix de plan, conversion).
2.  **Firestore Write**: `services/opportunityEngine.ts` ou Firebase Auth met à jour la base.
3.  **Dashboard Read**: L'Admin Dashboard (`pages/dashboard/AdminDashboardPage.tsx`) s'abonne aux snapshots Firestore pour afficher les KPI en temps réel.
