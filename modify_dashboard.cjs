const fs = require('fs');

let content = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

// Add imports
if (!content.includes('import assignmentService')) {
  content = content.replace(
    'import Sidebar from "../components/ui/Sidebar";',
    'import Sidebar from "../components/ui/Sidebar";\nimport assignmentService from "../services/assignmentService";\nimport { getCourses } from "../services/courseService";\nimport { useEffect } from "react";'
  );
}

// Remove dummy assignments completely or comment them out
content = content.replace(/const assignments = \[\s*\{[\s\S]*?\];/g, '// const dummyAssignments = [];');

// First find the DashboardPage component and add state hooks
content = content.replace(
  'export default function DashboardPage() {',
  `export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, assignRes] = await Promise.all([
          getCourses(),
          assignmentService.getAssignments(),
        ]);
        if (courseRes?.data) setCourses(courseRes.data);
        if (assignRes?.data) setAssignments(assignRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
`
);

// We need to pass courses and assignments to PersonalView and ClassView
content = content.replace(/<PersonalView firstName=\{firstName\} setIsModalOpen=\{setIsModalOpen\} navigate=\{navigate\} \/>/g, '<PersonalView firstName={firstName} setIsModalOpen={setIsModalOpen} navigate={navigate} assignments={assignments} courses={courses} />');
content = content.replace(/<ClassView \/>/g, '<ClassView assignments={assignments} courses={courses} navigate={navigate} />');

// Now modify PersonalView to accept assignments and courses
content = content.replace(
  'function PersonalView({ firstName, setIsModalOpen, navigate }) {',
  'function PersonalView({ firstName, setIsModalOpen, navigate, assignments = [], courses = [] }) {'
);

// Compute real stats in PersonalView
content = content.replace(
  'function PersonalView({ firstName, setIsModalOpen, navigate, assignments = [], courses = [] }) {',
  `function PersonalView({ firstName, setIsModalOpen, navigate, assignments = [], courses = [] }) {
  const dueToday = assignments.filter(a => {
    if (!a.dueDate) return false;
    const today = new Date();
    const due = new Date(a.dueDate);
    return due.getDate() === today.getDate() && due.getMonth() === today.getMonth() && due.getFullYear() === today.getFullYear() && a.status !== "completed";
  }).length;
  
  const overdue = assignments.filter(a => {
    if (!a.dueDate) return false;
    return new Date(a.dueDate) < new Date() && a.status !== "completed";
  }).length;
  
  const completed = assignments.filter(a => a.status === "completed").length;
`
);

content = content.replace(
  /label: "Due today",\s*value: "0"/g,
  'label: "Due today",\n            value: dueToday.toString()'
);
content = content.replace(
  /label: "Overdue",\s*value: "1"/g,
  'label: "Overdue",\n            value: overdue.toString()'
);
content = content.replace(
  /label: "Completed",\s*value: "1"/g,
  'label: "Completed",\n            value: completed.toString()'
);

// Modify ClassView 
content = content.replace(
  'function ClassView() {',
  'function ClassView({ assignments = [], courses = [], navigate }) {'
);


content = content.replace(
  /assignments\.map\(\(a, i\)/g,
  'assignments.map((a, i)'
);

fs.writeFileSync('src/pages/DashboardPage.jsx', content);
console.log("Successfully modified script!");
