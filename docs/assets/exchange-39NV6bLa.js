import"./modulepreload-polyfill-9p4a8sJU.js";/* empty css                 */const s=document.querySelector("#plusButton-container"),l=document.querySelector("#plusButton"),c=document.querySelector("body"),r=document.querySelector("#exchangeList"),a=document.querySelectorAll(".heartContainer");let o=0,t=!1,n;function i(){o++,o%2!==0?(c.style.background="rgba(0, 0, 0, 0.5)",s.insertAdjacentHTML("beforebegin",`
    <div id='span-tag' class="flex flex-col absolute left-[-78px] w-full min-w-screen max-w-screen">
      <div class="fixed bottom-36 flex flex-col w-[133px] items-center gap-1">
        <a href="/src/pages/exchange/index.html" class="bg-exchange-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></a>
        <span class="bg-project-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></span>
        <span class="bg-study-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></span>
      </div>
    </div>
    `),n=document.querySelector("#span-tag")):(c.style.background="",n&&n.remove())}function g(){this.classList.toggle("bg-plus-icon"),this.classList.toggle("bg-exchange-close-icon"),this.classList.toggle("bg-white"),this.classList.toggle("bg-secondary")}function p(){window.location.href="/src/pages/exchange/exchangeDetail.html"}function u(e){e.stopPropagation(),t=!t,t?e.currentTarget.style.backgroundColor="pink":e.currentTarget.style.backgroundColor=""}a.forEach(e=>{e.addEventListener("click",u)});s.addEventListener("click",i);l.addEventListener("click",g);r.addEventListener("click",p);
