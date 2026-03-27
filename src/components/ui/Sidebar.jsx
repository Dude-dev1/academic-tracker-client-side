import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ sidebarOpen = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [internalExpanded, setInternalExpanded] = useState(sidebarOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setInternalExpanded(sidebarOpen);
  }, [sidebarOpen]);

  // Use parent prop on desktop, local on mobile
  const expanded = isMobile ? internalExpanded : sidebarOpen;
  
  // Custom user variables based on context
  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "User";
  const role = user?.role === "instructor" ? "Instructor" : "Student";
  const initials = firstName.slice(0, 2).toUpperCase();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Courses",
      path: "/courses",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      label: "Progress",
      path: "/progress",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      label: "Schedule",
      path: "/calendar",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24">
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
        <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
    },
    {
      label: "Announcements",
      path: "/announcements",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    }
  ];

  if (user?.role === "instructor") {
    navItems.push({
      label: "Class Info",
      path: "/classinfo",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    });
  }

  // --- DESKTOP RENDER ---
  if (!isMobile) {
    const desktopStyles = {
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
        width: expanded ? "220px" : "64px"
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
      sidebarBottom: { borderTop: "1px solid #E5E7EB", padding: "12px 0" },
    };

    return (
      <aside style={desktopStyles.sidebar}>
        <div style={desktopStyles.sidebarLogo}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#2563EB" />
            <path d="M8 10h10M8 16h16M8 22h6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {expanded && <span style={desktopStyles.sidebarLogoName}>Agenda</span>}
        </div>
        <div style={desktopStyles.navItems}>
          {navItems.map(({ label, icon, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              title={!expanded ? label : ""}
              style={{
                ...desktopStyles.navItem,
                background: location.pathname === path ? "#EFF6FF" : "transparent",
                color: location.pathname === path ? "#2563EB" : "#6B7280",
                borderLeft: location.pathname === path ? "3px solid #2563EB" : "3px solid transparent",
                justifyContent: expanded ? "flex-start" : "center",
              }}
            >
              <div style={{minWidth: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                 {icon}
              </div>
              {expanded && <span>{label}</span>}
            </button>
          ))}
        </div>
        <div style={desktopStyles.sidebarBottom}>
          <button
            onClick={() => navigate("/profile")}
            title={!expanded ? "Profile" : ""}
            style={{
              ...desktopStyles.navItem,
              background: location.pathname === "/profile" ? "#EFF6FF" : "transparent",
              color: location.pathname === "/profile" ? "#2563EB" : "#6B7280",
              borderLeft: location.pathname === "/profile" ? "3px solid #2563EB" : "3px solid transparent",
              justifyContent: expanded ? "flex-start" : "center",
            }}
          >
            <div style={{minWidth: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
               <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
            {expanded && <span>Profile</span>}
          </button>
          <button
            onClick={() => navigate("/settings")}
            title={!expanded ? "Settings" : ""}
            style={{
              ...desktopStyles.navItem,
              background: location.pathname === "/settings" ? "#EFF6FF" : "transparent",
              color: location.pathname === "/settings" ? "#2563EB" : "#6B7280",
              borderLeft: location.pathname === "/settings" ? "3px solid #2563EB" : "3px solid transparent",
              justifyContent: expanded ? "flex-start" : "center",
            }}
          >
             <div style={{minWidth: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" /></svg>
             </div>
            {expanded && <span>Settings</span>}
          </button>
          <button
            onClick={() => logout()}
            title={!expanded ? "Logout" : ""}
            style={{
              ...desktopStyles.navItem,
              background: "transparent",
              color: "#EF4444",
              borderLeft: "3px solid transparent",
              justifyContent: expanded ? "flex-start" : "center",
              marginTop: "24px",
              borderTop: "1px solid #E5E7EB",
            }}
          >
             <div style={{minWidth: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
               <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
             </div>
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </aside>
    );
  }

  // --- MOBILE RENDER (As requested via Mockup) ---
  const mStyles = {
    overlay: {
       position: "fixed",
       top: 0, left: 0, right: 0, bottom: 0,
       backgroundColor: "rgba(0,0,0,0)", 
       pointerEvents: "none",
       zIndex: 9998,
    },
    sidebar: {
      position: "fixed",
      top: "0",
      left: "0",
      height: "100vh",
      background: "#fff",
      borderRadius: "0",
      boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      width: expanded ? "280px" : "80px",
      zIndex: 9999,
      overflow: "visible", // So toggle btn overflows
      padding: expanded ? "24px 20px" : "24px 16px",
      fontFamily: "'DM Sans', sans-serif",
    },
    toggleBtn: {
      position: "absolute",
      right: expanded ? "-12px" : "-12px",
      top: "32px",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: "#2563EB",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "2px solid #F0F4FF",
      boxShadow: "0 2px 5px rgba(37, 99, 235, 0.4)",
      zIndex: 10,
    },
    topSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "24px",
      flexShrink: 0,
      overflow: "hidden", 
      whiteSpace: "nowrap"
    },
    avatar: {
      minWidth: "44px",
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      background: "#2563EB",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      fontSize: "16px",
      letterSpacing: "0.5px"
    },
    userInfo: {
      display: expanded ? "flex" : "none",
      flexDirection: "column",
      justifyContent: "center",
      flex: 1
    },
    userName: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#111827",
    },
    userRole: {
      fontSize: "12px",
      color: "#6B7280",
      fontWeight: "500",
    },
    searchBoxWrapper: {
      display: "flex",
      alignItems: "center",
      background: "#F9FAFB",
      borderRadius: "12px",
      padding: expanded ? "10px 14px" : "12px",
      marginBottom: "24px",
      cursor: "text",
      overflow: "hidden",
      justifyContent: expanded ? "flex-start" : "center", // Center icon when minimized
    },
    searchIcon: {
      minWidth: "16px",
      color: "#9CA3AF"
    },
    searchInput: {
      border: "none",
      background: "transparent",
      outline: "none",
      fontSize: "13px",
      marginLeft: "10px",
      width: "100%",
      display: expanded ? "block" : "none",
      color: "#374151"
    },
    navItemsWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
    },
    navBtn: (isActive) => ({
      display: "flex",
      alignItems: "center",
      padding: expanded ? "12px 16px" : "14px",
      borderRadius: "12px",
      background: isActive ? "#2563EB" : "transparent",
      color: isActive ? "#fff" : "#6B7280",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
      width: "100%",
      justifyContent: expanded ? "flex-start" : "center",
      whiteSpace: "nowrap",
    }),
    navLabel: {
      marginLeft: "14px",
      fontSize: "13px",
      fontWeight: "600",
      display: expanded ? "block" : "none"
    },
    bottomSection: {
      marginTop: "auto",
      borderTop: "1px solid #F3F4F6",
      paddingTop: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    },
    darkModeSwitch: {
      display: "flex",
      alignItems: "center",
      justifyContent: expanded ? "space-between" : "center",
      padding: expanded ? "12px 14px" : "14px",
      background: "#F9FAFB",
      borderRadius: "12px",
      cursor: "pointer",
      color: "#6B7280",
    },
    switchTrack: {
      width: "32px",
      height: "18px",
      background: "#E5E7EB",
      borderRadius: "20px",
      position: "relative",
      display: expanded ? "block" : "none"
    },
    switchThumb: {
      width: "14px",
      height: "14px",
      background: "#fff",
      borderRadius: "50%",
      position: "absolute",
      top: "2px",
      left: "2px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          /* Allow main content to wrap text properly instead of shrinking to 0 */
          main, .content {
             max-width: 100vw !important;
          }
        }
      `}</style>
      
      {isMobile && <div style={{flexShrink: 0, width: "50px", transition: "width 0.35s"}} />}

      {expanded && (
        <div 
          style={mStyles.overlay} 
          onClick={() => setInternalExpanded(false)} 
        />
      )}

      <aside style={mStyles.sidebar}>
        {/* Hover Toggle Button on Edge */}
        <div 
          style={mStyles.toggleBtn}
          onClick={(e) => {
             e.stopPropagation();
             setInternalExpanded(!expanded);
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            {expanded ? (
              <polyline points="15 18 9 12 15 6" />
            ) : (
              <polyline points="9 18 15 12 9 6" />
            )}
          </svg>
        </div>

        {/* User Auth Section */}
        <div style={mStyles.topSection}>
          <div style={mStyles.avatar}>{initials}</div>
          <div style={mStyles.userInfo}>
            <span style={mStyles.userName}>{firstName}</span>
            <span style={mStyles.userRole}>{role}</span>
          </div>
        </div>

        {/* Search */}
        <div style={mStyles.searchBoxWrapper}>
          <svg style={mStyles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input 
            type="text" 
            placeholder="Search..." 
            style={mStyles.searchInput}
          />
        </div>

        {/* Main Nav Links */}
        <div style={mStyles.navItemsWrapper}>
          {navItems.map(({ label, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                title={!expanded ? label : ""}
                style={mStyles.navBtn(isActive)}
              >
                <div style={{minWidth: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                   {icon}
                </div>
                <span style={mStyles.navLabel}>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Utils */}
        <div style={mStyles.bottomSection}>
          <button
            onClick={() => navigate("/settings")}
            style={mStyles.navBtn(location.pathname === "/settings")}
            title={!expanded ? "Settings" : ""}
          >
             <div style={{minWidth: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
               <svg fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" viewBox="0 0 24 24">
                 <circle cx="12" cy="12" r="3" />
                 <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
               </svg>
             </div>
             <span style={mStyles.navLabel}>Settings</span>
          </button>
          
          <button
            onClick={() => logout()}
            style={{...mStyles.navBtn(false), color: "#6B7280"}}
            title={!expanded ? "Logout" : ""}
          >
             <div style={{minWidth: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
               <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" viewBox="0 0 24 24">
                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                 <polyline points="16 17 21 12 16 7" />
                 <line x1="21" y1="12" x2="9" y2="12" />
               </svg>
             </div>
             <span style={mStyles.navLabel}>Logout</span>
          </button>

          {/* Dark mode switch removed as requested */}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
