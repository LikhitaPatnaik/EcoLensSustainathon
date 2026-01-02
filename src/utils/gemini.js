import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_KEY; 

const genAI = new GoogleGenerativeAI(API_KEY);

export async function identifyTrash(imageBase64) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const cleanBase64 = imageBase64.split(",")[1];

    const prompt = `
      Analyze this image. Identify the main object.
      
      1. Category: "Recyclable", "Compostable", or "Landfill"?
      2. Danger: Climate danger if dumped?
      3. CO2: Estimate CO2 saved (just the number, e.g. 50).
      4. Chemicals: Other resources saved?
      5. Alternative: What is a sustainable eco-friendly swap? (e.g. for plastic water bottle -> "Stainless Steel Flask").
      
      Respond ONLY with valid JSON.
      Format:
      {
        "item": "Name of item",
        "category": "Recyclable", 
        "reason": "Why it belongs there",
        "danger": "Microplastics enter ocean.",
        "co2_saved": 50,
        "chemical_impact": "Prevents Methane",
        "alternative": "Use a bamboo toothbrush instead"
      }
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: cleanBase64, mimeType: "image/jpeg" } }
    ]);

    const response = await result.response;
    let text = response.text();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);

  } catch (error) {
    console.error("AI Error:", error);
    return {
      item: "Error",
      category: "Unknown",
      reason: "Try again.",
      danger: "Unknown.",
      co2_saved: 0,
      chemical_impact: "Unknown",
      alternative: "None"
    };
  }
}