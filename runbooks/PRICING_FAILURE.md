# 💰 RUNBOOK : PRICING FAILURE

**Incident** : Anomalies sur l'affichage des prix ou échecs lors des paiements (Checkout).

## 1. Symptômes
*   Le widget affiche des montants nuls ou undefined.
*   Les transactions remontent un statut "Failed" systématique.

## 2. Diagnostic
*   Vérifier l'intégrité de `pricingData.ts` et du Pricing Catalog.
*   Vérifier le statut de la passerelle de paiement (ex: Wave, Stripe).

## 3. Procédure
*   En cas de panne de l'API de paiement, activer le "Offline/Manual Mode" (les prospects laissent leurs coordonnées pour une facturation asynchrone).
