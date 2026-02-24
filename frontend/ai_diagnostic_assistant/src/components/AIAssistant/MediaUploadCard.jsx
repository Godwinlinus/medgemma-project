import { useRef, useState } from "react";
import {
  MdAddAPhoto,
  MdOutlineFileUpload,
  MdClose,
  MdErrorOutline,
  MdCheckCircle
} from "react-icons/md";

const ACCEPTED_TYPES =
  "image/*,.pdf,.dicom,.dcm,.zip";

const MAX_FILE_SIZE_MB = 50;
const MAX_TOTAL_FILES = 20;

const MediaUploadCard = ({ onFilesAdded = () => {}, onFileUploaded = () => {}, uploading, setUploading }) => {
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState("idle"); // idle | uploading | success | error

  /* -----------------------------
     Utilities
  ------------------------------ */
  const isDuplicate = (file, existing) =>
    existing.some(
      (f) =>
        f.file.name === file.name &&
        f.file.size === file.size &&
        f.file.lastModified === file.lastModified
    );

  const validateFiles = (incoming) => {
    const valid = [];
    const newErrors = [];

    incoming.forEach((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        newErrors.push(`${file.name} exceeds ${MAX_FILE_SIZE_MB}MB`);
        return;
      }

      if (isDuplicate(file, files)) {
        newErrors.push(`${file.name} is a duplicate`);
        return;
      }

      valid.push({
        file,
        progress: 0,
        status: "pending" // pending | uploading | success | error
      });
    });

    if (files.length + valid.length > MAX_TOTAL_FILES) {
      newErrors.push("Maximum file limit exceeded");
      return { valid: [], newErrors };
    }

    return { valid, newErrors };
  };

  /* -----------------------------
     Handlers
  ------------------------------ */
  const handleFiles = (incomingFiles) => {
    const { valid, newErrors } = validateFiles(incomingFiles);

    if (newErrors.length) {
      setErrors((prev) => [...prev, ...newErrors]);
    }

    if (valid.length) {
      setFiles((prev) => {
        const updated = [...prev, ...valid]
        // notify parent of new files (only file objects)
        try { onFilesAdded(valid.map(v => ({ name: v.file.name, size: v.file.size }))) } catch(e){}
        return updated
      });
    }
  };

  const handleFileSelect = (e) => {
    handleFiles(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setErrors([]);
    setUploadState("idle");
  };

  /* -----------------------------
     Fake Upload (stub)
  ------------------------------ */
  const startUpload = async () => {
    if (!files.length) return
    setUploadState("uploading")
    setUploading && setUploading(true)

    // create a case on the backend to attach files to
    let case_id = 'general'
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_name: 'Frontend Upload', symptoms: '' })
      })
      if (res.ok) {
        const data = await res.json()
        case_id = data.id
      }
    } catch (e) {
      console.warn('Could not create case:', e)
    }

    // upload files sequentially
    for (let i = 0; i < files.length; i++) {
      const item = files[i]
      setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'uploading', progress: 5 } : f))

      const form = new FormData()
      form.append('file', item.file)
      form.append('case_id', case_id)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: form
        })

        const data = await res.json()
        if (res.ok) {
          setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'success', progress: 100, file_id: data.file_id, url: data.url } : f))
          onFileUploaded && onFileUploaded(data)
        } else {
          setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'error', progress: 0 } : f))
        }
      } catch (e) {
        setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'error', progress: 0 } : f))
      }
    }

    setUploadState('success')
    setUploading && setUploading(false)
  };

  /* -----------------------------
     Render
  ------------------------------ */
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          fileInputRef.current.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative p-12 border-2 border-dashed rounded-xl transition-all flex flex-col items-center text-center
        ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark"
        }`}
    >
      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-white/5 flex items-center justify-center mb-6 text-primary">
        <MdAddAPhoto className="text-3xl" />
      </div>

      <h4 className="text-lg font-bold mb-2">
        Upload Medical Media
      </h4>

      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
        Drag & drop X-rays, PDFs, DICOM files, or ZIP archives.
        Files are encrypted and processed securely.
      </p>

      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-primary text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-primary/90"
      >
        <MdOutlineFileUpload />
        Select Files
      </button>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mt-6 text-left text-sm text-red-500 space-y-1">
          {errors.map((err, i) => (
            <div key={i} className="flex gap-2 items-center">
              <MdErrorOutline />
              {err}
            </div>
          ))}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8 w-full max-w-md mx-auto space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>{files.length} files selected</span>
            <button onClick={clearAll} className="hover:underline">
              Clear all
            </button>
          </div>

          {files.map((item, i) => (
            <div
              key={i}
              className="border border-border-dark rounded-lg p-3 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="truncate text-sm">
                  {item.file.name}
                </span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <MdClose />
                </button>
              </div>

              <div className="h-2 rounded bg-black/10 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    item.status === "success"
                      ? "bg-emerald-500"
                      : "bg-primary"
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              {item.status === "success" && (
                <div className="flex items-center gap-1 text-xs text-emerald-500">
                  <MdCheckCircle />
                  Uploaded
                </div>
              )}
            </div>
          ))}

          {uploadState !== "uploading" && (
            <button
              onClick={startUpload}
              className="w-full mt-4 bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90"
            >
              Start Upload
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaUploadCard;
