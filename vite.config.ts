import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Mantém React/runtime num chunk estável (melhor cache entre deploys).
        // Regex precisa para NÃO arrastar @calcom/embed-react (lazy) para cá.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler|wouter)\//.test(id)) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
