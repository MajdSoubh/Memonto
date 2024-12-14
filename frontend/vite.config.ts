import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: { host: "0.0.0.0", port: 5173 },
  plugins: [react()],
  resolve: {
    alias: {
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@styles": path.resolve(__dirname, "./src/assets/styles"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
