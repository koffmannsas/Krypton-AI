# 🗄️ RUNBOOK : FIRESTORE FAILURE

**Incident** : Erreurs d'écriture/lecture massives, ou Firestore est inaccessible. (Sev-1)

## 1. Symptômes
*   Plus personne ne peut se connecter (Session non créée).
*   Fiko n'a plus de mémoire (Réponses amnésiques).
*   Le dashboard affiche des erreurs 500.

## 2. Diagnostic
1.  Consulter le [Google Cloud Status Dashboard](https://status.cloud.google.com/) pour vérifier une panne régionale de Firebase/Firestore.
2.  Vérifier les quotas de lecture/écriture Firebase dans la console. (Avons-nous dépassé la limite gratuite/payante ?).
3.  Vérifier le dernier déploiement de `firestore.rules` (Un dev a-t-il bloqué les lectures ?).

## 3. Procédure
*   **Si Panne Google** : Déclencher le mode "Read-Only Dégradé" si possible (mise en cache PWA), publier un statut d'incident majeur. Rien ne peut être fait côté code.
*   **Si Quota** : Augmenter immédiatement la limite de facturation sur Google Cloud Console.
*   **Si Rules corrompues** : Exécuter `firebase deploy --only firestore:rules` avec une version certifiée précédente issue du dépôt Git.

## 4. Validation
*   Écrire un document test dans la collection `/health`.
*   Lire le document.
