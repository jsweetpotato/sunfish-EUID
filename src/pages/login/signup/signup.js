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

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_API);

const emailPattern = /^[\w-]+@([a-z]+\.)+[\w]{2,4}/g;
// const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const pwPattern = /^(?=[a-z]).{8,15}$/;

const $submitButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '가입 시작하기',
  // eslint-disable-next-line no-use-before-define
  onClick: handleSubmit,
});

async function handleSubmit(e) {
  e.preventDefault();
  const resultList = await pb
    .collection('users')
    .authWithPassword($inputEmail.value, $inputPW.value);
  console.log(resultList);
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

  if (
    state.email &&
    state.pw &&
    state.pwConfirm &&
    $inputPW.value === $inputPWConfirm.value
  )
    toggleValid($submitButton, true);
};

// 비밀번호 confirm 오류 해결!!

const checkConfirm = ({ target }) => {
  if (!(target.value === $inputPW.value)) {
    state.pwConfirm = false;
    if (target.value === '') {
      $pwConfirmBox.classList.remove(INVALID_CLASS);
      return;
    }
    $pwConfirmBox.classList.add(INVALID_CLASS);
    return;
  }

  state.pwConfirm = true;
  $pwConfirmBox.classList.remove(INVALID_CLASS);

  if (
    state.email &&
    state.pw &&
    state.pwConfirm &&
    $inputPW.value === $inputPWConfirm.value
  )
    toggleValid($submitButton, true);
};

$inputEmail.addEventListener('input', ({ target }) =>
  checkInput(target, emailPattern, $emailBox)
);
$inputPW.addEventListener('input', ({ target }) =>
  checkInput(target, pwPattern, $pwBox)
);
$inputPWConfirm.addEventListener('input', checkConfirm);

$form.insertAdjacentElement('beforeend', $submitButton);
