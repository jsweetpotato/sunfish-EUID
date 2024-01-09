import{t as c,c as a}from"./main_button-L0U2JSzU.js";/* empty css                 */const r=document.querySelector("#category-list"),l=document.querySelector("#button-wrapper");document.querySelector("form");let s;const i=["Program  ing","Design","UI/UX","Frontend","Backend","AI","Blockchain"],n={Programing:!1,Design:!1,"UI/UX":!1,Frontend:!1,Backend:!1,AI:!1,Blockchain:!1};let o=0;function u({target:e}){const t=e.closest("button");t&&(t.classList.toggle("selected"),n[t.id]=!n[t.id],n[t.id]?o++:o--,o>2?c(s,!0):c(s,!1))}const d=()=>{i.map(e=>r.insertAdjacentHTML("beforeend",`
    <button id=${e} type="button" class="group">
      <div class="group-[.selected]:bg-secondary flex justify-between items-center bg-bluegray-200 max-w-50 px-3 py-6 rounded-lg text-start hover:brightness-95">
        <p class="group-[.selected]:text-white text-label-md leading-tight">${e}</p>
        <div class="group-[.selected]:bg-check-icon row-span-2 w-5 h-5 bg-no-repeat bg-center bg-contain bg-plus-icon"></div>
      </div>
    </button>`))},g=e=>{e.preventDefault(),window.location.href="./oauth.html"},b=()=>{l.insertAdjacentElement("beforeend",a({id:"submit",value:"이대로 저장할래요",type:"submit",onClick:g})),s=document.querySelector("#submit")};d();b();r.addEventListener("click",u);
