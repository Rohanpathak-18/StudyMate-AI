import { Trophy, RotateCcw } from "lucide-react";

const QuizResult = ({
  score,
  total,
  onRestart,
}) => {
  const percentage =
    total > 0
      ? Math.round(
          (score / total) * 100
        )
      : 0;

  return (
    <div className="rounded-3xl border border-[#16324A] bg-[#0B1728] p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A3FF12]/10">
        <Trophy
          size={30}
          className="text-[#A3FF12]"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        Quiz Complete
      </h2>

      <p className="mt-2 text-[#7890A8]">
        Your score
      </p>

      <div className="mt-4 text-5xl font-bold text-[#00E5FF]">
        {score}/{total}
      </div>

      <p className="mt-2 text-sm text-[#7890A8]">
        {percentage}% correct
      </p>

      <button
        onClick={onRestart}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#00E5FF] px-6 py-3 font-bold text-[#07111F]"
      >
        <RotateCcw size={17} />
        New Quiz
      </button>
    </div>
  );
};

export default QuizResult;