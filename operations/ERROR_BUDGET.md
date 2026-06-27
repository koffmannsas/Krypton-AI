# 📉 ERROR BUDGET

L'Error Budget est l'outil principal de gouvernance technique qui détermine si l'équipe d'ingénierie est autorisée à déployer de nouvelles fonctionnalités ou si elle doit se concentrer exclusivement sur la fiabilité (Reliability).

## 1. Calcul du Budget Mensuel
Basé sur le SLO de 99.9% de disponibilité :
*   **Budget d'Indisponibilité Toléré** : 43 minutes et 49 secondes par mois (soit 0.1% de 30 jours).

## 2. Règle d'Or (Code Freeze)
Si l'Error Budget est épuisé (c'est-à-dire si le système a été indisponible plus de 43 minutes ce mois-ci) :
*   **Gel des Déploiements (Code Freeze)** : Aucune nouvelle fonctionnalité (Feature) ne peut être déployée.
*   Seuls les **Hotfixes** et les tâches d'amélioration de l'infrastructure (Reliability) sont autorisés.

## 3. Dérogations
Seul le Chief AI Evolution Engineer, avec l'accord du CEO, peut forcer une release si l'Error Budget est épuisé, et uniquement si la release adresse une opportunité commerciale critique qui compense le risque de stabilité.
