import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const personalEvents = {
  5:  { title: "Assignment Due", color: "#ef4444", time: "11:59 pm",           location: "Online submission",     desc: "Submit Financial Accounting trial balance assignment." },
  12: { title: "Study Group",    color: "#2563EB", time: "3:00 pm - 5:00 pm",  location: "Library, KNUST",        desc: "Group study session for Data Structures midterm." },
  22: { title: "Deadline",       color: "#f59e0b", time: "11:59 pm",           location: "Online submission",     desc: "Web Technologies project phase 2 submission deadline." },
  28: { title: "Exam Prep",      color: "#7C3AED", time: "9:00 am - 12:00 pm", location: "Room 204, KNUST",       desc: "Personal exam preparation session with study materials." },
};

const classEvents = {
  7:  { title: "Presentation", color: "#10b981", time: "10:00 am - 12:00 pm", location: "Lecture Hall A, KNUST", desc: "End of semester presentation for Web Technologies course." },
  18: { title: "Workshop",     color: "#2563EB", time: "2:00 pm - 4:00 pm",   location: "Great Hall, KNUST",     desc: "Hands on workshop about web Development. Be prepared for an interactive learning session." },
  24: { title: "Field Trip",   color: "#f59e0b", time: "8:00 am - 5:00 pm",   location: "Accra, Ghana",          desc: "Industry visit to tech companies in Accra." },
  30: { title: "Class Test",   color: "#ef4444", time: "9:00 am - 10:00 am",  location: "Exam Hall, KNUST",      desc: "Mid-semester class test covering weeks 1-6." },
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TOTAL_DAYS = 31;
const TODAY = 22;

function CalendarGrid({ eventsMap, onSelectEvent }) {
  const cells = [];

  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const isToday = d === TODAY;
    const ev = eventsMap[d];
    cells.push(
      <td
        key={d}
        onClick={() => ev && onSelectEvent(d)}
        style={{
          ...styles.calCell,
          background: isToday ? "#EFF6FF" : "transparent",
          cursor: ev ? "pointer" : "default",
        }}
      >
        <div style={isToday ? styles.todayNum : styles.dayNum}>{d}</div>
        {ev && (
          <div style={{ ...styles.eventPill, background: ev.color }}>
            {ev.title}
          </div>
        )}
      </td>
    );
  }

  // pad end
  while (cells.length % 7 !== 0) {
    cells.push(<td key={`empty-${cells.length}`} style={styles.emptyCell} />);
  }

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(<tr key={i}>{cells.slice(i, i + 7)}</tr>);
  }

  return (
    <table style={styles.calGrid}>
      <thead>
        <tr>
          {DAY_HEADERS.map(d => (
            <th key={d} style={styles.calTh}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function DetailPanel({ event, day, isClass }) {
  if (!event) return null;
  const date = new Date(2026, 2, day);
  const suffix = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";

  return (
    <div style={styles.detailPanel}>
      <p style={styles.detailTitle}>{event.title}</p>
      <div style={styles.detailRow}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>{DAY_NAMES[date.getDay()]} {day}{suffix} March, 2026</span>
      </div>
      <div style={styles.detailRow}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
        </svg>
        <span>{event.time}</span>
      </div>
      <div style={styles.detailRow}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <span>{event.location}</span>
      </div>
      <div style={styles.detailDesc}>{event.desc}</div>
      <div style={styles.detailActions}>
        {isClass ? (
          <p style={styles.classNotice}>Class events can only be edited by course representatives.</p>
        ) : (
          <>
            <button style={styles.editBtn}>Edit</button>
            <button style={styles.deleteBtn}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState("Personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Calendar");
  const [selectedDay, setSelectedDay] = useState(null);
  const { user } = useAuth();

  const firstName = user?.displayName?.split(" ")[0]
    || user?.name?.split(" ")[0]
    || user?.email?.split("@")[0]
    || "there";
  const initials = firstName.slice(0, 2).toUpperCase();

  const isClass = activeTab === "Class";
  const eventsMap = isClass ? classEvents : personalEvents;
  const selectedEvent = selectedDay ? eventsMap[selectedDay] : null;

  const navItems = [
    { label: "Home", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { label: "Progress", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
    { label: "Calendar", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  ];

  const settingsItem = {
    label: "Settings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>
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
            <button key={label} onClick={() => setActiveNav(label)} title={!sidebarOpen ? label : ""} style={{
              ...styles.navItem,
              background: activeNav === label ? "#EFF6FF" : "transparent",
              color: activeNav === label ? "#2563EB" : "#6B7280",
              borderLeft: activeNav === label ? "3px solid #2563EB" : "3px solid transparent",
              justifyContent: sidebarOpen ? "flex-start" : "center",
            }}>
              {icon}
              {sidebarOpen && <span style={styles.navLabel}>{label}</span>}
            </button>
          ))}
        </div>
        <div style={styles.sidebarBottom}>
          <button onClick={() => setActiveNav("Settings")} title={!sidebarOpen ? "Settings" : ""} style={{
            ...styles.navItem,
            background: activeNav === "Settings" ? "#EFF6FF" : "transparent",
            color: activeNav === "Settings" ? "#2563EB" : "#6B7280",
            borderLeft: activeNav === "Settings" ? "3px solid #2563EB" : "3px solid transparent",
            justifyContent: sidebarOpen ? "flex-start" : "center",
          }}>
            {settingsItem.icon}
            {sidebarOpen && <span style={styles.navLabel}>Settings</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        {/* TOP NAV */}
        <nav style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <button onClick={() => setSidebarOpen(v => !v)} style={styles.toggleBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <p style={styles.pageLabel}>Calendar</p>
          </div>
          <div style={styles.topNavRight}>
            <div style={styles.tabGroup}>
              {["Personal", "Class"].map(tab => (
                <button key={tab} onClick={() => { setActiveTab(tab); setSelectedDay(null); }} style={{
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

        {/* PAGE CONTENT */}
        <main style={styles.main}>
          {/* Calendar Header */}
          <div style={styles.calHeader}>
            <div style={styles.calHeaderLeft}>
              <div style={{
                ...styles.eventsBadge,
                background: isClass ? "#EDE9FE" : "#EFF6FF",
                color: isClass ? "#7C3AED" : "#2563EB",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {isClass ? "Class Events" : "My Events"}
              </div>
              <div style={styles.viewSwitcher}>
                {["Month", "Week", "Today"].map((v, i) => (
                  <button key={v} style={{
                    ...styles.viewBtn,
                    background: i === 0 ? "var(--color-background-secondary, #F3F4F6)" : "transparent",
                    fontWeight: i === 0 ? "500" : "400",
                    borderRight: i < 2 ? "0.5px solid #E5E7EB" : "none",
                  }}>{v}</button>
                ))}
              </div>
            </div>
            {isClass ? (
              <span style={styles.readonlyBadge}>View only</span>
            ) : (
              <button style={styles.addBtn}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Event
              </button>
            )}
          </div>

          {/* Calendar Nav */}
          <div style={styles.calNav}>
            <button style={styles.calNavBtn}>‹</button>
            <span style={styles.calMonth}>March 2026</span>
            <button style={styles.calNavBtn}>›</button>
          </div>

          {/* Calendar Grid */}
          <CalendarGrid
            eventsMap={eventsMap}
            onSelectEvent={(d) => setSelectedDay(d === selectedDay ? null : d)}
          />

          {/* Detail Panel */}
          {selectedEvent && (
            <DetailPanel
              event={selectedEvent}
              day={selectedDay}
              isClass={isClass}
            />
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
  main: { padding: "20px 24px", flex: 1, animation: "fadeUp 0.4s ease both" },
  calHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", gap: "8px" },
  calHeaderLeft: { display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 },
  eventsBadge: { display: "flex", alignItems: "center", gap: "5px", padding: "0 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "500", height: "32px", whiteSpace: "nowrap", flexShrink: 0 },
  viewSwitcher: { display: "flex", alignItems: "center", background: "#fff", border: "0.5px solid #E5E7EB", borderRadius: "8px", overflow: "hidden", height: "32px", flexShrink: 0 },
  viewBtn: { padding: "0 10px", fontSize: "11px", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#6B7280", height: "100%", whiteSpace: "nowrap" },
  addBtn: { display: "flex", alignItems: "center", gap: "5px", padding: "0 12px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "500", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", height: "32px", whiteSpace: "nowrap", flexShrink: 0 },
  readonlyBadge: { display: "flex", alignItems: "center", padding: "0 12px", background: "#F3F4F6", color: "#9CA3AF", borderRadius: "8px", fontSize: "12px", border: "0.5px solid #E5E7EB", height: "32px", whiteSpace: "nowrap", flexShrink: 0 },
  calNav: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" },
  calNavBtn: { background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: "18px", padding: "4px 8px" },
  calMonth: { fontSize: "14px", fontWeight: "500", color: "#111827" },
  calGrid: { width: "100%", borderCollapse: "collapse", tableLayout: "fixed" },
  calTh: { fontSize: "11px", color: "#9CA3AF", padding: "5px 3px", textAlign: "center", fontWeight: "500", borderBottom: "0.5px solid #E5E7EB" },
  calCell: { border: "0.5px solid #E5E7EB", verticalAlign: "top", padding: "4px", height: "72px" },
  emptyCell: { border: "0.5px solid #E5E7EB", background: "#F9FAFB", opacity: 0.5 },
  dayNum: { fontSize: "11px", color: "#6B7280", marginBottom: "3px" },
  todayNum: { background: "#2563EB", color: "#fff", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", marginBottom: "3px" },
  eventPill: { fontSize: "10px", padding: "2px 5px", borderRadius: "3px", marginBottom: "2px", fontWeight: "500", color: "#fff", whiteSpace: "normal", wordBreak: "break-word", lineHeight: "1.3" },
  detailPanel: { background: "#fff", borderRadius: "16px", border: "0.5px solid #E5E7EB", padding: "16px", marginTop: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  detailTitle: { fontSize: "15px", fontWeight: "600", color: "#111827", marginBottom: "10px" },
  detailRow: { display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#6B7280", marginBottom: "6px" },
  detailDesc: { fontSize: "12px", color: "#9CA3AF", lineHeight: "1.6", margin: "10px 0", padding: "10px", background: "#F9FAFB", borderRadius: "8px" },
  detailActions: { display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "center", marginTop: "10px" },
  editBtn: { padding: "6px 18px", borderRadius: "8px", border: "0.5px solid #D1D5DB", background: "#fff", fontSize: "12px", fontWeight: "500", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#374151" },
  deleteBtn: { padding: "6px 18px", borderRadius: "8px", border: "none", background: "#ef4444", color: "#fff", fontSize: "12px", fontWeight: "500", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  classNotice: { fontSize: "11px", color: "#9CA3AF", fontStyle: "italic" },
};