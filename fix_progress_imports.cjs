const fs = require('fs');
const file = 'src/pages/ProgressPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /import \{ courseService \} from "\.\.\/services\/courseService";\nimport \{ assignmentService \} from "\.\.\/services\/assignmentService";/,
  `import { getCourses } from "../services/courseService";
import assignmentService from "../services/assignmentService";`
);

content = content.replace(/courseService\.getUserCourses\(\)/, 'getCourses()');
content = content.replace(/assignmentService\.getUserAssignments\(\)/, 'assignmentService.getAssignments()');

fs.writeFileSync(file, content);
