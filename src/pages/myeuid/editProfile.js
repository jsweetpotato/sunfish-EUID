/* eslint-disable no-param-reassign */
import { getNode, getNodes } from '../../lib';

const allAgreeCheckbox = getNode('#all-agree-checkbox');
const agreeCheckboxes = getNodes('.agree-checkbox');
const saveButton = getNode('#saveButton');

// 하위 체크박스가 모두 체크되면 전체동의도 체크되는 함수
const handleCheckboxChange = () => {
  // 하위 체크박스가 모두 체크되어 있으면 isAllChecked에 true가 담김
  const isAllChecked = [...agreeCheckboxes].every(
    (checkbox) => checkbox.checked
  );

  // savebutton disabled 속성 설정
  saveButton.disabled = !isAllChecked;

  // isAllChecked = true일 때 전체동의 체크박스도 체크됨
  allAgreeCheckbox.checked = isAllChecked;
};

// 전체동의가 변경되면 하위 체크박스도 변경됨
allAgreeCheckbox.addEventListener('change', () => {
  // 전체동의 체크박스의 값(true, false)이 담김
  const isChecked = allAgreeCheckbox.checked;

  // 전체동의 체크박스가 true/false면 하위 체크박스도 true/false
  agreeCheckboxes.forEach((checkbox) => {
    checkbox.checked = isChecked; // 개별 체크박스의 상태를 "전체 동의" 체크박스의 상태로 업데이트
  });

  saveButton.disabled = !isChecked;
});

// 하위 체크박스 중 하나라도 해제되면 전체동의도 해제
// 각 개별 체크박스에 이벤트 리스너 추가
agreeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener(
    'change',
    // 다른 체크박스가 변경되면 "전체 동의" 체크박스의 상태 업데이트
    handleCheckboxChange
  );
});
