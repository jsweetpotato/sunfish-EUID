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

const test = async () => {
  const isEmail = await pb
    .collection('user')
    .collectionIdOrName('test@gmail.com');
  console.log(isEmail);
};
test();
const emailPattern = /^[\w-]+@([a-z]+\.)+[\w]{2,4}/g;
// const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const pwPattern = /^(?=[0-9]).{8,15}$/;

const $submitButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '가입 시작하기',
  // eslint-disable-next-line no-use-before-define
  onClick: handleSubmit,
});

async function handleSubmit(e) {
  e.preventDefault();
  const isEmail = await pb.collection('user').getOne($inputEmail.value);
  console.log(isEmail);
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

  if (state.email && state.pw && state.pwConfirm)
    toggleValid($submitButton, true);
};

const checkConfirm = ({ target }) => {
  if (target.value === '') {
    $pwConfirmBox.classList.remove(INVALID_CLASS);
    return;
  }

  if (!(target.value === $inputPW.value)) {
    state.pwConfirm = false;
    $pwConfirmBox.classList.add(INVALID_CLASS);
    return;
  }

  state.pwConfirm = true;
  $pwConfirmBox.classList.remove(INVALID_CLASS);

  if (state.email && state.pw && state.pwConfirm)
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
