const fs = require('fs');
let file = 'src/pages/AssignmentsPage.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/addToast\("Success", "Assignment created successfully", "success"\);\s*addToast\("Success", "Assignment created successfully", "success"\);/, 'addToast("Success", "Assignment created successfully", "success");');
fs.writeFileSync(file, content);
