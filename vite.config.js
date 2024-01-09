import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'docs',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        myeuid: resolve(__dirname, 'src/pages/myEuid/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        board: resolve(__dirname, 'src/pages/board/index.html'),
        exchange: resolve(__dirname, 'src/pages/exchange/index.html'),
      },
    },
  },
  // esbuild로 빌드 시 console과 debugger 구문 제거
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
