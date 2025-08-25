import axios from "axios";

import keycloak from "@/services/Identity/Keycloack";

const getCurrentUser = async () => {
  if (!keycloak.token) return null;
  const response = await axios.get("/api/Account/me", {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });
  return response.data;
};

export default {
  getCurrentUser,
};
