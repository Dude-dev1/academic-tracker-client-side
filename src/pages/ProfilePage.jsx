import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";
  const initials = firstName.slice(0, 2).toUpperCase();

  const courses = [
    { name: "Web Technologies", pct: 80, color: "#2563EB" },
    { name: "Data Structures", pct: 60, color: "#10b981" },
    { name: "Financial Accounting", pct: 50, color: "#f59e0b" },
    { name: "Database Systems", pct: 67, color: "#7C3AED" },
  ];

  const stats = [
    { value: "4", label: "Enrolled Courses", color: "#2563EB" },
    { value: "13", label: "Assignments Done", color: "#10b981" },
    { value: "5", label: "In Progress", color: "#f59e0b" },
    { value: "1", label: "Overdue", color: "#ef4444" },
    { value: "65%", label: "Completion Rate", color: "#7C3AED" },
    { value: "20", label: "Total Assignments", color: "#111827" },
  ];

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Sidebar sidebarOpen={sidebarOpen} />

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        <nav style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              style={styles.toggleBtn}
            >
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
            <p style={styles.pageLabel}>Profile</p>
          </div>
          <div style={styles.topNavRight}>
            <div style={styles.avatar}>{initials}</div>
          </div>
        </nav>

        <main style={styles.main}>
          {/* Hero */}
          <div style={styles.profileHero}>
            <div style={styles.avatarLg}>{initials}</div>
            <div style={styles.profileHeroInfo}>
              <p style={styles.profileName}>Ella Asiamah</p>
              <p style={styles.profileRole}>Computer Science · Level 300</p>
              <div style={styles.profileTags}>
                {[
                  {
                    label: "KNUST",
                    icon: (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                    ),
                  },
                  {
                    label: "2023/2024",
                    icon: (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    ),
                  },
                  {
                    label: "Student",
                    icon: (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                    ),
                  },
                ].map(({ label, icon }) => (
                  <span key={label} style={styles.profileTag}>
                    {icon}
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <button style={styles.editProfileBtn}>
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
              Edit Profile
            </button>
          </div>

          {/* Info Grid */}
          <div style={styles.grid2}>
            <div style={styles.card}>
              <p style={styles.cardTitle}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Student Information
              </p>
              {[
                { label: "Full Name", value: "Ella Asiamah" },
                { label: "Student ID", value: "20234567" },
                { label: "Index Number", value: "5230890" },
                { label: "Programme", value: "BSc. Computer Science" },
                { label: "Level", value: "300" },
                { label: "Academic Year", value: "2023/2024" },
              ].map(({ label, value }) => (
                <div key={label} style={styles.infoRow}>
                  <span style={styles.infoLabel}>{label}</span>
                  <span style={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>
            <div style={styles.card}>
              <p style={styles.cardTitle}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact & Account
              </p>
              {[
                { label: "Email", value: "ella@knust.edu.gh" },
                { label: "Phone", value: "+233 XX XXX XXXX" },
                { label: "Institution", value: "KNUST" },
                { label: "Role", value: "Student" },
                { label: "Member Since", value: "Jan 2024" },
                { label: "Last Active", value: "Today" },
              ].map(({ label, value }) => (
                <div key={label} style={styles.infoRow}>
                  <span style={styles.infoLabel}>{label}</span>
                  <span style={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Summary */}
          <div style={{ ...styles.card, marginBottom: "16px" }}>
            <p style={styles.cardTitle}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              Academic Summary
            </p>
            <div style={styles.statGrid}>
              {stats.map(({ value, label, color }) => (
                <div key={label} style={styles.statItem}>
                  <p style={{ ...styles.statNum, color }}>{value}</p>
                  <p style={styles.statLabel}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enrolled Courses */}
          <div style={{ ...styles.card, marginBottom: "16px" }}>
            <p style={styles.cardTitle}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
              >
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              Enrolled Courses
            </p>
            <div style={styles.coursesGrid}>
              {courses.map((c, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.courseItem,
                    borderBottom: i < 2 ? `0.5px solid #F3F4F6` : "none",
                  }}
                >
                  <div style={{ ...styles.courseDot, background: c.color }} />
                  <div style={{ flex: 1 }}>
                    <p style={styles.courseName}>{c.name}</p>
                    <div style={styles.progressTrack}>
                      <div
                        style={{
                          ...styles.progressBar,
                          width: `${c.pct}%`,
                          background: c.color,
                        }}
                      />
                    </div>
                  </div>
                  <span style={styles.coursePct}>{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div style={styles.dangerZone}>
            <p style={styles.dangerTitle}>Account Settings</p>
            <div style={styles.dangerRow}>
              <div style={styles.dangerInfo}>
                <strong style={styles.dangerInfoTitle}>Change Password</strong>
                Update your account password
              </div>
              <button style={styles.grayBtn}>Change</button>
            </div>
            {/* For group selection if any */}
            <div style={styles.dangerRow}>
              <div style={styles.dangerInfo}>
                <strong style={styles.dangerInfoTitle}>Class Group</strong>
                Select the group you belong to if any
              </div>
              <select style={styles.selectInput}>
                <option>Group 1</option>
                <option>Group 2</option>
              </select>
            </div>
            <div
              style={{
                ...styles.dangerRow,
                borderBottom: "none",
                paddingBottom: 0,
              }}
            >
              <div style={styles.dangerInfo}>
                <strong style={{ ...styles.dangerInfoTitle, color: "#ef4444" }}>
                  Delete Account
                </strong>
                <span style={{ color: "#ef4444" }}>
                  Permanently remove your account and all data
                </span>
              </div>
              <button style={styles.redBtn}>Delete</button>
            </div>
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
  main: { padding: "24px 28px", flex: 1, animation: "fadeUp 0.4s ease both" },
  profileHero: {
    background: "#2563EB",
    borderRadius: "16px",
    padding: "28px 32px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  avatarLg: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "#fff",
    color: "#2563EB",
    fontSize: "22px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "3px solid rgba(255,255,255,0.3)",
  },
  profileHeroInfo: { flex: 1 },
  profileName: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "4px",
  },
  profileRole: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "12px",
  },
  profileTags: { display: "flex", gap: "8px", flexWrap: "wrap" },
  profileTag: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  editProfileBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    border: "0.5px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    gap: "16px",
    marginBottom: "16px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    border: "0.5px solid #E5E7EB",
    padding: "20px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "0.5px solid #F3F4F6",
  },
  infoLabel: { fontSize: "12px", color: "#9CA3AF" },
  infoValue: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#111827",
    textAlign: "right",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: "10px",
  },
  statItem: {
    background: "#F9FAFB",
    borderRadius: "8px",
    padding: "12px",
    textAlign: "center",
  },
  statNum: { fontSize: "20px", fontWeight: "700", marginBottom: "4px" },
  statLabel: { fontSize: "11px", color: "#6B7280", lineHeight: "1.4" },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0 24px",
  },
  courseItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 0",
  },
  courseDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  courseName: { fontSize: "12px", fontWeight: "500", color: "#111827" },
  progressTrack: {
    height: "5px",
    background: "#F3F4F6",
    borderRadius: "3px",
    overflow: "hidden",
    marginTop: "4px",
  },
  progressBar: { height: "100%", borderRadius: "3px" },
  coursePct: {
    fontSize: "11px",
    color: "#9CA3AF",
    marginLeft: "8px",
    flexShrink: 0,
  },
  dangerZone: {
    background: "#fff",
    borderRadius: "16px",
    border: "0.5px solid #FECACA",
    padding: "20px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  dangerTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: "14px",
  },
  dangerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "0.5px solid #F3F4F6",
  },
  dangerInfo: { fontSize: "12px", color: "#6B7280" },
  dangerInfoTitle: {
    display: "block",
    fontSize: "13px",
    color: "#111827",
    marginBottom: "2px",
    fontWeight: "600",
  },
  grayBtn: {
    padding: "6px 16px",
    borderRadius: "8px",
    border: "0.5px solid #D1D5DB",
    background: "#F9FAFB",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    color: "#6B7280",
    whiteSpace: "nowrap",
  },
  redBtn: {
    padding: "6px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    whiteSpace: "nowrap",
  },
  selectInput: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "0.5px solid #D1D5DB",
    background: "#fff",
    fontSize: "12px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#111827",
    outline: "none",
    cursor: "pointer",
  },
};
