// a 태그 버튼
// button 태그 버튼
// primary 버튼
// secondary 버튼
// 콜백 함수를 전달 받음
const BTN_CALSS = `px-6 py-2 text-sm font-medium rounded-sm`;
const INVALID_CLASS = `bg-contents-content-secondary text-white`;
const SECONDARY_BTN_COLOR = `bg-gray-100 text-bluegray-800`;
const PRIMARY_BTN_COLOR = `bg-secondary`;

const createBtn = ({
  id = crypto.randomUUID(),
  value,
  onClick,
  type = 'button',
}) => {
  const btn = document.createElement('button');
  btn.onclick = onClick;
  btn.textContent = value;
  btn.setAttribute('id', id);
  btn.setAttribute('type', type);
  return btn;
};

/**
 * valid check 후 invalid 클래스 토글
 * @param {HTMLButtonElement} primaryBtn
 * @param {boolean} isValid
 */
export const toggleValid = (primaryBtn, isValid) => {
  if (isValid) {
    primaryBtn.classList.add(PRIMARY_BTN_COLOR);
    // primaryBtn.setAttribute('disabled', true);
  } else {
    primaryBtn.classList.remove(PRIMARY_BTN_COLOR);
    // primaryBtn.setAttribute('disabled', false);
  }
};
/**
 * primary 버튼 생성 함수
 * @param {Object} btnContents
 * @param {string | number} btnContents.id
 * @param {string} btnContents.value
 * @param {Function} btnContents.onClick - 클릭 이벤트 콜백 함수
 * @param {'button' | 'submit'} btnContents.type - default: 'button'
 * @returns {HTMLButtonElement}
 */
export const createPrimaryBtn = ({
  id = crypto.randomUUID(),
  value,
  onClick,
  type = 'button',
}) => {
  const btn = createBtn({ id, value, onClick, type });
  btn.className = `${BTN_CALSS} ${INVALID_CLASS}`;
  return btn;
};

/**
 * secondary 버튼 생성 함수
 * @param {Object} btnContents
 * @param {string | number} btnContents.id
 * @param {string} btnContents.value
 * @param {Function} btnContents.onClick - 클릭 이벤트 콜백 함수
 * @returns {HTMLButtonElement}
 */
export const createSecondaryBtn = ({
  id = crypto.randomUUID(),
  value,
  onClick,
}) => {
  const btn = createBtn({ id, value, onClick });
  btn.className = `${BTN_CALSS} ${SECONDARY_BTN_COLOR}`;
  return btn;
};
