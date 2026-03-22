import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const courses = [
  { name: "Web Technologies", done: 4, total: 5, pct: 80 },
  { name: "Data Structures", done: 3, total: 5, pct: 60 },
  { name: "Financial Accounting", done: 2, total: 4, pct: 50 },
  { name: "Database Systems", done: 4, total: 6, pct: 67 },
];

const weeklyData = [3, 1, 4, 6, 2, 5];
const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];

const pieSegments = [
  { label: "Completed", pct: 65, color: "#10b981" },
  { label: "Pending", pct: 25, color: "#f59e0b" },
  { label: "Overdue", pct: 10, color: "#ef4444" },
];

function PieChart() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let start = -Math.PI / 2;
    const cx = 55, cy = 55, r = 45;
    pieSegments.forEach(s => {
      const angle = (s.pct / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      start += angle;
    });
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <canvas ref={canvasRef} width={110} height={110} />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {pieSegments.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: "11px", color: "#6B7280" }}>{s.label} {s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || 700;
    const H = 120;
    canvas.width = W;
    const maxV = Math.max(...weeklyData);
    const padL = 24, padR = 16, padT = 10, padB = 28;
    const xStep = (W - padL - padR) / (weeklyData.length - 1);
    const coords = weeklyData.map((v, i) => ({
      x: padL + i * xStep,
      y: padT + (1 - v / maxV) * (H - padT - padB),
    }));
    ctx.strokeStyle = "#2563EB";
    ctx.lineWidth = 2;
    ctx.beginPath();
    coords.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();
    coords.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#2563EB";
      ctx.fill();
    });
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    weekLabels.forEach((l, i) => ctx.fillText(l, coords[i].x, H - 6));
  }, []);

  return <canvas ref={canvasRef} height={120} style={{ width: "100%", height: "120px" }} />;
}

function EmptyState({ icon, title, subtitle }) {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>{icon}</div>
      <p style={styles.emptyTitle}>{title}</p>
      <p style={styles.emptySubtitle}>{subtitle}</p>
    </div>
  );
}

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("Personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Progress");
  const { user } = useAuth();

  // Set this to true to see first time user view
  // Stephen, kindly replace this with real logic, thanksss
  const isFirstTimeUser = courses.length === 0;

  const firstName = user?.displayName?.split(" ")[0]
    || user?.name?.split(" ")[0]
    || user?.email?.split("@")[0]
    || "there";

  const initials = firstName.slice(0, 2).toUpperCase();

  const navItems = [
    {
      label: "Home", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      )
    },
    {
      label: "Progress", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    { 
      label: "Calendar", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg> 
      )
    },
    { 
      label: "Assignments", icon: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      )
    },
  ];

  const settingsItem = {
    label: "Settings", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>
      </svg>
    )
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? "220px" : "64px" }}>
        <div style={styles.sidebarLogo}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#2563EB"/>
            <path d="M8 10h10M8 16h16M8 22h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          {sidebarOpen && <span style={styles.sidebarLogoName}>Agenda</span>}
        </div>
        <div style={styles.navItems}>
          {navItems.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              title={!sidebarOpen ? label : ""}
              style={{
                ...styles.navItem,
                background: activeNav === label ? "#EFF6FF" : "transparent",
                color: activeNav === label ? "#2563EB" : "#6B7280",
                borderLeft: activeNav === label ? "3px solid #2563EB" : "3px solid transparent",
                justifyContent: sidebarOpen ? "flex-start" : "center",
              }}
            >
              {icon}
              {sidebarOpen && <span style={styles.navLabel}>{label}</span>}
            </button>
          ))}
        </div>
        <div style={styles.sidebarBottom}>
          <button
            onClick={() => setActiveNav("Settings")}
            title={!sidebarOpen ? "Settings" : ""}
            style={{
              ...styles.navItem,
              background: activeNav === "Settings" ? "#EFF6FF" : "transparent",
              color: activeNav === "Settings" ? "#2563EB" : "#6B7280",
              borderLeft: activeNav === "Settings" ? "3px solid #2563EB" : "3px solid transparent",
              justifyContent: sidebarOpen ? "flex-start" : "center",
            }}
          >
            {settingsItem.icon}
            {sidebarOpen && <span style={styles.navLabel}>Settings</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        <nav style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <button onClick={() => setSidebarOpen(v => !v)} style={styles.toggleBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <p style={styles.pageLabel}>Progress</p>
          </div>
          <div style={styles.topNavRight}>
            <div style={styles.tabGroup}>
              {["Personal", "Class"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  ...styles.tabBtn,
                  background: activeTab === tab ? "#2563EB" : "transparent",
                  color: activeTab === tab ? "#fff" : "#374151",
                }}>
                  {tab}
                </button>
              ))}
            </div>
            <div style={styles.avatar}>{initials}</div>
          </div>
        </nav>

        <main style={styles.main}>
          {/* Stats Row — always visible */}
          <div style={styles.statsRow}>
            {[
              { label: "Overall completion", value: isFirstTimeUser ? "0%" : "65%", sub: isFirstTimeUser ? "overall completion 0%" : "13 of 20 completed", color: "#2563EB", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
              { label: "Completion", value: isFirstTimeUser ? "0" : "13", sub: "Assignments finished", color: "#10b981", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg> },
              { label: "In Progress", value: isFirstTimeUser ? "0" : "5", sub: "Currently working on", color: "#f59e0b", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg> },
            ].map(({ label, value, sub, color, icon }) => (
              <div key={label} style={{ ...styles.statCard, borderTop: `3px solid ${color}` }}>
                <div style={styles.statLabel}>
                  <span>{label}</span>
                  {icon}
                </div>
                <p style={styles.statVal}>{value}</p>
                <p style={styles.statSub}>{sub}</p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div style={styles.chartsGrid}>
            <div style={styles.card}>
              <p style={styles.cardTitle}>Progress by course</p>
              {isFirstTimeUser ? (
                <EmptyState
                  icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
                  title="No courses yet"
                  subtitle="Looks like you haven't started any courses yet. Enroll to see your progress."
                />
              ) : (
                <div style={styles.barChart}>
                  {courses.map(c => (
                    <div key={c.name} style={styles.barWrap}>
                      <div style={{ ...styles.bar, height: `${c.pct}px` }} />
                      <span style={styles.barLabel}>{c.name.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={styles.card}>
              <p style={styles.cardTitle}>Assignment distribution status</p>
              {isFirstTimeUser ? (
                <EmptyState
                  icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg>}
                  title="No assignments yet"
                  subtitle="Your assignments will appear here as you progress. Start a course to get going."
                />
              ) : (
                <PieChart />
              )}
            </div>
          </div>

          {/* Line Chart */}
          <div style={{ ...styles.card, marginBottom: "16px" }}>
            <p style={styles.cardTitle}>Weekly Completion Trend</p>
            {isFirstTimeUser ? (
              <EmptyState
                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
                title="No data yet"
                subtitle="Your weekly trend will develop once you start. Keep going!"
              />
            ) : (
              <LineChart />
            )}
          </div>

          {/* Course Details */}
          {!isFirstTimeUser && (
            <div style={styles.card}>
              <p style={styles.cardTitle}>Course Details</p>
              <div style={styles.courseList}>
                {courses.map((c, i) => (
                  <div key={i} style={styles.courseRow}>
                    <div style={styles.courseRowTop}>
                      <span style={styles.courseName}>{c.name}</span>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <span style={styles.courseStat}>{c.done}/{c.total}</span>
                        <span style={styles.coursePct}>{c.pct}%</span>
                      </div>
                    </div>
                    <div style={styles.progressTrack}>
                      <div style={{ ...styles.progressBar, width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  root: { display: "flex", minHeight: "100vh", background: "#F0F4FF", fontFamily: "'DM Sans', sans-serif" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", transition: "width 0.25s ease", overflow: "hidden", flexShrink: 0, position: "sticky", top: 0, height: "100vh" },
  sidebarLogo: { display: "flex", alignItems: "center", gap: "10px", padding: "18px 16px", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" },
  sidebarLogoName: { fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: "700", color: "#2563EB", letterSpacing: "-0.3px" },
  navItems: { display: "flex", flexDirection: "column", padding: "12px 0", flex: 1 },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "500", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s", whiteSpace: "nowrap", width: "100%", textAlign: "left" },
  navLabel: { fontSize: "13px" },
  sidebarBottom: { borderTop: "1px solid #E5E7EB", padding: "12px 0" },
  content: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topNav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", background: "#fff", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 100 },
  topNavLeft: { display: "flex", alignItems: "center", gap: "12px" },
  topNavRight: { display: "flex", alignItems: "center", gap: "16px" },
  toggleBtn: { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px", borderRadius: "6px" },
  pageLabel: { fontSize: "14px", fontWeight: "500", color: "#6B7280" },
  tabGroup: { display: "flex", background: "#F3F4F6", borderRadius: "8px", padding: "3px", gap: "2px" },
  tabBtn: { padding: "5px 14px", borderRadius: "6px", border: "none", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" },
  avatar: { width: "34px", height: "34px", borderRadius: "50%", background: "#2563EB", color: "#fff", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" },
  main: { padding: "32px", flex: 1, animation: "fadeUp 0.4s ease both" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "12px", marginBottom: "16px" },
  statCard: { background: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  statLabel: { fontSize: "11px", color: "#6B7280", marginBottom: "4px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  statVal: { fontSize: "22px", fontWeight: "700", color: "#111827" },
  statSub: { fontSize: "11px", color: "#9CA3AF", marginTop: "4px" },
  chartsGrid: { display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "14px", marginBottom: "16px" },
  card: { background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "14px" },
  barChart: { display: "flex", alignItems: "flex-end", gap: "8px", height: "100px" },
  barWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", flex: 1 },
  bar: { width: "100%", borderRadius: "4px 4px 0 0", background: "#2563EB" },
  barLabel: { fontSize: "10px", color: "#9CA3AF", textAlign: "center" },
  emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", gap: "10px" },
  emptyIcon: { width: "56px", height: "56px", borderRadius: "50%", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" },
  emptyTitle: { fontSize: "13px", fontWeight: "600", color: "#374151", textAlign: "center" },
  emptySubtitle: { fontSize: "12px", color: "#9CA3AF", textAlign: "center", lineHeight: "1.6", maxWidth: "200px" },
  courseList: { display: "flex", flexDirection: "column", gap: "12px" },
  courseRow: { display: "flex", flexDirection: "column", gap: "4px" },
  courseRowTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  courseName: { fontSize: "13px", fontWeight: "500", color: "#111827" },
  courseStat: { fontSize: "11px", color: "#6B7280" },
  coursePct: { fontSize: "11px", fontWeight: "500", color: "#2563EB" },
  progressTrack: { height: "8px", background: "#F3F4F6", borderRadius: "4px", overflow: "hidden" },
  progressBar: { height: "100%", borderRadius: "4px", background: "#2563EB" },
};