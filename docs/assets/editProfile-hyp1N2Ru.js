import"./modulepreload-polyfill-9p4a8sJU.js";/* empty css                 */import{a as x,g as c}from"./getNode-pa7syr6m.js";import"./pb-1NQpvyqM.js";import{c as y,a as B}from"./Modal-1FvcQ_11.js";const M=e=>{const o=x(".valid-input-box");function u(t){const n=+t.dataset.index,{min:a,max:l}=e[n],i=t.value.replace(/\s*/g,"").length,r=i>a&&i<=l;return e[n].isValid=r,r}function p(t,n){const a=t.closest(".input-wrapper");n?a.classList.remove("invalid"):a.classList.add("invalid")}function s(t){const{value:n}=t,a=+t.dataset.index,l=t.nextElementSibling.querySelector(".letter-count");l.textContent=`${n.length}/${e[a].max}`}function w({target:t}){const n=u(t);p(t,n),s(t)}return o.forEach((t,n)=>{const{id:a,min:l=0,max:i=24,placeholder:r="",label:E}=e[n],$=`
      <label for="${a}" class="text-label-sm pb-2">${E}</label>
      <div class="input-wrapper group flex flex-col w-full">
        <input
          type="text"
          id=${a}
          data-index="${n}"
          placeholder="${r}"
          minlength="${l}"
          maxlength="${i}"
          class="group-[.invalid]:border-red-500 p-2 text-paragraph-sm w-full outline-none border border-contents-content-tertiary rounded"
          spellcheck="false"
        />
        <div class="flex justify-between">
          <span
            class="group-[&:not(.invalid)]:opacity-0 text-red-500 text-paragraph-sm opacity-1"
          >글자 수는 ${l+1}자 이상 ${i}자 이하로 작성해주세요.</span>
          <span
            aria-live="polite"
            class="group-[.invalid]:text-red-500 letter-count text-contents-content-tertiary text-paragraph-sm"
          >0/${i}</span>
        </div>
      </div>
      `;t.insertAdjacentHTML("beforeend",$),c(`input#${a}`).addEventListener("input",w)})},T=[{id:"nameInput",min:0,max:8,placeholder:"별명이나 이름을 입력해주세요.",label:"이름"},{id:"jobInput",min:0,max:20,placeholder:"어떤 일을 하는지 알려주세요.",label:"직업"},{id:"companyInput",min:0,max:24,placeholder:"일하시는 곳을 알려주세요.",label:"직장"}];M(T);const d=c("#description"),v=c("#characterCount"),g=c("#saveButton");function I(){const e=d.value.length;v.textContent=`${e}/500`,e>500&&(d.value=d.value.substring(0,500),v.textContent="500/500")}d.addEventListener("input",I);const h=c("#all-agree-checkbox"),b=x(".agree-checkbox"),S=()=>{const e=[...b].every(o=>o.checked);g.disabled=!e,h.checked=e};h.addEventListener("change",()=>{const e=h.checked;b.forEach(o=>{o.checked=e}),g.disabled=!e});b.forEach(e=>{e.addEventListener("change",S)});const[f,j]=y({title:"🥳 저장 완료!",desc:"프로필 정보가 저장되었습니다.",buttonText:"확인"}),[k,A,V]=B({title:"😱 나가시겠어요?",desc:"변경사항이 저장되지 않아요. <br /> 정말로 나가시겠어요?",cancelText:"취소",submitText:"확인"}),H=()=>{f.closing()};j.onclick=H;g.onclick=()=>f.showing();const P=x(".cancelButton"),U=()=>{window.history.back()},F=()=>k.closing();A.onclick=F;V.onclick=U;P.forEach(e=>{e.onclick=()=>k.showing()});const C=c("#file"),L=c("#image-preview"),m=c("#image-wrapper"),N=c("#file-clear");function R({target:e}){if(e.value==="")return;const{files:o}=e;m.innerHTML="",[...o].forEach(u=>{const p=URL.createObjectURL(u),s=document.createElement("img");s.classList.add("w-[50px]","h-[50px]"),s.src=p,m.appendChild(s)}),L.classList.remove("hidden")}C.addEventListener("change",R);function q({target:e}){C.value="",m.innerHTML="",L.classList.add("hidden")}N.addEventListener("click",q);
