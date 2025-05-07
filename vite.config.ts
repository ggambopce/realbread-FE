import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
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
      types: path.resolve(__dirname, 'src/types'), // <- 이 줄 중요
    }
  }
})
