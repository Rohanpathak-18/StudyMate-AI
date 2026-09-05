import { useEffect, useState } from "react";
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
    useState(false);


  useEffect(() => {
    const loadDocuments =
      async () => {
        try {
          const response =
            await api.get(
              "/documents"
            );

          setDocuments(
            response.data.documents ||
              []
          );
        } catch {
          toast.error(
            "Failed to load documents"
          );
        }
      };

    loadDocuments();
  }, []);


  const generate =
    async () => {
      if (!documentId) {
        toast.error(
          "Select a document first"
        );
        return;
      }

      setLoading(true);

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
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to generate flashcards"
        );
      } finally {
        setLoading(false);
      }
    };


  return (
    <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
      <div className="mx-auto max-w-3xl py-8">

        <h1 className="text-3xl font-bold">
          Flashcards
        </h1>

        <p className="mt-2 text-[#7890A8]">
          Revise important concepts quickly.
        </p>

        {!flashcards && (
          <div className="mt-8 rounded-2xl border border-[#16324A] bg-[#0B1728] p-6">

            <select
              value={documentId}
              onChange={(e) =>
                setDocumentId(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-[#16324A] bg-[#07111F] p-3 text-[#F1F7FF]"
            >
              <option value="">
                Select a document
              </option>

              {documents
                .filter(
                  (document) =>
                    document.status ===
                    "ready"
                )
                .map(
                  (document) => (
                    <option
                      key={document._id}
                      value={document._id}
                    >
                      {document.originalName}
                    </option>
                  )
                )}
            </select>

            <button
              onClick={generate}
              disabled={loading}
              className="mt-5 rounded-xl bg-[#00E5FF] px-6 py-3 font-bold text-[#07111F]"
            >
              {loading
                ? "Generating..."
                : "Generate Flashcards"}
            </button>
          </div>
        )}

        {flashcards && (
          <div className="mt-8">

            <Flashcard
              front={
                flashcards.cards[index]
                  .front
              }
              back={
                flashcards.cards[index]
                  .back
              }
            />

            <div className="mt-5 flex items-center justify-between">

              <button
                disabled={index === 0}
                onClick={() =>
                  setIndex(
                    (current) =>
                      current - 1
                  )
                }
                className="rounded-xl border border-[#16324A] px-5 py-3 disabled:opacity-30"
              >
                Previous
              </button>

              <span className="text-sm text-[#7890A8]">
                {index + 1} /{" "}
                {flashcards.cards.length}
              </span>

              <button
                disabled={
                  index ===
                  flashcards.cards.length - 1
                }
                onClick={() =>
                  setIndex(
                    (current) =>
                      current + 1
                  )
                }
                className="rounded-xl bg-[#00E5FF] px-5 py-3 font-bold text-[#07111F] disabled:opacity-30"
              >
                Next
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;