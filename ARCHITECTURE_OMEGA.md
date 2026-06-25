# Fiko Sentient Business Operating System
## Spécification Technique de l'Architecture OMEGA V1 — [ARCHITECTURAL CONTRACT: FROZEN / FIGÉ]

Ce document fige officiellement l'architecture globale, la hiérarchie des modules, les contrats d'interface, la topologie des bases de données et la feuille de route stratégique de **Fiko Connect & Fiko Sentient OS**. Tout développement ultérieur doit respecter scrupuleusement ces spécifications.

---

## 1. Topologie Réseau & Sous-domaines
* **Landing Page Marketing (Porte d'entrée)** : `https://krypton-ia.tech/fiko-connect`
* **Application SaaS Production** : `https://connect.krypton-ia.tech`
* **Sous-domaine Central Unifié (Évolution Cible)** : `https://app.krypton-ia.tech`
  * `/connect` : Gestion de la connectivité et automatisation de la messagerie.
  * `/crm` : CRM intelligent et pipeline de conversion.
  * `/pay` : Moteur de facturation et liens de paiement.
  * `/brain` : Centre de connaissances et personnalisation de l'IA.
  * `/network` : Interconnexion multicanal.

---

## 2. Contrats d'Interfaces & Redirections
### Redirections CTA "Activation & Création"
* **Boutons** : *"Activer Fiko"*, *"Commencer"*, *"Créer mon IA"*, *"Essayer Gratuitement"*, *"Démarrer"*, *"Créer mon compte"*
* **URL Cible** : `https://connect.krypton-ia.tech/register` (avec auto-sélection de plan via paramètre d'URL `?plan=`).

### Redirections CTA "Authentification"
* **Boutons** : *"Connexion"*, *"Se connecter"*, *"Accéder à mon espace"*
* **URL Cible** : `https://connect.krypton-ia.tech/login`

### Redirections Smart CTA "Accès Espace"
* **Boutons** : *"Voir le Dashboard"*, *"Accéder à Fiko"*, *"🚀 Ouvrir Fiko"* (Bouton flottant)
* **Logique de routage** :
  * Si l'utilisateur possède une session Firebase Auth valide → Redirection vers `https://connect.krypton-ia.tech/dashboard`
  * Sinon → Redirection vers `https://connect.krypton-ia.tech/login`

### Gestion des Plans Pricing
Chaque sélection transmet automatiquement l'attribut de plan au formulaire d'inscription :
* `Starter` → `/register?plan=starter`
* `Business` → `/register?plan=business`
* `Scale` → `/register?plan=scale`
* `Elite` → `/register?plan=elite`

---

## 3. Cartographie des Services & Flux OMEGA V1

```text
       +-------------------------------------------------------------+
       |               Fiko Realtime Voice Gateway                   |
       |  (Streaming duplex vocal bidirectionnel < 600ms de latence) |
       +-------------------------------------------------------------+
                                      |
                                      v
       +-------------------------------------------------------------+
       |                       Fiko Channels                         |
       |             [Voice] [WhatsApp] [Web] [Dashboard]            |
       +-------------------------------------------------------------+
                                      |
                                      v
       +-------------------------------------------------------------+
       |             Module 01 : Sales Brain                         |
       |               (CENTRAL ORCHESTRATOR)                        |
       +-------------------------------------------------------------+
                                      |
         +----------------------------+----------------------------+
         |                            |                            |
         v                            v                            v
+------------------+         +------------------+         +------------------+
|    Module 00     |         |    Module 02     |         |    Module 03     |
|  Fiko Identity   |         |    AI Gateway    |         |    AI Router     |
|       Core       |         |                  |         |                  |
+------------------+         +------------------+         +------------------+
         |                            |                            |
         +----------------------------+----------------------------+
                                      |
                                      v
         +----------------------------+----------------------------+
         |                            |                            |
         v                            v                            v
+------------------+         +------------------+         +------------------+
|    Module 04     |         |    Module 05     |         |    Module 06     |
|  Memory Engine   |         |   Relationship   |         |    Knowledge     |
|                  |         |      Engine      |         |   Engine (OHADA) |
+------------------+         +------------------+         +------------------+
         |                            |                            |
         +----------------------------+----------------------------+
                                      |
                                      v
         +----------------------------+----------------------------+
         |                            |                            |
         v                            v                            v
+------------------+         +------------------+         +------------------+
|    Module 07     |         |    Module 08     |         |    Module 09     |
|   Voice Human    |         | WhatsApp Engine  |         | Human Escalation |
|     Engine       |         |                  |         |      Engine      |
+------------------+         +------------------+         +------------------+
                                      |
                                      v
         +----------------------------+----------------------------+
         |                                                         |
         v                                                         v
+------------------------------------+               +------------------------------------+
|             Module 10              |               |             Module 11              |
|    Revenue Intelligence Engine     |               |    Sanctuary Experience Layer     |
+------------------------------------+               +------------------------------------+
```

---

## 4. Spécifications Détaillées des 12 Modules

### Module 00 : Fiko Identity Core & Commercial Doctrine
* **Mission** : Ancrer de manière immuable la personnalité, l'identité commerciale et la méthode de vente de Fiko pour éviter toute fragmentation ou dérive comportementale.
* **Composants d'Identité** :
  * *Personnalité* : Conseiller chaleureux, professionnel, ultra-compétent, profondément aligné sur le contexte d'affaires africain francophone.
  * *Ton et Style de communication* : Direct, orienté résultats, rassurant, poli mais persuasif, sans fioritures technologiques ni jargon superflu.
  * *Valeurs de marque* : Transparence, ambition entrepreneuriale, fiabilité absolue, rigueur opérationnelle.
  * *Mémoire Globale d'Identité* : Contexte d'origine de Fiko en tant qu'ambassadeur de Krypton AI.
* **Fiko Commercial Doctrine (La Méthodologie Commerciale)** :
  * *Comment Fiko vend* : Fiko n'explique pas ses fonctionnalités techniques, il vend des résultats et de l'optimisation de chiffre d'affaires. Chaque interaction doit mener à l'étape suivante de la relation commerciale.
  * *Comment Fiko qualifie* : Extraction systématique et obligatoire du triptyque Budget/Besoin/Urgence lors de la phase de qualification.
  * *Comment Fiko négocie* : Jamais de rabais direct. Fiko valorise la valeur générée et le ROI plutôt que de baisser ses prix. Il propose un plan adapté au volume d'affaires.
  * *Comment Fiko traite les objections* : Recours systématique à l'empathie, puis recentrage sur le coût d'inaction (combien d'argent le prospect perd chaque jour sans Fiko).
  * *Limites d'intervention* : Fiko s'interdit de donner des conseils juridiques fermes ou de s'engager sur des conditions hors standard sans validation humaine.
  * *Critères de transfert humain* : Déclenchement automatique dès qu'un prospect exprime un besoin d'accord sur-mesure, de contrat grand compte (> 500k CFA/mois) ou d'intégration technique complexe spécifique.

### Module 01 : Sales Brain (Central Orchestrator & State Machine)
* **Mission** : Agir comme le cerveau logique, commercial et conversationnel central. Tous les canaux de communication (Vocal, WhatsApp, Web, Application) sont des clients passifs transmettant les flux d'interactions au Sales Brain.
* **Fiko Conversation State Machine (La Machine d'États Conversationnelle)** :
  Le Sales Brain orchestre rigoureusement le cycle de vie de l'échange via une transition d'états ordonnée et immuable. Le modèle ne peut jamais sauter d'étape sans validation de l'état précédent :
  ```text
  [DISCOVERY] ──> [QUALIFICATION] ──> [ANALYSIS] ──> [PROJECTION]
                                                            │
  [FOLLOW-UP] <──  [ACTIVATION]  <──  [CLOSING]  <─── [OBJECTION]
  ```
  1. **DISCOVERY (Découverte)** : Accueil chaleureux et écoute active de l'activité du prospect.
  2. **QUALIFICATION (Qualification)** : Collecte structurée des canaux de vente, volume mensuel de prospects, budget et urgence.
  3. **ANALYSIS (Analyse)** : Diagnostic des points de friction actuels (ex. prospects perdus la nuit, lenteur de réponse).
  4. **PROJECTION (Projection ROI)** : Présentation chiffrée et concrète des gains de conversion (calcul de ROI simulé personnalisé).
  5. **OBJECTION (Traitement des Objections)** : Phase de réponse ciblée et structurée aux doutes ou questions du prospect.
  6. **CLOSING (Fermeture)** : Incitation directe et persuasive à l'action (activation d'essai gratuit ou prise de rendez-vous).
  7. **ACTIVATION (Activation)** : Accompagnement pas-à-pas de l'utilisateur vers sa première configuration.
  8. **FOLLOW-UP (Suivi)** : Suivi post-interaction et relances automatiques contextuelles basées sur l'historique d'échange.

### Module 02 : AI Gateway & Trust Layer (Trust Engine)
* **Mission (AI Gateway)** : Interface d'abstraction unifiée pour sécuriser et normaliser les requêtes vers l'ensemble des architectures de grands modèles linguistiques (Gemini, etc.). Gestion intelligente du débit, masquage de clés API (toujours côté serveur), et journalisation sécurisée des temps de réponse.
* **Mission (Trust Engine / Trust Layer)** : Injecter dynamiquement la confiance au bon moment du parcours.
  * *Composants de Confiance* : Références clients réels de Krypton AI, études de cas sectorielles africaines, témoignages audio/texte de vendeurs de confiance, et statistiques de conversion vérifiées.
  * *Injection contextuelle* : Le Trust Engine surveille l'état de la conversation (notamment en phase d'Analyse, de Projection et d'Objection) et insère de manière organique et fluide des preuves d'autorité (ex: "C'est exactement ce que nous avons fait pour la boutique de Fatou à Abidjan, qui a doublé ses ventes de prêt-à-porter en 3 semaines").

### Module 03 : AI Router
* **Mission** : Routage dynamique des requêtes selon la nature de la tâche pour optimiser la latence, la pertinence, et les coûts.
* **Algorithme de routage** :
  * *Conversations temps réel / Vocal* → Modèles ultra-rapides à faible latence (ex. Gemini Flash).
  * *Raisonnement complexe / Qualification / Calculs ROI* → Modèles avancés (ex. Gemini Pro).
  * *Analyse documentaire OHADA / Législation fiscale* → Modèles spécialisés en analyse dense de texte.

### Module 04 : Memory Engine (Fiko Business Memory)
* **Mission** : Structuration persistante du profil utilisateur et historique d'interactions.
* **Topologie Firestore** :
  ```json
  {
    "users": {
      "uid": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "phone": "string",
      "role": "string",
      "selectedPlan": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "sessions": {
      "sessionId": "string",
      "uid": "string",
      "history": "array",
      "contextSummary": "string",
      "objectionsRaised": "array",
      "score": "number"
    }
  }
  ```

### Module 05 : Relationship Engine
* **Mission** : Ajustement comportemental personnalisé en analysant le style décisionnel du prospect, sa vitesse d'exécution, son niveau d'expertise commerciale et ses canaux d'acquisition favoris.

### Module 06 : Knowledge Engine (Africa Knowledge Engine)
* **Mission** : Base de connaissances localisée intégrant les règles de l'OHADA, la fiscalité de l'Afrique de l'Ouest et Centrale (Côte d'Ivoire, Sénégal, Bénin, Cameroun, etc.) et les meilleures pratiques du e-commerce et commerce traditionnel en Afrique.

### Module 07 : Voice Human Engine (Fiko Realtime Voice Gateway)
* **Mission** : Gateway vocale temps réel s'appuyant sur des protocoles bidirectionnels fluides.
* **Spécifications** : Latence inférieure à 600ms, gestion avancée de l'interruption vocale de l'utilisateur par détection d'activité vocale (VAD) et synthèse d'intonation naturelle.

### Module 08 : WhatsApp Engine
* **Mission** : Canal d'intégration et d'automatisation de premier plan via l'API officielle WhatsApp Business Cloud.

### Module 09 : Human Escalation Engine
* **Mission** : Détection des seuils de négociation complexes, des demandes de contrats haut de gamme ou des requêtes juridiques spécifiques pour transférer instantanément la discussion avec l'historique complet vers l'équipe commerciale humaine de Krypton AI.

### Module 10 : Revenue Intelligence Engine
* **Mission** : Mesure et optimisation systématiques des indicateurs de performance business au cœur de chaque transaction.
* **Indicateurs mesurés** :
  * Coût d'Acquisition Client (CAC)
  * Revenu Récurrent Mensuel et Annuel (MRR / ARR)
  * Valeur Vie Client (LTV)
  * Retour sur Investissement Prospect (Simulation de ROI apporté par Fiko)
  * Taux de conversion de leads et d'Upsell / Cross-sell.

### Module 11 : Sanctuary Experience Layer
* **Mission** : Design d'interface haut de gamme inspiré des leaders du SaaS mondial (Stripe, Notion, Linear, Apple) privilégiant l'immédiateté, la sobriété, et l'efficacité décisionnelle.

---

## 5. Gestion Strict des Clés & Secrets de Production
* **Aucune clé ou identifiant en clair** : Toutes les configurations de sécurité et informations sensibles sont exclues du document d'architecture centrale. Elles doivent être configurées uniquement au travers de variables d'environnement sécurisées ou d'un gestionnaire de secrets de production (Secret Manager).

---

## 6. Prochaine Priorité Tactique : MISSION OMEGA-001
La première phase d'implémentation opérationnelle se concentrera exclusivement sur l'ancrage logique et structurel de Fiko avant tout ajout de canal interactif :

1. **Fiko Identity Core & Commercial Doctrine** (Ancrage de l'identité, méthodologie commerciale et règles de négociation).
2. **Fiko Conversation State Machine** (Orchestration stricte du cycle d'étapes : Discovery, Qualification, Analysis, Projection, Objection, Closing, Activation, Follow-up).
3. **AI Gateway & Trust Layer** (Sécurisation, acheminement et injection dynamique des preuves de confiance/ROI).
4. **Multi-Model Router** (Optimisation temps de réponse / coût).
5. **Memory Engine** (Gestion fine des états et du contexte historique de l'entreprise).

### ⚠️ RÈGLE DE VERROUILLAGE ARCHITECTURAL (STRICT DIRECTIVE)
**Aucun développement relatif au Voice Engine, aux Avatars animés, au Realtime Voice Streaming, ou à l'intégration WhatsApp Voice ne doit être initié tant que les briques fondamentales ci-dessus (Identity Core, Commercial Doctrine, State Machine, AI Gateway, Router, et Memory Engine) ne sont pas certifiées et stabilisées à 100% en production.**

