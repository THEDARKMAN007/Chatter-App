import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@quilljs': 'quill', // Assuming Quill is installed in 'node_modules/quill'
    },
  },
});

