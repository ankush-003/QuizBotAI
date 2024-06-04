import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is already taken"],
    },
    email: {
        type: String,
        unique: [true, "Email is already taken"],
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },

    numQuizes: {
        type: Number,
        default: 0
    },

    numWins: {
        type: Number,
        default: 0
    },

    numPractices: {
        type: Number,
        default: 0
    },

    achievements: {
        type: [{
            achievement: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "achievements",
            },
            receivedAt: {
                type: Date,
                default: Date.now(),
            },
        }],
        default: [],
    },
    quizHistory: {
        type: [{
            quiz: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "quizes",
            },
            score: {
                type: Number,
            },
            createdAt: {
                type: Date,
            },
        }],
        default: [],
    },
    readingHistory: {
        type: [{
            module: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "modules",
            },
            numChapters: {
                type: Number,
            },
            completed: {
                type: Boolean,
                default: false,
            },
            chaptersRead: {
                type: [{
                    type: mongoose.Schema.Types.ObjectId,
                }],
                default: [],
            },
            numChaptersRead: {
                type: Number,
                default: 0,
            },
            readAt: {
                type: Date,
                default: Date.now(),
            },
        }],
        default: [],
    },
}, { timestamps: true });

const User = mongoose.models?.users || mongoose.model("users", userSchema);

export default User;

// export const UserSchema = z.object({
//     username: z.string(),
//     email: z.string(),
//     password: z.string(),
//     numQuizes: z.number(),
//     numWins: z.number(),
//     numPractices: z.number(),
//     achievements: z.array(z.object({
//         achievement: z.string(),
//         receivedAt: z.date(),
//     })),
//     history: z.array(z.object({
//         quiz: z.string(),
//         score: z.number(),
//         createdAt: z.date(),
//     }))
// });

export const config = {
    unstable_allowDynamic: [
        'mongoose/dist/browser.umd.js',
        'mongoose/**',
    ]
}