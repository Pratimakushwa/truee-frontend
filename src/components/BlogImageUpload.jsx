import { useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function getUploadError(err) {
  const status = err.response?.status;
  const response = err.response?.data;

  const backendMessage =
    typeof response?.message === "string"
      ? response.message
      : typeof response?.error === "string"
        ? response.error
        : "";

  if (backendMessage) {
    return `${status ? `Error ${status}: ` : ""}${backendMessage}`;
  }

  if (status === 404) {
    return "Error 404: Upload route nahi mili. Backend ka blog upload route check karna hai.";
  }

  if (status === 401) {
    return "Error 401: Session expire ho sakta hai. Super Admin se dobara login karo.";
  }

  if (status === 403) {
    return "Error 403: Is account ko image upload ki permission nahi mili.";
  }

  if (status === 413) {
    return "Error 413: Server ne image size reject kiya.";
  }

  if (status) {
    return `Error ${status}: Upload fail hui. Network ke Response tab mein detail dekho.`;
  }

  if (err.request) {
    return "Server ka response nahi mila. Backend terminal aur browser Network tab check karo.";
  }

  return err.message || "Image upload nahi hui.";
}

export default function BlogImageUpload({
  value,
  alt,
  onUploaded,
  disabled = false,
  label = "Choose Image",
}) {
  const inputRef = useRef(null);
  const requestInProgress = useRef(false);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [failedPreviewUrl, setFailedPreviewUrl] = useState("");

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file || disabled || requestInProgress.current) return;

    setError("");
    setProgress(0);

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("JPG, PNG ya WebP image select karo.");
      return;
    }

    if (file.size === 0) {
      setError("Selected image khaali hai. Doosri image select karo.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image 5 MB ya usse chhoti honi chahiye.");
      return;
    }

    if (typeof onUploaded !== "function") {
      setError("Upload callback missing hai. ManageBlogs component check karna hai.");
      return;
    }

    requestInProgress.current = true;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axiosInstance.post(
        "/blogs/manage/upload-image",
        formData,
        {
          headers: {
            "Content-Type": undefined,
          },
          onUploadProgress: (event) => {
            if (event.total) {
              setProgress(
                Math.round((event.loaded / event.total) * 100)
              );
            }
          },
        }
      );

      if (!data?.success || typeof data.url !== "string" || !data.url.trim()) {
        throw new Error(
          "Server se expected success aur image URL nahi mile. Upload response check karna hai."
        );
      }

      setFailedPreviewUrl("");
      onUploaded(data.url.trim());
    } catch (err) {
      setError(getUploadError(err));
    } finally {
      requestInProgress.current = false;
      setUploading(false);
    }
  };

  const previewUrl = typeof value === "string" ? value.trim() : "";

  const previewAllowed =
    /^https:\/\//i.test(previewUrl) ||
    (previewUrl.startsWith("/") && !previewUrl.startsWith("//"));

  return (
    <div className="space-y-3" aria-busy={uploading}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={uploadImage}
        disabled={disabled || uploading}
        className="hidden"
        aria-label={label}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || uploading}
        className="rounded-xl border border-[#C8A253] bg-[#FCFAEF] px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#f5ecd7] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading
          ? progress === 100
            ? "Image process ho rahi hai..."
            : `Uploading... ${progress}%`
          : label}
      </button>

      <p className="text-xs text-gray-500">
        JPG, PNG, WebP · Maximum 5 MB
      </p>

      {uploading && (
        <p role="status" className="text-xs text-[#A77D35]">
          Upload complete hone tak wait karo, phir Save Blog dabao.
        </p>
      )}

      {error && (
        <p role="alert" className="break-words text-sm text-red-600">
          {error}
        </p>
      )}

      {previewAllowed && failedPreviewUrl !== previewUrl && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <img
            key={previewUrl}
            src={previewUrl}
            alt={alt || "Selected blog image"}
            onError={() => setFailedPreviewUrl(previewUrl)}
            className="h-36 w-full object-contain"
          />
        </div>
      )}

      {previewAllowed && failedPreviewUrl === previewUrl && (
        <p role="alert" className="text-sm text-red-600">
          Image URL mili hai, lekin preview load nahi hua.
          Image ka public URL check karna hai.
        </p>
      )}

      {previewAllowed && (
        <p className="text-xs text-gray-500">
          Image URL form mein aa gayi hai. Article mein save karne
          ke liye Save Blog / Save Changes bhi dabao.
        </p>
      )}
    </div>
  );
}