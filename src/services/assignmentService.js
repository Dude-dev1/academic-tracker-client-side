import api from "./api";

const assignmentService = {
  getAssignments: async () => {
    const response = await api.get("/assignments");
    return response.data;
  },

  getAssignmentById: async (id) => {
    const response = await api.get(`/assignments/${id}`);
    return response.data;
  },

  createAssignment: async (assignmentData) => {
    const response = await api.post("/assignments", assignmentData);
    return response.data;
  },

  updateAssignment: async (id, assignmentData) => {
    const response = await api.put(`/assignments/${id}`, assignmentData);
    return response.data;
  },

  deleteAssignment: async (id) => {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
  }
};

export default assignmentService;
