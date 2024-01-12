import { createModal2Btn } from '../../../components/Modal/Modal';
import { createPrimaryBtn, toggleValid } from '../../../components/main_button';
import { getNode, pb } from '../../../lib';

// 돔 엘리먼트
const $form = getNode('form');
const $inputEmail = getNode('#email');
const $inputPW = getNode('#pw');
const $inputPWConfirm = getNode('#pw-confirm');

const $emailBox = getNode('#email-box');
const $pwBox = getNode('#pw-box');
const $pwConfirmBox = getNode('#pw-confirm-box');

const $back = document.querySelector('#back');

// 버튼
const $submitButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '가입하기',
});

// 모달
const [$backModal, $cancelBack, $SubmitBack] = createModal2Btn({
  title: '정말 취소하시겠어요?',
  desc: '시작하기 페이지로 이동하면 작성하신 데이터가 소멸됩니다.',
});

// localStorage
const storage = window.localStorage;

// 상태 관리
const state = {
  email: false,
  pw: false,
  pwConfirm: false,
};

// 버튼 draw
$form.insertAdjacentElement('beforeend', $submitButton);

// 클래스 세팅
const INVALID_CLASS = 'invalid';
const HAS_EMAIL_CLASS = 'hasemail';

// 정규표현식 패턴
const emailPattern = /^[\w-]+@([a-z]+\.)+[\w]{2,4}/g;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
// const pwPattern = /^(?=.*[0-9]).{1,15}$/;

let allUser;
let allUserEmail;

const handleSubmit = async (e) => {
  e.preventDefault();

  if (allUserEmail.includes($inputEmail.value)) {
    toggleValid($submitButton, false);
    state.email = false;
    $emailBox.classList.add(HAS_EMAIL_CLASS);
  } else {
    storage.setItem(
      'users-oauth',
      JSON.stringify({
        email: $inputEmail.value,
        password: $inputPW.value,
        passwordConfirm: $inputPWConfirm.value,
        emailVisibility: true,
      })
    );
    window.location.href = '/src/pages/login/oauth/';
  }
};

const checkState = () => {
  if (state.email && state.pw && state.pwConfirm) {
    toggleValid($submitButton, true);
  } else {
    toggleValid($submitButton, false);
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

const checkEmail = (target, regex, parent) => {
  parent.classList.remove(HAS_EMAIL_CLASS);
  checkInput(target, regex, parent);
  checkState();
};

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

// 이벤트 바인딩
$inputEmail.oninput = ({ target }) =>
  checkEmail(target, emailPattern, $emailBox);
$inputPW.oninput = ({ target }) => checkInput(target, pwPattern, $pwBox);
$submitButton.onclick = handleSubmit;
$inputPWConfirm.oninput = checkConfirm;

$back.onclick = () => $backModal.showing();
$cancelBack.onclick = () => $backModal.closing();
$SubmitBack.onclick = () => {
  storage.clear();
  window.history.replaceState(null, null, '/src/pages/login/');
  window.location.href = '/src/pages/login/';
};

// eslint-disable-next-line prefer-const
allUser = await pb.collection('users').getFullList();
allUserEmail = allUser.map((item) => item.email);
