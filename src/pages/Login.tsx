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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080b14;
          font-family: 'Sora', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient background orbs */
        .login-root::before {
          content: '';
          position: fixed;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: -150px;
          left: -150px;
          border-radius: 50%;
          pointer-events: none;
        }
        .login-root::after {
          content: '';
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          border-radius: 50%;
          pointer-events: none;
        }

        .login-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 48px;
          max-width: 960px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* VIDEO SIDE */
        .video-side {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .video-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          color: #10b981;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .video-label-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }

        .video-frame-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15);
        }

        .video-frame-wrapper iframe {
          display: block;
          width: 100%;
          height: 280px;
        }

        .video-caption {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
        }

        /* DIVIDER */
        .divider {
          width: 1px;
          height: 320px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
          flex-shrink: 0;
        }

        /* LOGIN SIDE */
        .login-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .login-eyebrow {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #6366f1;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .login-title {
          font-size: 26px;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .login-subtitle {
          font-size: 13.5px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .field label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.04em;
        }

        .field input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .field input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .field input:focus {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .login-btn {
          margin-top: 8px;
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }

        .login-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .login-error {
          margin-top: 12px;
          padding: 10px 14px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px;
          font-size: 13px;
          color: #f87171;
        }

        .login-footer {
          margin-top: 20px;
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          text-align: center;
        }

        .login-footer span {
          color: #6366f1;
          cursor: pointer;
          font-weight: 500;
          transition: color 0.2s;
        }

        .login-footer span:hover {
          color: #818cf8;
        }

        @media (max-width: 700px) {
          .login-wrapper { flex-direction: column; gap: 32px; }
          .divider { display: none; }
          .video-frame-wrapper iframe { height: 200px; }
        }
      `}</style>

      <div className="login-root">
        <div className="login-wrapper">

          {/* LEFT: Video */}
          <div className="video-side">
            <div className="video-label">
              <span className="video-label-dot" />
              Live demo
            </div>
            <div className="video-frame-wrapper">
              <iframe
                src="https://www.youtube.com/embed/dIR_aEakQAQ"
                title="AI Second Brain Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
              />
            </div>
            <div className="video-caption">
              Watch how AI Second Brain helps you capture, connect, and recall everything that matters.
            </div>
          </div>

          {/* DIVIDER */}
          <div className="divider" />

          {/* RIGHT: Login */}
          <div className="login-side">
            <div className="login-eyebrow">Welcome back</div>
            <div className="login-title">Sign in to your<br />Second Brain</div>
            <div className="login-subtitle">Your knowledge, always within reach.</div>

            <div className="field">
              <label>Email address</label>
              <input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            {error && <div className="login-error">{error}</div>}

            <div className="login-footer">
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")}>Register</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}