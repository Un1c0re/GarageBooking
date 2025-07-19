import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import TheMain from "@/views/TheMain.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: TheMain,
  },
];

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default Router;
