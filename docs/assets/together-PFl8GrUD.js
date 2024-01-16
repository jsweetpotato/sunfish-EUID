import"./tailwind-GolohDhN.js";import{S as y}from"./swiper-core-xIVJDqhu.js";import{g as v}from"./index-LZz_RBWS.js";import{a as u,g as S}from"./getNode-pa7syr6m.js";import{i as g}from"./insert-c9FKGVoP.js";import{c as f}from"./clear-vWyKvuJ4.js";import{p as h}from"./delay-YOOEtQ5Y.js";import{c as $}from"./checkAuth-1jN6PZSr.js";new y(".swiper",{slidesPerView:"auto",spaceBetween:12,freeMode:!0});const d={interestsState:"all",filter:"filterAll"};let p="-created";function C(){return`<li>
  <div class="relative p-3 border-b flex flex-row justify-between gap-1">
    <div class="w-full flex flex-col flex-shrink-1 justify-center items-start gap-3">
      <div class="flex items-center">
        <span class="skeleton-loading w-12 h-4"></span>
      </div>
      <span class="skeleton-loading w-[60%] h-[11px]"></span>
      <span class="skeleton-loading w-[30%] h-[11px]"></span>
      <span class="skeleton-loading w-[30%] h-[11px]"></span>
      <div class="flex gap-1 items-center w-full">       
        <span class="skeleton-loading w-[8%] h-[11px]"></span>
        <span class="skeleton-loading w-[18%] h-[11px]"></span>
      </div>
    </div>
    <span class="skeleton-loading mt-auto w-[12%] h-[11px]"></span>
  </div>
</li>`.repeat(5)}function k(e){const{category:t,date:a,id:r,members:m,isOpen:b,title:x,owner:_,created:w}=e;let{maxMember:n,gender:s,age:l}=e,i="모집중",c="bg-secondary";return n==="제한없음"&&(i="상시모집",c="bg-orange-400"),b||(i="모집완료",c="bg-bluegray-300"),n=n==="제한없음"?n:`${n}명`,s=s==="누구나"?`${s} 참여가능`:`${s}만 참여가능`,l=l==="모든 연령"?l:`${l}대`,`
    <li  class="hover:bg-gray-100">
    <div
      class="relative p-3 flex flex-col justify-center items-start gap-1 border-b border-contents-content-secondary">
    <div class="flex items-center gap-1 mb-7">
      <span
        class="text-label-sm p-1 leading-none ${c} text-white rounded"
        >${i}</span>
      <span
        class="text-label-sm p-1 leading-none bg-bluegray-600 text-white rounded"
        >${t}</span>
    </div>
      <a href="/src/pages/board/togetherView.html?id=${r}"
        class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary ">
        <span class="absolute top-[38px] left-3 w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">${x}</span>
      </a>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people_full-icon bg-no-repeat bg-left"
        >${l} ${s}</span>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-calender-icon bg-no-repeat bg-left"
        >${new Date(a).toLocaleDateString()}</span>
      <div class="w-full flex justify-between">
        <span class="text-paragraph-sm font-normal text-gray-600"
          >연희동 · ${new Date(w).toLocaleDateString()}</span>
        <span
          class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people-icon bg-no-repeat bg-left"
          >${m.length}/${n}</span>
      </div>
    </div>
    </li>
    `}function L(e){const t=[];return e.forEach(a=>{t.push(k(a))}),t}function T(){f("#board-list"),g("#board-list",`
   <div class="sorry p-3 flex flex-col text-center">
     <span class="text-heading-2xl">😅</span>
     <p class="p-1 text-paragraph-lg">게시물이 없습니다.</p>
   </div>
   `),v.from(".sorry",{y:30,opacity:0,duration:.2})}function j(e){if(e.length<1){T();return}f("#board-list"),g("#board-list",e.join(""))}function D(e){const t=[],a={all:"",project:"프로젝트",study:"스터디",food:"음식",hobby:"취미/여가",sports:"운동",reading:"독서",filterAll:"",filterOpen:"true",filterJoin:`members ~ "${h.authStore.model.id}"`};return e.interestsState!=="all"&&t.push(`category = "${a[e.interestsState]}"`),e.filter==="filterOpen"&&t.push(`isOpen = ${a[e.filter]}`),e.filter==="filterJoin"&&t.push(a[e.filter]),t.join("&&")}async function o(){if(!$())return;f("#board-list"),g("#board-list",C());const e=D(d);try{const t=await h.collection("together").getFullList({filter:e,sort:p});j(L(t))}catch{alert("서버 통신을 하는 도중 오류가 발생했습니다. 잠시후 다시 시도해주세요.")}}o();const E=u(".category-button");function A({target:e}){const{id:t}=e;d.interestsState=t,o()}E.forEach(e=>{e.addEventListener("change",A)});const B=S("#sortCreated");function O(e=1e3){let t=!0,a=!1;return r=>{a?alert("성격이 급하신 것 같아요. 천천히 눌러주세요~"):(t?(r.currentTarget.textContent="오래된 작성 순",r.currentTarget.classList.replace("bg-direction-icon","bg-direction_rotate-icon"),p="+created"):(r.currentTarget.textContent="최근 작성 순",r.currentTarget.classList.replace("bg-direction_rotate-icon","bg-direction-icon"),p="-created"),t=!t,o(),a=!0,setTimeout(()=>{a=!1},e))}}B.addEventListener("click",O());const F=u('input[name="filter"]');function N({target:e}){const{id:t}=e;d.filter=t,o()}F.forEach(e=>{e.addEventListener("change",N)});
