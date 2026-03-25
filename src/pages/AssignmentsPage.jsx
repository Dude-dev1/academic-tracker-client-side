import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/ui/Modal";
import Sidebar from "../components/ui/Sidebar";
const personalData = [
  {
    title: "Web Tech Assignment",
    dueDate: "March 15, 2026",
    submissions: "1/1",
    status: "open",
  },
  {
    title: "Data Structures Lab",
    dueDate: "March 5, 2026",
    submissions: "1/1",
    status: "closed",
  },
  {
    title: "Accounting Quiz",
    dueDate: "March 6, 2026",
    submissions: "0/1",
    status: "overdue",
  },
];

const classData = [
  {
    title: "Project Proposal",
    dueDate: "March 15, 2026",
    submissions: "12/18",
    status: "open",
  },
  {
    title: "Lab Report",
    dueDate: "March 5, 2026",
    submissions: "18/18",
    status: "closed",
  },
  {
    title: "Trial Balance 3",
    dueDate: "March 6, 2026",
    submissions: "18/18",
    status: "overdue",
  },
];

function statusStyle(status) {
  if (status === "open") return { background: "#D1FAE5", color: "#065F46" };
  if (status === "closed") return { background: "#F3F4F6", color: "#6B7280" };
  return { background: "#FEE2E2", color: "#991B1B" };
}

function statusLabel(status) {
  return status === "overdue" ? "overdue soon" : status;
}

function ActionDropdown({ onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div ref={ref} style={styles.dropdown}>
      {[
        {
          label: "View Submission",
          icon: (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ),
        },
        {
          label: "Edit",
          icon: (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          ),
        },
        {
          label: "Duplicate",
          icon: (
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
          ),
        },
        {
          label: "Delete",
          icon: (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          ),
          red: true,
        },
      ].map(({ label, icon, red }) => (
        <button
          key={label}
          style={{ ...styles.dropdownItem, color: red ? "#ef4444" : undefined }}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}

function AssignmentRow({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <tr style={styles.row}>
      <td style={styles.titleCell}>{row.title}</td>
      <td style={styles.dateCell}>{row.dueDate}</td>
      <td style={styles.subCell}>{row.submissions}</td>
      <td>
        <span style={{ ...styles.statusPill, ...statusStyle(row.status) }}>
          {statusLabel(row.status)}
        </span>
      </td>
      <td style={{ position: "relative" }}>
        <button onClick={() => setOpen((v) => !v)} style={styles.actionBtn}>
          •••
        </button>
        {open && <ActionDropdown onClose={() => setOpen(false)} />}
      </td>
    </tr>
  );
}

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("Personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const isClass = activeTab === "Class";
  const data = isClass ? classData : personalData;

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";
  const initials = firstName.slice(0, 2).toUpperCase();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        tr:hover td { background: #F9FAFB; }
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
            <p style={styles.pageLabel}>Assignments</p>
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

        {/* PAGE CONTENT */}
        <main style={styles.main}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageHeaderLeft}>
              <div style={styles.assignmentBadge}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                Assignment
              </div>
              <p style={styles.pageTitle}>Assignments</p>
              <p style={styles.pageSub}>
                Manage all{" "}
                <span style={styles.pageSubHighlight}>
                  {isClass ? "class" : "your"}
                </span>{" "}
                assignments and submissions
              </p>
            </div>
            <button
              style={styles.createBtn}
              onClick={() => setIsModalOpen(true)}
            >
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
              Create Assignment
            </button>
          </div>

          {/* Filters */}
          <div style={styles.filters}>
            <button style={styles.filterPillBlue}>All Assignments</button>
            <button style={styles.filterPillPurple}>Sort : Due Date</button>
            <div style={styles.searchBox}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                Search assignment
              </span>
            </div>
          </div>

          {/* Table */}
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Due Date</th>
                  <th style={styles.th}>Submissions</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <AssignmentRow key={i} row={row} />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Assignment"
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
              placeholder="Enter assignment title"
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
              Due Date
            </label>
            <input
              type="date"
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
              Course
            </label>
            <select
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB",
              }}
            >
              <option>Select a course</option>
              <option>Web Tech</option>
              <option>Data Structures</option>
            </select>
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
            Save Assignment
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
  main: { padding: "24px", flex: 1, animation: "fadeUp 0.4s ease both" },
  pageHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  pageHeaderLeft: { display: "flex", flexDirection: "column", gap: "4px" },
  assignmentBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#EDE9FE",
    color: "#7C3AED",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
    marginBottom: "8px",
    width: "fit-content",
  },
  pageTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  pageSub: { fontSize: "13px", color: "#6B7280", marginTop: "2px" },
  pageSubHighlight: { color: "#2563EB", fontWeight: "600" },
  createBtn: {
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
  filters: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  filterPillBlue: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "0 14px",
    height: "30px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    background: "#2563EB",
    color: "#fff",
  },
  filterPillPurple: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "0 14px",
    height: "30px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    background: "#7C3AED",
    color: "#fff",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "0 10px",
    height: "30px",
    borderRadius: "8px",
    border: "0.5px solid #E5E7EB",
    background: "#fff",
    marginLeft: "auto",
  },
  tableWrap: {
    background: "#fff",
    borderRadius: "16px",
    border: "0.5px solid #E5E7EB",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { borderBottom: "0.5px solid #E5E7EB", background: "#F9FAFB" },
  th: {
    padding: "10px 16px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#6B7280",
    textAlign: "left",
  },
  row: { cursor: "default" },
  titleCell: {
    padding: "12px 16px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#111827",
    borderBottom: "0.5px solid #F3F4F6",
  },
  dateCell: {
    padding: "12px 16px",
    fontSize: "12px",
    color: "#6B7280",
    borderBottom: "0.5px solid #F3F4F6",
  },
  subCell: {
    padding: "12px 16px",
    fontSize: "12px",
    color: "#6B7280",
    borderBottom: "0.5px solid #F3F4F6",
  },
  statusPill: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "500",
  },
  actionBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 6px",
    borderRadius: "6px",
    color: "#9CA3AF",
    fontSize: "16px",
    letterSpacing: "2px",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "28px",
    background: "#fff",
    border: "0.5px solid #E5E7EB",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
    padding: "6px",
    zIndex: 50,
    minWidth: "160px",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#374151",
    cursor: "pointer",
    border: "none",
    background: "none",
    fontFamily: "'DM Sans', sans-serif",
    width: "100%",
    textAlign: "left",
  },
};
