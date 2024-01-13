/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path */

import gsap from 'gsap';
import { pb, getNode, getNodes, insertLast, clearContents } from '/src/lib/';

console.log('start');

/*
  init함수 : 로컬스토리지 관심분야 불러오고 객체에 할당
*/

const interestsState = {
  programming: false,
  design: false,
  uiux: false,
  frontend: false,
  backend: false,
  publishing: false,
  ai: false,
  blockchain: false,
};

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
function createQnaTemplate(item) {
  const {
    id,
    category,
    title,
    description,
    imgField,
    comments,
    views,
    created,
  } = item;
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
            class="text-label-sm px-1 bg-bluegray-600 text-white rounded"
            >질의응답</span>
          <span
            class="text-label-sm px-1 bg-tertiary text-white rounded"
            >${category}</span>
        </div>
        <a href="/src/pages/board/qnaView.html?id=${id}"
          class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary">
          <span class="absolute top-8 left-3 w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">${title}</span>
        </a>
        <textarea
          class="description w-full text-paragraph-sm font-normal text-gray-600 bg-transparent overflow-hidden whitespace-nowrap text-ellipsis resize-none"
          >${description}</textarea>
        <span class="text-paragraph-sm font-normal text-gray-600"
          >연희동 · ${new Date(
            created
          ).toLocaleDateString()} · 조회 ${views} · 댓글 0</span>
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
  insertLast('#board-list', array.join(''));
  gsap.from('#board-list li', {
    x: -500,
    duration: 0.3,
    stagger: 0.1,
    onStart() {
      console.log('start');
    },
  });
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
  const filterString = getFilterString(interestsState);
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
getData(interestsState);

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
  if (this === e.target) {
    gsap.to('#modalDimmed', {
      opacity: 0,
      duration: 0.3,
      onComplete() {
        gsap.set('#modalDimmed', { clearProps: 'all' });
        gsap.set('#modal', { clearProps: 'all' });
      },
    });
    getData();
  }
}
$openModalButton.addEventListener('click', showModal);
$closeModalButton.addEventListener('click', closeModal);
$modalDimmed.addEventListener('click', closeModal);

const $checkButtons = getNodes('input[type="checkbox"]');
function handleCheck({ target }) {
  const { id } = target;
  const label = target.nextElementSibling;
  if (target.checked) {
    label.textContent = '팔로우 취소';
    interestsState[id] = true;
  } else {
    label.textContent = '팔로우';
    interestsState[id] = false;
  }
}
$checkButtons.forEach((button) => {
  button.addEventListener('change', handleCheck);
});
/*
  TODO : 모달창 focus trap 기능 구현해야함
*/
