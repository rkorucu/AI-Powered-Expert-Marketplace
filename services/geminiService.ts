import { GoogleGenAI, Type } from "@google/genai";
import { Expert } from "../types";

// Helper to get AI instance safely
const getAI = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not set.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const findBestMatches = async (query: string, experts: Expert[]): Promise<string[]> => {
  const ai = getAI();
  if (!ai) return experts.slice(0, 3).map(e => e.id); // Fallback

  try {
    const expertsJson = JSON.stringify(experts.map(e => ({
      id: e.id,
      name: e.name,
      skills: e.skills,
      bio: e.bio,
      tags: e.tags
    })));

    const prompt = `
      You are an expert matching engine for a service marketplace.
      User Request: "${query}"
      Available Experts: ${expertsJson}
      
      Task: Return a JSON array of strings containing the 'id' of the top 3 experts that best match the user's request.
      Sort by relevance.
      Only return the IDs.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error matching experts:", error);
    return experts.slice(0, 3).map(e => e.id); // Fallback
  }
};

export const generateSessionSummary = async (transcript: string): Promise<{ summary: string; actionItems: string[] }> => {
  const ai = getAI();
  if (!ai) return { summary: "API Key missing.", actionItems: [] };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a concise summary and a list of action items from this meeting transcript:\n\n${transcript}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            actionItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating summary:", error);
    return {
      summary: "Failed to generate summary.",
      actionItems: ["Check console for errors."]
    };
  }
};