export const runtime = "edge";
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from "next/server";

import { structuredLlm } from "@/lib/llm";

export default async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const topic = searchParams.get("topic");
    const prompt = `Generate 5 questions on the ${topic}.`;

    const questions = await structuredLlm.invoke(prompt, { name : "questions" });
    return NextResponse.json(
      {
        questions,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 500 }
    );
  }
}
