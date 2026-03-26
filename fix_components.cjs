const fs = require('fs');

let content = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

content = content.replace(
  /const isOverdue = a\.rate < 50;/g,
  'const isOverdue = a.dueDate ? new Date(a.dueDate) < new Date() && a.status !== "completed" : false;'
);

fs.writeFileSync('src/pages/DashboardPage.jsx', content);
