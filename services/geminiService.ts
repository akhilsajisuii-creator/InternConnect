
import { GoogleGenAI } from "@google/genai";

export const generateJobDescription = async (title: string, industry: string, skills: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Act as a senior hiring manager. Write a professional, punchy, and modern job description for an internship.
  Role: ${title}
  Industry: ${industry}
  Key Skills: ${skills.join(', ')}
  
  Focus on learning outcomes, exciting projects, and clear expectations. 
  Output only the job description. Keep it concise (under 120 words).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Failed to generate. Please input manually.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Something went wrong with the AI assistant.";
  }
};
