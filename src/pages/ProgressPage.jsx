import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

import { getCourses } from "../services/courseService";
import assignmentService from "../services/assignmentService";


function PieChart({ pieSegments = [] }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let start = -Math.PI / 2;
    const cx = 55,
      cy = 55,
      r = 45;
    pieSegments.forEach((s) => {
      const angle = ((s.pct || 0) / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      start += angle;
    });
  }, [pieSegments]);

  

  

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <canvas ref={canvasRef} width={110} height={110} />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {pieSegments.map((s) => (
          <div
            key={s.label}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background: s.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "11px", color: "#6B7280" }}>
              {s.label} {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart({ weeklyData = [], weekLabels = [] }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || 700;
    const H = 120;
    canvas.width = W;
    const maxV = Math.max(...weeklyData, 1); // Avoid division by 0
    const padL = 24,
      padR = 16,
      padT = 10,
      padB = 28;
    const xStep = (W - padL - padR) / (weeklyData.length - 1);
    const coords = weeklyData.map((v, i) => ({
      x: padL + i * xStep,
      y: padT + (1 - v / maxV) * (H - padT - padB),
    }));
    ctx.strokeStyle = "#2563EB";
    ctx.lineWidth = 2;
    ctx.beginPath();
    coords.forEach((p, i) =>
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
    );
    ctx.stroke();
    coords.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#2563EB";
      ctx.fill();
    });
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    weekLabels.forEach((l, i) => ctx.fillText(l, coords[i].x, H - 6));
  }, [weeklyData, weekLabels]);

  return (
    <canvas
      ref={canvasRef}
      height={120}
      style={{ width: "100%", height: "120px" }}
    />
  );
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic Data States
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [pieSegments, setPieSegments] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [weekLabels, setWeekLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesRes, assignmentsRes] = await Promise.all([
          getCourses(),
          assignmentService.getAssignments()
        ]);
        
        const fetchedCourses = coursesRes.data?.data || [];
        const fetchedAssignments = assignmentsRes.data?.data || [];

        // compute course stats
        const courseStats = fetchedCourses.map(c => {
          const courseAssignments = fetchedAssignments.filter(a => typeof a.course === 'object' ? a.course?._id === c._id : a.course === c._id);
          const total = courseAssignments.length;
          const done = courseAssignments.filter(a => a.status === 'completed').length;
          return {
            name: c.name || c.title,
            done,
            total,
            pct: total > 0 ? Math.round((done / total) * 100) : 0
          };
        });
        setCourses(courseStats);

        // compute pie segments
        const totalAsgn = fetchedAssignments.length;
        if (totalAsgn > 0) {
          const completed = fetchedAssignments.filter(a => a.status === 'completed').length;
          const overdue = fetchedAssignments.filter(a => a.status === 'overdue').length;
          const pending = totalAsgn - completed - overdue;
          setPieSegments([
            { label: "Completed", pct: Math.round((completed / totalAsgn) * 100), color: "#10b981", raw: completed },
            { label: "Pending", pct: Math.round((pending / totalAsgn) * 100), color: "#f59e0b", raw: pending },
            { label: "Overdue", pct: Math.round((overdue / totalAsgn) * 100), color: "#ef4444", raw: overdue },
          ]);
        } else {
          setPieSegments([
            { label: "Completed", pct: 0, color: "#10b981", raw: 0 },
            { label: "Pending", pct: 0, color: "#f59e0b", raw: 0 },
            { label: "Overdue", pct: 0, color: "#ef4444", raw: 0 },
          ]);
        }

        // compute weekly data (mock past 6 weeks based on completed assignments)
        // just sample data based on counts for now instead of actual dates since not all assignments have clear completion dates
        const wd = [0, 0, 0, 0, 0, 0];
        const now = new Date();
        fetchedAssignments.forEach(a => {
          if (a.status === 'completed') {
            const due = new Date(a.dueDate || now);
            const diffDays = Math.floor((now - due) / (1000 * 60 * 60 * 24));
            const weekIdx = 5 - Math.floor(diffDays / 7);
            if (weekIdx >= 0 && weekIdx <= 5) {
              wd[weekIdx]++;
            }
          }
        });
        setWeeklyData(wd);
        setWeekLabels(["W-5", "W-4", "W-3", "W-2", "Last Wk", "This Wk"]);

      } catch (err) {
        console.error("Error fetching progress data", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading progress...</div>;

  // Derived stats
  const isFirstTimeUser = courses.length === 0 && assignments.length === 0;
  const totalAssigned = assignments.length;
  const completedCount = assignments.filter(a => a.status === 'completed').length;
  const inProgressCount = totalAssigned - completedCount - assignments.filter(a => a.status === 'overdue').length;
  const overallPct = totalAssigned > 0 ? Math.round((completedCount / totalAssigned) * 100) : 0;

  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Sidebar sidebarOpen={isSidebarOpen} />

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        <nav style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <button
              onClick={() => setIsSidebarOpen(v => !v)}
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
            <p style={styles.pageLabel}>Progress</p>
          </div>
          <div style={styles.topNavRight}>
            <div style={styles.tabGroup}>
              {["Personal", "Class"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.tabBtn,
                    background: activeTab === tab ? "#2563EB" : "transparent",
                    color: activeTab === tab ? "#fff" : "#374151",
                  }}
                >
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
              {
                label: "Overall completion",
                value: `${overallPct}%`,
                sub: `${completedCount} of ${totalAssigned} completed`,
                color: "#2563EB",
                icon: (
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
                ),
              },
              {
                label: "Completion",
                value: completedCount.toString(),
                sub: "Assignments finished",
                color: "#10b981",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                label: "In Progress",
                value: inProgressCount.toString(),
                sub: "Currently working on",
                color: "#f59e0b",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                ),
              },
            ].map(({ label, value, sub, color, icon }) => (
              <div
                key={label}
                style={{ ...styles.statCard, borderTop: `3px solid ${color}` }}
              >
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
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  }
                  title="No courses yet"
                  subtitle="Looks like you haven't started any courses yet. Enroll to see your progress."
                />
              ) : (
                <div style={styles.barChart}>
                  {courses.map((c) => (
                    <div key={c.name} style={styles.barWrap}>
                      <div style={{ ...styles.bar, height: `${c.pct}px` }} />
                      <span style={styles.barLabel}>
                        {c.name.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={styles.card}>
              <p style={styles.cardTitle}>Assignment distribution status</p>
              {isFirstTimeUser ? (
                <EmptyState
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v4l3 3" />
                    </svg>
                  }
                  title="No assignments yet"
                  subtitle="Your assignments will appear here as you progress. Start a course to get going."
                />
              ) : (
                <PieChart pieSegments={pieSegments} />
              )}
            </div>
          </div>

          {/* Line Chart */}
          <div style={{ ...styles.card, marginBottom: "16px" }}>
            <p style={styles.cardTitle}>Weekly Completion Trend</p>
            {isFirstTimeUser ? (
              <EmptyState
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                }
                title="No data yet"
                subtitle="Your weekly trend will develop once you start. Keep going!"
              />
            ) : (
              <LineChart weeklyData={weeklyData} weekLabels={weekLabels} />
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
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <span style={styles.courseStat}>
                          {c.done}/{c.total}
                        </span>
                        <span style={styles.coursePct}>{c.pct}%</span>
                      </div>
                    </div>
                    <div style={styles.progressTrack}>
                      <div
                        style={{ ...styles.progressBar, width: `${c.pct}%` }}
                      />
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
  tabGroup: {
    display: "flex",
    background: "#F3F4F6",
    borderRadius: "8px",
    padding: "3px",
    gap: "2px",
  },
  tabBtn: {
    padding: "5px 14px",
    borderRadius: "6px",
    border: "none",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
  },
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
  main: { padding: "32px", flex: 1, animation: "fadeUp 0.4s ease both" },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "12px",
    marginBottom: "16px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  statLabel: {
    fontSize: "11px",
    color: "#6B7280",
    marginBottom: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statVal: { fontSize: "22px", fontWeight: "700", color: "#111827" },
  statSub: { fontSize: "11px", color: "#9CA3AF", marginTop: "4px" },
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "14px",
    marginBottom: "16px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "14px",
  },
  barChart: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
    height: "100px",
  },
  barWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    flex: 1,
  },
  bar: { width: "100%", borderRadius: "4px 4px 0 0", background: "#2563EB" },
  barLabel: { fontSize: "10px", color: "#9CA3AF", textAlign: "center" },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    gap: "10px",
  },
  emptyIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: "12px",
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: "1.6",
    maxWidth: "200px",
  },
  courseList: { display: "flex", flexDirection: "column", gap: "12px" },
  courseRow: { display: "flex", flexDirection: "column", gap: "4px" },
  courseRowTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseName: { fontSize: "13px", fontWeight: "500", color: "#111827" },
  courseStat: { fontSize: "11px", color: "#6B7280" },
  coursePct: { fontSize: "11px", fontWeight: "500", color: "#2563EB" },
  progressTrack: {
    height: "8px",
    background: "#F3F4F6",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBar: { height: "100%", borderRadius: "4px", background: "#2563EB" },
};
