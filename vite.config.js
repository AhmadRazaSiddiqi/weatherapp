import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/weatherapp/",
  define: {
    // This ensures the environment variable is properly inserted
    // without any additional quotes
    'import.meta.env.VITE_WEATHER_API': JSON.stringify(
      process.env.VITE_WEATHER_API?.replace(/^["'](.*)["']$/, '$1')
    ),
    // If you're using the capitalized version in your code
    'import.meta.env.VITE_Weather_Api': JSON.stringify(
      process.env.VITE_WEATHER_API?.replace(/^["'](.*)["']$/, '$1')
    )
  }
})
