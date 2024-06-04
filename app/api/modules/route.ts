import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Module from "@/models/moduleModel";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId');
  try {
    await dbConnect();

    if(userId) {
      const userWithAchievements = await User.findById(userId).select('readingHistory').populate('readingHistory.module').exec();
        return NextResponse.json(userWithAchievements.readingHistory);  
    }

    const modules = await Module.find({});

    return NextResponse.json(modules);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}