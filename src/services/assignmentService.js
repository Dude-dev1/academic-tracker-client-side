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
    const isFormData = assignmentData instanceof FormData;
    const response = await api.post("/assignments", assignmentData, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {}
    });
    return response.data;
  },

  updateAssignment: async (id, assignmentData) => {
    const isFormData = assignmentData instanceof FormData;
    const response = await api.put(`/assignments/${id}`, assignmentData, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {}
    });
  },

  deleteAssignment: async (id) => {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
  }
};

export default assignmentService;
