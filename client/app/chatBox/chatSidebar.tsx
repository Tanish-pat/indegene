"use client";
import React, { useState, useEffect } from "react";
import { Conversation, ChatSidebarProps } from "../types/interfaces";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import axios from "axios";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  onSelectConversation,
  onNewConversation,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newConversationName, setNewConversationName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/conversations/getConversations",
          { withCredentials: true }
        );
        setConversations(response.data);
        if (response.data.length > 0) {
          onSelectConversation(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [onSelectConversation]);

  const handleNewConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConversationName.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/conversations",
        { conversationName: newConversationName },
        { withCredentials: true }
      );
      const newConversation = response.data;
      setConversations((prev) => [...prev, newConversation]);
      onNewConversation(newConversation);
      setNewConversationName("");
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/conversations/deleteConversation",
        { conversationId },
        { withCredentials: true }
      );
      setConversations((prev) =>
        prev.filter((conversation) => conversation._id !== conversationId)
      );
      onSelectConversation(null);
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  return (
    <Card className="w-64 p-4 bg-gray-100">
      <Separator className="my-4" />
      <div className="flex justify-between space-x-4">
        <Link href="/">
          <Button
            variant="outline"
            className="flex-1 px-4 py-2 text-lg text-primary border-primary shadow-md"
          >
            Home
          </Button>
        </Link>
        <Link href="/userDashboard">
          <Button
            variant="outline"
            className="flex-1 px-4 py-2 text-lg text-primary border-primary shadow-md"
          >
            Dashboard
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <h2 className="text-xl font-bold mb-4">Tradewies AI</h2>

      <form onSubmit={handleNewConversation} className="space-y-2">
        <Input
          type="text"
          value={newConversationName}
          onChange={(e) => setNewConversationName(e.target.value)}
          placeholder="New conversation name"
        />
        <Button
          type="submit"
          variant="outline"
          className="px-8 py-3 text-lg text-primary border-primary shadow-md"
        >
          Add Conversation
        </Button>
      </form>
      <Separator className="my-4" />

      <h2 className="text-xl font-bold mb-4">Conversations</h2>
      <ul className="space-y-2">
        {conversations.map((conversation) => (
          <li
            key={conversation._id}
            className="p-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-200"
          >
            <div
              onClick={() => onSelectConversation(conversation)}
              className="flex-grow cursor-pointer"
            >
              {conversation.conversationName}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="px-8 py-3 text-lg text-primary border-primary shadow-md"
                  >
                    <span className="material-icons">...</span>
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteConversation(conversation._id)}
                >
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ChatSidebar;
