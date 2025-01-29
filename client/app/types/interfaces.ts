// src/types/forms.ts
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegistrationForm {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  role: string;
}

export interface User {
  userId: string;
  fullName: string;
  username: string;
  profilePhoto: string;
  gender: string;
  role: string;
}

export interface UserSidebarProps {
  onLogout: () => void;
  onProfile: () => void;
  onChatBox: () => void;
  onManageDocuments: () => void;
  onSettings: () => void;
  onHelp: () => void;
}

export interface Conversation {
  _id: string;
  conversationName: string;
}

export interface ChatWindowProps {
  conversation: Conversation | null;
}

export interface Message {
  _id: string;
  content: string;
  sender: string;
  createdAt: string;
}

export interface ChatSidebarProps {
  onSelectConversation: (conversation: Conversation | null) => void;
  onNewConversation: (conversation: Conversation) => void;
}
