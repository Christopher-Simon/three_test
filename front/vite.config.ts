import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginCheck from "vite-plugin-checker";
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    react(),
    vitePluginCheck({typescript: true,}),
    eslint()
  ],
})
