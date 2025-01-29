import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import { User } from "../models/userModel.js";


export const createMessage = async (req, res) => {
    try {
        const { conversationId, sender, content } = req.body;
        const newMessage = await Message.create({
            conversation: conversationId,
            sender,
            content
        });
        await Conversation.findByIdAndUpdate(conversationId, {
            $push: { messages: newMessage._id }
        });
        const userId = req.id;
        await User.findByIdAndUpdate(userId, {
            $addToSet: { conversationIds: conversationId }
        });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Error creating message", error });
    }
};

export const getMessages = async (req, res) => {
    const { conversationId } = req.body;
    const userId = req.id;
    try {
        const user = await User.findById(userId);
        if (!user || !user.conversationIds.includes(conversationId)) {
            return res.status(403).json({ message: "Access denied: Conversation does not belong to the user." });
        }
        const messages = await Message.find({ conversation: conversationId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Error fetching messages", error });
    }
};