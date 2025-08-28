import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "",
  build: {
    outDir: "MD_Landing/dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@view": path.resolve(__dirname, "./src/view"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@viewModels": path.resolve(__dirname, "./src/viewModels"),
    },
  },
  server: {
    allowedHosts: [
      '.ngrok-free.app' // cho phép tất cả subdomain ngrok
    ],
    host: true,   // cho phép truy cập từ LAN / ngrok
    port: 5173
  }
});
