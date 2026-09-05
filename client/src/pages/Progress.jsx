import { useEffect, useState } from "react";
import {
  FileText,
  MessageCircle,
  Trophy,
  Layers3,
  TrendingUp,
} from "lucide-react";
import api from "../services/api";

const Progress = () => {
  const [documents, setDocuments] =
    useState([]);

  const [quizzes, setQuizzes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const [documentResponse, quizResponse] =
          await Promise.allSettled([
            api.get("/documents"),
            api.get("/quizzes"),
          ]);

        if (
          documentResponse.status === "fulfilled"
        ) {
          setDocuments(
            documentResponse.value.data
              .documents || []
          );
        }

        if (
          quizResponse.status === "fulfilled"
        ) {
          setQuizzes(
            quizResponse.value.data.quizzes ||
              []
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  const completedQuizzes =
    quizzes.filter(
      (quiz) => quiz.completed
    );

  const averageScore =
    completedQuizzes.length === 0
      ? 0
      : Math.round(
          completedQuizzes.reduce(
            (sum, quiz) =>
              sum +
              (quiz.total
                ? (quiz.score / quiz.total) *
                  100
                : 0),
            0
          ) / completedQuizzes.length
        );

  const stats = [
    {
      label: "Documents",
      value: documents.length,
      icon: FileText,
      description: "Study materials",
    },
    {
      label: "Ready documents",
      value: documents.filter(
        (doc) => doc.status === "ready"
      ).length,
      icon: Layers3,
      description: "Available for AI",
    },
    {
      label: "Quizzes completed",
      value: completedQuizzes.length,
      icon: Trophy,
      description: "Practice sessions",
    },
    {
      label: "Average score",
      value: `${averageScore}%`,
      icon: TrendingUp,
      description: "Quiz performance",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
      <div className="mx-auto max-w-6xl py-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
          Analytics
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Your Progress
        </h1>

        <p className="mt-2 text-[#7890A8]">
          Track your learning activity in StudyMate AI.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#16324A] bg-[#0B1728] p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00E5FF]/10">
                  <Icon
                    size={20}
                    className="text-[#00E5FF]"
                  />
                </div>

                <p className="mt-5 text-3xl font-bold">
                  {loading ? "--" : stat.value}
                </p>

                <p className="mt-1 text-sm font-medium">
                  {stat.label}
                </p>

                <p className="mt-1 text-xs text-[#7890A8]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-[#16324A] bg-[#0B1728] p-6">
          <div className="flex items-center gap-3">
            <MessageCircle
              size={20}
              className="text-[#7C3AED]"
            />

            <div>
              <h2 className="font-semibold">
                Learning overview
              </h2>

              <p className="mt-1 text-sm text-[#7890A8]">
                Keep uploading material and practicing
                quizzes to build your learning history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;