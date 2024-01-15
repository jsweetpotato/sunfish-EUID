import"./tailwind-hLRvZ190.js";import{c as g,a as c}from"./Modal-LwrVZ11o.js";import{g as a,a as u}from"./getNode-pa7syr6m.js";import{p as s}from"./delay-L14dHocY.js";import{c as p}from"./checkAuth-CTdHH8Oq.js";p();const m=a("#logoutButton"),w=a("#withdrawButton"),h=window.localStorage,f=u(".serviceModal"),[n,b]=g({title:"😭서비스 준비중입니다.",desc:"열심히 준비중이예요💦<br> 조금만 기다려주세요",buttonText:"알겠어요"});f.forEach(o=>{o.onclick=()=>n.showing()});b.onclick=()=>n.closing();const[l,k,x]=c({title:"🏠 로그아웃할까요?",desc:"언제든지 다시 <br/> 로그인하실 수 있어요!",cancelText:"취소",submitText:"확인"}),B=()=>{l.closing()},M=()=>{h.clear(),window.location.href="/src/pages/login/"};k.onclick=B;x.onclick=M;m.onclick=()=>l.showing();const _=localStorage.getItem("pocketbase_auth"),t=JSON.parse(_),[i,S,T]=c({title:"🗑️ 탈퇴할까요?",desc:"계정은 삭제되며, <br/> 복구되지 않습니다.",cancelText:"취소",submitText:"확인"}),$=()=>{i.closing()},v=async()=>{await s.collection("users").delete(t.model.id),localStorage.clear(),window.location.href="/src/pages/login/"};S.onclick=$;T.onclick=v;w.onclick=()=>i.showing();const e=a("#profile"),r=await s.collection("users").getOne(t.model.id,{fields:"avatar, name"}),{name:A}=r;function C(o,d="photo"){return`https://suppose-weather.pockethost.io//api/files/users/${t.model.id}/${o[d]}`}t.model.avatar===""?e.insertAdjacentHTML("afterbegin",`<img
    src="/src/assets/profile-img.svg"
      alt="내 프로필 사진"
      class="size-[68px] rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
      />
    `):e.insertAdjacentHTML("afterbegin",`<img
    src="${C(r,"avatar")}"
    alt="내 프로필 사진"
    class="size-[68px] rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
    />
    `);e.insertAdjacentHTML("afterend",`
  <span aria-label="내 별명" class="text-center text-label-lg">${A}</span>
  `);
