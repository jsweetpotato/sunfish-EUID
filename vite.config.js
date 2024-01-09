import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'docs',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        category: resolve(__dirname, 'src/pages/login/category.html'),
        oauth: resolve(__dirname, 'src/pages/login/oauth.html'),
      },
    },
  },
  // esbuild로 빌드 시 console과 debugger 구문 제거
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
