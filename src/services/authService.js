import api from "./api";

// Register user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Get current user
export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Update user profile
export const updateProfile = async (userData) => {
  const response = await api.put("/auth/profile", userData);
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};
