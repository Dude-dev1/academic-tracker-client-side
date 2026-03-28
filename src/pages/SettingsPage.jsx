import React, { useState, useEffect } from "react";
import Sidebar from "../components/ui/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/authService";

export default function SettingsPage() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || user?.username || user?.displayName || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || user?.username || user?.displayName || "",
        email: user?.email || "",
      });
    }
  }, [user]);

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        name: user?.name || user?.username || user?.displayName || "",
        email: user?.email || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const res = await updateProfile(formData);
      if (res.success) {
        setUser(res.user);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div style={styles.root}>
      <style>{`
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Sidebar />
      <div className="content-area-mobile-override" style={styles.content}>
        <header style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <span style={styles.pageLabel}>Settings</span>
          </div>
          <div style={styles.topNavRight}>
            <button style={styles.iconBtn}>
              <span
                style={{
                  fontSize: "18px",
                  color: "#6B7280",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </span>
            </button>
            <div className="mobile-hide" style={styles.avatar}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.headerArea}>
            <h1 style={styles.title}>Account Settings</h1>
            <p style={styles.subtitle}>
              Manage your profile details, security, and notification
              preferences.
            </p>
          </div>

          <div style={styles.grid}>
            <div style={styles.leftCol}>
              <div style={styles.navCard}>
                <div style={{ ...styles.navItem, ...styles.navItemActive }}>
                  <span style={styles.navIcon}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <span>Profile Information</span>
                </div>
                <div style={styles.navItem}>
                  <span style={styles.navIcon}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  </span>
                  <span>Notifications</span>
                </div>
                <div style={styles.navItem}>
                  <span style={styles.navIcon}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <span>Security</span>
                </div>
              </div>
            </div>

            <div style={styles.rightCol}>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <div>
                    <h2 style={styles.cardTitle}>Profile Information</h2>
                    <p style={styles.cardDesc}>
                      Personal details and contact info.
                    </p>
                  </div>
                  {!isEditing ? (
                    <button style={styles.editBtn} onClick={handleEditToggle}>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </span>{" "}
                      Edit Details
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        style={styles.cancelBtn}
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </button>
                      <button style={styles.saveBtn} onClick={handleSave}>
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name</label>
                    {isEditing ? (
                      <input
                        style={styles.input}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    ) : (
                      <p style={styles.textValue}>{formData.name}</p>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email Address</label>
                    {isEditing ? (
                      <input
                        style={styles.input}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    ) : (
                      <p style={styles.textValue}>{formData.email}</p>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Role</label>
                    <p
                      style={{
                        ...styles.textValue,
                        textTransform: "capitalize",
                      }}
                    >
                      {user?.role || "Student"}
                    </p>
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <div>
                    <h2 style={styles.cardTitle}>Notification Preferences</h2>
                    <p style={styles.cardDesc}>
                      Manage how you receive alerts.
                    </p>
                  </div>
                </div>

                <div style={styles.toggleList}>
                  <div style={styles.toggleItem}>
                    <div>
                      <h4 style={styles.toggleTitle}>Email Notifications</h4>
                      <p style={styles.toggleDesc}>
                        Receive updates directly to your inbox.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          email: !notifications.email,
                        })
                      }
                      style={{
                        ...styles.toggleBtnBg,
                        background: notifications.email ? "#2563EB" : "#E5E7EB",
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleKnob,
                          transform: notifications.email
                            ? "translateX(20px)"
                            : "translateX(0)",
                        }}
                      />
                    </button>
                  </div>

                  <div style={styles.toggleItem}>
                    <div>
                      <h4 style={styles.toggleTitle}>Push Notifications</h4>
                      <p style={styles.toggleDesc}>
                        Alerts on your dashboard and mobile.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          push: !notifications.push,
                        })
                      }
                      style={{
                        ...styles.toggleBtnBg,
                        background: notifications.push ? "#2563EB" : "#E5E7EB",
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleKnob,
                          transform: notifications.push
                            ? "translateX(20px)"
                            : "translateX(0)",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div style={styles.dangerZone}>
                <h3 style={styles.dangerTitle}>Log Out</h3>
                <p style={styles.dangerDesc}>
                  Sign out of this device securely.
                </p>
                <button
                  style={styles.redBtn}
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <span
                    style={{
                      marginRight: "6px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </span>{" "}
                  Log Out
                </button>
              </div>
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
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    height: "100vh",
    overflowY: "auto",
  },
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
  pageLabel: { fontSize: "14px", fontWeight: "600", color: "#6B7280" },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "4px",
  },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#2563EB",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    padding: "32px 40px",
    flex: 1,
    maxWidth: "1000px",
    margin: "0 auto",
    width: "100%",
    animation: "fadeUp 0.4s ease both",
  },
  headerArea: {
    marginBottom: "32px",
  },
  title: {
    fontFamily: "'Fraunces', serif",
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6B7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
    gap: "32px",
    alignItems: "start",
  },
  leftCol: {
    position: "sticky",
    top: "32px",
  },
  navCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "8px",
    border: "1px solid #E5E7EB",
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#4B5563",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  navItemActive: {
    background: "#EFF6FF",
    color: "#2563EB",
  },
  navIcon: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    padding: "24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #F3F4F6",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "4px",
  },
  cardDesc: {
    fontSize: "13px",
    color: "#6B7280",
  },
  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    background: "#F9FAFB",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    background: "#2563EB",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
  },
  cancelBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    background: "#F9FAFB",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#4B5563",
  },
  textValue: {
    fontSize: "14px",
    color: "#111827",
    fontWeight: "500",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    background: "#FAFAFA",
    transition: "border 0.2s",
  },
  toggleList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  toggleItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleTitle: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#111827",
    marginBottom: "2px",
  },
  toggleDesc: {
    fontSize: "13px",
    color: "#6B7280",
  },
  toggleBtnBg: {
    width: "44px",
    height: "24px",
    borderRadius: "12px",
    padding: "2px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    transition: "background 0.3s ease",
  },
  toggleKnob: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  },
  dangerZone: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #FECACA",
    padding: "24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
  },
  dangerTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#EF4444",
    marginBottom: "6px",
  },
  dangerDesc: {
    fontSize: "13px",
    color: "#6B7280",
    marginBottom: "16px",
  },
  redBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px 18px",
    background: "#FEF2F2",
    border: "1px solid #FCA5A5",
    color: "#EF4444",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};
