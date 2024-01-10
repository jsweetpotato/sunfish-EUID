import { createPrimaryBtn } from '../../../components/main_button';
import { getNode } from '../../../lib/dom/getNode';

const $main = getNode('main');
const $form = getNode('form');

const storage = window.localStorage;

const emailPattern = /^[\w-]+@([a-z]+\.)+[\w]{2,4}/g;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const $formButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '인증문자 받기',
});

const template = /* html */ `
  <p p class="mt-3 text-paragraph-sm text-center">
    휴대폰 번호가 변경되었나요?
    <a class="underline underline-offset-2" href="#">이메일로 계정찾기</a>
  </p>`;

const init = () => {
  $form.insertAdjacentElement('beforeend', $formButton);
  if (storage.getItem('type') === 'join') return;
  $main.insertAdjacentHTML('beforeend', template);
};

init();
