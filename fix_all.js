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
  \`  assignmentRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gridTemplateRows: "auto auto",
    gap: "6px",
    paddingBottom: "20px",
  },\`,
  \`  assignmentRow: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingBottom: "20px",
  },\`
);

// 3. Fix assignmentRow JSX inside ClassView
content = content.replace(
  \`              <div
              key={i}
              style={{
                ...styles.assignmentRow,
                borderBottom:
                  i < assignments.length - 1 ? "1px solid #F3F4F6" : "none",
              }}
            >
              <div>
                <p style={styles.assignmentTitle}>{a.title}</p>
                <p style={styles.assignmentCourse}>{a.courseId?.name || "Personal"}</p>
              </div>
              <div style={styles.assignmentRight}>\`,
  \`              <div
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
                <div style={styles.assignmentRight}>\`
);

// 4. Fix assignmentRow JSX closing
content = content.replace(
  \`              </div>
              <div style={styles.progressWrapper}>\`,
  \`              </div>
              </div>
              <div style={styles.progressWrapper}>\`
);

// 5. Check if ProgressPage uses the same? Actually, the user asked for DashboardPage.

fs.writeFileSync(file, content);
console.log("Success");
