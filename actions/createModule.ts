"use server"
import { generateChapters } from "@/lib/llm";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Module from "@/models/moduleModel";
import User from "@/models/userModel";

export default async function createModule(topic: string) {
    const session = await auth();
    try {
        console.log("creating module");
        await dbConnect();
        const quizTopic = topic as string;

        const genChapters = await generateChapters(quizTopic);
        // console.log(genChapters);

        if (!genChapters) {
            return "No chapters found for this topic";
        }

        const chapters = genChapters.chapters.map(
            (chapter: any, index: number) => {
                return {
                    index: index,
                    title: chapter.title,
                    content: chapter.content,     
                };
            }
        );
    
        console.log(chapters);
        const newModule: any = await Module.create({
            chapters: chapters,
            topic: quizTopic,
            numChapters: chapters.length,
            createdBy: session?.user._id,
        });

        const user = await User.findOneAndUpdate(
            { _id: session?.user._id },
            { $push: { readingHistory: {
                module: newModule._id,
                numChapters: chapters.length,
            }} },
            { new: true }
        );

        return {
            id: newModule._id.toString(),
        }
    } catch (error: any) {
        console.error(error);
        return { error: error.message };
    }
}
