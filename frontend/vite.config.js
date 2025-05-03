import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  esbuild: {
    jsx: 'react', // Specify the JSX transformer for .js and .jsx files
  },
  build: {
    outDir: 'dist', // output inside backend
    
  },
});
