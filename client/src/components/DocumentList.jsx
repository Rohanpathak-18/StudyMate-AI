import {
  FileText,
  FileType,
  Presentation,
  Trash2,
  LoaderCircle,
} from "lucide-react";

const getFileIcon = (mimeType) => {
  if (mimeType === "application/pdf") {
    return <FileText className="text-[#FF6B6B]" />;
  }

  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return <FileType className="text-[#00E5FF]" />;
  }

  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return <Presentation className="text-[#A3FF12]" />;
  }

  return <FileText className="text-[#7C3AED]" />;
};

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const DocumentList = ({ documents, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoaderCircle className="h-7 w-7 animate-spin text-[#00E5FF]" />
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#16324A] bg-[#0B1728] px-6 py-16 text-center">
        <FileText className="mx-auto h-10 w-10 text-[#7890A8]" />

        <h3 className="mt-4 text-lg font-semibold text-[#F1F7FF]">
          No documents yet
        </h3>

        <p className="mt-2 text-sm text-[#7890A8]">
          Upload your first study material to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <div

  key={document._id}
  className="flex w-full min-w-0 items-center justify-between gap-2 overflow-hidden rounded-xl border border-[#16324A] bg-[#0B1728] p-3 transition hover:border-[#00E5FF]/40 sm:gap-3 sm:p-4"
>

          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#07111F]">
              {getFileIcon(document.mimeType)}
            </div>

            <div className="min-w-0">
             <p className="min-w-0 truncate font-medium text-[#F1F7FF]">
  {document.originalName}
</p>

              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#7890A8]">
                <span>{formatSize(document.size)}</span>

                <span>•</span>

                <span className="capitalize">
                  {document.status}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onDelete(document._id)}
            className="shrink-0 rounded-lg p-2 text-[#7890A8] transition hover:bg-red-500/10 hover:text-red-400">
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;