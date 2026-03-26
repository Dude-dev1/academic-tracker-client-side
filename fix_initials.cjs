const fs = require('fs');
const file = 'src/pages/ProgressPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Insert initials before return
const newStats = `// Derived stats
  const isFirstTimeUser = courses.length === 0 && assignments.length === 0;
  const totalAssigned = assignments.length;
  const completedCount = assignments.filter(a => a.status === 'completed').length;
  const inProgressCount = totalAssigned - completedCount - assignments.filter(a => a.status === 'overdue').length;
  const overallPct = totalAssigned > 0 ? Math.round((completedCount / totalAssigned) * 100) : 0;

  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  return (`

content = content.replace(/\/\/ Derived stats[\s\S]*?return \(/, newStats);

fs.writeFileSync(file, content);
