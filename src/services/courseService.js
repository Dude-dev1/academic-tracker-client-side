import axios from "axios";

// Using env variable or fallback like in index.js backend
const API_URL = "http://localhost:5000/api/courses";

// You might need to adjust auth headers based on your app's standard way (e.g. interceptors or localstorage)
const getAuthConfig = () => {
  const token = localStorage.getItem("token"); // Adust this according to how your app stores tokens
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCourses = async () => {
  const response = await axios.get(API_URL, getAuthConfig());
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await axios.post(API_URL, courseData, getAuthConfig());
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    courseData,
    getAuthConfig()
  );
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};
