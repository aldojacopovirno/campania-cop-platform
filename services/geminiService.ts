import { GoogleGenAI } from "@google/genai";
import { UserRole } from '../types';
import { SYSTEM_INSTRUCTION_DECISION_MAKER, SYSTEM_INSTRUCTION_CITIZEN } from '../constants';

const getSystemInstruction = (role: UserRole) => {
  switch (role) {
    case UserRole.DECISION_MAKER:
    case UserRole.OPERATOR:
      return SYSTEM_INSTRUCTION_DECISION_MAKER;
    case UserRole.CITIZEN:
      return SYSTEM_INSTRUCTION_CITIZEN;
    default:
      return SYSTEM_INSTRUCTION_CITIZEN;
  }
};

export const generateAIResponse = async (
  prompt: string,
  role: UserRole,
  contextData: string
): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      return "Errore: API Key non configurata. Impossibile contattare l'AI.";
    }

    const ai = new GoogleGenAI({ apiKey });

    // Combine context with prompt
    const fullPrompt = `
      [CONTESTO DATI ATTUALI]: ${contextData}
      [DOMANDA UTENTE]: ${prompt}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
      config: {
        systemInstruction: getSystemInstruction(role),
        temperature: 0.4, // Lower temperature for more deterministic/serious answers
        maxOutputTokens: 2000,
      },
    });

    const responseText = response.text;
    return responseText || "Non sono riuscito a generare una risposta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Si è verificato un errore nel servizio AI. Riprova più tardi.";
  }
};
