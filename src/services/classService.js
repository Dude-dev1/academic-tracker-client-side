import api from "./api";

export const getClasses = async () => {
  const response = await api.get('/classes');
  return response.data;
};

export const createClass = async (classData) => {
  const response = await api.post('/classes', classData);
  return response.data;
};

export const joinClassByCode = async (code) => {
  const response = await api.post('/classes/join', { code });
  return response.data;
};

export const addMember = async (classId, email) => {
  const response = await api.post(`/classes/${classId}/members`, { email });
  return response.data;
};

export const removeMember = async (classId, userId) => {
  const response = await api.delete(`/classes/${classId}/members/${userId}`);
  return response.data;
};
