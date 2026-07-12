import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // Si el modo es 'production' usa la base, si es desarrollo usa '/'
    base: mode === 'production' ? '/1000-sabores-eva3/' : '/',
  }
})