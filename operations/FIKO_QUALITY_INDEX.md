# 🌟 FIKO QUALITY INDEX (FQI)

Le FQI est une métrique composite unique (0 à 100) permettant au CEO et aux ingénieurs d'évaluer la santé globale du produit d'un seul coup d'œil.

## Formule de Pondération (Exemple Actuel)

Le FQI est calculé dynamiquement toutes les heures :

1.  **Stabilité (20%)** : (Uptime réel / Uptime cible 99.9%) * 20
2.  **Performance (20%)** : (Taux de requêtes sous 1500ms) * 20
3.  **Cohérence & Gouvernance (20%)** : Pénalité si le Confidence Engine remonte des suggestions erratiques. (Base 20).
4.  **Conversion (20%)** : (Taux de qualification actuel / Taux historique moyen) * 20.
5.  **Satisfaction (20%)** : Basé sur le taux d'abandon inexpliqué dans la State Machine et l'analyse de sentiment (Module 12).

## Interprétation
*   **90 - 100** : Système sain. Déploiement de nouveautés autorisé.
*   **70 - 89** : Zone d'alerte. Les nouvelles features doivent être mises en pause (Code Freeze partiel). Focalisation sur l'amélioration des métriques sous-performantes.
*   **< 70** : Crise. Incident de niveau Sev-1/Sev-2 en cours.
