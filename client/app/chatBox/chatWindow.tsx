"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatWindowProps, Message } from "../types/interfaces";
import axios from "axios";

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Fetch messages when the conversation changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!conversation) return;

            try {
                const response = await axios.post(
                    "http://localhost:5000/api/messages/getMessages",
                    { conversationId: conversation._id },
                    { withCredentials: true }
                );
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [conversation]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!conversation || !newMessage.trim()) return;
        // Clear the input field immediately
        const currentMessage = newMessage; // Store the current message
        setNewMessage("");
        try {
            // Create user message object
            const userMessage = {
                conversationId: conversation._id,
                sender: "user",
                content: currentMessage,
            };
            // Send the user's message to the backend
            const response = await axios.post(
                "http://localhost:5000/api/messages/createMessage",
                userMessage,
                { withCredentials: true }
            );
            // Add the user's message to the state
            setMessages((prev) => [...prev, response.data]);
            // Now, send the user's message to the bot for a response
            const botResponse = await axios.post(
                "http://127.0.0.1:8000/ask/",
                { question: currentMessage },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // Create the bot message object
            const botMessage = {
                conversationId: conversation._id,
                sender: "bot",
                content: botResponse.data.answer,
                _id: Date.now().toString() + "bot", // Unique ID for the bot message
                createdAt: new Date().toISOString(),
            };
            // Save the bot's response to the backend if needed
            await axios.post(
                "http://localhost:5000/api/messages/createMessage",
                botMessage,
                {
                    withCredentials: true,
                }
            );
            // Update the messages state with the bot's message
            setMessages((prev) => [...prev, botMessage]);
            // setNewMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
            // Optionally handle error messages
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e as any); // TypeScript workaround for Event type
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            {conversation ? (
                <>
                    {/* Chat Header */}
                    <div className="p-4 border-b bg-gray-100">
                        <h2 className="text-2xl font-bold">
                            {conversation.conversationName}
                        </h2>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-4"
                    >
                        {messages.map((message) => (
                            <div
                                key={message._id}
                                className={`p-3 rounded-lg shadow-md max-w-lg ${message.sender === "user"
                                        ? "bg-blue-100 text-blue-900 self-end"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                                dangerouslySetInnerHTML={{
                                    __html: message.content.replaceAll("\\n", "<br />"),
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Input Box */}
                    <form
                        onSubmit={handleSendMessage}
                        className="p-4 border-t bg-gray-100 flex items-center space-x-2"
                    >
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            rows={1}
                            className="flex-1 p-2 border rounded resize-none focus:outline-none"
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p>Select a conversation to start chatting.</p>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;