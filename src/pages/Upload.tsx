import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/upload/", formData);
      const fileId = res.data.file_id;

      setMessage("Upload successful!");

      // Redirect to chat page with file_id
      navigate(`/chat?file_id=${fileId}`);

    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Upload failed");
      }
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Upload Document</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      <p>{message}</p>
    </div>
  );
}
