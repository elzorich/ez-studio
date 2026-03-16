import { defineConfig } from "vite";

const port = process.env.PORT ? Number(process.env.PORT) : 5173;
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
