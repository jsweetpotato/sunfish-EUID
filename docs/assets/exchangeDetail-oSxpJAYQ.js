import"./tailwind-At2ouQW-.js";import{S as $}from"./swiper-core-xIVJDqhu.js";import{C as j}from"./delay-L14dHocY.js";import{N as k,P as _}from"./pagination-hBsCm0jB.js";import{g as t}from"./getNode-pa7syr6m.js";import{c as r}from"./clear-vWyKvuJ4.js";import{g as n}from"./getPbImageUrl-DQjhCXIR.js";import{c as m}from"./comma-f4do0chS.js";import{c as T}from"./checkAuth-CTdHH8Oq.js";import{c as I}from"./Modal-LwrVZ11o.js";const M=t("#share"),p=t("#profile"),d=t("#manner-temp"),A=t("#swiper"),E=t("#productInfo"),h=t("#footer"),H=t("#addButton"),g=t("#watchTogether"),O=t("#back"),a=new j("https://suppose-weather.pockethost.io/");async function P(){if(!T())return;const s=new URL(window.location.href).searchParams.get("id"),e=await a.collection("selling").getOne(s,{expand:"user"}),{title:f,description:b,price:u,id:o,isPriceOffer:w}=e,i=await e.expand.user,{name:x}=i;A.insertAdjacentHTML("afterbegin",`
    <div class="swiper-wrapper">
      <div class="swiper-slide "><img src="${n(e,"productImages")}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
      <div class="swiper-slide "><img src="${n(e,"productImages")}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
      <div class="swiper-slide "><img src="${n(e,"productImages")}" alt="상품 이미지" class='w-full h-[305px] object-cover'></div>
    </div>
    <div class="swiper-pagination"></div>
`),r(p),p.insertAdjacentHTML("afterbegin",`
    <figure>
      <img src="${n(i,"avatar")}" alt="" class="shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] w-10 h-10 rounded-full bg-contents-content-secondary">
    </figure>
    <div class="flex flex-col justify-center items-start">
      <span class="text-label-md" aria-label="프로필 이름">${x}</span>
      <span class="text-paragraph-sm" aria-label="거주 위치">용암동</span>
    </div>
  `),E.insertAdjacentHTML("afterbegin",`
      <div class="flex flex-col items-start gap-3">
        <h1 class="text-label-lg">${f}</h1>
        <span class="text-paragraph-sm text-gray-600" aria-label="제품종류와 작성시간">컴퓨터 • 17분전</span>
        <span class="text-paragraph-md h-24" aria-label="제품 상태 설명">${b}</span>
        <span aria-label="조회수" class="paragraph-small text-gray-600">조회 19</span>
      </div>
  `),r(d),d.insertAdjacentHTML("afterbegin",`
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
  `);const v=w===!0?`/src/pages/exchange/exchangeWrite.html?=${o}`:"#";h.insertAdjacentHTML("afterbegin",`
  <button
    type="button"
    class="bg-heart-icon w-5 h-5 bg-no-repeat bg-cover heartContainer heart"
    aria-label="좋아요 버튼"
  ></button>
  <div class="flex flex-col grow border-l-2 pl-3">
    <p class="text-label-md">${m(u)}원</p>
    <a href="${v}" class="text-label-sm text-secondary">가격 제안하기</a>
  </div>
  <button id="chatting"
    class="px-[14px] py-2 bg-secondary rounded text-label-md text-white">채팅하기</button>
  `),t("#chatting").addEventListener("click",async R=>{a.authStore.model.id===i.id&&(window.location.href="/src/pages/chatting/lobby.html");const c=await a.collection("chatroom").getFullList({filter:`members ~ "${a.authStore.model.id}" && sellingOriginId = "${o}"`});c.length>0&&(window.location.href=`/src/pages/chatting/room.html?id=${c[0].id}`);const L={originType:"selling",sellingOriginId:s,owner:i.id,members:[a.authStore.model.id,i.id],messageBox:JSON.stringify([])},y=await a.collection("chatroom").create(L);window.location.href=`/src/pages/chatting/room.html?id=${y.id}`}),new $(".swiper",{modules:[k,_],speed:400,pagination:{el:".swiper-pagination",clickable:!0,slidesPerView:"auto",spaceBetween:12,freeMode:!0}})}function C(s){const{target:e}=s;e.classList.contains("heartContainer")&&e.classList.contains("heart")&&(e.classList.toggle("bg-heart-full-icon"),e.classList.toggle("bg-heart-icon"))}async function S(){const s=await a.collection("selling").getList(1,6);r(g),s.items.forEach(e=>{g.insertAdjacentHTML("afterbegin",`
      <article class=" relative aspect-[1/1.38] rounded-lg shadow-[4px_4px_16px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-gray-300 transition-all duration-200">
        <figure class="h-1/2">
          <img class="w-full h-full object-cover rounded-t-lg bg-contents-content-secondary"
          src="${n(e,"productImages")}" alt="${e}">
        </figure>
        <a class="absolute top-0 left-0 w-full h-full" href="/src/pages/exchange/exchangeDetail.html?id=${e.id}">
          <span class="absolute w-full top-[55%] px-2">
            <span class="text-ellipsis line-clamp-2 text-paragraph-sm">
              ${e.title}
            </span>
            <span
              class="mb-1 text-label-sm aria-label="판매가격"
              >${m(e.price)}원</span>
          </span>
      </a>
      </article>
    `)})}const[l,B]=I({title:"서비스 준비중입니다",desc:"빠른시일 내에 업데이트 할게요~<br>이용에 불편을 드려 죄송합니다!",buttonText:"확인"});M.addEventListener("click",l.showing);H.addEventListener("click",l.showing);B.addEventListener("click",l.closing);P();S();h.addEventListener("click",C);O.addEventListener("click",()=>window.history.back());
