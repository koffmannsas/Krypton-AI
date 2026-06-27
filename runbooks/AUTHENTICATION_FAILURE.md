# 🔐 RUNBOOK : AUTHENTICATION FAILURE

**Incident** : Impossible de se connecter ou de s'inscrire.

## 1. Symptômes
*   Erreurs 401/403 systématiques sur l'UI (Client Dashboard / Admin).
*   Échec de la validation des JWT.

## 2. Diagnostic
*   Vérifier le statut de Firebase Auth.
*   Vérifier la validité des clés de service Firebase (Service Account) sur le backend.

## 3. Procédure
*   Rotation des clés Firebase si compromission suspectée.
*   Envoi d'un message global aux utilisateurs (Bandeau de maintenance).
