import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";
import QuizCard from "../components/QuizCard";
import QuizResult from "../components/QuizResult";

const Quiz = () => {
  const [documents, setDocuments] =
    useState([]);

  const [documentId, setDocumentId] =
    useState("");

  const [quiz, setQuiz] =
    useState(null);

  const [answers, setAnswers] =
    useState([]);

  const [result, setResult] =
    useState(null);

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

  const generateQuiz = async () => {
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
          "/quizzes/generate",
          {
            documentId,
            count: 5,
          }
        );

      const generatedQuiz =
        response.data.quiz;

      setQuiz(generatedQuiz);

      setAnswers(
        new Array(
          generatedQuiz.questions.length
        ).fill(null)
      );

      setResult(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to generate quiz"
      );
    } finally {
      setGenerating(false);
    }
  };

  const selectAnswer = (
    questionIndex,
    optionIndex
  ) => {
    setAnswers((current) => {
      const next = [...current];

      next[questionIndex] =
        optionIndex;

      return next;
    });
  };

  const submitQuiz = async () => {
    if (
      answers.some(
        (answer) => answer === null
      )
    ) {
      toast.error(
        "Please answer every question"
      );
      return;
    }

    try {
      const response =
        await api.post(
          "/quizzes/submit",
          {
            quizId: quiz._id,
            answers,
          }
        );

      setResult(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit quiz"
      );
    }
  };

  const restart = () => {
    setQuiz(null);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
        <div className="mx-auto max-w-3xl py-10">
          <QuizResult
            score={result.score}
            total={result.total}
            onRestart={restart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
      <div className="mx-auto max-w-4xl py-8">
        <div className="flex items-center gap-2 text-[#A3FF12]">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            AI Practice
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold">
          Smart Quiz
        </h1>

        <p className="mt-2 text-[#7890A8]">
          Generate questions from your study material.
        </p>

        {!quiz && (
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
              onClick={generateQuiz}
              disabled={
                generating ||
                !documentId
              }
              className="mt-5 rounded-xl bg-[#A3FF12] px-6 py-3 font-bold text-[#07111F] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {generating
                ? "Generating..."
                : "Generate Quiz"}
            </button>
          </div>
        )}

        {quiz && (
          <div className="mt-8 space-y-5">
            {quiz.questions.map(
              (question, index) => (
                <QuizCard
                  key={index}
                  question={question}
                  index={index}
                  selectedAnswer={
                    answers[index]
                  }
                  onSelect={(optionIndex) =>
                    selectAnswer(
                      index,
                      optionIndex
                    )
                  }
                />
              )
            )}

            <button
              onClick={submitQuiz}
              className="w-full rounded-xl bg-[#00E5FF] px-6 py-4 font-bold text-[#07111F]"
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;