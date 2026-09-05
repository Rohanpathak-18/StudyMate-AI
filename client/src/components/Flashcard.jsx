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
        setFlipped((prev) => !prev)
      }
      className="min-h-[260px] w-full rounded-2xl border border-[#16324A] bg-[#0B1728] p-8 text-left transition hover:border-[#00E5FF]/40"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E5FF]">
        {flipped ? "Answer" : "Question"}
      </p>

      <div className="flex min-h-[190px] items-center justify-center text-center">
        <p className="text-xl font-semibold leading-8 text-[#F1F7FF]">
          {flipped ? back : front}
        </p>
      </div>

      <p className="text-center text-xs text-[#7890A8]">
        Click to flip
      </p>
    </button>
  );
};

export default Flashcard;