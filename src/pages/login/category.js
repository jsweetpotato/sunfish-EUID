import { createPrimaryBtn, toggleValid } from '../../components/main_button';

const $categoryList = document.querySelector('#category-list');
const $buttonWrapper = document.querySelector('#button-wrapper');
let $submitbutton;

const CATEGORY_LIST = [
  'Program  ing',
  'Design',
  'UI/UX',
  'Frontend',
  'Backend',
  'AI',
  'Blockchain',
];

const state = {
  Programing: false,
  Design: false,
  'UI/UX': false,
  Frontend: false,
  Backend: false,
  AI: false,
  Blockchain: false,
};

let count = 0;

function handleButton({ target }) {
  const button = target.closest('button');
  if (!button) return;
  button.classList.toggle('selected');

  state[button.id] = !state[button.id];

  // eslint-disable-next-line no-plusplus
  if (state[button.id]) count++;
  // eslint-disable-next-line no-plusplus
  else count--;

  if (count > 2) toggleValid($submitbutton, true);
  else toggleValid($submitbutton, false);
}

const drawTemplate = () => {
  CATEGORY_LIST.map((item) =>
    $categoryList.insertAdjacentHTML(
      'beforeend',
      /* html */ `
    <button id=${item} type="button" class="group">
      <div class="group-[.selected]:bg-secondary flex justify-between items-center bg-bluegray-200 max-w-50 px-3 py-6 rounded-lg text-start hover:brightness-95">
        <p class="group-[.selected]:text-white text-label-md leading-tight">${item}</p>
        <div class="group-[.selected]:bg-check-icon row-span-2 w-5 h-5 bg-no-repeat bg-center bg-contain bg-plus-icon"></div>
      </div>
    </button>`
    )
  );
};

const handleSubmit = (e) => {
  e.preventDefault();
  window.location.href = './oauth.html';
};

const buttonInit = () => {
  $buttonWrapper.insertAdjacentElement(
    'beforeend',
    createPrimaryBtn({
      id: 'submit',
      value: '이대로 저장할래요',
      type: 'submit',
      onClick: handleSubmit,
    })
  );

  $submitbutton = document.querySelector('#submit');
};

drawTemplate();
buttonInit();

$categoryList.addEventListener('click', handleButton);
