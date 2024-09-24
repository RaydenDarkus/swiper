import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/swiper/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        loop: './loop.html',
      }
    }, 
    outDir: 'docs', // Set the output directory to docs
  }
})
