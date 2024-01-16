import"./tailwind-FG0q2sUH.js";import{g as R,a as z,e as B,b as q,S as G}from"./swiper-core-xIVJDqhu.js";import{g as _}from"./index-LZz_RBWS.js";import{N as Q,P as J}from"./pagination-hBsCm0jB.js";import{g as A,a as X}from"./getNode-pa7syr6m.js";import{i as F,a as Y}from"./insert-c9FKGVoP.js";import{c as Z}from"./clear-vWyKvuJ4.js";import{p as U}from"./delay-L14dHocY.js";import{c as ee}from"./checkAuth-CTdHH8Oq.js";import{c as te}from"./Modal-LwrVZ11o.js";function ae(t){let{swiper:e,extendParams:n,on:r,emit:s}=t;const o=R(),y=z();e.keyboard={enabled:!1},n({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}});function L(l){if(!e.enabled)return;const{rtlTranslate:d}=e;let i=l;i.originalEvent&&(i=i.originalEvent);const p=i.keyCode||i.charCode,w=e.params.keyboard.pageUpDown,b=w&&p===33,m=w&&p===34,u=p===37,h=p===39,P=p===38,C=p===40;if(!e.allowSlideNext&&(e.isHorizontal()&&h||e.isVertical()&&C||m)||!e.allowSlidePrev&&(e.isHorizontal()&&u||e.isVertical()&&P||b))return!1;if(!(i.shiftKey||i.altKey||i.ctrlKey||i.metaKey)&&!(o.activeElement&&o.activeElement.nodeName&&(o.activeElement.nodeName.toLowerCase()==="input"||o.activeElement.nodeName.toLowerCase()==="textarea"))){if(e.params.keyboard.onlyInViewport&&(b||m||u||h||P||C)){let N=!1;if(B(e.el,`.${e.params.slideClass}, swiper-slide`).length>0&&B(e.el,`.${e.params.slideActiveClass}`).length===0)return;const v=e.el,O=v.clientWidth,T=v.clientHeight,k=y.innerWidth,x=y.innerHeight,c=q(v);d&&(c.left-=v.scrollLeft);const I=[[c.left,c.top],[c.left+O,c.top],[c.left,c.top+T],[c.left+O,c.top+T]];for(let $=0;$<I.length;$+=1){const D=I[$];if(D[0]>=0&&D[0]<=k&&D[1]>=0&&D[1]<=x){if(D[0]===0&&D[1]===0)continue;N=!0}}if(!N)return}e.isHorizontal()?((b||m||u||h)&&(i.preventDefault?i.preventDefault():i.returnValue=!1),((m||h)&&!d||(b||u)&&d)&&e.slideNext(),((b||u)&&!d||(m||h)&&d)&&e.slidePrev()):((b||m||P||C)&&(i.preventDefault?i.preventDefault():i.returnValue=!1),(m||C)&&e.slideNext(),(b||P)&&e.slidePrev()),s("keyPress",p)}}function S(){e.keyboard.enabled||(o.addEventListener("keydown",L),e.keyboard.enabled=!0)}function g(){e.keyboard.enabled&&(o.removeEventListener("keydown",L),e.keyboard.enabled=!1)}r("init",()=>{e.params.keyboard.enabled&&S()}),r("destroy",()=>{e.keyboard.enabled&&g()}),Object.assign(e.keyboard,{enable:S,disable:g})}function ne(t){let{swiper:e,extendParams:n,on:r,emit:s,params:o}=t;e.autoplay={running:!1,paused:!1,timeLeft:0},n({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let y,L,S=o&&o.autoplay?o.autoplay.delay:3e3,g=o&&o.autoplay?o.autoplay.delay:3e3,l,d=new Date().getTime(),i,p,w,b,m,u,h;function P(a){!e||e.destroyed||!e.wrapperEl||a.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",P),!h&&x())}const C=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?i=!0:i&&(g=l,i=!1);const a=e.autoplay.paused?l:d+g-new Date().getTime();e.autoplay.timeLeft=a,s("autoplayTimeLeft",a,a/S),L=requestAnimationFrame(()=>{C()})},N=()=>{let a;return e.virtual&&e.params.virtual.enabled?a=e.slides.filter(f=>f.classList.contains("swiper-slide-active"))[0]:a=e.slides[e.activeIndex],a?parseInt(a.getAttribute("data-swiper-autoplay"),10):void 0},v=a=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(L),C();let E=typeof a>"u"?e.params.autoplay.delay:a;S=e.params.autoplay.delay,g=e.params.autoplay.delay;const f=N();!Number.isNaN(f)&&f>0&&typeof a>"u"&&(E=f,S=f,g=f),l=E;const M=e.params.speed,j=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(M,!0,!0),s("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,M,!0,!0),s("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(M,!0,!0),s("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,M,!0,!0),s("autoplay")),e.params.cssMode&&(d=new Date().getTime(),requestAnimationFrame(()=>{v()})))};return E>0?(clearTimeout(y),y=setTimeout(()=>{j()},E)):requestAnimationFrame(()=>{j()}),E},O=()=>{d=new Date().getTime(),e.autoplay.running=!0,v(),s("autoplayStart")},T=()=>{e.autoplay.running=!1,clearTimeout(y),cancelAnimationFrame(L),s("autoplayStop")},k=(a,E)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(y),a||(u=!0);const f=()=>{s("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",P):x()};if(e.autoplay.paused=!0,E){m&&(l=e.params.autoplay.delay),m=!1,f();return}l=(l||e.params.autoplay.delay)-(new Date().getTime()-d),!(e.isEnd&&l<0&&!e.params.loop)&&(l<0&&(l=0),f())},x=()=>{e.isEnd&&l<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(d=new Date().getTime(),u?(u=!1,v(l)):v(),e.autoplay.paused=!1,s("autoplayResume"))},c=()=>{if(e.destroyed||!e.autoplay.running)return;const a=R();a.visibilityState==="hidden"&&(u=!0,k(!0)),a.visibilityState==="visible"&&x()},I=a=>{a.pointerType==="mouse"&&(u=!0,h=!0,!(e.animating||e.autoplay.paused)&&k(!0))},$=a=>{a.pointerType==="mouse"&&(h=!1,e.autoplay.paused&&x())},D=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",I),e.el.addEventListener("pointerleave",$))},W=()=>{e.el.removeEventListener("pointerenter",I),e.el.removeEventListener("pointerleave",$)},H=()=>{R().addEventListener("visibilitychange",c)},K=()=>{R().removeEventListener("visibilitychange",c)};r("init",()=>{e.params.autoplay.enabled&&(D(),H(),O())}),r("destroy",()=>{W(),K(),e.autoplay.running&&T()}),r("_freeModeStaticRelease",()=>{(w||u)&&x()}),r("_freeModeNoMomentumRelease",()=>{e.params.autoplay.disableOnInteraction?T():k(!0,!0)}),r("beforeTransitionStart",(a,E,f)=>{e.destroyed||!e.autoplay.running||(f||!e.params.autoplay.disableOnInteraction?k(!0,!0):T())}),r("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){T();return}p=!0,w=!1,u=!1,b=setTimeout(()=>{u=!0,w=!0,k(!0)},200)}}),r("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!p)){if(clearTimeout(b),clearTimeout(y),e.params.autoplay.disableOnInteraction){w=!1,p=!1;return}w&&e.params.cssMode&&x(),w=!1,p=!1}}),r("slideChange",()=>{e.destroyed||!e.autoplay.running||(m=!0)}),Object.assign(e.autoplay,{start:O,stop:T,pause:k,resume:x})}const re=new G(".swiper",{modules:[Q,J,ne,ae],slidesPerView:1,slidesPerGroup:1,direction:"horizontal",speed:500,autoplay:{delay:5e3},pagination:{type:"progressbar",el:".pagination",clickable:!0,progressbarFillClass:"absolute top-0 left-0 w-full h-full scale-0 origin-top-left bg-secondary",renderProgressbar(t){const e=this.slides.length;return`
      <span id="currentIndex" class="text-label-sm text-white absolute top-[-6px] left-[-20px]">01</span>
      <span class="${t}"></span>
      <span class="text-label-sm text-white absolute top-[-6px] right-[-20px]">0${e}</span>

  `}},keyboard:{enabled:!0},on:{realIndexChange(t){const e=(t.realIndex+1).toString().padStart(2,"0");A("#currentIndex").textContent=e}}});function se(t,e,n={}){const r=[];return e.forEach(s=>{const o=U.files.getUrl(t,s,n);r.push(o)}),r}function ie(t){const{id:e,images:n,description:r}=t,s=se(t,n,{thumb:"0x350"}),o=[];return r.forEach((y,L)=>{const{id:S,title:g,link:l}=y,d=`
  <div class="swiper-slide">
  <a href="${l}" class="relative block w-full h-full">
    <img
      class="absolute bottom-0 h-full object-cover"
      src="${s[L]}"
      alt="메인 배너"
    />
    ${g?`    <div class="absolute top-[6.25%] left-[6.25%] text-white">
    <h3 class="w-[148px] text-label-lg font-medium">
      ${g}
    </h3>
    <a class="text-paragraph-sm" href="${l}">자세히 보기</a>
  </div>`:""}
  </a>
  </div>`;o.push(d)}),o.join("")}function oe(t){const e=[];return t.forEach(n=>{const s=`
    <article
    class="relative w-[48%] aspect-[1/1.38] rounded-lg shadow-[3px_3px_8px_0px_rgba(0,0,0,0.08),0px_0px_4px_0px_rgba(0,0,0,0.05)] hover:shadow-gray-300 transition-all duration-200"
  >
    <img
      class="w-full h-1/2 object-cover rounded-t-lg bg-contents-content-secondary"
    src="${U.files.getUrl(n,n.field,{thumb:"200x0"})}"
      alt=""
    />
  
    <div
      class="p-1.5 h-1/2 text-paragraph-sm min-[375px]:text-paragraph-md leading-[1.6] font-normal"
    >
      <h3>
        <a id="story" class="absolute top-0 left-0 w-full h-full" href="">
          <span class="absolute w-[92%] top-[52%] left-1.5">
            <span class="text-ellipsis line-clamp-2">
              ${n.title}
            </span>
            <span
              class="mb-1 text-contents-content-secondary text-ellipsis line-clamp-2"
              >${n.expand.user.company} · ${n.expand.user.name}</span
            >
            <div class="text-label-sm min-[375px]:text-label-md">
              <span
                class="px-1 text-secondary border border-secondary rounded"
                >${n.generation}기</span
              >
              <span
                class="px-1 text-gray-700 border border-contents-content-tertiary rounded"
                >${n.keywords}</span
              >
            </div>
          </span>
        </a>
      </h3>
    </div>
  </article>
    `;e.push(s)}),e.join("")}function le(t){Z("#story-container");const{articleResult:e,slidesResult:n}=t;F(A("#story-container"),e),F(A("#main-swiper-wrapper"),n),X("#story").forEach(r=>{r.addEventListener("click",s=>s.preventDefault())}),re.update()}(async function(){if(!ee())return;const e=await U.collection("story").getFullList({expand:"user"}),n=await U.collection("banner").getOne("3vnixokxjub7pu6"),r=oe(e),s=ie(n);le({articleResult:r,slidesResult:s})})();const V=A("#write");function ue(t){t.classList.toggle("bg-plus-icon"),t.classList.toggle("bg-exchange-close-icon"),t.classList.toggle("bg-white"),t.classList.toggle("bg-secondary")}const de={"board/writeTogether":"🎎 같이해요","board/writeQna":"❓ 질의응답","exchange/exchangeWrite":"💻 기기거래"},pe=Object.entries(de).map(([t,e])=>`
<a
  href="/src/pages/${t}.html"
  class="block px-5 py-2.5 text-label-md rounded-full  bg-white hover:bg-secondary hover:text-white"
  >${e}</a
>
`).join(""),ce=` <nav id="write-menu" class="w-full flex flex-col gap-1">${pe}</nav>`;function fe(t){if(t)A("#write-menu").remove(),_.to("#dimmed",{display:"none",opacity:0,duration:.5});else{const e=_.timeline();Y("#write-container",ce),e.to("#dimmed",{display:"block",opacity:1,duration:.1}).from("#write-menu > *",{opacity:0,y:80,stagger:.08,reversed:!0},"<")}}function me(){let t=!1;return e=>{ue(e.target),fe(t),t=!t}}V.addEventListener("click",me());A("#dimmed").addEventListener("click",t=>{_.to("#dimmed",{display:"none",opacity:0,duration:.5}),V.click()});const ye=A("#notification");ye.addEventListener("click",t=>{t.preventDefault();const[e,n]=te({title:"😭서비스 준비중입니다.",desc:"열심히 준비중이예요💦<br> 조금만 기다려주세요",buttonText:"알겠어요"});n.addEventListener("click",()=>e.closing()),e.showing()});
