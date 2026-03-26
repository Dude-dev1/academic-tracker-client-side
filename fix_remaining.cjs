const fs = require('fs');

let content = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

// The slice block:
// a.course -> a.courseId?.name || "General"
// a.date.slice(0, 6) -> new Date(a.dueDate).toLocaleDateString()
// a.rate < 50 -> new Date(a.dueDate) < new Date() && a.status !== "completed"

content = content.replace(
  /<p style=\{styles\.upcomingCourse\}>\{a\.course\}<\/p>/g,
  '<p style={styles.upcomingCourse}>{a.courseId?.name || "General"}</p>'
);

content = content.replace(
  /<p style=\{styles\.upcomingDate\}>\{a\.date\.slice\(0, 6\)\}<\/p>/g,
  '<p style={styles.upcomingDate}>{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No date"}</p>'
);

content = content.replace(
  /const isOverdue = a\.rate < 50;/g,
  'const isOverdue = a.dueDate ? new Date(a.dueDate) < new Date() && a.status !== "completed" : false;'
);

content = content.replace(
  /a\.rate/g,
  'a.points || 100'
);

fs.writeFileSync('src/pages/DashboardPage.jsx', content);
