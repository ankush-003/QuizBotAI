import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { redirect } from "next/navigation";
import { generateQuestionnaire } from "@/lib/llm";
import { NextRequest, NextResponse } from "next/server";
import quizes from "@/models/quizModel";

export async function POST(req: NextRequest) {
  const session = await auth();
  const { topic } = await req.json();
  try {
    console.log("creating practice quiz");
    await dbConnect();
    const quizTopic = topic as string;
    // const prompt = `Generate 5 questions on the ${topic}.`;

    // const genQuestions = await structuredLlm.invoke(prompt, {
    //   name: "questions",
    // });

    const genQuestions = await generateQuestionnaire(quizTopic);

    if (!genQuestions) {
      return "No questions found for this topic";
    }

    const questions = genQuestions.questions.map(
      (question: any, index: number) => {
        return {
          index: index,
          question: question.question,
          answer: question.answer,
          options: question.options,
        };
      }
    );
    console.log(questions);
    console.log(prompt); 
    const quiz = await quizes.create({
        questions: questions,
        topic: quizTopic,
        numQuestions: questions.length,
        createdBy: session?.user.id,
        type: "practice",
    });

    return NextResponse.json(quiz._id, { status: 200 });
    // redirect("/practice");
    // return res._id;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 500 }
    )
  }
}
