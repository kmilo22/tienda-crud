import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // URL del backend
  withCredentials: true, // Para enviar cookies/credenciales si se usan
});

// Interceptor para agregar el token automáticamente a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirige al login
    }
    return Promise.reject(error);
  }
);

export default api;
