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

    achievements: {
        type: [{
            achievement: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "achievements",
            },
            receivedAt: {
                type: Date,
            },
        }]
    },
    history: {
        type: [{
            quiz: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz",
            },
            score: {
                type: Number,
            },
            createdAt: {
                type: Date,
            },
        }]
    }
}, { timestamps: true });

const User = mongoose.models?.users || mongoose.model("users", userSchema);

export default User;