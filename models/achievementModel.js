import mongoose from "mongoose";

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
        type: [{
            numGames: {
                type: Number,
            },
            numWins: {
                type: Number,
            },
        }]
    }
});

const Achievement = mongoose.models?.achievements || mongoose.model("achievements", achievementSchema);

export default Achievement;