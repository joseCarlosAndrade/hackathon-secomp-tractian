import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/generate': {
        target: 'http://192.168.1.123:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/generate/, ''),
      },
    },
  },
})
