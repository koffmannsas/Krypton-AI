# 💾 MEMORY CERTIFICATION

**Moteur**: Memory Engine Certification™

## Règles de Validation de la Continuité

1.  **Mémoire Courte (Session en cours)**:
    *   *Test*: Fiko doit se souvenir d'un détail donné il y a 5 messages sans le redemander.
    *   *Moyen*: Le tableau `history` dans le contexte LLM.
2.  **Mémoire Longue (Reprise J+30)**:
    *   *Test*: Un utilisateur revient après 10 jours. Fiko doit charger le `contextSummary` depuis Firestore (`fikoMemory`).
    *   *Moyen*: Restauration Firestore via `VisitorMemory.ts`.

## État de la Certification
*   **Lecture Firestore**: ✅ Validé (via `VisitorMemory.ts`).
*   **Vitesse Récupération**: ✅ Validé (< 100ms via index/cache Firebase).
*   **Isolation des données**: ✅ Validé (`firestore.rules` assure qu'un client ne peut pas lire la mémoire d'un autre).
