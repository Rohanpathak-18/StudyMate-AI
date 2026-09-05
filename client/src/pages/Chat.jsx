import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/chat", {
  message: userMessage,
  documentId
});

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          sources: response.data.sources || [],
        },
      ]);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to get AI response"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F1F7FF] p-6">
      <div className="mx-auto flex h-[calc(100vh-3rem)] max-w-5xl flex-col">

        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            StudyMate AI
          </h1>

          <p className="mt-1 text-[#7890A8]">
            Ask questions about your study material
          </p>
        </div>

        <div className="flex-1 overflow-y-auto rounded-2xl border border-[#16324A] bg-[#0B1728] p-5">

          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <Bot
                  size={50}
                  className="mx-auto mb-4 text-[#00E5FF]"
                />

                <h2 className="text-xl font-semibold">
                  Ask StudyMate AI
                </h2>

                <p className="mt-2 text-[#7890A8]">
                  Upload your documents and ask questions
                  about them.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00E5FF]/10">
                    <Bot
                      size={18}
                      className="text-[#00E5FF]"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[#00E5FF] text-[#07111F]"
                      : "border border-[#16324A] bg-[#07111F]"
                  }`}
                >
                  <p className="whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>

                {msg.role === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20">
                    <User
                      size={18}
                      className="text-[#7C3AED]"
                    />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00E5FF]/10">
                  <Bot
                    size={18}
                    className="text-[#00E5FF]"
                  />
                </div>

                <div className="rounded-2xl border border-[#16324A] bg-[#07111F] px-4 py-3 text-[#7890A8]">
                  Thinking...
                </div>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={sendMessage}
          className="mt-4 flex gap-3"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something about your documents..."
            className="flex-1 rounded-xl border border-[#16324A] bg-[#0B1728] px-4 py-3 outline-none placeholder:text-[#7890A8] focus:border-[#00E5FF]"
          />

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="flex items-center gap-2 rounded-xl bg-[#00E5FF] px-5 py-3 font-semibold text-[#07111F] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={18} />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;