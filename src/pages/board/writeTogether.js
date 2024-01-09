/* eslint-disable no-alert */

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

function findCheckedValue(currentStep) {
  const currentNameArray = inputRadioNameArray[currentStep - 1];
  if (currentNameArray === null) return;
  currentNameArray.forEach((name) => {
    const inputs = document.querySelectorAll(`input[name="${name}"]`);
    const checkedInput = [...inputs].find((input) => input.checked);
    formObj[name] = checkedInput.value;
  });
}

function toggleHiddenClass(currentStep, direction) {
  const nextStep = direction === 'next' ? currentStep + 1 : currentStep - 1;
  const currentEl = document.querySelector(`#step${currentStep}`);
  const nextEl = document.querySelector(`#step${nextStep}`);
  findCheckedValue(step);
  currentEl.classList.add('hidden');
  nextEl.classList.remove('hidden');
}

function handleClick({ currentTarget }) {
  const { id } = currentTarget;
  const direction = id.slice(-4).toLowerCase();
  if (step >= 3) return;
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
      `카테고리: ${category}제목 : ${title}소개 : ${description}날짜 : ${date}시간 : ${time}연령대 : ${age}성별 : ${gender}최대 인원 : ${maxMember}`
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
