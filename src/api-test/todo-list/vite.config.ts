import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  mode: 'development',
  plugins: [
    vue(),
  ],
  test: {
    globals: true,
    setupFiles: [
      'vitest.setup.ts'
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
