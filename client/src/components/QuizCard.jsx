const QuizCard = ({
  question,
  index,
  selectedAnswer,
  onSelect,
}) => {
  return (
    <div className="rounded-2xl border border-[#16324A] bg-[#0B1728] p-6">
      <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">
        Question {index + 1}
      </span>

      <h3 className="mt-3 text-lg font-semibold leading-7">
        {question.question}
      </h3>

      <div className="mt-5 space-y-3">
        {question.options.map(
          (option, optionIndex) => (
            <button
              key={optionIndex}
              type="button"
              onClick={() =>
                onSelect(optionIndex)
              }
              className={`w-full rounded-xl border p-4 text-left text-sm transition ${
                selectedAnswer === optionIndex
                  ? "border-[#00E5FF] bg-[#00E5FF]/10 text-white"
                  : "border-[#16324A] bg-[#07111F] text-[#7890A8] hover:border-[#00E5FF]/40"
              }`}
            >
              <span className="mr-3 font-bold text-[#00E5FF]">
                {String.fromCharCode(
                  65 + optionIndex
                )}
                .
              </span>

              {option}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default QuizCard;