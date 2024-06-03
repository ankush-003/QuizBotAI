import mongoose from "mongoose";
import { z } from "zod";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
    },
    options: {
        type: [String],
        required: [true, "Options are required"],
    },
});

const quizSchema = new mongoose.Schema({
    questions: {
        type: [questionSchema],
        required: [true, "Questions are required"],
    },
    currentQuestion: {
        type: Number,
        default: 0,
    },
    numQuestions: {
        type: Number,
        required: [true, "Number of questions is required"],
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    leaderBoard: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
            score: {
                type: Number,
                default: 0,
            },
        }],
        default: [],
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
}, { timestamps: true });

const Quiz = mongoose.model?.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;

export const QuizSchema = z.object({
    questions: z.array(z.object({
        question: z.string(),
        answer: z.string(),
        options: z.array(z.string()),
    })),
    currentQuestion: z.number(),
    numQuestions: z.number(),
    room: z.string(),
    createdBy: z.string(),
    leaderBoard: z.array(z.object({
        user: z.string(),
        score: z.number(),
    })),
    winner: z.string().nullable(),
});