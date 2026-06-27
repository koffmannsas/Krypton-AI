# 🎯 SERVICE LEVEL OBJECTIVES (SLO)

Définition des cibles opérationnelles internes pour garantir l'industrialisation de Krypton AI.

## 1. Disponibilité (Availability)
*   **Web Dashboard & Landing** : 99.9% d'uptime.
*   **AI Gateway (Text)** : 99.9% de succès (Code 200).
*   **AI Gateway (Voice)** : 99.5% de succès.
*   **WhatsApp Webhook** : 99.9% de succès de traitement sous 3s.

## 2. Latence (Latency)
*   **Chargement Web (TTI)** : < 2000 ms au 95ème percentile (p95).
*   **Réponse IA (Texte)** : < 1500 ms (p95).
*   **Réponse IA (Voix)** : < 800 ms (p90).
*   **Mémoire (Firestore Read)** : < 100 ms (p99).

## 3. Qualité (Quality)
*   **Fiko Quality Index (FQI)** : > 85/100 en moyenne mobile sur 7 jours.
*   **Régression de Doctrine** : 0 (Vérifié par la CI).
