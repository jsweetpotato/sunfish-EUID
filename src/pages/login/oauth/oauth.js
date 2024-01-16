import {
  createModal1Btn,
  createModal2Btn,
} from '../../../components/Modal/Modal';
import { createPrimaryBtn, toggleValid } from '../../../components/main_button';
import { getNode, pb } from '../../../lib';

// 돔 엘리먼트
const $form = document.querySelector('#oauth-form');
const $btnWrapper = document.querySelector('.button-wrapper');
const $phoneInput = document.querySelector('#phone');
const $back = document.querySelector('#back');
let $oauthInput;

// 버튼
const $sendButton = createPrimaryBtn({
  id: 'send-button',
  type: 'submit',
  value: '인증문자 받기',
});
const $summitButton = createPrimaryBtn({
  id: 'send-button',
  type: 'submit',
  value: '인증확인',
});

// 모달
const [$backModal, $cancelBack, $SubmitBack] = createModal2Btn({
  title: '정말 취소하시겠어요?',
  desc: '시작하기 페이지로 이동하면 작성하신 데이터가 소멸됩니다.',
});
const [$numModal, $numModalBtn] = createModal1Btn({
  title: '😁인증번호를 확인해주세요!',
  desc: '',
  buttonText: '확인',
});
const [$rejectOauth, $rejectOauthButton] = createModal1Btn({
  title: '😥인증번호가 일치하지 않아요!',
  desc: '인증번호를 확인해주세요!<br>(기억안나면 재발송 누르셈)',
  buttonText: '확인',
});
// localStorage
const storage = window.localStorage;

// 상태 관리
const state = {
  isDrawed: false,
  oauthNum: null,
};

$numModalBtn.addEventListener('click', $numModal.closing);
$rejectOauthButton.addEventListener('click', $rejectOauth.closing);
// 버튼 draw
$btnWrapper.insertAdjacentElement('beforeend', $sendButton);

// 클래스 세팅
const INVALID_CLASS = 'invalid';

// 정규표현식 패턴
const phonePattern = /^[010]+[0-9]{8}$/g;

const checkNumber = (e) => {
  if (e.key >= 0 && e.key <= 9) return true;
  return false;
};
const handleOauthInput = () => {
  let isValid = false;
  return (e) => {
    if (e.currentTarget.value.length > 3) {
      isValid = true;
      toggleValid($summitButton, isValid);
    } else {
      if (!isValid) return;
      isValid = false;
      toggleValid($summitButton, isValid);
    }
  };
};

const drawTemplate = () => {
  const template = /* html */ `
  <div class="relative">
    <label for="contentName" class="sr-only">컨텐츠 이름</label>
    <input
      id="oauth"
      type="text"
      inputmode="tel"
      pattern="[0-9]{4,5}"
      maxlength="6"
      required
      class="group-[.invalid]:border-red-500 p-2 rounded border w-full border-contents-content-tertiary text-contents-content-primary"
      placeholder="인증번호를 입력하세요"
    />
  </div>
  <div class="button-wrapper"></div>
  `;
  $form.insertAdjacentHTML('beforeend', template);
  const $btnWrapper2 = $form.querySelector('.button-wrapper:last-child');
  $btnWrapper2.appendChild($summitButton);
  $oauthInput = getNode('#oauth');
  $oauthInput.onkeypress = checkNumber;
  $oauthInput.oninput = handleOauthInput();
};

const handleSubmitButton = async (e) => {
  e.preventDefault();
  if (state.oauthNum === $oauthInput.value) {
    const data = JSON.parse(storage.getItem('users-oauth'));
    data.categorys = JSON.parse(storage.getItem('categorys'));
    storage.removeItem('categorys');
    data.phone = $phoneInput.value;
    storage.setItem('users-oauth', JSON.stringify(data));
    window.history.replaceState(null, null, '/');
    window.location.href = '/src/pages/myeuid/editProfile.html';
  } else $rejectOauth.showing();
};

const handleSendButton = () => {
  let timer;

  const sendOauthNum = () => {
    const array = new Uint16Array(1);
    state.oauthNum = null;
    setTimeout(() => {
      const oauthNum = crypto.getRandomValues(array).join('');
      state.oauthNum = oauthNum;
      $numModal.querySelector('span').innerText = oauthNum;
      $numModal.showing();
    }, 1000);
  };

  const classChange = (target) => {
    target.classList.replace('bg-secondary', 'bg-gray-100');
    target.classList.replace('text-white', 'text-bluegray-800');
  };

  const setTimer = (target) => {
    const time = Date.now() + 2010 * 60;

    sendOauthNum();
    classChange(target);

    return setInterval(() => {
      const now = Date.now();

      const currentTime = time - now;
      const minutes = Math.floor(
        (currentTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

      // eslint-disable-next-line no-param-reassign
      target.textContent = `인증문자 받기(${minutes}분 ${seconds}초)`;

      if (currentTime < 0) clearInterval(timer);
    }, 1000);
  };

  return (e) => {
    e.preventDefault();
    if (!$phoneInput.value.match(phonePattern)) {
      $form.classList.add(INVALID_CLASS);
      return;
    }

    if (!state.isDrawed) {
      drawTemplate();
      state.isDrawed = true;
    }

    $form.classList.remove(INVALID_CLASS);
    $form.classList.add('send');

    $phoneInput.disabled = true;

    if (timer) clearInterval(timer);
    timer = setTimer($sendButton);
  };
};

const handlePhoneInput = () => {
  let isValid = false;
  return (e) => {
    if (e.currentTarget.value.length === 11) {
      isValid = true;
      toggleValid($sendButton, isValid);
    } else {
      if (!isValid) return;
      isValid = false;
      toggleValid($sendButton, isValid);
    }
  };
};

$sendButton.onclick = handleSendButton();
$summitButton.onclick = handleSubmitButton;
$phoneInput.onkeypress = checkNumber;
$phoneInput.oninput = handlePhoneInput();

$back.onclick = () => $backModal.showing();
$cancelBack.onclick = () => $backModal.closing();
$SubmitBack.onclick = () => {
  storage.clear();
  window.history.replaceState(null, null, '/');
  window.location.href = '/';
};
// 포켓베이스 가져오기
