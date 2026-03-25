import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ sidebarOpen = true }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const styles = {
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
      background: "transparent",
    },
    navLabel: { fontSize: "13px" },
    sidebarBottom: { borderTop: "1px solid #E5E7EB", padding: "12px 0" },
  };

  const navItems = [
    {
      label: "Home",
      path: "/dashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Progress",
      path: "/progress",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      label: "Calendar",
      path: "/calendar",
      icon: (
        <svg
          width="18"
          height="18"
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
      label: "Assignments",
      path: "/assignments",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
    },
    {
      label: "Announcements",
      path: "/announcements",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    },
  ];

  if (user?.role === "instructor") {
    navItems.push({
      label: "Course Info",
      path: "/classinfo",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    });
  }

  const settingsItem = {
    label: "Settings",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
      </svg>
    ),
  };

  const profileItem = {
    label: "Profile",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  };

  return (
    <aside style={{ ...styles.sidebar, width: sidebarOpen ? "220px" : "64px" }}>
      <div style={styles.sidebarLogo}>
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#2563EB" />
          <path
            d="M8 10h10M8 16h16M8 22h6"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        {sidebarOpen && <span style={styles.sidebarLogoName}>Agenda</span>}
      </div>
      <div style={styles.navItems}>
        {navItems.map(({ label, icon, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            title={!sidebarOpen ? label : ""}
            style={{
              ...styles.navItem,
              background:
                location.pathname === path ? "#EFF6FF" : "transparent",
              color: location.pathname === path ? "#2563EB" : "#6B7280",
              borderLeft:
                location.pathname === path
                  ? "3px solid #2563EB"
                  : "3px solid transparent",
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
          onClick={() => navigate("/profile")}
          title={!sidebarOpen ? "Profile" : ""}
          style={{
            ...styles.navItem,
            background:
              location.pathname === "/profile" ? "#EFF6FF" : "transparent",
            color: location.pathname === "/profile" ? "#2563EB" : "#6B7280",
            borderLeft:
              location.pathname === "/profile"
                ? "3px solid #2563EB"
                : "3px solid transparent",
            justifyContent: sidebarOpen ? "flex-start" : "center",
          }}
        >
          {profileItem.icon}
          {sidebarOpen && <span style={styles.navLabel}>Profile</span>}
        </button>
        <button
          onClick={() => navigate("/settings")}
          title={!sidebarOpen ? "Settings" : ""}
          style={{
            ...styles.navItem,
            background:
              location.pathname === "/settings" ? "#EFF6FF" : "transparent",
            color: location.pathname === "/settings" ? "#2563EB" : "#6B7280",
            borderLeft:
              location.pathname === "/settings"
                ? "3px solid #2563EB"
                : "3px solid transparent",
            justifyContent: sidebarOpen ? "flex-start" : "center",
          }}
        >
          {settingsItem.icon}
          {sidebarOpen && <span style={styles.navLabel}>Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
