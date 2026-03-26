import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Reload window to trigger the useAuth check in AuthProvider
      window.location.href = "/dashboard";
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <svg
        style={{ animation: "spin 1s linear infinite" }}
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
    </div>
  );
}
