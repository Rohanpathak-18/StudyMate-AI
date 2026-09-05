import { LoaderCircle } from "lucide-react";

const Loader = ({
  text = "Loading...",
  fullscreen = false,
}) => {
  const content = (
    <div className="flex items-center justify-center gap-3 text-[#7890A8]">
      <LoaderCircle
        size={20}
        className="animate-spin text-[#00E5FF]"
      />

      <span className="text-sm">
        {text}
      </span>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;