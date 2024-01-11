import PocketBase from 'pocketbase';
import { getNode, getPbImageURL } from '/src/lib';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const profileInfo = getNode('#profileInfo');
const main = getNode('#main');
const productInfo = getNode('#productInfo');

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export default async function getData(){
  const hash = window.location.hash.slice(1);
  
  const avatarList = await pb.collection('selling').getOne(hash, {expand: 'profile.userId'});
    
  const { title, description } = avatarList;
  const users = avatarList.expand.profile.expand.userId;
  const { name } = users;

  main.insertAdjacentHTML(
      'afterbegin', /* html */
      `
  <div class="swiper w-full flex grow flex-shrink" >
    <div class="swiper-wrapper">
      <div class="swiper-slide "><img src="${getPbImageURL(avatarList,'productImages')}" alt="상품 이미지" class='w-full h-[305px]'></div>
      <div class="swiper-slide "><img src="${getPbImageURL(avatarList,'productImages')}" alt="상품 이미지" class='w-full h-[305px]'></div>
      <div class="swiper-slide "><img src="${getPbImageURL(avatarList,'productImages')}" alt="상품 이미지" class='w-full h-[305px]'></div>
    </div>
    <div class="swiper-pagination"></div>
  
  </div>
`
    );

  profileInfo.insertAdjacentHTML(
    'afterbegin' /* html */,
    `
      <div class="flex justify-center items-center">
        <figure>
          <img src="${getPbImageURL(users, 'avatar')}" alt="" class="w-10 h-10 border rounded-full bg-contents-content-secondary">
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



getData()

