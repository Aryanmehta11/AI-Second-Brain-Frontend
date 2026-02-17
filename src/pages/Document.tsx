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

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const res = await API.get("/upload/files");
        setDocs(res.data);
      } catch {
        console.log("Failed to load documents");
      }
    };

    loadDocs();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Your Documents</h2>
      <button onClick={() => navigate("/upload")}>Upload New Document</button>
      <br /><br />

      {docs.map((doc) => (
        <div
          key={doc.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
            cursor: "pointer"
          }}
          onClick={() => navigate(`/chat?file_id=${doc.id}`)}
        >
          📄 {doc.filename}
        </div>
      ))}
    </div>
  );
}
