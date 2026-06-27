# 🔭 OBSERVABILITY V2

Ce document définit la stratégie d'observabilité complète de Krypton AI, permettant de tracer n'importe quelle anomalie.

## 1. Tracabilité Universelle (Correlation ID)
Toute interaction avec Fiko (clic sur le widget, réception webhook WhatsApp, appel entrant) génère immédiatement un `x-krypton-correlation-id`.
Cet ID doit être :
*   Injecté dans les headers HTTP.
*   Attaché à la session Firestore.
*   Loggé dans l'AI Gateway.
*   Passé aux Cloud Functions asynchrones.

## 2. Structure des Logs (JSON format)
```json
{
  "timestamp": "2024-06-25T14:32:00Z",
  "level": "INFO",
  "correlationId": "uuid-1234",
  "tenantId": "client-5678",
  "service": "ai-router",
  "action": "model_dispatch",
  "model": "gemini-1.5-flash",
  "latencyMs": 1240,
  "status": "success"
}
```

## 3. Centralisation
Tous les logs de Vercel (Front/API), Firebase Functions, et Google Cloud Run doivent être ingérés dans un puits de logs centralisé (ex: Datadog, Grafana Loki, ou Google Cloud Logging) permettant des requêtes transversales par `correlationId`.
