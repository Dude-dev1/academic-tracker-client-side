import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/ui/Modal";
import Sidebar from "../components/ui/Sidebar";
import assignmentService from "../services/assignmentService";
import { getCourses } from "../services/courseService";
import announcementService from "../services/announcementService";
import { useEffect } from "react";
// const dummyAssignments = [];

const statusColor = (pts) => {
  if (pts >= 75) return "#10b981";
  if (pts >= 50) return "#f59e0b";
  return "#ef4444";
};

function OnboardingIllustration() {
  return (
    <div style={styles.illustrationWrapper}>
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
        <rect x="20" y="120" width="160" height="8" rx="3" fill="#BFDBFE" />
        <rect x="30" y="128" width="8" height="24" rx="2" fill="#93C5FD" />
        <rect x="162" y="128" width="8" height="24" rx="2" fill="#93C5FD" />
        <rect
          x="50"
          y="20"
          width="100"
          height="70"
          rx="6"
          fill="white"
          stroke="#BFDBFE"
          strokeWidth="1.5"
        />
        <rect x="60" y="30" width="60" height="6" rx="3" fill="#93C5FD" />
        <rect x="60" y="44" width="8" height="8" rx="2" fill="#10b981" />
        <rect x="74" y="46" width="50" height="4" rx="2" fill="#D1FAE5" />
        <rect x="60" y="58" width="8" height="8" rx="2" fill="#f59e0b" />
        <rect x="74" y="60" width="40" height="4" rx="2" fill="#FEF3C7" />
        <rect x="60" y="72" width="8" height="8" rx="2" fill="#ef4444" />
        <rect x="74" y="74" width="45" height="4" rx="2" fill="#FEE2E2" />
        <circle cx="100" cy="100" r="14" fill="#BFDBFE" />
        <circle cx="100" cy="82" r="10" fill="#FDE68A" />
      </svg>
    </div>
  );
}

function PersonalOnboarding({ firstName, setIsModalOpen }) {
  const steps = [
    {
      label: "Add your first course",
      color: "#2563EB",
      action: () => setIsModalOpen(true),
    },
    {
      label: "Add an assignment",
      color: "#7C3AED",
      action: () => setIsModalOpen(true),
    },
    {
      label: "Set a deadline",
      color: "#f59e0b",
      action: () => setIsModalOpen(true),
    },
  ];

  return (
    <>
      <div style={styles.welcomeBlock}>
        <h1 style={styles.welcomeTitle}>Welcome, {firstName}</h1>
        <p style={styles.welcomeSub}>
          Let's set up your study space to start tracking assignments.
        </p>
      </div>
      <div style={styles.onboardingGrid}>
        <div style={styles.card}>
          <p style={styles.stepsTitle}>Get started in 3 simple steps</p>
          {steps.map(({ label, color, action }) => (
            <div
              key={label}
              onClick={action}
              style={{ ...styles.step, cursor: "pointer" }}
            >
              <div style={{ ...styles.stepCircle, background: color }}>+</div>
              <span style={styles.stepLabel}>{label}</span>
              <div style={styles.stepCheck} />
            </div>
          ))}
          <button style={styles.ctaBtn} onClick={() => setIsModalOpen(true)}>
            Add your first course
          </button>
          <div style={styles.progressRow}>
            <span style={styles.progressLabel}>Setup Progress</span>
            <span style={styles.progressLabel}>0%</span>
          </div>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressBar, width: "0%" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <OnboardingIllustration />
          <div style={styles.card}>
            <p style={styles.emptyCardTitle}>
              Your assignments will appear here once you add a course.
            </p>
            <p style={styles.emptyCardSub}>
              Add a course and start tracking your assignments, deadlines and
              progress all in one place.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function PersonalView({ firstName, setIsModalOpen, navigate, assignments = [], courses = [] }) {
  const dueToday = assignments.filter(a => {
    if (!a.dueDate) return false;
    const today = new Date();
    const due = new Date(a.dueDate);
    return due.getDate() === today.getDate() && due.getMonth() === today.getMonth() && due.getFullYear() === today.getFullYear() && a.status !== "completed";
  }).length;
  
  const overdue = assignments.filter(a => {
    if (!a.dueDate) return false;
    return new Date(a.dueDate) < new Date() && a.status !== "completed";
  }).length;
  
  const completed = assignments.filter(a => a.status === "completed").length;

  const completionRate = assignments.length > 0 
    ? Math.round((completed / assignments.length) * 100) 
    : 0;
  const inProgress = assignments.length - completed;

  const recentActivity = assignments.length > 0 ? [...assignments].sort((a, b) => {
    const dpA = new Date(a.updatedAt || a.createdAt || a.dueDate || 0).getTime();
    const dpB = new Date(b.updatedAt || b.createdAt || b.dueDate || 0).getTime();
    return dpB - dpA;
  })[0] : null;

  return (
    <>
      <div style={styles.welcomeBlock}>
        <h1 style={styles.welcomeTitle}>
          Welcome back, <span style={styles.welcomeName}>{firstName}</span>
        </h1>
        <p style={styles.welcomeSub}>Here's what you're working on today</p>
      </div>
      <div style={styles.statsRow}>
        {[
          {
            label: "Due today",
            value: dueToday.toString(),
            color: "#f59e0b",
            icon: (
              <svg
                width="18"
                height="18"
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
          {
            label: "Overdue",
            value: overdue.toString(),
            color: "#ef4444",
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            ),
          },
          {
            label: "Completed",
            value: completed.toString(),
            color: "#10b981",
            icon: (
              <svg
                width="18"
                height="18"
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
            label: "Completion",
            value: `${completionRate}%`,
            color: "#2563EB",
            icon: (
              <svg
                width="18"
                height="18"
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
        ].map(({ label, value, color, icon }) => (
          <div
            key={label}
            style={{ ...styles.statCard, borderTop: `3px solid ${color}` }}
          >
            <p style={styles.statCardValue}>{value}</p>
            <div style={styles.statCardBottom}>
              <p style={styles.statCardLabel}>{label}</p>
              {icon}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.bottomGrid}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={styles.card}>
            <h2 style={{ ...styles.cardTitle, marginBottom: "12px" }}>
              Last Activity
            </h2>
            {recentActivity ? (
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}>
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#EFF6FF" />
                  <path
                    d="M8 10h10M8 16h16M8 22h6"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p style={styles.activityTitle}>{recentActivity.courseId?.name || "General"}</p>
                <p style={styles.activitySub}>{recentActivity.title}</p>
                <div style={styles.activityFooter}>
                  <span style={styles.completedBadge}>{recentActivity.status || "pending"}</span>
                </div>
              </div>
            </div>
            ) : (
              <p style={{ fontSize: "14px", color: "#6B7280" }}>No recent activity.</p>
            )}
          </div>
          <div style={styles.card}>
            <div style={styles.cardHeaderRow}>
              <h2 style={styles.cardTitle}>Upcoming Assignments</h2>
              <a href="#" style={styles.viewAll}>
                View All
              </a>
            </div>
            {assignments.slice(0, 3).map((a, i) => {
              const isOverdue = a.dueDate ? new Date(a.dueDate) < new Date() && a.status !== "completed" : false;
              return (
                <div key={i} style={styles.upcomingItem}>
                  <div>
                    <p style={styles.upcomingTitle}>{a.title}</p>
                    <p style={styles.upcomingCourse}>{a.courseId?.name || "General"}</p>
                  </div>
                  <div style={styles.upcomingRight}>
                    <p style={styles.upcomingDate}>{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No date"}</p>
                    <span
                      style={{
                        ...styles.statusPill,
                        background: isOverdue ? "#fee2e2" : "#fef3c7",
                        color: isOverdue ? "#ef4444" : "#f59e0b",
                      }}
                    >
                      {isOverdue ? "overdue" : "pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={styles.card}>
            <div style={styles.cardHeaderRow}>
              <h2 style={styles.cardTitle}>Progress overview</h2>
              <span style={styles.progressPct}>{completionRate}%</span>
            </div>
            <p style={styles.progressOverviewLabel}>Assignment completion</p>
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${completionRate}%`,
                  background: "#2563EB",
                }}
              />
            </div>
            <div style={{ height: "16px" }} />
            {[
              { label: "Total Assignments", value: assignments.length.toString() },
              { label: "Completed", value: completed.toString() },
              { label: "In progress", value: inProgress.toString() },
            ].map(({ label, value }) => (
              <div key={label} style={styles.statRow}>
                <span style={styles.statLabel}>{label}</span>
                <span
                  style={{
                    ...styles.statValue,
                    color: label === "In progress" ? "#f59e0b" : "#111827",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div style={styles.card}>
            <h2 style={{ ...styles.cardTitle, marginBottom: "12px" }}>
              Quick Actions
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button
                style={styles.primaryActionBtn}
                onClick={() => setIsModalOpen(true)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Assignment
              </button>
              <button
                style={styles.secondaryActionBtn}
                onClick={() => navigate("/assignments")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                View All Assignments
              </button>
              <button
                style={styles.secondaryActionBtn}
                onClick={() => navigate("/progress")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                View Progress
              </button>
            </div>
            <p style={styles.quickNote}>
              Your assignments are private unless shared to Class mode.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function ClassOnboarding() {
  return (
    <div style={styles.classOnboardingCard}>
      <div style={styles.classOnboardingIcon}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2563EB"
          strokeWidth="1.5"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      </div>
      <h2 style={styles.classOnboardingTitle}>Join a class to get started</h2>
      <p style={styles.classOnboardingSub}>
        You haven't joined a class yet. Enter a class invite link or code shared
        by your course representative.
      </p>
      <button style={styles.ctaBtn}>Join with Link</button>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Enter class code"
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #D1D5DB",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <button style={{ ...styles.secondaryActionBtn, marginTop: 0 }}>
          Join
        </button>
      </div>
    </div>
  );
}

function ClassView({ assignments = [], courses = [], navigate, announcements = [] }) {
  return (
    <>
      <div style={styles.noteCard}>
        Note: This is a shared dashboard visible to all class members. Course
        representatives can post announcements and updates here.
      </div>
      {announcements && announcements.length > 0 ? (
      <div style={styles.announcementBanner}>
        <div style={styles.announcementBannerLeft}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <div>
            <p style={styles.announcementTag}>Course Announcements</p>
            <p style={styles.announcementText}>{announcements[0].title}</p>
          </div>
        </div>
        <span style={styles.announcementTime}>
          {new Date(announcements[0].createdAt || Date.now()).toLocaleDateString()}
        </span>
      </div>
      ) : null}
      <div style={styles.card}>
        <h2 style={styles.cardTitleCenter}>Assignment Submission Progress</h2>
        <div style={styles.assignmentList}>
          {assignments.slice(0, 4).map((a, i) => (
            <div
              key={i}
              style={{
                ...styles.assignmentRow,
                borderBottom:
                  i < assignments.length - 1 ? "1px solid #F3F4F6" : "none",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <p style={styles.assignmentTitle}>{a.title}</p>
                  <p style={styles.assignmentCourse}>{a.courseId?.name || "Personal"}</p>
                </div>
                <div style={styles.assignmentRight}>
                <div style={styles.dateTag}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span style={styles.dateText}>{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No Date"}</span>
                </div>
                <div style={styles.submittedBadge}>
                  {a.status || "pending"}
                </div>
              </div>
              </div>
              <div style={styles.progressWrapper}>
                <div style={styles.progressTrack}>
                  <div
                    style={{
                      ...styles.progressBar,
                      width: `${a.points || 100}%`,
                      background: statusColor(a.points || 100),
                    }}
                  />
                </div>
                <p style={styles.progressLabel}>
                  assignment completion rate {a.points || 100}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.bottomGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeaderRow}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h2 style={styles.cardTitle}>Upcoming Deadlines</h2>
          </div>
          {assignments.slice(0, 4).map((a, i) => (
            <div key={i} style={styles.deadlineItem}>
              <div>
                <p style={styles.deadlineDate}>{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No deadline"}</p>
                <p style={styles.deadlineTitle}>{a.title}</p>
                <p style={styles.deadlineCourse}>{a.courseId?.name || "General"}</p>
              </div>
              <div
                style={{
                  ...styles.rateBadge,
                  background: statusColor(a.points || 100) + "20",
                  color: statusColor(a.points || 100),
                }}
              >
                {a.points || 100} pts
              </div>
            </div>
          ))}
        </div>
        <div style={styles.card}>
          <div style={styles.cardHeaderRow}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <h2 style={styles.cardTitle}>Class Statistics</h2>
          </div>
          {[
            { label: "Total Courses", value: courses.length.toString() },
            { label: "Active Assignments", value: assignments.filter(a => a.status !== "completed").length.toString() },
            { label: "Avg. Completion Rate", value: assignments.length > 0 ? Math.round((assignments.filter(a => a.status === 'completed').length / assignments.length) * 100) + '%' : '0%' },
          ].map(({ label, value }) => (
            <div key={label} style={styles.statRow}>
              <span style={styles.statLabel}>{label}</span>
              <span style={styles.statValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, assignRes, annRes] = await Promise.all([
          getCourses(),
          assignmentService.getAssignments(),
          announcementService.getAnnouncements(),
        ]);
        if (courseRes?.data) setCourses(courseRes.data);
        if (assignRes?.data) setAssignments(assignRes.data);
        if (annRes?.length !== undefined) setAnnouncements(annRes);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState("Personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isFirstTimeUser = false;

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  const initials = firstName.slice(0, 2).toUpperCase();

  return (
    <div style={styles.root}>
      <style>{`
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Sidebar sidebarOpen={sidebarOpen} />

      {/* MAIN CONTENT */}
      <div style={styles.content}>
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
            <p style={styles.pageLabel}>Dashboard</p>
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

        <main style={styles.main}>
          {activeTab === "Personal" ? (
            isFirstTimeUser ? (
              <PersonalOnboarding
                firstName={firstName}
                setIsModalOpen={setIsModalOpen}
              />
            ) : (
              <PersonalView
                firstName={firstName}
                setIsModalOpen={setIsModalOpen}
                navigate={navigate}
              />
            )
          ) : isFirstTimeUser ? (
            <ClassOnboarding />
          ) : (
            <ClassView assignments={assignments} courses={courses} navigate={navigate} announcements={announcements} />
          )}
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
    flex: 1,
    minHeight: "100vh",
    width: "100%",
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
  main: {
    padding: "32px",
    flex: 1,
    animation: "fadeUp 0.4s ease both",
    overflowY: "auto",
    overflowX: "hidden",
  },
  welcomeBlock: { marginBottom: "20px" },
  welcomeTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "26px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  welcomeName: { color: "#2563EB" },
  welcomeSub: { fontSize: "13px", color: "#6B7280", marginTop: "4px" },
  onboardingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  stepsTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "16px",
  },
  step: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "1px solid #F3F4F6",
  },
  stepCircle: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "16px",
    fontWeight: "500",
    color: "#fff",
  },
  stepLabel: { fontSize: "13px", color: "#374151", flex: 1 },
  stepCheck: {
    width: "18px",
    height: "18px",
    borderRadius: "4px",
    border: "1.5px solid #D1D5DB",
  },
  ctaBtn: {
    display: "block",
    width: "100%",
    padding: "10px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    textAlign: "center",
    marginTop: "16px",
  },
  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "14px",
  },
  progressLabel: { fontSize: "11px", color: "#9CA3AF" },
  progressTrack: {
    height: "8px",
    background: "#F3F4F6",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "6px",
  },
  progressBar: { height: "100%", borderRadius: "4px", background: "#2563EB" },
  illustrationWrapper: {
    borderRadius: "16px",
    background: "#EFF6FF",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCardTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "6px",
  },
  emptyCardSub: { fontSize: "12px", color: "#9CA3AF", lineHeight: "1.6" },
  classOnboardingCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px 32px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    maxWidth: "480px",
    margin: "0 auto",
    textAlign: "center",
  },
  classOnboardingIcon: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "#EFF6FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
  },
  classOnboardingTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
  },
  classOnboardingSub: {
    fontSize: "13px",
    color: "#6B7280",
    lineHeight: "1.6",
    maxWidth: "320px",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "12px",
    marginBottom: "20px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    border: "1px solid #f0f0f0",
  },
  statCardValue: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
  },
  statCardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statCardLabel: { fontSize: "12px", color: "#6B7280" },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    border: "1px solid #f0f0f0",
  },
  cardHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
    gap: "8px",
  },
  cardTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  cardTitleCenter: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: "20px",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px",
    background: "#F9FAFB",
    borderRadius: "12px",
  },
  activityIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "#EFF6FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  activityTitle: { fontSize: "15px", fontWeight: "600", color: "#111827" },
  activitySub: { fontSize: "12px", color: "#9CA3AF", marginTop: "2px" },
  activityFooter: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px",
  },
  completedBadge: {
    fontSize: "11px",
    background: "#d1fae5",
    color: "#065f46",
    padding: "2px 10px",
    borderRadius: "20px",
    fontWeight: "500",
  },
  activityWeek: { fontSize: "12px", color: "#9CA3AF" },
  upcomingItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "14px",
    marginBottom: "14px",
    borderBottom: "1px solid #F3F4F6",
  },
  upcomingTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  upcomingCourse: { fontSize: "12px", color: "#9CA3AF", marginTop: "2px" },
  upcomingRight: { display: "flex", alignItems: "center", gap: "8px" },
  upcomingDate: { fontSize: "12px", color: "#6B7280" },
  statusPill: {
    fontSize: "11px",
    fontWeight: "500",
    padding: "2px 8px",
    borderRadius: "20px",
  },
  viewAll: {
    fontSize: "13px",
    color: "#2563EB",
    textDecoration: "none",
    fontWeight: "500",
  },
  progressPct: { fontSize: "13px", fontWeight: "600", color: "#2563EB" },
  progressOverviewLabel: {
    fontSize: "12px",
    color: "#9CA3AF",
    marginBottom: "6px",
  },
  progressWrapper: { gridColumn: "1 / -1" },
  primaryActionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "10px 16px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  secondaryActionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "10px 16px",
    background: "#F3F4F6",
    color: "#374151",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  quickNote: {
    fontSize: "11px",
    color: "#9CA3AF",
    marginTop: "12px",
    lineHeight: "1.5",
  },
  noteCard: {
    background: "#FFF9EC",
    border: "1px solid #FDE68A",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "13px",
    color: "#92400E",
    lineHeight: "1.6",
    marginBottom: "12px",
  },
  announcementBanner: {
    background: "#fff",
    borderRadius: "12px",
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    border: "1px solid #E5E7EB",
    marginBottom: "20px",
  },
  announcementBannerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  announcementTag: { fontSize: "11px", color: "#9CA3AF" },
  announcementText: { fontSize: "13px", fontWeight: "500", color: "#111827" },
  announcementTime: { fontSize: "11px", color: "#9CA3AF" },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  assignmentList: { display: "flex", flexDirection: "column", gap: "20px" },
  assignmentRow: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingBottom: "20px",
  },
  assignmentTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  assignmentCourse: { fontSize: "12px", color: "#9CA3AF", marginTop: "2px" },
  assignmentRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
  },
  dateTag: { display: "flex", alignItems: "center", gap: "4px" },
  dateText: { fontSize: "12px", color: "#6B7280" },
  submittedBadge: {
    fontSize: "11px",
    background: "#EFF6FF",
    color: "#2563EB",
    padding: "2px 8px",
    borderRadius: "20px",
    fontWeight: "500",
  },
  deadlineItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    background: "#F9FAFB",
    borderRadius: "10px",
    borderLeft: "3px solid #2563EB",
    marginBottom: "10px",
  },
  deadlineDate: { fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" },
  deadlineTitle: { fontSize: "13px", fontWeight: "600", color: "#111827" },
  deadlineCourse: { fontSize: "11px", color: "#9CA3AF" },
  rateBadge: {
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "12px",
    borderBottom: "1px solid #F3F4F6",
    marginBottom: "4px",
  },
  statLabel: { fontSize: "13px", color: "#6B7280" },
  statValue: { fontSize: "13px", fontWeight: "600", color: "#111827" },
};
