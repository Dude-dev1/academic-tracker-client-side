import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
export default function ClassInfoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState({ link: false, code: false });
  const { user } = useAuth();

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";
  const initials = firstName.slice(0, 2).toUpperCase();

  const classCode = "class689a"; // Wait, maybe we should fetch it, but for now fallback to the mockup if no logic existed.
  const inviteLink = `${window.location.origin}/join/${classCode}`;

  const handleCopy = (type, value) => {
    navigator.clipboard.writeText(value);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={styles.root}>
      <style>{`
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        
        /* Mobile overrides */
        @media (max-width: 640px) {
          .class-main {
            padding: 16px !important;
            width: 100% !important;
          }
          .class-top-nav {
            padding: 12px 16px !important;
          }
          .class-card {
            padding: 16px !important;
            border-radius: 12px !important;
          }
          .course-info-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .invite-row {
            gap: 6px !important;
          }
        }
      `}</style>

      <Sidebar sidebarOpen={sidebarOpen} />

      {/* MAIN CONTENT */}
      <div className="content-area-mobile-override" style={styles.content}>
        {/* TOP NAV */}
        <nav className="class-top-nav" style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <button className="mobile-hide" onClick={() => setSidebarOpen((v) => !v)} style={styles.toggleBtn}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <p style={styles.pageLabel}>Class Info</p>
          </div>
          <div style={styles.topNavRight}>
            <div className="mobile-hide" style={styles.avatar}>{initials}</div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="class-main" style={styles.main}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.classBadge}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              Class
            </div>
            <p style={styles.pageTitle}>Class Information</p>
          </div>

          {/* Course Card */}
          <div className="class-card" style={styles.card}>
            <div className="course-flex" style={styles.courseCard}>
              <div style={styles.courseIcon}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="1.5"
                >
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
              </div>
              <div style={styles.courseInfo}>
                <div className="course-info-header" style={styles.courseInfoHeader}>
                  <div>
                    <p style={styles.courseName}>Financial Accounting I</p>
                    <p style={styles.courseCode}>
                      Course Code : <strong>Acc 252</strong>
                    </p>
                  </div>
                  <button style={styles.editBtn}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                </div>
                <div className="desc-flex" style={styles.courseDescRow}>
                  <span style={styles.courseDescLabel}>Description:</span>
                  <span style={styles.courseDescText}>
                    This is an introductory course designed to create awareness
                    of the accounting concepts and principles.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invite Card */}
          <div className="class-card" style={styles.card}>
            <p style={styles.cardLabel}>Invite</p>

            {/* Invite Link */}
            <p style={styles.inviteSubLabel}>Invite Link</p>
            <div className="invite-row" style={styles.inviteRow}>
              <span style={styles.inviteLink}>{inviteLink}</span>
              <button
                style={{
                  ...styles.copyBtn,
                  background: copied.link ? "#D1FAE5" : "#fff",
                  color: copied.link ? "#065F46" : "#374151",
                }}
                onClick={() => handleCopy("link", inviteLink)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                {copied.link ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Class Code */}
            <p style={{ ...styles.inviteSubLabel, marginTop: "14px" }}>
              Class Code
            </p>
            <div className="invite-row" style={styles.inviteRow}>
              <span
                style={{
                  ...styles.inviteLink,
                  fontWeight: "600",
                  fontSize: "14px",
                  letterSpacing: "1px",
                }}
              >
                {classCode}
              </span>
              <button
                style={{
                  ...styles.copyBtn,
                  background: copied.code ? "#D1FAE5" : "#fff",
                  color: copied.code ? "#065F46" : "#374151",
                }}
                onClick={() => handleCopy("code", classCode)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                {copied.code ? "Copied!" : "Copy"}
              </button>
            </div>

            <button style={styles.regenBtn}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
              </svg>
              Regenerate Link
            </button>
          </div>

          {/* Danger Zone */}
          <div className="class-card" style={styles.dangerZone}>
            <p style={styles.dangerLabel}>Danger Zone</p>
            <button style={styles.archiveBtn}>Archive Class</button>
            <button style={styles.deleteBtn}>Delete Class</button>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#F0F4FF",
    fontFamily: "'DM Sans', sans-serif",
  },
  noAccess: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "12px",
    background: "#F0F4FF",
  },
  noAccessTitle: { fontSize: "18px", fontWeight: "600", color: "#374151" },
  noAccessSub: {
    fontSize: "13px",
    color: "#9CA3AF",
    textAlign: "center",
    maxWidth: "300px",
  },
  sidebar: {
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.25s ease",
    overflow: "hidden",
    flexShrink: 0,
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "18px 16px",
    borderBottom: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
  },
  sidebarLogoName: {
    fontFamily: "'Fraunces', serif",
    fontSize: "18px",
    fontWeight: "700",
    color: "#2563EB",
    letterSpacing: "-0.3px",
  },
  navItems: {
    display: "flex",
    flexDirection: "column",
    padding: "12px 0",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 16px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
    width: "100%",
    textAlign: "left",
  },
  navLabel: { fontSize: "13px" },
  sidebarBottom: { borderTop: "1px solid #E5E7EB", padding: "12px 0" },
  content: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #E5E7EB",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  topNavLeft: { display: "flex", alignItems: "center", gap: "12px" },
  topNavRight: { display: "flex", alignItems: "center", gap: "16px" },
  toggleBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "4px",
    borderRadius: "6px",
  },
  pageLabel: { fontSize: "14px", fontWeight: "500", color: "#6B7280" },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#2563EB",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    padding: "24px 28px",
    flex: 1,
    maxWidth: "680px",
    margin: "0 auto",
    width: "100%",
    animation: "fadeUp 0.4s ease both",
  },
  pageHeader: { marginBottom: "24px" },
  classBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#EDE9FE",
    color: "#7C3AED",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
    marginBottom: "12px",
  },
  pageTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    border: "0.5px solid #E5E7EB",
    padding: "20px 24px",
    marginBottom: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  courseCard: { display: "flex", gap: "16px" },
  courseIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "12px",
    background: "#EDE9FE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  courseInfo: { flex: 1 },
  courseInfoHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "10px",
  },
  courseName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "4px",
  },
  courseCode: { fontSize: "12px", color: "#6B7280" },
  courseDescRow: { display: "flex", gap: "8px" },
  courseDescLabel: {
    fontSize: "12px",
    color: "#9CA3AF",
    whiteSpace: "nowrap",
    marginTop: "1px",
  },
  courseDescText: { fontSize: "12px", color: "#6B7280", lineHeight: "1.6" },
  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 12px",
    borderRadius: "8px",
    border: "0.5px solid #D1D5DB",
    background: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    color: "#374151",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  cardLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "16px",
  },
  inviteSubLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: "8px",
  },
  inviteRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
  inviteLink: {
    flex: 1,
    fontSize: "12px",
    color: "#6B7280",
    background: "#F9FAFB",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "0.5px solid #E5E7EB",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  copyBtn: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "7px 14px",
    borderRadius: "8px",
    border: "0.5px solid #D1D5DB",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: "all 0.2s",
  },
  regenBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: "100%",
    padding: "9px",
    borderRadius: "8px",
    border: "0.5px solid #D1D5DB",
    background: "#fff",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    color: "#374151",
    marginTop: "16px",
  },
  dangerZone: {
    background: "#fff",
    borderRadius: "16px",
    border: "0.5px solid #FECACA",
    padding: "20px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  dangerLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "14px",
  },
  archiveBtn: {
    display: "block",
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "0.5px solid #D1D5DB",
    background: "#F9FAFB",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    color: "#6B7280",
    marginBottom: "10px",
  },
  deleteBtn: {
    display: "block",
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    color: "#fff",
  },
};
