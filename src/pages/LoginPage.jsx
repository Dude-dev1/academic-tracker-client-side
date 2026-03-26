import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Close button */}
        <button style={styles.closeBtn} aria-label="Close">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoRow}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2563EB" />
              <path
                d="M8 10h10M8 16h16M8 22h6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span style={styles.logoName}>Agenda</span>
          </div>
          <h1 style={styles.title}>Welcome back</h1>
          <p style={styles.subtitle}>Sign in to continue your journey</p>
          {errorMsg && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
              {errorMsg}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} style={styles.form}>
          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <div
              style={{
                ...styles.inputWrapper,
                borderColor: emailFocused ? "#2563EB" : "#E5E7EB",
                boxShadow: emailFocused
                  ? "0 0 0 3px rgba(37,99,235,0.12)"
                  : "none",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={emailFocused ? "#2563EB" : "#9CA3AF"}
                strokeWidth="1.8"
                style={styles.inputIcon}
              >
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <div style={styles.labelRow}>
              <label style={styles.label}>Password</label>
              <a href="#" style={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            <div
              style={{
                ...styles.inputWrapper,
                borderColor: passwordFocused ? "#2563EB" : "#E5E7EB",
                boxShadow: passwordFocused
                  ? "0 0 0 3px rgba(37,99,235,0.12)"
                  : "none",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={passwordFocused ? "#2563EB" : "#9CA3AF"}
                strokeWidth="1.8"
                style={styles.inputIcon}
              >
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 018 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={styles.eyeBtn}
                aria-label="Toggle password"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {/* Sign in button */}
          <button type="submit" style={styles.signInBtn} disabled={loading}>
            {loading ? <span style={styles.spinner} /> : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or continue with</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Social buttons */}
        <div style={styles.socialGroup}>
          <button
            style={styles.socialBtn}
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/google";
            }}
          >
            <GoogleIcon />
            <span style={styles.socialLabel}>Google</span>
          </button>
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.signUpLink}>
            Sign up
          </Link>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        input::placeholder { color: #B0B7C3; }
        input:focus { outline: none; }
        button:focus { outline: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F0F4FF",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    top: "-80px",
    right: "-80px",
    width: "340px",
    height: "340px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    bottom: "-100px",
    left: "-100px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "20px",
    padding: "36px 32px 28px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 40px rgba(37,99,235,0.10), 0 1px 4px rgba(0,0,0,0.06)",
    position: "relative",
    animation: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both",
  },
  closeBtn: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "#F3F4F6",
    border: "none",
    borderRadius: "8px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#6B7280",
  },
  header: {
    marginBottom: "28px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
  },
  logoName: {
    fontFamily: "'Fraunces', serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#2563EB",
    letterSpacing: "-0.3px",
  },
  title: {
    fontFamily: "'Fraunces', serif",
    fontSize: "26px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.5px",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "400",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
  },
  forgotLink: {
    fontSize: "12px",
    color: "#2563EB",
    textDecoration: "none",
    fontWeight: "500",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #E5E7EB",
    borderRadius: "10px",
    padding: "0 12px",
    height: "46px",
    background: "#FAFAFA",
    transition: "border-color 0.18s, box-shadow 0.18s",
    gap: "10px",
  },
  inputIcon: {
    flexShrink: 0,
    transition: "stroke 0.18s",
  },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#111827",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "400",
  },
  eyeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9CA3AF",
    display: "flex",
    alignItems: "center",
    padding: "0",
    flexShrink: 0,
  },
  signInBtn: {
    marginTop: "4px",
    height: "46px",
    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "0.1px",
    boxShadow: "0 2px 12px rgba(37,99,235,0.30)",
    transition: "opacity 0.15s",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2.5px solid rgba(255,255,255,0.35)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "22px 0 18px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#E5E7EB",
  },
  dividerText: {
    fontSize: "12px",
    color: "#9CA3AF",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
  socialGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  socialBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "0 16px",
    height: "44px",
    border: "1.5px solid #E5E7EB",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.15s, border-color 0.15s",
  },
  socialLabel: {
    textAlign: "center",
  },
  footer: {
    marginTop: "22px",
    textAlign: "center",
    fontSize: "13px",
    color: "#6B7280",
  },
  signUpLink: {
    color: "#2563EB",
    fontWeight: "600",
    textDecoration: "none",
  },
};
