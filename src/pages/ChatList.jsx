import { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { MessageCircle, Search, AlertCircle } from "lucide-react";

export default function ChatList() {
  const { user } = useAuth();
  const {
    conversations,
    unreadCount,
    loading,
    error,
    openConversation,
    fetchConversations,
    fetchUnreadCount,
    isUserOnline,
    currentConversation,
  } = useChat();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchConversations();
    fetchUnreadCount();

    // Refresh unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchConversations, fetchUnreadCount]);

  const filteredConversations = conversations.filter((conv) => {
    const otherUser =
      conv.clientId === user?.id ? conv.freelancer : conv.client;
    return otherUser?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatLastMessage = (message, limit = 50) => {
    if (!message) return "No messages yet";
    return message.length > limit
      ? message.substring(0, limit) + "..."
      : message;
  };

  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInSeconds = Math.floor((now - messageDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return messageDate.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && conversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading conversations...</p>
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
            <MessageCircle size={48} className="mb-4 text-gray-300" />
            <p className="text-lg font-medium">
              {conversations.length === 0
                ? "No conversations yet"
                : "No matches found"}
            </p>
            {conversations.length === 0 && (
              <p className="text-sm mt-2">
                Start a conversation to begin messaging
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredConversations.map((conversation) => {
              const otherUser =
                conversation.clientId === user?.id
                  ? conversation.freelancer
                  : conversation.client;
              const isOnline = isUserOnline(otherUser.id);
              const isSelected = currentConversation?.id === conversation.id;

              return (
                <button
                  key={conversation.id}
                  onClick={() => openConversation(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    isSelected ? "bg-blue-50 border-l-4 border-blue-500" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${otherUser.profile_image}` || "https://via.placeholder.com/48"}
                        alt={otherUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {otherUser.name}
                        </h3>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {formatTime(conversation.lastMessageAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage
                          ? conversation.lastMessageSenderId === user?.id
                            ? "You: " + formatLastMessage(conversation.lastMessage)
                            : formatLastMessage(conversation.lastMessage)
                          : "No messages yet"}
                      </p>
                    </div>

                    {/* Unread Badge */}
                    {conversation.unreadCount > 0 && (
                      <div className="flex-shrink-0 ml-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
