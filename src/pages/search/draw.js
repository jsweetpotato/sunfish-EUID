/**
 * 최근 검색 목록 그리는
 * @param {Array<{name: String,label ?: String }>} list - 최근 검색 목록
 * @param {HTMLElement} target - 안에 템플릿 넣을 엘리먼트
 */
// eslint-disable-next-line import/prefer-default-export
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

export const test = (item) => console.log(item);
/**
 * 최근 검색 목록 그리는
 * @param {Array<{name: String,label ?: String }>} list - 최근 검색 목록
 * @param {HTMLElement} target - 안에 템플릿 넣을 엘리먼트
 */
// eslint-disable-next-line import/prefer-default-export
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

// export createSearchBtn =
