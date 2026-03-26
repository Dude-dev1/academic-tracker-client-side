const fs = require('fs');
const file = 'src/pages/ProgressPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<Sidebar sidebarOpen=\{sidebarOpen\} \/>/g, '<Sidebar sidebarOpen={isSidebarOpen} />');
fs.writeFileSync(file, content);
