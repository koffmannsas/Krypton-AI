import * as admin from 'firebase-admin';

// Initialisation de Firebase Admin
// Assurez-vous d'avoir configuré GOOGLE_APPLICATION_CREDENTIALS dans votre environnement
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function initializeLeadsForRelance() {
  console.log("🚀 Lancement de l'initialisation des leads...");
  
  const leadsSnapshot = await db.collection('leads').get();
  
  const batch = db.batch();
  let count = 0;

  leadsSnapshot.forEach((doc) => {
    const lead = doc.data();
    
    // Si relanceStage n'existe pas, on initialise les champs nécessaires
    if (lead.relanceStage === undefined) {
      batch.update(doc.ref, {
        relanceStage: 0,
        lastActivity: lead.lastActivity || admin.firestore.FieldValue.serverTimestamp(),
        score: lead.score || 50,
        status: lead.status || 'active',
        phone: lead.phone || null 
      });
      count++;
    }
  });

  if (count > 0) {
    await batch.commit();
    console.log(`✅ ${count} leads initialisés pour le moteur de relance.`);
  } else {
    console.log("ℹ️ Aucun lead à initialiser.");
  }
}

initializeLeadsForRelance()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  });
