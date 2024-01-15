import"./tailwind-hLRvZ190.js";import{c as p,g as i}from"./index-dUkrqALE.js";import{g as n,a as d}from"./getNode-pa7syr6m.js";import{a as u}from"./insert-c9FKGVoP.js";import{C as m}from"./delay-L14dHocY.js";import{c as h}from"./Modal-LwrVZ11o.js";function b(t,e="photo"){return`https://suppose-weather.pockethost.io//api/files/${t.collectionId}/${t.id}/${t[e]}`}function f(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}const x=new m("https://suppose-weather.pockethost.io/"),r=n(".content");function w(t){const e=t.target.closest(".heartContainer");if(e){const a=e.querySelector(".heart-bg"),o=a.nextElementSibling;let s=Number(o.innerText)||0;a.classList.contains("bg-heart-icon")?(s+=1,a.classList.add("bg-heart-full-icon"),a.classList.remove("bg-heart-icon")):(s=Math.max(s-1,0),a.classList.remove("bg-heart-full-icon"),a.classList.add("bg-heart-icon")),o.innerText=s}}async function v(){if(!p())return;(await x.collection("selling").getFullList("pb/collections/selling")).forEach(e=>{const a=e.tradingType==="nanum"?'<span class="text-label-sm text-white rounded-[4px] gap-2 grow bg-no-repeat py-[2px] px-1 bg-secondary">나눔</span>':"";r.insertAdjacentHTML("afterbegin",`
      <div class=" exchange-list hover:bg-gray-100 flex p-3 gap-3 justify-center items-center border-b cursor-pointer relative" id="${e.id}">
        <figure>
          <img src="${b(e,"productImages")}" alt="${e}" class="w-[95px] h-[95px] object-cover grow rounded-lg ">
        </figure>
        <div class="flex flex-col grow p-3">
          <a href="/src/pages/exchange/exchangeDetail.html#${e.id}" 
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
      `)}),i.from(".exchange-list",{x:-500,duration:.3,stagger:.1})}r.addEventListener("click",w);const y=n("#alarm"),L=d(".modal"),c=n("#write"),k={"exchange/exchangeMake":"🎧 기기거래","":"⌨️ 프로젝트 구인","#":"💻 과외/클래스"},[l,$]=h({title:"서비스 준비중입니다",desc:"빠른시일 내에 업데이트 할게요~이용에 불편을 드려 죄송합니다!",buttonText:"확인"});function g(t){t.preventDefault(),l.showing()}const C=Object.entries(k).map(([t,e])=>t===""||t==="#"?`
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
        `).join(""),E=` <nav id="write-menu" class="w-full flex flex-col gap-2">${C}</nav>`;function M(t){if(t)n("#write-menu").remove(),i.to("#dimmed",{display:"none",opacity:0,duration:.5});else{const e=i.timeline();u("#write-container",E),e.to("#dimmed",{display:"block",opacity:1,duration:.05}).from("#write-menu > *",{opacity:0,y:50,stagger:.04,reversed:!0},"<")}}function j(t){t.classList.toggle("bg-plus-icon"),t.classList.toggle("bg-exchange-close-icon"),t.classList.toggle("bg-white"),t.classList.toggle("bg-secondary")}function T(){let t=!1;return e=>{j(e.target),M(t),t=!t}}c.addEventListener("click",T());n("#dimmed").addEventListener("click",()=>{i.to("#dimmed",{display:"none",opacity:0,duration:.5}),c.click()});L.forEach(t=>{t.addEventListener("click",g)});y.addEventListener("click",g);$.addEventListener("click",l.closing);v();
