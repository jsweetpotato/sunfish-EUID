/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path, no-restricted-syntax */

import gsap from 'gsap';
import { pb, getNode, getNodes, checkAuth } from '/src/lib/';
import {
  createModal2Btn,
  createAlertModal,
} from '/src/components/Modal/Modal.js';

(function init() {
  if (!checkAuth()) return;
  const form = getNode('#form');
  form.addEventListener('submit', (e) => e.preventDefault());
})();

const formObj = {
  type: 'qna',
  title: '',
  description: '',
  category: '프론트엔드',
  imgField: [],
  views: 0,
  comments: JSON.stringify([]),
  user: pb.authStore.model.id,
};

const $openModalButton = getNode('#category-select');
const $closeModalButton = getNode('#closeModal');
const $modalDimmed = getNode('#modalDimmed');

function showModal() {
  const tl = gsap.timeline();
  tl.to('#modalDimmed', {
    opacity: 1,
    display: 'block',
    duration: 0.3,
  }).to(
    '#modal',
    {
      bottom: 0,
      duration: 0.3,
      onComplete() {
        this.targets()[0].focus();
      },
    },
    '<'
  );
}
function closeModal(e) {
  if (this === e.target) {
    gsap.to('#modalDimmed', {
      opacity: 0,
      duration: 0.3,
      onComplete() {
        gsap.set('#modalDimmed', { clearProps: 'all' });
        gsap.set('#modal', { clearProps: 'all' });
      },
    });
  }
}
$openModalButton.addEventListener('click', showModal);
$closeModalButton.addEventListener('click', closeModal);
$modalDimmed.addEventListener('click', closeModal);

const selectButtons = getNodes('.select');
selectButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const { id, dataset } = e.target;
    $openModalButton.textContent = dataset.name;
    formObj.category = id;
    gsap.to('#modalDimmed', {
      opacity: 0,
      duration: 0.1,
      onComplete() {
        gsap.set('#modalDimmed', { clearProps: 'all' });
        gsap.set('#modal', { clearProps: 'all' });
      },
    });
  });
});

const validState = {
  title: false,
  description: false,
};

const inputs = getNodes('.input');
function handleInput({ target }) {
  const submit = getNode('#complete');
  validState[target.id] = target.value.length > 0;
  formObj[target.id] = target.value;
  if (Object.values(validState).every((value) => value)) {
    submit.removeAttribute('disabled');
  } else {
    submit.setAttribute('disabled', '');
  }
}
inputs.forEach((input) => {
  input.addEventListener('input', handleInput);
});

const fileField = getNode('#file');
function handleFileChange({ target }) {
  if (target.value === '') return;
  const { files } = target;
  const imageWrapper = getNode('#image-wrapper');
  imageWrapper.innerHTML = '';
  imageWrapper.parentElement.classList.remove('hidden');
  gsap.from(imageWrapper.parentElement, {
    y: 70,
  });
  [...files].forEach((file) => {
    formObj.imgField.push(file);

    const imgUrl = URL.createObjectURL(file);
    imageWrapper.insertAdjacentHTML(
      'beforeend',
      `<img class="w-16 h-16" src="${imgUrl}" alt="" />`
    );
  });
}
fileField.addEventListener('change', handleFileChange);

const fileClearButton = getNode('#file-clear');
function handleClear({ target }) {
  const imageWrapper = getNode('#image-wrapper');
  fileField.value = '';
  formObj.imgField = [];
  imageWrapper.innerHTML = '';
  imageWrapper.parentElement.classList.add('hidden');
}
fileClearButton.addEventListener('click', handleClear);

const submitButton = getNode('#complete');
function handleSubmit() {
  const [modal] = createAlertModal('작성이 완료되었습니다.');
  return async (e) => {
    modal.showing();
    if (!Object.values(validState).every((value) => value)) return;
    const formData = new FormData();
    for (const [key, value] of Object.entries(formObj)) {
      if (key === 'imgField') {
        formObj[key].forEach((file) => formData.append('imgField', file));
      } else formData.append(key, value);
    }
    try {
      await pb.collection('qAndA').create(formData);
      window.location.replace('/src/pages/board/qna.html');
    } catch (error) {
      alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
}
submitButton.addEventListener('click', handleSubmit());

function handleCancel() {
  const title = '❗ 정말 취소하시겠어요?';
  const desc = '입력한 내용은 모두 사라집니다.<br />계속하시겠습니까?';
  const cancelText = '아니오';
  const goBackText = '예';
  const [modal, cancel, submit] = createModal2Btn({
    title,
    desc,
    cancelText,
    goBackText,
  });

  cancel.addEventListener('click', () => {
    modal.closing();
  });
  submit.addEventListener('click', () => {
    window.location.replace('/src/pages/board/qna.html');
  });
  return () => {
    modal.showing();
  };
}

const cancelButtons = getNodes('.cancel');
cancelButtons.forEach((button) =>
  button.addEventListener('click', handleCancel())
);
