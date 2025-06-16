import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: './',
  server: {
    port: 9898,
  },
  plugins: [react(), tsconfigPaths()],
})
