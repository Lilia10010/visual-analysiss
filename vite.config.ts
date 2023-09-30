/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: false,
    deps: {
      inline: ["./src/test/setup.ts"],
    },
    setupFiles: ["./src/test/setup.ts"],
    reporters: "dot",
  },
});
