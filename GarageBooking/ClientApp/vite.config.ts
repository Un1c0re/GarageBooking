import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/daily-routine-sched/" : "/",
  build: {
    target: "esnext",
  },
  plugins: [vue(), VueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5096",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
