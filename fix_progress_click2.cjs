const fs = require('fs');
const file = 'src/pages/ProgressPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/setSidebarOpen\(\(v\) => !v\)/g, `setIsSidebarOpen(v => !v)`);

fs.writeFileSync(file, content);
