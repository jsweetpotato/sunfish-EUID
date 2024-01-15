/* eslint-disable no-param-reassign */
import { getNode, getNodes, pb, checkAuth } from '../../lib';
import initInput from '../../components/ValidationInput/ValidationInput';
import { createModal1Btn, createModal2Btn } from '../../components/Modal/Modal';

const login = localStorage.getItem('login');
const usersOauth = localStorage.getItem('users-oauth');
const userData = JSON.parse(usersOauth);
const pocketAuth = localStorage.getItem('pocketbase_auth');
const pocketData = JSON.parse(pocketAuth);
const saveButton = getNode('#saveButton');
const cancelButton = getNodes('.cancelButton');

if (JSON.parse(login)) {
  checkAuth();
}

/* -------------------------------------------------------------------------- */
/*                              Validation Input                              */
/* -------------------------------------------------------------------------- */
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
const [, needUpdate] = initInput(inputArray);

const textarea = getNode('#aboutMeInput');
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

const privateRadio = getNode('#private');
const maleRadio = getNode('#male');
const femaleRadio = getNode('#female');

function moveCheck(e) {
  const prevChecked = document.querySelector('[checked]');
  if (prevChecked) {
    prevChecked.removeAttribute('checked');
  }
  e.target.setAttribute('checked', 'checked');
}
privateRadio.addEventListener('click', moveCheck);
maleRadio.addEventListener('click', moveCheck);
femaleRadio.addEventListener('click', moveCheck);

/* -------------------------------------------------------------------------- */
/*                                 저장버튼 활성화                                */
/* -------------------------------------------------------------------------- */

// 상태관리
const state = {
  input: [...getNodes('.required-input')].every(
    (node) => node.value.length > 0
  ),
  agree: false,
};

// 전체동의
const allAgreeCheckbox = getNode('#all-agree-checkbox');
const agreeCheckboxes = getNodes('.agree-checkbox');

const handleCheckboxChange = () => {
  const isAllChecked = [...agreeCheckboxes].every(
    (checkbox) => checkbox.checked
  );

  if (!isAllChecked) {
    saveButton.disabled = true;
    state.agree = false;
  } else {
    state.agree = true;
    saveButton.disabled = !state.input || !state.agree;
  }

  allAgreeCheckbox.checked = isAllChecked;
};

allAgreeCheckbox.addEventListener('change', () => {
  const isChecked = allAgreeCheckbox.checked;
  agreeCheckboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
  saveButton.disabled = !isChecked;
  state.agree = isChecked;
  saveButton.disabled = !state.input || !state.agree;
});

agreeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckboxChange);
});

// 필수 input
const required = getNodes('.required input');
required.forEach((element) => {
  element.classList.add('required-input');
});

const requiredInputs = Array.from(getNodes('.required-input'));
requiredInputs.forEach((element) => {
  element.addEventListener('input', () => {
    const allInputsFilled = requiredInputs.every((input) => input.value !== '');
    state.input = allInputsFilled;
    saveButton.disabled = !state.input || !state.agree;
  });
});

/* -------------------------------------------------------------------------- */
/*                                    Modal                                   */
/* -------------------------------------------------------------------------- */

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

/* ----------------------------- 프로필수정 저장완료 모달 ----------------------------- */
const nameInput = getNode('#nameInput');
const jobInput = getNode('#jobInput');
const companyInput = getNode('#companyInput');
const aboutMeInput = getNode('#aboutMeInput');
const fileField = getNode('#file');
const imageWrapper = getNode('#image-wrapper');

const saveData = async () => {
  const genderInput = document.querySelector('input[name="gender"]:checked');

  // 회원가입 유저 데이터 생성
  if (login === 'false') {
    const array = new Uint16Array(1);
    const userCord = crypto.getRandomValues(array).join('');

    const createUser = {
      username: `${userData.email.split('@')[0]}`,
      email: `${userData.email}`,
      emailVisibility: true,
      password: `${userData.password}`,
      passwordConfirm: `${userData.passwordConfirm}`,
      categorys: userData.categorys.map((data) => data.toLowerCase()),
      phone: `${userData.phone}`,
      avatar: fileField.files[0],
      name: `${nameInput.value}`,
      gender: `${genderInput.id}`,
      job: `${jobInput.value}`,
      company: `${companyInput.value}`,
      introduce: `${aboutMeInput.value}`,
      period: Math.ceil(Math.random() * 10),
      userCord,
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

    // 로그인 유저 데이터 업데이트
  } else {
    const updateUser = {
      avatar: fileField.files[0],
      name: `${nameInput.value}`,
      gender: `${genderInput.id}`,
      job: `${jobInput.value}`,
      company: `${companyInput.value}`,
      introduce: `${aboutMeInput.value}`,
    };

    updateUser.avatar = fileField.files[0] || null;

    pb.collection('users')
      .update(pocketData.model.id, updateUser)
      .then(() => {
        window.location.href = '/src/pages/myeuid/myProfile.html';
      });
  }
};

modalSaveButton.onclick = saveData;
saveButton.onclick = () => saveModal.showing();

/* ----------------------------- 프로필수정 취소 경고 모달 ----------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                                 이미지 미리보기                                */
/* -------------------------------------------------------------------------- */

const imagePreview = getNode('#image-preview');
const fileClearButton = getNode('#file-clear');

function handleFileChange({ target }) {
  if (target.value === '') return;
  const { files } = target;
  imageWrapper.innerHTML = '';

  [...files].forEach((file) => {
    const imgUrl = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.classList.add('w-[50px]', 'h-[50px]');
    img.id = 'userImg';
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

/* -------------------------------------------------------------------------- */
/*                  로그인 유저 : 프로필 수정 페이지에 기존 데이터 렌더링                 */
/* -------------------------------------------------------------------------- */
function getPbImageURL(item, fileName = 'photo') {
  return `${import.meta.env.VITE_PB_URL}/api/files/users/${
    pocketData.model.id
  }/${item[fileName]}`;
}

if (login === 'true') {
  const userProfile = await pb.collection('users').getOne(pocketData.model.id, {
    fields: 'avatar',
  });

  if (pocketData.model.avatar !== '') {
    imagePreview.classList.remove('hidden');
    imageWrapper.insertAdjacentHTML(
      'afterbegin' /* html */,
      `
    <img class="w-[50px] h-[50px]" id="userImg" src="${getPbImageURL(
      userProfile,
      'avatar'
    )}">
    `
    );
  }
  nameInput.value = pocketData.model.name;
  jobInput.value = pocketData.model.job;
  companyInput.value = pocketData.model.company;
  aboutMeInput.value = pocketData.model.introduce;
  countCharacters();

  needUpdate.state = true;

  const prevGender = pocketData.model.gender;
  const prevElement = getNode(`#${prevGender}`);
  if (prevElement) {
    prevElement.setAttribute('checked', 'checked');
  } else {
    privateRadio.removeAttribute('checked');
    maleRadio.removeAttribute('checked');
    femaleRadio.removeAttribute('checked');
  }
}
