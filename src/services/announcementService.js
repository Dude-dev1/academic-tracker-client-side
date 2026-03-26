import api from "./api";

const announcementService = {
  getAnnouncements: async () => {
    const response = await api.get("/announcements");
    return response.data.data;
  },

  createAnnouncement: async (data) => {
    const response = await api.post("/announcements", data);
    return response.data.data;
  },

  deleteAnnouncement: async (id) => {
    const response = await api.delete(`/announcements/${id}`);
    return response.data.data || response.data;
  }
};

export default announcementService;
