import"./tailwind-0m-bHF3b.js";import{C as x}from"./delay-L14dHocY.js";import{g as n,a as b}from"./getNode-pa7syr6m.js";import{g as w}from"./getPbImageUrl-DQjhCXIR.js";import{c as d}from"./checkAuth-CTdHH8Oq.js";import"./Modal-LwrVZ11o.js";const o=new x("https://suppose-weather.pockethost.io/"),k=n("#prev"),a=window.location.search.slice(2),t=n("#contentName"),C=n("#finish"),y=n("#checkBox"),u=await o.collection("selling").getOne(a);async function E(){if(!d())return;const i=n("#previewImg"),s=n("#productTitle"),c=n("#letterCount"),r=b("#tradeMethod > button"),g=n("#descriptionCount"),h=n("#description"),{description:m,title:l,tradingType:f,isPriceOffer:v}=u;c.textContent=l.length+"/24",g.textContent=l.length+"/500",f==="sell"?(r[0].style.backgroundColor="#373F67",r[0].style.color="white"):(r[1].style.backgroundColor="#373F67",r[1].style.color="white"),v===!0&&(y.checked=!0),i.src=w(u,"productImages"),s.value=l,h.value=m}let e=null;const p=n("#spell");function L({target:i}){if(!d())return;const{value:s}=i;/^[0-9]*$/.test(s)?(t.value=t.value.replace(/[^0-9]/g,""),e&&(e.remove(),e=null),t.value.length>12&&(t.value=t.value.slice(0,12),e=document.createElement("span"),e.textContent="숫자는 12이하로 입력해주세요",e.classList.add("text-label-sm","text-red-500","text-right","block"),p.insertAdjacentElement("afterbegin",e))):e||(e=document.createElement("span"),e.classList.add("text-label-sm","text-red-500","text-right","block"),e.textContent="숫자만 입력해주세요",p.insertAdjacentElement("afterbegin",e))}async function N(i){if(!d()||!o||!o.authStore||!o.authStore.model)return;const s={price:Number(i),user:o.authStore.model.id};try{await o.collection("selling").update(a,s),window.location.href=`/src/pages/exchange/exchangeDetail.html#${a}`}catch{}}t.addEventListener("input",L);k.addEventListener("click",()=>history.back());C.addEventListener("click",()=>{parseInt(t.value.length)>12||t.value[0]==="0"||isNaN(t.value)||t.value===""||N(t.value)});E();
