import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Achievement from "@/models/achievementModel";
import { AchievementSchema } from "@/models/achievementModel";

export async function GET(req: NextRequest, { params }: {params: {id: string}}) {
    try {
        await dbConnect();

        const achievements = await Achievement.findById(params.id);

        // const isValidAchievement = AchievementSchema.parse(achievements);

        if (!achievements) {
            throw new Error("Achievement not found");
        }
      
        return NextResponse.json(achievements);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}