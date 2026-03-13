import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDazkqAJUNdtiOM4H3b6trAQ_NPUXkUDL0";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeImage(base64Image: string, language: string = "PT") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // Detectar o mimeType dinamicamente
    const mimeMatch = base64Image.match(/^data:(image\/[a-zA-Z+]+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
    
    // Extrair apenas o base64 puro
    const base64Data = base64Image.split(",")[1];

    const prompt = `Analise esta imagem em detalhes para gerar um prompt de criação de imagem via IA (especificamente para modelos como Nano Banana/Flux).
    O idioma de saída deve ser ${language}.
    Retorne EXATAMENTE um objeto JSON com a seguinte estrutura, sem nenhum texto extra ou formatação markdown:
    {
      "subject": "descrição detalhada do objeto/pessoa central",
      "style": "estilo artístico da imagem (ex: fotorrealista, 3d, pintura)",
      "lighting": "detalhes da iluminação (ex: luz natural, cinematográfica)",
      "colors": ["lista de cores dominantes"],
      "composition": "ângulo da câmera e enquadramento",
      "mood": "sentimento ou atmosfera da imagem",
      "quality_tags": ["lista de tags de qualidade como ultra-HD, photorealistic"]
    }`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ]);

    const responseText = result.response.text();
    // Limpar possíveis tags de markdown de código do JSON
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
