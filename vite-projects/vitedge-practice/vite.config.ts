import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitedgePlugin from 'vitedge/plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitedgePlugin(), react()]
})
