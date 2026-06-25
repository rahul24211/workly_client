import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { MessageCircle } from "lucide-react";
import { chatAPI } from "../services/chatApi";

export default function MessageButton({ freelancerId }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startConversation } = useChat();

  const [canChat, setCanChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contractId, setContractId] = useState(null);

  // Check chat permission
  useEffect(() => {
    const checkPermission = async () => {
      try {
        // Only clients can initiate chat
        if (user?.role !== "CLIENT") return;

        const response = await chatAPI.checkChatPermission(freelancerId);
        if (response.data.canChat) {
          setCanChat(true);
          setContractId(response.data.contractId);
        }
      } catch (err) {
        console.error("Check permission error:", err);
        // Silently fail - button just won't show
      }
    };

    if (freelancerId && user?.id !== freelancerId) {
      checkPermission();
    }
  }, [freelancerId, user]);

  const handleMessageClick = async () => {
    if (!contractId) return;

    try {
      setLoading(true);
      await startConversation(contractId);
      navigate("/chat");
    } catch (err) {
      setError(err.message || "Failed to start conversation");
    } finally {
      setLoading(false);
    }
  };

  if (!canChat) return null;

  return (
    <button
      onClick={handleMessageClick}
      disabled={loading}
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-semibold"
    >
      <MessageCircle size={20} />
      {loading ? "Starting chat..." : "Message"}
    </button>
  );
}
