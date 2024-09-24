import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // To get __dirname-like functionality

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), renameHtml()],
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: './swiper.html',
        loop: './loop.html',
      },
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
      }
    }, 
    // outDir: 'docs', // Set the output directory to docs
  }
})

function renameHtml() {
  return {
    name: 'rename-html',
    writeBundle() {
      const oldPath = path.resolve(__dirname, 'dist/swiper.html');
      const newPath = path.resolve(__dirname, 'dist/index.html');

      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }
    },
  };
}