import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'docs',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // 마이페이지
        myEuid: resolve(__dirname, 'src/pages/myeuid/index.html'),
        myProfile: resolve(__dirname, 'src/pages/myeuid/MyProfile.html'),
        editProfile: resolve(__dirname, 'src/pages/myeuid/EditProfile.html'),
      },
    },
  },
  // esbuild로 빌드 시 console과 debugger 구문 제거
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
