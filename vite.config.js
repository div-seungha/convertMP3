import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [remix(), vanillaExtractPlugin(), sentryVitePlugin({
    org: "seungha-kim",
    project: "javascript-remix"
  })],

  build: {
    sourcemap: true
  }
});