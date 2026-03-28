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

export const regenerateCode = async (classId) => {
  const response = await api.put(`/classes/${classId}/regenerate`);
  return response.data;
};

export const archiveClass = async (classId) => {
  const response = await api.put(`/classes/${classId}/archive`);
  return response.data;
};

export const deleteClass = async (classId) => {
  const response = await api.delete(`/classes/${classId}`);
  return response.data;
};
