# 🧠 MODULE 12: CONVERSATION INTELLIGENCE ENGINE

## 1. Mission Principale
Le Conversation Intelligence Engine est le premier maillon de la "Continuous Intelligence Loop". Son rôle est d'ingérer toutes les interactions brutes (voix, texte) et d'en extraire des métadonnées sémantiques structurées, sans perturber la latence de la réponse initiale de Fiko.

## 2. Responsabilités
*   **Analyse des Intentions** : Classifier l'intention principale de chaque message (Question Prix, Demande de Réassurance, Objection, Intérêt Marqué).
*   **Détection d'Objections** : Extraire et catégoriser les objections spécifiques (Prix trop élevé, Pas le bon moment, Concurrent moins cher).
*   **Analyse des Émotions** : Évaluer le sentiment du prospect (Frustré, Neutre, Enthousiaste).
*   **Tracking des Étapes (State Machine)** : Enregistrer précisément combien de temps (ou de messages) a été passé dans chaque état (Discovery, Qualification, Analysis...).
*   **Attribution de Conversion** : Lier la conversation au résultat final (Achat, Abandon, Rendez-vous).

## 3. Architecture et Flux
L'analyse s'effectue de manière **asynchrone** (Post-processing) pour garantir la performance.

1.  La Gateway IA ou le Webhook enregistre un événement `ConversationLog` brut dans Firestore.
2.  Une Cloud Function ou un Worker dédié se déclenche.
3.  Un modèle spécialisé (potentiellement plus petit et moins coûteux que le modèle principal de Fiko) analyse le log.
4.  Les métadonnées structurées sont sauvegardées dans une collection `Analytics`.
