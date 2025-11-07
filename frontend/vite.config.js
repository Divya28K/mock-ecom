import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // You can change this if needed
    proxy: {
      "/api": "http://localhost:5000", // connects frontend → backend
    },
  },
});
