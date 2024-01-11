import { createPrimaryBtn, toggleValid } from '../../../components/main_button';
import { getNode, pb } from '../../../lib';

const INVALID_CLASS = 'invalid';
const $form = getNode('form');

const state = {
  email: false,
  pw: false,
};
const $submitButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '가입 시작하기',
  // eslint-disable-next-line no-use-before-define
  onClick: handleSubmit,
});

const $inputEmail = getNode('#email');
const $inputPW = getNode('#pw');

const $emailBox = getNode('#email-box');
const $pwBox = getNode('#pw-box');

const emailPattern = /^[\w-]+@([a-z]+\.)+[\w]{2,4}/g;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

async function handleSubmit(e) {
  e.preventDefault();
  await pb
    .collection('users')
    .authWithPassword($inputEmail.value, $inputPW.value);
  alert('로그인 완료');
}

const checkInput = (target, regex, parent) => {
  if (target.value === '') {
    parent.classList.remove(INVALID_CLASS);
    return;
  }

  if (!target.value.match(regex)) {
    state[target.id] = false;
    parent.classList.add(INVALID_CLASS);
    return;
  }

  parent.classList.remove(INVALID_CLASS);
  state[target.id] = true;
  if (state.email && state.pw) toggleValid($submitButton, true);
};

$inputEmail.addEventListener('input', ({ target }) =>
  checkInput(target, emailPattern, $emailBox)
);
$inputPW.addEventListener('input', ({ target }) =>
  checkInput(target, pwPattern, $pwBox)
);

$form.insertAdjacentElement('beforeend', $submitButton);
