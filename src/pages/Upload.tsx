import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const res = await API.post("/upload/", formData);
      const fileId = res.data.file_id;

      setMessage("Upload successful! Redirecting...");
      setTimeout(() => navigate(`/chat?file_id=${fileId}`), 900);

    } catch (error: any) {
      setMessage(error.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h1>Upload Document</h1>
        <p className="subtitle">Add a PDF and start chatting with it</p>

        {/* Drop Zone */}
        <label className="dropzone">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {!file ? (
            <div className="placeholder">
              <div className="icon">📄</div>
              <p>Click to choose a PDF</p>
              <span>Only .pdf supported</span>
            </div>
          ) : (
            <div className="file-preview">
              <div className="file-icon">📑</div>
              <div>
                <b>{file.name}</b>
                <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}
        </label>

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Chat"}
        </button>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}
