import"./tailwind-hLRvZ190.js";import{c as k,g as i}from"./index-zhyd10cS.js";import{a as $,g as r}from"./getNode-pa7syr6m.js";import{i as h,a as j}from"./insert-c9FKGVoP.js";import{c as b}from"./clear-vWyKvuJ4.js";import{p as d}from"./delay-L14dHocY.js";import{c as x}from"./convertTime-ltT1zPuc.js";import{c as L}from"./Modal-LwrVZ11o.js";let u={programming:!1,design:!1,"ui/ux":!1,frontend:!1,backend:!1,publishing:!1,ai:!1,blockchain:!1};const g={programming:!1,design:!1,"ui/ux":!1,frontend:!1,backend:!1,publishing:!1,ai:!1,blockchain:!1};async function C(){return(await d.collection("users").getOne(d.authStore.model.id,{fields:"categorys"})).categorys}function S({target:e}){const{id:t}=e,a=e.nextElementSibling;e.checked?(a.textContent="팔로우 취소",g[t]=!0):(a.textContent="팔로우",g[t]=!1)}function E(e){e.length!==0&&e.forEach(t=>{t==="ui/ux"&&(t="uiux");const a=r(`input#${t}`),n=a.nextElementSibling;a.checked=!0,u[t]=!0,g[t]=!0,n.textContent="팔로우 취소"})}(async function(){if(!k())return;$('input[type="checkbox"]').forEach(n=>{n.addEventListener("change",S)});const a=await C();E(a),w()})();function D(){return`<li>
  <div
    class="relative p-3 border-b flex flex-row justify-between gap-1 border-contents-content-secondary"
  >
    <div
      class="w-[calc(100%-70px)] flex flex-col flex-shrink-1 justify-center items-start gap-1"
    >
      <div class="flex items-center gap-1">
        <span class="skeleton-loading w-7 h-3"></span>
        <span class="skeleton-loading w-7 h-3"></span>
      </div>
      <span class="skeleton-loading w-[70%] h-3"> </span>
      <span class="skeleton-loading w-[90%] h-3"></span>
      <span class="skeleton-loading w-[30%] h-3"></span>
    </div>

    <div
      class="w-[70px] min-w-[70px] flex justify-center items-center"
    >
      <div class="w-full aspect-square skeleton-loading"></div>
    </div>
  </div>
</li>`.repeat(7)}function M(e){const{category:t,date:a,id:n,members:s,title:c,owner:f,created:m}=e;let{maxMember:l,gender:o,age:p}=e;return l=l==="제한없음"?l:`${l}명`,o=o==="누구나"?`${o} 참여가능`:`${o}만 참여가능`,p=p==="모든 연령"?p:`${p}대`,`
    <li  class="hover:bg-gray-100 ">
    <div
      class="relative p-3 flex flex-col justify-center items-start gap-1 border-b">
    <div class="flex items-center gap-1 mb-7">
      <span
        class="text-label-sm p-1 leading-none bg-bluegray-600 text-white rounded"
        >같이해요</span>
      <span
        class="text-label-sm p-1 leading-none bg-tertiary text-white rounded"
        >${t}</span>
    </div>
      <a href="/src/pages/board/togetherView.html?id=${n}"
        class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary ">
        <span class="absolute top-[38px] left-3 w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">${c}</span>
      </a>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people_full-icon bg-no-repeat bg-left"
        >${p} ${o}</span>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-calender-icon bg-no-repeat bg-left"
        >${new Date(a).toLocaleDateString()}</span>
      <div class="w-full flex justify-between">
        <span class="text-paragraph-sm font-normal text-gray-600"
          >연희동 · ${x(m)}</span>
        <span
          class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people-icon bg-no-repeat bg-left"
          >${s.length}/${l}</span>
      </div>
    </div>
    </li>
    `}function T(e){const{id:t,category:a,title:n,imgField:s,comments:c,views:f,created:m}=e;let{description:l}=e;l=l.replace(/</g,"&lt;").replace(/>/g,"&gt;");const o=s.length===0?"":d.files.getUrl(e,s[0],{thumb:"0x60"});return`
    <li class="hover:bg-gray-100 ">
    <div
      class="relative p-3 border-b flex flex-row justify-between gap-1"

    >
      <div
        class="w-[calc(100%-70px)] flex flex-col flex-shrink-1 justify-center items-start gap-1">
        <div class="flex items-center gap-1 mb-7">
          <span
            class="text-label-sm p-1 leading-none bg-bluegray-600 text-white rounded"
            >질의응답</span>
          <span
            class="text-label-sm p-1 leading-none bg-tertiary text-white rounded"
            >${a}</span>
        </div>
        <a href="/src/pages/board/qnaView.html?id=${t}"
          class="absolute top-0 left-0 w-full h-full flex-auto text-paragraph-md font-normal text-contents-content-primary">
          <span class="absolute top-[38px] left-3 ${o?"w-[65%]":"w-[90%]"} overflow-hidden whitespace-nowrap text-ellipsis">${n}</span>
        </a>
        <span
          class="description w-full text-paragraph-sm font-normal text-gray-600 bg-transparent overflow-hidden whitespace-nowrap text-ellipsis resize-none"
          >${l.slice(0,50)}</span>
        <span class="text-paragraph-sm font-normal text-gray-600"
          >연희동 · ${x(m)} · 조회 ${f} · 댓글 0</span>
      </div>
      ${o?`
          <div
        class="w-[70px] min-w-[70px] flex justify-center items-center">
          <div
      class="w-full aspect-square overflow-hidden border border-gray-300 rounded">
      <img
      class="w-full h-full object-cover"
        src="${o}"
        alt="썸네일"
        loading="lazy"
        />
    </div>
    </div>`:""}
    </div>
    </li>
`}function B(e){const t=[];return e.forEach(a=>{const{type:n}=a;n==="together"&&t.push(M(a)),n==="qna"&&t.push(T(a))}),t}function A(){h("#board-list",`
   <div class="sorry p-3 flex flex-col text-center">
     <span class="text-heading-2xl">😅</span>
     <p class="p-1 text-paragraph-lg">게시물이 없습니다.</p>
   </div>
   `),i.from(".sorry",{y:30,opacity:0,duration:.2})}function q(e){if(e.length===0){A();return}b("#board-list"),h("#board-list",e.join(""))}function R(e){const t={programming:"프로그래밍",design:"인터렉션 디자인",uiux:"UI/UX",frontend:"프론트엔드",backend:"백엔드",publishing:"퍼블리싱",ai:"AI",blockchain:"블록체인"},n=Object.entries(e).filter(([c,f])=>f);if(n.length===0)return"";const s=[];return n.forEach(([c])=>{s.push(`category = "${t[c]}"`)}),s.join("||")}async function w(){b("#board-list"),h("#board-list",D());const e=R(u);try{const t=await d.collection("together").getFullList(),a=await d.collection("qAndA").getFullList({filter:e}),n=[...t,...a].sort((s,c)=>new Date(c.created).getTime()-new Date(s.created).getTime());q(B(n))}catch{alert("서버 통신을 하는 도중 오류가 발생했습니다. 잠시후 다시 시도해주세요.")}}const F=r("#modalDimmed"),O=r("#openModal"),U=r("#closeModal");function V(){i.timeline().to("#modalDimmed",{opacity:1,display:"block",duration:.3}).to("#modal",{bottom:0,duration:.3,onComplete(){this.targets()[0].focus()}},"<")}function y(e){this!==e.target||(i.to("#modalDimmed",{opacity:0,duration:.3,onComplete(){i.set("#modalDimmed",{clearProps:"all"}),i.set("#modal",{clearProps:"all"})}}),Object.entries(g).every(([a,n])=>u[a]===n))||(u={...g},w())}O.addEventListener("click",V);U.addEventListener("click",y);F.addEventListener("click",y);const v=r("#write");function I(e){e.classList.toggle("bg-plus-icon"),e.classList.toggle("bg-exchange-close-icon"),e.classList.toggle("bg-white"),e.classList.toggle("bg-secondary")}const N={"board/writeTogether":"🎎 같이해요","board/writeQna":"❓ 질의응답"},P=Object.entries(N).map(([e,t])=>`
<a
  href="/src/pages/${e}.html"
  class="block px-5 py-2.5 text-label-md rounded-full bg-white hover:bg-secondary hover:text-white"
  >${t}</a
>
`).join(""),z=` <nav id="write-menu" class="w-full flex flex-col gap-1">${P}</nav>`;function Q(e){if(e)r("#write-menu").remove(),i.to("#dimmed",{display:"none",opacity:0,duration:.5});else{const t=i.timeline();j("#write-container",z),t.to("#dimmed",{display:"block",opacity:1,duration:.1}).from("#write-menu > *",{opacity:0,y:80,stagger:.08,reversed:!0},"<")}}function W(){let e=!1;return t=>{I(t.target),Q(e),e=!e}}v.addEventListener("click",W());r("#dimmed").addEventListener("click",e=>{i.to("#dimmed",{display:"none",opacity:0,duration:.5}),v.click()});const _=r("#notification");_.addEventListener("click",e=>{e.preventDefault();const[t,a]=L({title:"😭서비스 준비중입니다.",desc:"열심히 준비중이예요💦<br> 조금만 기다려주세요",buttonText:"알겠어요"});a.addEventListener("click",()=>t.closing()),t.showing()});
