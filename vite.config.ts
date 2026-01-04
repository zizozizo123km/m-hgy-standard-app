import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Optional: Configure server options if needed (e.g., port, proxy)
  server: {
    port: 3000,
    open: true, // Automatically open the browser on server start
  },
  // Optional: Configure build options (e.g., output directory)
  build: {
    outDir: 'dist',
    sourcemap: false, // Recommended for production build speed
  },
  // Optional: Resolve aliases for easier imports (e.g., '@/')
  resolve: {
    alias: {
      // Example: '@': path.resolve(__dirname, './src')
      // Note: If using aliases, you must also configure them in tsconfig.json
    },
  },
});