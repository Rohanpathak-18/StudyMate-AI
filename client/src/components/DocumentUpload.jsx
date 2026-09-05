import { useRef, useState } from "react";
import { FileUp, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const DocumentUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const allowedExtensions = [
    ".pdf",
    ".docx",
    ".pptx",
    ".txt",
  ];

  const handleFile = (file) => {
    if (!file) return;

    const extension =
      "." +
      file.name
        .split(".")
        .pop()
        .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      toast.error(
        "Only PDF, DOCX, PPTX and TXT files are allowed"
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error(
        "File size must be less than 10 MB"
      );
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    handleFile(
      event.dataTransfer.files?.[0]
    );
  };

  const clearFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || uploading) {
      return;
    }

    const formData = new FormData();

    formData.append(
      "document",
      selectedFile
    );

    setUploading(true);

    try {
      const response = await api.post(
        "/documents/upload",
        formData
      );

      const document =
        response.data?.document;

      toast.success(
        response.data?.message ||
          "Document uploaded successfully"
      );

      clearFile();

      if (document) {
        onUpload?.(document);
      }
    } catch (error) {
      console.error(
        "DOCUMENT UPLOAD ERROR:",
        error
      );

      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Document upload failed";

      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#16324A] bg-[#0B1728] p-6">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={handleDrop}
        onClick={() =>
          !uploading &&
          fileInputRef.current?.click()
        }
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
          dragging
            ? "border-[#00E5FF] bg-[#00E5FF]/10"
            : "border-[#16324A] hover:border-[#00E5FF]/60"
        } ${
          uploading
            ? "cursor-not-allowed opacity-60"
            : ""
        }`}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#00E5FF]/10">
          <FileUp className="h-7 w-7 text-[#00E5FF]" />
        </div>

        <h3 className="text-lg font-semibold text-[#F1F7FF]">
          Upload study material
        </h3>

        <p className="mt-2 text-sm text-[#7890A8]">
          Drag & drop your file here or click to browse
        </p>

        <p className="mt-3 text-xs text-[#7890A8]">
          PDF, DOCX, PPTX, TXT • Maximum 10 MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.pptx,.txt"
          onChange={handleInputChange}
          disabled={uploading}
          className="hidden"
        />
      </div>

      {selectedFile && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#16324A] bg-[#07111F] p-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#F1F7FF]">
              {selectedFile.name}
            </p>

            <p className="mt-1 text-xs text-[#7890A8]">
              {(
                selectedFile.size /
                1024 /
                1024
              ).toFixed(2)}{" "}
              MB
            </p>
          </div>

          <button
            type="button"
            disabled={uploading}
            onClick={(event) => {
              event.stopPropagation();
              clearFile();
            }}
            className="ml-4 rounded-lg p-2 text-[#7890A8] transition hover:bg-[#16324A] hover:text-[#F1F7FF] disabled:opacity-40"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00E5FF] px-5 py-3 font-semibold text-[#07111F] transition hover:bg-[#7C3AED] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Upload size={18} />

        {uploading
          ? "Uploading & indexing..."
          : "Upload Document"}
      </button>
    </div>
  );
};

export default DocumentUpload;