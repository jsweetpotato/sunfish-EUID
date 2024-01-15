/* eslint-disable import/prefer-default-export, import/no-unresolved , import/extensions, import/no-absolute-path */

import { pb } from '/src/lib/';
import { createModal1Btn } from '/src/components/Modal/Modal.js';

export function checkAuth() {
  const [modal, button] = createModal1Btn({
    title: '🚫 로그인이 필요한 페이지입니다.',
    desc: '로그인 페이지로 이동합니다.',
  });
  button.addEventListener('click', () => {
    window.location.href = '/';
  });
  const isAuth = localStorage.getItem('pocketbase_auth');
  if (!isAuth) {
    modal.showing();
  }
  return isAuth;
}
