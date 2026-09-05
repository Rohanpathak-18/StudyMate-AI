import { useState } from "react";

const Flashcard = ({
  front,
  back,
}) => {
  const [flipped, setFlipped] =
    useState(false);

  return (
    <button
      type="button"
      onClick={() =>
        setFlipped((value) => !value)
      }
      className="w-full rounded-3xl border border-[#16324A] bg-[#0B1728] p-8 text-left transition hover:border-[#00E5FF]/40"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00E5FF]">
          {flipped ? "Answer" : "Question"}
        </span>

        <span className="text-xs text-[#7890A8]">
          Click to flip
        </span>
      </div>

      <div className="flex min-h-[280px] items-center justify-center text-center">
        <p className="max-w-2xl text-2xl font-semibold leading-10">
          {flipped ? back : front}
        </p>
      </div>
    </button>
  );
};

export default Flashcard;