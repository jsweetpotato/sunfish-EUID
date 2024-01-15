const i=({title:l,desc:r,buttonText:c="확인"})=>{const n=new Uint8Array(1),a=`modal${crypto.getRandomValues(n).join("")}`,e=`
  <dialog id=${a} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${l}</p>
      <span
        class="text-paragraph-md text-center text-gray-600"
        aria-label="모달 본문"
        >${r}</span>
      <button class="w-full h-9 bg-secondary text-white text-label-md rounded hover:brightness-90">
        ${c}
      </button>
    </div>
  </dialog>
  `;document.querySelector("body").insertAdjacentHTML("beforeend",e);const t=document.querySelector(`#${a}`),o=document.querySelector(`#${a} button`);return t.showing=()=>{t.showModal()},t.closing=()=>{t.setAttribute("closing",""),t.addEventListener("animationend",()=>{t.removeAttribute("closing",""),t.close()},{once:!0})},[t,o]},b=({title:l,desc:r,cancelText:c="취소",submitText:n="확인"})=>{const a=new Uint8Array(1),e=`modal${crypto.getRandomValues(a).join("")}`,t=`
  <dialog id=${e} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${l}</p>
      <span
        class="text-paragraph-md text-center text-gray-600"
        aria-label="모달 본문"
        >${r}</span>      
      <div class="flex gap-2 w-full">
        <button class="grow w-full  h-9 bg-gray-100 text-contents-content-primary text-label-md rounded hover:brightness-90">
          ${c}
        </button>
        <button class="grow w-full h-9 bg-secondary text-white text-label-md rounded hover:brightness-90">
          ${n}
        </button>
      </div>
    </div>
  </dialog>
  `;document.querySelector("body").insertAdjacentHTML("beforeend",t);const o=document.querySelector(`#${e}`),s=document.querySelector(`#${e} button`),d=document.querySelector(`#${e} button:last-child`);return o.showing=()=>{o.showModal()},o.closing=()=>{o.setAttribute("closing",""),o.addEventListener("animationend",()=>{o.removeAttribute("closing",""),o.close()},{once:!0})},[o,s,d]},u=(l,r=1500)=>{const c=new Uint8Array(1),n=`modal${crypto.getRandomValues(c).join("")}`,a=`
  <dialog id=${n} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${l}</p>
      </div>
    </div>
  </dialog>
  `;document.querySelector("body").insertAdjacentHTML("beforeend",a);const e=document.querySelector(`#${n}`);return e.closing=()=>{e.setAttribute("closing",""),e.addEventListener("animationend",()=>{e.removeAttribute("closing",""),e.close()},{once:!0})},e.showing=()=>{e.showModal();const t=setTimeout(()=>{e.closing(),clearTimeout(t)},r)},[e]};export{b as a,u as b,i as c};
