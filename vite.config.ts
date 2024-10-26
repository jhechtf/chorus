import { defineConfig } from "vite";

// import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [svelte()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  resolve: {
    alias: {
      '$lib': resolve(__dirname, 'src/lib'),
      '$src': resolve(__dirname, 'src'),
    }
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
}));
