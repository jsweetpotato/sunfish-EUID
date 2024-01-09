import { createSecondaryBtn } from './main_button';

const $app = document.querySelector('#container');

const path = [
  '/src/pages/login/',
  '/src/pages/board/',
  '/src/pages/myeuid/',
  '/src/pages/exchange/',
];

const value = ['로그인', '게시판', '마이페이지', '기기거래'];

path.forEach((item, idx) =>
  $app.insertAdjacentElement(
    'beforeend',
    createSecondaryBtn({
      id: 'bye-button',
      value: `${value[idx]} 페이지 바로가기`,
      onClick: () => {
        window.location.href = item;
      },
    })
  )
);
