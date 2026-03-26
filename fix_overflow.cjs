const fs = require('fs');

let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');

// Fix overflow cutoff issue for action dropdowns
content = content.replace(
  /tableWrap: \{\n\s*background: "#fff",\n\s*borderRadius: "16px",\n\s*border: "0\.5px solid #E5E7EB",\n\s*overflow: "hidden",/,
  `tableWrap: {\n    background: "#fff",\n    borderRadius: "16px",\n    border: "0.5px solid #E5E7EB",\n    overflow: "visible",`
);

// Fix the alert error mapping:
content = content.replace(
  /alert\(err\.response\?\.data\?\.message \|\| "Failed to create assignment"\);/g,
  'alert(err.response?.data?.message || `Failed to ${editingId ? "update" : "create"} assignment`);'
);

fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
