import { doc, getDoc, collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const resolveUserContext = async (userId: string) => {
  try {
    const context: any = {};
    
    // Fetch critical context collections
    const collectionsToFetch = [
      { name: "fiko_memory", path: "fiko_memory", single: true },
      { name: "fiko_relationships", path: "fiko_relationships", single: false },
      { name: "fiko_strategic_modes", path: "fiko_strategic_modes", single: false },
      { name: "fiko_behavior_predictions", path: "fiko_behavior_predictions", single: false },
      { name: "fiko_economic_forecasts", path: "fiko_economic_forecasts", single: false },
    ];

    for (const col of collectionsToFetch) {
      if (col.single) {
        const q = query(collection(db, col.path), where("userId", "==", userId), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          context[col.name] = snapshot.docs[0].data();
        }
      } else {
        const q = query(collection(db, col.path), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(5));
        const snapshot = await getDocs(q);
        context[col.name] = snapshot.docs.map(doc => doc.data());
      }
    }

    return context;
  } catch (error) {
    console.error("Error resolving user context:", error);
    return null;
  }
};
