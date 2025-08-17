import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8081",
  realm: "Garage-net",
  clientId: "garage-net",
});

export default keycloak;
