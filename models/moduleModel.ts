import { create } from "domain";
import { read } from "fs";
import mongoose from "mongoose";
import { title } from "process";

const chapterSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
    },
    title: {    
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})

const moduleSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    chapters: {
        type: [chapterSchema],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    readBy: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
            readAt: {
                type: Date,
                default: Date.now(),
            },
        }],
        default: [],
    },
})

const Module = mongoose.models?.modules || mongoose.model("modules", moduleSchema);

export default Module;