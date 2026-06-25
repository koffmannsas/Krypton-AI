# 🧩 MODULE MAP: KRYPTON AI (OMEGA V1)

Ce document décrit en détail l'implémentation et la localisation des 12 modules de l'architecture OMEGA.

| Module | Nom | Description | Localisation dans le code | Statut / Risque |
| :--- | :--- | :--- | :--- | :--- |
| **00** | **Identity Core** | Prompt de base, ton, "Closer IA". | `frontend/src/components/FikoAIEngine.ts` (SYSTEM_PROMPT) | ⚠️ **Risque élevé**: Doit être déplacé côté backend exclusif. |
| **01** | **Sales Brain** | Machine d'état conversationnelle. | *Fragmenté*. UI State dans les composants, LLM State géré par le modèle. | ⚠️ **Risque moyen**: Nécessite une `State Machine` stricte backend. |
| **02** | **Trust Engine** | Injection de preuves sociales/ROI. | `frontend/src/components/TrustPage.tsx`, `TestimonialsSection.tsx` | 🟢 Stable (Côté UI). |
| **03** | **AI Router** | Routage vers le bon modèle LLM. | `backend/src/server.ts` (partiel), `FikoAIEngine.ts` | ⚠️ **Risque élevé**: Le routage doit être unifié sur la Gateway Backend. |
| **04** | **Memory Engine** | Mémoire persistante du prospect. | `utils/VisitorMemory.ts`, `Firestore` (Collections: `users`, `sessions`) | 🟢 Stable (Mais accès à verrouiller via Backend API). |
| **05** | **Relationship Engine**| Ajustement comportemental. | *En cours de conception* (dépend du Memory Engine). | ⚪ À implémenter. |
| **06** | **Pricing Catalog** | Règles métier d'abonnement. | `frontend/src/pricingData.ts`, `hooks/usePricing.ts` | 🟢 Stable. |
| **07** | **AI Gateway** | Interface unifiée LLM. | `backend/src/server.ts` (getGenAI()) | ⚠️ **Risque moyen**: Doit devenir l'unique point d'entrée. |
| **08** | **Voice Engine** | Temps réel bidirectionnel (<600ms). | `frontend/src/utils/fikoVoice.js` | ⏸️ **Verrouillé**: Ne pas toucher avant stabilisation des modules 00-04. |
| **09** | **Human Escalation** | Fallback vers équipe commerciale. | *Non identifié clairement*. Probablement webhook partiel. | ⚪ À implémenter (via WhatsApp/Mail). |
| **10** | **Revenue Intel** | Dashboard & KPI (CAC, MRR). | `frontend/src/pages/dashboard/*` (AdminDashboard, BusinessPanel) | 🟢 Stable. |
| **11** | **Sanctuary UX** | UI/UX fluide et rapide. | `packages/ui/*`, `components/*` | 🟢 Stable (Tailwind, Framer Motion). |
