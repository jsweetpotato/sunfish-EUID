import"./tailwind-Jlr4NQan.js";import{g as i}from"./index-LZz_RBWS.js";import{g as s,a as d}from"./getNode-pa7syr6m.js";import{a as m}from"./insert-c9FKGVoP.js";import{C as u,c as h}from"./delay-YOOEtQ5Y.js";import{c as b}from"./clear-vWyKvuJ4.js";import{c as f}from"./comma-f4do0chS.js";import{c as x}from"./checkAuth-1jN6PZSr.js";const c=new u("https://suppose-weather.pockethost.io/"),o=s(".content");function w(t){const e=t.target.closest(".heartContainer");if(e){const a=e.querySelector(".heart-bg"),r=a.nextElementSibling;let n=Number(r.innerText)||0;a.classList.contains("bg-heart-icon")?(n+=1,a.classList.add("bg-heart-full-icon"),a.classList.remove("bg-heart-icon")):(n=Math.max(n-1,0),a.classList.remove("bg-heart-full-icon"),a.classList.add("bg-heart-icon")),r.innerText=n}}async function v(){if(!x())return;const t=await c.collection("selling").getFullList("pb/collections/selling");b(o),t.forEach(e=>{const a=e.tradingType==="nanum"?'<span class="text-label-sm text-white rounded-[4px] gap-2 grow bg-no-repeat py-[2px] px-1 bg-secondary">나눔</span>':"";o.insertAdjacentHTML("afterbegin",`
      <div class=" exchange-list hover:bg-gray-100 flex p-3 gap-3 justify-center items-center border-b cursor-pointer relative" id="${e.id}">
        <figure>
          <img src="${c.files.getUrl(e,e.productImages,{thumb:"0x300"})}" alt="${e}" class="w-[95px] h-[95px] object-cover grow rounded-lg ">
        </figure>
        <div class="flex flex-col grow p-3">
          <a href="/src/pages/exchange/exchangeDetail.html?id=${e.id}" 
          class="text-paragraph-md absolute w-full h-full top-0 left-0">
          <span class='absolute top-5 left-[130px]'>${e.title}</span>
          </a>
          <span class="text-paragraph-sm" aria-label="판매위치 • 작성시간">마포구 신수동 • 44분전</span>
          <div class="gap-1 grow w-full items-center">
            ${a}
            <span class="text-label-sm" aria-label="판매가격">${f(e.price)}원</span>
          </div>
          <button type="button" class="heartContainer flex h-8 gap-[1px] min-w-8 absolute right-3 bottom-2 pt-6 items-center justify-end">
            <span class="heart-bg bg-heart-icon p-2 bg-contain bg-no-repeat" aria-label="좋아요 표시하기"></span>
            <span class="text greatCount text-paragraph-sm text-right font-sans heartCount">0</span>
          </button>
        </div>
      </div>
      `)})}o.addEventListener("click",w);const y=s("#alarm"),L=d(".modal"),l=s("#write"),k={"exchange/exchangeMake":"🎧 기기거래","":"⌨️ 프로젝트 구인","#":"💻 과외/클래스"},[g,C]=h({title:"서비스 준비중입니다",desc:"빠른시일 내에 업데이트 할게요~이용에 불편을 드려 죄송합니다!",buttonText:"확인"});function p(t){t.preventDefault(),g.showing()}const $=Object.entries(k).map(([t,e])=>t===""||t==="#"?`
        <a
        class="submenu-item block px-4 py-2.5 text-label-md rounded-full bg-white hover:bg-secondary hover:text-white"
        onclick="event.preventDefault();"
        >${e}</a
      >
        `:`
        <a
        href="/src/pages/${t}.html"
        class="submenu-item block px-4 py-2.5 text-label-md rounded-full bg-white hover:bg-secondary hover:text-white"
        >${e}</a
      >
        `).join(""),E=` <nav id="write-menu" class="w-full flex flex-col gap-2">${$}</nav>`;function M(t){if(t)s("#write-menu").remove(),i.to("#dimmed",{display:"none",opacity:0,duration:.5});else{const e=i.timeline();m("#write-container",E),e.to("#dimmed",{display:"block",opacity:1,duration:.05}).from("#write-menu > *",{opacity:0,y:50,stagger:.04,reversed:!0},"<")}}function j(t){t.classList.toggle("bg-plus-icon"),t.classList.toggle("bg-exchange-close-icon"),t.classList.toggle("bg-white"),t.classList.toggle("bg-secondary")}function T(){let t=!1;return e=>{j(e.target),M(t),t=!t}}l.addEventListener("click",T());s("#dimmed").addEventListener("click",()=>{i.to("#dimmed",{display:"none",opacity:0,duration:.5}),l.click()});L.forEach(t=>{t.addEventListener("click",p)});y.addEventListener("click",p);C.addEventListener("click",g.closing);v();
