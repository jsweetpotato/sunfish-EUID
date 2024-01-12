import PocketBase from 'pocketbase';
import { getNode, getPbImageURL, comma } from '/src/lib';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const section = getNode('.content');

function handleHeartClick(event) {
  const {target} = event;

  if (target.classList.contains('heartContainer')) {
    const countElement = target.nextElementSibling; 
    let count = Number(countElement.innerText) || 0;

    if (target.classList.contains('bg-heart-icon')) {
      count+=1;
      target.classList.add('bg-heart-full-icon');
      target.classList.remove('bg-heart-icon');
    } else {
      count = Math.max(count - 1, 0); 
      target.classList.remove('bg-heart-full-icon');
      target.classList.add('bg-heart-icon');
    }

    countElement.innerText = count;
  }
}


export default async function imageList() {
  const result = await pb
    .collection('selling')
    .getFullList('pb/collections/selling');


  result.forEach((value) => {
    const sharing =
      value.tradingType === 'nanum'
        ? `<span class="text-label-sm text-white rounded-[4px] gap-2 grow bg-no-repeat py-1 px-2 bg-secondary">나눔</span>`: 
        '';
        section.insertAdjacentHTML(
          'afterbegin' /* html */,
          `
      <div class="flex p-3 gap-3 justify-center items-center border-b cursor-pointer relative" id="${
        value.id
      }">
        <figure>
          <img src="${getPbImageURL(
            value,
            'productImages'
          )}" alt="${value}" class="w-[95px] h-[95px] object-cover grow rounded-lg">
        </figure>
        <div class="flex flex-col grow p-3">
          <a href="/src/pages/exchange/exchangeDetail.html?id=#${
            value.id
          }" class="text-paragraph-md absolute w-full h-full top-0 left-0"><span class='absolute top-5 left-32'>${
            value.title
          }</span></a>
          <span class="text-paragraph-sm" aria-label="판매위치 • 작성시간">마포구 신수동 • 44분전</span>
          <div class="gap-1 grow w-full items-center">
            ${sharing}
            <span class="text-label-sm" aria-label="판매가격">${comma(
              value.price
            )}원</span>
          </div>
          <div class="flex gap-[1px] absolute right-1 bottom-0 pb-1 items-center">
            <button type="button" class="heartContainer bg-heart-icon p-3 bg-no-repeat" aria-label="좋아요 표시하기"></button>
            <span class="greatCount text-paragraph-sm heartCount">0</span>
          </div>
        </div>
      </div>
      `
        );
  }); 
};


section.addEventListener('click', handleHeartClick);
