import"./tailwind-2pOqmYJK.js";import{S as m}from"./swiper-core-xIVJDqhu.js";import{C as x}from"./delay-L14dHocY.js";import{N as w,P as v}from"./pagination-hBsCm0jB.js";import{g as e}from"./getNode-pa7syr6m.js";import{c as L}from"./clear-vWyKvuJ4.js";import{g as s}from"./getPbImageUrl-DQjhCXIR.js";import{c as n}from"./comma-f4do0chS.js";import{c as $}from"./checkAuth-CTdHH8Oq.js";import{c as y}from"./Modal-LwrVZ11o.js";const _=e("#share"),j=e("#profileInfo"),k=e("#swiper"),I=e("#productInfo"),l=e("#footer"),T=e("#addButton"),c=e("#watchTogether"),M=e("#back"),o=new x("https://suppose-weather.pockethost.io/");async function P(){if(!$())return;const t=new URL(window.location.href).searchParams.get("id"),a=await o.collection("selling").getOne(t,{expand:"user"}),{title:p,description:d,price:g,id:f,isPriceOffer:h}=a,i=await a.expand.user,{name:u}=i;k.insertAdjacentHTML("afterbegin",`
    <div class="swiper-wrapper">
      <div class="swiper-slide "><img src="${s(a,"productImages")}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
      <div class="swiper-slide "><img src="${s(a,"productImages")}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
      <div class="swiper-slide "><img src="${s(a,"productImages")}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
    </div>
    <div class="swiper-pagination"></div>
`),j.insertAdjacentHTML("afterbegin",`
      <div class="flex justify-center items-center gap-2">
        <figure>
          <img src="${s(i,"avatar")}" alt="" class="shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] w-10 h-10 border rounded-full bg-contents-content-secondary">
        </figure>
        <div class="flex flex-col justify-center items-start">
          <span class="text-label-md" aria-label="프로필 이름">${u}</span>
          <span class="text-paragraph-sm" aria-label="거주 위치">용암동</span>
        </div>
      </div>
  `),I.insertAdjacentHTML("afterbegin",`
      <div class="flex flex-col items-start gap-3">
        <h1 class="text-label-lg">${p}</h1>
        <span class="text-paragraph-sm text-gray-600" aria-label="제품종류와 작성시간">컴퓨터 • 17분전</span>
        <span class="text-paragraph-md h-24" aria-label="제품 상태 설명">${d}</span>
        <span aria-label="조회수" class="paragraph-small text-gray-600">조회 19</span>
      </div>
  `);const b=h===!0?`/src/pages/exchange/exchangeWrite.html?=${f}`:"#";l.insertAdjacentHTML("afterbegin",`
  <button
    type="button"
    class="bg-heart-icon w-5 h-5 bg-no-repeat bg-cover heartContainer heart"
    aria-label="좋아요 버튼"
  ></button>
  <div class="flex flex-col grow border-l-2 pl-3">
    <p class="text-label-md">${n(g)}원</p>
    <a href="${b}" class="text-label-sm text-secondary">가격 제안하기</a>
  </div>
  <button id="chatting"
    class="px-[14px] py-2 bg-secondary rounded text-label-md text-white">채팅하기</button>
  `),new m(".swiper",{modules:[w,v],speed:400,pagination:{el:".swiper-pagination",clickable:!0,slidesPerView:"auto",spaceBetween:12,freeMode:!0}})}function A(t){const{target:a}=t;a.classList.contains("heartContainer")&&a.classList.contains("heart")&&(a.classList.toggle("bg-heart-full-icon"),a.classList.toggle("bg-heart-icon"))}async function C(){const t=await o.collection("selling").getList(1,6);L(c),t.items.forEach(a=>{c.insertAdjacentHTML("afterbegin",`
      <article class=" relative aspect-[1/1.38] rounded-lg shadow-[4px_4px_16px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-gray-300 transition-all duration-200">
        <figure class="h-1/2">
          <img class="w-full h-full object-cover rounded-t-lg bg-contents-content-secondary"
          src="${s(a,"productImages")}" alt="${a}">
        </figure>
        <a class="absolute top-0 left-0 w-full h-full" href="/src/pages/exchange/exchangeDetail.html?id=#${a.id}">
          <span class="absolute w-full top-[55%] px-2">
            <span class="text-ellipsis line-clamp-2 text-paragraph-sm">
              ${a.title}
            </span>
            <span
              class="mb-1 text-label-sm aria-label="판매가격"
              >${n(a.price)}원</span>
          </span>
      </a>
      </article>
    `)})}const[r,E]=y({title:"서비스 준비중입니다",desc:"빠른시일 내에 업데이트 할게요~<br>이용에 불편을 드려 죄송합니다!",buttonText:"확인"});_.addEventListener("click",r.showing);T.addEventListener("click",r.showing);E.addEventListener("click",r.closing);P();C();l.addEventListener("click",A);M.addEventListener("click",()=>window.history.back());
