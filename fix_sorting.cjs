const fs = require('fs');

let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');

// Add sortBy state
content = content.replace(
  /const \[searchQuery, setSearchQuery\] = useState\(""\);/,
  `const [searchQuery, setSearchQuery] = useState("");\n  const [sortBy, setSortBy] = useState("dueDate");`
);

// Add sorting logic
content = content.replace(
  /const displayData = assignments\.filter\(\(a\) => \{\n\s*const matchesTab = isClass \? a\.courseId : !a\.courseId;\n\s*const matchesSearch = a\.title\n\s*\.toLowerCase\(\)\n\s*\.includes\(searchQuery\.toLowerCase\(\)\);\n\s*return matchesTab && matchesSearch;\n\s*\}\);/,
  `const displayData = assignments
    .filter((a) => {
      const matchesTab = isClass ? a.courseId : !a.courseId;
      const matchesSearch = a.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === "group") {
        const groupA = a.group || "All";
        const groupB = b.group || "All";
        return groupA.localeCompare(groupB);
      }
      return 0;
    });`
);

// Update button
content = content.replace(
  /<button style=\{styles\.filterPillPurple\}>Sort : Due Date<\/button>/,
  `<button 
              style={styles.filterPillPurple}
              onClick={() => setSortBy(prev => prev === "dueDate" ? "group" : "dueDate")}
            >
              Sort : {sortBy === "dueDate" ? "Due Date" : "Group"}
            </button>`
);

fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
