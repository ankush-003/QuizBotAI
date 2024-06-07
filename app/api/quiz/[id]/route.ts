import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import quizes from "@/models/quizModel";

export async function GET(req: NextRequest, { params }: {params: {id: string}}) {
    try {
        await dbConnect();

        const foundQuiz = await quizes.findById(params.id);
        if (!foundQuiz) {
            throw new Error("Quiz not found");
        }
      
        return NextResponse.json(foundQuiz);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}