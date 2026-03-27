const fs = require('fs');

const file = 'src/pages/DashboardPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. mobile-hide the avatar & top nav
content = content.replace(
  /<button\s+onClick=\{\(\) => setSidebarOpen\(\(v\) => !v\)\}\s+style=\{styles\.toggleBtn\}\s*>/,
  '<button className="mobile-hide" onClick={() => setSidebarOpen((v) => !v)} style={styles.toggleBtn}>'
);
content = content.replace(
  /<div style=\{styles\.avatar\}>\{initials\}<\/div>/,
  '<div className="mobile-hide" style={styles.avatar}>{initials}</div>'
);

// 2. Fix assignmentRow CSS
content = content.replace(
  '  assignmentRow: {\n    display: "grid",\n    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",\n    gridTemplateRows: "auto auto",\n    gap: "6px",\n    paddingBottom: "20px",\n  },',
  '  assignmentRow: {\n    display: "flex",\n    flexDirection: "column",\n    gap: "12px",\n    paddingBottom: "20px",\n  },'
);

// 3. Fix assignmentRow JSX inside ClassView
content = content.replace(
  '              <div\n              key={i}\n              style={{\n                ...styles.assignmentRow,\n                borderBottom:\n                  i < assignments.length - 1 ? "1px solid #F3F4F6" : "none",\n              }}\n            >\n              <div>\n                <p style={styles.assignmentTitle}>{a.title}</p>\n                <p style={styles.assignmentCourse}>{a.courseId?.name || "Personal"}</p>\n              </div>\n              <div style={styles.assignmentRight}>',
  '              <div\n              key={i}\n              style={{\n                ...styles.assignmentRow,\n                borderBottom:\n                  i < assignments.length - 1 ? "1px solid #F3F4F6" : "none",\n              }}\n            >\n              <div style={{ display: \'flex\', justifyContent: \'space-between\', alignItems: \'flex-start\', flexWrap: \'wrap\', gap: \'8px\' }}>\n                <div>\n                  <p style={styles.assignmentTitle}>{a.title}</p>\n                  <p style={styles.assignmentCourse}>{a.courseId?.name || "Personal"}</p>\n                </div>\n                <div style={styles.assignmentRight}>'
);

// 4. Fix assignmentRow JSX closing
content = content.replace(
  '              </div>\n              <div style={styles.progressWrapper}>',
  '              </div>\n              </div>\n              <div style={styles.progressWrapper}>'
);

fs.writeFileSync(file, content);
console.log("Success");
