import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// 1. Tailwind CSS 플러그인 임포트
//import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      // 2. 플러그인 배열에 추가
      //tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BACKEND || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
