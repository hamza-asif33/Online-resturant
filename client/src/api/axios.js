// src/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Automatically add token to every request
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
