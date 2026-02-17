import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

export default function Chat() {
  const [params] = useSearchParams();
  const fileId = params.get("file_id");
  const { loading: authLoading } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ⭐ NEW — single vs all documents
  const [mode, setMode] = useState<"single" | "all">("single");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Load history (unchanged)
  useEffect(() => {
    if (!fileId || authLoading) return;

    const loadHistory = async () => {
      try {
        const res = await API.get(`/ai/history/${fileId}`);
        setMessages(res.data);
      } catch {
        console.log("No history or unauthorized");
      }
    };

    loadHistory();
  }, [fileId, authLoading]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !fileId) return;

    const userMessage: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // ⭐ choose endpoint dynamically
      const endpoint = mode === "all" ? "/ai/ask-all" : "/ai/ask-doc";

      const payload =
        mode === "all"
          ? { file_id: 0, question: userMessage.content }
          : { file_id: Number(fileId), question: userMessage.content };

      const res = await API.post(endpoint, payload);

      const aiMessage: Message = {
        role: "assistant",
        content: res.data.answer,
        sources: res.data.sources,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error talking to server" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Chat</h2>
      <p>Document ID: {fileId}</p>

      {/* ⭐ MODE SWITCH */}
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setMode("single")}
          disabled={mode === "single"}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #333",
            background: mode === "single" ? "#2563eb" : "#111",
            color: "white",
            marginRight: 8
          }}
        >
          This document
        </button>

        <button
          onClick={() => setMode("all")}
          disabled={mode === "all"}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #333",
            background: mode === "all" ? "#2563eb" : "#111",
            color: "white"
          }}
        >
          All documents ⭐
        </button>
      </div>

      {/* Chat Box */}
      <div
        style={{
          border: "1px solid #333",
          height: "60vh",
          padding: 16,
          overflowY: "auto",
          borderRadius: 12,
          background: "#0f0f0f"
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 14
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "12px 14px",
                borderRadius: 14,
                background: msg.role === "user" ? "#2563eb" : "#1e1e1e",
                color: msg.role === "user" ? "white" : "#e5e5e5",
                lineHeight: 1.5
              }}
            >
              {msg.role === "assistant" ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}

              {msg.sources && (
                <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
                  <b>Sources:</b>
                  <ul style={{ paddingLeft: 18 }}>
                    {msg.sources.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ opacity: 0.7 }}>AI is thinking...</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <input
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: "1px solid #333",
            background: "#111",
            color: "white"
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your document..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "0 18px",
            borderRadius: 10,
            background: "#2563eb",
            color: "white",
            border: "none"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
