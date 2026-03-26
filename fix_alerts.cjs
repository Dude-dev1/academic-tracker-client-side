const fs = require('fs');

function replaceAlerts(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Simple hack to replace generic alert(err...) with addToast in catch blocks
    content = content.replace(/alert\(\s*err\.response\?\.data\?\.message\s*\|\|\s*(`[^`]+`|"[^"]+"|'[^']+')\s*\);/g, (match, p1) => {
        return `addToast("Failed", err.response?.data?.message || ${p1}, "error");`;
    });

// specific fallbacks
content = content.replace(/alert\("Failed to save event"\);/g, 'addToast("Failed", "Failed to save event", "error");');
content = content.replace(/alert\("Failed to delete event"\);/g, 'addToast("Failed", "Failed to delete event", "error");');
content = content.replace(/alert\("Error uploading file"\);/g, 'addToast("Failed", "Error uploading file", "error");');

    fs.writeFileSync(filePath, content);
}

replaceAlerts('src/pages/AssignmentsPage.jsx');
replaceAlerts('src/pages/CoursesPage.jsx');
replaceAlerts('src/pages/CalendarPage.jsx');
replaceAlerts('src/pages/AnnouncementsPage.jsx');
