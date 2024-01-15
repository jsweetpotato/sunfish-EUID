/* eslint-disable no-shadow,import/no-unresolved,import/extensions,import/no-absolute-path */

import Swiper from 'swiper';
import gsap from 'gsap';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import {
  getNode,
  insertFirst,
  insertLast,
  clearContents,
  pb,
  checkAuth,
} from '/src/lib/';
import { createModal1Btn } from '/src/components/Modal/Modal.js';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Autoplay, Keyboard],
  slidesPerView: 1,
  slidesPerGroup: 1,
  direction: 'horizontal',
  speed: 500,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    type: 'progressbar',
    el: '.pagination',
    clickable: true,
    progressbarFillClass:
      'absolute top-0 left-0 w-full h-full scale-0 origin-top-left bg-secondary',
    renderProgressbar(className) {
      const totalSlidesCount = this.slides.length;
      return `
      <span id="currentIndex" class="text-label-sm text-white absolute top-[-6px] left-[-20px]">01</span>
      <span class="${className}"></span>
      <span class="text-label-sm text-white absolute top-[-6px] right-[-20px]">0${totalSlidesCount}</span>

  `;
    },
  },
  keyboard: {
    enabled: true,
  },
  on: {
    realIndexChange(swiper) {
      const currentIndex = (swiper.realIndex + 1).toString().padStart(2, '0');
      getNode('#currentIndex').textContent = currentIndex;
    },
  },
});

function getImageUrl(record, array, options = {}) {
  const urlArray = [];
  array.forEach((image) => {
    const url = pb.files.getUrl(record, image, options);
    urlArray.push(url);
  });
  return urlArray;
}

// 배너 데이터 받아오고 슬라이드 렌더링
function createSlideTemplate(data) {
  const { id, images, description } = data;
  const imgUrlArray = getImageUrl(data, images, { thumb: '0x350' });
  const templateArray = [];
  description.forEach((item, idx) => {
    const { id, title, link } = item;
    const template = /* html */ `
  <div class="swiper-slide">
  <a href="${link}" class="relative block w-full h-full">
    <img
      class="absolute bottom-0 h-full object-cover"
      src="${imgUrlArray[idx]}"
      alt="메인 배너"
    />
    ${
      title
        ? `    <div class="absolute top-[6.25%] left-[6.25%] text-white">
    <h3 class="w-[148px] text-label-lg font-medium">
      ${title}
    </h3>
    <a class="text-paragraph-sm" href="${link}">자세히 보기</a>
  </div>`
        : ''
    }
  </a>
  </div>`;
    templateArray.push(template);
  });
  return templateArray.join('');
}

// 스토리 데이터 받아오고 렌더링
function createArticleTemplate(data) {
  const itemArray = [];
  data.forEach((item) => {
    const imageURL = pb.files.getUrl(item, item.field, { thumb: '200x0' });
    const articleTemplate = /* html */ `
    <article
    class="relative w-[48%] aspect-[1/1.38] rounded-lg shadow-[3px_3px_8px_0px_rgba(0,0,0,0.08),0px_0px_4px_0px_rgba(0,0,0,0.05)] hover:shadow-gray-300 transition-all duration-200"
  >
    <img
      class="w-full h-1/2 object-cover rounded-t-lg bg-contents-content-secondary"
    src="${imageURL}"
      alt=""
    />
  
    <div
      class="p-1.5 h-1/2 text-paragraph-sm min-[375px]:text-paragraph-md leading-[1.6] font-normal"
    >
      <h3>
        <a class="absolute top-0 left-0 w-full h-full" href="">
          <span class="absolute w-[92%] top-[52%] left-1.5">
            <span class="text-ellipsis line-clamp-2">
              ${item.title}
            </span>
            <span
              class="mb-1 text-contents-content-secondary text-ellipsis line-clamp-2"
              >${item.expand.user.company} · ${item.expand.user.name}</span
            >
            <div class="text-label-sm min-[375px]:text-label-md">
              <span
                class="px-1 text-secondary border border-secondary rounded"
                >${item.generation}기</span
              >
              <span
                class="px-1 text-gray-700 border border-contents-content-tertiary rounded"
                >${item.keywords}</span
              >
            </div>
          </span>
        </a>
      </h3>
    </div>
  </article>
    `;
    itemArray.push(articleTemplate);
  });
  return itemArray.join('');
}

function render(obj) {
  clearContents('#story-container');
  const { articleResult, slidesResult } = obj;
  insertLast(getNode('#story-container'), articleResult);
  insertLast(getNode('#main-swiper-wrapper'), slidesResult);
  swiper.update();
}

(async function getStoryData() {
  if (!checkAuth()) return;
  const storyResponse = await pb.collection('story').getFullList({
    expand: 'user',
  });
  const bannerResponse = await pb
    .collection('banner')
    .getOne('3vnixokxjub7pu6');
  const articleResult = createArticleTemplate(storyResponse);
  const slidesResult = createSlideTemplate(bannerResponse);
  render({ articleResult, slidesResult });
})();

const main = getNode('#main');

function handleScroll({ target }) {
  const { scrollHeight, scrollTop, clientHeight } = target;
  if (scrollTop + clientHeight >= scrollHeight) {
    // TODO : 무한 스크롤 로직 구현
  }
}
main.addEventListener('scroll', handleScroll);

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
  'exchange/exchangeWrite': '💻 기기거래',
};
const subMenu = Object.entries(subMenuObj)
  .map(
    ([key, value]) => /* html */ `
<a
  href="/src/pages/${key}.html"
  class="block px-5 py-2.5 text-label-md rounded-full  bg-white hover:bg-secondary hover:text-white"
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
