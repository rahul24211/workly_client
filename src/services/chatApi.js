import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const chatAPI = {
  // Start a conversation
  startConversation: (contractId) =>
    api.post("/api/chat/start", { contractId }),

  // Get all conversations
  getMyConversations: (limit = 20, offset = 0) =>
    api.get("/api/chat/conversations", {
      params: { limit, offset },
    }),

  // Get single conversation by ID
  getConversation: (conversationId) =>
    api.get("/api/chat/conversation", {
      params: { conversationId },
    }),

  // Get conversation by contract ID
  getConversationByContract: (contractId) =>
    api.get("/api/chat/by-contract", {
      params: { contractId },
    }),

  // Send message
  sendMessage: (conversationId, content) =>
    api.post("/api/chat/send", {
      conversationId,
      content,
    }),

  // Get messages
  getMessages: (conversationId, limit = 20, offset = 0) =>
    api.get("/api/chat/messages", {
      params: { conversationId, limit, offset },
    }),

  // Mark messages as read
  markMessagesRead: (conversationId) =>
    api.patch("/api/chat/mark-read", { conversationId }),

  // Get unread count
  getUnreadCount: () => api.get("/api/chat/unread-count"),

  // Check chat permission
  checkChatPermission: (freelancerId) =>
    api.get("/api/chat/check-permission", {
      params: { freelancerId },
    }),
};

export default api;
