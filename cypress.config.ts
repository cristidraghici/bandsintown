import { defineConfig } from "cypress";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:5173",
    screenshotOnRunFailure: true,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
  },
});
