
import { GoogleGenAI, Type } from "@google/genai";
import { EnrichmentResult, MediaType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enrichContent = async (url: string, type: MediaType, originalTitle: string): Promise<EnrichmentResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a better title, short description, and 3-5 keywords for this ${type}. 
      URL provided: ${url}
      Current known title: ${originalTitle}
      
      Focus on making it sound professional and engaging.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "description", "tags"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim()) as EnrichmentResult;
  } catch (error) {
    console.error("Gemini Enrichment Error:", error);
    return null;
  }
};
