const fs = require('fs');
let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');
const regex = /\{\s*label:\s*"View Submission",\s*icon:\s*\(\s*<svg[\s\S]*?<\/svg>\s*\),\s*onClick:\s*\(\)\s*=>\s*\{\s*onClose\(\);\s*\},\s*\},\s*/g;
content = content.replace(regex, '');
fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
