import { useTheme } from "../context/ThemeContext";

export default function AccessRestricted() {
  const { darkMode } = useTheme();

  const styles = {
    noAccess: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: "12px",
      background: darkMode ? "#1F2937" : "#F0F4FF",
      width: "100%",
    },
    noAccessTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: darkMode ? "#F9FAFB" : "#374151",
    },
    noAccessSub: {
      fontSize: "13px",
      color: "#9CA3AF",
      textAlign: "center",
      maxWidth: "300px",
    },
  };

  return (
    <div style={styles.noAccess}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1.5"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
      <p style={styles.noAccessTitle}>Access Restricted</p>
      <p style={styles.noAccessSub}>
        This page is only available to course instructors.
      </p>
    </div>
  );
}
