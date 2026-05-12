import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface SkillInsight {
  label: string;
  icon: string;
  relevanceScore: number;
  reasoning: string;
}

export interface Recommendation {
  title: string;
  description: string;
  type: 'Gig' | 'Gig Pathway';
  matchScore: number;
}

export interface AnalysisResult {
  summary: string;
  skills: SkillInsight[];
  recommendations: Recommendation[];
}

export const geminiService = {
  async analyzeContent(content: string, type: 'url' | 'text' | 'image' = 'text'): Promise<AnalysisResult> {
    const prompt = `Analyze the following ${type} context: "${content}"
    
    Extract strategic skills, career pathways, and recommended actions.
    Return the result in JSON format following this schema:
    {
      "summary": "High-level summary of the analysis",
      "skills": [
        { "label": "Skill Name", "icon": "Lucide icon name (Zap, Brain, BarChart3, etc.)", "relevanceScore": 0.95, "reasoning": "Why this skill is relevant" }
      ],
      "recommendations": [
        { "title": "Recommendation Title", "description": "Details", "type": "Gig | Gig Pathway", "matchScore": 0.9 }
      ]
    }
    
    CRITICAL CONSTRAINTS for recommendations:
    1. Only use types: "Gig" or "Gig Pathway".
    2. NEVER include "Learning Pathway" options like "earn a certification" or "apply for an external internship".
    3. For "Gig Pathway", provide options like: Work Shadow opportunity, office tour, attend a conference, symposium, or speaker series.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              skills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    icon: { type: Type.STRING },
                    relevanceScore: { type: Type.NUMBER },
                    reasoning: { type: Type.STRING }
                  },
                  required: ["label", "icon", "relevanceScore", "reasoning"]
                }
              },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    type: { type: Type.STRING },
                    matchScore: { type: Type.NUMBER }
                  },
                  required: ["title", "description", "type", "matchScore"]
                }
              }
            },
            required: ["summary", "skills", "recommendations"]
          }
        }
      });

      const text = response.text || "{}";
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini analysis error:", error);
      throw error;
    }
  },

  async analyzeImage(base64Image: string): Promise<AnalysisResult> {
    const prompt = `Analyze this image (could be a screenshot of an article, a press release, or an investor letter).
    Identify workforce trends, emerging strategic skills, and career opportunities.
    Return JSON format following the same schema as analyzeContent, using the same "Gig" and "Gig Pathway" constraints (NO certifications, NO external internships. YES Work shadow, office tours, etc.).`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { text: prompt },
          { inlineData: { data: base64Image.split(',')[1] || base64Image, mimeType: "image/jpeg" } }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              skills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    icon: { type: Type.STRING },
                    relevanceScore: { type: Type.NUMBER },
                    reasoning: { type: Type.STRING }
                  },
                  required: ["label", "icon", "relevanceScore", "reasoning"]
                }
              },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    type: { type: Type.STRING },
                    matchScore: { type: Type.NUMBER }
                  },
                  required: ["title", "description", "type", "matchScore"]
                }
              }
            },
            required: ["summary", "skills", "recommendations"]
          }
        }
      });

      const text = response.text || "{}";
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini image analysis error:", error);
      throw error;
    }
  },

  async generateGigScope(problem: string): Promise<any> {
    const prompt = `Convert this business challenge into a structured project scope: "${problem}"
    Return a blueprint including title, description, deliverables, skills, and strategic context.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini scoping error:", error);
      throw error;
    }
  }
};
