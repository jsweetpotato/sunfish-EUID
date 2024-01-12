/* eslint-disable no-param-reassign */
import { getNode, getNodes } from '../../lib';
import initInput from '../../components/ValidationInput/ValidationInput';

const inputArray = [
  {
    id: 'nameInput',
    min: 0,
    max: 8,
    placeholder: '별명이나 이름을 입력해주세요.',
    label: '이름',
  },
  {
    id: 'jobInput',
    min: 0,
    max: 20,
    placeholder: '어떤 일을 하는지 알려주세요.',
    label: '직업',
  },
  {
    id: 'companyInput',
    min: 0,
    max: 24,
    placeholder: '일하시는 곳을 알려주세요.',
    label: '직장',
  },
];
initInput(inputArray);

const textarea = getNode('#description');
const characterCount = getNode('#characterCount');

function countCharacters() {
  const count = textarea.value.length;
  characterCount.textContent = `${count}/500`;
  if (count > 500) {
    textarea.value = textarea.value.substring(0, 500);
    characterCount.textContent = '500/500';
  }
}

textarea.addEventListener('input', countCharacters);

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

// 저장 완료 모달
const saveModal = getNode('#saveModal');

function showSaveModal() {
  saveModal.showModal();
}

saveButton.addEventListener('click', showSaveModal);

// 경고 모달
const cancelButton = getNodes('.cancelButton');
const warningModal = getNode('#warningModal');

function showWarningModal() {
  warningModal.showModal();
}

cancelButton.forEach((button) => {
  button.addEventListener('click', showWarningModal);
});

// 모달창 닫기
const closeModalButton = getNode('#closeModalButton');

function closeModal() {
  warningModal.close();
}

closeModalButton.addEventListener('click', closeModal);

const fileField = getNode('#file');
const imagePreview = getNode('#image-preview');
const imageWrapper = getNode('#image-wrapper');
const fileClearButton = getNode('#file-clear');

function handleFileChange({ target }) {
  if (target.value === '') return;
  const { files } = target;
  imageWrapper.innerHTML = '';

  [...files].forEach((file) => {
    const imgUrl = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.classList.add('w-[50px]', 'h-[50px]');
    img.src = imgUrl;
    imageWrapper.appendChild(img);
  });

  imagePreview.classList.remove('hidden');
}
fileField.addEventListener('change', handleFileChange);

function handleClear({ target }) {
  fileField.value = '';
  imageWrapper.innerHTML = '';
  imagePreview.classList.add('hidden');
}
fileClearButton.addEventListener('click', handleClear);
