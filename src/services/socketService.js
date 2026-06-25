import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(token) {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      auth: {
        token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ["websocket", "polling"],
    });

    // Connection events
    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
      this.notifyListeners("connected");
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
      this.notifyListeners("disconnected");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.notifyListeners("error", error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // ========== EVENT EMITTERS ==========

  // User online
  emitUserOnline(userId) {
    if (this.socket?.connected) {
      this.socket.emit("user_online", userId);
    }
  }

  // User offline
  emitUserOffline(userId) {
    if (this.socket?.connected) {
      this.socket.emit("user_offline", userId);
    }
  }

  // Join conversation
  joinConversation(conversationId) {
    if (this.socket?.connected) {
      this.socket.emit("join_conversation", conversationId);
    }
  }

  // Leave conversation
  leaveConversation(conversationId) {
    if (this.socket?.connected) {
      this.socket.emit("leave_conversation", conversationId);
    }
  }

  // User typing
  emitTyping(conversationId, userId, userName) {
    if (this.socket?.connected) {
      this.socket.emit("user_typing", {
        conversationId,
        userId,
        userName,
      });
    }
  }

  // User stop typing
  emitStopTyping(conversationId) {
    if (this.socket?.connected) {
      this.socket.emit("user_stop_typing", conversationId);
    }
  }

  // Message read
  emitMessageRead(conversationId, userId, messageId) {
    if (this.socket?.connected) {
      this.socket.emit("message_read", {
        conversationId,
        userId,
        messageId,
      });
    }
  }

  // ========== EVENT LISTENERS ==========

  // Listen for received messages
  onReceiveMessage(callback) {
    if (this.socket) {
      this.socket.off("receive_message");
      this.socket.on("receive_message", callback);
    }
  }

  // Listen for messages read
  onMessagesRead(callback) {
    if (this.socket) {
      this.socket.off("messages_read");
      this.socket.on("messages_read", callback);
    }
  }

  // Listen for user typing
  onUserTyping(callback) {
    if (this.socket) {
      this.socket.off("user_typing");
      this.socket.on("user_typing", callback);
    }
  }

  // Listen for user stop typing
  onUserStopTyping(callback) {
    if (this.socket) {
      this.socket.off("user_stop_typing");
      this.socket.on("user_stop_typing", callback);
    }
  }

  // Listen for user status (online/offline)
  onUserStatus(callback) {
    if (this.socket) {
      this.socket.off("user_status");
      this.socket.on("user_status", callback);
    }
  }

  // Listen for message read receipt
  onMessageRead(callback) {
    if (this.socket) {
      this.socket.off("message_read");
      this.socket.on("message_read", callback);
    }
  }

  // ========== INTERNAL UTILITIES ==========

  registerListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  notifyListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => callback(data));
    }
  }

  removeListener(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

export default new SocketService();
