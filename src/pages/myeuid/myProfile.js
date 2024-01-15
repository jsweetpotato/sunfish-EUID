import { getNode, pb, checkAuth } from '../../lib';

checkAuth();
/* -------------------------------------------------------------------------- */
/*                                  Rendering                                 */
/* -------------------------------------------------------------------------- */

const pocketAuth = localStorage.getItem('pocketbase_auth');
const pocketData = JSON.parse(pocketAuth);
const profile = getNode('#profile');
const aboutMe = getNode('#aboutMe');
const sellingProduct = getNode('#sellingProduct');
const userProfile = await pb.collection('users').getOne(pocketData.model.id, {
  fields:
    'avatar, name, period, job, company, introduce, userCord, sellingProductCount',
});
const { name, period, job, company, introduce, userCord, sellingProductCount } =
  userProfile;

function getPbImageURL(item, fileName = 'photo') {
  return `${import.meta.env.VITE_PB_URL}/api/files/users/${
    pocketData.model.id
  }/${item[fileName]}`;
}

if (pocketData.model.avatar === '') {
  profile.insertAdjacentHTML(
    'afterbegin' /* html */,
    `
    <img
    src="/src/assets/profile-img.svg"
    alt="내 프로필 사진"
    id="userImg"
    class="size-20 rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
    />
    <span class="text-label-lg">${name}</span>
    <span
    aria-label="내 검색 코드"
    class="text-label-sm text-contents-content-secondary"
    >#${userCord}</span>
    `
  );
} else {
  profile.insertAdjacentHTML(
    'afterbegin' /* html */,
    `
    <img
    src="${getPbImageURL(userProfile, 'avatar', { thumb: '300x300' })}"
    alt="내 프로필 사진"
    id="userImg"
    class="size-20 rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
    />
    <span class="text-label-lg">${name}</span>
    <span
    aria-label="내 검색 코드"
    class="text-label-sm text-contents-content-secondary"
    >#${userCord}</span>
    `
  );
}
if (pocketData.model.introduce === '') {
  aboutMe.insertAdjacentHTML(
    'afterend' /* html */,
    `
    <div class="py-2 px-3">
    <span
      aria-label="기수"
      class="text-[#396CEF] leading-none text-label-sm px-1 py-[2px] rounded border-[1px] border-[#396CEF]"
      >프론트엔드 스쿨 ${period}기</span
    >
    <span class="block mt-3 text-label-md">${company} ∙ ${job}</span>
    </div>
    <div class="mt-[10px] mb-4 mx-3 bg-bluegray-100 rounded-lg">
      <span class="block p-[10px] text-paragraph-sm font-normal">작성한 자기소개가 없습니다.</span>
    </div>
    `
  );
} else {
  aboutMe.insertAdjacentHTML(
    'afterend' /* html */,
    `
    <div class="py-2 px-3">
    <span
      aria-label="기수"
      class="text-[#396CEF] leading-none text-label-sm px-1 py-[2px] rounded border-[1px] border-[#396CEF]"
      >프론트엔드 스쿨 ${period}기</span
    >
    <span class="block mt-3 text-label-md">${company} ∙ ${job}</span>
    </div>
    <div class="mt-[10px] mb-4 mx-3 bg-bluegray-100 rounded-lg">
      <span class="block p-[10px] text-paragraph-sm font-normal">${introduce}</span>
    </div>
    `
  );
}

sellingProduct.insertAdjacentHTML(
  'afterbegin' /* html */,
  `
  <span class="text-paragraph-md ml-3">판매상품 ${sellingProductCount}개</span>
  `
);
