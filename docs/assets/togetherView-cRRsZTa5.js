import"./tailwind-Jlr4NQan.js";import{g as O}from"./index-LZz_RBWS.js";import{g as b}from"./getNode-pa7syr6m.js";import{i as f}from"./insert-c9FKGVoP.js";import{c as x}from"./clear-vWyKvuJ4.js";import{b as g,c as u,p as r,a as T}from"./delay-YOOEtQ5Y.js";import{c as C}from"./checkAuth-1jN6PZSr.js";const E={프로젝트:"💻",스터디:"📝",음식:"🍝","취미/여가":"🎧",운동:"⚽",독서:"📚"};function j(e){const{category:t,isOpen:o,title:n,date:a,description:s,members:c,maxMember:l}=e;let{age:i,gender:d}=e;const{id:P,avatar:$,name:v}=e.expand.user,k=o?"모집중":"모집완료",M=o?"text-secondary":"text-contents-content-secondary";d=d==="누구나"?`${d} 참여가능`:`${d}만 참여가능`,i=i==="모든 연령"?i:`${i}대`;const p=r.files.getUrl(e.expand.user,$,{thumb:"0x50"}),h=c.indexOf(r.authStore.model.id)>-1,L=`
    <article class="px-3 py-6 flex flex-col items-start gap-2">
    <span
      class="inline-block pl-[7px] pr-2 py-0.5 bg-bluegray-500 text-label-sm text-white rounded"
      >${E[t]} ${t}</span
    >
    <h2 class="text-label-lg font-medium">
      <span class="${M}">${k}</span> ${n}
    </h2>
    <div>
      <span
        class="block pl-[22px] text-paragraph-md font-normal bg-people-icon bg-no-repeat bg-left bg-[length:14px_14px]"
        >${i} ${d}</span
      >
      <span
        class="block pl-[22px] text-paragraph-md font-normal bg-calender_black-icon bg-no-repeat bg-left bg-[length:14px_14px]"
        >${new Date(a).toLocaleDateString()}</span
      >
    </div>
    <p class="text-paragraph-md font-normal leading-[160%]">${s}</p>
  </article>
  <div class="px-3 py-4 mb-[74px] flex flex-col gap-[13px]">
    <span class="text-label-md"
      >참여중인 이웃 <span class="text-secondary">${c.length}</span>/${l}</span
    >
    <div class=" h-[40px] flex items-center gap-2">
      <div class="w-[30px] h-[30px] rounded-full ${p?"":"bg-contents-content-secondary"} overflow-hidden">
        ${p?`<img
        class="bg-gray-300 h-full object-cover"
        src="${p}"
        alt="프로필 이미지"
      />`:""}
      </div>
      <div
        class="h-full text-paragraph-sm font-normal flex flex-col justify-center"
      >
        <p class="h-1/2 flex items-center">
          ${v}
          <span
            class="pl-[21px] ml-2 flex items-center h-full text-gray-600 bg-organizer-icon bg-no-repeat bg-left"
            >모임장</span
          >
        </p>
        <span class="h-1/2 flex items-center text-gray-600"
          >연남동 인증 4회</span
        >
      </div>
    </div>
  </div>
  `;let m="모임 가입하기";h&&(m="채팅방으로 이동"),!h&&!o&&(m="모집이 마감되었습니다.");const S=`
    <button
    id="join"
    class="w-full h-[45px] text-label-md text-white bg-secondary rounded disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed hover:brightness-90 transition-all duration-300"
    ${o?"":"disabled"}
  >
    ${m}
  </button>
  `;return{article:L,button:S}}function B(e){x("#article"),x("footer");const{article:t,button:o}=e;f("#article",t),f("footer",o),O.timeline().from("#article>*",{y:50,opacity:0,stagger:.1}).from("footer",{y:50,opacity:0},"-=0.2")}const[A]=g("가입이 완료되었습니다."),I={handleJoin(e){const{members:t}=e,o=r.authStore.model.id,[n,a,s]=T({title:"❓ 모임에 가입하시겠습니까?",desc:"",cancelText:"아니오",submitText:"예"});return s.addEventListener("click",async()=>{await r.collection("together").update(e.id,{members:[...t,o]}),w(),n.closing(),A.showing()}),a.addEventListener("click",()=>n.closing()),async c=>{try{n.showing()}catch{alert("가입 도중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")}}},handleGoChat(e){const[t,o]=u({title:"🚨 운영원칙에 의해서<br />삭제된 채팅방입니다.",desc:"삭제된 채팅방에는<br />입장하실 수 없습니다."});return o.addEventListener("click",()=>{t.closing(),window.history.back()}),async n=>{const{chatroomId:a}=e,s=r.authStore.model.id;try{const l=(await r.collection("chatroom").getOne(a,{fields:"members"})).members;l.indexOf(s)<0&&await r.collection("chatroom").update(a,{members:[...l,s]}),window.location.href=`/src/pages/chatting/room.html?id=${a}`}catch{t.showing()}}}};function U(e,t){if(!t.isOpen)return;const o=b("footer > button"),a=t.members.indexOf(r.authStore.model.id)>-1?e.handleGoChat:e.handleJoin;o.addEventListener("click",a(t))}async function w(){if(!C())return;const e=new URL(window.location.href).searchParams.get("id");e===null&&(alert("잘못된 접근입니다."),window.location.href="/src/pages/board/together.html");const t=await r.collection("together").getOne(e,{expand:"user"});document.title=`엔터 이듬 - 같이해요::${t.title}`,B(j(t)),U(I,t)}w();const _=b("#share");function G(){const[e]=g("📃 주소가 복사되었습니다.",1e3),[t]=g("📃 복사 도중 오류가 발생했습니다.",1e3);return async o=>{try{await window.navigator.clipboard.writeText(window.location.href),e.showing()}catch{t.showing()}}}const[y,J]=u({title:"😭서비스 준비중입니다.",desc:"열심히 준비중이예요💦<br> 조금만 기다려주세요",buttonText:"알겠어요"});_.addEventListener("click",G());b("#more").addEventListener("click",y.showing);J.onclick=y.closing;
