import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    proxy :{
      "/documents" : "http://localhost:5100/"
    }
  },
  plugins: [react()],
})
