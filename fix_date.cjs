const fs = require('fs');
let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');

content = content.replace(
  /new Date\(a\.dueDate\)\.toISOString\(\)\.split\("T"\)\[0\]/g,
  '( (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` )(new Date(a.dueDate))'
);

fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
