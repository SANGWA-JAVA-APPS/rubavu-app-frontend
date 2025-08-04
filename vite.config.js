import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003, // Specify your desired port number here
    proxy: {
      '/api': {
        target: 'http://localhost:8101',
        changeOrigin: true,
        secure: false,
      },
      '/codeguru/api': {
        target: 'http://localhost:8101',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
