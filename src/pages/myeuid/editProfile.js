/* eslint-disable no-param-reassign */
import { getNode, getNodes, pb } from '../../lib';
import initInput from '../../components/ValidationInput/ValidationInput';
import { createModal1Btn, createModal2Btn } from '../../components/Modal/Modal';

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

const textarea = getNode('#aboutMeInput');
const characterCount = getNode('#characterCount');
const saveButton = getNode('#saveButton');

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

const [saveModal, modalSaveButton] = createModal1Btn({
  title: '🥳 저장 완료!',
  desc: '프로필 정보가 저장되었습니다.',
  buttonText: '확인',
});

const [warningModal, modalCancelButton, modalSubmitButton] = createModal2Btn({
  title: '😱 나가시겠어요?',
  desc: '변경사항이 저장되지 않아요. <br /> 정말로 나가시겠어요?',
  cancelText: '취소',
  submitText: '확인',
});

// 저장 모달
const login = localStorage.getItem('login');
const nameInput = getNode('#nameInput');
const jobInput = getNode('#jobInput');
const companyInput = getNode('#companyInput');
const aboutMeInput = getNode('#aboutMeInput');
const genderInput = document.querySelector('input[name="gender"]:checked');
const usersOauth = localStorage.getItem('users-oauth');
const userData = JSON.parse(usersOauth);
const pocketAuth = localStorage.getItem('pocketbase_auth');
const pocketData = JSON.parse(pocketAuth);

// 프로필 수정 : 저장
const saveData = async () => {
  if (login === 'false') {
    const createUser = {
      username: `${userData.email.split('@')[0]}`,
      email: `${userData.email}`,
      emailVisibility: true,
      password: `${userData.password}`,
      passwordConfirm: `${userData.passwordConfirm}`,
      name: `${nameInput.value}`,
      phone: `${userData.phone}`,
      categorys: userData.categorys.map((data) => data.toLowerCase()),
      gender: `${genderInput.value}`,
      company: `${companyInput.value}`,
      job: `${jobInput.value}`,
      period: Math.ceil(Math.random() * 10),
      introduce: `${aboutMeInput.value}`,
      passionTemp: 123,
      sellingProductCount: 123,
    };
    saveModal.closing();
    await pb.collection('users').create(createUser);

    await pb
      .collection('users')
      .authWithPassword(userData.email, userData.password)
      .then(() => {
        window.location.href = '/src/pages/main/';
      });
    localStorage.removeItem('users-oauth');
    localStorage.setItem('login', 'true');
  } else {
    const updateUser = {
      name: `${nameInput.value}`,
      gender: `${genderInput.value}`,
      company: `${companyInput.value}`,
      job: `${jobInput.value}`,
      introduce: `${aboutMeInput.value}`,
    };

    pb.collection('users')
      .update(pocketData.model.id, updateUser)
      .then(() => {
        window.location.href = '/src/pages/myeuid/myProfile.html';
      });
  }
};

modalSaveButton.onclick = saveData;
saveButton.onclick = () => saveModal.showing();

// 경고 모달
const cancelButton = getNodes('.cancelButton');
const storage = window.localStorage;

const cancelProfileEdit = () => {
  if (login === 'true') {
    window.location.href = '/src/pages/myeuid/myProfile.html';
  } else {
    storage.clear();
    window.location.href = '/src/pages/login/';
  }
};

const continueProfileEdit = () => warningModal.closing();

modalCancelButton.onclick = continueProfileEdit;
modalSubmitButton.onclick = cancelProfileEdit;

cancelButton.forEach((button) => {
  button.onclick = () => warningModal.showing();
});

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
