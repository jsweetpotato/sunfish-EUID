import {
  createPrimaryBtn,
  createSecondaryBtn,
  toggleValid,
} from '../../../components/main_button';
import { setStorage } from '../../../lib/utils/storage';

// 돔 엘리먼트
const $form = document.querySelector('#oauth-form');
const $btnWrapper = document.querySelector('.button-wrapper');
const $phoneInput = document.querySelector('#phone');

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

// 상태 관리
const state = {
  isDrawed: false,
};

// 버튼 draw
$btnWrapper.insertAdjacentElement('beforeend', $sendButton);

// 클래스 세팅
const INVALID_CLASS = 'invalid';

// 정규표현식 패턴
const phonePattern = /^[010]+[0-9]{8}$/g;
const OauthPattern = /^[0-9]{4,6}$/g;

const drawTemplate = () => {
  const template = /* html */ `
  <div class="relative">
    <label for="contentName" class="sr-only">컨텐츠 이름</label>
    <input
      id="phone"
      type="text"
      inputmode="tel"
      pattern="[0-9]{4}"
      maxlength="6"
      class="group-[.invalid]:border-red-500 p-2 rounded border w-full border-contents-content-tertiary text-contents-content-primary"
      placeholder="인증번호를 입력하세요"
    />
  </div>
  <div class="button-wrapper"></div>
  `;
  $form.insertAdjacentHTML('beforeend', template);
  const $btnWrapper2 = $form.querySelector('.button-wrapper:last-child');
  toggleValid($summitButton, true);
  $btnWrapper2.appendChild($summitButton);
};

const handleSendButton = () => {
  let timer;

  const sendOauthNum = () => {
    const array = new Uint16Array(1);
    setTimeout(() => {
      const oauthNum = crypto.getRandomValues(array).join('');
      setStorage('oauth', `${oauthNum}`);
      console.log(oauthNum);
      // eslint-disable-next-line no-alert
      // alert('인증번호가 발송되었습니다. 콘솔창을 확인해주세요.');
    }, 2000);
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

const checkNumber = (e) => {
  if (e.key >= 0 && e.key <= 9) return true;
  return false;
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
$phoneInput.onkeypress = checkNumber;
$phoneInput.oninput = handlePhoneInput();
