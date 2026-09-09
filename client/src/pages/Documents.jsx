import { useEffect, useState } from "react";
import { FileStack, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";
import DocumentUpload from "../components/DocumentUpload";
import DocumentList from "../components/DocumentList";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/documents");

      setDocuments(response.data.documents || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load documents"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = (document) => {
    setDocuments((current) => [document, ...current]);
  };

  const handleDelete = async (documentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/documents/${documentId}`);

      setDocuments((current) =>
        current.filter((document) => document._id !== documentId)
      );

      toast.success("Document deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete document"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F1F7FF]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <div className="mb-7 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00E5FF]/10">
                <FileStack className="text-[#00E5FF]" />
              </div>

              <span className="text-sm font-medium uppercase tracking-wider text-[#00E5FF]">
                Study Library
              </span>
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Your Documents
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7890A8] sm:text-base">
              Upload your study material and use it later for AI-powered
              learning, quizzes, summaries and flashcards.
            </p>
          </div>

          <button
            onClick={fetchDocuments}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#16324A] bg-[#0B1728] px-4 py-3 text-sm font-medium text-[#F1F7FF] transition hover:border-[#00E5FF]/50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-8">
          <div>
            <DocumentUpload onUpload={handleUpload} />
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Uploaded Documents
                </h2>

                <p className="mt-1 text-sm text-[#7890A8]">
                  {documents.length}{" "}
                  {documents.length === 1
                    ? "document"
                    : "documents"}
                </p>
              </div>
            </div>

            <DocumentList
              documents={documents}
              loading={loading}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;