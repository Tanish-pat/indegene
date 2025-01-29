import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";

export const createConversation = async (req, res) => {
    const userId = req.id;
    const { conversationName } = req.body;
    try {

        const newConversation = await Conversation.create({
            user: userId,
            conversationName: conversationName
        });
        await User.findByIdAndUpdate(userId, {
            $addToSet: { conversationIds: newConversation._id }
        });
        res.status(201).json(newConversation);
    } catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).json({ message: "Error creating conversation", error });
    }
};

export const getUserConversations = async (req, res) => {
    const userId = req.id;
    try {
        const conversations = await Conversation.find({ user: userId }).populate('messages');
        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ message: "Error fetching conversations", error });
    }
};

export const deleteConversation = async (req, res) => {
    try {
        const userId = req.id;
        const { conversationId } = req.body;

        // Find the conversation to ensure it belongs to the user
        const conversation = await Conversation.findOne({ _id: conversationId, user: userId });
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found or unauthorized" });
        }
        // Delete all messages associated with the conversation
        await Message.deleteMany({ conversation: conversationId });
        // Delete the conversation
        await Conversation.findByIdAndDelete(conversationId);
        // Remove the conversation ID from the user's conversationIds
        await User.findByIdAndUpdate(userId, {
            $pull: { conversationIds: conversationId }
        });
        // console.log("conversation deleted successfully");
        res.status(200).json({ message: "Conversation and related messages deleted successfully" });
    } catch (error) {
        console.error("Error deleting conversation:", error);
        res.status(500).json({ message: "Error deleting conversation", error });
    }
};