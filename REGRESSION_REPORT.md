# 🛡️ REGRESSION REPORT: BASELINE KRYPTON AI

Ce document fixe la ligne de base (baseline) des fonctionnalités critiques qui ne doivent **jamais** cesser de fonctionner.

## 1. Fonctionnalités Sanctuarisées

### 1.1. Base de Données (Firestore)
*   Les règles `firestore.rules` doivent continuer à empêcher toute écriture non autorisée, particulièrement sur les collections `fikoDecisions` et `opportunities`.
*   Les utilisateurs existants doivent pouvoir se connecter sans perte d'historique.

### 1.2. Identity Core (Fiko)
*   **Test de conformité**: Si on demande "Qui es-tu ?" à Fiko, il doit toujours répondre qu'il est une intelligence de closing et orienter vers la conversion. S'il répond "Je suis un assistant développé par Google", c'est une **régression critique (Identity Breach)**.

### 1.3. Application & UI
*   Les redirections stratégiques (Smart CTAs) définies dans le contrat d'architecture doivent toujours pointer vers `/register` (nouveaux) ou `/dashboard` (connectés).
*   La Landing Page doit compiler sans erreur (Vite/Next).

## 2. Procédure de Certification de PR

Toute modification touchant le code devra valider ces points manuellement ou automatiquement (via CI/CD) avant fusion:

1.  [ ] `npm run build` passe sur toutes les apps (`landing`, `client`, `admin`, monolith).
2.  [ ] Firestore Rules déployées et testées.
3.  [ ] Le routage IA (FikoAIEngine) est fonctionnel.
4.  [ ] Le Dashboard affiche les revenus (Pas de régression sur le Revenue Intelligence).
