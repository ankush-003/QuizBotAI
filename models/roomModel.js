import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    invitedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        default: [],
    },
}, { timestamps: true });

const Room = mongoose.model?.rooms || mongoose.model("rooms", roomSchema);

export default Room;