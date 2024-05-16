/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

const server =
  process.env.NODE_ENV === "docker"
    ? {
        host: true,
        port: 3001,
        watch: {
          usePolling: true,
        },
      }
    : {};

export const config = {
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server,
};

// https://vitejs.dev/config/
export default defineConfig(config);
