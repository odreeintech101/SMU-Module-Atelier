import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: change `base` to match your GitHub repo name.
// e.g. if your repo is github.com/yourname/smu-module-atelier,
// keep base: '/smu-module-atelier/'. If you use a custom domain
// or deploy at the root, set base: '/'.
export default defineConfig({
  plugins: [react()],
  base: '/smu-module-atelier/',
})
