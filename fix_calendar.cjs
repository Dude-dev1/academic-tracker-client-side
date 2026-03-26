const fs = require('fs');
let file = 'src/pages/CalendarPage.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/                  addToast\("Success", "Event added successfully", "success"\);\n/, '');
fs.writeFileSync(file, content);
