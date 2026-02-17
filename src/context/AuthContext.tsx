import { createContext, useContext, useState, ReactNode,useEffect } from "react";
import API, { setAuthToken } from "../api/api";

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  // Restore session on refresh
  useEffect(() => {
    const stored = localStorage.getItem("token");

    if (stored) {
      setAuthToken(stored);
      setToken(stored);
    }

    setLoading(false); // auth restored
  }, [])


  
  

  const login = async (email: string, password: string) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const accessToken = res.data.access_token;

      localStorage.setItem("token", accessToken);
      setAuthToken(accessToken);
      setToken(accessToken);

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};
