/**
 * 최근 검색 목록 그리는
 * @param {Array<{name: String,label ?: String }>} list - 최근 검색 목록
 * @param {HTMLElement} target - 안에 템플릿 넣을 엘리먼트
 */
// eslint-disable-next-line import/prefer-default-export
export const drawRecentSearchList = (list, target) => {
  list.forEach((item) => {
    const { name } = item;
    const template = /* html */ `
    <li role="presentation">
    <div
      class="flex items-center focus-within:bg-gray-100 hover:bg-gray-100 mx-[6px] px-[6px] rounded-md">
      <div
        aria-atomic="true"
        role="presentation"
        class="bg-time-icon size-[11px] bg-cover bg-no-repeat"
      ></div>
      <button class="mr-auto p-1" role="option" aria-label="${name}">
        <span>${name}</span>
      </button>
      <div
        aria-label="기록에서 삭제"
        role="button"
        class="bg-close-icon size-7 bg-[length:14px_14px] bg-right bg-no-repeat cursor-pointer hover:bg-close-blue-icon"
      >
      </div>
    </div>
  </li>
    `;
    target.insertAdjacentHTML('beforeend', template);
  });
};

export const test = (item) => console.log(item);
