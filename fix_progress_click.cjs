const fs = require('fs');
const file = 'src/pages/ProgressPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<button\n\s*onClick=\{[^{}]*setSidebarOpen[^{}]*\}\n\s*style=\{styles\.toggleBtn\}/g, `<button\n              onClick={() => setIsSidebarOpen(true)}\n              style={styles.toggleBtn}`);
content = content.replace(/<button onClick=\{[^{}]*isSidebarOpen[^{}]*\} style=\{styles\.toggleBtn\}/g, `<button onClick={() => setIsSidebarOpen(true)} style={styles.toggleBtn}`);
content = content.replace(/onClick=\{[^{}]*sidebarOpen[^{}]*\}/g, `onClick={() => setIsSidebarOpen(true)}`);

fs.writeFileSync(file, content);
console.log("Replaced onClick");
