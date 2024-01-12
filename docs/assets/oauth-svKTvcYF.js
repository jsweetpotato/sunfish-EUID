import"./modulepreload-polyfill-9p4a8sJU.js";/* empty css                 */import{c as S,a as I}from"./Modal-1FvcQ_11.js";import{a as h,t as u}from"./main_button-S1akn1o1.js";import{g as N}from"./getNode-pa7syr6m.js";import"./pb-KemexN1N.js";const a=document.querySelector("#oauth-form"),B=document.querySelector(".button-wrapper"),s=document.querySelector("#phone"),D=document.querySelector("#back");let i;const l=h({id:"send-button",type:"submit",value:"인증문자 받기"}),d=h({id:"send-button",type:"submit",value:"인증확인"}),[g,L]=S({title:"😁인증번호가 발송되었습니다.",desc:"콘솔창에서 인증번호를 확인해주세요!",buttonText:"확인"}),[f,T,x]=I({title:"정말 취소하시겠어요?",desc:"시작하기 페이지로 이동하면 작성하신 데이터가 소멸됩니다."}),o=window.localStorage,r={isDrawed:!1,oauthNum:null};B.insertAdjacentElement("beforeend",l);const m="invalid",M=/^[010]+[0-9]{8}$/g,y=e=>e.key>=0&&e.key<=9,q=()=>{let e=!1;return t=>{if(t.currentTarget.value.length>3)e=!0,u(d,e);else{if(!e)return;e=!1,u(d,e)}}},A=()=>{a.insertAdjacentHTML("beforeend",`
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
  `),a.querySelector(".button-wrapper:last-child").appendChild(d),i=N("#oauth"),i.onkeypress=y,i.oninput=q()},O=async e=>{if(e.preventDefault(),r.oauthNum===i.value){const t=JSON.parse(o.getItem("users-oauth"));t.categorys=JSON.parse(o.getItem("categorys")),o.removeItem("categorys"),t.phone=s.value,o.setItem("users-oauth",JSON.stringify(t)),window.history.replaceState(null,null,"/src/pages/login/"),window.location.href="/src/pages/myeuid/editProfile.html"}},V=()=>{let e;const t=()=>{const n=new Uint16Array(1);r.oauthNum=null,g.showing(),setTimeout(()=>{const c=crypto.getRandomValues(n).join("");r.oauthNum=c,console.log(c)},2e3)},b=n=>{n.classList.replace("bg-secondary","bg-gray-100"),n.classList.replace("text-white","text-bluegray-800")},w=n=>{const c=Date.now()+120600;return t(),b(n),setInterval(()=>{const v=Date.now(),p=c-v,$=Math.floor(p%(1e3*60*60)/(1e3*60)),k=Math.floor(p%(1e3*60)/1e3);n.textContent=`인증문자 받기(${$}분 ${k}초)`,p<0&&clearInterval(e)},1e3)};return n=>{if(n.preventDefault(),!s.value.match(M)){a.classList.add(m);return}r.isDrawed||(A(),r.isDrawed=!0),a.classList.remove(m),a.classList.add("send"),s.disabled=!0,e&&clearInterval(e),e=w(l)}},C=()=>{let e=!1;return t=>{if(t.currentTarget.value.length===11)e=!0,u(l,e);else{if(!e)return;e=!1,u(l,e)}}};L.onclick=()=>g.closing();l.onclick=V();d.onclick=O;s.onkeypress=y;s.oninput=C();D.onclick=()=>f.showing();T.onclick=()=>f.closing();x.onclick=()=>{o.clear(),window.history.replaceState(null,null,"/src/pages/login/"),window.location.href="/src/pages/login/"};
