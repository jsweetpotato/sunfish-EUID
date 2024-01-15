/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path */

import Swiper from 'swiper';
import gsap from 'gsap';
import { pb, getNode, getNodes, insertLast, clearContents } from '/src/lib/';

const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  freeMode: true,
});

const options = {
  interestsState: 'all',
};

let sortState = '-created';

function createQnaTemplate(item) {
  const { id, category, title, imgField, views, created, comments } = item;
  let { description } = item;
  description = description.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const imgUrl = pb.files.getUrl(item, imgField[0], { thumb: '0x60' });

  const template = /* html */ `
  <li class="hover:bg-gray-100">
  <div
    class="relative p-3 border-b flex flex-row justify-between gap-1 border-contents-content-secondary"
    
  >
    <div
      class="w-[calc(100%-70px)] flex flex-col flex-shrink-1 justify-center items-start gap-1"
    >
      <div class="flex items-center gap-1 mb-7">
        <span
          class="text-label-sm px-1 bg-bluegray-600 text-white rounded"
          >${category}</span
        >
      ${
        views > 100
          ? `<span
      class="text-label-sm px-1 bg-tertiary text-white rounded"
      >인기</span
    >`
          : ''
      }
      </div>
      <a href="/src/pages/board/qnaView.html?id=${id}"
        class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary "
      >
        <span class="absolute top-8 left-3 w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">${title}</span>
      </a>
      <span
        class="w-full text-paragraph-sm font-normal text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis"
        >${description.slice(0, 50)}...</span
      >
      <span class="text-paragraph-sm font-normal text-gray-600"
      >연희동 · ${new Date(
        created
      ).toLocaleDateString()} · 조회 ${views} · 댓글 ${comments.length}</span>
    </div>
      <div
      class="w-[70px] min-w-[70px] flex justify-center items-center">
    ${
      imgUrl === ''
        ? ''
        : /* html */ `<div
    class="w-[60px] h-[60px] overflow-hidden border border-gray-300 rounded">
    <img
    class="w-full h-full object-cover"
      src="${imgUrl}"
      alt="썸네일"
      loading="lazy"
      />
  </div>`
    }
    </div>
  </div>
  </li>
  `;
  return template;
}
function createData(array) {
  const result = [];
  array.forEach((item) => {
    result.push(createQnaTemplate(item));
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
  if (array.length < 1) {
    renderNothing();
    return;
  }
  insertLast('#board-list', array.join(''));
  gsap.from('#board-list>li', {
    x: -500,
    duration: 0.3,
    stagger: 0.1,
  });
}

function getFilterString(options) {
  const filterArray = [];
  if (options.interestsState !== 'all')
    filterArray.push(`category = "${options.interestsState}"`);
  return filterArray.join('&&');
}

async function getData() {
  clearContents('#board-list');
  const filterString = getFilterString(options);
  console.log(filterString);
  try {
    const qnaResponse = await pb.collection('qAndA').getFullList({
      sort: sortState,
      filter: filterString,
    });
    console.log(qnaResponse);
    render(createData(qnaResponse));
  } catch (error) {
    alert(
      '서버 통신을 하는 도중 오류가 발생했습니다. 잠시후 다시 시도해주세요.'
    );
    console.log(error);
  }
}
getData();

const categoryButton = getNodes('.category-button');
function handleCategoryChange({ target }) {
  const { id } = target;
  options.interestsState = id;
  getData();
}
categoryButton.forEach((button) => {
  button.addEventListener('change', handleCategoryChange);
});

const sortCreatedButton = getNode('#sort');
function handleChangeSortCreated(limit = 1000) {
  let isLatest = true;
  let isWaiting = false;
  return (e) => {
    if (!isWaiting) {
      if (isLatest) {
        e.currentTarget.textContent = '오래된 작성 순';
        e.currentTarget.classList.replace(
          'bg-direction-icon',
          'bg-direction_rotate-icon'
        );
        sortState = '+created';
      } else {
        e.currentTarget.textContent = '최근 작성 순';
        e.currentTarget.classList.replace(
          'bg-direction_rotate-icon',
          'bg-direction-icon'
        );
        sortState = '-created';
      }
      isLatest = !isLatest;
      getData();
    } else alert('성격이 급하신 것 같아요. 천천히 눌러주세요~');
    isWaiting = true;
    setTimeout(() => {
      isWaiting = false;
    }, limit);
  };
}
sortCreatedButton.addEventListener('click', handleChangeSortCreated());
