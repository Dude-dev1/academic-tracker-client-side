const fs = require('fs');

// Fix AnnouncementsPage
let file = 'src/pages/AnnouncementsPage.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/const newAnn = addToast\("Success", "Announcement created successfully", "success"\);\n\s*addToast\("Success", "Announcement created successfully", "success"\);\n\s*await announcementService\.createAnnouncement\(\{/, 'await announcementService.createAnnouncement({');
content = content.replace(/await announcementService.createAnnouncement\((\{[\s\S]*?\})\);/g, (match) => {
    return match + '\n        addToast("Success", "Announcement created successfully", "success");';
});
// Need to just clean it safely if above fails:
fs.writeFileSync(file, content);

// Fix CoursesPage
file = 'src/pages/CoursesPage.jsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/addToast\("Success", "Course added successfully", "course"\);/g, 'addToast("Success", "Course added successfully", "success");');
fs.writeFileSync(file, content);

// Fix CalendarPage
file = 'src/pages/CalendarPage.jsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/addToast\("Success", "Event added successfully", "event"\);/g, 'addToast("Success", "Event added successfully", "success");');
fs.writeFileSync(file, content);

