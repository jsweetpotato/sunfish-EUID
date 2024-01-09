/* eslint-disable import/no-unresolved */

import Swiper from 'swiper';
// import 'swiper/css';

const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  freeMode: true,
});

/**
 * @type {{ together: {id:number, title: string, age: string, datetime:string, local: string, createdAt: number, maxMember: number, currentMember: string[] }; qna: {}; }}
 */
const dummyData = {
  together: [
    {
      id: 0,
      title: 'youtube 클론 프젝 같이하실분~',
      age: '누구나 참여가능',
      datetime: '내일, 오후 7:00',
      local: '응암동',
      createdAt: new Date().getTime(),
      maxMember: 3,
      currentMember: ['kim', 'lee'],
    },
    {
      id: 1,
      title: '멋사플레이스 클론스터디 하실분',
      age: '20대',
      datetime: '오늘, 오후 8:00',
      local: '비전동',
      createdAt: new Date().getTime(),
      maxMember: 4,
      currentMember: ['jo'],
    },
    {
      id: 2,
      title: '알고리즘 매일 아침마다 인증할 분',
      age: '누구나 참여 가능',
      datetime: '5월 1일, 오전 10:00',
      local: '통복동',
      createdAt: new Date().getTime(),
      maxMember: 5,
      currentMember: ['jo', 'kang', 'choi'],
    },
    {
      id: 3,
      title: 'youtube 클론 프젝 같이하실분~',
      age: '누구나 참여가능',
      datetime: '내일, 오후 7:00',
      local: '응암동',
      createdAt: new Date().getTime(),
      maxMember: 3,
      currentMember: ['kim', 'lee'],
    },
    {
      id: 4,
      title: '멋사플레이스 클론스터디 하실분',
      age: '20대',
      datetime: '오늘, 오후 8:00',
      local: '비전동',
      createdAt: new Date().getTime(),
      maxMember: 4,
      currentMember: ['jo'],
    },
    {
      id: 5,
      title: '알고리즘 매일 아침마다 인증할 분',
      age: '누구나 참여 가능',
      datetime: '5월 1일, 오전 10:00',
      local: '통복동',
      createdAt: new Date().getTime(),
      maxMember: 5,
      currentMember: ['jo', 'kang', 'choi'],
    },
  ],
};

function createTemplate(data) {
  const { together } = data;
  const togetherTemplateArray = [];
  together.forEach((item) => {
    const { title, age, datetime, local, createdAt, maxMember, currentMember } =
      item;
    const template = /* html */ `
    <li  class="hover:bg-gray-100 transition-all">
    <a
      class="p-3 flex flex-col justify-center items-start gap-1 border-b border-contents-content-secondary"
      href=""
    >
      <span
        class="text-label-sm px-1 bg-bluegray-600 text-white rounded"
        >같이해요</span
      >
      <p
        class="w-full flex-auto text-paragraph-md font-normal text-contents-content-primary overflow-hidden whitespace-nowrap text-ellipsis"
      >
        ${title}
      </p>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people_full-icon bg-no-repeat bg-left"
        >${age}</span
      >
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-calender-icon bg-no-repeat bg-left"
        >${datetime}</span
      >
      <div class="w-full flex justify-between">
        <span class="text-paragraph-sm font-normal text-gray-600"
          >${local} · 9분 전</span
        >
        <span
          class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people-icon bg-no-repeat bg-left"
          >${currentMember.length}/${maxMember}명</span
        >
      </div>
    </a>
    </li>
    `;
    togetherTemplateArray.push(template);
  });

  const resultTemplate = [...togetherTemplateArray];
  return resultTemplate.join('');
}
const boardList = document.querySelector('#board-list');
boardList.insertAdjacentHTML('beforeend', createTemplate(dummyData));

function removeActiveClass() {
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach((slide) => {
    const [btn, p] = slide.children;
    btn.classList.remove('border-secondary');
    p.classList.remove('text-secondary');
  });
}

function handleSetActiveClass(e) {
  const { category } = e.currentTarget.dataset;
  removeActiveClass();
  e.currentTarget.classList.add('border-secondary');
  e.currentTarget.nextElementSibling.classList.add('text-secondary');
}

const categoryButton = document.querySelectorAll('#categoryButton');
categoryButton.forEach((button) => {
  button.addEventListener('click', handleSetActiveClass);
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
    } else {
      e.currentTarget.textContent = '최근 작성 순';
      e.currentTarget.classList.replace(
        'bg-direction_rotate-icon',
        'bg-direction-icon'
      );
    }
    isLatest = !isLatest;
  };
}
sortButton.addEventListener('click', handleChangeSort());
