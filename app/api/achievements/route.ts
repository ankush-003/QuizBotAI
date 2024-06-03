import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Achievement from "@/models/achievementModel";
import { AchievementSchema } from "@/models/achievementModel";
import User from "@/models/userModel";
import { ThermometerSnowflake } from "lucide-react";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId');
  try {
    await dbConnect();

    if(userId) {
      const userWithAchievements = await User.findById(userId).select('achievements').populate('achievements').exec();
      return NextResponse.json(userWithAchievements.achievements);
    }

    const achievements = await Achievement.find({});

    return NextResponse.json(achievements);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();
    console.log(data);
    const isValidData = AchievementSchema.parse(data);

    const achievement = Achievement.create(isValidData);

    return NextResponse.json(achievement);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
