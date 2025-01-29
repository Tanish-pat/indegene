"use client";
import React, { useState } from "react";
import ChatSidebar from "./chatSidebar";
import ChatWindow from "./chatWindow";
import { Conversation } from "../types/interfaces";

const ChatApp: React.FC = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const handleNewConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ChatSidebar
        onSelectConversation={setSelectedConversation}
        onNewConversation={handleNewConversation}
      />
      <ChatWindow conversation={selectedConversation} />
    </div>
  );
};

export default ChatApp;
