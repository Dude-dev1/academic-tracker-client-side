import api from "./api";

const getEvents = async () => {
  const response = await api.get("/calendar-events");
  return response.data.data;
};

const createEvent = async (eventData) => {
  const response = await api.post("/calendar-events", eventData);
  return response.data.data;
};

const updateEvent = async (id, eventData) => {
  const response = await api.put(`/calendar-events/${id}`, eventData);
  return response.data.data;
};

const deleteEvent = async (id) => {
  const response = await api.delete(`/calendar-events/${id}`);
  return response.data;
};

export const calendarEventService = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
