import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

type Doc = {
  id: number;
  filename: string;
};

export default function Documents() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const navigate = useNavigate();

  const loadDocs = async () => {
    try {
      const res = await API.get("/upload/files");
      setDocs(res.data);
    } catch {
      console.log("Failed to load documents");
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const deleteDoc = async (id: number) => {
    if (!confirm("Delete this document permanently?")) return;

    try {
      await API.delete(`/upload/${id}`);

      // remove from UI instantly
      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Your Documents</h2>

      <button onClick={() => navigate("/upload")}>
        Upload New Document
      </button>

      <br /><br />

      {docs.map((doc) => (
        <div
          key={doc.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 18px",
            borderRadius: 12,
            background: "#1e1e1e",
            border: "1px solid #333",
            marginBottom: 12,
            gap: 20
          }}
        >
          <span
            style={{ flex: 1,cursor: "pointer" }}
            onClick={() => navigate(`/chat?file_id=${doc.id}`)}
          >
            📄 {doc.filename}
          </span>
        
          <button
            style={{
              background: "#ff4d4f",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: 6
            }}
            onClick={() => deleteDoc(doc.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
