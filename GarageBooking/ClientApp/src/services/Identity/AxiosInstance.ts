import axios from "axios";

import keycloak from "@/services/Identity/Keycloack";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (keycloak && keycloak.authenticated) {
    try {
      await keycloak.updateToken(30);
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    } catch (err) {
      console.error("Не удалось обновить токен", err);
      keycloak.logout();
    }
  }

  return config;
});

export default axiosInstance;
