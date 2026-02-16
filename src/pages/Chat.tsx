import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [params] = useSearchParams();
  const fileId = params.get("file_id");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || !fileId) return;

    const userMessage: Message = { role: "user", content: input };

    // show user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/ai/ask-doc", {
        file_id: Number(fileId),
        question: userMessage.content,
      });

      const aiMessage: Message = {
        role: "assistant",
        content: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error talking to server" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Chat Page</h2>
      <p>Talking to document ID: {fileId}</p>

      <div style={{
        border: "1px solid gray",
        height: 350,
        padding: 10,
        overflowY: "auto"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{msg.role === "user" ? "You: " : "AI: "}</b>
            {msg.content}
          </div>
        ))}
        {loading && <div><i>AI thinking...</i></div>}
      </div>

      <br />

      <input
        style={{ width: "70%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage} disabled={loading}>
        Send
      </button>
    </div>
  );
}
