import"./tailwind-hLRvZ190.js";import{g as j}from"./index-LZz_RBWS.js";import{g as f}from"./getNode-pa7syr6m.js";import{i as u}from"./insert-c9FKGVoP.js";import{c as g}from"./clear-vWyKvuJ4.js";import{p as s}from"./delay-L14dHocY.js";import{c as x}from"./convertTime-ltT1zPuc.js";import{c as S}from"./checkAuth-CTdHH8Oq.js";import{b as h}from"./Modal-LwrVZ11o.js";let v=!0;function E(t,e,a={}){const n=[];return e.forEach(r=>{const l=s.files.getUrl(t,r,a);n.push(l)}),n}function k(t){const{category:e,comments:a,title:n,description:r,imgField:l,views:c,created:i}=t,{avatar:d,name:b,id:y}=t.expand.user,$=E(t,l).map(o=>`
        <span class="inline-flex justify-center">
        <a class="rounded-lg overflow-hidden hover:shadow-[3px_3px_8px_0px_rgba(0,0,0,0.3),0px_0px_4px_0px_rgba(0,0,0,0.05)] transition-all duration-300" href="${o}" title="새창으로 사진 보기" target="_blank" rel="noopener noreferrer">
          <span >
            <img src="${o}" alt="" />
          </span>
          </a>
        </span> `).join(""),p=s.files.getUrl(t.expand.user,d,{thumb:"0x50"}),A=`
  <div id="article">
  <article class="px-3 py-6 flex flex-col items-start gap-2">
    <span
      class="inline-block p-1 leading-none bg-bluegray-500 text-label-sm text-white rounded"
      >${e}</span
    >

    <div class="h-[40px] flex items-center gap-2">
      <div
        class="w-[30px] h-[30px] rounded-full ${p?"":"bg-contents-content-secondary"} overflow-hidden"
      >${p?`<img class="h-full object-cover" src="${p}" alt="프로필 이미지">`:""}</div>
      <div
        class="h-full text-paragraph-sm font-normal flex flex-col justify-center"
      >
        <p class="h-1/2 flex items-center">${b}</p>
        <span class="h-1/2 flex items-center text-gray-600"
          >연남동 인증 4회 · ${x(i)} · 조회수 ${c}</span
        >
      </div>
    </div>

    <h2 class="text-label-lg font-medium">
      <span class="text-secondary">Q.</span> ${n}
    </h2>

    <p class="text-paragraph-md font-normal leading-[160%]">${r}</p>
  </article>

  <figure class="w-full p-3 flex flex-col gap-5">
    ${$}
  </figure>
</div>
</section>
  `,_=a.map(({id:o,name:L,comment:T,avatar:m,created:U})=>`
    <div class="p-2 flex flex-col gap-1 ">
    <div
      class="px-1 pt-1 flex items-center gap-2 rounded-lg "
    >
    <div
    class="w-[30px] h-[30px] rounded-full ${m?"":"bg-contents-content-secondary"} overflow-hidden"
  >${m?`<img class="h-full object-cover" src="${m}" alt="프로필 이미지">`:""}</div>
      <div
        class="w-24 h-full text-paragraph-sm font-normal flex flex-col justify-center"
      >
        <p class="h-1/2 flex items-center ${y===o?"text-secondary font-bold":""}">
          ${L}
          <span
            class="h-1/2 ml-2 flex items-center text-gray-600"
          ></span>
        </p>
        <span class="h-1/2 flex items-center text-gray-600"
          >연남동 · ${x(U)}</span
        >
      </div>
      </div>
      <div class="flex-1">
        <p class="px-[40px] text-paragraph-md">
          ${T}
        </p>
      </div>
  </div>
    `).join("");return{article:A,comments:_}}function q(t){g("#article"),g("#comments");const{article:e,comments:a}=t;u("#article",e),u("#comments",a),j.timeline().from("main>*",{y:50,opacity:0,stagger:.1}).to("#comments-container",{opacity:1},"-=0.2")}async function w(){if(!S())return;const t=new URL(window.location.href).searchParams.get("id");t===null&&(alert("잘못된 접근입니다."),window.location.href="/src/pages/board/qna.html");const e=await s.collection("qAndA").getOne(t,{expand:"user"});document.title=`엔터 이듬 - 질의응답::${e.title}`,v&&setTimeout(async()=>{await s.collection("qAndA").update(t,{views:e.views+1}),v=!1},2e3),q(k(e)),P.addEventListener("click",D(B))}w();const C=f("#commentInput");C.addEventListener("input",t=>{const e=t.target.nextElementSibling;t.target.value.replace(/\s/g,"")===""?e.classList.replace("bg-send_full-icon","bg-send-icon"):e.classList.replace("bg-send-icon","bg-send_full-icon")});const P=f("#send");async function B(t){const e=t.target.previousElementSibling;if(e.value.replace(/\s/g,"")==="")e.classList.replace("border-transparent","border-red-500"),setTimeout(()=>e.classList.replace("border-red-500","border-transparent"),1e3);else{const a=new URL(window.location.href).searchParams.get("id"),{id:n,name:r,avatar:l}=s.authStore.model,c=s.files.getUrl(s.authStore.model,l,{thumb:"50x0"}),i=await s.collection("qAndA").getOne(a,{fields:"comments"}),d={id:n,created:new Date().getTime(),name:r,comment:e.value,avatar:c};await s.collection("qAndA").update(a,{comments:[d,...i.comments]}),e.value="",await w()}}function D(t,e=1e3){let a=!1;return n=>{n.preventDefault(),a?alert("성격이 급하신 것 같아요. 천천히 눌러주세요~"):(t(n),a=!0,setTimeout(()=>{a=!1},e))}}const I=f("#share");function M(){const[t]=h("📃 주소가 복사되었습니다.",1e3),[e]=h("📃 복사 도중 오류가 발생했습니다.",1e3);return async a=>{try{await navigator.clipboard.writeText(window.location.href),t.showing()}catch{e.showing()}}}I.addEventListener("click",M());
