import { db } from "@krypton/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function sendWhatsAppMessage(
  phone: string,
  message: string,
  companyId: string,
) {
  // Mock WhatsApp API call
  console.log(`Sending WhatsApp to ${phone}: ${message}`);

  try {
    await addDoc(collection(db, "messages"), {
      phone,
      message,
      companyId,
      status: "sent",
      type: "whatsapp",
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error logging message", error);
  }
}

export async function schedulePaymentReminder(
  companyId: string,
  phone: string,
  amount: number,
) {
  const message = `Bonjour, ceci est un rappel pour votre paiement de ${amount} FCFA. Merci de régulariser votre situation.`;
  await sendWhatsAppMessage(phone, message, companyId);
}

export async function scheduleLeadFollowUp(
  companyId: string,
  phone: string,
  leadName: string,
) {
  const message = `Bonjour ${leadName}, nous avons remarqué votre intérêt. Comment pouvons-nous vous aider ?`;
  await sendWhatsAppMessage(phone, message, companyId);
}
