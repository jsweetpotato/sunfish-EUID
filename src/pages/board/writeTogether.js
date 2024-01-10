/* eslint-disable no-alert, no-shadow */

import gsap from 'gsap';

const inputRadioNameArray = [
  ['category'],
  null,
  ['gender', 'age', 'maxMember'],
];

const formObj = {
  category: 'project',
  title: '',
  description: '',
  date: '오늘',
  time: '오후 8:00',
  gender: 'anyone',
  age: 'anyone',
  maxMember: 'noLimited',
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
  const inputs = document.querySelectorAll('.input');
  const form = document.querySelector('.form');
  form.addEventListener('submit', (e) => e.preventDefault());
  inputs.forEach((input) => {
    const { min, max } = validConfig[input.id];
    const letterCount = input.nextElementSibling.querySelector('.letter-count');
    const errorMsg = input.nextElementSibling.querySelector('.error-msg');
    letterCount.textContent = `0/${max}`;
    errorMsg.textContent = `글자 수는 ${
      min + 1
    }자 이상 ${max}자 이하로 작성해주세요.`;
  });
})();

const approveCheckBox = document.querySelector('#approve');
function handleToggleCheckBox({ currentTarget }) {
  const label = currentTarget.nextElementSibling;
  if (currentTarget.checked) {
    label.classList.replace('bg-contents-content-tertiary', 'bg-secondary');
    gsap.to('#approveHandle', {
      marginLeft: 'auto',
      duration: 0.2,
    });
  } else {
    label.classList.replace('bg-secondary', 'bg-contents-content-tertiary');
    gsap.to('#approveHandle', {
      marginLeft: 0,
      duration: 0.2,
    });
  }
}
approveCheckBox.addEventListener('change', handleToggleCheckBox);

let step = 1;
const stepButton = document.querySelectorAll('button[id^="step"]');

const inputs = document.querySelectorAll('.input');
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
  console.log('handleInput');
  const step2NextButton = document.querySelector('#step2Next');
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
    const radioInputs = document.querySelectorAll(`input[name="${name}"]`);
    const checkedInput = [...radioInputs].find((input) => input.checked);
    formObj[name] = checkedInput.value;
  });
}

function setInputValue(currentStep) {
  const inputs = document.querySelectorAll('.input');
  inputs.forEach(({ id, value }) => {
    formObj[id] = value;
  });
}

function toggleHiddenClass(currentStep, direction) {
  const nextStep = direction === 'next' ? currentStep + 1 : currentStep - 1;
  const currentEl = document.querySelector(`#step${currentStep}`);
  const nextEl = document.querySelector(`#step${nextStep}`);
  currentEl.classList.add('hidden');
  nextEl.classList.remove('hidden');
}

function handleClick({ currentTarget }) {
  const { id } = currentTarget;
  const direction = id.slice(-4).toLowerCase();
  if (step === 1 || step === 3) {
    findCheckedValue(step);
  } else {
    setInputValue(step);
  }

  if (direction === 'next') {
    toggleHiddenClass(step, direction);
    step += 1;
  } else {
    toggleHiddenClass(step, direction);
    step -= 1;
  }
}

stepButton.forEach((button) => {
  button.addEventListener('click', handleClick);
});

const doneButton = document.querySelector('#done');
function handleDone(e) {
  if (step === 3) {
    findCheckedValue(step);
    const { category, title, description, date, time, age, gender, maxMember } =
      formObj;
    alert(
      `카테고리: ${category}
      제목 : ${title}
      소개 : ${description}
      날짜 : ${date}
      시간 : ${time}
      연령대 : ${age.replace(/\D/g, '')}
      성별 : ${gender}
      최대 인원 : ${maxMember.replace(/\D/g, '')}`
    );
    alert('게시글 등록이 완료되었습니다.');
    window.location.href = '/src/pages/board/together.html';
  }
}
doneButton.addEventListener('click', handleDone);

/*
  TODO
  1. 제목, 소개 밸리데이션 함수 구현 필요
  2. 현재 toggleHiddenClass 함수에서 모든걸 처리하고 있음
    -> 함수 분리 필요
  3. handleClick과 handleDone 함수를 합칠 필요가 있음
  4. formObj에 얻어지는 값들이 문자열과 섞여있음 ex) age40
    -> 서버로 보내기 위해 알파벳 제거해야함
  5. (optional) gsap으로 마이크로 애니메이션 구현
*/
