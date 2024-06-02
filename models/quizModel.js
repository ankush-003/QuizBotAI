import mongoose from "mongoose";

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