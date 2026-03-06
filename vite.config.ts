import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 1. Tailwind CSS 플러그인 임포트
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. 플러그인 배열에 추가
    tailwindcss(),
  ],
})
