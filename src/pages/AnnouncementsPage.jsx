import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/ui/Modal";
import Sidebar from "../components/ui/Sidebar";
const initialAnnouncements = [
  {
    id: 1,
    title: "Deadline Extended for Project Proposal",
    body: "The due date for the research paper has been extended to March 20, 2026. Please do well to submit your work by the new deadline.",
    date: "Posted Feb 5, 2026",
    pinned: true,
    iconColor: "#7C3AED",
  },
  {
    id: 2,
    title: "Workshop Reminder",
    body: "Don't forget the Web Development workshop happening on March 18th at the Great Hall. Attendance is compulsory for all students.",
    date: "Posted Feb 10, 2026",
    pinned: false,
    iconColor: "#2563EB",
  },
  {
    id: 3,
    title: "Field Trip Details",
    body: "The industry field trip to Accra is confirmed for March 24th. Please ensure you have your student ID and arrive at the bus stop by 7:30 am.",
    date: "Posted Feb 14, 2026",
    pinned: false,
    iconColor: "#10b981",
  },
];

export default function AnnouncementsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";
  const initials = firstName.slice(0, 2).toUpperCase();

  const filtered = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.body.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        input:focus { outline: none; }
      `}</style>

      <Sidebar sidebarOpen={sidebarOpen} />

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        {/* TOP NAV */}
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
            <p style={styles.pageLabel}>Announcements</p>
          </div>
          <div style={styles.topNavRight}>
            <div style={styles.avatar}>{initials}</div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main style={styles.main}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageHeaderLeft}>
              <div style={styles.annBadge}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                Announcement
              </div>
              <p style={styles.pageTitle}>Announcements</p>
            </div>
            <button style={styles.newBtn} onClick={() => setIsModalOpen(true)}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Announcement
            </button>
          </div>

          {/* Instructor Notice */}
          <div style={styles.adminNotice}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#92400E"
              strokeWidth="2"
              style={{ flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Only course instructors can post and manage announcements.
          </div>

          {/* Filters */}
          <div style={styles.filters}>
            <button style={styles.filterPillBlue}>All Announcements</button>
            <button style={styles.filterPillPurple}>Sort : Date</button>
            <div style={styles.searchBox}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
                style={{ flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>

          {/* Announcements List */}
          <div style={styles.annList}>
            {filtered.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>No announcements found.</p>
              </div>
            ) : (
              filtered.map((ann) => (
                <div key={ann.id} style={styles.annCard}>
                  <div style={styles.annCardHeader}>
                    <div style={styles.annCardTitle}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={ann.iconColor}
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                      {ann.title}
                    </div>
                    {ann.pinned && (
                      <span style={styles.pinnedBadge}>Pinned</span>
                    )}
                  </div>
                  <p style={styles.annCardBody}>{ann.body}</p>
                  <div style={styles.annCardFooter}>
                    <span style={styles.annDate}>{ann.date}</span>
                    <div style={styles.annActions}>
                      <button style={styles.editBtn}>Edit</button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(ann.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Announcement"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "4px",
              }}
            >
              Title
            </label>
            <input
              type="text"
              placeholder="Announcement title"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "4px",
              }}
            >
              Message
            </label>
            <textarea
              placeholder="Type your message here..."
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB",
                minHeight: "100px",
              }}
            ></textarea>
          </div>
          <button
            style={{
              marginTop: "16px",
              padding: "10px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "500",
              cursor: "pointer",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            Post Announcement
          </button>
        </div>
      </Modal>
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
  pageHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  pageHeaderLeft: { display: "flex", flexDirection: "column", gap: "6px" },
  annBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#EDE9FE",
    color: "#7C3AED",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
    marginBottom: "4px",
    width: "fit-content",
  },
  pageTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  newBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "0 14px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    height: "34px",
    whiteSpace: "nowrap",
  },
  adminNotice: {
    background: "#FFF9EC",
    border: "1px solid #FDE68A",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "12px",
    color: "#92400E",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    lineHeight: "1.5",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
    width: "100%",
  },
  filterPillBlue: {
    display: "flex",
    alignItems: "center",
    padding: "0 18px",
    height: "38px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    background: "#2563EB",
    color: "#fff",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  filterPillPurple: {
    display: "flex",
    alignItems: "center",
    padding: "0 18px",
    height: "38px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    background: "#7C3AED",
    color: "#fff",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 12px",
    height: "38px",
    borderRadius: "8px",
    border: "0.5px solid #E5E7EB",
    background: "#fff",
    flex: 1,
  },
  searchInput: {
    border: "none",
    background: "transparent",
    fontSize: "13px",
    color: "#111827",
    fontFamily: "'DM Sans', sans-serif",
    width: "100%",
    outline: "none",
  },
  annList: { display: "flex", flexDirection: "column", gap: "16px" },
  annCard: {
    background: "#fff",
    borderRadius: "16px",
    border: "0.5px solid #E5E7EB",
    padding: "20px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  annCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  annCardTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },
  pinnedBadge: {
    fontSize: "11px",
    background: "#EFF6FF",
    color: "#2563EB",
    padding: "3px 12px",
    borderRadius: "20px",
    fontWeight: "500",
    border: "0.5px solid #BFDBFE",
    whiteSpace: "nowrap",
  },
  annCardBody: {
    fontSize: "13px",
    color: "#6B7280",
    lineHeight: "1.7",
    marginBottom: "16px",
  },
  annCardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "12px",
    borderTop: "0.5px solid #F3F4F6",
  },
  annDate: { fontSize: "11px", color: "#9CA3AF" },
  annActions: { display: "flex", gap: "8px" },
  editBtn: {
    padding: "6px 18px",
    borderRadius: "8px",
    border: "0.5px solid #D1D5DB",
    background: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    color: "#374151",
  },
  deleteBtn: {
    padding: "6px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px",
    background: "#fff",
    borderRadius: "16px",
    border: "0.5px solid #E5E7EB",
  },
  emptyText: { fontSize: "13px", color: "#9CA3AF" },
};
