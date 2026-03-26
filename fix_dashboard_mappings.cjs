const fs = require('fs');

let content = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

// Dashboard mappings to display real data. 
// For assignments.map((a, i) => ...)

// In PersonalView:
// <p style={styles.assignmentTitle}>{a.title}</p>
// <p style={styles.assignmentCourse}>{a.course}</p>
content = content.replace(
  /<p style=\{styles\.assignmentCourse\}>\{a\.course\}<\/p>/g,
  '<p style={styles.assignmentCourse}>{a.courseId?.name || "Personal"}</p>'
);

// In PersonalView:
// <span>{a.date}</span>
content = content.replace(
  /<span>\{a\.date\}<\/span>/g,
  '<span>{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No deadline"}</span>'
);

// In ClassView:
// <p style={styles.deadlineDate}>{a.date}</p>
content = content.replace(
  /<p style=\{styles\.deadlineDate\}>\{a\.date\}<\/p>/g,
  '<p style={styles.deadlineDate}>{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No deadline"}</p>'
);

// <p style={styles.deadlineCourse}>{a.course}</p>
content = content.replace(
  /<p style=\{styles\.deadlineCourse\}>\{a\.course\}<\/p>/g,
  '<p style={styles.deadlineCourse}>{a.courseId?.name || "General"}</p>'
);

// <div
//   style={{
//     ...styles.rateBadge,
//     background: statusColor(a.rate) + "20",
//     color: statusColor(a.rate),
//   }}
// >
//   {a.rate}%
// </div>
content = content.replace(
  /color: statusColor\(a\.rate\),\s*\}\}\s*>\s*\{a\.rate\}%\s*<\/div>/g,
  'color: statusColor(a.points || 100),\n                }}\n              >\n                {a.points || 100} pts\n              </div>'
);
content = content.replace(
  /background: statusColor\(a\.rate\) \+ "20"/g,
  'background: statusColor(a.points || 100) + "20"'
);

// Replace statusColor implementation:
content = content.replace(
  /const statusColor = \(rate\) => {[\s\S]*?};/g,
  `const statusColor = (pts) => {
  if (pts >= 75) return "#10b981";
  if (pts >= 50) return "#f59e0b";
  return "#ef4444";
};`
);


// In ClassView there is also a courses mapping?
// {courses.map((c, i) =>
// Oh wait, did they have courses mapped? We removed mock courses. Let's see if we missed courses.map

fs.writeFileSync('src/pages/DashboardPage.jsx', content);
console.log("mappings fixed")
