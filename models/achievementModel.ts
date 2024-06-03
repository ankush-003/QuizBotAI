import mongoose from "mongoose";
import { z } from "zod";

const achievementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    threshold: {
        type: {
            numQuizes: {
                type: Number,
            },
            numWins: {
                type: Number,
            },
            numPractices: {
                type: Number,
            },
        }
    }
});

const Achievement = mongoose.models?.achievements || mongoose.model("achievements", achievementSchema);

export default Achievement;

export const AchievementSchema = z.object({
    name: z.string(),
    description: z.string(),
    threshold: z.object({
        numQuizes: z.number().optional(),
        numWins: z.number().optional(),
        numPractices: z.number().optional(),
    }),
});