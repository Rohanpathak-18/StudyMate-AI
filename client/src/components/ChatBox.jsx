import {
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

import api from "../services/api";
import ChatMessages from "./ChatMessages";

const Chat = ({
  documentId = null,
}) => {
  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const textareaRef =
    useRef(null);

  const messagesEndRef =
    useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }, [messages, loading]);

  const sendMessage = async () => {
    const message =
      input.trim();

    if (!message) {
      return;
    }

    if (loading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response =
        await api.post(
          "/chat",
          {
            message,
            ...(documentId
              ? {
                  documentId,
                }
              : {}),
          }
        );

      const data = response.data;

      const answer =
        data?.answer ||
        data?.message ||
        "I could not generate an answer.";

      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: answer,
        sources:
          data?.sources || [],
      };

      setMessages((current) => [
        ...current,
        aiMessage,
      ]);
    } catch (error) {
      console.error(
        "CHAT COMPONENT ERROR:",
        error
      );

      toast.error(
        error.response?.data
          ?.message ||
          "AI Tutor failed to respond"
      );
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-full min-h-[600px] flex-col overflow-hidden rounded-3xl border border-[#16324A] bg-[#07111F]">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#16324A] bg-[#0B1728]/80 px-4 py-4 backdrop-blur-xl md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/10 text-[#00E5FF]">
            <Sparkles size={19} />
          </div>

          <div>
            <h2 className="font-bold">
              AI Tutor
            </h2>

            <p className="text-[11px] text-[#7890A8]">
              Grounded in your study material
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            className="flex items-center gap-2 rounded-xl border border-[#16324A] px-3 py-2 text-xs text-[#7890A8] transition hover:border-red-400/30 hover:text-red-300"
          >
            <Trash2 size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <ChatMessages
        messages={messages}
        loading={loading}
      />

      <div ref={messagesEndRef} />

      {/* Input */}
      <div className="border-t border-[#16324A] bg-[#0B1728]/80 p-4">
        <div className="flex items-end gap-3 rounded-2xl border border-[#16324A] bg-[#07111F] p-2 focus-within:border-[#00E5FF]/40">

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) =>
              setInput(
                event.target.value
              )
            }
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask something about your study material..."
            disabled={loading}
            className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-[#F1F7FF] outline-none placeholder:text-[#7890A8]"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={
              loading ||
              !input.trim()
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00E5FF] text-[#07111F] transition hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </div>

        <p className="mt-2 px-2 text-[10px] text-[#7890A8]">
          Enter to send • Shift + Enter for a new line
        </p>
      </div>
    </div>
  );
};

export default Chat;