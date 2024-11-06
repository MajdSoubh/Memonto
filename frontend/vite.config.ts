import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "./src/assets/styles"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@Components": path.resolve(__dirname, "./src/components"),
    },
  },
});
