import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const success = await login(email, password);

    setLoading(false);

    if (success) navigate("/documents");
    else setError("Invalid email or password");
  };

  return (
   <div className="page-center">
    <div className="card">
      <div className="card-title">AI Second Brain</div>

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

      <button className="button" onClick={handleLogin}>
        Sign In
      </button>

      {error && <div className="error">{error}</div>}
    </div>
  </div>
  );
}
