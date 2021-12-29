import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { injectHtml } from 'vite-plugin-html'
import { loadEnv } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    injectHtml({
      data: {
        title: loadEnv(mode, process.cwd()).VITE_APP_TITLE
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname,'src')
    }
  }
})
