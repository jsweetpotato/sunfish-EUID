import"./tailwind-GolohDhN.js";import{S as j}from"./swiper-core-xIVJDqhu.js";import{C as k,c as T,b as p}from"./delay-YOOEtQ5Y.js";import{N as _,P as M}from"./pagination-hBsCm0jB.js";import{g as a}from"./getNode-pa7syr6m.js";import{c as n}from"./clear-vWyKvuJ4.js";import{g as r}from"./getPbImageUrl-DQjhCXIR.js";import{c as m}from"./comma-f4do0chS.js";import{c as I}from"./checkAuth-1jN6PZSr.js";const A=a("#share"),g=a("#profile"),h=a("#manner-temp"),C=a("#swiper"),E=a("#productInfo"),b=a("#footer"),H=a("#addButton"),f=a("#watchTogether"),O=a("#back"),s=new k("https://suppose-weather.pockethost.io/");async function P(){if(!I())return;const t=new URL(window.location.href).searchParams.get("id"),e=await s.collection("selling").getOne(t,{expand:"user"}),{title:l,description:o,price:w,id:c,isPriceOffer:x}=e,i=await e.expand.user,{name:v}=i;C.insertAdjacentHTML("afterbegin",`
    <div class="swiper-wrapper">
      <div class="swiper-slide  bg-gray-100"><img src="${r(e,"productImages")}" alt="상품 이미지" class='w-full h-full object-cover'></div>
      <div class="swiper-slide  bg-gray-100"><img src="${r(e,"productImages")}" alt="상품 이미지" class='w-full h-full object-cover'></div>
      <div class="swiper-slide  bg-gray-100"><img  src="${r(e,"productImages")}" alt="상품 이미지" class='w-full h-full object-cover'></div>
    </div>
    <div class="swiper-pagination"></div>
`),n(g),g.insertAdjacentHTML("afterbegin",`
    <figure>
      <img src="${r(i,"avatar")}" alt="" class="shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] w-10 h-10 rounded-full bg-contents-content-secondary">
    </figure>
    <div class="flex flex-col justify-center items-start">
      <span class="text-label-md" aria-label="프로필 이름">${v}</span>
      <span class="text-paragraph-sm" aria-label="거주 위치">용암동</span>
    </div>
  `),E.insertAdjacentHTML("afterbegin",`
      <div class="flex flex-col items-start gap-3">
        <h1 class="text-label-lg">${l}</h1>
        <span class="text-paragraph-sm text-gray-600" aria-label="제품종류와 작성시간">컴퓨터 • 17분전</span>
        <span class="text-paragraph-md h-24" aria-label="제품 상태 설명">${o}</span>
        <span aria-label="조회수" class="paragraph-small text-gray-600">조회 19</span>
      </div>
  `),n(h),h.insertAdjacentHTML("afterbegin",`
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
  `);const y=x===!0?`/src/pages/exchange/exchangeWrite.html?id=${c}`:"#";b.insertAdjacentHTML("afterbegin",`
  <button
    type="button"
    class="bg-heart-icon w-5 h-5 bg-no-repeat bg-cover heartContainer heart"
    aria-label="좋아요 버튼"
  ></button>
  <div class="flex flex-col grow border-l-2 pl-3">
    <p class="text-label-md">${m(w)}원</p>
    <a href="${y}" class="text-label-sm text-secondary">가격 제안하기</a>
  </div>
  <button id="chatting"
    class="px-[14px] py-2 bg-secondary rounded text-label-md text-white">채팅하기</button>
  `),a("#chatting").addEventListener("click",async D=>{s.authStore.model.id===i.id&&(window.location.href="/src/pages/chatting/lobby.html");const d=await s.collection("chatroom").getFullList({filter:`members ~ "${s.authStore.model.id}" && sellingOriginId = "${c}"`});d.length>0&&(window.location.href=`/src/pages/chatting/room.html?id=${d[0].id}`);const L={originType:"selling",sellingOriginId:t,owner:i.id,members:[s.authStore.model.id,i.id],messageBox:JSON.stringify([])},$=await s.collection("chatroom").create(L);window.location.href=`/src/pages/chatting/room.html?id=${$.id}`}),new j(".swiper",{modules:[_,M],speed:400,pagination:{el:".swiper-pagination",clickable:!0,slidesPerView:"auto",spaceBetween:12,freeMode:!0}})}function B(t){const{target:e}=t;e.classList.contains("heartContainer")&&e.classList.contains("heart")&&(e.classList.toggle("bg-heart-full-icon"),e.classList.toggle("bg-heart-icon"))}async function S(){const t=await s.collection("selling").getList(1,6);n(f),t.items.forEach(e=>{f.insertAdjacentHTML("afterbegin",`
      <article class=" relative aspect-[1/1.38] rounded-lg shadow-[4px_4px_16px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-gray-300 transition-all duration-200">
        <figure class="h-1/2">
          <img class="w-full h-full object-cover rounded-t-lg bg-contents-content-secondary"
          src="${r(e,"productImages")}" alt="${e}">
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
    `)})}const[u,R]=T({title:"서비스 준비중입니다",desc:"빠른시일 내에 업데이트 할게요~<br>이용에 불편을 드려 죄송합니다!",buttonText:"확인"});function N(){const[t]=p("📃 주소가 복사되었습니다.",600),[e]=p("📃 복사 도중 오류가 발생했습니다.",1e3);return async l=>{try{await window.navigator.clipboard.writeText(window.location.href),t.showing()}catch{e.showing()}}}A.addEventListener("click",N());H.addEventListener("click",u.showing);R.addEventListener("click",u.closing);P();S();b.addEventListener("click",B);O.addEventListener("click",()=>window.history.back());
