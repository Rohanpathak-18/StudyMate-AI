import { useEffect, useState } from "react";
import { Send, Bot, User, FileText } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const Chat = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentsLoading, setDocumentsLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await api.get("/documents");

        const readyDocuments = (
          response.data.documents || []
        ).filter(
          (document) => document.status === "ready"
        );

        setDocuments(readyDocuments);

        if (readyDocuments.length > 0) {
          setSelectedDocument(readyDocuments[0]._id);
        }
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load documents"
        );
      } finally {
        setDocumentsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    if (documents.length === 0) {
      toast.error("Upload and index a document first");
      return;
    }

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
      // Your current backend/RAG chat accepts message only.
      const response = await api.post("/chat", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response.data.answer ||
            "I could not generate a response.",
          sources: response.data.sources || [],
        },
      ]);
    } catch (error) {
      console.error("AI Tutor error:", error);

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.detail;

      toast.error(
        backendMessage || "AI Tutor failed to respond"
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            backendMessage ||
            "Sorry, I couldn't process your question.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const selectedDocumentName =
    documents.find(
      (document) =>
        document._id === selectedDocument
    )?.originalName;

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F1F7FF] p-6">
      <div className="mx-auto flex h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <div className="mb-5">
          <h1 className="text-3xl font-bold">
            AI Tutor
          </h1>

          <p className="mt-1 text-[#7890A8]">
            Ask questions about your study material.
          </p>
        </div>

        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[#16324A] bg-[#0B1728] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00E5FF]/10">
              <FileText
                size={18}
                className="text-[#00E5FF]"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#7890A8]">
                Study source
              </p>

              <p className="mt-1 text-sm font-semibold">
                {selectedDocumentName ||
                  "No document selected"}
              </p>
            </div>
          </div>

          <select
            value={selectedDocument}
            onChange={(e) => {
              setSelectedDocument(e.target.value);
              setMessages([]);
            }}
            disabled={
              documentsLoading ||
              documents.length === 0
            }
            className="rounded-xl border border-[#16324A] bg-[#07111F] px-4 py-3 text-sm text-[#F1F7FF] outline-none focus:border-[#00E5FF]"
          >
            {documentsLoading && (
              <option>
                Loading documents...
              </option>
            )}

            {!documentsLoading &&
              documents.length === 0 && (
                <option>
                  No ready documents
                </option>
              )}

            {documents.map((document) => (
              <option
                key={document._id}
                value={document._id}
              >
                {document.originalName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto rounded-2xl border border-[#16324A] bg-[#0B1728] p-5">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <Bot
                  size={50}
                  className="mx-auto mb-4 text-[#00E5FF]"
                />

                <h2 className="text-xl font-semibold">
                  Ask StudyMate AI
                </h2>

                <p className="mt-2 max-w-md text-[#7890A8]">
                  Ask anything about the study material you
                  have uploaded.
                </p>
              </div>
            </div>
          ) : (
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
                    className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-[#00E5FF] text-[#07111F]"
                        : "border border-[#16324A] bg-[#07111F]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-7">
                      {msg.content}
                    </p>
                  </div>

                  {msg.role === "user" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20">
                      <User
                        size={18}
                        className="text-[#A78BFA]"
                      />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00E5FF]/10">
                    <Bot
                      size={18}
                      className="text-[#00E5FF]"
                    />
                  </div>

                  <div className="rounded-2xl border border-[#16324A] bg-[#07111F] px-4 py-3 text-[#7890A8]">
                    StudyMate is thinking...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={sendMessage}
          className="mt-4 flex gap-3"
        >
          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            disabled={loading}
            placeholder={
              documents.length
                ? "Ask something about your study material..."
                : "Upload a document first..."
            }
            className="flex-1 rounded-xl border border-[#16324A] bg-[#0B1728] px-4 py-3 outline-none placeholder:text-[#7890A8] focus:border-[#00E5FF] disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={
              loading ||
              !message.trim() ||
              documents.length === 0
            }
            className="flex items-center gap-2 rounded-xl bg-[#00E5FF] px-5 py-3 font-semibold text-[#07111F] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={18} />
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;