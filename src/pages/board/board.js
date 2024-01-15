/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path, no-param-reassign, no-restricted-syntax */
/* eslint no-use-before-define : warn */

import gsap from 'gsap';
import {
  pb,
  getNode,
  getNodes,
  insertFirst,
  insertLast,
  clearContents,
  convertTime,
  checkAuth,
} from '/src/lib/';
import { createModal1Btn } from '/src/components/Modal/Modal.js';

let categoryState = {
  programming: false,
  design: false,
  'ui/ux': false,
  frontend: false,
  backend: false,
  publishing: false,
  ai: false,
  blockchain: false,
};
const willChangeCategoryState = {
  programming: false,
  design: false,
  'ui/ux': false,
  frontend: false,
  backend: false,
  publishing: false,
  ai: false,
  blockchain: false,
};

/*
  init함수 : 로컬스토리지 관심분야 불러오고 객체에 할당
  */
async function getCategory() {
  const categoryResponse = await pb
    .collection('users')
    .getOne(pb.authStore.model.id, { fields: 'categorys' });
  return categoryResponse.categorys;
}
function handleCheck({ target }) {
  const { id } = target;
  const label = target.nextElementSibling;
  if (target.checked) {
    label.textContent = '팔로우 취소';
    // categoryState[id] = true;
    willChangeCategoryState[id] = true;
  } else {
    label.textContent = '팔로우';
    // categoryState[id] = false;
    willChangeCategoryState[id] = false;
  }
}
function applyInitialCategory(categoryArray) {
  if (categoryArray.length === 0) return;
  categoryArray.forEach((category) => {
    if (category === 'ui/ux') category = 'uiux';
    const checkBox = getNode(`input#${category}`);
    const label = checkBox.nextElementSibling;
    checkBox.checked = true;
    categoryState[category] = true;
    willChangeCategoryState[category] = true;
    label.textContent = '팔로우 취소';
  });
}
(async function init() {
  if (!checkAuth()) return;
  const $checkButtons = getNodes('input[type="checkbox"]');
  $checkButtons.forEach((button) => {
    button.addEventListener('change', handleCheck);
  });
  const myPickCategory = await getCategory();
  applyInitialCategory(myPickCategory);
  getData(categoryState);
})();

function createSkeletonTemplate() {
  return `<li>
  <div
    class="relative p-3 border-b flex flex-row justify-between gap-1 border-contents-content-secondary"
  >
    <div
      class="w-[calc(100%-70px)] flex flex-col flex-shrink-1 justify-center items-start gap-1"
    >
      <div class="flex items-center gap-1">
        <span class="skeleton-loading w-7 h-3"></span>
        <span class="skeleton-loading w-7 h-3"></span>
      </div>
      <span class="skeleton-loading w-[70%] h-3"> </span>
      <span class="skeleton-loading w-[90%] h-3"></span>
      <span class="skeleton-loading w-[30%] h-3"></span>
    </div>

    <div
      class="w-[70px] min-w-[70px] flex justify-center items-center"
    >
      <div class="w-full aspect-square skeleton-loading"></div>
    </div>
  </div>
</li>`.repeat(7);
}

function createTogetherTemplate(item) {
  const { category, date, id, members, title, owner, created } = item;
  let { maxMember, gender, age } = item;
  maxMember = maxMember === '제한없음' ? maxMember : `${maxMember}명`;
  gender = gender === '누구나' ? `${gender} 참여가능` : `${gender}만 참여가능`;
  age = age === '모든 연령' ? age : `${age}대`;
  const template = /* html */ `
    <li  class="hover:bg-gray-100 ">
    <div
      class="relative p-3 flex flex-col justify-center items-start gap-1 border-b border-contents-content-secondary">
    <div class="flex items-center gap-1 mb-7">
      <span
        class="text-label-sm p-1 leading-none bg-bluegray-600 text-white rounded"
        >같이해요</span>
      <span
        class="text-label-sm p-1 leading-none bg-tertiary text-white rounded"
        >${category}</span>
    </div>
      <a href="/src/pages/board/togetherView.html?id=${id}"
        class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary ">
        <span class="absolute top-[38px] left-3 w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">${title}</span>
      </a>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people_full-icon bg-no-repeat bg-left"
        >${age} ${gender}</span>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-calender-icon bg-no-repeat bg-left"
        >${new Date(date).toLocaleDateString()}</span>
      <div class="w-full flex justify-between">
        <span class="text-paragraph-sm font-normal text-gray-600"
          >연희동 · ${convertTime(created)}</span>
        <span
          class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people-icon bg-no-repeat bg-left"
          >${members.length}/${maxMember}</span>
      </div>
    </div>
    </li>
    `;

  return template;
}
function createQnaTemplate(item) {
  const { id, category, title, imgField, comments, views, created } = item;
  let { description } = item;
  description = description.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const imgUrl =
    imgField.length === 0
      ? ''
      : pb.files.getUrl(item, imgField[0], { thumb: '0x60' });

  const template = /* html */ `
    <li class="hover:bg-gray-100 ">
    <div
      class="relative p-3 border-b flex flex-row justify-between gap-1 border-contents-content-secondary"

    >
      <div
        class="w-[calc(100%-70px)] flex flex-col flex-shrink-1 justify-center items-start gap-1">
        <div class="flex items-center gap-1 mb-7">
          <span
            class="text-label-sm p-1 leading-none bg-bluegray-600 text-white rounded"
            >질의응답</span>
          <span
            class="text-label-sm p-1 leading-none bg-tertiary text-white rounded"
            >${category}</span>
        </div>
        <a href="/src/pages/board/qnaView.html?id=${id}"
          class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary">
          <span class="absolute top-[38px] left-3 ${
            !imgUrl ? 'w-[90%]' : 'w-[65%]'
          } overflow-hidden whitespace-nowrap text-ellipsis">${title}</span>
        </a>
        <span
          class="description w-full text-paragraph-sm font-normal text-gray-600 bg-transparent overflow-hidden whitespace-nowrap text-ellipsis resize-none"
          >${description.slice(0, 50)}</span>
        <span class="text-paragraph-sm font-normal text-gray-600"
          >연희동 · ${convertTime(created)} · 조회 ${views} · 댓글 0</span>
      </div>
      ${
        !imgUrl
          ? ''
          : /* html */ `
          <div
        class="w-[70px] min-w-[70px] flex justify-center items-center">
          <div
      class="w-full aspect-square overflow-hidden border border-gray-300 rounded">
      <img
      class="w-full h-full object-cover"
        src="${imgUrl}"
        alt="썸네일"
        loading="lazy"
        />
    </div>
    </div>`
      }
    </div>
    </li>
`;
  return template;
}
function createData(array) {
  const result = [];
  array.forEach((item) => {
    const { type } = item;
    if (type === 'together') {
      result.push(createTogetherTemplate(item));
    }
    if (type === 'qna') {
      result.push(createQnaTemplate(item));
    }
  });
  return result;
}

function renderNothing() {
  insertLast(
    '#board-list',
    `
   <div class="sorry p-3 flex flex-col text-center">
     <span class="text-heading-2xl">😅</span>
     <p class="p-1 text-paragraph-lg">게시물이 없습니다.</p>
   </div>
   `
  );
  gsap.from('.sorry', {
    y: 30,
    opacity: 0,
    duration: 0.2,
  });
}

function render(array) {
  if (array.length === 0) {
    renderNothing();
    return;
  }
  clearContents('#board-list');
  insertLast('#board-list', array.join(''));
}
function getFilterString(interests) {
  const nameTable = {
    programming: '프로그래밍',
    design: '인터렉션 디자인',
    uiux: 'UI/UX',
    frontend: '프론트엔드',
    backend: '백엔드',
    publishing: '퍼블리싱',
    ai: 'AI',
    blockchain: '블록체인',
  };
  const keyValueArray = Object.entries(interests);
  const filteredArray = keyValueArray.filter(([_, value]) => value);
  if (filteredArray.length === 0) return '';
  const stringArray = [];
  filteredArray.forEach(([key]) => {
    stringArray.push(`category = "${nameTable[key]}"`);
  });
  return stringArray.join('||');
}

async function getData() {
  clearContents('#board-list');
  insertLast('#board-list', createSkeletonTemplate());
  const filterString = getFilterString(categoryState);
  console.log(filterString);
  try {
    const togetherResponse = await pb.collection('together').getFullList();
    const qnaResponse = await pb.collection('qAndA').getFullList({
      filter: filterString,
    });
    const sortResponse = [...togetherResponse, ...qnaResponse].sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
    console.log(sortResponse);

    render(createData(sortResponse));
  } catch (error) {
    alert(
      '서버 통신을 하는 도중 오류가 발생했습니다. 잠시후 다시 시도해주세요.'
    );
    console.log(error);
  }
}

const $modalDimmed = getNode('#modalDimmed');
const $openModalButton = getNode('#openModal');
const $closeModalButton = getNode('#closeModal');

function showModal() {
  const tl = gsap.timeline();
  tl.to('#modalDimmed', {
    opacity: 1,
    display: 'block',
    duration: 0.3,
  }).to(
    '#modal',
    {
      bottom: 0,
      duration: 0.3,
      onComplete() {
        this.targets()[0].focus();
      },
    },
    '<'
  );
}

function closeModal(e) {
  if (this !== e.target) return;
  gsap.to('#modalDimmed', {
    opacity: 0,
    duration: 0.3,
    onComplete() {
      gsap.set('#modalDimmed', { clearProps: 'all' });
      gsap.set('#modal', { clearProps: 'all' });
    },
  });
  const isSame = Object.entries(willChangeCategoryState).every(
    ([key, value]) => categoryState[key] === value
  );
  if (isSame) return;
  categoryState = { ...willChangeCategoryState };
  getData();
}
$openModalButton.addEventListener('click', showModal);
$closeModalButton.addEventListener('click', closeModal);
$modalDimmed.addEventListener('click', closeModal);

// 글쓰기 팝업
const writeButton = getNode('#write');
function toggle(node) {
  node.classList.toggle('bg-plus-icon');
  node.classList.toggle('bg-exchange-close-icon');
  node.classList.toggle('bg-white');
  node.classList.toggle('bg-secondary');
}
const subMenuObj = {
  'board/writeTogether': '🎎 같이해요',
  'board/writeQna': '❓ 질의응답',
};
const subMenu = Object.entries(subMenuObj)
  .map(
    ([key, value]) => /* html */ `
<a
  href="/src/pages/${key}.html"
  class="block px-5 py-2.5 text-label-md rounded-full bg-white hover:bg-secondary hover:text-white"
  >${value}</a
>
`
  )
  .join('');
const writeMenuTemplate = /* html */ ` <nav id="write-menu" class="w-full flex flex-col gap-1">${subMenu}</nav>`;

function toggleSubMenu(isClicked) {
  if (!isClicked) {
    const tl = gsap.timeline();
    insertFirst('#write-container', writeMenuTemplate);
    tl.to('#dimmed', {
      display: 'block',
      opacity: 1,
      duration: 0.1,
    }).from(
      '#write-menu > *',
      {
        opacity: 0,
        y: 80,
        stagger: 0.08,
        reversed: true,
      },
      '<'
    );
  } else {
    getNode('#write-menu').remove();
    gsap.to('#dimmed', {
      display: 'none',
      opacity: 0,
      duration: 0.5,
    });
  }
}
function handleClickWriteButton() {
  let isClicked = false;
  return (e) => {
    toggle(e.target);
    toggleSubMenu(isClicked);
    isClicked = !isClicked;
  };
}
writeButton.addEventListener('click', handleClickWriteButton());
getNode('#dimmed').addEventListener('click', (e) => {
  gsap.to('#dimmed', {
    display: 'none',
    opacity: 0,
    duration: 0.5,
  });
  writeButton.click();
});

const notificationButton = getNode('#notification');
console.log(notificationButton);
notificationButton.addEventListener('click', (e) => {
  e.preventDefault();
  const [modal, button] = createModal1Btn({
    title: '😭서비스 준비중입니다.',
    desc: '열심히 준비중이예요💦<br> 조금만 기다려주세요',
    buttonText: '알겠어요',
  });
  button.addEventListener('click', () => modal.closing());
  modal.showing();
});
