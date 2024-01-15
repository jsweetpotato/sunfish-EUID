import gsap from 'gsap';
import PocketBase from 'pocketbase';
import {
  getNode,
  getPbImageURL,
  comma,
  checkAuth,
  clearContents,
} from '../../lib';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const section = getNode('.content');

function handleHeartClick(e) {
  const heartContainer = e.target.closest('.heartContainer');

  if (heartContainer) {
    const heartBG = heartContainer.querySelector('.heart-bg');
    const countElement = heartBG.nextElementSibling;
    let count = Number(countElement.innerText) || 0;

    if (heartBG.classList.contains('bg-heart-icon')) {
      count += 1;
      heartBG.classList.add('bg-heart-full-icon');
      heartBG.classList.remove('bg-heart-icon');
    } else {
      count = Math.max(count - 1, 0);
      heartBG.classList.remove('bg-heart-full-icon');
      heartBG.classList.add('bg-heart-icon');
    }

    countElement.innerText = count;
  }
}

export default async function imageList() {
  if (!checkAuth()) return;
  const result = await pb
    .collection('selling')
    .getFullList('pb/collections/selling');
  clearContents(section);
  result.forEach((value) => {
    const sharing =
      value.tradingType === 'nanum'
        ? `<span class="text-label-sm text-white rounded-[4px] gap-2 grow bg-no-repeat py-[2px] px-1 bg-secondary">나눔</span>`
        : '';
    section.insertAdjacentHTML(
      'afterbegin',
      /* html */
      `
      <div class=" exchange-list hover:bg-gray-100 flex p-3 gap-3 justify-center items-center border-b cursor-pointer relative" id="${
        value.id
      }">
        <figure>
          <img src="${pb.files.getUrl(value, value.productImages, {
            thumb: '0x300',
          })}" alt="${value}" class="w-[95px] h-[95px] object-cover grow rounded-lg ">
        </figure>
        <div class="flex flex-col grow p-3">
          <a href="/src/pages/exchange/exchangeDetail.html?id=${value.id}" 
          class="text-paragraph-md absolute w-full h-full top-0 left-0">
          <span class='absolute top-5 left-[130px]'>${value.title}</span>
          </a>
          <span class="text-paragraph-sm" aria-label="판매위치 • 작성시간">마포구 신수동 • 44분전</span>
          <div class="gap-1 grow w-full items-center">
            ${sharing}
            <span class="text-label-sm" aria-label="판매가격">${comma(
              value.price
            )}원</span>
          </div>
          <button type="button" class="heartContainer flex h-8 gap-[1px] min-w-8 absolute right-3 bottom-2 pt-6 items-center justify-end">
            <span class="heart-bg bg-heart-icon p-2 bg-contain bg-no-repeat" aria-label="좋아요 표시하기"></span>
            <span class="text greatCount text-paragraph-sm text-right font-sans heartCount">0</span>
          </button>
        </div>
      </div>
      `
    );
  });

  // gsap.from('.exchange-list', {
  //   x: -500,
  //   duration: 0.3,
  //   stagger: 0.1,
  // });
}

section.addEventListener('click', handleHeartClick);
