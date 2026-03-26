const fs = require('fs');

let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');

// Insert groupStyle after statusLabel
content = content.replace(
  /function statusLabel\(status\) \{\n\s*return status === "overdue" \? "overdue soon" : status;\n\}/,
  `function statusLabel(status) {
  return status === "overdue" ? "overdue soon" : status;
}

function groupStyle(group) {
  if (group === "Group 1") return { background: "#F3E8FF", color: "#6D28D9" }; // purple
  if (group === "Group 2") return { background: "#FEF3C7", color: "#B45309" }; // yellow/orange
  return { background: "#DBEAFE", color: "#1D4ED8" }; // light blue for "All"
}`
);

// Replace the subCell rendering
content = content.replace(
  /<td style=\{styles\.subCell\}>\{row\.group \|\| "All"\}<\/td>/,
  `<td style={styles.subCell}>
        <span style={{ ...styles.statusPill, ...groupStyle(row.group || "All") }}>
          {row.group || "All"}
        </span>
      </td>`
);

fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
