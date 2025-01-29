// userModel.js
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "clerk"],
        default: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    conversationIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }],

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);