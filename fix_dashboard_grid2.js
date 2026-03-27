const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/DashboardPage.jsx');
let content = fs.readFileSync(file, 'utf8');

// replace CSS object
content = content.replace(/assignmentRow: \{\s*display: "grid",\s*gridTemplateColumns: "repeat\(auto-fit, minmax\(280px, 1fr\)\)",\s*gridTemplateRows: "auto auto",\s*gap: "6px",\s*paddingBottom: "20px",\s*\}/m, 
\`assignmentRow: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingBottom: "20px",
  }\`);

// replace JSX
content = content.replace(/<div>\s*<p style=\{styles\.assignmentTitle\}>\{a\.title\}<\/p>\s*<p style=\{styles\.assignmentCourse\}>\{a\.courseId\?\.name \|\| "Personal"\}<\/p>\s*<\/div>\s*<div style=\{styles\.assignmentRight\}>/m,
\`<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <p style={styles.assignmentTitle}>{a.title}</p>
                  <p style={styles.assignmentCourse}>{a.courseId?.name || "Personal"}</p>
                </div>
                <div style={styles.assignmentRight}>\`);

// find the closing div of assignmentRight and add the closing div for the wrap:
// It looks like:
//                 </div>
//               </div>
//               <div style={styles.progressWrapper}>
content = content.replace(/<\/div>\s*<\/div>\s*<div style=\{styles\.progressWrapper\}>/m,
\`                </div>
              </div>
              </div>
              <div style={styles.progressWrapper}>\`);

fs.writeFileSync(file, content);
console.log("Fixed dashboard page grid issue 2");
