import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/order': {
        target: 'http://localhost:8080', // Backend API base URL'ini buraya yazın
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: 'http://localhost:8080', // Backend API base URL'ini buraya yazın  
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
