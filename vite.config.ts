import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://nachiket-mr360.github.io/project-selling/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
