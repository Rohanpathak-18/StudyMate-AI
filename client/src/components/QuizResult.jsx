import { Trophy } from "lucide-react";

const QuizResult = ({
  score,
  total,
  onRestart,
}) => {
  const percentage =
    total === 0
      ? 0
      : Math.round(
          (score / total) * 100
        );

  return (
    <div className="rounded-2xl border border-[#16324A] bg-[#0B1728] p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A3FF12]/10">
        <Trophy
          className="text-[#A3FF12]"
          size={30}
        />
      </div>

      <h2 className="mt-5 text-2xl font-bold">
        Quiz Complete
      </h2>

      <p className="mt-2 text-[#7890A8]">
        You scored
      </p>

      <p className="mt-3 text-5xl font-bold text-[#00E5FF]">
        {score}/{total}
      </p>

      <p className="mt-2 text-sm text-[#7890A8]">
        {percentage}% correct
      </p>

      <button
        onClick={onRestart}
        className="mt-7 rounded-xl bg-[#00E5FF] px-6 py-3 font-bold text-[#07111F]"
      >
        Take Another Quiz
      </button>
    </div>
  );
};

export default QuizResult;