import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true, // Exit if port is already in use
    host: true, // Listen on all addresses, including LAN and public addresses.
    open: true, // Open browser on server start
    proxy: {
      // Proxy API requests to a different server
      '/api': {
        target: 'http://localhost:8080', // Your backend server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    cors: true, // Enable CORS
  },
});
