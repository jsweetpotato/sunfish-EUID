/* eslint-disable import/no-unresolved */

import Swiper from 'swiper';

const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  freeMode: true,
});

const dummyData = {
  qna: [
    {
      id: 0,
      title:
        '코딩 입문한지 얼마안된 초보입니다. (자바스크립트 클로저에 대한 질문)',
      description:
        '안녕하세요. 디자인 전공으로 종사하다가 코딩쪽으로 스펙업을 하고 싶어서 입문하게된 코린이입니다. 독학으로 자바스크립트 공부중인데요. chtatGPT라는 정말 좋은 선생님이 생겨서 공부하기 정말 좋은 시대라고 생각하고 공부 하고 있습니다. 입문한지는 며칠안되어서 너무 기본적인 것일 수도 있겠지만',
      local: '연희동',
      createdAt: new Date().getTime(),
      views: 12,
      imgUrl: [
        '/src/assets/boardIcon/sampleImg.png',
        '/src/assets/boardIcon/sampleImg.png',
      ],
    },
    {
      id: 1,
      title: '자바스크립트 마우스 이벤트 질문',
      description:
        '자바스크립트로 아날로그 타이머를 만들고 있었는데 이해가 잘안되는 부분이 생겼습니다.',
      local: '연희동',
      createdAt: new Date().getTime(),
      views: 181,
      imgUrl: [
        '/src/assets/boardIcon/sampleImg.png',
        '/src/assets/boardIcon/sampleImg.png',
      ],
    },
    {
      id: 2,
      title: '유효성 인식 문제 (자바스크립트 )',
      description:
        '안녕하세요 우편번호 찾기 버튼 없이 숫자를 직접 넣었을 때는 아래 이미지와 같이 잘 됩니다. 그런데 [우편번호 찾기] 버튼으로 우편 번호 검색을 한 후 우편번호 필드에 출력은 되는데 바로 유효성 인식을 하지 못하는 상황 입니다.',
      local: '중앙동',
      createdAt: new Date().getTime(),
      views: 11,
      imgUrl: [
        '/src/assets/boardIcon/sampleImg.png',
        '/src/assets/boardIcon/sampleImg.png',
      ],
    },
  ],
};

function createTemplate(data) {
  const { qna } = data;
  const togetherTemplateArray = [];
  qna.forEach((item) => {
    const { title, description, local, createdAt, views, imgUrl } = item;
    const template = /* html */ `
    <li class="hover:bg-gray-100 transition-all">
    <div
      class="relative p-3 border-b flex flex-row justify-between gap-1 border-contents-content-secondary"
      
    >
      <div
        class="w-[calc(100%-70px)] flex flex-col flex-shrink-1 justify-center items-start gap-1"
      >
        <div class="flex items-center gap-1 mb-7">
          <span
            class="text-label-sm px-1 bg-bluegray-600 text-white rounded"
            >질의응답</span
          >
          <span
            class="text-label-sm px-1 bg-tertiary text-white rounded"
            >인기</span
          >
        </div>
        <a href="/src/pages/board/qnaView.html"
          class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary "
        >
          <span class="absolute top-8 left-3 w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">${title}</span>
        </a>
        <span
          class="w-full text-paragraph-sm font-normal text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis"
          >${description.slice(0, 50)}...</span
        >
        <span class="text-paragraph-sm font-normal text-gray-600"
          >${local} · 9분 전 · 조회 ${views}</span
        >
      </div>
      <div
        class="w-[70px] min-w-[70px] flex justify-center items-center"
      >
        <div
          class="w-[60px] h-[60px] overflow-hidden border border-gray-300 rounded"
        >
          <img
            src="${imgUrl[0]}"
            alt="이미지"
          />
        </div>
      </div>
    </div>
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
  removeActiveClass();
  e.currentTarget.classList.add('border-secondary');
  e.currentTarget.nextElementSibling.classList.add('text-secondary');
}

const categoryButton = document.querySelectorAll('.category-button');
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
