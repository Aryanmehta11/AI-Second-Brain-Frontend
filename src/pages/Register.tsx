import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("All fields required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await API.post("/auth/signup", {
        email,
        password,
      });

      setSuccess("Account created! You can now login.");
      setTimeout(() => navigate("/"), 1200);

    } catch (err: any) {
      setError(err?.response?.data?.detail || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="page-center">
      <div className="card">
        <div className="card-title">Create Account</div>

        <input
          className="input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="button" onClick={handleRegister} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        {error && <div className="error">{error}</div>}
        {success && <div style={{ color: "#22c55e" }}>{success}</div>}

        <div style={{ marginTop: 12, opacity: 0.7 }}>
          Already have an account?{" "}
          <span
            style={{ color: "#60a5fa", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
