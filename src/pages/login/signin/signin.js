import { createModal1Btn } from '../../../components/Modal/Modal';
import { createPrimaryBtn, toggleValid } from '../../../components/main_button';
import { getNode, pb } from '../../../lib';

// 돔 엘리먼트
const $form = getNode('form');
const $inputEmail = getNode('#email');
const $inputPW = getNode('#pw');

const $emailBox = getNode('#email-box');
const $pwBox = getNode('#pw-box');

const $loginToEmail = getNode('#login-to-email');

// 버튼
const $submitButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '로그인',
});

// 모달
const [$modal, $modalButton] = createModal1Btn({
  title: '😭서비스 준비중입니다.',
  desc: '열심히 준비중이예요💦<br> 조금만 기다려주세요',
  buttonText: '알겠어요',
});

// 상태 관리
const state = {
  email: false,
  pw: false,
};

// 버튼 draw
$form.insertAdjacentElement('beforeend', $submitButton);

// 클래스 세팅
const INVALID_CLASS = 'invalid';

// 정규표현식 패턴
const emailPattern = /^[\w-]+@([a-z]+\.)+[\w]{2,4}/g;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await pb
      .collection('users')
      .authWithPassword($inputEmail.value, $inputPW.value);
    window.history.replaceState(null, null, '/src/pages/login/');
    window.location.href = '/src/pages/myeuid/';
  } catch (err) {
    toggleValid($submitButton, false);
    $emailBox.classList.add(INVALID_CLASS);
  }
};

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

// 이벤트 바인딩
$inputEmail.oninput = ({ target }) =>
  checkInput(target, emailPattern, $emailBox);
$inputPW.oninput = ({ target }) => checkInput(target, pwPattern, $pwBox);
$submitButton.onclick = handleSubmit;

$loginToEmail.onclick = () => $modal.showing();
$modalButton.onclick = () => $modal.closing();
