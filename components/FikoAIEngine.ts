import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

const SYSTEM_PROMPT = `Tu es Fiko, l'intelligence centrale de Krypton AI.
Ta réponse doit être ultra-courte (1-2 phrases), percutante et focalisée sur la conversion.
Utilise le ton "Closer IA". Projette des résultats en FCFA si possible. 
Réponds uniquement avec le texte que le Core doit afficher.`;

export const askFiko = async (message: string, history: any[]) => {
    try {
        const chat = await ai.chats.create({
            model: "gemini-1.5-flash", 
            history: history.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
            config: { systemInstruction: SYSTEM_PROMPT }
        });
        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (e) {
        return "Système en cours de reconfiguration. Reprenez sur wa.me/+225054442767";
    }
};
