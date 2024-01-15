import"./tailwind-hLRvZ190.js";import{g as S}from"./index-LZz_RBWS.js";import{g as x}from"./getNode-pa7syr6m.js";import{i as b}from"./insert-c9FKGVoP.js";import{c as f}from"./clear-vWyKvuJ4.js";import{p as r}from"./delay-L14dHocY.js";import{c as L}from"./checkAuth-CTdHH8Oq.js";import{b as g,a as O,c as C}from"./Modal-LwrVZ11o.js";const T={프로젝트:"💻",스터디:"📝",음식:"🍝","취미/여가":"🎧",운동:"⚽",독서:"📚"};function j(e){const{category:t,isOpen:o,title:a,date:n,description:s,members:l,maxMember:c}=e;let{age:i,gender:d}=e;const{id:G,avatar:w,name:y}=e.expand.user,v=o?"모집중":"모집완료",$=o?"text-secondary":"text-contents-content-secondary";d=d==="누구나"?`${d} 참여가능`:`${d}만 참여가능`,i=i==="모든 연령"?i:`${i}대`;const p=r.files.getUrl(e.expand.user,w,{thumb:"0x50"}),h=l.indexOf(r.authStore.model.id)>-1,k=`
    <article class="px-3 py-6 flex flex-col items-start gap-2">
    <span
      class="inline-block pl-[7px] pr-2 py-0.5 bg-bluegray-500 text-label-sm text-white rounded"
      >${T[t]} ${t}</span
    >
    <h2 class="text-label-lg font-medium">
      <span class="${$}">${v}</span> ${a}
    </h2>
    <div>
      <span
        class="block pl-[22px] text-paragraph-md font-normal bg-people-icon bg-no-repeat bg-left bg-[length:14px_14px]"
        >${i} ${d}</span
      >
      <span
        class="block pl-[22px] text-paragraph-md font-normal bg-calender_black-icon bg-no-repeat bg-left bg-[length:14px_14px]"
        >${new Date(n).toLocaleDateString()}</span
      >
    </div>
    <p class="text-paragraph-md font-normal leading-[160%]">${s}</p>
  </article>
  <div class="px-3 py-4 mb-[74px] flex flex-col gap-[13px]">
    <span class="text-label-md"
      >참여중인 이웃 <span class="text-secondary">${l.length}</span>/${c}</span
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
          ${y}
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
  `;let m="모임 가입하기";h&&(m="채팅방으로 이동"),!h&&!o&&(m="모집이 마감되었습니다.");const M=`
    <button
    id="join"
    class="w-full h-[45px] text-label-md text-white bg-secondary rounded disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed hover:brightness-90 transition-all duration-300"
    ${o?"":"disabled"}
  >
    ${m}
  </button>
  `;return{article:k,button:M}}function E(e){f("#article"),f("footer");const{article:t,button:o}=e;b("#article",t),b("footer",o),S.timeline().from("#article>*",{y:50,opacity:0,stagger:.1}).from("footer",{y:50,opacity:0},"-=0.2")}const[B]=g("가입이 완료되었습니다."),A={handleJoin(e){const{members:t}=e,o=r.authStore.model.id,[a,n,s]=O({title:"❓ 모임에 가입하시겠습니까?",desc:"",cancelText:"아니오",submitText:"예"});return s.addEventListener("click",async()=>{await r.collection("together").update(e.id,{members:[...t,o]}),u(),a.closing(),B.showing()}),n.addEventListener("click",()=>a.closing()),async l=>{try{a.showing()}catch{alert("가입 도중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")}}},handleGoChat(e){const[t,o]=C({title:"🚨 운영원칙에 의해서<br />삭제된 채팅방입니다.",desc:"삭제된 채팅방에는<br />입장하실 수 없습니다."});return o.addEventListener("click",()=>{t.closing(),window.history.back()}),async a=>{const{chatroomId:n}=e,s=r.authStore.model.id;try{const c=(await r.collection("chatroom").getOne(n,{fields:"members"})).members;c.indexOf(s)<0&&await r.collection("chatroom").update(n,{members:[...c,s]}),window.location.href=`/src/pages/chatting/room.html?id=${n}`}catch{t.showing()}}}};function I(e,t){if(!t.isOpen)return;const o=x("footer > button"),n=t.members.indexOf(r.authStore.model.id)>-1?e.handleGoChat:e.handleJoin;o.addEventListener("click",n(t))}async function u(){if(!L())return;const e=new URL(window.location.href).searchParams.get("id");e===null&&(alert("잘못된 접근입니다."),window.location.href="/src/pages/board/together.html");const t=await r.collection("together").getOne(e,{expand:"user"});document.title=`엔터 이듬 - 같이해요::${t.title}`,E(j(t)),I(A,t)}u();const U=x("#share");function _(){const[e]=g("📃 주소가 복사되었습니다.",1e3),[t]=g("📃 복사 도중 오류가 발생했습니다.",1e3);return async o=>{try{await window.navigator.clipboard.writeText(window.location.href),e.showing()}catch{t.showing()}}}U.addEventListener("click",_());
