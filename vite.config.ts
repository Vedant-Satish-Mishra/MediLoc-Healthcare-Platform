import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true, // Automatically open the app in the browser on server start
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  define: {
    'process.env': process.env
  }
})
