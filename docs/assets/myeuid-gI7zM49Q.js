import"./tailwind-GolohDhN.js";import{c as r,a as c,p as g}from"./delay-YOOEtQ5Y.js";import{g as e,a as d}from"./getNode-pa7syr6m.js";import{c as u}from"./checkAuth-1jN6PZSr.js";const p=localStorage.getItem("login"),m=e("#logoutButton"),f=e("#withdrawButton"),b=window.localStorage;JSON.parse(p)&&u();const h=d(".serviceModal"),[a,w]=r({title:"😭서비스 준비중입니다.",desc:"열심히 준비중이예요💦<br> 조금만 기다려주세요",buttonText:"알겠어요"});h.forEach(t=>{t.onclick=()=>a.showing()});w.onclick=()=>a.closing();const[l,x,k]=c({title:"🏠 로그아웃할까요?",desc:"언제든지 다시 <br/> 로그인하실 수 있어요!",cancelText:"취소",submitText:"확인"}),B=()=>{l.closing()},_=()=>{b.clear(),window.location.href="/"};x.onclick=B;k.onclick=_;m.onclick=()=>l.showing();const M=localStorage.getItem("pocketbase_auth"),s=JSON.parse(M);c({title:"🗑️ 탈퇴할까요?",desc:"계정은 삭제되며, <br/> 복구되지 않습니다.",cancelText:"취소",submitText:"확인"});f.onclick=a.showing;const o=e("#profile"),n=await g.collection("users").getOne(s.model.id,{fields:"avatar, name"}),{name:T}=n;function S(t,i="photo"){return`https://suppose-weather.pockethost.io//api/files/users/${s.model.id}/${t[i]}`}s.model.avatar===""?o.insertAdjacentHTML("afterbegin",`<img
    src="/src/assets/profile-img.svg"
      alt="내 프로필 사진"
      class="size-[68px] rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
      />
    `):o.insertAdjacentHTML("afterbegin",`<img
    src="${S(n,"avatar")}"
    alt="내 프로필 사진"
    class="size-[68px] rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
    />
    `);o.insertAdjacentHTML("afterend",`
  <span aria-label="내 별명" class="text-center text-label-lg">${T}</span>
  `);
