import { createContext, useContext, useState } from "react";

const AssignmentContext = createContext();

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useState([]);

  return (
    <AssignmentContext.Provider value={{ assignments, setAssignments }}>
      {children}
    </AssignmentContext.Provider>
  );
}

export function useAssignments() {
  return useContext(AssignmentContext);
}