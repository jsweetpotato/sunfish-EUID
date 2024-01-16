import"./tailwind-Via4wZBX.js";import{g as j}from"./index-LZz_RBWS.js";function f(e){return C(e)||H(e)||_(e)||$()}function C(e){if(Array.isArray(e))return g(e)}function H(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function _(e,r){if(e){if(typeof e=="string")return g(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return g(e,r)}}function g(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function $(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function N(e,r){var t=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=_(e))||r&&e&&typeof e.length=="number"){t&&(e=t);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(c){throw c},f:i}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o=!0,a=!1,d;return{s:function(){t=t.call(e)},n:function(){var c=t.next();return o=c.done,c},e:function(c){a=!0,d=c},f:function(){try{!o&&t.return!=null&&t.return()}finally{if(a)throw d}}}}var E=44032,D=55203,I={"":"",ㄱ:"ㄱ",ㄲ:"ㄲ",ㄳ:"ㄱㅅ",ㄴ:"ㄴ",ㄵ:"ㄴㅈ",ㄶ:"ㄴㅎ",ㄷ:"ㄷ",ㄸ:"ㄸ",ㄹ:"ㄹ",ㄺ:"ㄹㄱ",ㄻ:"ㄹㅁ",ㄼ:"ㄹㅂ",ㄽ:"ㄹㅅ",ㄾ:"ㄹㅌ",ㄿ:"ㄹㅍ",ㅀ:"ㄹㅎ",ㅁ:"ㅁ",ㅂ:"ㅂ",ㅃ:"ㅃ",ㅄ:"ㅂㅅ",ㅅ:"ㅅ",ㅆ:"ㅆ",ㅇ:"ㅇ",ㅈ:"ㅈ",ㅉ:"ㅉ",ㅊ:"ㅊ",ㅋ:"ㅋ",ㅌ:"ㅌ",ㅍ:"ㅍ",ㅎ:"ㅎ"},q={ㅏ:"ㅏ",ㅐ:"ㅐ",ㅑ:"ㅑ",ㅒ:"ㅒ",ㅓ:"ㅓ",ㅔ:"ㅔ",ㅕ:"ㅕ",ㅖ:"ㅖ",ㅗ:"ㅗ",ㅘ:"ㅗㅏ",ㅙ:"ㅗㅐ",ㅚ:"ㅗㅣ",ㅛ:"ㅛ",ㅜ:"ㅜ",ㅝ:"ㅜㅓ",ㅞ:"ㅜㅔ",ㅟ:"ㅜㅣ",ㅠ:"ㅠ",ㅡ:"ㅡ",ㅢ:"ㅡㅣ",ㅣ:"ㅣ"},O=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],R=Object.values(q),z=["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"].map(function(e){return I[e]});function M(e){var r=e.charCodeAt(0),t=E<=r&&r<=D;if(t){var n=r-E,i=n%28,o=(n-i)/28%21,a=Math.floor((n-i)/28/21);return{first:O[a],middle:R[o],last:z[i]}}}function B(e){var r=[],t=N(e),n;try{for(t.s();!(n=t.n()).done;){var i=n.value,o=M(i);if(o!=null){r.push([].concat(f(o.first),f(o.middle),f(o.last)));continue}var a=I[i];if(a!=null){r.push(f(a));continue}var d=q[i];if(d!=null){r.push(f(d));continue}r.push([i])}}catch(c){t.e(c)}finally{t.f()}return r}function L(e){return B(e).reduce(function(r,t){return"".concat(r).concat(t.join(""))},"")}function h(e,r){var t=L(e),n=L(r);return t.includes(n)}const G=[{type:0,description:"운동같이해요~",id:"u1fqdccf85wxjgu",title:"운동하실분"},{type:0,description:"프론트엔드가 한분 부족해서 뽑습니다",id:"tpjzcn4yjiumrbf",title:"프로젝트 하실분 구함 고수만 "},{type:0,description:"말그대로",id:"t7kb6inlvqjvo4d",title:"맛있는거 먹으러 갈 사람~"},{type:0,description:"해리포터 읽으실 분~",id:"q1sit6mexlllndy",title:"해리포터 읽으실 분~"},{type:0,description:"배드민턴 치실 분~",id:"y806oy64ji5tauu",title:"배드민턴 치실 분~"},{type:0,description:"이쿠죠",id:"uvhsh3s5s27nm2c",title:"운동가요"},{type:0,description:"절호의 찬스입니다 잡으세요",id:"xhppp458ozuq7hi",title:"플젝 하실분들 보세요 "},{type:0,description:"돌이킬수 없는 약속 읽으실 분 ~",id:"k50oi8x0yc7jgo0",title:"돌이킬수 없는 약속 읽으실 분 "},{type:0,description:"asdfsadf",id:"rj3gzp3t1kt1vvr",title:"asdf"},{type:0,description:"반갑습니당",id:"18g5tt2vaq1airw",title:"안녕하세요"},{type:0,description:`운
동
하
실
분`,id:"b9d9qfw70s6909s",title:"운동하실분~~"},{type:0,description:"영화보러가실분 구해요~~~~~",id:"518vvc7ux6yklbi",title:"영화 보러가실분~~"},{type:0,description:"ㅅㅅㅅㅅㅅㅇㅅ로로롤",id:"dp3usd2bqmw3c1y",title:"테스트"},{type:0,description:"채팅방테스트입니다.",id:"mjkghoxzimdtzuq",title:"채팅방테스트"}],U=[{type:1,description:"산지 3년밖에 안지났어요",id:"iqsrf10q6z4jaff",title:"애플마우스 팝니다"},{type:1,description:"쓴지 2년밖에 안지났습니다",id:"ug4saxw20gh9ofc",title:"애플매직키보드 팝니다 "},{type:1,description:"멋있습니다",id:"7rdu075redbc68z",title:"멋쟁이 사자 배경팝니다"},{type:1,description:"아주 이뽀요",id:"shclm9erlr44vpv",title:"카밀로고나눔합니다"},{type:1,description:"집에 너무 많아서 나눔해요",id:"izurnbzm6kdbxb2",title:"멍뭉이 사진 나눔합니다"},{type:1,description:"주술을 할 수 있어요",id:"a6e6t9ciee2wi8a",title:"주술을 나눠드려요"},{type:1,description:"정말 노력해서 직접 만들었습니다",id:"ftmkivyluz7c9u3",title:"저희 키포드를 판매합니다"},{type:1,description:"정말 비싸요",id:"f00c2s1rjv2zkbk",title:"제가 그린 그림을 판매합니다"},{type:1,description:"어떤데 어떤데~",id:"18mva8gqffp771w",title:"저의 초상화입니다 판매할게요"}],V=[{type:4,description:`이제 막 코딩을 시작한 코린이입니다.\r
\r
웹사이트를 제작하다가 문득 파일을 보는데\r
\r
아래 사진처럼 node_modules 파일이 글자색이 회색인데 혹시 문제있는건가요?`,id:"yj6lamly4dt3i80",title:"node_modules 파일 색이 왜 이런가요?"},{type:4,description:`자바스크립트 라이브러리 codemirror.js 를 이용해서 html 텍스트에디트 를만들려구하는데\r
\r
예제대로 따라해봐도\r
\r
줄표시와 들여쓰기 등은 되는데\r
\r
색상은 검은색으로만 표시됩니다\r
\r
다른예제들을 보면 빨간색 파란색 등으로 여러색으로 코드들이 표시되던데\r
\r
어떻게하면 그렇게되나요?\r
\r
codemirror.js\r
\r
codemirror.css\r
\r
파일만 인크루드했는데 다른파일이 필요한것이 있나요?`,id:"3prwwkmzyd1dq59",title:`이제 막 코딩을 시작한 코린이입니다.\r
\r
웹사이트를 제작하다가 문득 파일을 보는데\r
\r
아래 사진처럼 node_modules 파일이 글자색이 회색인데 혹시 문제있는건가요?`},{type:4,description:`안녕하세요 학교 과제로 웹메일 앱을 만들고있는중에 휴지통 기능을 구현중에 모르는게 있어서 질문드립니다.\r
\r
기능은 받은메일함의 메일들을 체크하고 휴지통으로 보 내기 버튼을 누르면 받은메일함의 메일이 사라지고 휴지통으로 메일들이 이동하는 기능을 구현할 생각인데요.\r
\r
자바스크립트로 이 구현이 가능한지 궁금합니다.`,id:"3s11q2jtaoiculf",title:"자바스크립트 질문있습니다."},{type:4,description:`안녕하세요\r
\r
우편번호 찾기 버튼 없이 숫자를 직접 넣었을 때는 아래 이미지와 같이 잘 됩니다 \r
\r
그런데 [우편번호 찾기] 버튼으로 우편 번호 검색을 한 후 우편번호 필드에 출력은 되는데\r
\r
바로 유효성 인식을 하지 못하는 상황 입니다.`,id:"eagcpllh6gqwa13",title:"유효성 인식 문제 (자바스크립트 )"},{type:4,description:`자바스크립트 로작업중입니다\r
\r
<div id="up"></div>\r
\r
<div id="separator"></div>\r
\r
<div id="down"></div>\r
\r
function dragElement(element, direction) {\r
\r
var md; // remember mouse down info\r
\r
const first = document.getElementById("up");\r
\r
const second = document.getElementById("down");\r
\r
element.onmousedown = onMouseDown;\r
\r
............................................\r
\r
}\r
\r
dragElement(document.getElementById("separator"), "H");\r
\r
위와같은코드가 있을때\r
\r
dragElement 함수에 전달되는 element 의 전과 후의 엘레멘트를 구하려면 어떻게해야될까요?\r
\r
그러니까\r
\r
<div id="up"></div>\r
\r
<div id="separator"></div>\r
\r
<div id="down"></div>\r
\r
<div id="up"></div>\r
\r
<div id="separator2"></div>\r
\r
<div id="down"></div>\r
\r
..............\r
\r
와같이 separator 와 separator2 를 각각 전달인자로 넣었을때\r
\r
각각에 해당하는 up 과 down 의 엘레멘트를 구하고싶습니다\r
\r
const first = document.getElementById("up");\r
\r
const second = document.getElementById("down");\r
\r
이렇게 아이디로 구하는방식으로는 안되는것같습니다\r
\r
조언부탁합니다`,id:"dnt4q08f8iufnpv",title:"자바스크립트 에서 엘레멘트 구하기..."},{type:4,description:"자바스크립트로 아날로그 타이머를 만들고 있었는데 이해가 잘안되는 부분이 생겼습니다.",id:"1d54axlsgbuxzqc",title:"자바스크립트 마우스 이벤트 질문"},{type:4,description:`안녕하세요. 디자인 전공으로 종사하다가 코딩쪽으로 스펙업을 하고 싶어서 입문하게된 코린이입니다.\r
\r
독학으로 자바스크립트 공부중인데요\r
\r
chtatGPT라는 정말 좋은 선생님이 생겨서 공부하기 정말 좋은 시대라고 생각하고 공부 하고 있습니다.\r
\r
입문한지는 며칠안되어서 너무 기본적인 것일 수도 있겠지만..\r
\r
챗지피티로 물어봐도 이랬다 저랬다 답변이 계속 바뀌는 질문이라 ㅠㅠ 여기에 올려봅니다.\r
\r
클로저를 공부하고 있고, 그 개념에 대해서는 대략적으로 이해를 했습니다.\r
\r
문제는 클로저를 응용하는 코드의 예시에서인데요,`,id:"3postble8usiyfw",title:"코딩 입문한지 얼마안된 초보입니다. (자바스크립트 클로저에 대한 질문)"},{type:4,description:"블록블록블록블록블록블록블록블록블록블록",id:"noabqs29y7gpcrd",title:"블록체인블록체인블록블록블록블록"},{type:4,description:`안녕하세요\r
\r
ㅋㅋㅋ\r
ㅋㅋ\r
ㅋㅋ\r
<div>gdgd<div>`,id:"792r5w6cvtmgrc9",title:"질문이 있었는데 없어졌어요"},{type:4,description:`갑자기 기억이 안납니다 허허\r
\r
ㅋㅋㅋ\r
\r
\r
ㅋㅋㅋ`,id:"97nrqujwiy7ekxt",title:"질문이 있습니다."}],Y=[...G,...U,...V],P=["3년밖에","가능한지","검은색으로만","고수만","공부중인데요","공부하기","과제로","구하고싶습니다","구하는방식으로는","구하려면","구함","구현중에","그러니까","그렇게되나요","글자색이","기본적인","나눔합니다","나눔해요","나눠드려요","누르면","다른예제들을","다른파일이","대략적으로","대해서는","돌이킬수","들여쓰기","따라해봐도","라이브러리","로로롤","로작업중입니다","를만들려구하는데","만들고","만들고있는중에","만들었습니다","많아서","말그대로","맛있는거","먹으러","멋쟁이","메일들을","며칠안되어서","모르는게","문제있는건가요","물어봐도","바뀌는","반갑습니당","받은메일함의","배경팝니다","배드민턴","버튼으로","보러가실분","보세요","부족해서","블록블록블록블록블록블록블록블록블록블록","블록체인블록체인블록블록블록블록","빨간색","뽑습니다","사라지고","사진처럼","색상은","생각인데요","선생님이","숫자를","스펙업을","시대라고","시작한","아날로그","아이디로","안녕하세요","안되는것같습니다","안지났습니다","안지났어요","애플마우스","애플매직키보드","어떤데","어떻게하면","어떻게해야될까요","얼마안된","없어졌어요","엘레멘트","여러색으로","예시에서인데요","올려봅니다","우편번호","운동가요","운동같이해요","운동하실분","웹메일","웹사이트를","위와같은코드가","유효성","이동하는","이미지와","이쿠죠","인크루드했는데","입문하게된","입문한지는","있겠지만","있었는데","있을때","자바스크립트","저랬다","전달되는","전달인자로","절호의","제작하다가","조언부탁합니다","주술을","줄표시와","질문이라","질문있습니다","찬스입니다","채팅방테스트","채팅방테스트입니다","챗지피티로","체크하고","초상화입니다","카밀로고나눔합니다","코드들이","코딩쪽으로","코린이입니다","클로저에","키포드를","타이머를","테스트","텍스트에디트","판매할게요","표시되던데","표시됩니다","프로젝트","프론트엔드가","필드에","필요한것이","하실분들","해리포터","회색인데","휴지통","asdf","asdfsadf","chtatGPT라는","codemirror","const","css","direction","div","document","down","dragElement","element","first","function","gdgd","getElementById","html","info","mouse","node_modules","onmousedown","remember","second","separator","var"],x=(e,r)=>{e.forEach((t,n)=>{if(n>6)return;const i=t,o=`
    <li role="presentation">
    <div
    role="button"
    tabIndex="0"
      class="group flex items-center py-[2px] peer focus-within:bg-gray-100 gap-2 hover:bg-gray-100 px-3">
      <div
        aria-atomic="true"
        role="presentation"
        class="bg-time-icon size-[12px]  bg-cover bg-no-repeat group-has-[:focus]:bg-search-sm-icon group-hover:bg-search-sm-icon group-focus:bg-search-sm-icon"
      ></div>
      <div class="mr-auto item" role="option" aria-label="${i}">
        <span>${i}</span>
      </div>
      <button
        aria-label="기록에서 삭제"        
        data-type="delete"
        data-name="${i}"
        class="bg-close-icon size-7 bg-[length:14px_14px] bg-right bg-no-repeat cursor-pointer hover:bg-close-blue-icon focus:bg-close-blue-icon"
      >
      </button>
    </div>
  </li>
    `;r.insertAdjacentHTML("beforeend",o)})},W=["함께해요","기기거래","story","freeboard","질의응답"],X=["/src/pages/board/togetherView.html?id=","/src/pages/exchange/exchangeDetail.html?id=","","","/src/pages/board/qnaView.html?id="],F=(e,r)=>{e.forEach(t=>{const{type:n,title:i,description:o,id:a}=t,d=`
  <li
  class="search-result-list border-b border-contents-content-secondary"
>
  <article
    class="flex w-full relative flex-col p-3 items-start hover:bg-gray-100 "
  >
    <span
      class="p-1 mb-[6px] bg-bluegray-600 text-white rounded text-label-sm leading-none"
      >${W[n]}</span
    >
    <div class="w-full *:overflow-hidden *:leading-none *:text-nowrap *:text-ellipsis">
      <a
        class="absolute left-0 top-0 px-3 block pt-11 title text-paragraph-md w-full h-full"
        href="${X[n]+a}"
        >${i}</a
      >
      <p
        role="presentation"
        class="w-full text-paragraph-sm text-gray-700 pt-[26px]"
      >
      ${o.replace(/</g,"&lt;").replace(/>/g,"&gt;")}
      </p>
    </div>
    <span
      role="presentation"
      class="mt-2 text-label-sm text-gray-600"
    >
      연희동 • 49분 전 • 조회 4
    </span>
  </article>
</li>
  `;r.insertAdjacentHTML("beforeend",d)})},l=(()=>{let e;if(localStorage.getItem("search-list")){const r=localStorage.getItem("search-list"),t=JSON.parse(r);e=new Set(t)}else e=new Set;return e})(),J=document.querySelector("#back");J.addEventListener("click",e=>{e.preventDefault(),window.history.back()});const p=document.querySelector("#searchForm"),s=document.querySelector("#searchInput"),v=document.querySelector("#default-search-view"),K=document.querySelectorAll("#popular-search-ul button"),u=document.querySelector("#recent-search-ul"),b=document.querySelector("#suggestion-view"),Q=document.querySelector("#suggestion-combobox"),T=document.querySelectorAll(".suggestion-item"),S=document.querySelector("#search-result-view"),w=document.querySelector("#search-result-ul"),k=document.querySelectorAll(".skip");let m;x(l,u);function Z(){w.insertAdjacentHTML("beforeend",`
  <li>
    <div class="sorry p-3 flex flex-col text-center">
      <span class="text-heading-2xl">😅</span>
      <p class="p-1 text-paragraph-lg">게시물이 없습니다.</p>
    </div>
  </li>
   `),j.from(".sorry",{y:30,opacity:0,duration:.2})}function ee(){return Y.filter(e=>{const{title:r,description:t}=e;return h(r,s.value)||h(t,s.value)})}p.submit=()=>{if(m=ee(),w.innerHTML="",b.hidden=!0,S.hidden=!1,v.hidden=!0,l.add(s.value),m.length===0){Z();return}F(m,w)};const te=()=>u.querySelector("button").focus();k[0].onclick=te;const A=()=>s.focus();k[1].onclick=A;K.forEach(e=>{e.onclick=()=>{s.value=e.innerText,A(),p.submit()}});u.addEventListener("focusin",e=>{const{target:r}=e;if(r.dataset.type==="delete"){r.addEventListener("click",()=>{const{name:t}=r.dataset;l.delete(t),u.innerHTML="",localStorage.setItem("search-list",JSON.stringify(Array.from(l))),x(l,u)});return}r.addEventListener("click",()=>{s.value=r.innerText.trim(),A(),p.submit()})});let y;const re=e=>P.filter(r=>h(r,e)),ne=()=>{const e=s.value;y=re(e),T.forEach((r,t)=>{const n=r.closest("li");y[t]?(n.classList.remove("hidden"),r.innerText=y[t]):n.classList.add("hidden")})},ie=()=>{if(s.value===""){b.hidden=!0,S.hidden=!0,v.hidden=!1,u.innerHTML="",x(l,u);return}b.hidden=!1,S.hidden=!0,v.hidden=!0,window.localStorage.setItem("search-list",JSON.stringify(Array.from(l))),ne()};s.addEventListener("input",ie);Q.addEventListener("click",({target:e})=>{const r=e.closest("li");if(!r)return;const t=r.dataset.comboboxIndex,n=T[t].textContent.trim();s.value=n,p.submit()});p.addEventListener("submit",e=>(e.preventDefault(),p.submit(),!1));
