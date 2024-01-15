import"./tailwind-vaML6LCP.js";import{g as b}from"./index-LZz_RBWS.js";import{g as m}from"./getNode-pa7syr6m.js";import{i as g}from"./insert-c9FKGVoP.js";import{c as x}from"./clear-vWyKvuJ4.js";import{p as n}from"./delay-L14dHocY.js";import{c as f}from"./checkAuth-CTdHH8Oq.js";import{c as h}from"./Modal-LwrVZ11o.js";function p(t){return t.scrollTop=t.scrollHeight}(async function(){if(!f())return;const e=new URL(window.location.href).searchParams.get("id"),a=await n.collection("chatroom").getOne(e,{fields:"members"});(!e||a.members.indexOf(n.authStore.model.id)<0)&&(alert("잘못된 접근입니다."),window.location.href="/src/pages/main/"),await y(),p(m("main")),n.collection("chatroom").subscribe(e,({action:o,record:s})=>{const{members:i}=s,l=s.messageBox.pop(),r=m("#member-count");if(r.textContent=i.length,l.senderId!==n.authStore.model.id){const c=u([l]);g("#message-box",c),p(m("main"))}})})();function u(t){const e=[];return t.length===0?`
    <li class="sorry p-2 flex flex-col text-center">
    <p class="text-paragraph-md text-gray-200">이전 채팅 내역이 없습니다.</p>
  </li>
    `:(t.forEach(a=>{const{created:o,message:s,senderAvatar:i,senderId:l,senderName:r}=a,c=l===n.authStore.model.id;let d="";c?d=`
      <li class="px-3 w-full">
      <div class="flex gap-1 justify-end">
        <span class="mt-auto text-paragraph-sm align-bottom"
          >${new Date(o).toLocaleString().slice(6,-3)}</span
        >
        <span
          class="px-[14px] py-2 max-w-[248px] text-paragraph-md text-white bg-secondary rounded-[20px]"
          >${s}</span
        >
      </div>
    </li>
      `:d=`
      <li class="px-3 w-full">
      <div class="flex gap-2 justify-start">
        <figure
          title="${r}"
          class="mt-1.5 w-[30px] h-[30px] bg-gray-100 shrink-0 rounded-full overflow-hidden"
        >
          <img
            class="w-full"
            src="${i}"
            alt="${r}"
          />
        </figure>
        <div class="flex flex-col text-label-sm font-normal">
          <span>${r}</span>
          <span
            class="px-[14px] py-2 max-w-[248px] text-paragraph-md text-black bg-bluegray-100 rounded-[20px]"
            >${s}</span
          >
        </div>
        <span class="mt-auto text-paragraph-sm align-bottom"
          >${new Date(o).toLocaleString().slice(6,-3)}</span
        >
      </div>
    </li>
      `,e.push(d)}),e.join(""))}async function w(t){const{originType:e,originId:a,owner:o,members:s,messageBox:i}=t,{title:l}=t.expand.originId,r=`
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
          ${l} 대화방
          <span id="member-count" class="text-contents-content-secondary">${s.length}</span>
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
  `,c=u(i);return{header:r,messageBox:c}}function v(t){x("#header-inner"),x("#message-box");const{header:e,messageBox:a}=t;g("#header-inner",e),g("#message-box",a),b.timeline().from("#header-inner>div",{y:50,opacity:0,duration:.2}).from("#message-box>*",{y:50,opacity:0,duration:.2,delay:-.1})}async function y(){const t=new URL(window.location.href).searchParams.get("id"),e=await n.collection("chatroom").getOne(t,{expand:"members, originId"});v(await w(e)),B.addEventListener("click",L(S)),m("#more").addEventListener("click",o=>{const[s,i]=h({title:"😭서비스 준비중입니다.",desc:"열심히 준비중이예요💦<br> 조금만 기다려주세요",buttonText:"알겠어요"});i.addEventListener("click",()=>s.closing()),s.showing()})}const B=m("#send");async function S(t){const e=t.target.previousElementSibling;if(e.value.replace(/\s/g,"")==="")e.classList.replace("border-transparent","border-red-500"),setTimeout(()=>e.classList.replace("border-red-500","border-transparent"),1e3);else{const a=new URL(window.location.href).searchParams.get("id"),{id:o,name:s,avatar:i}=n.authStore.model,l=n.files.getUrl(n.authStore.model,i,{thumb:"50x0"}),r={created:new Date().getTime(),senderId:o,senderName:s,senderAvatar:l,message:e.value};e.value="";const c=await n.collection("chatroom").getOne(a,{fields:"messageBox"});await n.collection("chatroom").update(a,{messageBox:[...c.messageBox,r]});const d=u([r]);g("#message-box",d),p(m("main"))}}function L(t,e=1e3){let a=!1;return o=>{o.preventDefault(),a?alert("성격이 급하신 것 같아요. 천천히 눌러주세요~"):(t(o),a=!0,setTimeout(()=>{a=!1},e))}}
