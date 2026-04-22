import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialisation
if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

// 🚀 MOTEUR DE RELANCE (Scan Cron toutes les 12h)
export const relanceEngine = functions.pubsub.schedule('every 12 hours').onRun(async (context) => {
  const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h

  const leads = await db.collection('leads')
    .where('status', '==', 'active')
    .where('score', '>', 60)
    .where('lastActivity', '<', admin.firestore.Timestamp.fromDate(threshold))
    .get();

  for (const doc of leads.docs) {
    const leadId = doc.id;
    const lead = doc.data();
    const stage = lead.relanceStage || 0;

    // Logique d'escalade : Si > 3 relances, alerte humaine
    if (stage >= 3 && lead.status !== 'converted') {
        await db.collection('notifications').add({
            type: 'HUMAN_ACTION_REQUIRED',
            leadId,
            message: `Escalade demandée pour ${lead.name}. Prospect chaud, pas de conversion après 3 relances.`,
            priority: 'high',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        continue;
    }

    if (stage < 3) {
      await executeRelance(leadId, lead, stage + 1);
    }
  }
});

// ⚡ EXECUTION UNITAIRE (Template & Logique Contextuelle)
async function executeRelance(leadId: string, lead: any, stage: number) {
  // 💰 Calcul de la projection financière (Exemple: conversion * panier moyen estimé)
  const lostRevenue = (lead.score * 5000).toLocaleString('fr-FR') + " FCFA";
  
  const ctx = {
    business: lead.businessType || "votre entreprise",
    intent: lead.lastIntent || "général",
    lostRevenue: lostRevenue
  };

  const template = getContextualTemplate(lead, stage, ctx);
  
  // 1. Log dans Firestore /followups (Historique)
  await db.collection('followups').add({
    userId: lead.userId,
    leadId,
    type: template.type,
    status: 'sent',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // 2. Mise à jour Lead
  await db.collection('leads').doc(leadId).update({
    relanceStage: stage,
    lastRelanceAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // 3. Trigger Channel (Logique d'envoi réelle à connecter)
  console.log(`🚀 Relance ${template.type} envoyée à ${leadId} (Stage ${stage}) - Intent: ${ctx.intent}`);
}

// 🎯 TEMPLATES PERSONNALISÉS (Contextuels)
function getContextualTemplate(lead: any, stage: number, ctx: any) {
  const intentMessage = 
    ctx.intent === 'pricing' ? "Vous avez consulté nos offres, mais le système n'est pas encore actif..." :
    ctx.intent === 'agents' ? "L'automatisation de vos agents IA vous attend..." :
    "La transformation de votre site est en attente.";

  switch(stage) {
    case 1: // WhatsApp
      const whatsappMessage = `*Bonjour ${lead.name}*, ${intentMessage}
  
Vous pourriez déjà capter vos prochains clients aujourd'hui. Actuellement, vous laissez passer environ *${ctx.lostRevenue}* par mois sur la table.
  
On lance ça ? https://wa.me/+2250544427676`;
      return { type: 'whatsapp', content: whatsappMessage };
      
    case 2: // Email
      return { 
        type: 'email', 
        subject: "Votre système n’est pas encore activé",
        content: `Rappel : votre site actuel est passif. Krypton AI crée un système de vente automatique pour ${ctx.business}.` 
      };
      
    case 3: // Dashboard
      return { type: 'dashboard', content: "⚡ Opportunité non exploitée détectée : Reprenez avec Fiko" };
      
    default:
      return { type: 'none', content: '' };
  }
}
