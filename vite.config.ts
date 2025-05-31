import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/realbread/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      views: path.resolve(__dirname, 'src/views'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      'app-constants': path.resolve(__dirname, 'src/app-constants'),
      assets: path.resolve(__dirname, 'src/assets'),
      mocks: path.resolve(__dirname, 'src/mocks'),
      stores: path.resolve(__dirname, 'src/stores'),
      types: path.resolve(__dirname, 'src/types'),
      apis: path.resolve(__dirname, 'src/apis'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    }
  },
  server: {
    proxy: {
      '/realbread/api': {
        target: 'http://realbread-backend:8081', // Spring Boot 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/realbread\/api/, '/api')
      }
    }
  }
})
