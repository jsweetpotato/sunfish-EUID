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
        myEuid: resolve(__dirname, 'src/pages/myEuid/index.html'),
        myProfile: resolve(__dirname, 'src/pages/myEuid/MyProfile.html'),
        editProfile: resolve(__dirname, 'src/pages/myEuid/EditProfile.html'),
        // 로그인
        login: resolve(__dirname, 'src/pages/login/index.html'),
        category: resolve(__dirname, 'src/pages/login/category.html'),
        oauth: resolve(__dirname, 'src/pages/login/oauth.html'),
        // 게시판
        board: resolve(__dirname, 'src/pages/board/index.html'),
        together: resolve(__dirname, 'src/pages/board/together.html'),
        writeTogether: resolve(__dirname, 'src/pages/board/writeTogether.html'),
        // 기기거래
        exchange: resolve(__dirname, 'src/pages/exchange/index.html'),
      },
    },
  },
  // esbuild로 빌드 시 console과 debugger 구문 제거
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
