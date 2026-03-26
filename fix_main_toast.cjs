const fs = require('fs');
const file = 'src/main.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('ToastProvider')) {
  // Add import
  content = content.replace(
    /import { AssignmentProvider } from "\.\/context\/AssignmentContext";/,
    'import { AssignmentProvider } from "./context/AssignmentContext";\nimport { ToastProvider } from "./context/ToastContext";'
  );
  
  // Wrap App
  content = content.replace(
    /<App \/>/,
    '<ToastProvider>\n              <App />\n            </ToastProvider>'
  );
  
  fs.writeFileSync(file, content);
}
