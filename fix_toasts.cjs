const fs = require('fs');

// Fix CoursesPage
let file = 'src/pages/CoursesPage.jsx';
let content = fs.readFileSync(file, 'utf8');
if (!content.includes('addToast("Success", "Course added successfully", "course");')) {
    content = content.replace(/await createCourse\(formData\);/, 'await createCourse(formData);\n      addToast("Success", "Course added successfully", "course");');
    fs.writeFileSync(file, content);
}

// Fix CalendarPage
file = 'src/pages/CalendarPage.jsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/addToast\("Success", "Event created successfully", "success"\);\n/g, '');
content = content.replace(/addToast\("Success", "Event added successfully", "success"\);\n/g, '');
content = content.replace(/await calendarEventService\.createEvent\(payload\);/, 'await calendarEventService.createEvent(payload);\n      addToast("Success", "Event added successfully", "event");');
fs.writeFileSync(file, content);
