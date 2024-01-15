/**
 * 최근 검색 목록
 * @param {Array<{name: String,label ?: String }>} list - 최근 검색 목록
 * @param {HTMLElement} target - 안에 템플릿 넣을 엘리먼트
 */
export const drawRecentSearchList = (list, target) => {
  list.forEach((item, idx) => {
    const { name } = item;
    const template = /* html */ `
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
      <div class="mr-auto item" role="option" aria-label="${name}">
        <span>${name}</span>
      </div>
      <button
        aria-label="기록에서 삭제"        
        data-type="delete"
        data-idx="${idx}"
        class="bg-close-icon size-7 bg-[length:14px_14px] bg-right bg-no-repeat cursor-pointer hover:bg-close-blue-icon focus:bg-close-blue-icon"
      >
      </button>
    </div>
  </li>
    `;
    target.insertAdjacentHTML('beforeend', template);
  });
};
/**
 * 추천 검색 목록
 * @param {Array<{name: String,label ?: String }>} list - 추천 검색 목록
 * @param {HTMLElement} target - 안에 템플릿 넣을 엘리먼트
 */
export const drawSuggestionList = (list, target) => {
  list.forEach((item, idx) => {
    const { name } = item;
    const template = /* html */ `
<li role="presentation">
  <div
    class="group flex h-7 items-center peer focus-within:bg-gray-100 hover:bg-gray-100 mx-[6px] px-[6px] rounded-md"
  >
    <div
      aria-atomic="true"
      role="presentation"
      class="size-[12px] bg-cover bg-no-repea bg-search-sm-icon"
    ></div>
    <button class="mr-auto p-1" role="option" aria-label="${name}">
      <span>{name}</span>
    </button>
  </div>
</li>
`;
    target.insertAdjacentHTML('beforeend', template);
  });
};

const category = ['함께해요', '기기거래', 'story', 'freeboard', '질의응답'];
const pages = [
  '/src/pages/board/togetherView.html?id=',
  '/src/pages/exchange/exchangeDetail.html?id=',
  '',
  '',
  '/src/pages/board/qnaView.html?id=',
];
/**
 * 검색 결과 목록
 * @param {Array<{name: String,label ?: String }>} list - 검색 결과 목록
 * @param {HTMLElement} target - 안에 템플릿 넣을 엘리먼트
 */
export const drawSearchResultList = (list, target) => {
  list.forEach((listItem) => {
    const { type, title, description: desc, id } = listItem;

    const template = /* html */ `
  <li
  class="search-result-list border-b border-contents-content-secondary"
>
  <article
    class="flex w-full relative flex-col p-3 items-start hover:bg-gray-100 "
  >
    <span
      class="p-1 mb-[6px] bg-bluegray-600 text-white rounded text-label-sm leading-none"
      >${category[type]}</span
    >
    <div class="w-full *:overflow-hidden *:leading-none *:text-nowrap *:text-ellipsis">
      <a
        class="absolute left-0 top-0 px-3 block pt-11 title text-paragraph-md w-full h-full"
        href="${pages[type] + id}"
        >${title}</a
      >
      <p
        role="presentation"
        class="w-full text-paragraph-sm text-gray-700 pt-[26px]"
      >
      ${desc.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
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
  `;
    target.insertAdjacentHTML('beforeend', template);
  });
};
