const i=({title:n,desc:l,buttonText:r="확인"})=>{const s=new Uint8Array(1),a=`modal${crypto.getRandomValues(s).join("")}`,o=`
  <dialog id=${a} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${n}</p>
      <span
        class="text-paragraph-md text-center text-gray-600"
        aira-label="모달 본문"
        >${l}</span>
      <button class="w-full h-9 bg-secondary text-white text-label-md rounded hover:brightness-90">
        ${r}
      </button>
    </div>
  </dialog>
  `;document.querySelector("body").insertAdjacentHTML("beforeend",o);const t=document.querySelector(`#${a}`),e=document.querySelector(`#${a} button`);return t.showing=()=>{t.showModal()},t.closing=()=>{t.setAttribute("closing",""),t.addEventListener("animationend",()=>{t.removeAttribute("closing",""),t.close()},{once:!0})},[t,e]},b=({title:n,desc:l,cancelText:r="취소",submitText:s="확인"})=>{const a=new Uint8Array(1),o=`modal${crypto.getRandomValues(a).join("")}`,t=`
  <dialog id=${o} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${n}</p>
      <span
        class="text-paragraph-md text-center text-gray-600"
        aira-label="모달 본문"
        >${l}</span>      
      <div class="flex gap-2 w-full">
        <button class="grow w-full  h-9 bg-gray-100 text-contents-content-primary text-label-md rounded hover:brightness-90">
          ${r}
        </button>
        <button class="grow w-full h-9 bg-secondary text-white text-label-md rounded hover:brightness-90">
          ${s}
        </button>
      </div>
    </div>
  </dialog>
  `;document.querySelector("body").insertAdjacentHTML("beforeend",t);const e=document.querySelector(`#${o}`),c=document.querySelector(`#${o} button`),d=document.querySelector(`#${o} button:last-child`);return e.showing=()=>{e.showModal()},e.closing=()=>{e.setAttribute("closing",""),e.addEventListener("animationend",()=>{e.removeAttribute("closing",""),e.close()},{once:!0})},[e,c,d]};export{b as a,i as c};
