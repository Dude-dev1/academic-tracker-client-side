const fs = require('fs');

function inject(file, search, replace) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search, replace);
  fs.writeFileSync(file, content);
}

inject(
  'src/pages/AssignmentsPage.jsx',
  /await assignmentService\.createAssignment\(payload\);/g,
  `await assignmentService.createAssignment(payload);\n        addToast("Success", "Assignment created successfully", "success");`
);

inject(
  'src/pages/AnnouncementsPage.jsx',
  /await announcementService\.createAnnouncement\(\{/g,
  `await announcementService.createAnnouncement({\n    // added dynamically via api, but triggering toast locally works before promise resolves if we want, or better after await`
);
// that replace is tricky, let's just do it directly with a safe regex:

let aContent = fs.readFileSync('src/pages/AnnouncementsPage.jsx', 'utf8');
if (!aContent.includes('addToast("Success"')) {
   aContent = aContent.replace(
     /const res = await announcementService\.createAnnouncement\({\n\s*title: newTitle,\n\s*content: newContent,\n\s*courseId: "general",\n\s*}\);/,
     `const res = await announcementService.createAnnouncement({\n          title: newTitle,\n          content: newContent,\n          courseId: "general",\n        });\n        if(res) addToast("Success", "Announcement posted", "success");`
   );
   fs.writeFileSync('src/pages/AnnouncementsPage.jsx', aContent);
}

