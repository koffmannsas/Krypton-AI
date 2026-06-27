# 🚨 INCIDENT RESPONSE (RUNBOOK MASTER)

Ce document décrit la procédure globale de réponse à incident (Incident Command System) pour Krypton AI.

## 1. Classification de l'Incident (Severity)
*   **Sev-1 (Critique)** : Plateforme totalement indisponible. Perte de données avérée. Impact financier immédiat pour tous les clients. (Ex: Firestore Down, Gemini API Down).
*   **Sev-2 (Majeur)** : Un canal entier est en panne (Voice ou WhatsApp) mais les autres fonctionnent. Erreurs sur une proportion significative d'utilisateurs.
*   **Sev-3 (Mineur)** : Bugs visuels, lenteurs non bloquantes, dégradation légère du Dashboard.

## 2. Rôles lors d'un Sev-1 / Sev-2
*   **Incident Commander (IC)** : Pilote la résolution. Ne code pas. Gère la communication et prend les décisions de Rollback.
*   **Lead Responder** : Ingénieur en charge de l'investigation technique et de l'application du fix.
*   **Communication Lead** : Rédige les statuts pour la page `status.krypton-ia.tech` et prévient les clients majeurs.

## 3. Cycle de Vie de l'Incident
1.  **Détection** : Alerte automatisée (Datadog/Sentry) ou remontée client.
2.  **Triage** : Détermination de la gravité (Sev).
3.  **Containment** : Limitation des dégâts (ex: désactiver une feature flag, rollback immédiat).
4.  **Resolution** : Application du Hotfix.
5.  **Post-Mortem (Blameless)** : Documenter la racine du problème (Root Cause Analysis - RCA) et les actions préventives.
