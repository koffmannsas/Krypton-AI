# 🔌 API CONTRACTS: KRYPTON AI

Définition des interfaces d'API publiques et internes (Gateway).

## 1. AI Gateway (Target Architecture)

Toutes les requêtes vers les modèles IA **doivent** passer par cette API interne pour sécuriser les clés et appliquer la "Commercial Doctrine".

### `POST /api/brain/chat`
*   **Description**: Point d'entrée unique pour les requêtes textuelles vers Fiko.
*   **Auth**: Nécessite un JWT Firebase ou un Session Token valide.
*   **Request Body**:
    ```json
    {
      "sessionId": "string",
      "message": "string",
      "channel": "web" | "dashboard"
    }
    ```
*   **Response**:
    ```json
    {
      "reply": "string",
      "stateTransition": "qualification" | "analysis" | null,
      "suggestedActions": ["array of strings"]
    }
    ```

## 2. Webhooks (External Integrations)

### `POST /api/webhook/whatsapp`
*   **Description**: Réception des messages via Meta Graph API.
*   **Validation**: Vérification du Hub Signature (Meta).
*   **Format**: Défini par la documentation WhatsApp Business Cloud.

### `POST /api/data-deletion`
*   **Description**: Exigence RGPD / Meta pour la suppression des données utilisateur.
*   **Response**:
    ```json
    {
      "url": "https://www.krypton-ia.tech/data-deletion",
      "confirmation_code": "string"
    }
    ```

## 3. Santé & Monitoring

### `GET /health`
*   **Description**: Vérifie la disponibilité de l'Express Server.
*   **Response**: `200 OK`
    ```json
    {
      "status": "OK",
      "backend": "active"
    }
    ```
