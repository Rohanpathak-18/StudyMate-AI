import { useEffect, useState } from "react";
import { Layers3 } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";
import Flashcard from "../components/Flashcard";

const Flashcards = () => {
  const [documents, setDocuments] =
    useState([]);

  const [documentId, setDocumentId] =
    useState("");

  const [flashcards, setFlashcards] =
    useState(null);

  const [index, setIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [generating, setGenerating] =
    useState(false);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response =
          await api.get("/documents");

        const readyDocuments = (
          response.data.documents || []
        ).filter(
          (document) =>
            document.status === "ready"
        );

        setDocuments(readyDocuments);

        if (readyDocuments.length > 0) {
          setDocumentId(
            readyDocuments[0]._id
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load documents"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const generateFlashcards =
    async () => {
      if (!documentId) {
        toast.error(
          "Upload a document first"
        );
        return;
      }

      setGenerating(true);

      try {
        const response =
          await api.post(
            "/flashcards/generate",
            {
              documentId,
              count: 10,
            }
          );

        setFlashcards(
          response.data.flashcards
        );

        setIndex(0);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to generate flashcards"
        );
      } finally {
        setGenerating(false);
      }
    };

  const reset = () => {
    setFlashcards(null);
    setIndex(0);
  };

  const currentCard =
    flashcards?.cards?.[index];

  return (
    <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
      <div className="mx-auto max-w-4xl py-8">
        <div className="flex items-center gap-2 text-[#00E5FF]">
          <Layers3 size={17} />

          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            Revision
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold">
          Flashcards
        </h1>

        <p className="mt-2 text-[#7890A8]">
          Turn your study material into quick revision cards.
        </p>

        {!flashcards ? (
          <div className="mt-8 rounded-3xl border border-[#16324A] bg-[#0B1728] p-6">
            <label className="text-sm font-semibold">
              Study document
            </label>

            <select
              value={documentId}
              onChange={(e) =>
                setDocumentId(
                  e.target.value
                )
              }
              disabled={loading}
              className="mt-3 w-full rounded-xl border border-[#16324A] bg-[#07111F] p-3 outline-none focus:border-[#00E5FF]"
            >
              {documents.length === 0 && (
                <option value="">
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

            <button
              onClick={generateFlashcards}
              disabled={
                generating ||
                !documentId
              }
              className="mt-5 rounded-xl bg-[#00E5FF] px-6 py-3 font-bold text-[#07111F] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {generating
                ? "Generating..."
                : "Generate Flashcards"}
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <Flashcard
              front={currentCard.front}
              back={currentCard.back}
            />

            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() =>
                  setIndex(
                    (value) =>
                      Math.max(
                        value - 1,
                        0
                      )
                  )
                }
                disabled={index === 0}
                className="rounded-xl border border-[#16324A] px-5 py-3 disabled:opacity-30"
              >
                Previous
              </button>

              <span className="text-sm text-[#7890A8]">
                {index + 1} /{" "}
                {flashcards.cards.length}
              </span>

              <button
                onClick={() =>
                  setIndex(
                    (value) =>
                      Math.min(
                        value + 1,
                        flashcards.cards
                          .length - 1
                      )
                  )
                }
                disabled={
                  index ===
                  flashcards.cards.length - 1
                }
                className="rounded-xl bg-[#00E5FF] px-5 py-3 font-bold text-[#07111F] disabled:opacity-30"
              >
                Next
              </button>
            </div>

            <button
              onClick={reset}
              className="mt-6 w-full rounded-xl border border-[#16324A] px-5 py-3 text-sm font-medium text-[#7890A8] hover:border-[#00E5FF]/40 hover:text-[#F1F7FF]"
            >
              Generate another set
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;