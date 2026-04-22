import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// 1. Webhook Fiko Pay
export const fikoWebhook = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
  try {
    const { plan, userId, companyName } = req.body;

    // Create company
    const companyRef = await db.collection("companies").add({
      name: companyName,
      ownerId: userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Create subscription
    await db.collection("subscriptions").add({
      companyId: companyRef.id,
      plan: plan,
      status: "active",
      currentPeriodEnd: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      ),
    });

    // Activate AI agents
    await createAgentsForPlan(companyRef.id, plan);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. Fonction createAgents
async function createAgentsForPlan(companyId: string, plan: string) {
  const agents = [];

  if (["ACCESS", "TERRA", "MARS", "KRYPTON"].includes(plan)) {
    agents.push({ type: "assistant", name: "Assistant IA", status: "active" });
  }
  if (["TERRA", "MARS", "KRYPTON"].includes(plan)) {
    agents.push({ type: "marketing", name: "Marketing IA", status: "active" });
  }
  if (["MARS", "KRYPTON"].includes(plan)) {
    agents.push({ type: "sales", name: "Sales IA", status: "active" });
    agents.push({ type: "sav", name: "SAV IA", status: "active" });
  }

  const batch = db.batch();
  agents.forEach((agent) => {
    const ref = db.collection("ai_agents").doc();
    batch.set(ref, { ...agent, companyId });
  });

  await batch.commit();
}

// 3. Cron billing
export const billingCron = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context: functions.EventContext) => {
    const now = admin.firestore.Timestamp.now();
    const snapshot = await db
      .collection("subscriptions")
      .where("status", "==", "active")
      .where("currentPeriodEnd", "<=", now)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      // In a real app, trigger payment via Fiko Pay API here
      // For now, just mark as past_due
      batch.update(doc.ref, { status: "past_due" });
    });

    await batch.commit();
    console.log(`Processed ${snapshot.size} subscriptions for billing.`);
  });

// 4. Cron leads
export const leadsCron = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context: functions.EventContext) => {
    const companiesSnapshot = await db.collection("companies").get();

    const batch = db.batch();
    companiesSnapshot.docs.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const companyId = doc.id;
      // Mock lead generation
      const leadRef = db.collection("leads").doc();
      batch.set(leadRef, {
        companyId,
        name: `Auto Lead ${Math.floor(Math.random() * 1000)}`,
        email: `lead${Math.floor(Math.random() * 1000)}@example.com`,
        phone: `+1234567890`,
        source: "Auto Cron",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();
    console.log(`Generated leads for ${companiesSnapshot.size} companies.`);
  });

// 5. Cron relance
export const relanceCron = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context: functions.EventContext) => {
    const pastDueSnapshot = await db
      .collection("subscriptions")
      .where("status", "==", "past_due")
      .get();

    const batch = db.batch();
    pastDueSnapshot.docs.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const sub = doc.data();
      const messageRef = db.collection("messages").doc();
      batch.set(messageRef, {
        companyId: sub.companyId,
        type: "whatsapp",
        message:
          "Votre abonnement est expiré. Veuillez régulariser votre paiement.",
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();
    console.log(`Scheduled ${pastDueSnapshot.size} payment reminders.`);
  });
