import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      pfx: fs.readFileSync('./localhost.p12'),
      passphrase: 'changeit',
    },
    port: 3000,
    origin: 'https://localhost:3000',
  },
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
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ["Tests/**/*.test.{jsx,js,tsx,ts}"],
  },  
})
