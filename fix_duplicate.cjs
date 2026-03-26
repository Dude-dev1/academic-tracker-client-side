const fs = require('fs');

let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');

// remove one of the openEditModal blocks
const openEditRegex = /const openEditModal = \(a\) => \{\n\s*setEditingId\(a\._id\);\n\s*setNewTitle\(a\.title\);\n\s*setNewDueDate\(a\.dueDate \? new Date\(a\.dueDate\)\.toISOString\(\)\.split\("T"\)\[0\] : ""\);\n\s*setNewCourseId\(a\.courseId\?._id \|\| a\.courseId \|\| ""\);\n\s*setNewGroup\(a\.group \|\| "All"\);\n\s*setIsModalOpen\(true\);\n\s*\};\n\n\s*/;

content = content.replace(openEditRegex, '');

fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
