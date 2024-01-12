import { createPrimaryBtn, toggleValid } from '../../components/main_button';
import { getNode } from '../../lib/dom/getNode';
import drawCategory from './components/CategoryCompo';

const CATEGORY_LIST = [
  'Programing',
  'Design',
  'UI/UX',
  'Frontend',
  'Backend',
  'AI',
  'Blockchain',
];

function CategoryPage($target) {
  this.state = {
    Programing: false,
    Design: false,
    'UI/UX': false,
    Frontend: false,
    Backend: false,
    AI: false,
    Blockchain: false,
  };

  this.count = 0;

  this.submitbutton = createPrimaryBtn({
    id: 'submit',
    value: '이대로 저장할래요',
    type: 'submit',
  });

  console.log(this.submitbutton);

  function handleButton({ target }) {
    const button = target.closest('button');
    if (!button) return;
    button.classList.toggle('selected');

    this.state[button.id] = !this.state[button.id];
    // eslint-disable-next-line no-plusplus
    if (this.state[button.id]) this.count++;
    // eslint-disable-next-line no-plusplus
    else this.count--;

    if (this.count > 2) toggleValid(this.submitbutton, true);
    else toggleValid(this.submitbutton, false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = './oauth.html';
  };

  // const buttonInit = () => {
  //   getNode().insertAdjacentElement(
  //     'beforeend',
  //     createPrimaryBtn({
  //       id: 'submit',
  //       value: '이대로 저장할래요',
  //       type: 'submit',
  //       onClick: handleSubmit,
  //     })
  //   );

  //   $submitbutton = document.querySelector('#submit');
  // };

  this.init = () => {
    // eslint-disable-next-line no-param-reassign
    $target.innerHTML = /* html */ `
    <div class="flex flex-col px-3 min-w-screen max-w-screen min-h-screen mx-auto">
    <header class="sticky top-0 bg-white w-full h-10 pe-3">
      <div class="flex justify-between items-center">
        <a
          href="javascript:window.history.back()"
          role="button"
          aria-label="돌아가기"
          class="bg-direction-icon block w-10 h-10 bg-no-repeat bg-center rotate-90 hover:bg-gray-100"
        ></a>
      </div>
    </header>
    <main class="flex flex-col flex-grow">
      <p class="text-heading-lg text-prima my-[1.125rem]">
        관심분야를 선택해주세요!
      </p>
      <form action="" class="flex-grow flex flex-col justify-between">
        <div id="category-list" class="grid gap-2 grid-cols-2">
        ${drawCategory({ list: CATEGORY_LIST })}
        </div>
        <div id="button-wrapper" class="pb-[2.125rem]">
        ${this.submitbutton}
        </div>
      </form>
    </main>
  </div>`;
    getNode('#category-list').addEventListener(
      'click',
      handleButton.bind(this)
    );
  };
}

export default CategoryPage;
