import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const assignments = [
  { title: "Trial Balance 2", course: "Financial Accounting", date: "Feb 5, 2026", submitted: 28, total: 35, rate: 80 },
  { title: "Lab Report 3", course: "Data Structure", date: "Feb 4, 2026", submitted: 22, total: 35, rate: 63 },
  { title: "Project Phase 1", course: "Database Systems", date: "Feb 6, 2026", submitted: 15, total: 35, rate: 43 },
  { title: "Proposal", course: "Web Technologies", date: "Feb 7, 2026", submitted: 30, total: 35, rate: 86 },
];

const statusColor = (rate) => {
  if (rate >= 75) return "#10b981";
  if (rate >= 50) return "#f59e0b";
  return "#ef4444";
};

function ClassView() {
  return (
    <>
      <div style={styles.noteCard}>
        Note: This is a shared dashboard visible to all class members. Course representatives can post announcements and updates here.
      </div>
      <div style={styles.announcementBanner}>
        <div style={styles.announcementBannerLeft}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          <div>
            <p style={styles.announcementTag}>Course Announcements</p>
            <p style={styles.announcementText}>Proposal Extended Deadline</p>
          </div>
        </div>
        <span style={styles.announcementTime}>2hr ago</span>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitleCenter}>Assignment Submission Progress</h2>
        <div style={styles.assignmentList}>
          {assignments.map((a, i) => (
            <div key={i} style={{
              ...styles.assignmentRow,
              borderBottom: i < assignments.length - 1 ? "1px solid #F3F4F6" : "none",
            }}>
              <div>
                <p style={styles.assignmentTitle}>{a.title}</p>
                <p style={styles.assignmentCourse}>{a.course}</p>
              </div>
              <div style={styles.assignmentRight}>
                <div style={styles.dateTag}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span style={styles.dateText}>{a.date}</span>
                </div>
                <div style={styles.submittedBadge}>{a.submitted}/{a.total} submitted</div>
              </div>
              <div style={styles.progressWrapper}>
                <div style={styles.progressTrack}>
                  <div style={{ ...styles.progressBar, width: `${a.rate}%`, background: statusColor(a.rate) }}/>
                </div>
                <p style={styles.progressLabel}>{a.rate}% submission rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.bottomGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeaderRow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <h2 style={styles.cardTitle}>Upcoming Deadlines</h2>
          </div>
          {assignments.map((a, i) => (
            <div key={i} style={styles.deadlineItem}>
              <div>
                <p style={styles.deadlineDate}>{a.date}</p>
                <p style={styles.deadlineTitle}>{a.title}</p>
                <p style={styles.deadlineCourse}>{a.course}</p>
              </div>
              <div style={{ ...styles.rateBadge, background: statusColor(a.rate) + "20", color: statusColor(a.rate) }}>
                {a.rate}%
              </div>
            </div>
          ))}
        </div>
        <div style={styles.card}>
          <div style={styles.cardHeaderRow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <h2 style={styles.cardTitle}>Class Statistics</h2>
          </div>
          {[
            { label: "Total Students", value: "35" },
            { label: "Active Assignments", value: "4" },
            { label: "Avg. Submission Rate", value: "68%" },
          ].map(({ label, value }) => (
            <div key={label} style={styles.statRow}>
              <span style={styles.statLabel}>{label}</span>
              <span style={styles.statValue}>{value}</span>
            </div>
          ))}
function OnboardingIllustration() {
  return (
    <div style={styles.illustrationWrapper}>
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
        <rect x="20" y="120" width="160" height="8" rx="3" fill="#BFDBFE"/>
        <rect x="30" y="128" width="8" height="24" rx="2" fill="#93C5FD"/>
        <rect x="162" y="128" width="8" height="24" rx="2" fill="#93C5FD"/>
        <rect x="50" y="20" width="100" height="70" rx="6" fill="white" stroke="#BFDBFE" strokeWidth="1.5"/>
        <rect x="60" y="30" width="60" height="6" rx="3" fill="#93C5FD"/>
        <rect x="60" y="44" width="8" height="8" rx="2" fill="#10b981"/>
        <rect x="74" y="46" width="50" height="4" rx="2" fill="#D1FAE5"/>
        <rect x="60" y="58" width="8" height="8" rx="2" fill="#f59e0b"/>
        <rect x="74" y="60" width="40" height="4" rx="2" fill="#FEF3C7"/>
        <rect x="60" y="72" width="8" height="8" rx="2" fill="#ef4444"/>
        <rect x="74" y="74" width="45" height="4" rx="2" fill="#FEE2E2"/>
        <circle cx="100" cy="100" r="14" fill="#BFDBFE"/>
        <circle cx="100" cy="82" r="10" fill="#FDE68A"/>
        <path d="M90 80 Q100 72 110 80" fill="#92400E"/>
        <circle cx="96" cy="82" r="1.5" fill="#374151"/>
        <circle cx="104" cy="82" r="1.5" fill="#374151"/>
        <path d="M96 87 Q100 90 104 87" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        <path d="M88 100 Q75 90 68 75" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round"/>
        <path d="M112 100 Q120 95 125 88" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round"/>
        <rect x="75" y="108" width="50" height="12" rx="3" fill="#1D4ED8"/>
        <rect x="78" y="110" width="44" height="8" rx="2" fill="#93C5FD"/>
        <rect x="130" y="95" width="30" height="18" rx="4" fill="white" stroke="#BFDBFE" strokeWidth="1"/>
        <rect x="134" y="100" width="22" height="4" rx="2" fill="#E5E7EB"/>
        <rect x="134" y="100" width="5" height="4" rx="2" fill="#2563EB"/>
        <text x="134" y="111" fontSize="5" fill="#9CA3AF" fontFamily="sans-serif">0% done</text>
      </svg>
    </div>
  );
}

function PersonalOnboarding({ firstName }) {
  return (
    <>
      <div style={styles.welcomeBlock}>
        <h1 style={styles.welcomeTitle}>Welcome, {firstName}</h1>
        <p style={styles.welcomeSub}>Let's set up your study space to start tracking assignments.</p>
      </div>
      <div style={styles.onboardingGrid}>
        <div style={styles.card}>
          <p style={styles.stepsTitle}>Get started in 3 simple steps</p>
          {[
            { label: "Add your first course", color: "#2563EB" },
            { label: "Add an assignment", color: "#7C3AED" },
            { label: "Set a deadline", color: "#f59e0b" },
          ].map(({ label, color }) => (
            <div key={label} style={styles.step}>
              <div style={{ ...styles.stepCircle, background: color }}>+</div>
              <span style={styles.stepLabel}>{label}</span>
              <div style={styles.stepCheck} />
            </div>
          ))}
          <button style={styles.ctaBtn}>Add your first course</button>
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
            <p style={styles.emptyCardTitle}>Your assignments will appear here once you add a course.</p>
            <p style={styles.emptyCardSub}>Add a course and start tracking your assignments, deadlines and progress all in one place.</p>
          </div>
        </div>
      </div>
    </>
  );
}

function PersonalView({ firstName }) {
  return (
    <>
      <div style={styles.welcomeBlock}>
        <h1 style={styles.welcomeTitle}>Welcome back, {firstName}</h1>
        <p style={styles.welcomeSub}>Here's what you're working on today</p>
      </div>
      <div style={styles.statsRow}>
        {[
          { label: "Due today", value: "0", color: "#f59e0b", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg> },
          { label: "Overdue", value: "1", color: "#ef4444", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
          { label: "Completed", value: "1", color: "#10b981", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg> },
          { label: "Completion", value: "25%", color: "#2563EB", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} style={{ ...styles.statCard, borderTop: `3px solid ${color}` }}>
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
            <h2 style={{ ...styles.cardTitle, marginBottom: "12px" }}>Last Activity</h2>
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}>
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#EFF6FF"/>
                  <path d="M8 10h10M8 16h16M8 22h6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p style={styles.activityTitle}>Web Technologies</p>
                <p style={styles.activitySub}>Assignment 2</p>
                <div style={styles.activityFooter}>
                  <span style={styles.completedBadge}>completed</span>
                  <span style={styles.activityWeek}>Week 2</span>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardHeaderRow}>
              <h2 style={styles.cardTitle}>Upcoming Assignments</h2>
              <a href="#" style={styles.viewAll}>View All</a>
            </div>
            {assignments.slice(0, 3).map((a, i) => {
              const isOverdue = a.rate < 50;
              return (
                <div key={i} style={styles.upcomingItem}>
                  <div>
                    <p style={styles.upcomingTitle}>{a.title}</p>
                    <p style={styles.upcomingCourse}>{a.course}</p>
                  </div>
                  <div style={styles.upcomingRight}>
                    <p style={styles.upcomingDate}>{a.date.slice(0, 6)}</p>
                    <span style={{
                      ...styles.statusPill,
                      background: isOverdue ? "#fee2e2" : "#fef3c7",
                      color: isOverdue ? "#ef4444" : "#f59e0b",
                    }}>
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
              <span style={styles.progressPct}>25%</span>
            </div>
            <p style={styles.progressOverviewLabel}>Assignment completion</p>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressBar, width: "25%", background: "#2563EB" }}/>
            </div>
            <div style={{ height: "16px" }} />
            {[
              { label: "Total Assignments", value: "4" },
              { label: "Completed", value: "1" },
              { label: "In progress", value: "2" },
            ].map(({ label, value }) => (
              <div key={label} style={styles.statRow}>
                <span style={styles.statLabel}>{label}</span>
                <span style={{ ...styles.statValue, color: label === "In progress" ? "#f59e0b" : "#111827" }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={styles.card}>
            <h2 style={{ ...styles.cardTitle, marginBottom: "12px" }}>Quick Actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button style={styles.primaryActionBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Assignment
              </button>
              <button style={styles.secondaryActionBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                View All Assignments
              </button>
              <button style={styles.secondaryActionBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                View Progress
              </button>
            </div>
            <p style={styles.quickNote}>Your assignments are private unless shared to Class mode.</p>
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
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      </div>
      <h2 style={styles.classOnboardingTitle}>Join a class to get started</h2>
      <p style={styles.classOnboardingSub}>You haven't joined a class yet. Enter a class invite link or code shared by your course representative.</p>
      <button style={styles.ctaBtn}>Join with Link</button>
      <button style={styles.secondaryActionBtn}>Enter class code</button>
    </div>
  );
}

function ClassView() {
  return (
    <>
      <div style={styles.noteCard}>
        Note: This is a shared dashboard visible to all class members. Course representatives can post announcements and updates here.
      </div>
      <div style={styles.announcementBanner}>
        <div style={styles.announcementBannerLeft}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          <div>
            <p style={styles.announcementTag}>Course Announcements</p>
            <p style={styles.announcementText}>Proposal Extended Deadline</p>
          </div>
        </div>
        <span style={styles.announcementTime}>2hr ago</span>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitleCenter}>Assignment Submission Progress</h2>
        <div style={styles.assignmentList}>
          {assignments.map((a, i) => (
            <div key={i} style={{
              ...styles.assignmentRow,
              borderBottom: i < assignments.length - 1 ? "1px solid #F3F4F6" : "none",
            }}>
              <div>
                <p style={styles.assignmentTitle}>{a.title}</p>
                <p style={styles.assignmentCourse}>{a.course}</p>
              </div>
              <div style={styles.assignmentRight}>
                <div style={styles.dateTag}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span style={styles.dateText}>{a.date}</span>
                </div>
                <div style={styles.submittedBadge}>{a.submitted}/{a.total} submitted</div>
              </div>
              <div style={styles.progressWrapper}>
                <div style={styles.progressTrack}>
                  <div style={{ ...styles.progressBar, width: `${a.rate}%`, background: statusColor(a.rate) }}/>
                </div>
                <p style={styles.progressLabel}>assignment completion rate {a.rate}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.bottomGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeaderRow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <h2 style={styles.cardTitle}>Upcoming Deadlines</h2>
          </div>
          {assignments.map((a, i) => (
            <div key={i} style={styles.deadlineItem}>
              <div>
                <p style={styles.deadlineDate}>{a.date}</p>
                <p style={styles.deadlineTitle}>{a.title}</p>
                <p style={styles.deadlineCourse}>{a.course}</p>
              </div>
              <div style={{ ...styles.rateBadge, background: statusColor(a.rate) + "20", color: statusColor(a.rate) }}>
                {a.rate}%
              </div>
            </div>
          ))}
        </div>
        <div style={styles.card}>
          <div style={styles.cardHeaderRow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <h2 style={styles.cardTitle}>Class Statistics</h2>
          </div>
          {[
            { label: "Total Students", value: "35" },
            { label: "Active Assignments", value: "4" },
            { label: "Avg. Submission Rate", value: "68%" },
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
  const [activeTab, setActiveTab] = useState("Personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const { user } = useAuth();

  // Change to true to test first time user view
  // Stephhhhhhh replace this with the real thing abeg
  const isFirstTimeUser = false;

  const firstName = user?.displayName?.split(" ")[0]
    || user?.name?.split(" ")[0]
    || user?.email?.split("@")[0]
    || "there";

  const initials = firstName.slice(0, 2).toUpperCase();

  const navItems = [
    {
      label: "Home", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      )
    },
    {
      label: "Progress", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    { 
      label: "Calendar", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg> 
      )
    },
    { 
      label: "Assignments", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      )
    },
    { 
      label: "Announcements", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg> 
      )
    },
  ];

  const settingsItem = {
    label: "Settings", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>
      </svg>
    )
  };

  const renderPersonal = () => {
    if (isFirstTimeUser) return <PersonalOnboarding firstName={firstName} />;
    return <PersonalView firstName={firstName} />;
  };

  const renderClass = () => {
    if (isFirstTimeUser) return <ClassOnboarding />;
    return <ClassView />;
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
        <nav style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <button onClick={() => setSidebarOpen(v => !v)} style={styles.toggleBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <p style={styles.pageLabel}>Dashboard</p>
          </div>
          <div style={styles.topNavRight}>
            <div style={styles.tabGroup}>
              {["Personal", "Class"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
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

        <main style={styles.main}>
          {activeTab === "Personal" ? renderPersonal() : renderClass()}
        </main>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={styles.footerGrid}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#2563EB"/>
                  <path d="M8 10h10M8 16h16M8 22h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <span style={styles.footerLogoName}>Agenda</span>
              </div>
              <p style={styles.footerTagline}>Stay on top of your assignments without stress.</p>
            </div>
            <div>
              <p style={styles.footerHeading}>Quick Links</p>
              {["Home", "About", "Courses", "Dashboard"].map(l => (
                <a key={l} href="#" style={styles.footerLink}>{l}</a>
              ))}
            </div>
            <div>
              <p style={styles.footerHeading}>Contact Us</p>
              <p style={styles.footerText}>📧 webdev28@cs3.knust.edu.gh</p>
              <p style={styles.footerText}>📞 000 000 0000</p>
              <p style={styles.footerText}>📍 KNUST, Ghana</p>
            </div>
            <div>
              <p style={styles.footerHeading}>Follow Us</p>
              <div style={styles.socialIcons}>
                {["f", "t", "in", "yt"].map(s => (
                  <span key={s} style={styles.socialIcon}>{s}</span>
                ))}
              </div>
              <p style={{ ...styles.footerHeading, marginTop: "16px" }}>Newsletter</p>
              <div style={styles.newsletterRow}>
                <input type="email" placeholder="Your email" style={styles.newsletterInput} />
                <button style={styles.newsletterBtn}>Join</button>
              </div>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.footerCopy}>© 2025 Agenda. All rights reserved.</p>
            <div style={styles.footerBottomLinks}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                <a key={l} href="#" style={styles.footerSmallLink}>{l}</a>
              ))}
            </div>
          </div>
        </footer>
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
  main: { padding: "32px", flex: 1, animation: "fadeUp 0.4s ease both" },
  welcomeBlock: { marginBottom: "20px" },
  welcomeTitle: { fontFamily: "'Fraunces', serif", fontSize: "26px", fontWeight: "700", color: "#111827", letterSpacing: "-0.5px" },
  welcomeSub: { fontSize: "13px", color: "#6B7280", marginTop: "4px" },
  onboardingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  stepsTitle: { fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "16px" },
  step: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #F3F4F6" },
  stepCircle: { width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "16px", fontWeight: "500", color: "#fff" },
  stepLabel: { fontSize: "13px", color: "#374151", flex: 1 },
  stepCheck: { width: "18px", height: "18px", borderRadius: "4px", border: "1.5px solid #D1D5DB" },
  ctaBtn: { display: "block", width: "100%", padding: "10px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "center", marginTop: "16px" },
  progressRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px" },
  progressLabel: { fontSize: "11px", color: "#9CA3AF" },
  progressTrack: { height: "8px", background: "#F3F4F6", borderRadius: "4px", overflow: "hidden", marginTop: "6px" },
  progressBar: { height: "100%", borderRadius: "4px", background: "#2563EB" },
  illustrationWrapper: { borderRadius: "16px", background: "#EFF6FF", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" },
  emptyCardTitle: { fontSize: "13px", fontWeight: "600", color: "#111827", marginBottom: "6px" },
  emptyCardSub: { fontSize: "12px", color: "#9CA3AF", lineHeight: "1.6" },
  classOnboardingCard: { background: "#fff", borderRadius: "16px", padding: "40px 32px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", maxWidth: "480px", margin: "0 auto", textAlign: "center" },
  classOnboardingIcon: { width: "72px", height: "72px", borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" },
  classOnboardingTitle: { fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: "700", color: "#111827" },
  classOnboardingSub: { fontSize: "13px", color: "#6B7280", lineHeight: "1.6", maxWidth: "320px" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "12px", marginBottom: "20px" },
  statCard: { background: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  statCardValue: { fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "8px" },
  statCardBottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  statCardLabel: { fontSize: "12px", color: "#6B7280" },
  card: { background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  cardHeaderRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", gap: "8px" },
  cardTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  cardTitleCenter: { fontSize: "15px", fontWeight: "600", color: "#111827", textAlign: "center", marginBottom: "20px" },
  activityItem: { display: "flex", alignItems: "center", gap: "14px", padding: "12px", background: "#F9FAFB", borderRadius: "12px" },
  activityIcon: { width: "44px", height: "44px", borderRadius: "10px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  activityTitle: { fontSize: "15px", fontWeight: "600", color: "#111827" },
  activitySub: { fontSize: "12px", color: "#9CA3AF", marginTop: "2px" },
  activityFooter: { display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" },
  completedBadge: { fontSize: "11px", background: "#d1fae5", color: "#065f46", padding: "2px 10px", borderRadius: "20px", fontWeight: "500" },
  activityWeek: { fontSize: "12px", color: "#9CA3AF" },
  upcomingItem: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", marginBottom: "14px", borderBottom: "1px solid #F3F4F6" },
  upcomingTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  upcomingCourse: { fontSize: "12px", color: "#9CA3AF", marginTop: "2px" },
  upcomingRight: { display: "flex", alignItems: "center", gap: "8px" },
  upcomingDate: { fontSize: "12px", color: "#6B7280" },
  statusPill: { fontSize: "11px", fontWeight: "500", padding: "2px 8px", borderRadius: "20px" },
  viewAll: { fontSize: "13px", color: "#2563EB", textDecoration: "none", fontWeight: "500" },
  progressPct: { fontSize: "13px", fontWeight: "600", color: "#2563EB" },
  progressOverviewLabel: { fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" },
  progressTrack: { height: "8px", background: "#F3F4F6", borderRadius: "4px", overflow: "hidden", marginBottom: "4px" },
  progressBar: { height: "100%", borderRadius: "4px" },
  progressWrapper: { gridColumn: "1 / -1" },
  progressLabel: { fontSize: "12px", color: "#9CA3AF" },
  primaryActionBtn: { display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 16px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  secondaryActionBtn: { display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 16px", background: "#F3F4F6", color: "#374151", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  quickNote: { fontSize: "11px", color: "#9CA3AF", marginTop: "12px", lineHeight: "1.5" },
  noteCard: { background: "#FFF9EC", border: "1px solid #FDE68A", borderRadius: "12px", padding: "14px 18px", fontSize: "13px", color: "#92400E", lineHeight: "1.6", marginBottom: "12px" },
  announcementBanner: { background: "#fff", borderRadius: "12px", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", marginBottom: "20px" },
  announcementBannerLeft: { display: "flex", alignItems: "center", gap: "10px" },
  announcementTag: { fontSize: "11px", color: "#9CA3AF" },
  announcementText: { fontSize: "13px", fontWeight: "500", color: "#111827" },
  announcementTime: { fontSize: "11px", color: "#9CA3AF" },
  bottomGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  assignmentList: { display: "flex", flexDirection: "column", gap: "20px" },
  assignmentRow: { display: "grid", gridTemplateColumns: "1fr auto", gridTemplateRows: "auto auto", gap: "6px", paddingBottom: "20px" },
  assignmentTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  assignmentCourse: { fontSize: "12px", color: "#9CA3AF", marginTop: "2px" },
  assignmentRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" },
  dateTag: { display: "flex", alignItems: "center", gap: "4px" },
  dateText: { fontSize: "12px", color: "#6B7280" },
  submittedBadge: { fontSize: "11px", background: "#EFF6FF", color: "#2563EB", padding: "2px 8px", borderRadius: "20px", fontWeight: "500" },
  deadlineItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#F9FAFB", borderRadius: "10px", borderLeft: "3px solid #2563EB", marginBottom: "10px" },
  deadlineDate: { fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" },
  deadlineTitle: { fontSize: "13px", fontWeight: "600", color: "#111827" },
  deadlineCourse: { fontSize: "11px", color: "#9CA3AF" },
  rateBadge: { fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px" },
  statRow: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #F3F4F6", marginBottom: "4px" },
  statLabel: { fontSize: "13px", color: "#6B7280" },
  statValue: { fontSize: "13px", fontWeight: "600", color: "#111827" },
  footer: { background: "#111827", padding: "60px 64px 32px" },
  footerGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginBottom: "40px" },
  footerLogoName: { fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: "700", color: "#2563EB" },
  footerTagline: { fontSize: "13px", color: "#9CA3AF", marginTop: "12px", lineHeight: "1.6" },
  footerHeading: { fontSize: "13px", fontWeight: "600", color: "#fff", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" },
  footerLink: { display: "block", fontSize: "13px", color: "#9CA3AF", textDecoration: "none", marginBottom: "8px" },
  footerText: { fontSize: "13px", color: "#9CA3AF", marginBottom: "8px" },
  socialIcons: { display: "flex", gap: "12px", marginBottom: "8px" },
  socialIcon: { width: "32px", height: "32px", borderRadius: "8px", background: "#1F2937", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#9CA3AF", cursor: "pointer" },
  newsletterRow: { display: "flex", gap: "8px", marginTop: "8px" },
  newsletterInput: { flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid #374151", background: "#1F2937", color: "#fff", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" },
  newsletterBtn: { padding: "8px 14px", borderRadius: "8px", background: "#2563EB", color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  footerBottom: { borderTop: "1px solid #1F2937", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" },
  footerCopy: { fontSize: "12px", color: "#6B7280" },
  footerBottomLinks: { display: "flex", gap: "20px" },
  footerSmallLink: { fontSize: "12px", color: "#6B7280", textDecoration: "none" },
};