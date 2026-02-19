import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // back to login
  };

  return (
    <div
      style={{
        width: "100%",
        height: 60,
        background: "#0f172a",
        borderBottom: "1px solid #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >
      <div
        style={{ fontWeight: 600, cursor: "pointer" }}
        onClick={() => navigate("/documents")}
      >
        🧠 AI Second Brain
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
