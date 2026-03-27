import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import Modal from "../components/ui/Modal";
import ConfirmModal from "../components/ui/ConfirmModal";
import Sidebar from "../components/ui/Sidebar";
import { calendarEventService } from "../services/calendarEventService";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_COLORS = {
  Urgent: "#ef4444",
  Important: "#f59e0b",
  Normal: "#2563EB",
  Completed: "#10b981",
  Prep: "#7C3AED",
};

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

function CalendarGrid({ eventsMap, onSelectEvent, currentDay, currentMonth, currentYear }) {
  const cells = [];
  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  for (let i = 0; i < firstDay; i++) {
    cells.push(<td key={`empty-start-${i}`} style={styles.emptyCell} />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const todayObj = new Date();
    const isToday = d === todayObj.getDate() && todayObj.getMonth() === currentMonth && todayObj.getFullYear() === currentYear;
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
          <div style={{ ...styles.eventPill, background: STATUS_COLORS[ev.status] || ev.color }}>
            {ev.title}
          </div>
        )}
      </td>
    );
  }

  while (cells.length % 7 !== 0) {
    cells.push(<td key={`empty-end-${cells.length}`} style={styles.emptyCell} />);
  }

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(<tr key={i}>{cells.slice(i, i + 7)}</tr>);
  }

  return (
    <table style={styles.calGrid}>
      <thead>
        <tr>
          {DAY_HEADERS.map((d) => (
            <th key={d} style={styles.calTh}>
              {d}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function DetailPanel({ event, day, isClass, onEdit, onDelete, currentYear, currentMonth }) {
  if (!event) return null;
  const date = event.date ? new Date(event.date) : new Date(currentYear, currentMonth, day);
  const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";

  return (
    <div style={styles.detailPanel}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ ...styles.detailTitle, color: STATUS_COLORS[event.status] || event.color, margin: 0 }}>{event.title}</p>
        <span style={{ fontSize: '11px', fontWeight: '600', color: STATUS_COLORS[event.status] || event.color, background: (STATUS_COLORS[event.status] || event.color) + "15", padding: '4px 8px', borderRadius: '12px' }}>
          {event.status || 'Normal'}
        </span>
      </div>
      <div style={{ ...styles.detailRow, marginTop: '12px' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>
          {DAY_NAMES[date.getDay()]}, {day}{suffix} {date.toLocaleString('default', { month: 'long' })} {currentYear}
        </span>
      </div>
      {(event.time || event.location) && (
        <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
          {event.time && (
            <div style={styles.detailRow}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div style={styles.detailRow}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}
        </div>
      )}
      {event.desc && <div style={styles.detailDesc}>{event.desc}</div>}
      <div style={styles.detailActions}>
        {isClass ? (
          <p style={styles.classNotice}>
            Class events can only be edited by course representatives.
          </p>
        ) : (
          <>
            <button style={styles.editBtn} onClick={() => onEdit(event)}>Edit Event</button>
            <button style={styles.deleteBtn} onClick={() => onDelete(event._id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("Personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  
  const todayDate = new Date();
  const [currentYear, setCurrentYear] = useState(todayDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(todayDate.getMonth()); 
  
  const [events, setEvents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    desc: "",
    status: "Normal"
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";
  const initials = firstName.slice(0, 2).toUpperCase();

  const isClass = activeTab === "Class";

  const fetchEvents = async () => {
    try {
      const data = await calendarEventService.getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((ev) => {
    const evDate = new Date(ev.date);
    return (
      (Boolean(ev.isClass) === isClass) &&
      evDate.getFullYear() === currentYear &&
      evDate.getMonth() === currentMonth
    );
  });

  const eventsMap = {};
  filteredEvents.forEach((ev) => {
    const day = new Date(ev.date).getDate();
    eventsMap[day] = ev; 
  });

  const selectedEvent = selectedDay ? eventsMap[selectedDay] : null;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const openAddModal = () => {
    setEditingEventId(null);
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      desc: "",
      status: "Normal"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ev) => {
    setEditingEventId(ev._id);
    const dateStr = new Date(ev.date).toISOString().split('T')[0];
    setFormData({
      title: ev.title || "",
      date: dateStr,
      time: ev.time || "",
      location: ev.location || "",
      desc: ev.desc || "",
      status: ev.status || "Normal"
    });
    setIsModalOpen(true);
  };

const handleDeleteEvent = (id) => {
    setItemToDelete(id);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    try {
      await calendarEventService.deleteEvent(itemToDelete);
      setSelectedDay(null);
      fetchEvents();
      setItemToDelete(null);
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData, isClass: false };
      if (!payload.title || !payload.date) {
        addToast("Failed", "Title and Date are required.", "error");
        return;
      }

      if (editingEventId) {
        await calendarEventService.updateEvent(editingEventId, payload);
      } else {
        await calendarEventService.createEvent(payload);
      addToast("Success", "Event added successfully", "success");
      }
      setIsModalOpen(false);
      fetchEvents();
      
      const d = new Date(payload.date);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        setSelectedDay(d.getDate() + 1); // fix timezone offset locally, plus we will fetch anyways so user will click to view
      }
    } catch (err) {
      console.error("Failed to save event", err);
    }
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Sidebar sidebarOpen={sidebarOpen} />

      <div style={styles.content}>
        <nav style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <button className="mobile-hide" onClick={() => setSidebarOpen((v) => !v)} style={styles.toggleBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <p style={styles.pageLabel}>Calendar</p>
          </div>
          <div style={styles.topNavRight}>
            <div style={styles.tabGroup}>
              {["Personal", "Class"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedDay(null);
                  }}
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
          <div style={styles.calHeader}>
            <div style={styles.calHeaderLeft}>
              <div
                style={{
                  ...styles.eventsBadge,
                  background: isClass ? "#EDE9FE" : "#EFF6FF",
                  color: isClass ? "#7C3AED" : "#2563EB",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {isClass ? "Class Events" : "My Events"}
              </div>
            </div>
            {isClass ? (
              <span style={styles.readonlyBadge}>View only (Class events are auto-managed)</span>
            ) : (
              <button
                style={styles.addBtn}
                onClick={openAddModal}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Event
              </button>
            )}
          </div>

          <div style={styles.calNav}>
            <button style={styles.calNavBtn} onClick={handlePrevMonth}>‹</button>
            <span style={styles.calMonth}>
              {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button style={styles.calNavBtn} onClick={handleNextMonth}>›</button>
          </div>

          <CalendarGrid
            eventsMap={eventsMap}
            onSelectEvent={(d) => setSelectedDay(d === selectedDay ? null : d)}
            currentDay={todayDate.getDate()}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />

          {selectedEvent && (
            <DetailPanel
              event={selectedEvent}
              day={selectedDay}
              isClass={isClass}
              onEdit={openEditModal}
              onDelete={handleDeleteEvent}
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          )}
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEventId ? "Edit Event" : "Create Event"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={styles.label}>Event Title *</label>
            <input
              type="text"
              placeholder="Enter event title"
              style={styles.input}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Date *</label>
              <input
                type="date"
                style={styles.input}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Time</label>
              <input
                type="time"
                style={styles.input}
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                placeholder="E.g., Room 101, Online"
                style={styles.input}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Status</label>
              <select 
                style={{ ...styles.input, backgroundColor: '#fff' }}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Normal">Normal (Blue)</option>
                <option value="Urgent">Urgent (Red)</option>
                <option value="Important">Important (Orange)</option>
                <option value="Completed">Completed (Green)</option>
                <option value="Prep">Prep (Purple)</option>
              </select>
            </div>
          </div>
          <div>
            <label style={styles.label}>Description</label>
            <textarea
              placeholder="Event description..."
              style={{ ...styles.input, minHeight: "80px", resize: 'vertical' }}
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            ></textarea>
          </div>
          <button
            style={styles.primaryBtn}
            onClick={handleSubmit}
          >
            {editingEventId ? "Update Event" : "Save Event"}
          </button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={executeDelete}
        message="Are you sure you want to delete this event?"
      />
    </div>
  );
}

const styles = {
  root: { display: "flex", minHeight: "100vh", background: "#F0F4FF", fontFamily: "'DM Sans', sans-serif" },
  content: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topNav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", background: "#fff", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 100 },
  topNavLeft: { display: "flex", alignItems: "center", gap: "16px" },
  toggleBtn: { background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", borderRadius: "6px" },
  pageLabel: { fontSize: "16px", fontWeight: "600", color: "#111827" },
  topNavRight: { display: "flex", alignItems: "center", gap: "20px" },
  tabGroup: { display: "flex", background: "#F3F4F6", borderRadius: "8px", padding: "4px" },
  tabBtn: { border: "none", padding: "6px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s" },
  avatar: { width: "36px", height: "36px", borderRadius: "50%", background: "#DBEAFE", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "600" },
  main: { padding: "24px", maxWidth: "900px", margin: "0 auto", width: "100%", paddingBottom: '100px' },
  calHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" },
  calHeaderLeft: { display: "flex", alignItems: "center", gap: "12px" },
  eventsBadge: { display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" },
  addBtn: { display: "flex", alignItems: "center", gap: "6px", background: "#2563EB", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 4px rgba(37,99,235,0.2)" },
  readonlyBadge: { background: "#F3F4F6", color: "#4B5563", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" },
  calNav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "#fff", border: "1px solid #E5E7EB", borderBottom: "none", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" },
  calNavBtn: { background: "#F9FAFB", border: "1px solid #E5E7EB", width: "32px", height: "32px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4B5563", fontSize: "16px" },
  calMonth: { fontSize: "15px", fontWeight: "600", color: "#111827" },
  calGrid: { width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #E5E7EB", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", overflow: "hidden" },
  calTh: { padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#6B7280", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB", background: "#F9FAFB", width: "calc(100% / 7)" },
  calCell: { height: "100px", verticalAlign: "top", padding: "8px", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB", transition: "background 0.15s" },
  emptyCell: { background: "#FAFAFA", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB" },
  dayNum: { fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "inline-block" },
  todayNum: { fontSize: "13px", fontWeight: "600", color: "#fff", background: "#2563EB", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", marginBottom: "6px" },
  eventPill: { padding: "4px 8px", borderRadius: "4px", color: "#fff", fontSize: "11px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  detailPanel: { marginTop: "20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px", animation: "fadeUp 0.3s ease" },
  detailTitle: { fontSize: "16px", fontWeight: "600" },
  detailRow: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#4B5563" },
  detailDesc: { marginTop: "16px", padding: "12px", background: "#F9FAFB", borderRadius: "8px", fontSize: "13px", color: "#374151", lineHeight: "1.5" },
  detailActions: { display: "flex", gap: "10px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #E5E7EB" },
  editBtn: { padding: "6px 14px", background: "#DBEAFE", color: "#2563EB", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" },
  deleteBtn: { padding: "6px 14px", background: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" },
  classNotice: { fontSize: "12px", color: "#6B7280", fontStyle: "italic" },
  label: { display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: '#4B5563' },
  input: { width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #D1D5DB", outline: 'none', fontFamily: 'inherit' },
  primaryBtn: { marginTop: "24px", width: "100%", padding: "12px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: '14px' },
};
