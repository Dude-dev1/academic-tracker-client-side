import React, { useState, useEffect } from "react";
import Sidebar from "../components/ui/Sidebar";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import { useAuth } from "../context/AuthContext";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService";
import { useNavigate } from "react-router-dom";

export default function CoursesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    tutorName: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      if (res.success) {
        setCourses(res.data);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (course = null) => {
    if (course) {
      setFormData({
        name: course.name,
        code: course.code,
        description: course.description,
        tutorName: course.tutorName,
      });
      setEditingId(course._id);
    } else {
      setFormData({ name: "", code: "", description: "", tutorName: "" });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCourse(editingId, formData);
      } else {
        await createCourse(formData);
      }
      closeModal();
      fetchCourses();
    } catch (error) {
      console.error("Error saving course", error);
    }
  };

const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteCourse(itemToDelete);
      fetchCourses();
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  const isInstructor = user?.role === "instructor";

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";
  const initials = firstName.slice(0, 2).toUpperCase();

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Sidebar sidebarOpen={sidebarOpen} />

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
            <p style={styles.pageLabel}>Courses</p>
          </div>
          <div style={styles.topNavRight}>
            <div style={styles.avatar}>{initials}</div>
          </div>
        </nav>

        <main style={styles.main}>
          <div style={styles.headerRow}>
            <div>
              <h1 style={styles.pageTitle}>All Courses</h1>
              <p style={styles.pageSubtitle}>
                Manage your educational programs and content.
              </p>
            </div>
            {isInstructor && (
              <button onClick={() => openModal()} style={styles.createBtn}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Course
              </button>
            )}
          </div>

          {loading ? (
            <div style={styles.loadingSpinner}>Loading courses...</div>
          ) : (
            <div style={styles.grid}>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course._id} style={styles.courseCard}>
                    <div style={styles.courseCardTop}>
                      <span style={styles.courseCodeBadge}>{course.code}</span>
                      {isInstructor && (
                        <div style={styles.courseActions}>
                          <button
                            onClick={() => openModal(course)}
                            style={styles.actionBtn}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            style={{ ...styles.actionBtn, color: "#EF4444" }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    <h3 style={styles.courseName}>{course.name}</h3>
                    <p style={styles.courseDesc}>
                      {course.description || "No description provided."}
                    </p>

                    <div style={styles.courseFooter}>
                      <div style={styles.tutorAvatar}>
                        {course.tutorName
                          ? course.tutorName.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                      <div style={styles.tutorInfo}>
                        <span style={styles.tutorLabel}>Tutor</span>
                        <span style={styles.tutorName}>{course.tutorName}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.emptyState}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <p style={styles.emptyTitle}>No courses found</p>
                  <p style={styles.emptySubtitle}>
                    There are currently no courses available.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>
              {editingId ? "Edit Course" : "Create Course"}
            </h2>
            <form onSubmit={handleSubmit} style={styles.formSpace}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="e.g. Web Technologies"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Course Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="e.g. CS 301"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  style={{ ...styles.input, resize: "none", minHeight: "80px" }}
                  placeholder="Briefly describe the course..."
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Tutor Name</label>
                <input
                  type="text"
                  name="tutorName"
                  value={formData.tutorName}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.submitBtn}>
                  {editingId ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={executeDelete}
        message="Are you sure you want to delete this course?"
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
    zIndex: 10,
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
  main: { padding: "32px 28px", flex: 1, animation: "fadeUp 0.4s ease both" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  pageTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "4px",
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#6B7280",
  },
  createBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s",
  },
  loadingSpinner: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    color: "#6B7280",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  courseCard: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    padding: "24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative",
  },
  courseCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  courseCodeBadge: {
    background: "#EFF6FF",
    color: "#2563EB",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  courseActions: {
    display: "flex",
    gap: "8px",
  },
  actionBtn: {
    background: "#F3F4F6",
    border: "1px solid transparent",
    borderRadius: "6px",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#4B5563",
    transition: "all 0.2s",
  },
  courseName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
    lineHeight: "1.3",
  },
  courseDesc: {
    fontSize: "14px",
    color: "#6B7280",
    marginBottom: "24px",
    lineHeight: "1.5",
    flex: 1,
  },
  courseFooter: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingTop: "16px",
    borderTop: "1px solid #F3F4F6",
  },
  tutorAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#E5E7EB",
    color: "#4B5563",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "600",
  },
  tutorInfo: {
    display: "flex",
    flexDirection: "column",
  },
  tutorLabel: {
    fontSize: "11px",
    color: "#9CA3AF",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tutorName: {
    fontSize: "13px",
    color: "#374151",
    fontWeight: "600",
  },
  emptyState: {
    gridColumn: "1 / -1",
    background: "#fff",
    borderRadius: "16px",
    border: "1px dashed #E5E7EB",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
    marginTop: "16px",
    marginBottom: "4px",
  },
  emptySubtitle: {
    fontSize: "14px",
    color: "#6B7280",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(17, 24, 39, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "20px",
  },
  modalContent: {
    background: "#fff",
    borderRadius: "20px",
    padding: "32px",
    width: "100%",
    maxWidth: "480px",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "24px",
    fontFamily: "'Fraunces', serif",
  },
  formSpace: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  formLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1.5px solid #E5E7EB",
    outline: "none",
    fontSize: "14px",
    color: "#111827",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.2s",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  },
  cancelBtn: {
    padding: "10px 18px",
    background: "#F3F4F6",
    color: "#4B5563",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  submitBtn: {
    padding: "10px 18px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s",
  },
};
