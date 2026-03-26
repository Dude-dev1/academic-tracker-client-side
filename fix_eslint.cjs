const fs = require('fs');
let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');

content = content.replace(/import \{ useNavigate \} from "react-router-dom";\n/g, '');
fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
