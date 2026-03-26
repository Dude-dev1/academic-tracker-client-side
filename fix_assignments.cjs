const fs = require('fs');

let content = fs.readFileSync('src/pages/AssignmentsPage.jsx', 'utf8');

content = content.replace(
  /function ActionDropdown\(\{ onClose, onDelete \}\) \{/,
  'function ActionDropdown({ onClose, onDelete, onEdit }) {'
);

content = content.replace(
  /label: "Edit",([\s\S]*?)onClick: \(\) => \{\n\s*onClose\(\);\n\s*\}/,
  `label: "Edit",$1onClick: () => {
            if (onEdit) onEdit();
            onClose();
          }`
);

content = content.replace(
  /function AssignmentRow\(\{ row, onDelete \}\) \{/,
  'function AssignmentRow({ row, onDelete, onEdit }) {'
);

content = content.replace(
  /<ActionDropdown\n\s*onClose=\{\(\) => setOpen\(false\)\}\n\s*onDelete=\{\(\) => onDelete\(row\._id\)\}\n\s*\/>/,
  `<ActionDropdown
            onClose={() => setOpen(false)}
            onDelete={() => onDelete(row._id)}
            onEdit={() => onEdit(row)}
          />`
);

content = content.replace(
  /const \[isModalOpen, setIsModalOpen\] = useState\(false\);/,
  `const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);`
);

content = content.replace(
  /const handleCreate = async \(\) => \{\n\s*if \(!newTitle \|\| !newDueDate\) return;/,
  `const handleSave = async () => {
    if (!newTitle || !newDueDate) return;`
);

content = content.replace(
  /await assignmentService\.createAssignment\(payload\);\n\s*setIsModalOpen\(false\);\n\n\s*\/\/ Reset\n\s*setNewTitle\(""\);\n\s*setNewDueDate\(""\);\n\s*setNewCourseId\(""\);\n\s*setNewGroup\("All"\);/,
  `if (editingId) {
        await assignmentService.updateAssignment(editingId, payload);
      } else {
        await assignmentService.createAssignment(payload);
      }
      setIsModalOpen(false);

      // Reset
      setNewTitle("");
      setNewDueDate("");
      setNewCourseId("");
      setNewGroup("All");
      setEditingId(null);`
);

content = content.replace(
  /const handleDelete = async \(id\) => \{/,
  `const openEditModal = (a) => {
    setEditingId(a._id);
    setNewTitle(a.title);
    setNewDueDate(a.dueDate ? new Date(a.dueDate).toISOString().split("T")[0] : "");
    setNewCourseId(a.courseId?._id || a.courseId || "");
    setNewGroup(a.group || "All");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {`
);

content = content.replace(
  /<AssignmentRow\n\s*key=\{row\._id \|\| i\}\n\s*row=\{row\}\n\s*onDelete=\{handleDelete\}\n\s*\/>/,
  `<AssignmentRow
                      key={row._id || i}
                      row={row}
                      onDelete={handleDelete}
                      onEdit={openEditModal}
                    />`
);

content = content.replace(
  /title="Create Assignment"/,
  `title={editingId ? "Edit Assignment" : "Create Assignment"}`
);

content = content.replace(
  /onClose=\{\(\) => setIsModalOpen\(false\)\}/,
  `onClose={() => {
          setIsModalOpen(false);
          setNewTitle("");
          setNewDueDate("");
          setNewCourseId("");
          setNewGroup("All");
          setEditingId(null);
        }}`
);

content = content.replace(
  /onClick=\{handleCreate\}/g,
  `onClick={handleSave}`
);

fs.writeFileSync('src/pages/AssignmentsPage.jsx', content);
