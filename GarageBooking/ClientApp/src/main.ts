import "./style.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import axios from "axios";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import ElementPlus from "element-plus";
import ru from "element-plus/es/locale/lang/ru";
import { createPinia } from "pinia";
import { storePlugin } from "pinia-plugin-store";
import { createApp } from "vue";

import keycloak from "@/keycloack";

import App from "./App.vue";
import router from "./router";

dayjs.extend(updateLocale);

dayjs.updateLocale("ru", {
  formats: {
    L: "DD.MM.YYYY",
  },
});

const plugin = storePlugin({
  stores: ["EventStore"],
  storage: localStorage,
});

const pinia = createPinia();

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

pinia.use(plugin);
app.use(pinia);
app.use(router);
app.use(ElementPlus, {
  locale: ru,
});

keycloak.init({ onLoad: "login-required" }).then(async (authenticated) => {
  if (!authenticated) {
    keycloak.login();
  } else {
    const response = await axios.get("/api/Account/me", {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    });
    console.log("User in DB:", response.data);

    setInterval(() => {
      keycloak.updateToken(70).catch(() => {
        keycloak.login();
      });
    }, 60000);

    app.provide("keycloak", keycloak);

    app.mount("#app");
  }
});
