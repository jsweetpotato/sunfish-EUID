import"./tailwind-2pOqmYJK.js";import{i as g}from"./insert-c9FKGVoP.js";import{c as u}from"./clear-vWyKvuJ4.js";import{p as r}from"./delay-L14dHocY.js";import{c as x}from"./convertTime-ltT1zPuc.js";import"./getNode-pa7syr6m.js";function h(t){return t.map(e=>{const{messageBox:s,updated:o,id:a,owner:i}=e,{members:l,originId:m}=e.expand,p=s.pop()?.message,n=l.filter(f=>f.id===i)[0],d=r.files.getUrl(n,n.avatar,{thumb:"50x0"});return`
    <li class="w-full p-3 border-b border-b-gray-100 hover:bg-gray-100">
    <a class="w-full flex items-center gap-3" href=${`/src/pages/chatting/room.html?id=${a}`}>
      <div class="w-[45px] h-full rounded-full overflow-hidden shrink-0 flex items-center">
        <img class="w-full aspect-square object-cover" src="${d}" alt="${n.name}" />
      </div>
  
      <div class="flex flex-col">
        <span class="min-w-[100px] text-label-md items-start overflow-hidden text-ellipsis"
          >${m.title}<span
            class="ml-2 text-contents-content-secondary font-normal"
            >${l.length}</span
          >
          <span class="ml-2 text-label-sm text-contents-content-secondary shrink-0"
            >${x(o)}</span
          ></span
        >
        <span class="block text-paragraph-md text-contents-content-secondary"
          >${p?.slice(0,25).concat("...")||"채팅방에 메세지가 없습니다."}</span
        >
      </div>
    </a>
  </li>
    `}).join("")}async function b(){const t=r.authStore.model.id,e=(await r.collection("chatroom").getFullList({filter:`members ~ "${t}"`,expand:"members, originId"})).sort((o,a)=>new Date(a.updated)-new Date(o.updated)),s=h(e);u("#chatroom-list"),g("#chatroom-list",s)}b();
