import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

const model = new ChatGroq({
  // model: "gemma-7b-it",
  model: "llama3-8b-8192",
  temperature: 0,
});

const model_2 = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
});

const questionnaire = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe("The question to ask"),
      options: z
        .array(z.string())
        .describe("The options to present to the user"),
      answer: z.string().describe("The correct answer"),
      description: z.string().optional().describe("The description of the answer"),
    })
  ).describe("Array of questions to ask the user")
});

export const structuredLlm = model.withStructuredOutput(questionnaire);