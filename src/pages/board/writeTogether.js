/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path, no-param-reassign */

import gsap from 'gsap';
import { pb, getNode, getNodes } from '/src/lib/';

const inputRadioNameArray = [
  ['category'],
  null,
  ['gender', 'age', 'maxMember'],
];

const formObj = {
  type: 'together',
  isOpen: true,
  category: '프로젝트',
  title: '',
  description: '',
  date: new Date().toISOString(),
  gender: '누구나',
  isApproval: false,
  maxMember: '제한없음',
  age: '모든 연령',
  members: [pb.authStore.model.id],
  user: pb.authStore.model.id,
};

const validConfig = {
  title: {
    min: 0,
    max: 24,
    isValid: false,
  },
  description: {
    min: 0,
    max: 500,
    isValid: false,
  },
};

(function inputInit() {
  const inputs = getNodes('.input');
  const form = getNode('.form');
  form.addEventListener('submit', (e) => e.preventDefault());
  inputs.forEach((input) => {
    if (input.id === 'date') {
      const isoTime = new Date().toISOString();
      const localeTime = new Date(isoTime).getTime() + 32400000;
      input.value = new Date(localeTime).toISOString().slice(0, 10);
    } else {
      const { min, max } = validConfig[input.id];
      const letterCount =
        input.nextElementSibling.querySelector('.letter-count');
      const errorMsg = input.nextElementSibling.querySelector('.error-msg');
      letterCount.textContent = `0/${max}`;
      errorMsg.textContent = `글자 수는 ${
        min + 1
      }자 이상 ${max}자 이하로 작성해주세요.`;
    }
  });
})();

const approveCheckBox = getNode('#approve');
function handleToggleCheckBox({ currentTarget }) {
  const label = currentTarget.nextElementSibling;
  if (currentTarget.checked) {
    label.classList.replace('bg-contents-content-tertiary', 'bg-secondary');
    gsap.to('#approveHandle', {
      marginLeft: 'auto',
      duration: 0.2,
    });
    formObj.isApproval = true;
  } else {
    label.classList.replace('bg-secondary', 'bg-contents-content-tertiary');
    gsap.to('#approveHandle', {
      marginLeft: 0,
      duration: 0.2,
    });
    formObj.isApproval = false;
  }
}
approveCheckBox.addEventListener('change', handleToggleCheckBox);

let step = 1;
const stepButton = getNodes('button[id^="step"]');

const inputs = getNodes('.input[type="text"], textarea');
function inputValidation(node) {
  const MIN = validConfig[node.id].min;
  const MAX = validConfig[node.id].max;
  const letterCount = node.value.replace(/\s*/g, '').length;
  const result = letterCount > MIN && letterCount <= MAX;
  validConfig[node.id].isValid = result;
  return result;
}
function toggleValidStyle(target) {
  const { isValid } = validConfig[target.id];
  const errorMsg = target.nextElementSibling.querySelector('.error-msg');
  const letterCount = target.nextElementSibling.querySelector('.letter-count');

  if (isValid) {
    target.classList.replace(
      'border-red-500',
      'border-contents-content-tertiary'
    );
    errorMsg.classList.replace('opacity-100', 'opacity-0');
    letterCount.classList.replace(
      'text-red-500',
      'text-contents-content-tertiary'
    );
  } else {
    target.classList.replace(
      'border-contents-content-tertiary',
      'border-red-500'
    );
    errorMsg.classList.replace('opacity-0', 'opacity-100');
    letterCount.classList.replace(
      'text-contents-content-tertiary',
      'text-red-500'
    );
  }
}
function letterCount(target) {
  const { value } = target;
  const letterCount = target.nextElementSibling.querySelector('.letter-count');
  const countArray = letterCount.textContent.split('/');
  countArray[0] = value.length;
  letterCount.textContent = `${countArray[0]}/${countArray[1]}`;
}
function handleInput(e) {
  const step2NextButton = getNode('#step2Next');
  inputValidation(e.target);
  toggleValidStyle(e.target);
  letterCount(e.target);
  if (validConfig.title.isValid && validConfig.description.isValid) {
    step2NextButton.removeAttribute('disabled');
  } else {
    step2NextButton.setAttribute('disabled', '');
  }
}
inputs.forEach((input) => {
  input.addEventListener('input', handleInput);
});

function findCheckedValue(currentStep) {
  const currentNameArray = inputRadioNameArray[currentStep - 1];
  if (currentNameArray === null) return;
  currentNameArray.forEach((name) => {
    const radioInputs = getNodes(`input[name="${name}"]`);
    const checkedInput = [...radioInputs].find((input) => input.checked);
    formObj[name] = checkedInput.value;
  });
}

function setInputValue() {
  const inputs = getNodes('.input');
  inputs.forEach(({ id, value }) => {
    if (id === 'date') {
      formObj[id] = new Date(value).toISOString();
    } else formObj[id] = value;
  });
}

function progressToggle(step, direction) {
  const progressBar = getNode('#progress-bar > div');
  const progressBarText = getNode('#progress-bar > span');
  if (direction === 'next') {
    progressBar.classList.replace(`w-${step - 1}/3`, `w-${step}/3`);
  } else {
    progressBar.classList.replace(`w-${step + 1}/3`, `w-${step}/3`);
  }
  progressBarText.textContent = `${step} / 3`;
}

function stepAnimation(currentStep, direction) {
  const nextStep = direction === 'next' ? currentStep + 1 : currentStep - 1;
  const currentEl = getNode(`#step${currentStep}`);
  const nextEl = getNode(`#step${nextStep}`);
  const tl = gsap.timeline();
  console.log(currentEl.id, nextEl.id);

  tl.to(currentEl, {
    x: direction === 'next' ? -450 : 450,
    duration: 0.3,
    ease: 'power2.inOut',
    clearProps: 'all',
    onComplete() {
      nextEl.classList.remove('hidden');
      currentEl.classList.add('hidden');
    },
  }).from(nextEl, {
    x: direction === 'next' ? 450 : -450,
    duration: 0.3,
    ease: 'power2.inOut',
    clearProps: 'all',
    onStart() {
      step = direction === 'next' ? step + 1 : step - 1;
      progressToggle(step, direction);
    },
  });
}

function handleClick({ currentTarget }) {
  const { id } = currentTarget;
  const direction = id.slice(-4).toLowerCase();
  if (step === 1 || step === 3) {
    findCheckedValue(step);
  } else {
    setInputValue(step);
  }
  stepAnimation(step, direction);
}

stepButton.forEach((button) => {
  button.addEventListener('click', handleClick);
});

const doneButton = getNode('#done');
async function handleDone(e) {
  if (step !== 3) return;
  findCheckedValue(step);
  formObj.age = formObj.age.slice(3);
  formObj.maxMember = formObj.maxMember.slice(9);
  try {
    const togetherResponse = await pb.collection('together').create(formObj);
    const chatroomObj = {
      originType: 'together',
      originId: togetherResponse.id,
      owner: pb.authStore.model.id,
      members: [pb.authStore.model.id],
      messageBox: JSON.stringify([]),
    };
    const chatroomResponse = await pb
      .collection('chatroom')
      .create(chatroomObj);
    await pb.collection('together').update(togetherResponse.id, {
      chatroomId: chatroomResponse.id,
    });
    alert('게시글이 작성되었습니다.');
    window.location.replace(
      `/src/pages/board/togetherView.html?id=${togetherResponse.id}`
    );
  } catch (error) {
    console.error(error);
  }
}
doneButton.addEventListener('click', handleDone);
