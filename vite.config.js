import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Core': path.resolve(__dirname, './src/Core'),
      '@Application': path.resolve(__dirname, './src/Application'),
      '@Presentation': path.resolve(__dirname, './src/Presentation'),
      '@Infrastructure': path.resolve(__dirname, './src/Infrastructure'),
      '@Shared': path.resolve(__dirname, './src/Shared'),
    },
  },
})
