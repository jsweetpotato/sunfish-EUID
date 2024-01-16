import"./tailwind-Jlr4NQan.js";import{c as f,p as l}from"./delay-YOOEtQ5Y.js";import{g as h}from"./getNode-pa7syr6m.js";import{i as x}from"./insert-c9FKGVoP.js";import{c as b}from"./clear-vWyKvuJ4.js";import{c as w}from"./convertTime-ltT1zPuc.js";const[i,$]=f({title:"😭서비스 준비중입니다.",desc:"열심히 준비중이예요💦<br> 조금만 기다려주세요",buttonText:"알겠어요"});h("#alram").onclick=i.showing;$.onclick=i.closing;function v(s){return s.map(e=>{const{messageBox:o,updated:n,id:a,owner:m,originType:r}=e,{members:c}=e.expand,p=o.pop()?.message,t=c.filter(u=>u.id===m)[0],g=l.files.getUrl(t,t.avatar,{thumb:"50x0"});return`
    <li class="w-full p-3 border-b border-b-gray-100 hover:bg-gray-100">
    <a class="w-full flex items-center gap-3" href=${`/src/pages/chatting/room.html?id=${a}`}>
      <div class="w-[45px] h-full rounded-full overflow-hidden shrink-0 flex items-center">
        <img class="w-full aspect-square object-cover" src="${g}" alt="${t.name}" />
      </div>
  
      <div class="flex flex-col">
        <span class="min-w-[100px] text-label-md items-start overflow-hidden text-ellipsis"
          >${r==="together"?e.expand.togetherOriginId.title:t.name}<span
            class="ml-2 text-contents-content-secondary font-normal"
            >${c.length}</span
          >
          <span class="ml-2 text-label-sm text-contents-content-secondary shrink-0"
            >${w(n)} · <span class="p-1 leading-none text-label-sm ${r==="together"?"bg-blue-100 rounded text-secondary":"bg-orange-100 rounded text-orange-500"} ">${r==="together"?"모임":"거래"}</span></span
          ></span
        >
        <span class="block text-paragraph-md text-contents-content-secondary"
          >${p?.slice(0,25).concat("...")||"채팅방에 메세지가 없습니다."}</span
        >
      </div>
    </a>
  </li>
    `}).join("")}async function y(){const s=l.authStore.model.id,e=(await l.collection("chatroom").getFullList({filter:`members ?~ "${s}"`,expand:"members, togetherOriginId, sellingOriginId"})).sort((n,a)=>new Date(a.updated)-new Date(n.updated)),o=v(e);b("#chatroom-list"),x("#chatroom-list",o)}y();
