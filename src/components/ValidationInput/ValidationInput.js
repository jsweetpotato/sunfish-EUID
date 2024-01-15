/* eslint-disable no-shadow */
import { getNode, getNodes } from '../../lib';

// 각 key에 input id들을 넣어주시고 max(최대글자)값을 수정해주세요.
// const validConfig = [
//   {
//     id: 'input1',
//     min: 5,
//     max: 24,
//     placeholder: '닉네임을 입력해주세요',
//     label: '직장'
//   },
// ];

// 클로져를 사용해서 이벤트 바인딩?

const initInput = (validConfig) => {
  const inputboxList = getNodes('.valid-input-box');

  function inputValidation(input) {
    const index = +input.dataset.index;
    const { min, max } = validConfig[index];
    const letterCount = input.value.replace(/\s*/g, '').length;
    const result = letterCount > min && letterCount <= max;
    // eslint-disable-next-line no-param-reassign
    validConfig[index].isValid = result;
    return result;
  }

  function toggleValidStyle(input, isValid) {
    const wrapper = input.closest('.input-wrapper');
    if (isValid) wrapper.classList.remove('invalid');
    else wrapper.classList.add('invalid');
  }

  function letterCount(input) {
    const { value } = input;
    const index = +input.dataset.index;
    const letterCount = input.nextElementSibling.querySelector('.letter-count');
    letterCount.textContent = `${value.length}/${validConfig[index].max}`;
  }

  function handleInput({ target }) {
    const isValid = inputValidation(target);
    toggleValidStyle(target, isValid);
    letterCount(target);
  }

  const needUpdate = {
    state: false,
  };

  const inputList = [];
  return [
    inputboxList.forEach((inputbox, idx) => {
      const {
        id,
        min = 0,
        max = 24,
        placeholder = '',
        label,
      } = validConfig[idx];
      const template = /* html */ `
      <label for="${id}" class="text-label-sm pb-2">${label}</label>
      <div class="input-wrapper group flex flex-col w-full">
        <input
          type="text"
          id=${id}
          data-index="${idx}"
          placeholder="${placeholder}"
          minlength="${min}"
          maxlength="${max}"
          class="group-[.invalid]:border-red-500 p-2 text-paragraph-sm w-full outline-none border border-contents-content-tertiary rounded"
          spellcheck="false"
        />
        <div class="flex justify-between">
          <span
            class="group-[&:not(.invalid)]:opacity-0 text-red-500 text-paragraph-sm opacity-1"
          >글자 수는 ${min + 1}자 이상 ${max}자 이하로 작성해주세요.</span>
          <span
            aria-live="polite"
            class="group-[.invalid]:text-red-500 letter-count text-contents-content-tertiary text-paragraph-sm"
          >0/${max}</span>
        </div>
      </div>
      `;

      inputbox.insertAdjacentHTML('beforeend', template);

      const input = getNode(`input#${id}`);
      input.addEventListener('input', handleInput);

      inputList.push(input);

      Object.defineProperty(needUpdate, 'state', {
        get() {
          // eslint-disable-next-line no-underscore-dangle
          return this._state;
        },
        set(value) {
          // eslint-disable-next-line no-underscore-dangle
          this._state = value;
          // 값이 변경될 때 원하는 이벤트를 트리거합니다.
          inputList.forEach((input) => letterCount(input));
        },
      });
    }),
    needUpdate,
  ];
};

export default initInput;
