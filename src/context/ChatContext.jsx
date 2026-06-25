import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import socketService from "../services/socketService";
import { chatAPI } from "../services/chatApi";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getMyConversations();
      setConversations(response.data.conversations || []);
      setError(null);
    } catch (err) {
      console.error("Fetch conversations error:", err);
      setError(err.response?.data?.message || "Failed to fetch conversations");
    } finally {
      setLoading(false);
    }
  }, []);

  // Get unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await chatAPI.getUnreadCount();
      setUnreadCount(response.data.unreadCount || 0);
    } catch (err) {
      console.error("Fetch unread count error:", err);
    }
  }, []);

  // Initialize socket connection and fetch conversations
  useEffect(() => {
    if (user && token) {
      socketService.connect(token);
      socketService.emitUserOnline(user.id);
      
      // Fetch conversations on login
      fetchConversations();
      fetchUnreadCount();

      return () => {
        socketService.emitUserOffline(user.id);
      };
    }
  }, [user, token, fetchConversations, fetchUnreadCount]);

  // Listen for socket events
  useEffect(() => {
    socketService.onReceiveMessage((message) => {
      if (currentConversation?.id === message.conversationId) {
        setMessages((prev) => [...prev, message]);
      }
      // Refresh conversations to update lastMessage and unread count
      fetchConversations();
    });

    socketService.onMessagesRead((data) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId ? { ...msg, isRead: true } : msg
        )
      );
      // Refresh conversations
      fetchConversations();
    });

    socketService.onUserTyping((data) => {
      setTypingUsers((prev) => {
        const updated = new Map(prev);
        updated.set(data.userId, data.userName);
        return updated;
      });
    });

    socketService.onUserStopTyping(() => {
      setTypingUsers((prev) => {
        const updated = new Map(prev);
        updated.clear();
        return updated;
      });
    });

    socketService.onUserStatus((data) => {
      setOnlineUsers((prev) => {
        const updated = new Set(prev);
        if (data.status === "online") {
          updated.add(data.userId);
        } else {
          updated.delete(data.userId);
        }
        return updated;
      });
    });
  }, [fetchConversations]);

  // Fetch messages for conversation
  const fetchMessages = useCallback(async (conversationId, limit = 20, offset = 0) => {
    try {
      setLoading(true);
      const response = await chatAPI.getMessages(conversationId, limit, offset);
      setMessages(response.data.messages || []);
      setError(null);
    } catch (err) {
      console.error("Fetch messages error:", err);
      setError(err.response?.data?.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, []);

  // Open conversation
  const openConversation = useCallback(async (conversationId) => {
    try {
      setLoading(true);
      const response = await chatAPI.getConversation(conversationId);
      setCurrentConversation(response.data.data);
      socketService.joinConversation(conversationId);

      // Fetch messages
      await fetchMessages(conversationId);

      // Mark messages as read
      await chatAPI.markMessagesRead(conversationId);

      setError(null);
    } catch (err) {
      console.error("Open conversation error:", err);
      setError(err.response?.data?.message || "Failed to open conversation");
    } finally {
      setLoading(false);
    }
  }, [fetchMessages]);

  // Start conversation
  const startConversation = useCallback(async (contractId) => {
    try {
      setLoading(true);
      const response = await chatAPI.startConversation(contractId);
      const conversation = response.data.data;
      setConversations((prev) => [conversation, ...prev]);
      await openConversation(conversation.id);
      setError(null);
      return conversation;
    } catch (err) {
      console.error("Start conversation error:", err);
      setError(err.response?.data?.message || "Failed to start conversation");
    } finally {
      setLoading(false);
    }
  }, [openConversation]);

  // Send message
  const sendMessage = useCallback(
    async (content) => {
      if (!currentConversation || !content.trim()) return;

      try {
        socketService.emitStopTyping(currentConversation.id);
        const response = await chatAPI.sendMessage(currentConversation.id, content);
        const message = response.data.data;

        setMessages((prev) => [...prev, message]);
        setError(null);

        return message;
      } catch (err) {
        console.error("Send message error:", err);
        setError(err.response?.data?.message || "Failed to send message");
      }
    },
    [currentConversation]
  );

  // Close conversation
  const closeConversation = useCallback(() => {
    if (currentConversation) {
      socketService.leaveConversation(currentConversation.id);
    }
    setCurrentConversation(null);
    setMessages([]);
  }, [currentConversation]);

  // Emit typing
  const emitTyping = useCallback(() => {
    if (currentConversation && user) {
      socketService.emitTyping(currentConversation.id, user.id, user.name);
    }
  }, [currentConversation, user]);

  // Emit stop typing
  const emitStopTyping = useCallback(() => {
    if (currentConversation) {
      socketService.emitStopTyping(currentConversation.id);
    }
  }, [currentConversation]);

  // Check if user is online
  const isUserOnline = useCallback((userId) => {
    return onlineUsers.has(userId);
  }, [onlineUsers]);

  // Get typing users
  const getTypingUsers = useCallback(() => {
    return Array.from(typingUsers.values());
  }, [typingUsers]);

  const value = {
    conversations,
    currentConversation,
    messages,
    unreadCount,
    loading,
    error,
    onlineUsers,
    typingUsers,
    fetchConversations,
    fetchMessages,
    openConversation,
    startConversation,
    sendMessage,
    closeConversation,
    fetchUnreadCount,
    emitTyping,
    emitStopTyping,
    isUserOnline,
    getTypingUsers,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
