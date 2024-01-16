/* eslint-disable import/no-unresolved */

import gsap from 'gsap';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PocketBase from 'pocketbase';
import { Navigation, Pagination } from 'swiper/modules';
import {
  getNode,
  getPbImageURL,
  comma,
  checkAuth,
  clearContents,
} from '../../lib';

import {
  createAlertModal,
  createModal1Btn,
} from '../../components/Modal/Modal';
// import Swiper and modules styles

const share = getNode('#share');
const profileInfo = getNode('#profile');
const mannerTemp = getNode('#manner-temp');
const swiperContainer = getNode('#swiper');
const productInfo = getNode('#productInfo');
const footer = getNode('#footer');
const addButton = getNode('#addButton');
const watchTogether = getNode('#watchTogether');
const back = getNode('#back');

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export default async function getData() {
  if (!checkAuth()) return;

  const idParam = new URL(window.location.href).searchParams.get('id');

  const avatarList = await pb
    .collection('selling')
    .getOne(idParam, { expand: 'user' });

  const { title, description, price, id, isPriceOffer } = avatarList;
  const users = await avatarList.expand.user;
  const { name } = users;
  swiperContainer.insertAdjacentHTML(
    'afterbegin' /* html */,
    `
    <div class="swiper-wrapper">
      <div class="swiper-slide "><img src="${getPbImageURL(
        avatarList,
        'productImages',
        { thumb: '0x300' }
      )}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
      <div class="swiper-slide "><img src="${getPbImageURL(
        avatarList,
        'productImages',
        { thumb: '0x300' }
      )}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
      <div class="swiper-slide "><img src="${getPbImageURL(
        avatarList,
        'productImages',
        { thumb: '0x300' }
      )}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
    </div>
    <div class="swiper-pagination"></div>
`
  );

  clearContents(profileInfo);
  profileInfo.insertAdjacentHTML(
    'afterbegin',
    /* html */ `
    <figure>
      <img src="${getPbImageURL(users, 'avatar', {
        thumb: '0x300',
      })}" alt="" class="shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] w-10 h-10 rounded-full bg-contents-content-secondary">
    </figure>
    <div class="flex flex-col justify-center items-start">
      <span class="text-label-md" aria-label="프로필 이름">${name}</span>
      <span class="text-paragraph-sm" aria-label="거주 위치">용암동</span>
    </div>
  `
  );

  productInfo.insertAdjacentHTML(
    'afterbegin',
    /* html */ `
      <div class="flex flex-col items-start gap-3">
        <h1 class="text-label-lg">${title}</h1>
        <span class="text-paragraph-sm text-gray-600" aria-label="제품종류와 작성시간">컴퓨터 • 17분전</span>
        <span class="text-paragraph-md h-24" aria-label="제품 상태 설명">${description}</span>
        <span aria-label="조회수" class="paragraph-small text-gray-600">조회 19</span>
      </div>
  `
  );

  clearContents(mannerTemp);
  mannerTemp.insertAdjacentHTML(
    'afterbegin',
    /* html */ `
<div class="flex items-center justify-center gap-1">
      <span
        class="text-label-md text-secondary"
        aria-label="매너 온도 41.2도"
        >41.2℃</span
      >
      <span
        class="text-xl items-center justify-center"
        role="img"
        aria-label="매너 온도 표시 아이콘"
        >☺️</span
      >
    </div>
    <span aria-label="매너온도" class="text-paragraph-sm text-gray-600"
      >매너온도</span
    >
  `
  );
  const url =
    isPriceOffer === true
      ? `/src/pages/exchange/exchangeWrite.html?=${id}`
      : '#';

  footer.insertAdjacentHTML(
    'afterbegin',
    /* html */ `
  <button
    type="button"
    class="bg-heart-icon w-5 h-5 bg-no-repeat bg-cover heartContainer heart"
    aria-label="좋아요 버튼"
  ></button>
  <div class="flex flex-col grow border-l-2 pl-3">
    <p class="text-label-md">${comma(price)}원</p>
    <a href="${url}" class="text-label-sm text-secondary">가격 제안하기</a>
  </div>
  <button id="chatting"
    class="px-[14px] py-2 bg-secondary rounded text-label-md text-white">채팅하기</button>
  `
  );

  getNode('#chatting').addEventListener('click', async (e) => {
    if (pb.authStore.model.id === users.id)
      window.location.href = '/src/pages/chatting/lobby.html';
    const findResponse = await pb.collection('chatroom').getFullList({
      filter: `members ~ "${pb.authStore.model.id}" && sellingOriginId = "${id}"`,
    });
    if (findResponse.length > 0) {
      console.log(findResponse);
      window.location.href = `/src/pages/chatting/room.html?id=${findResponse[0].id}`;
    }
    const formObj = {
      originType: 'selling',
      sellingOriginId: idParam,
      owner: users.id,
      members: [pb.authStore.model.id, users.id],
      messageBox: JSON.stringify([]),
    };
    console.log(formObj);
    const chatroomResponse = await pb.collection('chatroom').create(formObj);
    window.location.href = `/src/pages/chatting/room.html?id=${chatroomResponse.id}`;
  });

  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    speed: 400,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      slidesPerView: 'auto',
      spaceBetween: 12,
      freeMode: true,
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
  clearContents(watchTogether);
  watchList.items.forEach((item) => {
    watchTogether.insertAdjacentHTML(
      'afterbegin',
      /* html */ `
      <article class=" relative aspect-[1/1.38] rounded-lg shadow-[4px_4px_16px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-gray-300 transition-all duration-200">
        <figure class="h-1/2">
          <img class="w-full h-full object-cover rounded-t-lg bg-contents-content-secondary"
          src="${getPbImageURL(item, 'productImages', {
            thumb: '0x300',
          })}" alt="${item}">
        </figure>
        <a class="absolute top-0 left-0 w-full h-full" href="/src/pages/exchange/exchangeDetail.html?id=${
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

/* -------------------------------------------------------------------------- */
/*                                     모달                                    */
/* -------------------------------------------------------------------------- */

const [modal, button] = createModal1Btn({
  title: '서비스 준비중입니다',
  desc: '빠른시일 내에 업데이트 할게요~<br>이용에 불편을 드려 죄송합니다!',
  buttonText: '확인',
});

// 모달 열기
function handleClipBoard() {
  const [successMoodal] = createAlertModal('📃 주소가 복사되었습니다.', 600);
  const [failedMoodal] = createAlertModal(
    '📃 복사 도중 오류가 발생했습니다.',
    1000
  );
  return async (e) => {
    try {
      await window.navigator.clipboard.writeText(window.location.href);
      successMoodal.showing();
    } catch (error) {
      failedMoodal.showing();
    }
  };
}

share.addEventListener('click', handleClipBoard());

addButton.addEventListener('click', modal.showing);

// 모달 닫기
button.addEventListener('click', modal.closing);

getData();
watch();

footer.addEventListener('click', changeHeart);
back.addEventListener('click', () => window.history.back());
