const fs = require('fs');

const injectToasts = (filePath, itemName) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Import ToastContext
  if (!content.includes('useToast')) {
    content = content.replace(/(import .* from "react-router-dom";?)/, '$1\nimport { useToast } from "../context/ToastContext";');
    if (!content.includes('useToast')) {
      // Fallback
      content = content.replace(/(import React.*?;\n?)/, '$1import { useToast } from "../context/ToastContext";\n');
    }
  }

  // Inject hook destructuring
  if (!content.includes('const { addToast } = useToast()')) {
    // Find the main component declaration
    const componentRegex = new RegExp(`export default function ${filePath.split('/').pop().replace('.jsx', '')}\\(.*?\\) \\{`);
    content = content.replace(componentRegex, (match) => `${match}\n  const { addToast } = useToast();`);
  }

  // We need to inject `addToast` in try/catch blocks of create/update/delete 
  // Normally the handler names might be handleCreate, handleSave, handleSubmit
  
  if (itemName === 'Assignment') {
    content = content.replace(
      /await assignmentService\.createAssignment\(payload\);\n\s*setAssignments\(\(prev\)/g,
      `await assignmentService.createAssignment(payload);\n      addToast("Success", "Assignment created successfully", "success");\n      setAssignments((prev)`
    );
  }
  
  if (itemName === 'Announcement') {
    content = content.replace(
      /await announcementService\.createAnnouncement\(\{/g,
      `addToast("Success", "Announcement created successfully", "success");\n      await announcementService.createAnnouncement({`
    );
  }

  if (itemName === 'Event') {
      content = content.replace(
      /await calendarEventService\.createEvent\(payload\);/g,
      `await calendarEventService.createEvent(payload);\n      addToast("Success", "Event added successfully", "success");`
    );
  }

  if (itemName === 'Course') {
    content = content.replace(
      /await createCourse\(currentCourse\);/g,
      `await createCourse(currentCourse);\n      addToast("Success", "Course added successfully", "success");`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`Injected inside ${filePath}`);
}

injectToasts('src/pages/AssignmentsPage.jsx', 'Assignment');
injectToasts('src/pages/AnnouncementsPage.jsx', 'Announcement');
injectToasts('src/pages/CalendarPage.jsx', 'Event');
injectToasts('src/pages/CoursesPage.jsx', 'Course');

