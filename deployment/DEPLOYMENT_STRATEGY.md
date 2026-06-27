# 🚀 DEPLOYMENT STRATEGY: KRYPTON AI (OPÉRATION ATLAS)

Ce document définit la stratégie de déploiement de Krypton AI, visant le Zéro Downtime et la sécurité absolue de l'infrastructure en production.

## 1. Stratégie Blue / Green (Web & API)

Le déploiement classique (écrasement de la production) est interdit.

*   **Blue Environment** : L'environnement de production actuel (actif).
*   **Green Environment** : Le nouvel environnement, où la nouvelle version est déployée.
*   **Routing** : Le trafic est basculé (switch) via le load balancer (Vercel ou Cloudflare) du Blue vers le Green uniquement après que les "Smoke Tests" aient réussi sur le Green.
*   **Objectif** : Zéro coupure de service. Retour instantané au Blue en cas d'erreur post-bascule.

## 2. Déploiement Canary (AI Gateway & Sales Brain)

Pour toute modification touchant à l'Intelligence Artificielle (Module 01, 03, 07), la stratégie Blue/Green est remplacée par un **Canary Release**.

*   Phase 1 : 5% du trafic global est routé vers la nouvelle version de l'AI Gateway.
*   Phase 2 : Analyse des métriques (Erreurs 500, Latence LLM, Fiko Quality Index) pendant 2 heures.
*   Phase 3 : Si les SLI (Service Level Indicators) sont stables, basculement progressif (20%, 50%, 100%).
*   **Objectif** : Contenir l'impact d'une régression IA (ex: hallucination, erreur de prompt) à une infime minorité de prospects.
