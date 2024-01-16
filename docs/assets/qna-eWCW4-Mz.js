import"./tailwind-Jlr4NQan.js";import{S as m}from"./swiper-core-xIVJDqhu.js";import{g as h}from"./index-LZz_RBWS.js";import{a as w,g as b}from"./getNode-pa7syr6m.js";import{i}from"./insert-c9FKGVoP.js";import{c as o}from"./clear-vWyKvuJ4.js";import{p as d}from"./delay-YOOEtQ5Y.js";import{c as v}from"./checkAuth-1jN6PZSr.js";new m(".swiper",{slidesPerView:"auto",spaceBetween:12,freeMode:!0});const f={interestsState:"all"};let l="-created";function y(){return`
  <li>
  <div class="relative p-3 border-b flex flex-row justify-between gap-1">
    <div class="w-full flex flex-col flex-shrink-1 justify-center items-start gap-3">
      <div class="flex items-center">
        <span class="skeleton-loading w-12 h-4"></span>
      </div>
      <span class="skeleton-loading w-[70%] h-[11px]"></span>
      <span class="skeleton-loading w-[90%] h-[11px]"></span>
      <span class="skeleton-loading w-[30%] h-[11px]"></span>
    </div>
    <div class="w-[70px] min-w-[70px] flex justify-center items-center" >
      <div class="w-full aspect-square skeleton-loading"></div>
    </div>
  </div>
</li>`.repeat(5)}function S(e){const{id:t,category:a,title:s,imgField:g,views:p,created:u,comments:x}=e;let{description:r}=e;r=r.replace(/</g,"&lt;").replace(/>/g,"&gt;");const n=d.files.getUrl(e,g[0],{thumb:"0x60"});return`
  <li class="hover:bg-gray-100">
  <div
    class="relative p-3 border-b flex flex-row justify-between gap-1 border-contents-content-secondary"
    
  >
    <div
      class="w-[calc(100%-70px)] flex flex-col flex-shrink-1 justify-center items-start gap-1"
    >
      <div class="flex items-center gap-1 mb-7">
        <span
          class="text-label-sm p-1 leading-none bg-bluegray-600 text-white rounded"
          >${a}</span
        >
      ${p>100?`<span
      class="text-label-sm p-1 leading-none bg-tertiary text-white rounded"
      >인기</span
    >`:""}
      </div>
      <a href="/src/pages/board/qnaView.html?id=${t}"
        class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary "
      >
      <span class="absolute top-[38px] left-3 ${n?"w-[65%]":"w-[90%]"} overflow-hidden whitespace-nowrap text-ellipsis">${s}</span>
      </a>
      <span
        class="w-full text-paragraph-sm font-normal text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis"
        >${r.slice(0,50)}</span
      >
      <span class="text-paragraph-sm font-normal text-gray-600"
      >연희동 · ${new Date(u).toLocaleDateString()} · 조회 ${p} · 댓글 ${x.length}</span>
    </div>
    ${n?`
        <div
      class="w-[70px] min-w-[70px] flex justify-center items-center">
        <div
    class="w-full aspect-square overflow-hidden border border-gray-300 rounded">
    <img
    class="w-full h-full object-cover"
      src="${n}"
      alt="썸네일"
      loading="lazy"
      />
  </div>
  </div>`:""}
  </div>
  </li>
  `}function $(e){const t=[];return e.forEach(a=>{t.push(S(a))}),t}function k(){o("#board-list"),i("#board-list",`
   <div class="sorry p-3 flex flex-col text-center">
     <span class="text-heading-2xl">😅</span>
     <p class="p-1 text-paragraph-lg">게시물이 없습니다.</p>
   </div>
   `),h.from(".sorry",{y:30,opacity:0,duration:.2})}function j(e){if(e.length<1){k();return}o("#board-list"),i("#board-list",e.join(""))}function C(e){const t=[];return e.interestsState!=="all"&&t.push(`category = "${e.interestsState}"`),t.join("&&")}async function c(){if(!v())return;o("#board-list"),i("#board-list",y());const e=C(f);try{const t=await d.collection("qAndA").getFullList({sort:l,filter:e});j($(t))}catch{alert("서버 통신을 하는 도중 오류가 발생했습니다. 잠시후 다시 시도해주세요.")}}c();const L=w(".category-button");function T({target:e}){const{id:t}=e;f.interestsState=t,c()}L.forEach(e=>{e.addEventListener("change",T)});const q=b("#sort");function A(e=1e3){let t=!0,a=!1;return s=>{a?alert("성격이 급하신 것 같아요. 천천히 눌러주세요~"):(t?(s.currentTarget.textContent="오래된 작성 순",s.currentTarget.classList.replace("bg-direction-icon","bg-direction_rotate-icon"),l="+created"):(s.currentTarget.textContent="최근 작성 순",s.currentTarget.classList.replace("bg-direction_rotate-icon","bg-direction-icon"),l="-created"),t=!t,c()),a=!0,setTimeout(()=>{a=!1},e)}}q.addEventListener("click",A());
