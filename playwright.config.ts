import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: [
    "docs/features/**/tests/**/*.spec.ts",
  ],
  timeout: 60000,
  outputDir: "docs/features/.playwright-output",
  use: {
    baseURL: "http://localhost:5178",
    headless: true,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
