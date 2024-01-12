/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path */

import Swiper from 'swiper';
import gsap from 'gsap';
import { pb, getNode, getNodes, insertLast } from '/src/lib/';

const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  freeMode: true,
});

let interestsState = 'all';
let sortState = '@random';

function createTogetherTemplate(item) {
  const { age, category, date, gender, id, members, title, owner, created } =
    item;
  let { maxMember } = item;
  maxMember = maxMember === '제한없음' ? maxMember : `${maxMember}명`;
  const template = /* html */ `
    <li  class="hover:bg-gray-100">
    <div
      class="relative p-3 flex flex-col justify-center items-start gap-1 border-b border-contents-content-secondary">
    <div class="flex items-center gap-1 mb-7">
      <span
        class="text-label-sm px-1 bg-bluegray-600 text-white rounded"
        >같이해요</span>
      <span
        class="text-label-sm px-1 bg-tertiary text-white rounded"
        >${category}</span>
    </div>
      <a href="/src/pages/board/togetherView.html?id=${id}"
        class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary ">
        <span class="absolute top-8 left-3 w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">${title}</span>
      </a>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people_full-icon bg-no-repeat bg-left"
        >${age}, ${gender}</span>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-calender-icon bg-no-repeat bg-left"
        >${new Date(date).toLocaleDateString()}</span>
      <div class="w-full flex justify-between">
        <span class="text-paragraph-sm font-normal text-gray-600"
          >연희동 · ${new Date(created).toLocaleDateString()}</span>
        <span
          class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people-icon bg-no-repeat bg-left"
          >${members.memberId.length}/${maxMember}</span>
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
function render(array) {
  const boardList = getNode('#board-list');
  boardList.innerHTML = '';
  insertLast(boardList, array.join(''));
  const listItem = getNodes('#board-list>li');
  if (listItem.length === 0) return;
  gsap.from('#board-list>li', {
    x: -500,
    duration: 0.3,
    stagger: 0.1,
  });
}
function getFilterString(interests) {
  if (interests === 'all') return '';
  const nameTable = {
    project: '프로젝트',
    study: '스터디',
    food: '음식',
    hobby: '취미/여가',
    sports: '운동',
    reading: '독서',
  };
  return `category = "${nameTable[interests]}"`;
}

async function getData() {
  const filterString = getFilterString(interestsState);
  console.log(filterString);
  const togetherResponse = await pb.collection('together').getFullList({
    filter: filterString,
    sort: sortState,
  });
  console.log(togetherResponse);
  render(createData(togetherResponse));
}
getData();

const categoryButton = document.querySelectorAll('.category-button');
function handleCheck({ target }) {
  if (target.id === interestsState) return;
  const { id } = target;
  interestsState = id;
  getData();
}
categoryButton.forEach((button) => {
  button.addEventListener('click', handleCheck);
});

const sortButton = document.querySelector('#sort');
function handleChangeSort() {
  let isLatest = true;
  return (e) => {
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
  };
}
sortButton.addEventListener('click', handleChangeSort());
