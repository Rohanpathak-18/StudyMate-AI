import { useEffect, useState } from "react";
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
        } catch (error) {
          toast.error(
            "Failed to load documents"
          );
        }
      };

    loadDocuments();
  }, []);


  const generateQuiz =
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
            "/quizzes/generate",
            {
              documentId,
              count: 5,
            }
          );

        setQuiz(
          response.data.quiz
        );

        setAnswers(
          new Array(
            response.data.quiz
              .questions.length
          ).fill(null)
        );

        setResult(null);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to generate quiz"
        );
      } finally {
        setLoading(false);
      }
    };


  const selectAnswer = (
    questionIndex,
    optionIndex
  ) => {
    setAnswers((current) => {
      const updated = [
        ...current,
      ];

      updated[questionIndex] =
        optionIndex;

      return updated;
    });
  };


  const submitQuiz =
    async () => {
      if (
        answers.some(
          (answer) =>
            answer === null
        )
      ) {
        toast.error(
          "Answer all questions first"
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
          "Failed to submit quiz"
        );
      }
    };


  if (result) {
    return (
      <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
        <div className="mx-auto max-w-3xl pt-10">
          <QuizResult
            score={result.score}
            total={result.total}
            onRestart={() =>
              setQuiz(null)
            }
          />
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
      <div className="mx-auto max-w-4xl py-8">

        <h1 className="text-3xl font-bold">
          Smart Quiz
        </h1>

        <p className="mt-2 text-[#7890A8]">
          Test yourself using your study material.
        </p>

        {!quiz && (
          <div className="mt-8 rounded-2xl border border-[#16324A] bg-[#0B1728] p-6">

            <label className="text-sm font-semibold">
              Choose document
            </label>

            <select
              value={documentId}
              onChange={(e) =>
                setDocumentId(
                  e.target.value
                )
              }
              className="mt-3 w-full rounded-xl border border-[#16324A] bg-[#07111F] p-3 text-[#F1F7FF] outline-none"
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
              onClick={generateQuiz}
              disabled={loading}
              className="mt-5 rounded-xl bg-[#00E5FF] px-6 py-3 font-bold text-[#07111F] disabled:opacity-40"
            >
              {loading
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
                  onSelect={(
                    optionIndex
                  ) =>
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
              className="w-full rounded-xl bg-[#A3FF12] px-6 py-4 font-bold text-[#07111F]"
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