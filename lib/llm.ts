import { ChatGroq } from "@langchain/groq";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

const model = new ChatGroq({
  // model: "gemma-7b-it",
  // model: "llama3-8b-8192",
  model: "mixtral-8x7b-32768",
  temperature: 0,
});

// const model_2 = new ChatGoogleGenerativeAI({
//   model: "gemini-pro",
//   maxOutputTokens: 2048,
// });

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

const chapters = z.object({
  chapters: z.array(
    z.object({
      index: z.number().describe("The index of the chapter"),
      title: z.string().describe("The title of the chapter"),
      content: z.string().describe("The content of the chapter, with adequate information"),
    })
  ).describe("Array of chapters, where each chapter has adequate information and all chapters are in order")
});

export async function generateQuestionnaire(topic: string) {
  const structuredllm =  model.withStructuredOutput(questionnaire);
  const prompt = `Generate 5 questions on the ${topic}.`;
  const genQuestions = await structuredllm.invoke(prompt, {
    name: "questions",
  });

  return genQuestions;
}

export async function generateChapters(topic: string) {
  const structuredllm =  model.withStructuredOutput(chapters);
  const prompt = `Generate 5 chapters on the ${topic}.`;
  const genChapters = await structuredllm.invoke(prompt, {
    name: "chapters",
  });

  return genChapters;
} 