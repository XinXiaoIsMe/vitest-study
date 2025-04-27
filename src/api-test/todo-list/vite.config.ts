import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path'

export default defineConfig({
  mode: 'development',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
