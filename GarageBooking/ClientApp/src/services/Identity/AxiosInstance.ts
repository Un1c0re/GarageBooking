import axios from "axios";

import keycloak from "@/services/Identity/Keycloack";
import { stripTimeZoneInPayload } from "@/utils/dateWithoutTimeZone";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data) {
    config.data = stripTimeZoneInPayload(config.data);
  }
  if (config.params) {
    config.params = stripTimeZoneInPayload(config.params);
  }
  return config;
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
