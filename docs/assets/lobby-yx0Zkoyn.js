import"./tailwind-At2ouQW-.js";import{i as f}from"./insert-c9FKGVoP.js";import{c as u}from"./clear-vWyKvuJ4.js";import{p as l}from"./delay-L14dHocY.js";import{c as h}from"./convertTime-ltT1zPuc.js";import"./getNode-pa7syr6m.js";function x(s){return s.map(e=>{const{messageBox:n,updated:o,id:a,owner:p,originType:r}=e,{members:c}=e.expand,m=n.pop()?.message,t=c.filter(g=>g.id===p)[0],d=l.files.getUrl(t,t.avatar,{thumb:"50x0"});return`
    <li class="w-full p-3 border-b border-b-gray-100 hover:bg-gray-100">
    <a class="w-full flex items-center gap-3" href=${`/src/pages/chatting/room.html?id=${a}`}>
      <div class="w-[45px] h-full rounded-full overflow-hidden shrink-0 flex items-center">
        <img class="w-full aspect-square object-cover" src="${d}" alt="${t.name}" />
      </div>
  
      <div class="flex flex-col">
        <span class="min-w-[100px] text-label-md items-start overflow-hidden text-ellipsis"
          >${r==="together"?e.expand.togetherOriginId.title:t.name}<span
            class="ml-2 text-contents-content-secondary font-normal"
            >${c.length}</span
          >
          <span class="ml-2 text-label-sm text-contents-content-secondary shrink-0"
            >${h(o)} · <span class="p-1 leading-none text-label-sm ${r==="together"?"bg-blue-100 rounded text-secondary":"bg-orange-100 rounded text-orange-500"} ">${r==="together"?"모임":"거래"}</span></span
          ></span
        >
        <span class="block text-paragraph-md text-contents-content-secondary"
          >${m?.slice(0,25).concat("...")||"채팅방에 메세지가 없습니다."}</span
        >
      </div>
    </a>
  </li>
    `}).join("")}async function b(){const s=l.authStore.model.id,e=(await l.collection("chatroom").getFullList({filter:`members ?~ "${s}"`,expand:"members, togetherOriginId, sellingOriginId"})).sort((o,a)=>new Date(a.updated)-new Date(o.updated)),n=x(e);u("#chatroom-list"),f("#chatroom-list",n)}b();
