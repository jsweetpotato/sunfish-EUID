/* eslint-disable no-shadow,import/no-unresolved,import/extensions,import/no-absolute-path */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import { getNode, insertLast, pb } from '/src/lib/';

// 데이터 받아오고 렌더링
function createTemplate(data) {
  const itemArray = [];
  data.forEach((item) => {
    const imageURL = pb.files.getUrl(item, item.field, { thumb: '200x0' });
    const template = /* html */ `
    <article
    class="relative w-[48%] aspect-[1/1.38] rounded-lg shadow-[4px_4px_16px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-contents-content-tertiary transition-all duration-200"
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
              >${item.expand.profile.company} · ${item.expand.profile.expand.userId.name}</span
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
    itemArray.push(template);
  });
  return itemArray.join('');
}
function render(data) {
  insertLast(getNode('#story-container'), data);
}
(async function getStoryData() {
  const response = await pb.collection('story').getFullList({
    expand: 'profile.userId',
  });
  const result = createTemplate(response);
  render(result);
})();

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Autoplay, Keyboard],
  slidesPerView: 1,
  slidesPerGroup: 1,
  direction: 'horizontal',
  autoplay: {
    delay: 3000,
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

const main = getNode('#main');

function handleScroll({ target }) {
  const { scrollHeight, scrollTop, clientHeight } = target;
  if (scrollTop + clientHeight >= scrollHeight) {
    // TODO : 무한 스크롤 로직 구현
  }
}
main.addEventListener('scroll', handleScroll);
