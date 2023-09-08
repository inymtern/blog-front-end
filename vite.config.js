import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prismjs from 'vite-plugin-prismjs'
import { env } from './src/assets/js/env'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    proxy: {
      "/blog": {
        target: env.gateway
      },
      "/obs": {
        target: env.gateway
      }
    }
  },
  plugins: [
    vue(),
    prismjs({
      languages: ['json', 'java', 'python', 'js', 'go']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
