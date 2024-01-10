import PocketBase from 'pocketbase';
import { createPrimaryBtn, toggleValid } from '../../../components/main_button';
import { getNode } from '../../../lib/dom/getNode';

const INVALID_CLASS = 'invalid';

const $form = getNode('form');
const $inputEmail = getNode('#email');
const $inputPW = getNode('#pw');
const $inputPWConfirm = getNode('#pw-confirm');

const $emailBox = getNode('#email-box');
const $pwBox = getNode('#pw-box');
const $pwConfirmBox = getNode('#pw-confirm-box');

const state = {
  email: false,
  pw: false,
  pwConfirm: false,
};

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const emailPattern = /^[\w-]+@([a-z]+\.)+[\w]{2,4}/g;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
// const pwPattern = /^(?=[a-z]).{8,15}$/;

const $submitButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '가입 시작하기',
  // eslint-disable-next-line no-use-before-define
  onClick: handleSubmit,
});

async function handleSubmit(e) {
  e.preventDefault();
  // const data = pb
  //   .collection('users')
  //   .authWithPassword($inputEmail.value, $inputPW.value);
  console.table(state);
}

const checkState = () => {
  if (state.email && state.pw && state.pwConfirm) {
    console.table(state);
    toggleValid($submitButton, true);
  } else {
    toggleValid($submitButton, false);
    console.table(state);
  }
};

const checkInput = (target, regex, parent) => {
  // console.log(`state.${[target.id]}: ${state[target.id]}`);
  if (target.value === '') {
    parent.classList.remove(INVALID_CLASS);
    return;
  }

  if (!target.value.match(regex)) {
    parent.classList.add(INVALID_CLASS);
    state[target.id] = false;
  } else {
    parent.classList.remove(INVALID_CLASS);
    state[target.id] = true;
  }
  checkState();
};

// 비밀번호 confirm 오류 해결!!

const checkConfirm = ({ target }) => {
  if (target.value === '') {
    $pwConfirmBox.classList.remove(INVALID_CLASS);
    return;
  }

  if (!(target.value === $inputPW.value)) {
    $pwConfirmBox.classList.add(INVALID_CLASS);
    state.pwConfirm = false;
  } else {
    $pwConfirmBox.classList.remove(INVALID_CLASS);
    state.pwConfirm = true;
  }
  checkState();
};

$inputEmail.addEventListener('input', ({ target }) =>
  checkInput(target, emailPattern, $emailBox)
);
$inputPW.addEventListener('input', ({ target }) =>
  checkInput(target, pwPattern, $pwBox)
);
$inputPWConfirm.addEventListener('input', checkConfirm);

$form.insertAdjacentElement('beforeend', $submitButton);
