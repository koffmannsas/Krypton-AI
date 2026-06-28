# ⚛️ REACT MIGRATION AUDIT REPORT

**Opération** : TITANIUM™
**Date** : 2024-06-25

## 1. Objectif
Garantir la séparation stricte entre la couche de présentation (React) et la valeur métier (Pricing). Aucun composant UI ne doit connaître les prix ou les devises de Krypton AI.

## 2. Poids de la Migration
*   **Composants scannés** : 98 fichiers TSX/TS.
*   **Cibles d'Audit** : Chaînes de caractères monétaires (FCFA, €, $, CFA).
*   **Résultat de l'Audit Actuel** :
    *   `AccessOfferPage.tsx` (Ligne 268) : `Activer ACCESS – 200 000 FCFA`
    *   `VoicePricingPage.tsx` (Ligne 34) : `price: "700 000 FCFA / an"`
    *   `VoicePricingPage.tsx` (Ligne 52) : `price: "1 900 000 FCFA / an"`
    *   `VoicePricingPage.tsx` (Ligne 71) : `price: "3 900 000 FCFA / an"`
    *   *(Note: SmartPricing.tsx et FikoPayCenter.tsx ont déjà une dette technique sur les prix en dur identifiée lors des précédentes revues, qui doit être refactorisée).*

## 3. Plan de Remédiation
Tous les composants doivent être enveloppés dans le `<PricingProvider>` et consommer le hook `usePricingContext()`. Les valeurs statiques `price: "X FCFA"` doivent devenir `price: format(client.getVoicePricing().standardAnnual)`.
