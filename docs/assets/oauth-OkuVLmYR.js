import"./modulepreload-polyfill-9p4a8sJU.js";import{a as o,t as a}from"./main_button-jf1SmUje.js";/* empty css                 */const n=document.querySelector("#oauth-form"),l=document.querySelector("#phone"),r=o({id:"formbutton",type:"submit",value:"인증문자 받기"}),s=document.querySelector("body");n.insertAdjacentElement("beforeend",r);const c=({number:e})=>`
  <div
  class="flex flex-col px-3 min-w-screen max-w-screen min-h-screen mx-auto"
>
  <header class="sticky top-0 bg-white w-full h-10 pe-3">
    <div class="flex justify-between items-center">
      <a
        href="./category.html"
        role="button"
        aria-label="돌아가기"
        class="bg-direction-icon block w-10 h-10 bg-no-repeat bg-center rotate-90 hover:bg-gray-100"
      ></a>
    </div>
  </header>
  <main>
    <p class="text-label-lg text-prima mt-[1.125rem]">
      안녕하세요!<br />
      휴대폰 번호로 가입해주세요.
    </p>
    <p class="text-paragraph-sm mb-[1.125rem]">
      휴대폰 번호는 안전하게 보관되며 서로에게 공개되지 않아요.
    </p>
    <form
      id="oauth-form"
      action="/"
      class="w-full h-full flex flex-col gap-3"
    >
      <label for="contentName" class="sr-only">컨텐츠 이름</label>
      <div></div>
    </form>
    <p class="mt-3 text-paragraph-sm text-center">
      휴대폰 번호가 변경되었나요?
      <a class="underline underline-offset-2" href="#">이메일로 계정찾기</a>
    </p>
  </main>
</div>
  `,i=e=>{e.preventDefault(),s.innerHTML=c()},m=e=>e.key>=0&&e.key<=9;let t=!1;const u=({currentTarget:e})=>{if(e.value.length===11)t=!0,a(r,t);else{if(!t)return;t=!1,a(r,t)}};n.onsubmit=i;l.onkeypress=m;l.oninput=u;
