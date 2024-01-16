import"./tailwind-At2ouQW-.js";import{g as v}from"./index-LZz_RBWS.js";import{g as p}from"./getNode-pa7syr6m.js";import{i as g}from"./insert-c9FKGVoP.js";import{c as x}from"./clear-vWyKvuJ4.js";import{p as o}from"./delay-L14dHocY.js";import{c as y}from"./comma-f4do0chS.js";import{c as w}from"./checkAuth-CTdHH8Oq.js";import{c as $}from"./Modal-LwrVZ11o.js";function m(e){return e.scrollTop=e.scrollHeight}(async function(){if(!w())return;const t=new URL(window.location.href).searchParams.get("id"),a=await o.collection("chatroom").getOne(t,{fields:"members, originType"});(!t||a.members.indexOf(o.authStore.model.id)<0)&&(alert("잘못된 접근입니다."),window.location.href="/src/pages/main/"),await L(a.originType),m(p("main")),o.collection("chatroom").subscribe(t,({action:r,record:n})=>{const{members:l,originType:s}=n,i=n.messageBox.pop();let d;if(s==="together"&&(d=p("#member-count"),d.textContent=l.length),i.senderId!==o.authStore.model.id){const c=b([i]);g("#message-box",c),m(p("main"))}})})();function b(e){const t=[];return e.length===0?`
    <li class="sorry p-2 flex flex-col text-center">
    <p class="text-paragraph-md text-gray-200">이전 채팅 내역이 없습니다.</p>
  </li>
    `:(e.forEach(a=>{const{created:r,message:n,senderAvatar:l,senderId:s,senderName:i}=a,d=s===o.authStore.model.id;let c="";d?c=`
      <li class="px-3 w-full">
      <div class="flex gap-1 justify-end">
        <span class="mt-auto text-paragraph-sm align-bottom"
          >${new Date(r).toLocaleString().slice(6,-3)}</span
        >
        <span
          class="px-[14px] py-2 max-w-[248px] text-paragraph-md text-white bg-secondary rounded-[20px]"
          >${n}</span
        >
      </div>
    </li>
      `:c=`
      <li class="px-3 w-full">
      <div class="flex gap-2 justify-start">
        <figure
          title="${i}"
          class="mt-1.5 w-[30px] h-[30px] bg-gray-100 shrink-0 rounded-full overflow-hidden"
        >
          <img
            class="w-full"
            src="${l}"
            alt="${i}"
          />
        </figure>
        <div class="flex flex-col text-label-sm font-normal">
          <span>${i}</span>
          <span
            class="px-[14px] py-2 max-w-[248px] text-paragraph-md text-black bg-bluegray-100 rounded-[20px]"
            >${n}</span
          >
        </div>
        <span class="mt-auto text-paragraph-sm align-bottom"
          >${new Date(r).toLocaleString().slice(6,-3)}</span
        >
      </div>
    </li>
      `,t.push(c)}),t.join(""))}async function T(e){const{originType:t,owner:a,members:r,messageBox:n}=e,{members:l}=e.expand,s=t==="together"?"togetherOriginId":"sellingOriginId",i=l.find(f=>f.id===a).name,d=o.files.getUrl(e.expand[s],e.expand[s].productImages,{thumb:"0x300"}),c=`
  <div class="flex justify-between items-center">
  <div class="flex gap-3 items-center">
    <a
      href="/src/pages/chatting/lobby.html"
      role="button"
      aria-label="돌아가기"
      class="bg-direction-icon block w-10 h-10 bg-no-repeat bg-center rotate-90 hover:bg-gray-100 hover:rounded transition-all duration-300"
    ></a>
    <p class="text-label-md">
      ${i}
      <span
        class="px-1 py-[2px] text-label-sm font-normal align-middle text-secondary bg-blue-100 rounded-full"
        >37.8℃</span
      >
    </p>
  </div>
  <div class="flex items-center">
    <button
      id="more"
      type="button"
      aria-label="더보기"
      class="bg-hamburger-icon w-10 h-10 bg-no-repeat bg-center hover:bg-gray-100 hover:rounded transition-all duration-300"
    ></button>
  </div>
</div>
<a  href="/src/pages/exchange/exchangeDetail.html?id=${e.expand[s].id}" class="px-3 pt-2 pb-1 flex gap-2 hover:bg-gray-100">
    <figure class="w-[34px] h-[34px] rounded bg-gray-300 overflow-hidden">
      <img
        class="w-full object-cover"
        src="${d}"
        alt=""
      />
    </figure>
  <div>
    <p class="text-label-sm">
      판매중 <span class="font-normal">${e.expand[s].title}</span>
    </p>
    <span class="text-label-sm">${y(+e.expand[s].price)}</span>
  </div>
</a>
<div class="px-3 py-1 border-b border-b-contents-content-tertiary">
  <button
  id="reservation"
    class="pl-[27px] pr-3 py-1.5 text-paragraph-sm bg-calender_black-icon border border-contents-content-secondary rounded-md bg-white bg-no-repeat bg-[7px] bg-[length:14px_14px] hover:brightness-95 transition-all duration-300"
  >
    약속 잡기
  </button>
  <button
    id="pay"
    class="pl-[27px] pr-3 py-1.5 text-paragraph-sm bg-won-icon border border-contents-content-secondary rounded-md bg-white bg-no-repeat bg-[7px] bg-[length:14px_14px] hover:brightness-95 transition-all duration-300"
  >
    송금 하기
  </button>
</div>
  `,u=`
  <div
          class="flex justify-between items-center border-b border-b-contents-content-tertiary"
        >
          <div class="flex gap-3 items-center">
            <a
              href="/src/pages/chatting/lobby.html"
              role="button"
              aria-label="돌아가기"
              class="bg-direction-icon block w-9 h-9 bg-no-repeat bg-center rotate-90 hover:bg-gray-100 hover:rounded transition-all duration-300"
            ></a>
          </div>
          <h1 class="text-label-md max-[340px]:text-label-sm">
          ${e.expand[s].title} 대화방
          <span id="member-count" class="text-contents-content-secondary">${r.length}</span>
        </h1>
          <div class="flex items-center">
            <button
              id="more"
              type="button"
              aria-label="더보기"
              class="bg-hamburger-icon w-9 h-9 bg-no-repeat bg-center hover:bg-gray-100 hover:rounded transition-all duration-300"
            ></button>
          </div>
        </div>
  `,h=b(n);return{header:t==="together"?u:c,messageBox:h}}function B(e){x("#header-inner"),x("#message-box");const{header:t,messageBox:a}=e;g("#header-inner",t),g("#message-box",a),v.timeline().from("#header-inner",{y:50,opacity:0,duration:.2}).from("#message-box>*",{y:50,opacity:0,duration:.2,delay:-.1})}async function L(e){const t=e,a=new URL(window.location.href).searchParams.get("id"),r=await o.collection("chatroom").getOne(a,{expand:`members, ${t}OriginId`});B(await T(r)),S.addEventListener("click",I(k));const[n,l]=$({title:"😭서비스 준비중입니다.",desc:"열심히 준비중이예요💦<br> 조금만 기다려주세요",buttonText:"알겠어요"});l.addEventListener("click",()=>n.closing()),p("#more").addEventListener("click",()=>n.showing()),p("#reservation")?.addEventListener("click",()=>n.showing()),p("#pay")?.addEventListener("click",()=>n.showing())}const S=p("#send");async function k(e){const t=e.target.previousElementSibling;if(t.value.replace(/\s/g,"")==="")t.classList.replace("border-transparent","border-red-500"),setTimeout(()=>t.classList.replace("border-red-500","border-transparent"),1e3);else{const a=new URL(window.location.href).searchParams.get("id"),{id:r,name:n,avatar:l}=o.authStore.model,s=o.files.getUrl(o.authStore.model,l,{thumb:"50x0"}),i={created:new Date().getTime(),senderId:r,senderName:n,senderAvatar:s,message:t.value};t.value="";const d=await o.collection("chatroom").getOne(a,{fields:"messageBox"});await o.collection("chatroom").update(a,{messageBox:[...d.messageBox,i]});const c=b([i]);g("#message-box",c),m(p("main"))}}function I(e,t=1e3){let a=!1;return r=>{r.preventDefault(),a?alert("성격이 급하신 것 같아요. 천천히 눌러주세요~"):(e(r),a=!0,setTimeout(()=>{a=!1},t))}}
