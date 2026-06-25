# 🔗 DEPENDENCY GRAPH: KRYPTON AI MODULES

Ce document définit les dépendances strictes entre les modules fonctionnels de Krypton AI, afin de garantir l'absence de régression.

## Hiérarchie des Dépendances OMEGA

```mermaid
graph TD
    %% Core Immutable Layer
    M00[Module 00: Identity Core & Doctrine]
    M01[Module 01: Sales Brain / State Machine]
    M04[Module 04: Memory Engine]

    %% AI & Processing Layer
    M02[Module 02: AI Gateway & Trust Layer]
    M03[Module 03: AI Router]
    M06[Module 06: Knowledge Engine]

    %% Input/Output Channels
    M07[Module 07: Voice Gateway]
    M08[Module 08: WhatsApp Engine]
    WebUI[Web UI / Dashboard]

    %% Escalation & Analytics
    M09[Module 09: Human Escalation]
    M10[Module 10: Revenue Intelligence]
    M11[Module 11: Sanctuary Experience Layer]

    %% Dependencies Rules
    M01 --> M00
    M01 --> M04
    M02 --> M01
    M03 --> M02

    M06 --> M01

    %% Inputs feeding the Gateway
    M07 --> M03
    M08 --> M03
    WebUI --> M03

    %% Output/Analytics
    M01 --> M09
    M01 --> M10
    M11 --> WebUI
```

## Règles d'Implémentation (Contrat d'Architecture)

1.  **Isolation des Canaux**: `M07 (Voice)`, `M08 (WhatsApp)`, et `WebUI` n'ont **aucune** connaissance métier. Ils collectent l'input et l'envoient aveuglément à `M03 (AI Router)`.
2.  **Centralité du Cerveau**: `M01 (Sales Brain)` est le seul module autorisé à modifier l'état d'une conversation (Discovery -> Qualification -> Closing).
3.  **Sanctuarisation de la Mémoire**: `M04 (Memory Engine)` est l'unique source de vérité. L'AI n'invente pas un contexte, elle le lit depuis M04.
4.  **Gateway Unique**: Toutes les requêtes vers les LLM (Gemini, etc.) passent **obligatoirement** par `M02 (AI Gateway)`.
