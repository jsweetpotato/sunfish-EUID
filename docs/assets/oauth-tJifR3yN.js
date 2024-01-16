import"./tailwind-GolohDhN.js";import{a as N,c as f}from"./delay-YOOEtQ5Y.js";import{c as y,t as i}from"./main_button-o2ruxehI.js";import{g as B}from"./getNode-pa7syr6m.js";const a=document.querySelector("#oauth-form"),L=document.querySelector(".button-wrapper"),s=document.querySelector("#phone"),T=document.querySelector("#back");let u;const l=y({id:"send-button",type:"submit",value:"인증문자 받기"}),d=y({id:"send-button",type:"submit",value:"인증확인"}),[b,x,D]=N({title:"정말 취소하시겠어요?",desc:"시작하기 페이지로 이동하면 작성하신 데이터가 소멸됩니다."}),[m,M]=f({title:"😁인증번호를 확인해주세요!",desc:"",buttonText:"확인"}),[g,q]=f({title:"😥인증번호가 일치하지 않아요!",desc:"인증번호를 확인해주세요!<br>(기억안나면 재발송 누르셈)",buttonText:"확인"}),o=window.localStorage,r={isDrawed:!1,oauthNum:null};M.addEventListener("click",m.closing);q.addEventListener("click",g.closing);L.insertAdjacentElement("beforeend",l);const h="invalid",O=/^[010]+[0-9]{8}$/g,w=e=>e.key>=0&&e.key<=9,j=()=>{let e=!1;return t=>{if(t.currentTarget.value.length>3)e=!0,i(d,e);else{if(!e)return;e=!1,i(d,e)}}},A=()=>{a.insertAdjacentHTML("beforeend",`
  <div class="relative">
    <label for="contentName" class="sr-only">컨텐츠 이름</label>
    <input
      id="oauth"
      type="text"
      inputmode="tel"
      pattern="[0-9]{4,5}"
      maxlength="6"
      required
      class="group-[.invalid]:border-red-500 p-2 rounded border w-full border-contents-content-tertiary text-contents-content-primary"
      placeholder="인증번호를 입력하세요"
    />
  </div>
  <div class="button-wrapper"></div>
  `),a.querySelector(".button-wrapper:last-child").appendChild(d),u=B("#oauth"),u.onkeypress=w,u.oninput=j()},V=async e=>{if(e.preventDefault(),r.oauthNum===u.value){const t=JSON.parse(o.getItem("users-oauth"));t.categorys=JSON.parse(o.getItem("categorys")),o.removeItem("categorys"),t.phone=s.value,o.setItem("users-oauth",JSON.stringify(t)),window.history.replaceState(null,null,"/"),window.location.href="/src/pages/myeuid/editProfile.html"}else g.showing()},C=()=>{let e;const t=()=>{const n=new Uint16Array(1);r.oauthNum=null,setTimeout(()=>{const c=crypto.getRandomValues(n).join("");r.oauthNum=c,m.querySelector("span").innerText=c,m.showing()},1e3)},v=n=>{n.classList.replace("bg-secondary","bg-gray-100"),n.classList.replace("text-white","text-bluegray-800")},$=n=>{const c=Date.now()+120600;return t(),v(n),setInterval(()=>{const k=Date.now(),p=c-k,S=Math.floor(p%(1e3*60*60)/(1e3*60)),I=Math.floor(p%(1e3*60)/1e3);n.textContent=`인증문자 받기(${S}분 ${I}초)`,p<0&&clearInterval(e)},1e3)};return n=>{if(n.preventDefault(),!s.value.match(O)){a.classList.add(h);return}r.isDrawed||(A(),r.isDrawed=!0),a.classList.remove(h),a.classList.add("send"),s.disabled=!0,e&&clearInterval(e),e=$(l)}},P=()=>{let e=!1;return t=>{if(t.currentTarget.value.length===11)e=!0,i(l,e);else{if(!e)return;e=!1,i(l,e)}}};l.onclick=C();d.onclick=V;s.onkeypress=w;s.oninput=P();T.onclick=()=>b.showing();x.onclick=()=>b.closing();D.onclick=()=>{o.clear(),window.history.replaceState(null,null,"/"),window.location.href="/"};
