/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path */

import Swiper from 'swiper';
import gsap from 'gsap';
import {
  pb,
  getNode,
  getNodes,
  insertLast,
  clearContents,
  checkAuth,
} from '/src/lib/';

const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  freeMode: true,
});

const options = {
  interestsState: 'all',
  filter: 'filterAll',
};
let sortState = '-created';
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
  const { category, date, id, members, isOpen, title, owner, created } = item;
  let { maxMember, gender, age } = item;
  let openState = '모집중';
  let openStateClass = 'bg-secondary';
  if (maxMember === '제한없음') {
    openState = '상시모집';
    openStateClass = 'bg-orange-400';
  }
  if (!isOpen) {
    openState = '모집완료';
    openStateClass = 'bg-bluegray-300';
  }
  maxMember = maxMember === '제한없음' ? maxMember : `${maxMember}명`;
  gender = gender === '누구나' ? `${gender} 참여가능` : `${gender}만 참여가능`;
  age = age === '모든 연령' ? age : `${age}대`;
  const template = /* html */ `
    <li  class="hover:bg-gray-100">
    <div
      class="relative p-3 flex flex-col justify-center items-start gap-1 border-b border-contents-content-secondary">
    <div class="flex items-center gap-1 mb-7">
      <span
        class="text-label-sm p-1 leading-none ${openStateClass} text-white rounded"
        >${openState}</span>
      <span
        class="text-label-sm p-1 leading-none bg-bluegray-600 text-white rounded"
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
          >연희동 · ${new Date(created).toLocaleDateString()}</span>
        <span
          class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people-icon bg-no-repeat bg-left"
          >${members.length}/${maxMember}</span>
      </div>
    </div>
    </li>
    `;

  return template;
}
function createData(array) {
  const result = [];
  array.forEach((item) => {
    result.push(createTogetherTemplate(item));
  });
  return result;
}
function renderNothing() {
  clearContents('#board-list');
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
  clearContents('#board-list');
  insertLast('#board-list', array.join(''));
}
function getFilterString(options) {
  const filterArray = [];
  const nameTable = {
    all: '',
    project: '프로젝트',
    study: '스터디',
    food: '음식',
    hobby: '취미/여가',
    sports: '운동',
    reading: '독서',
    filterAll: '',
    filterOpen: 'true',
    filterJoin: `members ~ "${pb.authStore.model.id}"`,
  };
  if (options.interestsState !== 'all')
    filterArray.push(`category = "${nameTable[options.interestsState]}"`);
  if (options.filter === 'filterOpen')
    filterArray.push(`isOpen = ${nameTable[options.filter]}`);
  if (options.filter === 'filterJoin')
    filterArray.push(nameTable[options.filter]);
  return filterArray.join('&&');
}

async function getData() {
  if (!checkAuth()) return;
  clearContents('#board-list');
  insertLast('#board-list', createSkeletonTemplate());
  const filterString = getFilterString(options);
  console.log(filterString);
  try {
    const togetherResponse = await pb.collection('together').getFullList({
      filter: filterString,
      sort: sortState,
    });
    console.log(togetherResponse);
    render(createData(togetherResponse));
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

const sortCreatedButton = getNode('#sortCreated');
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
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, limit);
    } else alert('성격이 급하신 것 같아요. 천천히 눌러주세요~');
  };
}
sortCreatedButton.addEventListener('click', handleChangeSortCreated());

const filterButtons = getNodes('input[name="filter"]');
function handleFilterChange({ target }) {
  const { id } = target;
  options.filter = id;
  getData();
}
filterButtons.forEach((button) => {
  button.addEventListener('change', handleFilterChange);
});
