import { createContext, useContext, useState, useEffect } from "react";
import {
  getMe,
  login as loginService,
  register as registerService,
  logout as logoutService,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await getMe();
          if (res.success) {
            setUser(res.data);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Failed to load user", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (userData) => {
    const res = await loginService(userData);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await registerService(userData);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
