import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useChat } from "../context/ChatContext";

export default function Chat() {
  const { user } = useAuth();
  const { currentConversation } = useChat();

  useEffect(() => {
    // Verify user has access to chat
    if (user && !["CLIENT", "FREELANCER"].includes(user.role)) {
      // Redirect if not allowed
      window.location.href = "/";
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {/* Chat List */}
          <div className="md:col-span-1">
            <ChatList />
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 hidden md:block">
            <ChatWindow />
          </div>

          {/* Mobile Chat Window */}
          {currentConversation && (
            <div className="md:hidden col-span-1">
              <ChatWindow />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
