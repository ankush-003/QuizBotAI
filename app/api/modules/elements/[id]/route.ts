import { NextRequest, NextResponse } from "next/server";
import Module  from "@/models/moduleModel";

export async function POST(req: NextRequest, { params }: {params: {id: string}}) {
  const data = await req.json();
  const chapterIndex = req.nextUrl.searchParams.get('index');
  if(!chapterIndex) {
    return NextResponse.json({ error: "Chapter index required" }, { status: 400 });
  }
  console.log(data);  
  const updatedModule = await Module.findOneAndUpdate(
    { _id: params.id, "chapters.index": chapterIndex },
    {
      $set: {
        "chapters.$.elements": data
      }
    },
    { new: true }
  );

  return NextResponse.json(updatedModule, { status: 200 });
}