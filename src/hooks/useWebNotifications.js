import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import assignmentService from '../services/assignmentService';
import announcementService from '../services/announcementService';
import { calendarEventService } from '../services/calendarEventService';

export default function useWebNotifications() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const seenIdsRef = useRef(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!user) return;

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // load seen ids from local storage
    const storedSeen = localStorage.getItem(`seen_notifications_${user.id}`);
    if (storedSeen) {
      seenIdsRef.current = new Set(JSON.parse(storedSeen));
    }

    const checkNewItems = async () => {
      try {
        const [assignmentsRes, announcementsRes, eventsRes] = await Promise.all([
          assignmentService.getAssignments(),
          announcementService.getAnnouncements(),
          calendarEventService.getEvents()
        ]);

        const assignments = assignmentsRes?.data || assignmentsRes || [];
        const announcements = announcementsRes?.data || announcementsRes || [];
        const events = eventsRes?.data?.data || eventsRes?.data || [];

        let hasNew = false;
        
        const processItem = (id, title, body, type, action) => {
          if (!seenIdsRef.current.has(id)) {
            if (initializedRef.current) {
              if (Notification.permission === "granted") {
                const notification = new Notification(title, { body, icon: '/favicon.ico' });
                if (action && action.link) {
                  notification.onclick = () => {
                    window.location.href = action.link;
                  };
                }
              }
              addToast(title, body, type, action);
            }
            seenIdsRef.current.add(id);
            hasNew = true;
          }
        };

        if (Array.isArray(assignments)) {
          assignments.forEach(a => processItem(a._id, "New Assignment", a.title, "assignment", { label: "View Assignment", link: "/assignments" }));
        }
        if (Array.isArray(announcements)) {
          announcements.forEach(a => processItem(a._id, "New Announcement", a.title, "announcement", { label: "View Announcement", link: "/announcements" }));
        }
        if (Array.isArray(events)) {
          events.forEach(e => processItem(e._id, "New Calendar Event", e.title, "event", { label: "View Event", link: "/calendar" }));
        }

        if (hasNew) {
          localStorage.setItem(`seen_notifications_${user.id}`, JSON.stringify(Array.from(seenIdsRef.current)));
        }

        initializedRef.current = true;

      } catch (err) {
        console.error("Error fetching for notifications:", err);
      }
    };

    checkNewItems();
    const interval = setInterval(checkNewItems, 30000); // 30s polling

    return () => clearInterval(interval);
  }, [user]);
}
