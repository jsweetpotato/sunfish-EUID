/* eslint-disable no-shadow */

// 각 key에 input id들을 넣어주시고 max(최대글자)값을 수정해주세요.
const validConfig = {
  label1: {
    min: 0,
    max: 24,
    isValid: false,
  },
  label2: {
    min: 0,
    max: 100,
    isValid: false,
  },
};

(function inputInit() {
  const inputs = document.querySelectorAll('.input');
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
  inputValidation(e.target);
  toggleValidStyle(e.target);
  letterCount(e.target);
}
inputs.forEach((input) => {
  input.addEventListener('input', handleInput);
});
