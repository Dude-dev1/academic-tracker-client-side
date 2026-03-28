import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import ConfirmModal from "../components/ui/ConfirmModal";
import Sidebar from "../components/ui/Sidebar";
import assignmentService from "../services/assignmentService";
import * as courseService from "../services/courseService";
import { useToast } from "../context/ToastContext";

function statusStyle(status) {
  if (status === "open") return { background: "#D1FAE5", color: "#065F46" };
  if (status === "completed") return { background: "#DBEAFE", color: "#2563EB" };
  if (status === "completed") return { background: "#DBEAFE", color: "#2563EB" };
  if (status === "closed") return { background: "#F3F4F6", color: "#6B7280" };
  return { background: "#FEE2E2", color: "#991B1B" };
}

function statusLabel(status) {
  return status === "overdue" ? "overdue soon" : status;
}

function groupStyle(group) {
  if (group === "Group 1") return { background: "#F3E8FF", color: "#6D28D9" }; // purple
  if (group === "Group 2") return { background: "#FEF3C7", color: "#B45309" }; // yellow/orange
  return { background: "#DBEAFE", color: "#1D4ED8" }; // light blue for "All"
}

function ActionDropdown({ onClose, onDelete, onEdit, row, onComplete }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [onClose]);

  return (
    <div ref={ref} style={styles.dropdown} onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
      {[
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
          onClick: () => {
            if (onEdit) onEdit();
            onClose();
          },
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
          onClick: () => {
            onDelete();
            onClose();
          },
        },
      ].map(({ label, icon, red, onClick }) => (
        <button
          key={label}
          onClick={(e) => {
            e.stopPropagation();
            onClick(e);
          }}
          style={{ ...styles.dropdownItem, color: red ? "#ef4444" : undefined }}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}

function AssignmentRow({ row, onDelete, onEdit, onView }) {
  const [open, setOpen] = useState(false);

  return (
    <tr 
      style={{ ...styles.row, cursor: "pointer" }} 
      onClick={(e) => {
        // Prevent row click if clicking a button, link, or dropdown
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.action-dropdown-ignore')) return;
        if (onView) onView(row);
      }}
    >
      <td style={styles.titleCell}>{row.title}</td>
      <td style={styles.dateCell}>
        {row.attachmentUrl ? (
          <a href={row.attachmentUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB", textDecoration: "underline" }} onClick={(e) => e.stopPropagation()}>View</a>
        ) : (
          <span style={{ color: "#9CA3AF" }}>None</span>
        )}
      </td>
      <td style={styles.dateCell}>
        {new Date(row.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td style={styles.subCell}>
        <span
          style={{ ...styles.statusPill, ...groupStyle(row.group || "All") }}
        >
          {row.group || "All"}
        </span>
      </td>
      <td>
        <span style={{ ...styles.statusPill, ...statusStyle(row.status) }}>
          {statusLabel(row.status)}
        </span>
      </td>
      <td className="action-dropdown-ignore" style={{ position: "relative", padding: "8px" }} onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((v) => !v); }} 
          onTouchStart={(e) => e.stopPropagation()}
          style={styles.actionBtn}
        >
          •••
        </button>
        {open && (
          <ActionDropdown
            onClose={() => setOpen(false)}
            onDelete={() => onDelete(row._id)}
            onEdit={() => onEdit(row)}
            row={row}
            onComplete={onEdit} 
          />
        )}
      </td>
    </tr>
  );
}

export default function AssignmentsPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("Personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");

  // Data states
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newGroup, setNewGroup] = useState("All");
  const [newFile, setNewFile] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [viewAssignment, setViewAssignment] = useState(null);

  const { user } = useAuth();
  const isClass = activeTab === "Class";

  const displayData = assignments
    .filter((a) => {
      const matchesTab = isClass ? a.courseId : !a.courseId;
      const matchesSearch = a.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === "group") {
        const groupA = a.group || "All";
        const groupB = b.group || "All";
        return groupA.localeCompare(groupB);
      }
      return 0;
    });

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";
  const initials = firstName.slice(0, 2).toUpperCase();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const assignRes = await assignmentService.getAssignments();
      setAssignments(assignRes.data || []);

      const courseRes = await courseService.getCourses();
      setCourses(courseRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!newTitle || !newDueDate) return;
    try {
      const payload = new FormData();
      payload.append("title", newTitle);
      payload.append("dueDate", newDueDate);
      payload.append("group", newGroup);
      if (newCourseId) {
        payload.append("courseId", newCourseId);
      }
      if (newFile) {
        payload.append("attachment", newFile);
      }

      if (editingId) {
        await assignmentService.updateAssignment(editingId, payload);
      } else {
        await assignmentService.createAssignment(payload);
        addToast("Success", "Assignment created successfully", "success");
      }
      setIsModalOpen(false);

      // Reset
      setNewTitle("");
      setNewDueDate("");
      setNewCourseId("");
      setNewGroup("All");
      setEditingId(null);

      // Refresh
      fetchData();
    } catch (err) {
      console.error(err);
      addToast("Failed", err.response?.data?.message || `Failed to ${editingId ? "update" : "create"} assignment`, "error");
    }
  };

  const openEditModal = async (a) => {
    if (a.overrideStatusOnly) {
      try {
        await assignmentService.updateAssignment(a._id, { status: a.status });
        fetchData();
      } catch (err) {
        console.error("Update failed", err);
      }
      return;
    }
    setEditingId(a._id);
    setNewTitle(a.title);
    setNewDueDate(
      a.dueDate
        ? ((d) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
              2,
              "0"
            )}-${String(d.getDate()).padStart(2, "0")}`)(new Date(a.dueDate))
        : ""
    );
    setNewCourseId(a.courseId?._id || a.courseId || "");
    setNewGroup(a.group || "All");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    try {
      await assignmentService.deleteAssignment(itemToDelete);
      fetchData();
      setItemToDelete(null);
    } catch (err) {
      console.error("Delete failed", err);
      addToast("Failed", err.response?.data?.message || "Delete failed", "error");
    }
  };

  return (
    <div style={styles.root}>
      <style>{`
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        tr:hover td { background: #F9FAFB; }

        /* Mobile overrides */
        @media (max-width: 768px) {
          .assignments-header-mobile {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .filters-mobile {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .search-box-mobile {
            margin-left: 0 !important;
            width: 100% !important;
          }
          .table-wrapper {
            overflow-x: auto !important;
            padding-bottom: 120px !important; /* Prevents action dropdown from clipping */
          }
        }
      `}</style>

      <Sidebar sidebarOpen={sidebarOpen} />

      {/* MAIN CONTENT */}
      <div className="content-area-mobile-override" style={styles.content}>
        {/* TOP NAV */}
        <nav style={styles.topNav}>
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
            <div className="mobile-hide" style={styles.avatar}>{initials}</div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main style={styles.main}>
          {/* Page Header */}
          <div className="assignments-header-mobile" style={styles.pageHeader}>
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
          <div className="filters-mobile" style={styles.filters}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button style={styles.filterPillBlue}>All Assignments</button>
              <button
                style={styles.filterPillPurple}
                onClick={() =>
                  setSortBy((prev) => (prev === "dueDate" ? "group" : "dueDate"))
                }
              >
                Sort : {sortBy === "dueDate" ? "Due Date" : "Group"}
              </button>
            </div>
            <div className="search-box-mobile" style={styles.searchBox}>
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
              <input
                type="text"
                placeholder="Search assignment"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "12px",
                  color: "#374151",
                  width: "100%",
                  background: "transparent",
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper" style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Attachment</th>
                  <th style={styles.th}>Due Date</th>
                  <th style={styles.th}>Group</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#6B7280",
                      }}
                    >
                      Loading assignments...
                    </td>
                  </tr>
                ) : displayData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#6B7280",
                      }}
                    >
                      No {activeTab.toLowerCase()} assignments found.
                    </td>
                  </tr>
                ) : (
                  displayData.map((row, i) => (
                    <AssignmentRow
                      key={row._id || i}
                      row={row}
                      onDelete={handleDelete}
                      onEdit={openEditModal}
                      onView={setViewAssignment}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewTitle("");
          setNewDueDate("");
          setNewCourseId("");
          setNewGroup("All");
          setEditingId(null);
        }}
        title={editingId ? "Edit Assignment" : "Create Assignment"}
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
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
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
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB",
              }}
            />
          </div>

          {/* Only show Course selection for Class tab or maybe always, let user pick */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "4px",
              }}
            >
              Course (Optional)
            </label>
            <select
              value={newCourseId}
              onChange={(e) => setNewCourseId(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB",
              }}
            >
              <option value="">Personal Assignment (No Course)</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
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
              Group
            </label>
            <select
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB",
              }}
            >
              <option value="All">All</option>
              <option value="Group 1">Group 1</option>
              <option value="Group 2">Group 2</option>
            </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Attachment (Image / PDF)
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setNewFile(e.target.files[0]);
                  } else {
                    setNewFile(null);
                  }
                }}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #D1D5DB",
                  background: "#fff",
                }}
              />
            </div>
            <button
              onClick={handleSave}
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
          >
            Save Assignment
          </button>
        </div>
      </Modal>

      
      


      


      

      
      

      
      

      
      

      
      

      
      <Modal isOpen={!!viewAssignment} onClose={() => setViewAssignment(null)} title="Assignment Details">
        {viewAssignment && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "15px", color: "#374151" }}>
            <p><strong>Title:</strong> {viewAssignment.title}</p>
            {viewAssignment.courseId && <p><strong>Course:</strong> {typeof viewAssignment.courseId === "object" ? (viewAssignment.courseId.name || viewAssignment.courseId.code) : viewAssignment.courseId}</p>}
            <p><strong>Due Date:</strong> {new Date(viewAssignment.dueDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            <p><strong>Group:</strong> {viewAssignment.group || "All"}</p>
            <p><strong>Status:</strong> {viewAssignment.status}</p>
            <p><strong>Points:</strong> {viewAssignment.points || 100}</p>
            {viewAssignment.description && <p><strong>Description:</strong> {viewAssignment.description}</p>}
            {viewAssignment.attachmentUrl && (
              <p><strong>Attachment:</strong> <a href={viewAssignment.attachmentUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB", textDecoration: "underline" }} onClick={(e) => e.stopPropagation()}>View File</a></p>
            )}
            
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <button 
                onClick={(e) => { e.stopPropagation(); setViewAssignment(null); }}
                style={{ padding: "8px 16px", background: "#f3f4f6", color: "#374151", borderRadius: "6px", border: "1px solid #d1d5db", cursor: "pointer", fontWeight: "500" }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={executeDelete}
        message="Are you sure you want to delete this assignment?"
      />
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
    overflow: "visible",
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
    fontSize: "18px",
    color: "#9CA3AF",
    cursor: "pointer",
    padding: "8px 12px", // Increased padding for touch targets
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "40px",
    minHeight: "40px"
  },
  dropdown: {
    position: "absolute",
    right: "10px", // added offset so it doesn't touch the very edge
    top: "100%",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    zIndex: 50,
    padding: "4px",
    minWidth: "160px",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "8px 12px",
    border: "none",
    background: "none",
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
    cursor: "pointer",
    borderRadius: "4px",
    textAlign: "left",
  },
};
