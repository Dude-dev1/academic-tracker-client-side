const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/DashboardPage.jsx');
let content = fs.readFileSync(file, 'utf8');

// Replace styles.assignmentRow
content = content.replace(
  `  assignmentRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gridTemplateRows: "auto auto",
    gap: "6px",
    paddingBottom: "20px",
  },`,
  `  assignmentRow: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingBottom: "20px",
  },`
);

// We need to wrap the top part
// Look for `              <div>\n                <p style={styles.assignmentTitle}`
content = content.replace(
  `              <div>
                <p style={styles.assignmentTitle}>{a.title}</p>
                <p style={styles.assignmentCourse}>{a.courseId?.name || "Personal"}</p>
              </div>`,
  `              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <p style={styles.assignmentTitle}>{a.title}</p>
                  <p style={styles.assignmentCourse}>{a.courseId?.name || "Personal"}</p>
                </div>`
);

// Look for `              <div style={styles.progressWrapper}>` to close the div correctly 
content = content.replace(
  `              <div style={styles.progressWrapper}>`,
  `              </div>
              <div style={styles.progressWrapper}>`
);

// Also check to assure assignmentRight has alignment on right, it already has align-items: flex-end.
// Wait, is there any other place with assignmentRow?
// It is also used in ProgressPage? No, styles might be copied, let's see.

fs.writeFileSync(file, content);
console.log("Fixed dashboard page grid issue");
