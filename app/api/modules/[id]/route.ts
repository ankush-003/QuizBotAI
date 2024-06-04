import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Module from "@/models/moduleModel";

export async function GET(req: NextRequest, { params }: {params: {id: string}}) {
    try {
        await dbConnect();

        const foundModule = await Module.findById(params.id);
        if (!foundModule) {
            throw new Error("Achievement not found");
        }
      
        return NextResponse.json(foundModule);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}