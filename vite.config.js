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
        myProfile: resolve(__dirname, 'src/pages/myeuid/myProfile.html'),
        editProfile: resolve(__dirname, 'src/pages/myeuid/editProfile.html'),
        // 로그인
        login: resolve(__dirname, 'src/pages/login/index.html'),
        category: resolve(__dirname, 'src/pages/login/category/index.html'),
        oauth: resolve(__dirname, 'src/pages/login/oauth/index.html'),
        signin: resolve(__dirname, 'src/pages/login/signin/index.html'),
        signup: resolve(__dirname, 'src/pages/login/signup/index.html'),
        // 게시판
        board: resolve(__dirname, 'src/pages/board/index.html'),
        together: resolve(__dirname, 'src/pages/board/together.html'),
        writeTogether: resolve(__dirname, 'src/pages/board/writeTogether.html'),
        // 기기거래
        exchange: resolve(__dirname, 'src/pages/exchange/index.html'),
        // 스토리
        story: resolve(__dirname, 'src/pages/main/index.html'),
      },
    },
  },
  // esbuild로 빌드 시 console과 debugger 구문 제거
  esbuild: {
    drop: ['debugger'],
  },
});
