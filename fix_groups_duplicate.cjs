const fs = require('fs');
let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');

// remove one of the duplicates
content = content.replace(
  /function groupStyle\(group\) \{\n\s*if \(group === "Group 1"\) return \{ background: "#F3E8FF", color: "#6D28D9" \}; \/\/ purple\n\s*if \(group === "Group 2"\) return \{ background: "#FEF3C7", color: "#B45309" \}; \/\/ yellow\/orange\n\s*return \{ background: "#DBEAFE", color: "#1D4ED8" \}; \/\/ light blue for "All"\n\}\n\nfunction groupStyle\(group\) \{\n\s*if \(group === "Group 1"\) return \{ background: "#F3E8FF", color: "#6D28D9" \}; \/\/ purple\n\s*if \(group === "Group 2"\) return \{ background: "#FEF3C7", color: "#B45309" \}; \/\/ yellow\/orange\n\s*return \{ background: "#DBEAFE", color: "#1D4ED8" \}; \/\/ light blue for "All"\n\}/g,
  `function groupStyle(group) {
  if (group === "Group 1") return { background: "#F3E8FF", color: "#6D28D9" }; // purple
  if (group === "Group 2") return { background: "#FEF3C7", color: "#B45309" }; // yellow/orange
  return { background: "#DBEAFE", color: "#1D4ED8" }; // light blue for "All"
}`
);

fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
