import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function JoinClassPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const joinClass = async () => {
      try {
        await api.post("/classes/join", { code });
        navigate("/dashboard");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to join class");
        setLoading(false);
      }
    };
    if (code) {
      joinClass();
    }
  }, [code, navigate]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      {loading ? (
        <p>Joining class {code}...</p>
      ) : (
        <div>
          <h2 style={{ color: "red" }}>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        </div>
      )}
    </div>
  );
}
