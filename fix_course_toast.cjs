const fs = require('fs');
let file = 'src/pages/CoursesPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// The function is createCourse from service. Let's see how it's called
content = content.replace(/await createCourse\(currentCourse\);/, `await createCourse(currentCourse);\n      addToast("Success", "Course created successfully", "success");`);

fs.writeFileSync(file, content);

file = 'src/pages/CalendarPage.jsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/await calendarEventService\.createEvent\(payload\);/, `await calendarEventService.createEvent(payload);\n      addToast("Success", "Event created successfully", "success");`);
fs.writeFileSync(file, content);

