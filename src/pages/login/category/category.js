import { createPrimaryBtn, toggleValid } from '../../../components/main_button';

const $categoryList = document.querySelector('#category-list');
const $buttonWrapper = document.querySelector('#button-wrapper');
const $submitbutton = createPrimaryBtn({
  id: 'submit',
  value: '이대로 저장할래요',
  type: 'submit',
});

$buttonWrapper.appendChild($submitbutton);

const CATEGORY_LIST = [
  'Programming',
  'Design',
  'UI/UX',
  'Frontend',
  'Backend',
  'AI',
  'Blockchain',
];

const state = {
  Programming: false,
  Design: false,
  'UI/UX': false,
  Frontend: false,
  Backend: false,
  AI: false,
  Blockchain: false,
};

const drawTemplate = () => {
  CATEGORY_LIST.map((item) =>
    $categoryList.insertAdjacentHTML(
      'beforeend',
      /* html */ `
    <button id=${item} type="button" class="group">
      <span class="group-[.selected]:bg-secondary flex justify-between items-center bg-bluegray-200 max-w-50 px-3 py-6 rounded-lg text-start hover:brightness-95">
        <p class="group-[.selected]:text-white text-label-md leading-tight">${item}</p>
        <span aria-hidden="true" class="group-[.selected]:bg-check-icon row-span-2 w-5 h-5 bg-no-repeat bg-center bg-contain bg-plus-icon-full"></span>
      </span>
    </button>`
    )
  );
};

const handleCategory = () => {
  let count = 0;

  return ({ target }) => {
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
  };
};

const handleSubmit = (e) => {
  e.preventDefault();
  window.location.href = '/src/pages/login/signup/';
};

drawTemplate();

$submitbutton.onclick = handleSubmit;
$categoryList.addEventListener('click', handleCategory());
