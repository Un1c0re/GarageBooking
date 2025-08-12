import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("@/views/TheEventCalendarView.vue"),
  },
  {
    path: "/requests",
    name: "Requests",
    component: () => import("@/views/TheCabinetRequest.vue"),
  },
  {
    path: "/",
    redirect: "/calendar",
  },
];

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default Router;
