# 🎙️ RUNBOOK : VOICE FAILURE

**Incident** : Panne totale ou latence inacceptable (> 2000ms) du Voice Engine.

## 1. Symptômes
*   Alertes de timeout sur les connexions WebSocket/WebRTC.
*   Plaintes clients "Fiko ne parle plus" ou "Il y a un blanc de 5 secondes".

## 2. Diagnostic
1.  Vérifier l'état du fournisseur STT (Speech-to-Text).
2.  Vérifier l'état du fournisseur TTS (Text-to-Speech).
3.  Vérifier la charge CPU des serveurs gérant les WebSockets (Gateway Vocale).

## 3. Procédure (Mitigation)
1.  **Désactivation gracieuse** : Via Feature Flag, désactiver temporairement le bouton "Appel Vocal" sur tous les widgets web. Afficher un message : "Le canal vocal est en maintenance, veuillez utiliser le chat".
2.  **Redémarrage** : Si la fuite de mémoire ou la saturation est avérée sur la Gateway Vocale, procéder à un redémarrage en rolling-update des conteneurs.

## 4. Validation
*   Lancer un test synthétique d'appel vocal depuis l'environnement de staging ou de production.
*   S'assurer que la latence end-to-end redescend sous les 800ms.
