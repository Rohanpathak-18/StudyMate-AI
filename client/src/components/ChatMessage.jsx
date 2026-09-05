import ChatMessage from "./ChatMessage";
import Loader from "./Loader";

const ChatMessages = ({
  messages = [],
  loading = false,
}) => {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 md:px-6">
      {messages.length === 0 &&
        !loading && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00E5FF]/20 bg-[#00E5FF]/10 text-[#00E5FF]">
                <span className="text-xl">
                  ✦
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Study with your AI Tutor
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7890A8]">
                Ask questions about your
                uploaded documents and get
                answers grounded in your study
                material.
              </p>
            </div>
          </div>
        )}

      {messages.map(
        (message, index) => (
          <ChatMessage
            key={
              message?.id ||
              message?._id ||
              index
            }
            message={message}
          />
        )
      )}

      {loading && (
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/10 text-[#00E5FF]">
            ✦
          </div>

          <div className="rounded-2xl border border-[#16324A] bg-[#0B1728] px-4 py-3">
            <Loader text="Thinking..." />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;