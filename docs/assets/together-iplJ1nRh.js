import"./modulepreload-polyfill-9p4a8sJU.js";/* empty css                 */import{S as p}from"./swiper-core--fCusGQO.js";new p(".swiper",{slidesPerView:"auto",spaceBetween:12,freeMode:!0});const g={together:[{id:0,title:"youtube 클론 프젝 같이하실분~",age:"누구나 참여가능",datetime:"내일, 오후 7:00",local:"응암동",createdAt:new Date().getTime(),maxMember:3,currentMember:["kim","lee"]},{id:1,title:"멋사플레이스 클론스터디 하실분",age:"20대",datetime:"오늘, 오후 8:00",local:"비전동",createdAt:new Date().getTime(),maxMember:4,currentMember:["jo"]},{id:2,title:"알고리즘 매일 아침마다 인증할 분",age:"누구나 참여 가능",datetime:"5월 1일, 오전 10:00",local:"통복동",createdAt:new Date().getTime(),maxMember:5,currentMember:["jo","kang","choi"]},{id:3,title:"youtube 클론 프젝 같이하실분~",age:"누구나 참여가능",datetime:"내일, 오후 7:00",local:"응암동",createdAt:new Date().getTime(),maxMember:3,currentMember:["kim","lee"]},{id:4,title:"멋사플레이스 클론스터디 하실분",age:"20대",datetime:"오늘, 오후 8:00",local:"비전동",createdAt:new Date().getTime(),maxMember:4,currentMember:["jo"]},{id:5,title:"알고리즘 매일 아침마다 인증할 분",age:"누구나 참여 가능",datetime:"5월 1일, 오전 10:00",local:"통복동",createdAt:new Date().getTime(),maxMember:5,currentMember:["jo","kang","choi"]}]};function u(e){const{together:t}=e,a=[];return t.forEach(n=>{const{title:o,age:l,datetime:s,local:c,createdAt:T,maxMember:i,currentMember:d}=n,m=`
    <li  class="hover:bg-gray-100 transition-all">
    <div
      class="relative p-3 flex flex-col justify-center items-start gap-1 border-b border-contents-content-secondary"
      
    >
    <div class="flex items-center gap-1 mb-7">
      <span
      class="text-label-sm px-1 bg-bluegray-600 text-white rounded"
      >스터디</span
    >
    <span
      class="text-label-sm px-1 bg-tertiary text-white rounded"
      >인기</span
    >
    </div>
     
      <a href="/src/pages/board/togetherView.html"
        class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary "
      >
        <span class="absolute top-8 left-3 w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">${o}</span>
      </a>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people_full-icon bg-no-repeat bg-left"
        >${l}</span
      >
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-calender-icon bg-no-repeat bg-left"
        >${s}</span
      >
      <div class="w-full flex justify-between">
        <span class="text-paragraph-sm font-normal text-gray-600"
          >${c} · 9분 전</span
        >
        <span
          class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people-icon bg-no-repeat bg-left"
          >${d.length}/${i}명</span
        >
      </div>
    </div>
    </li>
    `;a.push(m)}),[...a].join("")}const b=document.querySelector("#board-list");b.insertAdjacentHTML("beforeend",u(g));function f(){document.querySelectorAll(".swiper-slide").forEach(t=>{const[a,r]=t.children;a.classList.remove("border-secondary"),r.classList.remove("text-secondary")})}function x(e){f(),e.currentTarget.classList.add("border-secondary"),e.currentTarget.nextElementSibling.classList.add("text-secondary")}const h=document.querySelectorAll(".category-button");h.forEach(e=>{e.addEventListener("click",x)});const y=document.querySelector("#sort");function w(){let e=!0;return t=>{e?(t.currentTarget.textContent="오래된 작성 순",t.currentTarget.classList.replace("bg-direction-icon","bg-direction_rotate-icon")):(t.currentTarget.textContent="최근 작성 순",t.currentTarget.classList.replace("bg-direction_rotate-icon","bg-direction-icon")),e=!e}}y.addEventListener("click",w());
