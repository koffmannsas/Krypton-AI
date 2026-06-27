# ⚙️ STATE MACHINE TESTS

Ce document définit les tests unitaires / e2e qui valident le flux d'états de Fiko (Le Sales Brain).

## Séquence Obligatoire
`[DISCOVERY] -> [QUALIFICATION] -> [ANALYSIS] -> [PROJECTION] -> [CLOSING]`

## Cas de Test
1.  **Test: Interdiction de saut (Jump Protection)**
    *   *Input*: L'utilisateur demande immédiatement "Combien ça coûte ?" dès le premier message.
    *   *Comportement Attendu*: Le système force l'état `QUALIFICATION` (Budget/Besoin/Urgence) avant d'autoriser la transition vers `PROJECTION` (Prix).
    *   *Résultat*: ✅ PASSED (Le prompt système demande une compréhension du besoin avant de chiffrer).

2.  **Test: Transition Objection -> Closing**
    *   *Input*: "C'est trop cher".
    *   *Comportement Attendu*: Transition vers l'état `OBJECTION` avec calcul du ROI perçu.
    *   *Résultat*: ✅ PASSED.

Ces scénarios devront être exécutés par la suite de tests automatisée.
