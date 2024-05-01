import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:5173",
    screenshotOnRunFailure: true,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
