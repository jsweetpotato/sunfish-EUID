import"./tailwind-Via4wZBX.js";import{g as a}from"./getNode-pa7syr6m.js";import{p as m}from"./delay-L14dHocY.js";import{c as b}from"./checkAuth-CTdHH8Oq.js";import"./Modal-LwrVZ11o.js";b();const g=localStorage.getItem("pocketbase_auth"),e=JSON.parse(g),s=a("#profile"),t=a("#aboutMe"),u=a("#sellingProduct"),c=await m.collection("users").getOne(e.model.id,{fields:"avatar, name, period, job, company, introduce, userCord, sellingProductCount"}),{name:n,period:l,job:o,company:r,introduce:x,userCord:p,sellingProductCount:f}=c;function $(d,i="photo"){return`https://suppose-weather.pockethost.io//api/files/users/${e.model.id}/${d[i]}`}e.model.avatar===""?s.insertAdjacentHTML("afterbegin",`
    <img
    src="/src/assets/profile-img.svg"
    alt="내 프로필 사진"
    id="userImg"
    class="size-20 rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
    />
    <span class="text-label-lg">${n}</span>
    <span
    aria-label="내 검색 코드"
    class="text-label-sm text-contents-content-secondary"
    >#${p}</span>
    `):s.insertAdjacentHTML("afterbegin",`
    <img
    src="${$(c,"avatar")}"
    alt="내 프로필 사진"
    id="userImg"
    class="size-20 rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
    />
    <span class="text-label-lg">${n}</span>
    <span
    aria-label="내 검색 코드"
    class="text-label-sm text-contents-content-secondary"
    >#${p}</span>
    `);e.model.introduce===""?t.insertAdjacentHTML("afterend",`
    <div class="py-2 px-3">
    <span
      aria-label="기수"
      class="text-[#396CEF] leading-none text-label-sm px-1 py-[2px] rounded border-[1px] border-[#396CEF]"
      >프론트엔드 스쿨 ${l}기</span
    >
    <span class="block mt-3 text-label-md">${r} ∙ ${o}</span>
    </div>
    <div class="mt-[10px] mb-4 mx-3 bg-bluegray-100 rounded-lg">
      <span class="block p-[10px] text-paragraph-sm font-normal">작성한 자기소개가 없습니다.</span>
    </div>
    `):t.insertAdjacentHTML("afterend",`
    <div class="py-2 px-3">
    <span
      aria-label="기수"
      class="text-[#396CEF] leading-none text-label-sm px-1 py-[2px] rounded border-[1px] border-[#396CEF]"
      >프론트엔드 스쿨 ${l}기</span
    >
    <span class="block mt-3 text-label-md">${r} ∙ ${o}</span>
    </div>
    <div class="mt-[10px] mb-4 mx-3 bg-bluegray-100 rounded-lg">
      <span class="block p-[10px] text-paragraph-sm font-normal">${x}</span>
    </div>
    `);u.insertAdjacentHTML("afterbegin",`
  <span class="text-paragraph-md ml-3">판매상품 ${f}개</span>
  `);
