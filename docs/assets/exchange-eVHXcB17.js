import"./modulepreload-polyfill-9p4a8sJU.js";/* empty css                 */const c=document.querySelector("#plusButton-container"),e=document.querySelector("#plusButton"),o=document.querySelector("body");let n=0,t;function s(){n++,n%2!==0?(o.style.background="rgba(0, 0, 0, 0.5)",c.insertAdjacentHTML("beforebegin",`
    <div id='span-tag' class="flex w-[8.3125rem] grow flex-col gap-1 fixed bottom-36 left-[53%] max-md:left-[63%]">
      <span class="bg-exchange-icon border h-10 flex items-center grow justify-center px-5 py-2 rounded-[3.75rem]"></span>
      <span class="bg-project-icon border h-10 flex items-center grow justify-center px-5 py-2 rounded-[3.75rem]"></span>
      <span class="bg-study-icon border h-10 flex items-center grow justify-center px-5 py-2 rounded-[3.75rem]"></span>
    </div>
    `),t=document.querySelector("#span-tag"),e.classList.remove("bg-plus-icon"),e.classList.add("bg-exchange-close-icon")):(o.style.background="",t&&t.remove(),e.classList.remove("bg-exchange-close-icon"),e.classList.add("bg-plus-icon"))}c.addEventListener("click",s);
