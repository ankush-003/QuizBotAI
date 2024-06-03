import mongoose from "mongoose";
import { z } from "zod";

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

const Room = mongoose.models.rooms || mongoose.model("rooms", roomSchema);

export default Room;

export const RoomSchema = z.object({
    createdBy: z.string(),
    invitedUsers: z.array(z.string()),
});
