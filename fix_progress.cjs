const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/ProgressPage.jsx');
let content = fs.readFileSync(file, 'utf8');

const tBtn = /<button\s+onClick=\{\(\) => setIsSidebarOpen\(v => !v\)\}\s+style=\{styles\.toggleBtn\}>/g;
content = content.replace(tBtn, '<button className="mobile-hide" onClick={() => setIsSidebarOpen(v => !v)} style={styles.toggleBtn}>');

const avatarR = /<div style=\{styles\.avatar\}>\{initials\}<\/div>/g;
content = content.replace(avatarR, '<div className="mobile-hide" style={styles.avatar}>{initials}</div>');

fs.writeFileSync(file, content);
