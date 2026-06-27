# 💬 RUNBOOK : WHATSAPP FAILURE

**Incident** : Les webhooks WhatsApp échouent ou les messages ne sont pas délivrés.

## 1. Symptômes
*   Les clients signalent que Fiko ne répond pas sur WhatsApp.
*   Erreurs de timeout ou 401 sur la route `/api/webhook/whatsapp`.

## 2. Diagnostic
*   Vérifier le statut de l'API Meta Graph.
*   Vérifier que le token d'accès permanent n'a pas expiré ou été révoqué.

## 3. Procédure
*   Si le token est invalide, régénérer le token depuis le dashboard Meta et le mettre à jour dans le Secret Manager.
*   Si le webhook timeout en raison d'une charge IA, isoler le trafic WhatsApp vers un pool de workers dédié.
