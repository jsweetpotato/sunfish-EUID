import PocketBase from 'pocketbase';
import { getNode, getPbImageURL, comma } from '/src/lib';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const profileInfo = getNode('#profileInfo');
const main = getNode('#main');
const productInfo = getNode('#productInfo');
const footer = getNode('#footer');
const watchTogether = getNode('#watchTogether');
const back = getNode('#back');

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export default async function getData() {
  const hash = window.location.hash.slice(1);

  const avatarList = await pb
    .collection('selling')
    .getOne(hash, { expand: 'profile.userId' });

  const { title, description, price, isPriceOffer } = avatarList;
  const users = avatarList.expand.profile.expand.userId;
  const { name } = users;

  main.insertAdjacentHTML(
    'afterbegin' /* html */,
    `
  <div class="swiper w-full flex grow flex-shrink" >
    <div class="swiper-wrapper">
      <div class="swiper-slide "><img src="${getPbImageURL(
        avatarList,
        'productImages'
      )}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
      <div class="swiper-slide "><img src="${getPbImageURL(
        avatarList,
        'productImages'
      )}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
      <div class="swiper-slide "><img src="${getPbImageURL(
        avatarList,
        'productImages'
      )}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
    </div>
    <div class="swiper-pagination"></div>
  
  </div>
`
  );

  profileInfo.insertAdjacentHTML(
    'afterbegin' /* html */,
    `
      <div class="flex justify-center items-center gap-2">
        <figure>
          <img src="${getPbImageURL(
            users,
            'avatar'
          )}" alt="" class="w-10 h-10 border rounded-full bg-contents-content-secondary">
        </figure>
        <div class="flex flex-col justify-center items-start">
          <span class="text-label-md" aria-label="프로필 이름">${name}</span>
          <span class="text-paragraph-sm" aria-label="거주 위치">용암동</span>
        </div>
      </div>
  `
  );

  productInfo.insertAdjacentHTML(

    'afterbegin' /* html */,
    `
      <div class="flex flex-col items-start gap-3">
        <h1 class="text-label-lg">${title}</h1>
        <span class="text-paragraph-sm" aria-label="제품종류와 작성시간">컴퓨터 • 17분전</span>
        <span class="text-paragraph-md h-24" aria-label="제품 상태 설명">${description}</span>
        <span aria-label="조회수" class="paragraph-small">조회 19</span>
      </div>
  `
  );

  const url =
    isPriceOffer === true
      ? `/src/pages/exchange/exchangeWrite.html?id=#${avatarList.id}`
      : '#'; ;

  footer.insertAdjacentHTML(
    'afterbegin' /* html */,
    `
  <button
    type="button"
    class="bg-heart-icon w-5 h-5 bg-no-repeat bg-cover heartContainer heart"
    aria-label="좋아요 버튼"
  ></button>
  <div class="flex flex-col grow border-l-2 pl-3">
    <p class="text-label-md">${comma(price)}원</p>
    <a href="${url}" class="text-label-sm text-secondary">가격 제안하기</a>
  </div>
  <button
    class="px-[14px] py-2 bg-secondary rounded text-label-md text-white"
  >
    채팅하기
  </button>
  `
  );

  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    speed: 400,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

function changeHeart(e) {
  const { target } = e;
  if (target.classList.contains('heartContainer')) {
    if (target.classList.contains('heart')) {
      target.classList.toggle('bg-heart-full-icon');
      target.classList.toggle('bg-heart-icon');
    }
  }
}

async function watch() {
  const watchList = await pb.collection('selling').getList(1, 6);
  watchList.items.forEach((item) => {
    watchTogether.insertAdjacentHTML(
      'afterbegin',
      /* html */ `
      <article class="relative aspect-[1/1.38] rounded-lg shadow-[4px_4px_16px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-gray-300 transition-all duration-200">
        <figure class="h-1/2">
          <img class="w-full h-full object-cover rounded-t-lg bg-contents-content-secondary"
          src="${getPbImageURL(item, 'productImages')}" alt="${item}">
        </figure>
        <a class="absolute top-0 left-0 w-full h-full" href="/src/pages/exchange/exchangeDetail.html?id=#${
          item.id
        }">
          <span class="absolute w-full top-[55%] px-2">
            <span class="text-ellipsis line-clamp-2 text-paragraph-sm">
              ${item.title}
            </span>
            <span
              class="mb-1 text-label-sm aria-label="판매가격"
              >${comma(item.price)}원</span>
          </span>
      </a>
      </article>
    `
    );
  });
}

watch();
getData();
footer.addEventListener('click', changeHeart);
back.addEventListener('click', () => history.back());
