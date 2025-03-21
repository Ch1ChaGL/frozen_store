import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Разрешает доступ извне
    port: 5173, // Указываем порт
    strictPort: true, // Гарантируем, что порт не изменится
    allowedHosts: ['.ngrok-free.app'], // Разрешаем все ngrok-домены
  },
})
